if (import.meta.env.DEV) {
  void import('react-grab');
}

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './assets/css/styles.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element was not found.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
