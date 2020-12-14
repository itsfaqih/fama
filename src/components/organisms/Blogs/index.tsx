import { RoundedButton } from 'components/atoms';
import { SectionTitle, BlogPost } from 'components/molecules';
import { LanguageContext } from 'contexts';
import React, { forwardRef, useContext } from 'react';
import BlogsSectionProps from './types';

const Blogs = forwardRef<HTMLElement | undefined, BlogsSectionProps>(
  ({ title, content, className }: BlogsSectionProps, ref) => {
    const language = useContext(LanguageContext);
    const { items } = content;

    return (
      <section
        id="blogs"
        className={className}
        ref={section => {
          if (ref) {
            if (typeof ref === 'function') {
              ref(section);
            } else {
              ref.current = section;
            }
          }
        }}
      >
        <div className="flex items-center justify-between">
          <SectionTitle>{title}</SectionTitle>

          <RoundedButton as="a" href="https://medium.com/@itsfaqih">
            {language.value === 'en' ? 'More article' : 'Artikel lainnya'}
          </RoundedButton>
        </div>
        <div className="grid grid-cols-1 mt-10 md:mt-8 md:grid-cols-2 md:gap-x-20 gap-y-10 md:gap-y-16">
          {items.map((item, index) => (
            <BlogPost key={index} data={item} />
          ))}
        </div>
      </section>
    );
  }
);

export default Blogs;
