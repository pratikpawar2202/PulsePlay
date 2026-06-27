/**
 * AudioManager.js
 *
 * Placeholder module — scoped for a future sprint (per GP-002).
 * Will own sound effect and music playback (feed sounds, reward
 * fanfare, ambient village loop, mute toggle). The public API below
 * is a stable contract so call sites can be wired up now; playback
 * itself is intentionally not implemented yet.
 */
export class AudioManager {
  constructor() {
    this._notImplementedMessage =
      'AudioManager is a placeholder in GP-002 (First Playable Experience) and will be implemented in a future sprint.';
  }

  /**
   * @param {string} _soundName
   */
  play(_soundName) {
    throw new Error(this._notImplementedMessage);
  }

  /**
   * @param {string} _soundName
   */
  stop(_soundName) {
    throw new Error(this._notImplementedMessage);
  }

  /**
   * @param {boolean} _isMuted
   */
  setMuted(_isMuted) {
    throw new Error(this._notImplementedMessage);
  }
}
