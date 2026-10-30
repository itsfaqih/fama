import { capture } from 'component-tests/capture';
import { RoundedButton } from 'components/atoms';
import { expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

test('RoundedButton: without keyboard focus no white band separates it from its shadow', async () => {
  await render(<RoundedButton>Send</RoundedButton>);

  expect(
    getComputedStyle(page.getByRole('button', { name: 'Send' }).element()).boxShadow,
  ).not.toContain('rgb(255, 255, 255)');
  await capture('RoundedButton', 'default');
});

test('RoundedButton: keyboard focus shows an indigo ring set off by a white gap', async () => {
  await render(<RoundedButton>Send</RoundedButton>);

  await userEvent.tab();

  await expect.element(page.getByRole('button', { name: 'Send' })).toHaveFocus();
  const { boxShadow } = getComputedStyle(page.getByRole('button', { name: 'Send' }).element());

  expect(boxShadow).toContain('rgb(99, 102, 241)');
  expect(boxShadow).toContain('rgb(255, 255, 255)');
  await capture('RoundedButton', 'keyboard-focus');
});
