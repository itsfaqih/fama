import type { IconifyIcon } from '@iconify/react';

type ViteCommonJsIcon = {
  default?: IconifyIcon;
};

export default function normalizeIconifyIcon(icon: IconifyIcon): IconifyIcon {
  const importedIcon = icon as IconifyIcon & ViteCommonJsIcon;

  return importedIcon.default?.body ? importedIcon.default : icon;
}
