import Animated from 'components/animations';
import { ContentText } from 'components/atoms';
import { SectionTitle } from 'components/molecules';
import { SectionVariants } from 'components/molecules/SectionTitle';
import { useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';
import { forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import SkillsSectionProps from './types';

const Skills = forwardRef<HTMLElement | undefined, SkillsSectionProps>(
  ({ title, content, className }: SkillsSectionProps, ref) => {
    const { text, items } = content;
    const upperSkills = items.slice(0, items.length / 2);
    const lowerSkills = items.slice(items.length / 2);

    const skillIconsClasses =
      'mx-5 transition-all transform hover:scale-125 hover:filter-none filter-grayscale focus-within:filter-none focus-within:scale-125';

    const controls = useAnimation();
    const [refView, inView] = useInView({
      threshold: 0.5,
    });

    useEffect(() => {
      if (inView) {
        controls.start('show');
      }
    }, [controls, inView]);

    return (
      <section
        id="skills"
        className={className}
        ref={section => {
          refView(section);
          if (ref) {
            if (typeof ref === 'function') {
              ref(section);
            } else {
              ref.current = section;
            }
          }
        }}
      >
        <SectionTitle
          variant={SectionVariants.CENTER}
          lineProps={{
            animate: controls,
            custom: 1,
            transition: {
              delay: 1,
            },
          }}
        >
          <Animated.Letter text={title} animate={controls} custom={0} delay={1} />
        </SectionTitle>
        <Animated.FromDirection
          className="mx-auto mt-6 lg:w-2/3"
          from="left"
          animate={controls}
          custom={0}
          delay={1}
        >
          <Animated.Reveal from="left" animate={controls} custom={1} delay={1}>
            <ContentText className="text-center">{text}</ContentText>
          </Animated.Reveal>
        </Animated.FromDirection>
        <div className="flex items-center justify-center mt-8">
          {upperSkills.map((SkillItem, index) => (
            <Animated.FromDirection
              key={index}
              from="bottom"
              animate={controls}
              custom={index + 2}
              delay={0.3}
            >
              <div className={skillIconsClasses}>{SkillItem}</div>
            </Animated.FromDirection>
          ))}
        </div>
        <div className="flex items-center justify-center mt-6">
          {lowerSkills.map((SkillItem, index) => (
            <Animated.FromDirection
              key={index}
              from="bottom"
              animate={controls}
              custom={index + 5}
              delay={0.3}
            >
              <div className={skillIconsClasses}>{SkillItem}</div>
            </Animated.FromDirection>
          ))}
        </div>
      </section>
    );
  }
);

export default Skills;
