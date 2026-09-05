import { Menu } from '@base-ui/react/menu';
import { cn } from 'cn';
import Animated from 'components/animations';
import { MenuItem } from 'components/atoms';
import Icons from 'components/icons';
import { LanguageContext } from 'contexts';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import React, { useContext, useEffect, useRef, useState } from 'react';

interface Props {
  animationFinish?: boolean;
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
  onOpenChange?: (open: boolean) => void;
}

export default function MainMenu({ animationFinish, sections, onOpenChange }: Props) {
  const language = useContext(LanguageContext);
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [buttonAnimationFinish, setButtonAnimationFinish] = useState(false);
  const actionsRef = useRef<Menu.Root.Actions | null>(null);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!animationFinish) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      setButtonAnimationFinish(true);
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [animationFinish]);

  useEffect(
    () => () => {
      if (closeTimeoutRef.current !== undefined) {
        window.clearTimeout(closeTimeoutRef.current);
      }
    },
    [],
  );

  const handleTriggerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.detail === 0) {
      return;
    }

    if (open) {
      actionsRef.current?.close();
      return;
    }

    if (closeTimeoutRef.current !== undefined) {
      window.clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = undefined;
    }

    setOpen(true);
    onOpenChange?.(true);
  };

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
    <div className="relative z-20 self-center ml-auto sm:ml-0">
      <Menu.Root
        actionsRef={actionsRef}
        open={open}
        onOpenChange={(nextOpen, eventDetails) => {
          if (closeTimeoutRef.current !== undefined) {
            window.clearTimeout(closeTimeoutRef.current);
            closeTimeoutRef.current = undefined;
          }

          if (!nextOpen) {
            eventDetails.preventUnmountOnClose();
            const closeDuration = window.matchMedia('(prefers-reduced-motion: reduce)').matches
              ? 0
              : 1000;

            closeTimeoutRef.current = window.setTimeout(() => {
              actionsRef.current?.unmount();
              closeTimeoutRef.current = undefined;
            }, closeDuration);
          }

          setOpen(nextOpen);
          onOpenChange?.(nextOpen);
        }}
      >
        <Menu.Trigger
          render={<motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} />}
          type="button"
          aria-label="Menu"
          onClick={handleTriggerClick}
          onMouseDown={(event) => {
            if (event.button === 0) {
              (
                event as React.MouseEvent<HTMLButtonElement> & {
                  preventBaseUIHandler: () => void;
                }
              ).preventBaseUIHandler();
            }
          }}
          className={cn(
            'relative z-30 flex h-12 w-12 items-center justify-center rounded-full focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2',
            animationFinish && 'shadow-lg',
            animationFinish === false && 'scale-75',
            animationFinish != null && !buttonAnimationFinish && 'menu-trigger-intro',
            open ? 'bg-white text-indigo-600' : 'bg-indigo-500 text-white hover:bg-indigo-600',
          )}
        >
          {open ? <Icons.Close className="w-6 h-6" /> : <Icons.Menu className="w-6 h-6" />}
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Backdrop className="menu-backdrop fixed top-0 right-0 z-10 h-full bg-indigo-500" />
          <Menu.Positioner className="fixed inset-0 z-20 h-full w-full">
            <Menu.Popup className="fixed inset-0 z-20 flex h-full w-full items-center justify-center text-4xl font-bold text-white focus:outline-none">
              <AnimatePresence>
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
                          initial={shouldReduceMotion ? false : 'hidden'}
                          animate="show"
                          exit={{ opacity: 0 }}
                          custom={item.custom}
                          delay={shouldReduceMotion ? 0 : 0.2}
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
