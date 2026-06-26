import { ScreenManager } from './managers/ScreenManager.js';
import { StateManager } from './managers/StateManager.js';
import { AnimationManager } from './managers/AnimationManager.js';
import { StorageManager } from './managers/StorageManager.js';
import { SplashScreen } from './screens/SplashScreen.js';
import { AdventureScreen } from './screens/AdventureScreen.js';
import { RewardScreen } from './screens/RewardScreen.js';

const INITIAL_SCREEN_NAME = 'splash';

/**
 * App.js
 *
 * Composition root. Instantiates the four managers described in the
 * architecture (Screen, State, Animation, Storage), registers all
 * screens with the Screen Manager, and boots the app on the first
 * screen. Only the Screen Manager does real work in GP-001 — the
 * others are constructed so the seams exist, but their methods are
 * intentionally unimplemented placeholders.
 */
export class App {
  /**
   * @param {HTMLElement} rootElement - The DOM node the app mounts into.
   */
  constructor(rootElement) {
    this.rootElement = rootElement;

    this.screenManager = new ScreenManager(rootElement);
    this.stateManager = new StateManager();
    this.animationManager = new AnimationManager();
    this.storageManager = new StorageManager();
  }

  /**
   * Registers all known screens with the Screen Manager.
   */
  #registerScreens() {
    this.screenManager.register('splash', new SplashScreen());
    this.screenManager.register('adventure', new AdventureScreen());
    this.screenManager.register('reward', new RewardScreen());
  }

  /**
   * Boots the application: registers screens and shows the first one.
   * @returns {Promise<void>}
   */
  async start() {
    this.#registerScreens();
    await this.screenManager.show(INITIAL_SCREEN_NAME);
  }
}
