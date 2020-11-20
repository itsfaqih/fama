import { ContentText, RoundedButton } from 'components/atoms';
import { SectionTitle } from 'components/molecules';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';
import AboutSectionProps from './types';

export default function About({ title, content, className }: AboutSectionProps) {
  const language = useContext(LanguageContext);

  return (
    <section id="about" className={className}>
      <SectionTitle>{title}</SectionTitle>
      <div className="grid grid-rows-2 mt-6 lg:grid-cols-3 lg:grid-rows-1">
        <ContentText className="lg:col-span-2 lg:text-left">{content.text}</ContentText>
        <RoundedButton className="mx-auto mt-6 lg:mr-0 lg:ml-auto lg:mt-0">
          {language.value === 'en' ? 'Download' : 'Unduh'} CV
        </RoundedButton>
      </div>
    </section>
  );
}
