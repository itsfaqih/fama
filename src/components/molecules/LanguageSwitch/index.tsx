import Icons from 'components/icons';
import { LanguageContext } from 'contexts';
import { languages } from 'contexts/language';
import React, { useContext } from 'react';

export default function LanguageSwitch() {
  const language = useContext(LanguageContext);

  const current = languages.find(({ value }) => value === language);

  return (
    <details className="language group relative">
      <summary className="flex cursor-pointer items-center rounded-lg bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ring-indigo-500">
        <span className="sr-only">Language: </span>
        {current?.label}
        <span
          aria-hidden
          className="ml-2 h-4 w-4 transition-transform transform group-open:rotate-180"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </summary>
      <div className="language-positioner z-20">
        <ul className="language-popup overflow-hidden rounded-xl bg-white text-3xl shadow-md has-focus-visible:ring-2 ring-indigo-500 sm:text-base">
          {languages.map(({ value, label, path }) => (
            <li key={value}>
              <a
                href={path}
                hrefLang={value}
                lang={value}
                aria-current={value === language ? 'page' : undefined}
                className="relative flex w-60 items-center py-4 px-8 hover:bg-indigo-50 focus:bg-indigo-50 focus:outline-none sm:w-32 sm:py-2 sm:px-4"
              >
                {label}
                {value === language && (
                  <Icons.CheckRounded className="absolute right-4 h-7 w-7 text-indigo-500 sm:h-4 sm:w-4" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
