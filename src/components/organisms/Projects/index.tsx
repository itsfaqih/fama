import { SearchBox, SectionTitle } from 'components/molecules';
import React, { useContext } from 'react';
import { SectionVariants } from 'components/molecules/SectionTitle';
import { RoundedButton } from 'components/atoms';
import { LanguageContext } from 'contexts';
import ProjectCard from 'components/molecules/ProjectCard';
import Decorations from 'components/decorations';
import ProjectsSectionProps from 'components/organisms/Projects/types';
import classNames from 'classnames';

export default function Projects({ title, content, className }: ProjectsSectionProps) {
  const language = useContext(LanguageContext);
  const { items } = content;

  const bulletsClasses = 'absolute w-32 h-32 text-indigo-300 md:w-40 md:h-40';
  return (
    <section id="projects" className={className}>
      <SectionTitle variant={SectionVariants.CENTER}>{title}</SectionTitle>
      <SearchBox className="mx-auto mt-6 transition-all transform sm:w-2/3 md:w-1/2 lg:w-1/3" />

      <div className="relative grid grid-cols-1 gap-8 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <Decorations.Bullets
          className={classNames('-top-8 -left-12 md:-top-9 md:-left-16 -z-10', bulletsClasses)}
        />
        <Decorations.Bullets
          className={classNames(
            '-bottom-8 -right-12 md:-bottom-9 md:-right-16 -z-10',
            bulletsClasses
          )}
        />
        {items.map((item, index) => (
          <ProjectCard
            key={index}
            data={item}
            className="h-full transition-all transform hover:shadow-lg hover:scale-110 focus-within:scale-110 focus-within:shadow-lg"
          />
        ))}
      </div>
      <RoundedButton className="mx-auto mt-8">
        {language.value === 'en' ? 'See more' : 'Lihat Selengkapnya'}
      </RoundedButton>
    </section>
  );
}
