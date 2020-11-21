import { Container } from 'components/atoms';
import { About, Blogs, Contact, Header, Navigation, Projects, Skills } from 'components/organisms';
import { AboutSectionContentProps } from 'components/organisms/About/types';
import { BlogsSectionContentProps } from 'components/organisms/Blogs/types';
import { ContactSectionContentProps } from 'components/organisms/Contact/types';
import HeaderProps from 'components/organisms/Header/types';
import { ProjectsSectionContentProps } from 'components/organisms/Projects/types';
import { SkillsSectionContentProps } from 'components/organisms/Skills/types';
import { LocaleProps } from 'contexts/language';
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
  locale: LocaleProps;
  sections: { about: string; projects: string; blogs: string; skills: string; contact: string };
}

export default function Landing({ data, locale, sections }: Props) {
  const { header, about, projects, blogs, skills, contact } = data;

  return (
    <Container>
      <div className="flex flex-wrap">
        <Navigation locale={locale} />
        <main className="w-full mt-12">
          <Header data={header.data} text={header.text} />
          <About
            title={sections.about}
            content={{
              text: about.text,
            }}
            className="mt-52"
          />
          <Projects
            title={sections.projects}
            content={{
              items: projects.items,
            }}
            className="mt-52"
          />
          <Blogs title={sections.blogs} content={{ items: blogs.items }} className="mt-40" />
          <Skills
            title={sections.skills}
            content={{ text: skills.text, items: skills.items }}
            className="mt-52"
          />
        </main>
        <footer className="w-full pb-16 mt-52">
          <Contact
            title={sections.contact}
            content={{
              email: contact.email,
              socials: contact.socials,
            }}
          />
        </footer>
      </div>
    </Container>
  );
}
