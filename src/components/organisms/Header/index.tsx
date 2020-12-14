import { Avatar, HeaderText, Highlighter } from 'components/atoms';
import Decorations from 'components/decorations';
import { TextIconButton } from 'components/molecules';
import HeaderProps from 'components/organisms/Header/types';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';

export default function Header({ data, text, lowerSectionRef }: HeaderProps) {
  const languange = useContext(LanguageContext);
  const { profilePicture, name, job } = data;
  const { headerText } = text;
  const { greetings, intro, preTitle } = headerText;

  return (
    <header className="flex justify-center">
      <div className="grid grid-rows-3 md:grid-cols-2 md:h-60">
        <div className="relative col-start-1 row-span-3 justify-self-center">
          <Decorations.Stripes className="absolute w-24 h-24 text-indigo-300 md:w-40 md:h-40 -top-6 md:-top-10 -left-6 md:-left-10 -z-10" />
          <Avatar src={profilePicture} alt="Profile Picture" />
        </div>
        <HeaderText className="flex flex-col items-center mt-6 md:items-start md:row-start-2 md:col-start-2 md:self-center md:mt-0">
          <p>{`${greetings} 👋`}</p>
          <p>{`${intro} ${name}`}</p>
          <div className="relative inline-flex">
            <p>{`${preTitle ? `${preTitle} ` : ''}${job}`}</p>
            <Highlighter className="h-3 bottom-1.5" rad={6} />
          </div>
        </HeaderText>
        <div className="mx-auto mt-6 md:-ml-0 md:mr-auto md:mt-auto md:col-start-2 md:row-start-3">
          <TextIconButton
            className="group"
            onClick={() => lowerSectionRef?.current?.scrollIntoView({ behavior: 'smooth' })}
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
        </div>
      </div>
    </header>
  );
}
