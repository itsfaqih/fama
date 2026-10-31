if (import.meta.env.DEV) {
  void import('react-grab');
}

import { enhanceLanguage, restoreReaderPlace } from './language';
import { enhanceMenu } from './menu';
import { enhanceReveal } from './reveal';
import { enhanceScroll } from './scroll';
import { enhanceScrollThumb } from './scroll-thumb';
import { enhanceSmoothScroll } from './smooth-scroll';

restoreReaderPlace();

enhanceReveal();

enhanceMenu();

enhanceLanguage();

const lenis = enhanceScroll();

enhanceSmoothScroll(lenis);

enhanceScrollThumb((y) => lenis.scrollTo(y, { immediate: true, force: true }));
