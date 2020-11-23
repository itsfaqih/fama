import { Menu } from '@headlessui/react';
import { MenuButton } from 'components/molecules';
import React from 'react';
import classNames from 'classnames';
import Animated from 'components/animations';
import { AnimatePresence } from 'framer-motion';
import { useContext } from 'react';
import { LanguageContext } from 'contexts';
import { Container } from 'components/atoms';

interface Props {
  animationFinish?: boolean;
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
}

export default function MainMenu({ animationFinish, sections }: Props) {
  const language = useContext(LanguageContext);

  return (
    <div className="self-center ml-auto sm:ml-0">
      <Menu>
        {({ open }) => (
          <>
            <div className="relative">
              <Menu.Button className="relative z-20">
                <MenuButton isOpen={open} animationComplete={animationFinish} />
              </Menu.Button>
              <div
                className={classNames(
                  'fixed top-8 transform transition-all bg-indigo-500 duration-1000 z-10',
                  { 'rounded-full': !open, 'scale-999': open, 'w-12 h-12': animationFinish }
                )}
              />
            </div>
            <AnimatePresence>
              {open && (
                <Menu.Items
                  className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full text-4xl font-bold text-white focus:outline-none"
                  static
                >
                    <div className="grid gap-x-32 gap-y-10">
                      <Menu.Item>
                        <Animated.FromDirection
                          from="bottom"
                          animate={open && 'show'}
                          exit={{ opacity: 0 }}
                          custom={1}
                          delay={0.2}
                        >
                          <a href="/">{sections.about}</a>
                        </Animated.FromDirection>
                      </Menu.Item>
                      <Menu.Item>
                        <Animated.FromDirection
                          from="bottom"
                          animate={open && 'show'}
                          exit={{ opacity: 0 }}
                          custom={2}
                          delay={0.2}
                        >
                          <a href="/">{sections.projects}</a>
                        </Animated.FromDirection>
                      </Menu.Item>
                      <Menu.Item>
                        <Animated.FromDirection
                          from="bottom"
                          animate={open && 'show'}
                          exit={{ opacity: 0 }}
                          custom={3}
                          delay={0.2}
                        >
                          <a href="/">{sections.blogs}</a>
                        </Animated.FromDirection>
                      </Menu.Item>
                      <Menu.Item>
                        <Animated.FromDirection
                          from="bottom"
                          animate={open && 'show'}
                          exit={{ opacity: 0 }}
                          custom={4}
                          delay={0.2}
                        >
                          <a href="/">{sections.skills}</a>
                        </Animated.FromDirection>
                      </Menu.Item>
                      <Menu.Item>
                        <Animated.FromDirection
                          from="bottom"
                          animate={open && 'show'}
                          exit={{ opacity: 0 }}
                          custom={5}
                          delay={0.2}
                        >
                          <a href="/">{language.value === 'en' ? 'Contact' : 'Kontak'}</a>
                        </Animated.FromDirection>
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
