/**
 * StorageManager.js
 *
 * Placeholder module — scoped for a future sprint.
 * Will provide a single abstraction over persistence (e.g.
 * localStorage today, a remote sync layer later) so screens and
 * the StateManager never talk to the storage backend directly.
 */
export class StorageManager {
  constructor() {
    this._notImplementedMessage =
      'StorageManager is a placeholder in GP-001 (Project Bootstrap) and will be implemented in a future sprint.';
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
   */
  remove(_key) {
    throw new Error(this._notImplementedMessage);
  }
}
