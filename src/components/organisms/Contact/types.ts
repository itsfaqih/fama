export default interface ContactSectionProps {
  title: string;
  content: ContactSectionContentProps;
}

export interface ContactSectionContentProps {
  email: string;
  socials: {
    github: string;
    linkedin: string;
    dribbble: string;
  };
}
