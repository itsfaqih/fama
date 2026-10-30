import { capture } from 'component-tests/capture';
import { inIndonesian } from 'component-tests/locale';
import MainMenu from 'components/molecules/MainMenu';
import { expect, test, vi } from 'vite-plus/test';
import { page, userEvent } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

const sections = {
  about: 'About me',
  projects: 'Projects',
  blogs: 'Blogs',
  skills: 'Skills',
  contact: 'Get in touch',
};

test('Menu: clicking the trigger opens links to the five sections', async () => {
  const onOpenChange = vi.fn<(open: boolean) => void>();
  await render(<MainMenu sections={sections} onOpenChange={onOpenChange} />);

  await userEvent.click(page.getByRole('button', { name: 'Menu' }));

  await expect
    .element(page.getByRole('menuitem', { name: 'About me' }))
    .toHaveAttribute('href', '#about');
  await expect
    .element(page.getByRole('menuitem', { name: 'Projects' }))
    .toHaveAttribute('href', '#projects');
  await expect
    .element(page.getByRole('menuitem', { name: 'Blogs' }))
    .toHaveAttribute('href', '#blogs');
  await expect
    .element(page.getByRole('menuitem', { name: 'Skills' }))
    .toHaveAttribute('href', '#skills');
  await expect
    .element(page.getByRole('menuitem', { name: 'Contact' }))
    .toHaveAttribute('href', '#contact');
  expect(onOpenChange).toHaveBeenLastCalledWith(true);
  await capture('MainMenu', 'open');
});

test('Menu: the open menu covers the page in indigo 600 (#4f46e5)', async () => {
  await render(<MainMenu sections={sections} />);

  await userEvent.click(page.getByRole('button', { name: 'Menu' }));

  await expect
    .element(page.getByTestId('menu-backdrop'))
    .toHaveStyle('background-color: rgb(79, 70, 229)');
});

test('Menu: the section links sit in the vertical centre of the screen', async () => {
  await render(<MainMenu sections={sections} />);

  await userEvent.click(page.getByRole('button', { name: 'Menu' }));
  await expect.element(page.getByRole('menuitem', { name: 'Contact' })).toBeVisible();

  const top = page
    .getByRole('menuitem', { name: 'About me' })
    .element()
    .getBoundingClientRect().top;

  const bottom = page
    .getByRole('menuitem', { name: 'Contact' })
    .element()
    .getBoundingClientRect().bottom;

  // The 720px viewport's centre line is y=360.
  expect((top + bottom) / 2).toBeCloseTo(360, 0);
});

test('Menu: keyboard focus on the trigger shows an indigo ring', async () => {
  await render(<MainMenu sections={sections} />);

  await userEvent.tab();

  await expect.element(page.getByRole('button', { name: 'Menu' })).toHaveFocus();
  expect(
    getComputedStyle(page.getByRole('button', { name: 'Menu' }).element()).boxShadow,
  ).toContain('rgb(99, 102, 241)');
  await capture('MainMenu', 'keyboard-focus');
});

test('Menu: without keyboard focus the trigger has no white ring around it', async () => {
  await render(<MainMenu sections={sections} animationFinish />);

  expect(
    getComputedStyle(page.getByRole('button', { name: 'Menu' }).element()).boxShadow,
  ).not.toContain('rgb(255, 255, 255)');
});

test('Menu: Escape closes the menu', async () => {
  const onOpenChange = vi.fn<(open: boolean) => void>();
  await render(<MainMenu sections={sections} onOpenChange={onOpenChange} />);

  await userEvent.click(page.getByRole('button', { name: 'Menu' }));
  await expect.element(page.getByRole('menuitem', { name: 'About me' })).toBeVisible();
  await userEvent.keyboard('{Escape}');

  await expect.element(page.getByRole('menuitem', { name: 'About me' })).not.toBeInTheDocument();
  expect(onOpenChange).toHaveBeenLastCalledWith(false);
});

test('Menu: choosing a section closes the menu and jumps to that section', async () => {
  const onOpenChange = vi.fn<(open: boolean) => void>();
  await render(<MainMenu sections={sections} onOpenChange={onOpenChange} />);

  await userEvent.click(page.getByRole('button', { name: 'Menu' }));
  await userEvent.click(page.getByRole('menuitem', { name: 'Projects' }));

  await expect.element(page.getByRole('menuitem', { name: 'Projects' })).not.toBeInTheDocument();
  expect(onOpenChange).toHaveBeenLastCalledWith(false);
  expect(window.location.hash).toBe('#projects');
});

test('Menu: in Indonesian the contact link reads Kontak', async () => {
  await render(inIndonesian(<MainMenu sections={sections} />));

  await userEvent.click(page.getByRole('button', { name: 'Menu' }));

  await expect
    .element(page.getByRole('menuitem', { name: 'Kontak' }))
    .toHaveAttribute('href', '#contact');
});
