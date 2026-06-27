/**
 * LoadingDots.js
 *
 * Three-dot loading indicator used while screens prepare content
 * (e.g. the Splash screen). Purely presentational and animation-driven
 * via CSS — no internal timers or state.
 *
 * @param {Object} [options]
 * @param {string} [options.label] - Optional visually-hidden label for assistive tech.
 * @returns {HTMLDivElement}
 */
export function createLoadingDots({ label = 'Loading' } = {}) {
  const container = document.createElement('div');
  container.classList.add('pp-loading-dots');
  container.setAttribute('role', 'status');
  container.setAttribute('aria-label', label);

  for (let i = 0; i < 3; i += 1) {
    const dot = document.createElement('span');
    dot.classList.add('pp-loading-dots__dot');
    dot.setAttribute('aria-hidden', 'true');
    container.appendChild(dot);
  }

  return container;
}
