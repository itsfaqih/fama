import { Menu } from '@headlessui/react';
import { MenuButton } from 'components/molecules';
import React from 'react';
import Animated from 'components/animations';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from 'contexts';
import { MenuItem, Overlay } from 'components/atoms';
import { useRef } from 'react';

interface Props {
  animationFinish?: boolean;
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
}

export default function MainMenu({ animationFinish, sections }: Props) {
  const language = useContext(LanguageContext);
  const menu = useRef<HTMLDivElement>(null);

  return (
    <div className="self-center ml-auto sm:ml-0">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button as="div" className="relative z-20">
              <MenuButton isOpen={open} animationComplete={animationFinish} />
            </Menu.Button>
            <Overlay contentRef={menu} open={open} animationFinish={animationFinish} classOnOpen="w-full" classOnClose="w-0" className="text-indigo-600"/>
            <AnimatePresence initial={false}>
              {open && (
                <Menu.Items
                  className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full text-4xl font-bold text-white focus:outline-none"
                  static
                >
                  <div className="grid gap-x-32 gap-y-10" ref={menu}>
                    <Menu.Item as="a" href="#about">
                      {({ active }: { active: boolean }) => (
                        <Animated.FromDirection
                          from="bottom"
                          animate="show"
                          exit={{ opacity: 0 }}
                          custom={1}
                          delay={0.2}
                        >
                          <MenuItem active={active}>{sections.about}</MenuItem>
                        </Animated.FromDirection>
                      )}
                    </Menu.Item>
                    <Menu.Item as="a" href="#projects">
                      {({ active }: { active: boolean }) => (
                        <Animated.FromDirection
                          from="bottom"
                          animate="show"
                          exit={{ opacity: 0 }}
                          custom={2}
                          delay={0.2}
                        >
                          <MenuItem active={active}>{sections.projects}</MenuItem>
                        </Animated.FromDirection>
                      )}
                    </Menu.Item>
                    <Menu.Item as="a" href="#blogs">
                      {({ active }: { active: boolean }) => (
                        <Animated.FromDirection
                          from="bottom"
                          animate="show"
                          exit={{ opacity: 0 }}
                          custom={3}
                          delay={0.2}
                        >
                          <MenuItem active={active}>{sections.blogs}</MenuItem>
                        </Animated.FromDirection>
                      )}
                    </Menu.Item>
                    <Menu.Item as="a" href="#skills">
                      {({ active }: { active: boolean }) => (
                        <Animated.FromDirection
                          from="bottom"
                          animate="show"
                          exit={{ opacity: 0 }}
                          custom={4}
                          delay={0.2}
                        >
                          <MenuItem active={active}>{sections.skills}</MenuItem>
                        </Animated.FromDirection>
                      )}
                    </Menu.Item>
                    <Menu.Item as="a" href="#contact">
                      {({ active }: { active: boolean }) => (
                        <Animated.FromDirection
                          from="bottom"
                          animate="show"
                          exit={{ opacity: 0 }}
                          custom={5}
                          delay={0.2}
                        >
                          <MenuItem active={active}>
                            {language.value === 'en' ? 'Contact' : 'Kontak'}
                          </MenuItem>
                        </Animated.FromDirection>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              )}
            </AnimatePresence>
          </>
        )}
      </Menu>
    </div>
  );
}
