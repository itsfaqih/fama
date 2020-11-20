import React from 'react';
import 'assets/css/app.css';
import Home from 'pages/Home';
import { LanguageContext, ThemeContext } from 'contexts';
import { useState } from 'react';

function App() {
  const [languange, setLanguage] = useState<'en' | 'id'>('en');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const changeLanguage = (lang: 'en' | 'id') => setLanguage(lang);
  const changeTheme = (theme: 'light' | 'dark') => setTheme(theme);

  return (
    <ThemeContext.Provider value={{ value: theme, change: changeTheme }}>
      <LanguageContext.Provider value={{ value: languange, change: changeLanguage }}>
        <Home />
      </LanguageContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
