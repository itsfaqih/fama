import Animated from 'components/animations';
import { Avatar, HeaderText } from 'components/atoms';
import Decorations from 'components/decorations';
import { TextIconButton } from 'components/molecules';
import HeaderProps from 'components/organisms/Header/types';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';

export default function Header({ data, text }: HeaderProps) {
  const languange = useContext(LanguageContext);
  const { profilePicture, name, job } = data;
  const { headerText } = text;
  const { greetings, intro, preTitle } = headerText;

  return (
    <header className="flex justify-center">
      <div className="grid grid-rows-3 md:grid-cols-2 md:h-60">
        <div className="relative col-start-1 row-span-3 justify-self-center">
          <Animated.FromDirection from="top" delay={2.2} duration={1} className="absolute -top-10 -left-10 -z-10">
            <Decorations.Stripes className="w-40 h-40 text-indigo-300" />
          </Animated.FromDirection>
          <Animated.FromDirection from="right" custom={1} delay={0.3} duration={0.8}>
            <Animated.Reveal from="right" className="rounded-3xl" delay={0.8} duration={1.2}>
              <Avatar src={profilePicture} alt="Profile Picture" />
            </Animated.Reveal>
          </Animated.FromDirection>
        </div>
        <HeaderText className="mt-6 text-center md:row-start-2 md:col-start-2 md:self-center md:text-left md:mt-0">
          <Animated.Letter text={`${greetings} 👋`} custom={1} delay={0.3} />
          <Animated.Letter text={`${intro} ${name}`} custom={2} delay={0.5} />
          <div className="relative inline-flex">
            <Animated.Letter
              text={`${preTitle ? `${preTitle} ` : ''}${job}`}
              custom={3}
              delay={0.6}
            />
            <Animated.Highlighter className="h-3 bottom-1.5" rad={6} custom={4} delay={0.8} />
          </div>
        </HeaderText>
        <Animated.FromDirection
          from="top"
          custom={5}
          delay={0.7}
          className="mx-auto mt-4 md:-ml-0 md:mr-auto md:mt-auto md:col-start-2 md:row-start-3"
        >
          <TextIconButton
            className="group"
            text={languange.value === 'en' ? 'Scroll down' : 'Scroll ke bawah'}
            icon={
              <svg
                className="transition-all transform group-hover:translate-y-1"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            }
          />
        </Animated.FromDirection>
      </div>
    </header>
  );
}
