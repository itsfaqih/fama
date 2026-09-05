import React from 'react';
import { Icon } from '@iconify/react';
import reactIcon from '@iconify/icons-logos/react';
import tailwindcssIcon from '@iconify/icons-logos/tailwindcss-icon';
import laravelIcon from '@iconify/icons-logos/laravel';
import codeigniterIcon from '@iconify/icons-logos/codeigniter';
import postCssIcon from '@iconify/icons-logos/postcss';
import bootstrapIcon from '@iconify/icons-logos/bootstrap';
import nextjsIcon from '@iconify/icons-logos/nextjs';
import normalizeIconifyIcon from 'utils/normalize-iconify';

const reactIconData = normalizeIconifyIcon(reactIcon);
const tailwindcssIconData = normalizeIconifyIcon(tailwindcssIcon);
const laravelIconData = normalizeIconifyIcon(laravelIcon);
const codeigniterIconData = normalizeIconifyIcon(codeigniterIcon);
const postCssIconData = normalizeIconifyIcon(postCssIcon);
const bootstrapIconData = normalizeIconifyIcon(bootstrapIcon);
const nextjsIconData = normalizeIconifyIcon(nextjsIcon);

const skills = [
  <a key="react" href="https://reactjs.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={reactIconData} ssr />
  </a>,
  <a key="tailwindcss" href="https://tailwindcss.com" className="focus:outline-none">
    <Icon className="text-4xl" icon={tailwindcssIconData} ssr />
  </a>,
  <a key="laravel" href="https://laravel.com" className="focus:outline-none">
    <Icon className="text-5xl" icon={laravelIconData} ssr />
  </a>,
  <a key="codeigniter" href="https://codeigniter.com" className="focus:outline-none">
    <Icon className="text-6xl" icon={codeigniterIconData} ssr />
  </a>,
  <a key="postcss" href="https://postcss.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={postCssIconData} ssr />
  </a>,
  <a key="bootstrap" href="https://getboostrap.com" className="focus:outline-none">
    <Icon className="text-5xl" icon={bootstrapIconData} ssr />
  </a>,
  <a key="nextjs" href="https://nextjs.org" className="focus:outline-none">
    <Icon className="text-5xl" icon={nextjsIconData} ssr />
  </a>,
];

export default skills;
