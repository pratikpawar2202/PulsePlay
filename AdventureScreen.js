import { BaseScreen } from '../managers/BaseScreen.js';
import { createPogo } from '../components/Pogo.js';
import { createButton } from '../components/Button.js';
import { Counter } from '../components/Counter.js';

/**
 * AdventureScreen.js
 *
 * The screen players land on after the splash sequence. Gameplay
 * itself is out of scope for GP-001 — this sprint wires up the
 * screen as a real, navigable destination built from the shared
 * component library, ready for gameplay to be layered in later.
 */
export class AdventureScreen extends BaseScreen {
  constructor() {
    super();
    /** @type {Counter|null} */
    this._counter = null;
  }

  render() {
    const screen = document.createElement('section');
    screen.classList.add('screen', 'adventure-screen');
    screen.setAttribute('aria-label', 'Adventure screen');

    const content = document.createElement('div');
    content.classList.add('screen__content');

    const card = document.createElement('div');
    card.classList.add('placeholder-screen__card');

    const eyebrow = document.createElement('span');
    eyebrow.classList.add('placeholder-screen__eyebrow');
    eyebrow.textContent = 'Adventure';

    const pogo = createPogo({ emoji: '🐘', size: '3.5rem', label: 'PulsePlay mascot' });

    const title = document.createElement('h2');
    title.classList.add('placeholder-screen__title');
    title.textContent = 'Your journey starts here';

    const body = document.createElement('p');
    body.classList.add('placeholder-screen__body');
    body.textContent = 'Gameplay arrives in a later sprint. For now, here is the shared component library at work.';

    this._counter = new Counter({ initialValue: 0, min: 0, max: 99 });

    const continueButton = createButton({
      label: 'Claim reward',
      variant: 'primary',
      onClick: () => this._screenManager?.show('reward'),
    });

    card.append(eyebrow, pogo, title, body, this._counter.element, continueButton);
    content.appendChild(card);
    screen.appendChild(content);

    this.element = screen;
    return screen;
  }

  onEnter({ screenManager }) {
    this._screenManager = screenManager;
  }

  onExit() {
    this._counter?.destroy();
    this._counter = null;
  }
}
