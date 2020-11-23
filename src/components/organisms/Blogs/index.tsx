import Animated from 'components/animations';
import { RoundedButton } from 'components/atoms';
import { SectionTitle, BlogPost } from 'components/molecules';
import { LanguageContext } from 'contexts';
import { useAnimation } from 'framer-motion';
import React, { forwardRef, useContext, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import BlogsSectionProps from './types';

const Blogs = forwardRef<HTMLElement | undefined, BlogsSectionProps>(
  ({ title, content, className }: BlogsSectionProps, ref) => {
    const controls = useAnimation();
    const [refView, inView] = useInView({
      threshold: 0.45,
    });
    const language = useContext(LanguageContext);
    const { items } = content;

    useEffect(() => {
      if (inView) {
        controls.start('show');
      }
    }, [controls, inView]);

    return (
      <section
        id="blogs"
        className={className}
        ref={section => {
          refView(section);
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
          <SectionTitle
            lineProps={{
              animate: controls,
              custom: 1,
              transition: {
                delay: 1,
              },
            }}
          >
            <Animated.Letter text={title} animate={controls} custom={0} delay={1} />
          </SectionTitle>
          <Animated.FromDirection from="bottom" animate={controls} custom={0.5} delay={1}>
            <RoundedButton as="a" href="https://medium.com/@itsfaqih">
              {language.value === 'en' ? 'More article' : 'Artikel lainnya'}
            </RoundedButton>
          </Animated.FromDirection>
        </div>
        <div className="grid grid-cols-1 mt-10 md:mt-8 md:grid-cols-2 md:gap-x-20 gap-y-10 md:gap-y-16">
          {items.map((item, index) => (
            <Animated.FromDirection
              key={index}
              from="left"
              animate={controls}
              custom={index + 1}
              delay={0.4}
            >
              <Animated.Reveal from="left" animate={controls} custom={index + 3} delay={0.4}>
                <BlogPost data={item} />
              </Animated.Reveal>
            </Animated.FromDirection>
          ))}
        </div>
      </section>
    );
  }
);

export default Blogs;
