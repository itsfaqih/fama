import { ReactNode } from 'react';

export default interface AboutSectionProps {
  title: string;
  content: AboutSectionContentProps;
  className?: string;
}

export interface AboutSectionContentProps {
  text: ReactNode;
}
