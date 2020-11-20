import { Avatar, HeaderText } from 'components/atoms';
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
        <Avatar
          src={profilePicture}
          alt="Profile Picture"
          className="col-start-1 row-span-3 justify-self-center"
        />
        <HeaderText className="mt-6 text-center md:row-start-2 md:col-start-2 md:self-center md:text-left md:mt-0">
          <p>{greetings} 👋</p>
          <p>
            {intro} {name}
          </p>
          <p className="relative inline">
            {preTitle} {job}
            <svg
              className="absolute h-3 text-indigo-200 w-full-2 bottom-0.5 -z-10 -left-1"
              fill="currentColor"
            >
              <rect width="100%" height="100%" rx={6} ry={6} />
            </svg>
          </p>
        </HeaderText>
        <TextIconButton
          className="justify-center mt-4 md:mt-auto md:col-start-2 md:row-start-3 md:justify-start"
          text={languange.value === 'en' ? 'Scroll down' : 'Scroll ke bawah'}
          icon={
            <svg
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
    </header>
  );
}
