import { ReactNode } from 'react';

export default interface SkillsSectionProps {
  title: string;
  content: SkillsSectionContentProps;
  className?: string;
}

export interface SkillsSectionContentProps {
  text: ReactNode;
  items: ReactNode[];
}
