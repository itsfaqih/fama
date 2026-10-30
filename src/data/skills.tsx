import React from 'react';
import { Icon } from '@iconify/react';
import reactIcon from '@iconify/icons-logos/react';
import tailwindcssIcon from '@iconify/icons-logos/tailwindcss-icon';
import laravelIcon from '@iconify/icons-logos/laravel';
import postCssIcon from '@iconify/icons-logos/postcss';
import normalizeIconifyIcon from 'utils/normalize-iconify';
import { bootstrapIcon, codeigniterIcon, nextjsIcon } from 'data/legacy-skill-icons';

const reactIconData = normalizeIconifyIcon(reactIcon);

const tailwindcssIconData = normalizeIconifyIcon(tailwindcssIcon);

const laravelIconData = normalizeIconifyIcon(laravelIcon);

const postCssIconData = normalizeIconifyIcon(postCssIcon);

const skills = [
  <a key="react" aria-label="React" href="https://reactjs.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={reactIconData} ssr />
  </a>,
  <a
    key="tailwindcss"
    aria-label="Tailwind CSS"
    href="https://tailwindcss.com"
    className="focus:outline-none"
  >
    <Icon className="text-4xl" icon={tailwindcssIconData} ssr />
  </a>,
  <a key="laravel" aria-label="Laravel" href="https://laravel.com" className="focus:outline-none">
    <Icon className="text-5xl" icon={laravelIconData} ssr />
  </a>,
  <a
    key="codeigniter"
    aria-label="CodeIgniter"
    href="https://codeigniter.com"
    className="focus:outline-none"
  >
    <Icon className="text-6xl" icon={codeigniterIcon} ssr />
  </a>,
  <a key="postcss" aria-label="PostCSS" href="https://postcss.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={postCssIconData} ssr />
  </a>,
  <a
    key="bootstrap"
    aria-label="Bootstrap"
    href="https://getbootstrap.com"
    className="focus:outline-none"
  >
    <Icon className="text-5xl" icon={bootstrapIcon} ssr />
  </a>,
  <a key="nextjs" aria-label="Next.js" href="https://nextjs.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={nextjsIcon} ssr />
  </a>,
];

export default skills;
