import Animated from 'components/animations';
import { MenuButton, TextSelect } from 'components/molecules';
import { TextSelectOptionProps } from 'components/molecules/TextSelect/types';
import { LocaleProps } from 'contexts/language';
import React from 'react';
import { useState } from 'react';
import MainMenu from '../MainMenu';

interface Props {
  locale: LocaleProps;
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
}

export default function Navigation({ locale, sections }: Props) {
  const [animationFinish, setAnimationFinish] = useState(false);
  const languageOptions: TextSelectOptionProps[] = [
    { label: 'English', value: 'en' },
    { label: 'Indonesia', value: 'id' },
  ];

  const selectedLanguage =
    languageOptions.find(option => option.value === locale.value) || languageOptions[0];

  const setSelectedLanguage = (option: TextSelectOptionProps) => {
    if (option.value === 'en' || option.value === 'id') {
      locale.change(option.value);
    }
  };
  return (
    <Animated.FromDirection
      from="top"
      className="sticky z-10 w-full top-8"
      innerClassName="flex"
      duration={1}
      onAnimationComplete={() => setAnimationFinish(true)}
    >
      <nav className="self-center flex-1 hidden pr-8 sm:flex">
        <div className="ml-auto">
          <TextSelect state={[selectedLanguage, setSelectedLanguage]} options={languageOptions} />
        </div>
      </nav>
      <MainMenu sections={sections} animationFinish={animationFinish}/>
    </Animated.FromDirection>
  );
}
