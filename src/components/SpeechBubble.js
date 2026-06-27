/**
 * SpeechBubble.js
 *
 * Small rounded speech bubble with a tail, used to give Pogo a voice
 * without resorting to a modal or form-like UI element.
 *
 * @param {Object} options
 * @param {string} options.text
 * @returns {HTMLDivElement}
 */
export function createSpeechBubble({ text }) {
  const bubble = document.createElement('div');
  bubble.classList.add('pp-speech-bubble');

  const message = document.createElement('p');
  message.classList.add('pp-speech-bubble__text');
  message.textContent = text;

  bubble.appendChild(message);
  return bubble;
}

/**
 * Updates an existing speech bubble's text in place.
 * @param {HTMLElement} bubbleElement
 * @param {string} text
 */
export function setSpeechBubbleText(bubbleElement, text) {
  const message = bubbleElement.querySelector('.pp-speech-bubble__text');
  if (message) {
    message.textContent = text;
  }
}
