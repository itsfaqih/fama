import { Menu } from '@base-ui/react/menu';
import { cn } from 'cn';
import Animated from 'components/animations';
import { MenuItem } from 'components/atoms';
import Icons from 'components/icons';
import { LanguageContext } from 'contexts';
import { AnimatePresence, motion } from 'motion/react';
import React, { useContext, useState } from 'react';

interface Props {
  animationFinish?: boolean;
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
}

export default function MainMenu({ animationFinish, sections }: Props) {
  const language = useContext(LanguageContext);
  const [open, setOpen] = useState(false);

  const menuItems = [
    { href: '#about', label: sections.about, custom: 1 },
    { href: '#projects', label: sections.projects, custom: 2 },
    { href: '#blogs', label: sections.blogs, custom: 3 },
    { href: '#skills', label: sections.skills, custom: 4 },
    {
      href: '#contact',
      label: language.value === 'en' ? 'Contact' : 'Kontak',
      custom: 5,
    },
  ];

  return (
    <div className="self-center ml-auto sm:ml-0">
      <Menu.Root open={open} onOpenChange={setOpen}>
        <Menu.Trigger
          render={<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} />}
          type="button"
          aria-label="Menu"
          className={cn(
            'relative z-30 flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2',
            animationFinish && 'shadow-lg',
            animationFinish === false && 'scale-75',
            animationFinish != null && 'transition-all transform duration-500',
            open ? 'bg-white text-indigo-600' : 'bg-indigo-500 text-white hover:bg-indigo-600',
          )}
        >
          {open ? <Icons.Close className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Backdrop
            className={({ open: isOpen }) =>
              cn(
                'fixed top-0 right-0 z-10 h-full bg-indigo-500 transition-all duration-1000',
                isOpen ? 'w-full' : 'w-0',
              )
            }
          />
          <Menu.Positioner className="fixed inset-0 z-20 h-full w-full">
            <Menu.Popup className="fixed inset-0 z-20 flex h-full w-full items-center justify-center text-4xl font-bold text-white focus:outline-none">
              <AnimatePresence initial={false}>
                {open && (
                  <div className="grid gap-x-32 gap-y-10">
                    {menuItems.map((item) => (
                      <Menu.LinkItem
                        key={item.href}
                        href={item.href}
                        closeOnClick
                        className={({ highlighted }) =>
                          cn(
                            'group relative inline-flex rounded-lg focus:outline-none',
                            highlighted && 'text-white',
                          )
                        }
                      >
                        <Animated.FromDirection
                          from="bottom"
                          animate="show"
                          exit={{ opacity: 0 }}
                          custom={item.custom}
                          delay={0.2}
                        >
                          <MenuItem>{item.label}</MenuItem>
                        </Animated.FromDirection>
                      </Menu.LinkItem>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}
