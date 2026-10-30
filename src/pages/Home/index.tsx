import { Landing } from 'components/templates';
import LanguageContext from 'contexts/language';
import {
  header as headerData,
  about as aboutData,
  projects as projectsData,
  blogs as blogsData,
  skills as skillsData,
  contact as contactData,
} from 'data';
import {
  sections as sectionsEn,
  header as headerEn,
  about as aboutEn,
  skills as skillsEn,
} from 'localization/en';
import {
  sections as sectionsId,
  header as headerId,
  about as aboutId,
  skills as skillsId,
} from 'localization/id';
import React, { useContext } from 'react';

export default function Home() {
  const language = useContext(LanguageContext);

  let locale;

  if (language === 'en') {
    locale = {
      sections: sectionsEn,
      header: headerEn,
      about: aboutEn,
      skills: skillsEn,
    };
  } else {
    locale = {
      sections: sectionsId,
      header: headerId,
      about: aboutId,
      skills: skillsId,
    };
  }

  return (
    <Landing
      sections={locale.sections}
      data={{
        header: {
          data: headerData,
          text: locale.header,
        },
        about: {
          ...aboutData,
          text: locale.about.text,
        },
        projects: projectsData,
        blogs: blogsData,
        skills: {
          text: locale.skills.text,
          items: skillsData,
        },
        contact: contactData,
      }}
    />
  );
}
