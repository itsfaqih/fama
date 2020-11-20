import { createContext } from 'react';

const LanguageContext = createContext<{
  value: 'en' | 'id';
  change: (lang: 'en' | 'id') => void;
}>({
  value: 'en',
  change: lang => {},
});

export default LanguageContext;
