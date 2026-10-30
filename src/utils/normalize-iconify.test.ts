import normalizeIconifyIcon from 'utils/normalize-iconify';
import { expect, test } from 'vite-plus/test';

const icon = { body: '<path d="M0 0h1v1H0z"/>', width: 256, height: 256 };

test('returns an icon that arrives as plain icon data', () => {
  expect(normalizeIconifyIcon(icon)).toEqual({
    body: '<path d="M0 0h1v1H0z"/>',
    width: 256,
    height: 256,
  });
});

test('unwraps an icon that Vite hands over as a CommonJS module object', () => {
  expect(normalizeIconifyIcon({ default: icon })).toEqual({
    body: '<path d="M0 0h1v1H0z"/>',
    width: 256,
    height: 256,
  });
});
