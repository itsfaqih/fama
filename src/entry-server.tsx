import { LanguageContext } from 'contexts';
import { Language } from 'contexts/language';
import Home from 'pages/Home';
import React, { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';

export function render(language: Language) {
  return renderToString(
    <StrictMode>
      <LanguageContext.Provider value={language}>
        <Home />
      </LanguageContext.Provider>
    </StrictMode>,
  );
}
