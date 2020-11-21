import { createContext } from 'react';

export interface LocaleProps {
  value: 'en' | 'id';
  change: (lang: 'en' | 'id') => void;
}

const LanguageContext = createContext<LocaleProps>({
  value: 'en',
  change: lang => {},
});

export default LanguageContext;
