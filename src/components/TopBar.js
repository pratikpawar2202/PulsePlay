/**
 * TopBar.js
 *
 * Persistent top bar showing the player's peanut count and day
 * streak. Display-only (no +/- controls, unlike Counter.js) — values
 * are driven externally via setPeanuts()/setStreakDays(), which also
 * trigger a small "bump" animation so increases feel rewarding.
 */
export class TopBar {
  /**
   * @param {Object} options
   * @param {number} options.peanuts
   * @param {number} options.streakDays
   */
  constructor({ peanuts, streakDays }) {
    this.element = this.#buildElement(peanuts, streakDays);
  }

  #buildElement(peanuts, streakDays) {
    const bar = document.createElement('div');
    bar.classList.add('pp-topbar');

    const { stat: peanutStat, valueEl: peanutValueEl } = this.#buildStat({
      icon: '🥜',
      value: String(peanuts),
      label: 'Peanuts',
      modifier: 'peanuts',
    });
    this._peanutValueEl = peanutValueEl;

    const { stat: streakStat } = this.#buildStat({
      icon: '🔥',
      value: `Day ${streakDays}`,
      label: 'Day streak',
      modifier: 'streak',
    });

    bar.append(peanutStat, streakStat);
    return bar;
  }

  #buildStat({ icon, value, label, modifier }) {
    const stat = document.createElement('div');
    stat.classList.add('pp-topbar__stat', `pp-topbar__stat--${modifier}`);
    stat.setAttribute('role', 'status');
    stat.setAttribute('aria-label', `${label}: ${value}`);

    const iconEl = document.createElement('span');
    iconEl.classList.add('pp-topbar__icon');
    iconEl.setAttribute('aria-hidden', 'true');
    iconEl.textContent = icon;

    const valueEl = document.createElement('span');
    valueEl.classList.add('pp-topbar__value');
    valueEl.textContent = value;

    stat.append(iconEl, valueEl);
    return { stat, valueEl };
  }

  /**
   * Updates the peanut count and plays a short "bump" animation.
   * @param {number} peanuts
   */
  setPeanuts(peanuts) {
    this._peanutValueEl.textContent = String(peanuts);
    this._peanutValueEl.classList.remove('pp-topbar__value--bump');
    // Reflow forces the animation to restart even if it's still mid-flight.
    void this._peanutValueEl.offsetWidth;
    this._peanutValueEl.classList.add('pp-topbar__value--bump');
  }

  destroy() {
    this.element.remove();
  }
}
