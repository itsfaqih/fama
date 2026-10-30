import { createContext } from 'react';

export const languages = [
  { value: 'en', label: 'English', path: '/' },
  { value: 'id', label: 'Indonesia', path: '/id/' },
] as const;

export type Language = (typeof languages)[number]['value'];

const LanguageContext = createContext<Language>('en');

export default LanguageContext;
