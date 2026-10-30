import Animated from 'components/animations';
import { ContentText, RoundedButton } from 'components/atoms';
import { SectionTitle } from 'components/molecules';
import { LanguageContext } from 'contexts';
import { cn } from 'cn';
import React, { useContext } from 'react';
import AboutSectionProps from 'components/organisms/About/types';

export default function About({ title, content, className }: AboutSectionProps) {
  const language = useContext(LanguageContext);

  return (
    <section id="about" className={className} data-reveal="0.5">
      <SectionTitle>
        <Animated.Letter text={title} custom={0} delay={1} />
      </SectionTitle>
      <div
        className={cn(
          'grid mt-6 lg:grid-cols-3 lg:grid-rows-1',
          content.resumeUrl && 'grid-rows-2',
        )}
      >
        <Animated.FromDirection className="lg:col-span-2" from="left" custom={0} delay={1}>
          <Animated.Reveal from="left" custom={1} delay={1}>
            <ContentText className="lg:text-left">{content.text}</ContentText>
          </Animated.Reveal>
        </Animated.FromDirection>
        {content.resumeUrl && (
          <div className="mx-auto mt-6 lg:mr-0 lg:ml-auto lg:mt-0">
            <Animated.FromDirection from="bottom" custom={1} delay={1}>
              <RoundedButton as="a" href={content.resumeUrl}>
                {language === 'en' ? 'Download' : 'Unduh'} Resume
              </RoundedButton>
            </Animated.FromDirection>
          </div>
        )}
      </div>
    </section>
  );
}
