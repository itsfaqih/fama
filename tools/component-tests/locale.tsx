import LanguageContext from 'contexts/language';
import React, { ReactNode } from 'react';

/** Wraps a component in the Indonesian locale; components default to English. */
export function inIndonesian(ui: ReactNode) {
  return (
    <LanguageContext.Provider value={{ value: 'id', change: () => {} }}>
      {ui}
    </LanguageContext.Provider>
  );
}
