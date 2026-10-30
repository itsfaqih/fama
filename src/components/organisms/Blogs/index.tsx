import Animated from 'components/animations';
import { RoundedButton } from 'components/atoms';
import { SectionTitle, BlogPost } from 'components/molecules';
import { LanguageContext } from 'contexts';
import React, { useContext } from 'react';
import BlogsSectionProps from './types';

export default function Blogs({ title, content, className }: BlogsSectionProps) {
  const language = useContext(LanguageContext);
  const { items, moreUrl } = content;

  return (
    <section id="blogs" className={className} data-reveal="0.45">
      <div className="flex items-center justify-between">
        <SectionTitle>
          <Animated.Letter text={title} custom={0} delay={1} />
        </SectionTitle>
        {moreUrl && (
          <Animated.FromDirection from="bottom" custom={0.5} delay={1}>
            <RoundedButton as="a" href={moreUrl}>
              {language === 'en' ? 'More article' : 'Artikel lainnya'}
            </RoundedButton>
          </Animated.FromDirection>
        )}
      </div>
      <div className="grid grid-cols-1 mt-10 md:mt-8 md:grid-cols-2 md:gap-x-20 gap-y-10 md:gap-y-16">
        {items.map((item, index) => (
          <Animated.FromDirection key={index} from="left" custom={index + 1} delay={0.4}>
            <Animated.Reveal from="left" custom={index + 3} delay={0.4}>
              <BlogPost data={item} />
            </Animated.Reveal>
          </Animated.FromDirection>
        ))}
      </div>
    </section>
  );
}
