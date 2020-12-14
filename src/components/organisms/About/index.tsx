import { ContentText, RoundedButton } from 'components/atoms';
import { SectionTitle } from 'components/molecules';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';
import AboutSectionProps from 'components/organisms/About/types';
import { forwardRef } from 'react';

const About = forwardRef<HTMLElement | undefined, AboutSectionProps>(
  ({ title, content, className }: AboutSectionProps, ref) => {
    const language = useContext(LanguageContext);

    return (
      <section
        id="about"
        className={className}
        ref={section => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(section);
            } else {
              ref.current = section;
            }
          }
        }}
      >
        <SectionTitle>{title}</SectionTitle>
        <div className="grid grid-rows-2 mt-6 lg:grid-cols-3 lg:grid-rows-1">
          <div className="lg:col-span-2">
            <ContentText className="lg:text-left">{content.text}</ContentText>
          </div>
          <div className="mx-auto mt-6 lg:mr-0 lg:ml-auto lg:mt-0">
            <RoundedButton as="a" href="./#">
              {language.value === 'en' ? 'Download' : 'Unduh'} Resume
            </RoundedButton>
          </div>
        </div>
      </section>
    );
  }
);

export default About;
