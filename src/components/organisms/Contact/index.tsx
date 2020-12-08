import { FullRoundButton } from 'components/atoms';
import Icons from 'components/icons';
import React, { useEffect } from 'react';
import ContactSectionProps from 'components/organisms/Contact/types';
import Animated from 'components/animations';
import { useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { forwardRef } from 'react';

const Contact = forwardRef<HTMLElement | undefined, ContactSectionProps>(
  ({ title, content }: ContactSectionProps, ref) => {
    const { email, socials } = content;
    const controls = useAnimation();
    const [refView, inView] = useInView({
      threshold: 0.4,
    });

    useEffect(() => {
      if (inView) {
        controls.start('show');
      }
    }, [controls, inView]);

    return (
      <section
        id="contact"
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
        <h2 className="flex justify-center text-3xl font-bold text-gray-600 md:justify-start">
          <Animated.Letter text={title} animate={controls} custom={0} delay={0.6} />
        </h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <a
            href={`mailto:${email}`}
            className="relative mt-6 text-4xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-8"
          >
            <Animated.Letter text={email} animate={controls} custom={1} delay={0.6} />
            <Animated.Highlighter
              className="h-4 bottom-0.5"
              rad={8}
              animate={controls}
              custom={2}
              delay={0.6}
            />
          </a>
          <div className="flex items-center mt-8 md:mt-0">
            <Animated.FromDirection from="bottom" animate={controls} custom={2.2} delay={0.6}>
              <FullRoundButton as="a" href={socials.facebook} label="Facebook">
                <Icons.Facebook className="w-6" />
              </FullRoundButton>
            </Animated.FromDirection>
            <Animated.FromDirection from="bottom" animate={controls} custom={2.4} delay={0.6}>
              <FullRoundButton as="a" href={socials.twitter} className="mx-6" label="Twitter">
                <Icons.Twitter className="w-6" />
              </FullRoundButton>
            </Animated.FromDirection>
            <Animated.FromDirection from="bottom" animate={controls} custom={2.6} delay={0.6}>
              <FullRoundButton as="a" href={socials.instagram} label="Instagram">
                <Icons.Instagram className="w-6" />
              </FullRoundButton>
            </Animated.FromDirection>
          </div>
        </div>
      </section>
    );
  }
);

export default Contact;
