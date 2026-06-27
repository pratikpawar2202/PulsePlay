/**
 * Pogo.js
 *
 * PulsePlay's mascot component. Renders as an emoji placeholder for
 * now (per GP-001 scope) and will be swapped for illustrated/animated
 * artwork in a later sprint without changing the component's public API.
 *
 * @param {Object} [options]
 * @param {string} [options.emoji='🐘'] - Placeholder glyph for the mascot.
 * @param {string} [options.size] - CSS font-size value, e.g. '4.5rem'.
 * @param {boolean} [options.animated=true] - Whether the idle bounce animation plays.
 * @param {string} [options.label='PulsePlay mascot'] - Accessible label.
 * @returns {HTMLSpanElement}
 */
export function createPogo({
  emoji = '🐘',
  size,
  animated = true,
  label = 'PulsePlay mascot',
} = {}) {
  const pogo = document.createElement('span');
  pogo.classList.add('pp-pogo');
  if (!animated) {
    pogo.classList.add('pp-pogo--idle');
  }
  if (size) {
    pogo.style.setProperty('--pp-pogo-size', size);
  }
  pogo.setAttribute('role', 'img');
  pogo.setAttribute('aria-label', label);
  pogo.textContent = emoji;

  return pogo;
}

/**
 * Toggles the idle/animated state of an existing Pogo element.
 *
 * @param {HTMLElement} pogoElement
 * @param {boolean} animated
 */
export function setPogoAnimated(pogoElement, animated) {
  pogoElement.classList.toggle('pp-pogo--idle', !animated);
}

/**
 * Plays Pogo's "just got fed" reaction: a happy scale-and-bounce.
 * Temporarily swaps out the idle bounce so the two animations don't
 * fight over the same transform property, then restores it after.
 *
 * @param {HTMLElement} pogoElement
 * @returns {Promise<void>}
 */
export function playPogoFeedAnimation(pogoElement) {
  return new Promise((resolve) => {
    const wasIdle = pogoElement.classList.contains('pp-pogo--idle');
    pogoElement.classList.add('pp-pogo--idle');
    pogoElement.classList.add('pp-pogo--fed');

    let hasFinished = false;
    const finish = () => {
      if (hasFinished) return;
      hasFinished = true;

      pogoElement.removeEventListener('animationend', finish);
      pogoElement.classList.remove('pp-pogo--fed');
      if (!wasIdle) {
        pogoElement.classList.remove('pp-pogo--idle');
      }
      resolve();
    };

    pogoElement.addEventListener('animationend', finish, { once: true });
    setTimeout(finish, 700);
  });
}
