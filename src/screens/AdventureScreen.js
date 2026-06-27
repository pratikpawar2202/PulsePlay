import { BaseScreen } from '../managers/BaseScreen.js';
import { createPogo, playPogoFeedAnimation } from '../components/Pogo.js';
import { createSpeechBubble } from '../components/SpeechBubble.js';
import { TopBar } from '../components/TopBar.js';
import { FoodItem } from '../components/FoodItem.js';

const REWARD_AMOUNT = 10;
const NEXT_SCREEN_NAME = 'reward';
const POST_FEED_TRANSITION_DELAY_MS = 250;

const FOOD_ITEMS = [
  { id: 'apple', emoji: '🍎', label: 'Apple' },
  { id: 'banana', emoji: '🍌', label: 'Banana' },
  { id: 'carrot', emoji: '🥕', label: 'Carrot' },
  { id: 'coconut', emoji: '🥥', label: 'Coconut' },
];

/**
 * AdventureScreen.js
 *
 * The first playable experience (GP-002). The player drags any one
 * food item onto Pogo to feed him; on a successful drop, Pogo reacts,
 * peanuts increase, and the screen transitions to the Reward screen.
 */
export class AdventureScreen extends BaseScreen {
  /**
   * @param {Object} options
   * @param {import('../state/GameSession.js').GameSession} options.session
   */
  constructor({ session }) {
    super();
    this.session = session;
    this._screenManager = null;
    this._topBar = null;
    this._pogoElement = null;
    this._foodItems = [];
    this._hasFed = false;
  }

  render() {
    this._hasFed = false;
    this._foodItems = [];

    const screen = document.createElement('section');
    screen.classList.add('screen', 'adventure-screen');
    screen.setAttribute('aria-label', 'Adventure screen — feed Pogo');

    screen.appendChild(this.#buildTopBar());
    screen.appendChild(this.#buildCenter());
    screen.appendChild(this.#buildFoodTray());

    this.element = screen;
    return screen;
  }

  #buildTopBar() {
    this._topBar = new TopBar({
      peanuts: this.session.getPeanuts(),
      streakDays: this.session.getStreakDays(),
    });
    this._topBar.element.classList.add('adventure-screen__topbar');
    return this._topBar.element;
  }

  #buildCenter() {
    const center = document.createElement('div');
    center.classList.add('adventure-screen__center');

    const villageName = document.createElement('h1');
    villageName.classList.add('adventure-screen__village-name');
    villageName.textContent = this.session.getVillageName();

    this._pogoElement = createPogo({
      emoji: '🐘',
      size: '7rem',
      label: 'Pogo the elephant',
    });
    this._pogoElement.classList.add('adventure-screen__pogo');

    const speechBubble = createSpeechBubble({ text: 'Pogo is hungry today!' });
    speechBubble.classList.add('adventure-screen__speech-bubble');

    center.append(villageName, this._pogoElement, speechBubble);
    return center;
  }

  #buildFoodTray() {
    const trayWrapper = document.createElement('div');
    trayWrapper.classList.add('adventure-screen__tray-wrapper');

    const tray = document.createElement('div');
    tray.classList.add('adventure-screen__food-tray');

    FOOD_ITEMS.forEach((food) => {
      const foodItem = new FoodItem({
        emoji: food.emoji,
        label: food.label,
        getDropTarget: () => this._pogoElement,
        onDeliver: () => this.#handleFeed(foodItem),
      });
      this._foodItems.push(foodItem);
      tray.appendChild(foodItem.element);
    });

    const instruction = document.createElement('p');
    instruction.classList.add('adventure-screen__instruction');
    instruction.textContent = 'Drag food to Pogo';

    trayWrapper.append(tray, instruction);
    return trayWrapper;
  }

  /**
   * Runs the full feed sequence: disables further drags, plays the
   * food's delivery animation alongside Pogo's happy bounce, updates
   * peanuts, then hands off to the Reward screen.
   *
   * @param {FoodItem} deliveredFoodItem
   */
  async #handleFeed(deliveredFoodItem) {
    if (this._hasFed) return;
    this._hasFed = true;

    this._foodItems.forEach((foodItem) => {
      if (foodItem !== deliveredFoodItem) {
        foodItem.disable();
      }
    });

    await Promise.all([
      deliveredFoodItem.playDeliverAnimation(),
      playPogoFeedAnimation(this._pogoElement),
    ]);

    deliveredFoodItem.element.remove();

    const newPeanutTotal = this.session.addPeanuts(REWARD_AMOUNT);
    this.session.setLastRewardAmount(REWARD_AMOUNT);
    this._topBar.setPeanuts(newPeanutTotal);

    window.setTimeout(() => {
      this._screenManager?.show(NEXT_SCREEN_NAME);
    }, POST_FEED_TRANSITION_DELAY_MS);
  }

  onEnter({ screenManager }) {
    this._screenManager = screenManager;
  }

  onExit() {
    this._foodItems.forEach((foodItem) => foodItem.destroy());
    this._foodItems = [];
    this._topBar?.destroy();
    this._topBar = null;
  }
}
