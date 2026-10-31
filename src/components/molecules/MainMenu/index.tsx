import Animated from 'components/animations';
import { MenuItem } from 'components/atoms';
import Icons from 'components/icons';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';

export function MenuTrigger() {
  return (
    <div className="relative">
      <a
        href="#menu"
        aria-label="Menu"
        aria-controls="menu"
        className="menu-trigger press relative z-30 flex h-12 w-12 items-center justify-center rounded-full shadow-lg focus:outline-none focus-visible:ring-2 ring-indigo-500 focus-visible:ring-offset-2 bg-indigo-500 text-white hover:bg-indigo-600 menu-open:bg-white menu-open:text-indigo-600"
      >
        <Icons.Menu className="w-6 h-6 menu-open:hidden" />
        <Icons.Close className="hidden w-6 h-6 menu-open:block" />
      </a>
      <a
        href="#close-menu"
        aria-label="Close menu"
        className="menu-close absolute inset-0 z-30 hidden rounded-full focus:outline-none focus-visible:ring-2 ring-indigo-500 focus-visible:ring-offset-2 menu-open:block"
      />
    </div>
  );
}

interface Props {
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
}

export default function MainMenu({ sections }: Props) {
  const language = useContext(LanguageContext);

  const menuItems = [
    { href: '#about', label: sections.about },
    { href: '#projects', label: sections.projects },
    { href: '#blogs', label: sections.blogs },
    { href: '#skills', label: sections.skills },
    { href: '#contact', label: language === 'en' ? 'Contact' : 'Kontak' },
  ];

  return (
    <div id="menu" className="main-menu fixed inset-0 z-9">
      <div
        data-testid="menu-backdrop"
        className="menu-backdrop absolute -inset-y-px -right-px bg-indigo-600"
      />
      <nav
        aria-label="Sections"
        className="menu-links relative flex h-full w-full items-center justify-center text-4xl font-bold text-white"
      >
        <div className="grid gap-x-32 gap-y-10">
          {menuItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative inline-flex rounded-lg focus:outline-none"
            >
              <Animated.FromDirection from="bottom" custom={index + 1} delay={0.2}>
                <MenuItem>{item.label}</MenuItem>
              </Animated.FromDirection>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
