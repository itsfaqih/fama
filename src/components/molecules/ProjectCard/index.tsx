import { ContentTitle } from 'components/atoms';
import Icons from 'components/icons';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';
import { cn } from 'cn';
import ProjectCardProps, { ProjectCardDataProps } from 'components/molecules/ProjectCard/types';

const hosts: Record<ProjectCardDataProps['type'], { label: string; Icon: typeof Icons.Github }> = {
  github: { label: 'GitHub', Icon: Icons.Github },
  dribbble: { label: 'Dribbble', Icon: Icons.Dribbble },
  figma: { label: 'Figma', Icon: Icons.Figma },
  web: { label: 'Website', Icon: Icons.Globe },
};

export default function ProjectCard({ data, className }: ProjectCardProps) {
  const language = useContext(LanguageContext);
  const { title, description, type, url } = data;
  const { label, Icon } = hosts[type];

  return (
    <article className={cn('flex flex-col bg-white rounded-xl shadow py-4 px-6', className)}>
      <ContentTitle>{title}</ContentTitle>
      <p className="mt-2 mb-8 text-sm text-gray-700">{description}</p>
      <div className="flex items-center justify-between mt-auto">
        <span role="img" aria-label={label}>
          <Icon className="w-7 h-7 text-gray-700" />
        </span>
        <a
          className="font-medium text-indigo-400 rounded-lg hover:text-indigo-500 focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-2 focus:text-indigo-500"
          href={url}
        >
          {language === 'en' ? 'Details' : 'Lihat'}
        </a>
      </div>
    </article>
  );
}
