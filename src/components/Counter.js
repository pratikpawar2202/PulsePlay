/**
 * Counter.js
 *
 * Reusable numeric counter with increment/decrement controls.
 * Encapsulates its own DOM and state, exposing a small public API
 * so other modules (e.g. a future scoring system) can read or
 * drive the value programmatically.
 */
export class Counter {
  /**
   * @param {Object} options
   * @param {number} [options.initialValue=0]
   * @param {number} [options.step=1]
   * @param {number} [options.min=-Infinity]
   * @param {number} [options.max=Infinity]
   * @param {(value: number) => void} [options.onChange]
   */
  constructor({
    initialValue = 0,
    step = 1,
    min = -Infinity,
    max = Infinity,
    onChange,
  } = {}) {
    this.value = initialValue;
    this.step = step;
    this.min = min;
    this.max = max;
    this.onChange = onChange;

    this.element = this.#buildElement();
  }

  #buildElement() {
    const container = document.createElement('div');
    container.classList.add('pp-counter');

    const decrementButton = document.createElement('button');
    decrementButton.type = 'button';
    decrementButton.classList.add('pp-counter__control');
    decrementButton.textContent = '–';
    decrementButton.setAttribute('aria-label', 'Decrease value');
    decrementButton.addEventListener('click', () => this.decrement());

    const valueLabel = document.createElement('span');
    valueLabel.classList.add('pp-counter__value');
    valueLabel.textContent = String(this.value);

    const incrementButton = document.createElement('button');
    incrementButton.type = 'button';
    incrementButton.classList.add('pp-counter__control');
    incrementButton.textContent = '+';
    incrementButton.setAttribute('aria-label', 'Increase value');
    incrementButton.addEventListener('click', () => this.increment());

    container.append(decrementButton, valueLabel, incrementButton);

    this.valueLabel = valueLabel;
    this.decrementButton = decrementButton;
    this.incrementButton = incrementButton;

    return container;
  }

  #setValue(nextValue) {
    const clamped = Math.min(this.max, Math.max(this.min, nextValue));
    if (clamped === this.value) return;

    this.value = clamped;
    this.valueLabel.textContent = String(this.value);
    this.incrementButton.disabled = this.value >= this.max;
    this.decrementButton.disabled = this.value <= this.min;

    if (typeof this.onChange === 'function') {
      this.onChange(this.value);
    }
  }

  increment() {
    this.#setValue(this.value + this.step);
  }

  decrement() {
    this.#setValue(this.value - this.step);
  }

  /**
   * @param {number} value
   */
  setValue(value) {
    this.#setValue(value);
  }

  getValue() {
    return this.value;
  }

  /**
   * Removes event listeners by detaching the element from the DOM.
   * Listeners are owned by the buttons inside `this.element`, so
   * removing the element from the tree is sufficient cleanup here.
   */
  destroy() {
    this.element.remove();
  }
}
