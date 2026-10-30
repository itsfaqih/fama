import { capture } from 'component-tests/capture';
import { FullRoundButton } from 'components/atoms';
import { expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

test('FullRoundButton: once raised, without keyboard focus no white band separates it from its shadow', async () => {
  await render(<FullRoundButton label="Facebook" animationComplete />);

  expect(
    getComputedStyle(page.getByRole('button', { name: 'Facebook' }).element()).boxShadow,
  ).not.toContain('rgb(255, 255, 255)');
  await capture('FullRoundButton', 'raised');
});

test('FullRoundButton: keyboard focus shows an indigo ring set off by a white gap', async () => {
  await render(<FullRoundButton label="Facebook" animationComplete />);

  await userEvent.tab();

  await expect.element(page.getByRole('button', { name: 'Facebook' })).toHaveFocus();
  const { boxShadow } = getComputedStyle(page.getByRole('button', { name: 'Facebook' }).element());

  expect(boxShadow).toContain('rgb(99, 102, 241)');
  expect(boxShadow).toContain('rgb(255, 255, 255)');
  await capture('FullRoundButton', 'keyboard-focus');
});
