export default interface BlogsProps {
  data: BlogsPostProps;
  className?: string;
}

export interface BlogsPostProps {
  title: string;
  date: Date;
  url: string;
}
