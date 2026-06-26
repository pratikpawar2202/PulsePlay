/**
 * BaseScreen.js
 *
 * Defines the contract every screen must implement so the
 * ScreenManager can mount, transition, and unmount them uniformly.
 * Concrete screens (SplashScreen, AdventureScreen, RewardScreen)
 * extend this class.
 */
export class BaseScreen {
  constructor() {
    /** @type {HTMLElement|null} Root DOM node for this screen, created in render(). */
    this.element = null;
  }

  /**
   * Builds and returns the screen's root DOM element.
   * Must be implemented by subclasses.
   *
   * @returns {HTMLElement}
   */
  render() {
    throw new Error(`${this.constructor.name} must implement render()`);
  }

  /**
   * Lifecycle hook called after the screen has been mounted and
   * shown in the DOM. Use this for side effects like timers or
   * auto-transitions.
   *
   * @param {{ screenManager: import('./ScreenManager.js').ScreenManager }} context
   */
  onEnter(_context) {}

  /**
   * Lifecycle hook called just before the screen is removed from the DOM.
   * Use this to clear timers, listeners, or other side effects started in onEnter().
   */
  onExit() {}

  /**
   * Removes the screen's element from the DOM and clears the reference.
   */
  destroy() {
    this.element?.remove();
    this.element = null;
  }
}
