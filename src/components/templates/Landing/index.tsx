import { TextSelect } from 'components/molecules';
import { MenuButton } from 'components/molecules';
import { TextSelectOptionProps } from 'components/molecules/TextSelect/types';
import { About, Blogs, Contact, Header, Projects, Skills } from 'components/organisms';
import { AboutSectionContentProps } from 'components/organisms/About/types';
import { BlogsSectionContentProps } from 'components/organisms/Blogs/types';
import { ContactSectionContentProps } from 'components/organisms/Contact/types';
import HeaderProps from 'components/organisms/Header/types';
import { ProjectsSectionContentProps } from 'components/organisms/Projects/types';
import { SkillsSectionContentProps } from 'components/organisms/Skills/types';
import React from 'react';

interface Props {
  data: {
    header: HeaderProps;
    about: AboutSectionContentProps;
    projects: ProjectsSectionContentProps;
    blogs: BlogsSectionContentProps;
    skills: SkillsSectionContentProps;
    contact: ContactSectionContentProps;
  };
  locale: {
    value: 'en' | 'id';
    change: (lang: 'en' | 'id') => void;
  };
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
}

export default function Landing({ data, locale, sections }: Props) {
  const { header, about, projects, blogs, skills, contact } = data;
  const languageOptions: TextSelectOptionProps[] = [
    { label: 'English', value: 'en' },
    { label: 'Indonesia', value: 'id' },
  ];

  const selectedLanguage =
    languageOptions.find(option => option.value === locale.value) || languageOptions[0];

  const setSelectedLanguage = (option: TextSelectOptionProps) => {
    if (option.value === 'en' || option.value === 'id') {
      locale.change(option.value);
    }
  };

  return (
    <div className="max-w-md px-6 pt-8 mx-auto font-sans sm:px-0 sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
      <div className="flex flex-wrap">
        <nav className="self-center flex-1 hidden pr-8 sm:flex">
          <div className="ml-auto">
            <TextSelect state={[selectedLanguage, setSelectedLanguage]} options={languageOptions} />
          </div>
        </nav>
        <MenuButton className="sticky z-10 self-center ml-auto top-8 sm:ml-0" />
        <main className="w-full mt-12">
          <Header data={header.data} text={header.text} />
          <About
            title={sections.about}
            content={{
              text: about.text,
            }}
            className="mt-40"
          />
          <Projects
            title={sections.projects}
            content={{
              items: projects.items,
            }}
            className="mt-40"
          />
          <Blogs title={sections.blogs} content={{ items: blogs.items }} className="mt-40" />
          <Skills
            title={sections.skills}
            content={{ text: skills.text, items: skills.items }}
            className="mt-40"
          />
        </main>
        <footer className="w-full pb-16 mt-48">
          <Contact
            title={sections.contact}
            content={{
              email: contact.email,
              socials: contact.socials,
            }}
          />
        </footer>
      </div>
    </div>
  );
}
