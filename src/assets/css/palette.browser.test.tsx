import { capture } from 'component-tests/capture';
import { RoundedButton } from 'components/atoms';
import BlogPost from 'components/molecules/BlogPost';
import { expect, test } from 'vite-plus/test';
import { page } from 'vite-plus/test/browser';
import { render } from 'vitest-browser-react';

test('Palette: primary buttons use the original indigo 500 (#6366f1)', async () => {
  await render(<RoundedButton>Send</RoundedButton>);

  await expect
    .element(page.getByRole('button', { name: 'Send' }))
    .toHaveStyle('background-color: rgb(99, 102, 241)');
  await capture('Palette', 'indigo-button');
});

test('Palette: secondary text uses the original cool gray 700 (#374151)', async () => {
  await render(
    <BlogPost
      className=""
      data={{ title: 'A post', date: new Date('2020-11-16'), url: 'https://example.com/post' }}
    />,
  );

  await expect
    .element(page.getByText('November 16, 2020'))
    .toHaveStyle({ color: 'rgb(55, 65, 81)' });
});
