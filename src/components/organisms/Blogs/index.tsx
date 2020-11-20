import { RoundedButton } from 'components/atoms';
import { SectionTitle, BlogPost } from 'components/molecules';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';
import BlogsSectionProps from './types';

export default function Blogs({ title, content, className }: BlogsSectionProps) {
  const language = useContext(LanguageContext);
  const { items } = content;

  return (
    <section id="blogs" className={className}>
      <div className="flex items-center justify-between">
        <SectionTitle>{title}</SectionTitle>
        <RoundedButton>
          {language.value === 'en' ? 'More article' : 'Artikel lainnya'}
        </RoundedButton>
      </div>
      <div className="grid grid-cols-1 mt-8 md:grid-cols-2 md:gap-x-20 gap-y-10 md:gap-y-16">
        {items.map((item, index) => (
          <BlogPost key={index} data={item} />
        ))}
      </div>
    </section>
  );
}
