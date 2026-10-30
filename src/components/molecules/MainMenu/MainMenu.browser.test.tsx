import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import MainMenu, { MenuTrigger } from 'components/molecules/MainMenu';
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

const menu = (
  <>
    <MenuTrigger />
    <MainMenu sections={sections} />
  </>
);

const sectionLink = (name: string, { includeHidden = false } = {}) =>
  page
    .getByRole('navigation', { name: 'Sections', includeHidden })
    .getByRole('link', { name, exact: true, includeHidden });

function openMenu() {
  document.documentElement.setAttribute('data-menu-open', '');
  onTestFinished(() => document.documentElement.removeAttribute('data-menu-open'));
}

test('Menu: open, it links to the five sections', async () => {
  await render(menu);

  openMenu();

  await expect.element(sectionLink('About me')).toHaveAttribute('href', '#about');
  await expect.element(sectionLink('Projects')).toHaveAttribute('href', '#projects');
  await expect.element(sectionLink('Blogs')).toHaveAttribute('href', '#blogs');
  await expect.element(sectionLink('Skills')).toHaveAttribute('href', '#skills');
  await expect.element(sectionLink('Contact')).toHaveAttribute('href', '#contact');
  await capture('MainMenu', 'open');
});

test('Menu: open, an indigo 600 (#4f46e5) backdrop covers the whole screen', async () => {
  await render(menu);

  openMenu();

  const backdrop = page.getByTestId('menu-backdrop');

  await expect.element(backdrop).toHaveStyle('background-color: rgb(79, 70, 229)');
  const { left, top, right, bottom } = backdrop.element().getBoundingClientRect();

  expect([left, top]).toEqual([-1, -1]);
  expect([right, bottom]).toEqual([1281, 721]);
});

test('Menu: open, the section links sit in the vertical centre of the screen', async () => {
  await render(menu);

  openMenu();
  await expect.element(sectionLink('Contact')).toBeVisible();

  const { top } = sectionLink('About me').element().getBoundingClientRect();
  const { bottom } = sectionLink('Contact').element().getBoundingClientRect();

  expect((top + bottom) / 2).toBeCloseTo(360, 0);
});

test('Menu: open, the trigger turns white with an indigo 600 icon', async () => {
  await render(menu);

  openMenu();

  await expect
    .element(page.getByRole('link', { name: 'Menu', exact: true }))
    .toHaveStyle({ backgroundColor: 'rgb(255, 255, 255)', color: 'rgb(79, 70, 229)' });
});

test('Menu: keyboard focus on the trigger shows an indigo ring', async () => {
  await render(menu);
  const trigger = page.getByRole('link', { name: 'Menu', exact: true });

  await userEvent.tab();

  await expect.element(trigger).toHaveFocus();
  expect(getComputedStyle(trigger.element()).boxShadow).toContain('rgb(99, 102, 241)');
  await capture('MainMenu', 'keyboard-focus');
});

test('Menu: without keyboard focus the trigger has no white ring around it', async () => {
  await render(menu);

  expect(
    getComputedStyle(page.getByRole('link', { name: 'Menu', exact: true }).element()).boxShadow,
  ).not.toContain('rgb(255, 255, 255)');
});

function runMenuScript() {
  document.documentElement.classList.add('js');
  const stop = enhanceMenu();

  onTestFinished(() => {
    stop();
    document.documentElement.classList.remove('js');
  });
}

test('Menu: closing with Escape shows the focus ring back on the trigger', async () => {
  await render(menu);
  runMenuScript();
  const trigger = page.getByRole('button', { name: 'Menu', exact: true });

  await userEvent.tab();
  await userEvent.keyboard('{Enter}');
  await expect.element(sectionLink('About me')).toHaveFocus();
  await userEvent.keyboard('{Escape}');

  await expect.element(sectionLink('About me', { includeHidden: true })).not.toBeVisible();
  await expect.element(trigger).toHaveFocus();
  expect(getComputedStyle(trigger.element()).boxShadow).toContain('rgb(99, 102, 241)');
  await capture('MainMenu', 'closed-by-escape');
});

test('Menu: in Indonesian the contact link reads Kontak', async () => {
  await render(inIndonesian(menu));

  openMenu();

  await expect.element(sectionLink('Kontak')).toHaveAttribute('href', '#contact');
});
