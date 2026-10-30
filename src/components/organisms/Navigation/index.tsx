import Animated from 'components/animations';
import { LanguageSwitch, MainMenu, MenuTrigger } from 'components/molecules';
import React from 'react';
import { cn } from 'cn';
import { Container } from 'components/atoms';

interface Props {
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
  className?: string;
}

export default function Navigation({ sections, className }: Props) {
  return (
    <>
      <nav data-in>
        <Animated.FromDirection from="top" className={cn('w-full', className)} duration={1}>
          <Container className="flex">
            <div className="flex self-center flex-1 pr-8">
              <div className="sm:ml-auto">
                <LanguageSwitch />
              </div>
            </div>
            <MenuTrigger />
          </Container>
        </Animated.FromDirection>
      </nav>
      <MainMenu sections={sections} />
    </>
  );
}
