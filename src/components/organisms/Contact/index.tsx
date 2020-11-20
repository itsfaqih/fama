import { FullRoundButton } from 'components/atoms';
import Icons from 'components/icons';
import React from 'react';
import ContactSectionProps from 'components/organisms/Contact/types';

export default function Contact({ title, content }: ContactSectionProps) {
  const { email, socials } = content;
  return (
    <section id="contact">
      <h2 className="text-3xl font-bold text-center text-gray-600 md:text-left">{title}</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between">
        <a
          href={`mailto:${email}`}
          className="relative mt-6 text-4xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-8"
        >
          {email}
          <svg
            className="absolute h-4 text-indigo-200 w-full-2 bottom-0.5 -z-10 -left-1"
            fill="currentColor"
          >
            <rect width="100%" height="100%" rx={8} ry={8} />
          </svg>
        </a>
        <div className="flex items-center mt-8 md:mt-0">
          <FullRoundButton as="a" href={socials.facebook} label="Facebook">
            <Icons.Facebook className="w-6" />
          </FullRoundButton>
          <FullRoundButton as="a" href={socials.twitter} className="mx-6" label="Twitter">
            <Icons.Twitter className="w-6" />
          </FullRoundButton>
          <FullRoundButton as="a" href={socials.instagram} label="Instagram">
            <Icons.Instagram className="w-6" />
          </FullRoundButton>
        </div>
      </div>
    </section>
  );
}
