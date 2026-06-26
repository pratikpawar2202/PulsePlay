import { BaseScreen } from '../managers/BaseScreen.js';
import { createPogo } from '../components/Pogo.js';
import { createButton } from '../components/Button.js';

/**
 * RewardScreen.js
 *
 * Destination screen reached after completing an adventure loop.
 * Reward presentation (animations, payout details) is out of scope
 * for GP-001; this sprint establishes it as a real, navigable screen.
 */
export class RewardScreen extends BaseScreen {
  render() {
    const screen = document.createElement('section');
    screen.classList.add('screen', 'reward-screen');
    screen.setAttribute('aria-label', 'Reward screen');

    const content = document.createElement('div');
    content.classList.add('screen__content');

    const card = document.createElement('div');
    card.classList.add('placeholder-screen__card');

    const eyebrow = document.createElement('span');
    eyebrow.classList.add('placeholder-screen__eyebrow');
    eyebrow.textContent = 'Reward';

    const pogo = createPogo({ emoji: '🐘', size: '3.5rem', animated: true, label: 'PulsePlay mascot celebrating' });

    const title = document.createElement('h2');
    title.classList.add('placeholder-screen__title');
    title.textContent = 'Nice work!';

    const body = document.createElement('p');
    body.classList.add('placeholder-screen__body');
    body.textContent = 'Reward logic and payouts land in a future sprint. Head back to play again.';

    const restartButton = createButton({
      label: 'Play again',
      variant: 'secondary',
      onClick: () => this._screenManager?.show('splash'),
    });

    card.append(eyebrow, pogo, title, body, restartButton);
    content.appendChild(card);
    screen.appendChild(content);

    this.element = screen;
    return screen;
  }

  onEnter({ screenManager }) {
    this._screenManager = screenManager;
  }
}
