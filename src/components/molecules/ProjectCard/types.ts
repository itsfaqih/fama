export default interface ProjectCardProps {
  data: ProjectCardDataProps;
  className: string;
}

export interface ProjectCardDataProps {
  title: string;
  description: string;
  type: 'github' | 'dribbble' | 'figma' | 'web';
  url: string;
}
