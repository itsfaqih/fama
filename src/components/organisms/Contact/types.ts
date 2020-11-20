export default interface ContactSectionProps {
  title: string;
  content: ContactSectionContentProps;
}

export interface ContactSectionContentProps {
  email: string;
  socials: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
}
