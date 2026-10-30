import 'assets/css/styles.css';
import { MotionGlobalConfig } from 'motion/react';
import { afterEach, beforeEach } from 'vite-plus/test';

MotionGlobalConfig.skipAnimations = true;

const noTransitions = document.createElement('style');

noTransitions.textContent =
  '*, *::before, *::after { transition: none !important; animation: none !important; }';

document.head.append(noTransitions);

const consoleErrors: string[] = [];

const originalConsoleError = console.error.bind(console);

beforeEach(() => {
  consoleErrors.length = 0;

  console.error = (...messages: unknown[]) => {
    consoleErrors.push(messages.map(String).join(' '));
    originalConsoleError(...messages);
  };
});

afterEach(() => {
  console.error = originalConsoleError;

  if (consoleErrors.length > 0) {
    throw new Error(`console.error during test:\n${consoleErrors.join('\n')}`);
  }
});
