import { Landing } from 'components/templates';
import LanguageContext from 'contexts/language';
import {
  header as headerData,
  projects as projectsData,
  blogs as blogsData,
  skills as skillsData,
  contact as contactData
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
  const languange = useContext(LanguageContext);

  let locale;

  if (languange.value === 'en') {
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
          text: locale.about.text,
        },
        projects: {
          items: projectsData,
        },
        blogs: {
          items: blogsData,
        },
        skills: {
          text: locale.skills.text,
          items: skillsData,
        },
        contact: contactData
      }}
      locale={{ value: languange.value, change: languange.change }}
    />
  );
}
