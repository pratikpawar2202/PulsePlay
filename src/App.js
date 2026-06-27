import { ScreenManager } from './managers/ScreenManager.js';
import { StateManager } from './managers/StateManager.js';
import { AnimationManager } from './managers/AnimationManager.js';
import { StorageManager } from './managers/StorageManager.js';
import { AudioManager } from './managers/AudioManager.js';
import { GameSession } from './state/GameSession.js';
import { SplashScreen } from './screens/SplashScreen.js';
import { AdventureScreen } from './screens/AdventureScreen.js';
import { RewardScreen } from './screens/RewardScreen.js';

const INITIAL_SCREEN_NAME = 'splash';

/**
 * App.js
 *
 * Composition root. Instantiates the architectural managers (Screen,
 * State, Animation, Storage, Audio), registers all screens with the
 * Screen Manager, and boots the app on the first screen.
 *
 * Only the Screen Manager does real work so far. State, Animation,
 * Storage, and (as of GP-002) Audio are constructed so the seams
 * exist, but their methods are intentionally unimplemented
 * placeholders. GameSession is a separate, lightweight holder for
 * this sprint's gameplay data (peanuts, streak) — see
 * src/state/GameSession.js for why it isn't a fifth manager.
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
    this.audioManager = new AudioManager();

    this.gameSession = new GameSession();
  }

  /**
   * Registers all known screens with the Screen Manager.
   */
  #registerScreens() {
    this.screenManager.register('splash', new SplashScreen());
    this.screenManager.register('adventure', new AdventureScreen({ session: this.gameSession }));
    this.screenManager.register('reward', new RewardScreen({ session: this.gameSession }));
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
