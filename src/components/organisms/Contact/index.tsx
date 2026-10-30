import { FullRoundButton } from 'components/atoms';
import Icons from 'components/icons';
import React from 'react';
import ContactSectionProps from 'components/organisms/Contact/types';
import Animated from 'components/animations';

export default function Contact({ title, content }: ContactSectionProps) {
  const { email, socials } = content;

  return (
    <section id="contact" data-reveal="0.4">
      <h2 className="flex justify-center text-3xl font-bold text-gray-600 md:justify-start">
        <Animated.Letter text={title} custom={0} delay={0.6} />
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <a
          href={`mailto:${email}`}
          className="relative mt-6 text-4xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-8"
        >
          <Animated.Letter text={email} custom={1} delay={0.6} />
          <Animated.Highlighter className="h-4 bottom-0.5" rad={8} custom={2} delay={0.6} />
        </a>
        <div className="flex items-center mt-8 md:mt-0">
          <Animated.FromDirection from="bottom" custom={2.2} delay={0.6}>
            <FullRoundButton href={socials.facebook} label="Facebook">
              <Icons.Facebook className="w-6" />
            </FullRoundButton>
          </Animated.FromDirection>
          <Animated.FromDirection from="bottom" custom={2.4} delay={0.6}>
            <FullRoundButton href={socials.twitter} className="mx-6" label="Twitter">
              <Icons.Twitter className="w-6" />
            </FullRoundButton>
          </Animated.FromDirection>
          <Animated.FromDirection from="bottom" custom={2.6} delay={0.6}>
            <FullRoundButton href={socials.instagram} label="Instagram">
              <Icons.Instagram className="w-6" />
            </FullRoundButton>
          </Animated.FromDirection>
        </div>
      </div>
    </section>
  );
}
