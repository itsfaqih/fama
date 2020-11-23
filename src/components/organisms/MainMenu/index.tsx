import { Menu, Transition } from '@headlessui/react';
import { MenuButton } from 'components/molecules';
import { motion, Variants } from 'framer-motion';
import React from 'react';
import classNames from 'classnames';

export default function MainMenu({ animationFinish }: { animationFinish?: boolean }) {
  return (
    <div className="sticky z-10 self-center ml-auto top-8 sm:ml-0">
      <Menu>
        {({ open }) => (
          <>
            <div className="relative">
              <Menu.Button>
                <MenuButton animationComplete={animationFinish} />
              </Menu.Button>
              <div
                className={classNames(
                  'fixed top-0 right-0 transition-all bg-indigo-500 rounded-full duration-300',
                  { 'w-6 h-6': !open, 'w-screen h-full': open }
                )}
              />
            </div>
            {open && (
              <Menu.Items className="fixed top-0 left-0 z-10" static>
                <Menu.Item>{({ active }) => <a>tes</a>}</Menu.Item>
              </Menu.Items>
            )}
          </>
        )}
      </Menu>
    </div>
  );
}
