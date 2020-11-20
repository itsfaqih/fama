import { ContentTitle } from 'components/atoms';
import Icons from 'components/icons';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';
import classNames from 'classnames';
import ProjectCardProps from 'components/molecules/ProjectCard/types';

export default function ProjectCard({ data, className }: ProjectCardProps) {
  const language = useContext(LanguageContext);
  const { title, description, type, url } = data;

  return (
    <article
      className={classNames('flex flex-col bg-white rounded-xl shadow py-4 px-6', className)}
    >
      <ContentTitle>{title}</ContentTitle>
      <p className="mt-2 mb-8 text-sm text-gray-700">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        {type === 'dribbble' ? (
          <Icons.Dribbble className="w-7 h-7" />
        ) : (
          <Icons.Github className="w-7 h-7" />
        )}
        <a className="font-medium text-indigo-400 rounded-lg hover:text-indigo-500 focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2 focus:text-indigo-500" href={url}>
          {language.value === 'en' ? 'Details' : 'Lihat'}
        </a>
      </div>
    </article>
  );
}
