import { App } from './App.js';

/**
 * main.js
 *
 * Vite entry point. Finds the app's mount node and boots the App.
 */
function bootstrap() {
  const rootElement = document.getElementById('app');

  if (!rootElement) {
    throw new Error('Could not find #app mount element in index.html.');
  }

  const app = new App(rootElement);
  app.start();
}

bootstrap();
