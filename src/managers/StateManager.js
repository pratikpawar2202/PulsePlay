/**
 * StateManager.js
 *
 * Placeholder module — scoped for a future sprint.
 * Will own application/game state (score, session, player profile)
 * and notify subscribers of changes. The public API below is a
 * stable contract so other modules can be written against it now;
 * the internals are intentionally not implemented in GP-001.
 */
export class StateManager {
  constructor() {
    this._notImplementedMessage =
      'StateManager is a placeholder in GP-001 (Project Bootstrap) and will be implemented in a future sprint.';
  }

  /**
   * @param {string} _key
   */
  get(_key) {
    throw new Error(this._notImplementedMessage);
  }

  /**
   * @param {string} _key
   * @param {*} _value
   */
  set(_key, _value) {
    throw new Error(this._notImplementedMessage);
  }

  /**
   * @param {string} _key
   * @param {(value: *) => void} _callback
   */
  subscribe(_key, _callback) {
    throw new Error(this._notImplementedMessage);
  }
}
