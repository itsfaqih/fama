import type { IconifyIcon } from '@iconify/react';

// Vite's CommonJS interop can hand over the module object instead of its default export.
type ViteCommonJsIcon = {
  default: IconifyIcon;
};

export default function normalizeIconifyIcon(icon: IconifyIcon | ViteCommonJsIcon): IconifyIcon {
  return 'default' in icon ? icon.default : icon;
}
