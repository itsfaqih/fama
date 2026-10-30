import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import { LanguageSwitch } from 'components/molecules';
import { expect, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const languageSwitch = (name: string) => page.getByText(`Language: ${name}`, { exact: true });

test('Language: closed, the switch names the current language and hides the list', async () => {
  await render(<LanguageSwitch />);

  await expect.element(languageSwitch('English')).toBeVisible();
  await expect
    .element(page.getByRole('link', { name: 'Indonesia', includeHidden: true }))
    .not.toBeVisible();
  await capture('LanguageSwitch', 'closed');
});

test('Language: open, English is the current page and Indonesia links to /id/', async () => {
  await render(<LanguageSwitch />);

  await userEvent.click(languageSwitch('English'));

  await expect.element(page.getByRole('link', { name: 'English' })).toHaveAttribute('href', '/');
  await expect
    .element(page.getByRole('link', { name: 'English' }))
    .toHaveAttribute('aria-current', 'page');
  await expect
    .element(page.getByRole('link', { name: 'Indonesia' }))
    .toHaveAttribute('href', '/id/');
  await expect
    .element(page.getByRole('link', { name: 'Indonesia' }))
    .not.toHaveAttribute('aria-current');
});

test('Language: in Indonesian the switch names Indonesia as the current page', async () => {
  await render(inIndonesian(<LanguageSwitch />));

  await userEvent.click(languageSwitch('Indonesia'));

  await expect
    .element(page.getByRole('link', { name: 'Indonesia' }))
    .toHaveAttribute('aria-current', 'page');
  await expect
    .element(page.getByRole('link', { name: 'English' }))
    .not.toHaveAttribute('aria-current');
});

test('Language: the list opens below the switch, aligned to its left edge', async () => {
  await render(
    <div style={{ paddingLeft: 400 }}>
      <LanguageSwitch />
    </div>,
  );

  await userEvent.click(languageSwitch('English'));
  await expect.element(page.getByRole('list')).toBeVisible();

  const trigger = languageSwitch('English').element().getBoundingClientRect();
  const list = page.getByRole('list').element().getBoundingClientRect();

  expect(list.left).toBe(trigger.left);
  expect(list.top).toBeGreaterThan(trigger.bottom);
  await capture('LanguageSwitch', 'open');
});

test('Language: keyboard focus inside the open list shows an indigo ring', async () => {
  await render(<LanguageSwitch />);

  await userEvent.tab();
  await userEvent.keyboard('{Enter}');
  await userEvent.tab();

  await expect.element(page.getByRole('link', { name: 'English' })).toHaveFocus();
  expect(getComputedStyle(page.getByRole('list').element()).boxShadow).toContain(
    'rgb(99, 102, 241)',
  );
  await capture('LanguageSwitch', 'open-keyboard');
});
