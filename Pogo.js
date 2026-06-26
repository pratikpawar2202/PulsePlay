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
