const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.tsx', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      indigo: colors.indigo,
      gray: colors.coolGray,
      yellow: colors.yellow,
      white: colors.white,
      transparent: 'transparent',
    },
    fontFamily: {
      sans: ['Inter var', ...defaultTheme.fontFamily.sans],
    },
    extend: {
      spacing: {
        'full-2': 'calc(100% + 0.5rem)',
      },
      lineHeight: {
        'extra-loose': '2.5',
      },
      zIndex: {
        '-10': '-10',
      },
      scale: {
        '999': '99'
      }
    },
  },
  variants: {
    extend: {
      scale: ['focus-within'],
      width: ['group-hover', 'group-focus'],
      translate: ['group-hover'],
    },
  },
  plugins: [],
};
