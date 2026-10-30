import { capture } from 'component-tests/capture';
import TextSelect from 'components/molecules/TextSelect';
import { TextSelectOptionProps } from 'components/molecules/TextSelect/types';
import { expect, test, vi } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const english = { label: 'English', value: 'en' };

const indonesia = { label: 'Indonesia', value: 'id' };

test('Language: the trigger names the selected language', async () => {
  await render(<TextSelect options={[english, indonesia]} state={[english, () => {}]} />);

  await expect
    .element(page.getByRole('combobox', { name: 'Language' }))
    .toHaveTextContent('English');
  await capture('TextSelect', 'closed');
});

test('Language: choosing Indonesia reports the Indonesia option', async () => {
  const select = vi.fn<(option: TextSelectOptionProps) => void>();
  await render(<TextSelect options={[english, indonesia]} state={[english, select]} />);

  await userEvent.click(page.getByRole('combobox', { name: 'Language' }));
  await userEvent.click(page.getByRole('option', { name: 'Indonesia' }));

  expect(select).toHaveBeenCalledExactlyOnceWith({ label: 'Indonesia', value: 'id' });
});

test('Language: the list opens below the trigger, aligned to its left edge', async () => {
  await render(
    <div style={{ paddingLeft: 400 }}>
      <TextSelect options={[english, indonesia]} state={[english, () => {}]} />
    </div>,
  );

  await userEvent.click(page.getByRole('combobox', { name: 'Language' }));
  await expect.element(page.getByRole('listbox')).toBeVisible();

  const trigger = page
    .getByRole('combobox', { name: 'Language' })
    .element()
    .getBoundingClientRect();

  const list = page.getByRole('listbox').element();

  await expect.poll(() => list.getBoundingClientRect().left).toBe(trigger.left);
  expect(list.getBoundingClientRect().top).toBeGreaterThan(trigger.bottom);
  await capture('TextSelect', 'open');
});

test('Language: keyboard focus inside the open list shows an indigo ring', async () => {
  await render(<TextSelect options={[english, indonesia]} state={[english, () => {}]} />);

  await userEvent.tab();
  await userEvent.keyboard('{Enter}');

  await expect.element(page.getByRole('option', { name: 'English' })).toHaveFocus();
  expect(getComputedStyle(page.getByRole('listbox').element()).boxShadow).toContain(
    'rgb(99, 102, 241)',
  );
  await capture('TextSelect', 'open-keyboard');
});

test('Language: Escape closes the list without changing the language', async () => {
  const select = vi.fn<(option: TextSelectOptionProps) => void>();
  await render(<TextSelect options={[english, indonesia]} state={[english, select]} />);

  await userEvent.click(page.getByRole('combobox', { name: 'Language' }));
  await userEvent.keyboard('{ArrowDown}');
  await userEvent.keyboard('{Escape}');

  await expect.element(page.getByRole('listbox')).not.toBeInTheDocument();
  expect(select).not.toHaveBeenCalled();
});
