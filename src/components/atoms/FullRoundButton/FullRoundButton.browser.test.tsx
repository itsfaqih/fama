import { capture } from 'component-tests/capture';
import { FullRoundButton } from 'components/atoms';
import { expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const href = 'https://www.facebook.com/faqih.muntashir';

test('FullRoundButton: without keyboard focus no white band separates it from its shadow', async () => {
  await render(<FullRoundButton label="Facebook" href={href} />);

  expect(
    getComputedStyle(page.getByRole('link', { name: 'Facebook' }).element()).boxShadow,
  ).not.toContain('rgb(255, 255, 255)');
  await capture('FullRoundButton', 'default');
});

test('FullRoundButton: keyboard focus shows an indigo ring set off by a white gap', async () => {
  await render(<FullRoundButton label="Facebook" href={href} />);

  await userEvent.tab();

  await expect.element(page.getByRole('link', { name: 'Facebook' })).toHaveFocus();
  const { boxShadow } = getComputedStyle(page.getByRole('link', { name: 'Facebook' }).element());

  expect(boxShadow).toContain('rgb(99, 102, 241)');
  expect(boxShadow).toContain('rgb(255, 255, 255)');
  await capture('FullRoundButton', 'keyboard-focus');
});
