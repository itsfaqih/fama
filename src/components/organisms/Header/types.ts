export default interface HeaderProps {
  data: HeaderDataProps;
  text: HeaderTextProps;
}

export interface HeaderDataProps {
  profilePicture: { jpeg: string; avif: string };
  name: string;
  job: string;
}

export interface HeaderTextProps {
  headerText: {
    greetings: string;
    intro: string;
    preTitle: string;
  };
}
