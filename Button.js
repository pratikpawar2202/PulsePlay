/**
 * Button.js
 *
 * Reusable button component. Returns a plain DOM element so it can be
 * composed by any screen without depending on a UI framework.
 *
 * @param {Object} options
 * @param {string} options.label - Visible button text.
 * @param {'primary'|'secondary'|'ghost'} [options.variant='primary'] - Visual style.
 * @param {() => void} [options.onClick] - Click handler.
 * @param {boolean} [options.disabled=false] - Disabled state.
 * @param {string} [options.type='button'] - Native button type attribute.
 * @returns {HTMLButtonElement}
 */
export function createButton({
  label,
  variant = 'primary',
  onClick,
  disabled = false,
  type = 'button',
}) {
  const button = document.createElement('button');
  button.type = type;
  button.classList.add('pp-button', `pp-button--${variant}`);
  button.textContent = label;
  button.disabled = disabled;

  if (typeof onClick === 'function') {
    button.addEventListener('click', onClick);
  }

  return button;
}

/**
 * Updates a button's label and/or disabled state in place.
 * Avoids forcing callers to re-create the element for simple updates.
 *
 * @param {HTMLButtonElement} button
 * @param {Object} updates
 * @param {string} [updates.label]
 * @param {boolean} [updates.disabled]
 */
export function updateButton(button, { label, disabled } = {}) {
  if (label !== undefined) {
    button.textContent = label;
  }
  if (disabled !== undefined) {
    button.disabled = disabled;
  }
}
