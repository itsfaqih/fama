import LanguageContext from 'contexts/language';
import React, { ReactNode } from 'react';

export function inIndonesian(ui: ReactNode) {
  return (
    <LanguageContext.Provider value={{ value: 'id', change: () => {} }}>
      {ui}
    </LanguageContext.Provider>
  );
}
