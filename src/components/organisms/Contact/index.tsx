import { FullRoundButton, Highlighter } from 'components/atoms';
import Icons from 'components/icons';
import React from 'react';
import ContactSectionProps from 'components/organisms/Contact/types';
import { forwardRef } from 'react';

const Contact = forwardRef<HTMLElement | undefined, ContactSectionProps>(
  ({ title, content }: ContactSectionProps, ref) => {
    const { email, socials } = content;

    return (
      <section
        id="contact"
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
        <h2 className="flex justify-center text-3xl font-bold text-gray-600 md:justify-start">
          {title}
        </h2>
        <div className="flex flex-col items-center md:flex-row md:justify-between">
          <a
            href={`mailto:${email}`}
            className="relative mt-6 text-4xl font-bold text-gray-800 rounded-lg focus:outline-none focus:ring-2 ring-indigo-500 ring-offset-8"
          >
            {email}
            <Highlighter className="h-4 bottom-0.5" rad={8} />
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
);

export default Contact;
