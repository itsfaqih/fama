import type { IconifyIcon } from '@iconify/react';

type ViteCommonJsIcon = {
  default: IconifyIcon;
};

export default function normalizeIconifyIcon(icon: IconifyIcon | ViteCommonJsIcon): IconifyIcon {
  return 'default' in icon ? icon.default : icon;
}
