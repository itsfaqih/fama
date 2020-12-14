import { SectionTitle } from 'components/molecules';
import React, { useContext } from 'react';
import { SectionVariants } from 'components/molecules/SectionTitle';
import { RoundedButton } from 'components/atoms';
import { LanguageContext } from 'contexts';
import ProjectCard from 'components/molecules/ProjectCard';
import Decorations from 'components/decorations';
import ProjectsSectionProps from 'components/organisms/Projects/types';
import { forwardRef } from 'react';
import classNames from 'classnames';

const Projects = forwardRef<HTMLElement | undefined, ProjectsSectionProps>(
  ({ title, content, className }: ProjectsSectionProps, ref) => {
    const language = useContext(LanguageContext);
    const { items } = content;

    const bulletsClasses = 'w-32 h-32 text-indigo-300 md:w-40 md:h-40';

    return (
      <section
        id="projects"
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
        <div className="relative grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2 lg:grid-cols-3">
          <Decorations.Bullets
            className={classNames(
              'absolute -top-8 -left-12 md:-top-9 md:-left-16 -z-10',
              bulletsClasses
            )}
          />
          <Decorations.Bullets
            className={classNames(
              'absolute -bottom-8 -right-12 md:-bottom-9 md:-right-16 -z-10',
              bulletsClasses
            )}
          />
          {items.map((item, index) => (
            <ProjectCard
              data={item}
              key={index}
              className="h-full transition-all transform hover:shadow-lg hover:scale-110 focus-within:scale-110 focus-within:shadow-lg"
            />
          ))}
        </div>

        <div className="flex justify-center mt-8">
          <RoundedButton as="a" href="https://github.com/itsfaqih">
            {language.value === 'en' ? 'See more' : 'Lihat Selengkapnya'}
          </RoundedButton>
        </div>
      </section>
    );
  }
);

export default Projects;
