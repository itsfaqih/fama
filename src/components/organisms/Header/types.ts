export default interface HeaderProps {
  data: HeaderDataProps;
  text: HeaderTextProps;
}

export interface HeaderDataProps {
  profilePicture: string;
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
