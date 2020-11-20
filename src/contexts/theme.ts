import { createContext } from 'react';

const ThemeContext = createContext<{
  value: 'light' | 'dark';
  change: (theme: 'light' | 'dark') => void;
}>({
  value: 'light',
  change: theme => {},
});

export default ThemeContext;
