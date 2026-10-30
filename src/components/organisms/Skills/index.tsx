import Animated from 'components/animations';
import { ContentText } from 'components/atoms';
import { SectionTitle } from 'components/molecules';
import { SectionVariants } from 'components/molecules/SectionTitle';
import React from 'react';
import SkillsSectionProps from './types';

export default function Skills({ title, content, className }: SkillsSectionProps) {
  const { text, items } = content;
  const upperSkills = items.slice(0, items.length / 2);
  const lowerSkills = items.slice(items.length / 2);

  const skillIconsClasses =
    'mx-5 transition-all transform hover:scale-125 hover:filter-none filter-grayscale focus-within:filter-none focus-within:scale-125';

  return (
    <section id="skills" className={className} data-reveal="0.5">
      <SectionTitle variant={SectionVariants.CENTER}>
        <Animated.Letter text={title} custom={0} delay={1} />
      </SectionTitle>
      <Animated.FromDirection className="mx-auto mt-6 lg:w-2/3" from="left" custom={0} delay={1}>
        <Animated.Reveal from="left" custom={1} delay={1}>
          <ContentText className="text-center">{text}</ContentText>
        </Animated.Reveal>
      </Animated.FromDirection>
      <div className="flex items-center justify-center mt-8">
        {upperSkills.map((SkillItem, index) => (
          <Animated.FromDirection key={index} from="bottom" custom={index + 2} delay={0.3}>
            <div className={skillIconsClasses}>{SkillItem}</div>
          </Animated.FromDirection>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6">
        {lowerSkills.map((SkillItem, index) => (
          <Animated.FromDirection key={index} from="bottom" custom={index + 5} delay={0.3}>
            <div className={skillIconsClasses}>{SkillItem}</div>
          </Animated.FromDirection>
        ))}
      </div>
    </section>
  );
}
