import { ReactNode, RefObject } from 'react';

export default interface AboutSectionProps {
  title: string;
  content: AboutSectionContentProps;
  className?: string;
  ref?: RefObject<HTMLElement | null>;
}

export interface AboutSectionContentProps {
  text: ReactNode;
}
