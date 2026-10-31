import Animated from 'components/animations';
import { LanguageSwitch, MainMenu, MenuTrigger } from 'components/molecules';
import React from 'react';
import { Container } from 'components/atoms';

interface Props {
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
  className?: string;
}

export default function Navigation({ sections, className }: Props) {
  return (
    <nav data-in className={className}>
      <Container className="flex">
        <Animated.FromDirection from="top" duration={1} className="flex-1 self-center pr-8">
          <div className="flex">
            <div className="sm:ml-auto">
              <LanguageSwitch />
            </div>
          </div>
        </Animated.FromDirection>
        <Animated.FromDirection
          from="top"
          duration={1}
          className="relative z-20 self-center ml-auto sm:ml-0"
        >
          <MenuTrigger />
        </Animated.FromDirection>
        {/* Inside the nav so the overlay stacks above the language switch and below the menu button. */}
        <MainMenu sections={sections} />
      </Container>
    </nav>
  );
}
