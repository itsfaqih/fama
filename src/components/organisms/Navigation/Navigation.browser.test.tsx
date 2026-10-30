import { capture } from 'component-tests/capture';
import Navigation from 'components/organisms/Navigation';
import { expect, onTestFinished, test } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';
import { enhanceMenu } from '../../../client/menu';

const sections = {
  about: 'About me',
  projects: 'Projects',
  blogs: 'Blogs',
  skills: 'Skills',
  contact: 'Get in touch',
};

const navigation = <Navigation className="fixed z-10 top-8" sections={sections} />;

const sectionLink = (name: string, { includeHidden = false } = {}) =>
  page
    .getByRole('navigation', { name: 'Sections', includeHidden })
    .getByRole('link', { name, exact: true, includeHidden });

function topmostAtCentreOf(element: Element) {
  const { left, top, width, height } = element.getBoundingClientRect();

  return document.elementFromPoint(left + width / 2, top + height / 2);
}

test('Navigation: with the menu open the language switch stays on top and opens its list', async () => {
  await render(navigation);
  document.documentElement.setAttribute('data-menu-open', '');
  onTestFinished(() => document.documentElement.removeAttribute('data-menu-open'));
  const languageSwitch = page.getByText('Language: English', { exact: true });

  await expect.element(sectionLink('About me')).toBeVisible();
  expect(topmostAtCentreOf(languageSwitch.element())?.closest('summary')).toBe(
    languageSwitch.element(),
  );
  await capture('Navigation', 'menu-open');

  await userEvent.click(languageSwitch);

  await expect.element(page.getByRole('link', { name: 'Indonesia' })).toBeVisible();
});

function runMenuScript() {
  document.documentElement.classList.add('js');
  const stop = enhanceMenu();

  onTestFinished(() => {
    stop();
    document.documentElement.classList.remove('js');
  });
}

test('Navigation: closing the menu with the mouse leaves no focus ring on the trigger', async () => {
  await render(navigation);
  runMenuScript();
  const trigger = page.getByRole('button', { name: 'Menu', exact: true });

  await userEvent.click(trigger);
  await expect.element(sectionLink('About me')).toBeVisible();
  await userEvent.click(trigger);

  await expect.element(sectionLink('About me', { includeHidden: true })).not.toBeVisible();
  expect(getComputedStyle(trigger.element()).boxShadow).not.toContain('rgb(99, 102, 241)');
  await capture('Navigation', 'menu-closed-by-mouse');
});

function holdOverlayMidCloseWhileTransitionsAreOff() {
  const midClose = document.createElement('style');

  midClose.textContent =
    '#menu { visibility: visible !important; } [data-testid="menu-backdrop"] { scale: none !important; }';
  document.head.append(midClose);
  onTestFinished(() => midClose.remove());
}

test('Navigation: the menu button stays above the overlay while it slides shut', async () => {
  holdOverlayMidCloseWhileTransitionsAreOff();
  await render(navigation);
  const trigger = page.getByRole('link', { name: 'Menu', exact: true });

  await expect.element(page.getByTestId('menu-backdrop')).toBeVisible();

  expect(topmostAtCentreOf(trigger.element())?.closest('a')).toBe(trigger.element());
  await capture('Navigation', 'menu-closing');
});
