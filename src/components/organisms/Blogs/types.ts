import { BlogsPostProps } from 'components/molecules/BlogPost/types';

export default interface BlogsSectionProps {
  title: string;
  content: BlogsSectionContentProps;
  className?: string;
}

export interface BlogsSectionContentProps {
  items: BlogsPostProps[];
}
