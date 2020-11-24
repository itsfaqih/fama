import React from 'react';
import 'assets/css/app.css';
import Home from 'pages/Home';
import { LanguageContext } from 'contexts';
import { useState } from 'react';

function App() {
  const [languange, setLanguage] = useState<'en' | 'id'>('en');

  const changeLanguage = (lang: 'en' | 'id') => setLanguage(lang);

  return (
    <LanguageContext.Provider value={{ value: languange, change: changeLanguage }}>
      <Home />
    </LanguageContext.Provider>
  );
}

export default App;
