import { page } from 'vite-plus/test/browser';

declare const COMPONENT_ARTIFACTS_DIR: string;

export async function capture(component: string, state: string) {
  await document.fonts.ready;
  await page.screenshot({ path: `${COMPONENT_ARTIFACTS_DIR}/${component}/${state}.png` });
}
