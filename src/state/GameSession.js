/**
 * GameSession.js
 *
 * Lightweight, sprint-scoped holder for in-session game data
 * (peanuts, streak, last reward). This is intentionally NOT one of
 * the four architectural managers — StateManager remains a
 * placeholder per GP-001. GameSession exists only so AdventureScreen
 * and RewardScreen can share data without changing ScreenManager's
 * contract. Once StateManager is implemented, this class's
 * responsibilities should move there and this file can be retired.
 */
const DEFAULT_PEANUTS = 250;
const DEFAULT_STREAK_DAYS = 12;
const DEFAULT_VILLAGE_NAME = 'Mango Village';

export class GameSession {
  constructor({
    peanuts = DEFAULT_PEANUTS,
    streakDays = DEFAULT_STREAK_DAYS,
    villageName = DEFAULT_VILLAGE_NAME,
  } = {}) {
    this._peanuts = peanuts;
    this._streakDays = streakDays;
    this._villageName = villageName;
    this._lastRewardAmount = 0;
  }

  getPeanuts() {
    return this._peanuts;
  }

  /**
   * @param {number} amount
   * @returns {number} the new peanut total
   */
  addPeanuts(amount) {
    this._peanuts += amount;
    return this._peanuts;
  }

  getStreakDays() {
    return this._streakDays;
  }

  getVillageName() {
    return this._villageName;
  }

  /**
   * @param {number} amount
   */
  setLastRewardAmount(amount) {
    this._lastRewardAmount = amount;
  }

  getLastRewardAmount() {
    return this._lastRewardAmount;
  }
}
