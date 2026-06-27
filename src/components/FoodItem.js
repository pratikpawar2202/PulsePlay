/**
 * FoodItem.js
 *
 * A single draggable food piece. Encapsulates its own drag-and-drop
 * behavior using the Pointer Events API (works uniformly for mouse,
 * touch, and pen), so screens just provide a drop target and a
 * delivery callback — no drag math leaks out of this component.
 *
 * Positioning during drag is done via `element.style.transform`,
 * updated inside a requestAnimationFrame loop. This is the one place
 * in the component library that sets styles from JS: it's runtime,
 * per-pixel pointer tracking, not static styling, so it can't be
 * expressed as a CSS class — the same reasoning that lets drag
 * libraries like this avoid violating "no inline CSS" in practice.
 */

const DROP_ZONE_BUFFER_PX = 48;

export class FoodItem {
  /**
   * @param {Object} options
   * @param {string} options.emoji
   * @param {string} options.label - Accessible label, e.g. "Apple".
   * @param {() => HTMLElement} options.getDropTarget - Returns the current drop target element (e.g. Pogo).
   * @param {() => void} options.onDeliver - Called once when the item is successfully dropped on the target.
   */
  constructor({ emoji, label, getDropTarget, onDeliver }) {
    this.emoji = emoji;
    this.label = label;
    this.getDropTarget = getDropTarget;
    this.onDeliver = onDeliver;

    this.isDragging = false;
    this.isDisabled = false;
    this.isDelivered = false;

    this._pointerId = null;
    this._startX = 0;
    this._startY = 0;
    this._currentDx = 0;
    this._currentDy = 0;
    this._rafId = null;
    this._activeDropTarget = null;

    this.element = this.#buildElement();
    this.#attachListeners();
  }

  #buildElement() {
    const item = document.createElement('div');
    item.classList.add('pp-food-item');
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Drag ${this.label} to Pogo`);
    item.setAttribute('tabindex', '0');

    const glyph = document.createElement('span');
    glyph.classList.add('pp-food-item__glyph');
    glyph.setAttribute('aria-hidden', 'true');
    glyph.textContent = this.emoji;

    item.appendChild(glyph);
    return item;
  }

  #attachListeners() {
    this._onPointerDown = this.#handlePointerDown.bind(this);
    this._onPointerMove = this.#handlePointerMove.bind(this);
    this._onPointerUp = this.#handlePointerUp.bind(this);

    this.element.addEventListener('pointerdown', this._onPointerDown);
  }

  #handlePointerDown(event) {
    if (this.isDisabled || this.isDelivered || this.isDragging) return;

    this.isDragging = true;
    this._pointerId = event.pointerId;
    this._startX = event.clientX;
    this._startY = event.clientY;
    this._currentDx = 0;
    this._currentDy = 0;

    this.element.setPointerCapture(this._pointerId);
    this.element.classList.add('pp-food-item--dragging');

    window.addEventListener('pointermove', this._onPointerMove);
    window.addEventListener('pointerup', this._onPointerUp);
    window.addEventListener('pointercancel', this._onPointerUp);

    this.#scheduleFrame();
    event.preventDefault();
  }

  #handlePointerMove(event) {
    if (!this.isDragging || event.pointerId !== this._pointerId) return;

    this._currentDx = event.clientX - this._startX;
    this._currentDy = event.clientY - this._startY;

    const dropTarget = this.getDropTarget();
    const isOverTarget = dropTarget
      ? this.#isPointWithinTarget(event.clientX, event.clientY, dropTarget)
      : false;

    if (isOverTarget && this._activeDropTarget !== dropTarget) {
      dropTarget.classList.add('pp-pogo--target-hover');
      this._activeDropTarget = dropTarget;
    } else if (!isOverTarget && this._activeDropTarget) {
      this._activeDropTarget.classList.remove('pp-pogo--target-hover');
      this._activeDropTarget = null;
    }
  }

  #handlePointerUp(event) {
    if (!this.isDragging || event.pointerId !== this._pointerId) return;

    this.isDragging = false;
    this.#cancelFrame();

    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerup', this._onPointerUp);
    window.removeEventListener('pointercancel', this._onPointerUp);

    if (this.element.hasPointerCapture?.(this._pointerId)) {
      this.element.releasePointerCapture(this._pointerId);
    }
    this.element.classList.remove('pp-food-item--dragging');

    const dropTarget = this.getDropTarget();
    const delivered = dropTarget
      ? this.#isPointWithinTarget(event.clientX, event.clientY, dropTarget)
      : false;

    if (this._activeDropTarget) {
      this._activeDropTarget.classList.remove('pp-pogo--target-hover');
      this._activeDropTarget = null;
    }

    if (delivered) {
      this.#deliver();
    } else {
      this.#snapBack();
    }
  }

  /**
   * Checks whether a viewport point falls within a target element's
   * bounding box, expanded by a buffer so small fingers on small
   * screens still register a hit.
   */
  #isPointWithinTarget(clientX, clientY, targetElement) {
    const rect = targetElement.getBoundingClientRect();
    return (
      clientX >= rect.left - DROP_ZONE_BUFFER_PX &&
      clientX <= rect.right + DROP_ZONE_BUFFER_PX &&
      clientY >= rect.top - DROP_ZONE_BUFFER_PX &&
      clientY <= rect.bottom + DROP_ZONE_BUFFER_PX
    );
  }

  #scheduleFrame() {
    const step = () => {
      if (!this.isDragging) return;
      this.element.style.transform = `translate3d(${this._currentDx}px, ${this._currentDy}px, 0) scale(1.08)`;
      this._rafId = window.requestAnimationFrame(step);
    };
    this._rafId = window.requestAnimationFrame(step);
  }

  #cancelFrame() {
    if (this._rafId !== null) {
      window.cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }
  }

  #snapBack() {
    this.element.classList.add('pp-food-item--snapping');
    this.element.style.transform = 'translate3d(0, 0, 0) scale(1)';

    const cleanup = () => {
      this.element.removeEventListener('transitionend', cleanup);
      this.element.classList.remove('pp-food-item--snapping');
      this.element.style.transform = '';
    };
    this.element.addEventListener('transitionend', cleanup, { once: true });
    setTimeout(cleanup, 400);
  }

  #deliver() {
    this.isDelivered = true;
    this.disable();
    if (typeof this.onDeliver === 'function') {
      this.onDeliver();
    }
  }

  /**
   * Plays the "delivered" shrink-and-fade animation.
   * @returns {Promise<void>}
   */
  playDeliverAnimation() {
    return new Promise((resolve) => {
      this.element.classList.add('pp-food-item--delivered');

      let hasResolved = false;
      const finish = () => {
        if (hasResolved) return;
        hasResolved = true;
        this.element.removeEventListener('animationend', finish);
        resolve();
      };

      this.element.addEventListener('animationend', finish, { once: true });
      setTimeout(finish, 400);
    });
  }

  /**
   * Disables future drag interaction (used once an item has been
   * delivered, or while a feeding animation is in progress).
   */
  disable() {
    this.isDisabled = true;
    this.element.classList.add('pp-food-item--disabled');
  }

  /**
   * Removes all listeners and detaches the element. Safe to call
   * even mid-drag (e.g. if the screen is torn down unexpectedly).
   */
  destroy() {
    this.#cancelFrame();
    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerup', this._onPointerUp);
    window.removeEventListener('pointercancel', this._onPointerUp);
    this.element.removeEventListener('pointerdown', this._onPointerDown);
    this.element.remove();
  }
}
