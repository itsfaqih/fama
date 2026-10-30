if (import.meta.env.DEV) {
  void import('react-grab');
}

import { enhanceLanguage, restoreReaderPlace } from './language';
import { enhanceMenu } from './menu';
import { enhanceReveal } from './reveal';
import { enhanceSmoothScroll } from './smooth-scroll';

restoreReaderPlace();

enhanceReveal();

enhanceMenu();

enhanceLanguage();

enhanceSmoothScroll();
