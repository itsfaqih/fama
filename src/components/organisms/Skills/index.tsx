import { ContentText } from 'components/atoms';
import { SectionTitle } from 'components/molecules';
import { SectionVariants } from 'components/molecules/SectionTitle';
import React from 'react';
import { forwardRef } from 'react';
import SkillsSectionProps from './types';

const Skills = forwardRef<HTMLElement | undefined, SkillsSectionProps>(
  ({ title, content, className }: SkillsSectionProps, ref) => {
    const { text, items } = content;
    const upperSkills = items.slice(0, items.length / 2);
    const lowerSkills = items.slice(items.length / 2);

    const skillIconsClasses =
      'mx-5 transition-all transform hover:scale-125 hover:filter-none filter-grayscale focus-within:filter-none focus-within:scale-125';

    return (
      <section
        id="skills"
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
        <SectionTitle variant={SectionVariants.CENTER}>{title}</SectionTitle>
        <div className="mx-auto mt-6 lg:w-2/3">
          <ContentText className="text-center">{text}</ContentText>
        </div>
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
);

export default Skills;
