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
    'mx-5 transition-all transform hover:scale-125 hover:filter-none filter-grayscale';

  return (
    <section id="skills" className={className}>
      <SectionTitle variant={SectionVariants.CENTER}>{title}</SectionTitle>
      <ContentText className="mx-auto mt-6 text-center lg:w-2/3">{text}</ContentText>
      <div className="flex items-center justify-center mt-8">
        {upperSkills.map((SkillItem, index) => (
          <div key={index} className={skillIconsClasses}>
            {SkillItem}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center mt-6">
        {lowerSkills.map((SkillItem, index) => (
          <div key={index} className={skillIconsClasses}>
            {SkillItem}
          </div>
        ))}
      </div>
    </section>
  );
}
