import { ProjectsSectionContentProps } from 'components/organisms/Projects/types';

const projects: ProjectsSectionContentProps = {
  moreUrl: 'https://github.com/itsfaqih',
  items: [
    {
      title: 'Schemata',
      description: 'Entity relationship diagram builder. Built with React and Tailwind CSS.',
      type: 'web',
      url: 'https://schemata.ruine.app/',
    },
    {
      title: 'ruine UI',
      description: 'Dashboard UI kit. Built with Astro and Tailwind CSS.',
      type: 'github',
      url: 'https://github.com/ruine-dev/ruine-ui-dashboard',
    },
    {
      title: 'Fama',
      description: 'Statically generated portfolio template. Built with React and Tailwind CSS.',
      type: 'github',
      url: 'https://github.com/itsfaqih/fama',
    },
    {
      title: 'PHPID',
      description: 'Online learning platform redesign for PHPID. Designed in Figma.',
      type: 'figma',
      url: 'https://www.figma.com/design/qNIg0A9h7PnrFdOVSBbMEH/PHPID-Online-Learning-Redesign?node-id=0-1&t=PcPvOnrKzLginYqa-1',
    },
    {
      title: 'Overflow',
      description: 'TailwindCSS Admin Dashboard Template.',
      type: 'dribbble',
      url: 'https://dribbble.com/shots/11877395-Overflow-TailwindCSS-Admin-Dashboard-Template',
    },
    {
      title: 'usePagination',
      description: 'Simple client side pagination hooks for react.',
      type: 'github',
      url: 'https://github.com/itsfaqih/usepagination',
    },
  ],
};

export default projects;
