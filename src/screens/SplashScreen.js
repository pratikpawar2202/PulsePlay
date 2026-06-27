import { BaseScreen } from '../managers/BaseScreen.js';
import { createPogo } from '../components/Pogo.js';
import { createLoadingDots } from '../components/LoadingDots.js';

const AUTO_TRANSITION_DELAY_MS = 2000;
const NEXT_SCREEN_NAME = 'adventure';

/**
 * SplashScreen.js
 *
 * First screen shown on app launch. Displays the mascot, wordmark,
 * tagline, and a loading indicator, then automatically transitions
 * to the Adventure screen after a fixed delay.
 */
export class SplashScreen extends BaseScreen {
  constructor() {
    super();
    /** @type {number|null} */
    this._autoTransitionTimer = null;
  }

  render() {
    const screen = document.createElement('section');
    screen.classList.add('screen', 'splash-screen');
    screen.setAttribute('aria-label', 'PulsePlay splash screen');

    const content = document.createElement('div');
    content.classList.add('screen__content');

    const mark = document.createElement('div');
    mark.classList.add('splash-screen__mark');

    const pogo = createPogo({ emoji: '🐘', label: 'PulsePlay mascot' });

    const title = document.createElement('h1');
    title.classList.add('splash-screen__title');
    title.textContent = 'PulsePlay';

    const tagline = document.createElement('p');
    tagline.classList.add('splash-screen__tagline');
    tagline.textContent = 'Play. Eat. Repeat.';

    mark.append(pogo, title, tagline);

    const loadingWrapper = document.createElement('div');
    loadingWrapper.classList.add('splash-screen__loading');
    loadingWrapper.appendChild(createLoadingDots({ label: 'Loading PulsePlay' }));

    content.append(mark, loadingWrapper);
    screen.appendChild(content);

    this.element = screen;
    return screen;
  }

  onEnter({ screenManager }) {
    this._autoTransitionTimer = window.setTimeout(() => {
      screenManager.show(NEXT_SCREEN_NAME);
    }, AUTO_TRANSITION_DELAY_MS);
  }

  onExit() {
    if (this._autoTransitionTimer !== null) {
      window.clearTimeout(this._autoTransitionTimer);
      this._autoTransitionTimer = null;
    }
  }
}
