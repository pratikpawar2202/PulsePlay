/**
 * AnimationManager.js
 *
 * Placeholder module — scoped for a future sprint.
 * Will centralize orchestration of complex, multi-step animation
 * sequences across screens (e.g. reward celebrations). Simple,
 * single-element animations are handled today via CSS classes
 * directly (see styles/animations.css); this manager will take over
 * once sequences need coordination, queueing, or interruption logic.
 */
export class AnimationManager {
  constructor() {
    this._notImplementedMessage =
      'AnimationManager is a placeholder in GP-001 (Project Bootstrap) and will be implemented in a future sprint.';
  }

  /**
   * @param {HTMLElement} _element
   * @param {string} _animationName
   */
  play(_element, _animationName) {
    throw new Error(this._notImplementedMessage);
  }

  /**
   * @param {HTMLElement} _element
   */
  stop(_element) {
    throw new Error(this._notImplementedMessage);
  }
}
