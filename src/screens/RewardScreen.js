import { BaseScreen } from '../managers/BaseScreen.js';
import { createButton } from '../components/Button.js';

const NEXT_SCREEN_NAME = 'splash';

/**
 * RewardScreen.js
 *
 * Celebration screen shown immediately after Pogo is fed. Shows the
 * peanuts just earned (read from GameSession) and returns the player
 * to the Splash screen on "Continue".
 */
export class RewardScreen extends BaseScreen {
  /**
   * @param {Object} options
   * @param {import('../state/GameSession.js').GameSession} options.session
   */
  constructor({ session }) {
    super();
    this.session = session;
    this._screenManager = null;
  }

  render() {
    const screen = document.createElement('section');
    screen.classList.add('screen', 'reward-screen');
    screen.setAttribute('aria-label', 'Reward screen');

    const content = document.createElement('div');
    content.classList.add('screen__content');

    const card = document.createElement('div');
    card.classList.add('reward-screen__card');

    const emoji = document.createElement('div');
    emoji.classList.add('reward-screen__emoji');
    emoji.setAttribute('aria-hidden', 'true');
    emoji.textContent = '🎉';

    const title = document.createElement('h1');
    title.classList.add('reward-screen__title');
    title.textContent = 'Great Job!';

    const amount = document.createElement('p');
    amount.classList.add('reward-screen__amount');
    amount.textContent = `+${this.session.getLastRewardAmount()} Peanuts`;

    const continueButton = createButton({
      label: 'Continue',
      variant: 'primary',
      onClick: () => this._screenManager?.show(NEXT_SCREEN_NAME),
    });
    continueButton.classList.add('reward-screen__continue');

    card.append(emoji, title, amount, continueButton);
    content.appendChild(card);
    screen.appendChild(content);

    this.element = screen;
    return screen;
  }

  onEnter({ screenManager }) {
    this._screenManager = screenManager;
  }
}
