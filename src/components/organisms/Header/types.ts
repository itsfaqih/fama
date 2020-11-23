import { MutableRefObject } from "react";

export default interface HeaderProps {
  data: HeaderDataProps;
  text: HeaderTextProps;
  lowerSectionRef?: MutableRefObject<HTMLElement | undefined>;
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
