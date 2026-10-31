import { capture } from 'component-tests/capture';
import Animated from 'components/animations';
import { expect, onTestFinished, test } from 'vite-plus/test';
import { render } from 'vitest-browser-react';

test('Reveal: the cover leaves no sliver beside the text once the wipe ends', async () => {
  document.documentElement.classList.add('js');
  onTestFinished(() => document.documentElement.classList.remove('js'));

  const { container } = await render(
    <div data-in style={{ width: '853.33px' }}>
      <Animated.Reveal from="left">I have written most of my code in TypeScript.</Animated.Reveal>
    </div>,
  );

  expect(getComputedStyle(container.querySelector('.reveal-cover')!).visibility).toBe('hidden');
  await capture('Reveal', 'revealed');
});
