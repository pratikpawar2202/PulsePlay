/**
 * ScreenManager.js
 *
 * Owns the lifecycle of every screen in the app: registration,
 * showing, hiding, and animated transitions between them. This is
 * the only manager implemented in GP-001 — StateManager,
 * AnimationManager, and StorageManager exist as placeholder modules
 * to be filled in during later sprints.
 */
export class ScreenManager {
  /**
   * @param {HTMLElement} rootElement - Container all screens mount into.
   */
  constructor(rootElement) {
    if (!rootElement) {
      throw new Error('ScreenManager requires a root element to mount screens into.');
    }

    this.root = rootElement;
    /** @type {Map<string, import('./BaseScreen.js').BaseScreen>} */
    this.screens = new Map();
    /** @type {string|null} */
    this.activeScreenName = null;
    /** @type {boolean} Guards against overlapping transitions. */
    this.isTransitioning = false;
  }

  /**
   * Registers a screen instance under a unique name.
   *
   * @param {string} name
   * @param {import('./BaseScreen.js').BaseScreen} screenInstance
   */
  register(name, screenInstance) {
    if (this.screens.has(name)) {
      throw new Error(`A screen named "${name}" is already registered.`);
    }
    this.screens.set(name, screenInstance);
  }

  /**
   * @param {string} name
   * @returns {import('./BaseScreen.js').BaseScreen}
   */
  #getScreenOrThrow(name) {
    const screen = this.screens.get(name);
    if (!screen) {
      throw new Error(`No screen registered under the name "${name}".`);
    }
    return screen;
  }

  /**
   * Mounts and displays a screen by name. If another screen is
   * currently active, it is transitioned out first.
   *
   * @param {string} name
   * @returns {Promise<void>}
   */
  async show(name) {
    if (this.isTransitioning) return;

    const nextScreen = this.#getScreenOrThrow(name);
    const previousScreenName = this.activeScreenName;
    const previousScreen = previousScreenName
      ? this.screens.get(previousScreenName)
      : null;

    this.isTransitioning = true;

    try {
      const nextElement = nextScreen.render();
      nextScreen.element = nextElement;

      if (previousScreen) {
        await this.transition(previousScreen, nextScreen);
      } else {
        this.root.appendChild(nextElement);
        nextElement.classList.add('fade-in');
      }

      this.activeScreenName = name;
      nextScreen.onEnter({ screenManager: this });
    } finally {
      this.isTransitioning = false;
    }
  }

  /**
   * Hides a screen by name. If it is the active screen, runs its
   * exit lifecycle and removes it from the DOM.
   *
   * @param {string} name
   */
  hide(name) {
    const screen = this.#getScreenOrThrow(name);
    screen.onExit();
    screen.destroy();

    if (this.activeScreenName === name) {
      this.activeScreenName = null;
    }
  }

  /**
   * Performs an animated crossfade from one screen to another.
   * The outgoing screen fades out and is destroyed; the incoming
   * screen is appended and fades in.
   *
   * @param {import('./BaseScreen.js').BaseScreen} fromScreen
   * @param {import('./BaseScreen.js').BaseScreen} toScreen
   * @returns {Promise<void>}
   */
  transition(fromScreen, toScreen) {
    return new Promise((resolve) => {
      const outgoingElement = fromScreen.element;
      const incomingElement = toScreen.element;

      fromScreen.onExit();

      let hasFinished = false;
      const finishExit = () => {
        if (hasFinished) return;
        hasFinished = true;

        outgoingElement?.removeEventListener('animationend', finishExit);
        fromScreen.destroy();

        this.root.appendChild(incomingElement);
        incomingElement.classList.add('fade-in');
        resolve();
      };

      if (outgoingElement) {
        outgoingElement.classList.add('fade-out');
        outgoingElement.addEventListener('animationend', finishExit, { once: true });
        // Fallback in case the animationend event never fires (e.g. element
        // already detached or animations disabled by reduced-motion media query).
        setTimeout(finishExit, 400);
      } else {
        finishExit();
      }
    });
  }
}
