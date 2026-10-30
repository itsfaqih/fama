import { capture } from 'component-tests/capture';
import Navigation from 'components/organisms/Navigation';
import { expect, onTestFinished, test, vi } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const sections = {
  about: 'About me',
  projects: 'Projects',
  blogs: 'Blogs',
  skills: 'Skills',
  contact: 'Get in touch',
};

test('Navigation: choosing Indonesia switches the locale to id', async () => {
  const change = vi.fn<(lang: 'en' | 'id') => void>();
  await render(
    <Navigation
      className="fixed z-10 top-8"
      locale={{ value: 'en', change }}
      sections={sections}
    />,
  );

  await userEvent.click(page.getByRole('combobox', { name: 'Language' }));
  await userEvent.click(page.getByRole('option', { name: 'Indonesia' }));

  expect(change).toHaveBeenCalledExactlyOnceWith('id');
});

test('Navigation: the open menu hides the language select', async () => {
  await render(
    <Navigation
      className="fixed z-10 top-8"
      locale={{ value: 'en', change: () => {} }}
      sections={sections}
    />,
  );

  await userEvent.click(page.getByRole('button', { name: 'Menu' }));

  await expect.element(page.getByRole('menuitem', { name: 'About me' })).toBeVisible();
  await expect
    .element(page.getByRole('combobox', { name: 'Language', includeHidden: true }))
    .not.toBeVisible();
  await capture('Navigation', 'menu-open');
});

test('Navigation: closing the menu with the mouse leaves no focus ring on the trigger', async () => {
  await render(
    <Navigation
      className="fixed z-10 top-8"
      locale={{ value: 'en', change: () => {} }}
      sections={sections}
    />,
  );
  const trigger = page.getByRole('button', { name: 'Menu' });

  await userEvent.click(trigger);
  await expect.element(page.getByRole('menuitem', { name: 'About me' })).toBeVisible();
  await userEvent.click(trigger);

  await expect.element(page.getByRole('menuitem', { name: 'About me' })).not.toBeInTheDocument();
  expect(getComputedStyle(trigger.element()).boxShadow).not.toContain('rgb(99, 102, 241)');
  await capture('Navigation', 'menu-closed-by-mouse');
});

test('Navigation: the menu button stays above the overlay while it slides shut', async () => {
  // Transitions are off in tests, so hold the overlay at full width as it is early in its exit.
  const fullWidthOverlay = document.createElement('style');

  fullWidthOverlay.textContent = '[data-testid="menu-backdrop"] { width: 100% !important; }';
  document.head.append(fullWidthOverlay);
  onTestFinished(() => fullWidthOverlay.remove());
  await render(
    <Navigation
      className="fixed z-10 top-8"
      locale={{ value: 'en', change: () => {} }}
      sections={sections}
    />,
  );
  const trigger = page.getByRole('button', { name: 'Menu' });

  await userEvent.click(trigger);
  await expect.element(page.getByRole('menuitem', { name: 'About me' })).toBeVisible();
  await userEvent.click(trigger);

  await expect.element(page.getByRole('menuitem', { name: 'About me' })).not.toBeInTheDocument();
  await expect.element(page.getByTestId('menu-backdrop')).toBeInTheDocument();

  const { left, top, width, height } = trigger.element().getBoundingClientRect();
  const topmost = document.elementFromPoint(left + width / 2, top + height / 2);

  expect(topmost?.closest('[aria-label="Menu"]')).toBe(trigger.element());
  await capture('Navigation', 'menu-closing');
  await expect.element(page.getByTestId('menu-backdrop')).not.toBeInTheDocument();
  await expect.element(page.getByRole('combobox', { name: 'Language' })).toBeVisible();
});
