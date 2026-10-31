import { chromium, type Browser, type Locator, type Page } from 'playwright';
import { afterAll, beforeAll, expect, onTestFinished, test } from 'vite-plus/test';
import { codePointRanges } from '../fonts/unicode-range.ts';
import { serveDist } from './serve.ts';

let browser: Browser;

let site: Awaited<ReturnType<typeof serveDist>>;

beforeAll(async () => {
  site = await serveDist();
  browser = await chromium.launch();
});

afterAll(async () => {
  await browser.close();
  await site.close();
});

async function open(path: string, { javaScript = true, storage = true, motion = false } = {}) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    javaScriptEnabled: javaScript,
    ignoreHTTPSErrors: true,
    reducedMotion: motion ? 'no-preference' : 'reduce',
  });

  context.setDefaultTimeout(5000);
  onTestFinished(() => context.close());

  if (!storage) {
    await context.addInitScript(() =>
      Object.defineProperty(window, 'sessionStorage', {
        get: () => {
          throw new DOMException('Site data is blocked', 'SecurityError');
        },
      }),
    );
  }

  const page = await context.newPage();

  const errors: string[] = [];

  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error') {
      errors.push(message.text());
    }
  });
  onTestFinished(() => expect(errors).toEqual([]));

  await page.goto(`${site.url}${path}`);

  return page;
}

const inViewport = (page: Page, selector: string) =>
  page.locator(selector).evaluate((element) => {
    const { top, bottom } = element.getBoundingClientRect();

    return top < window.innerHeight && bottom > 0;
  });

const menuLink = (page: Page, name: string) =>
  page.getByRole('navigation', { name: 'Sections' }).getByRole('link', { name, exact: true });

// Locator.click() first scrolls its target to the viewport's end, which moves the page for the sticky nav; a mouse clicks where the target already is, once it has finished animating in.
async function clickInPlace(locator: Locator) {
  await locator.evaluate(() =>
    Promise.all(document.getAnimations().map(({ finished }) => finished)),
  );
  const box = (await locator.boundingBox())!;

  await locator.page().mouse.click(box.x + box.width / 2, box.y + box.height / 2);
}

const sectionIds = ['about', 'projects', 'blogs', 'skills', 'contact'];

test.each(['/', '/id/'])('Every character on %s is in the subset font', async (path) => {
  const page = await open(path, { javaScript: false });

  const text = await page.evaluate(() => {
    document.body.querySelectorAll('script').forEach((script) => script.remove());

    return document.body.textContent + document.title;
  });

  const missing = [...new Set(text.replaceAll(/[\s\p{Extended_Pictographic}]/gu, ''))].filter(
    (character) => {
      const code = character.codePointAt(0) ?? 0;

      return !codePointRanges.some(({ from, to }) => code >= from && code <= to);
    },
  );

  expect(missing).toEqual([]);
});

test.each([
  ['/', 'en', ['About me', 'Projects', 'Blogs', 'Skills', 'Get in touch']],
  ['/id/', 'id', ['Tentang saya', 'Proyek', 'Blog', 'Kemampuan', 'Hubungi saya']],
])('Without JavaScript %s shows every section in its language', async (path, lang, titles) => {
  const page = await open(path, { javaScript: false });

  expect(await page.locator('html').getAttribute('lang')).toBe(lang);

  for (const [index, id] of sectionIds.entries()) {
    const section = page.locator(`#${id}`);

    await section.scrollIntoViewIfNeeded();
    expect(await inViewport(page, `#${id}`)).toBe(true);
    expect(await section.textContent()).toContain(titles[index]);
  }

  expect(await page.getByRole('img', { name: 'Profile Picture' }).isVisible()).toBe(true);
});

test.each([
  {
    screen: 'a phone',
    viewport: { width: 412, height: 823 },
    deviceScaleFactor: 1.75,
    file: 'person-240.avif',
  },
  {
    screen: 'a retina laptop',
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    file: 'person.avif',
  },
])(
  'On $screen the profile picture downloads $file',
  async ({ viewport, deviceScaleFactor, file }) => {
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor,
      ignoreHTTPSErrors: true,
    });

    onTestFinished(() => context.close());

    const page = await context.newPage();

    await page.goto(site.url);

    const photo = page.getByRole('img', { name: 'Profile Picture' });

    await expect
      .poll(() => photo.evaluate((image: HTMLImageElement) => image.currentSrc))
      .toMatch(new RegExp(`/img/${file}$`));
  },
);

test('Without JavaScript the menu opens, and a section link closes it and jumps there', async () => {
  const page = await open('/', { javaScript: false });

  expect(await menuLink(page, 'Projects').isVisible()).toBe(false);
  await page.getByRole('link', { name: 'Menu' }).click();
  await menuLink(page, 'Projects').waitFor({ state: 'visible' });
  await menuLink(page, 'Projects').click();

  await menuLink(page, 'Projects').waitFor({ state: 'hidden' });
  expect(await inViewport(page, '#projects')).toBe(true);
});

test('Without JavaScript the open menu closes from the same corner', async () => {
  const page = await open('/', { javaScript: false });

  await page.getByRole('link', { name: 'Menu' }).click();
  await menuLink(page, 'About me').waitFor({ state: 'visible' });
  await page.getByRole('link', { name: 'Close menu' }).click();

  await menuLink(page, 'About me').waitFor({ state: 'hidden' });
  expect(await page.evaluate(() => window.scrollY)).toBe(0);
});

test('Without JavaScript the language switch goes to the Indonesian page and back', async () => {
  const page = await open('/', { javaScript: false });

  await page.locator('summary').click();
  await page.getByRole('link', { name: 'Indonesia' }).click();
  await page.waitForURL(`${site.url}/id/`);

  await page.locator('summary').click();
  await page.getByRole('link', { name: 'English' }).click();
  await page.waitForURL(`${site.url}/`);

  expect(await page.locator('html').getAttribute('lang')).toBe('en');
});

test('Without JavaScript Scroll down jumps to About me', async () => {
  const page = await open('/', { javaScript: false });

  await page.getByRole('link', { name: 'Scroll down' }).click();

  await expect.poll(() => inViewport(page, '#about')).toBe(true);
});

test.each(['/', '/id/'])(
  'On %s the notice links to itsfaqih.dev and the menu button sits below it, then stays 32px from the top',
  async (path) => {
    const page = await open(path, { javaScript: false });
    const notice = page.locator('[data-notice]');
    const menuButton = page.getByRole('link', { name: 'Menu', exact: true });

    await expect
      .poll(() => notice.getByRole('link', { name: 'itsfaqih.dev' }).getAttribute('href'))
      .toBe('https://itsfaqih.dev');
    const noticeBottom = (await notice.boundingBox())!.y + (await notice.boundingBox())!.height;
    expect((await menuButton.boundingBox())!.y).toBeGreaterThanOrEqual(noticeBottom + 32);

    await page.locator('#blogs').scrollIntoViewIfNeeded();
    await expect.poll(async () => (await notice.boundingBox())!.y).toBeLessThan(0);
    expect((await menuButton.boundingBox())!.y).toBe(32);
  },
);

test('With JavaScript the menu button opens the menu without touching the address', async () => {
  const page = await open('/');
  const trigger = page.getByRole('button', { name: 'Menu' });

  expect(await trigger.getAttribute('aria-expanded')).toBe('false');
  await trigger.click();

  await menuLink(page, 'About me').waitFor({ state: 'visible' });
  expect(await trigger.getAttribute('aria-expanded')).toBe('true');
  expect(new URL(page.url()).hash).toBe('');

  await trigger.click();
  await menuLink(page, 'About me').waitFor({ state: 'hidden' });
  expect(await trigger.getAttribute('aria-expanded')).toBe('false');
});

/** The entrance animations running on the first menu link right after each of two opens. */
async function menuEntranceOnTwoOpens(page: Page, firstLink: string) {
  const trigger = page.getByRole('button', { name: 'Menu' });

  const runningEntrance = () =>
    menuLink(page, firstLink).evaluate((link) =>
      link
        .querySelector('.from')!
        .getAnimations()
        .map((animation) => (animation instanceof CSSAnimation ? animation.animationName : '')),
    );

  const allAnimationsFinished = () =>
    page.evaluate(() => Promise.all(document.getAnimations().map(({ finished }) => finished)));

  await allAnimationsFinished();
  await trigger.click();
  const first = await runningEntrance();

  await allAnimationsFinished();
  await trigger.click();
  await menuLink(page, firstLink).waitFor({ state: 'hidden' });
  await trigger.click();

  return [first, await runningEntrance()];
}

test('With JavaScript the menu links slide in each time the menu opens', async () => {
  const page = await open('/', { motion: true });

  expect(await menuEntranceOnTwoOpens(page, 'About me')).toEqual([['from'], ['from']]);
});

test('With JavaScript the Indonesian menu links slide in each time the menu opens', async () => {
  const page = await open('/id/', { motion: true });

  expect(await menuEntranceOnTwoOpens(page, 'Tentang saya')).toEqual([['from'], ['from']]);
});

test('With JavaScript the menu links still slide in after switching to Indonesian', async () => {
  const page = await open('/', { motion: true });

  await clickInPlace(page.locator('summary'));
  await clickInPlace(page.getByRole('link', { name: 'Indonesia' }));
  await page.waitForURL(`${site.url}/id/`);

  expect(await menuEntranceOnTwoOpens(page, 'Tentang saya')).toEqual([['from'], ['from']]);
});

test('With JavaScript Enter opens the menu on its first link and Escape returns to the button', async () => {
  const page = await open('/');
  const trigger = page.getByRole('button', { name: 'Menu' });

  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect
    .poll(() => menuLink(page, 'About me').evaluate((link) => link === document.activeElement))
    .toBe(true);

  await page.keyboard.press('Escape');

  await menuLink(page, 'About me').waitFor({ state: 'hidden' });
  expect(await trigger.evaluate((button) => button === document.activeElement)).toBe(true);
});

test('With JavaScript a section link closes the menu and jumps to the section', async () => {
  const page = await open('/');

  await page.getByRole('button', { name: 'Menu' }).click();
  await menuLink(page, 'Skills').click();

  await menuLink(page, 'Skills').waitFor({ state: 'hidden' });
  await expect.poll(() => inViewport(page, '#skills')).toBe(true);
});

test('With JavaScript switching language keeps the reader at the same place', async () => {
  const page = await open('/');

  await page.locator('#blogs').scrollIntoViewIfNeeded();

  const scrollY = await page.evaluate(() => window.scrollY);

  await clickInPlace(page.locator('summary'));
  await clickInPlace(page.getByRole('link', { name: 'Indonesia' }));
  await page.waitForURL(`${site.url}/id/`);

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(scrollY);
  expect(await page.getByText('Artikel lainnya').isVisible()).toBe(true);
});

test('With JavaScript Escape closes the language list', async () => {
  const page = await open('/');

  await page.locator('summary').click();
  await page.getByRole('link', { name: 'Indonesia' }).waitFor({ state: 'visible' });
  await page.keyboard.press('Escape');

  await page.getByRole('link', { name: 'Indonesia' }).waitFor({ state: 'hidden' });
  expect(new URL(page.url()).pathname).toBe('/');
});

test('With JavaScript Scroll down glides to About me without changing the address', async () => {
  const page = await open('/');

  await page.getByRole('link', { name: 'Scroll down' }).click();

  await expect.poll(() => inViewport(page, '#about')).toBe(true);
  expect(new URL(page.url()).hash).toBe('');
});

test('With JavaScript a section waits off screen and shows once scrolled into view', async () => {
  const page = await open('/');
  const moreArticles = page.getByRole('link', { name: 'More article' });

  expect(await page.locator('#blogs').getAttribute('data-in')).toBeNull();

  await page.locator('#blogs').scrollIntoViewIfNeeded();

  await expect.poll(() => page.locator('#blogs').getAttribute('data-in')).toBe('');
  await moreArticles.waitFor({ state: 'visible' });
});

test('With site data blocked the sections still show and the menu still opens', async () => {
  const page = await open('/', { storage: false });

  await page.locator('#blogs').scrollIntoViewIfNeeded();
  await expect.poll(() => page.locator('#blogs').getAttribute('data-in')).toBe('');

  await page.getByRole('button', { name: 'Menu' }).click();
  await menuLink(page, 'About me').waitFor({ state: 'visible' });
});

const scrollY = (page: Page) => page.evaluate(() => window.scrollY);

const scrollYOverFrames = (page: Page, frames: number) =>
  page.evaluate(
    (count) =>
      new Promise<number[]>((resolve) => {
        const samples: number[] = [];

        const sample = () => {
          samples.push(window.scrollY);

          if (samples.length < count) {
            requestAnimationFrame(sample);
          } else {
            resolve(samples);
          }
        };

        requestAnimationFrame(sample);
      }),
    frames,
  );

const thumb = (page: Page) => page.getByTestId('scroll-thumb');

const thumbEdges = (page: Page) =>
  thumb(page).evaluate((element) => {
    const { top, bottom } = element.getBoundingClientRect();

    return { top: Math.round(top), bottom: Math.round(bottom) };
  });

const thumbOpacity = (page: Page) =>
  thumb(page).evaluate((element) => Number(getComputedStyle(element).opacity));

test('With JavaScript a wheel scroll glides on after the wheel stops', async () => {
  const page = await open('/', { motion: true });

  await page.mouse.move(640, 360);
  await page.mouse.wheel(0, 600);

  const midGlide = await page.evaluate(
    () =>
      new Promise<number>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve(window.scrollY))),
      ),
  );

  expect(midGlide).toBeGreaterThan(0);
  expect(midGlide).toBeLessThan(600);
  await expect.poll(() => scrollY(page), { timeout: 3000 }).toBe(600);
});

test('With reduced motion a wheel scroll lands without gliding', async () => {
  const page = await open('/');

  await page.mouse.move(640, 360);
  await page.mouse.wheel(0, 600);

  await expect.poll(() => scrollY(page)).toBe(600);
});

test('With JavaScript the open menu keeps the page from scrolling under it', async () => {
  const page = await open('/', { motion: true });

  await page.getByRole('button', { name: 'Menu' }).click();
  await menuLink(page, 'About me').waitFor({ state: 'visible' });
  const before = await scrollY(page);

  await page.mouse.move(640, 360);
  await page.mouse.wheel(0, 600);

  expect(new Set(await scrollYOverFrames(page, 30))).toEqual(new Set([before]));
});

test('With JavaScript the page swaps the native scrollbar for its own thumb', async () => {
  const page = await open('/');

  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth)).toBe(
    'none',
  );
  await expect.poll(() => thumbOpacity(page)).toBe(0);
});

test('Without JavaScript the page keeps the native scrollbar', async () => {
  const page = await open('/', { javaScript: false });

  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollbarWidth)).toBe(
    'auto',
  );
});

test('With JavaScript the scroll thumb shows while scrolling and fades once scrolling stops', async () => {
  const page = await open('/');

  await page.mouse.move(640, 360);
  await page.mouse.wheel(0, 600);

  await expect.poll(() => thumbOpacity(page)).toBe(1);
  await expect.poll(() => thumbOpacity(page), { timeout: 3000 }).toBe(0);
});

test('With JavaScript the scroll thumb shows while the cursor is near it', async () => {
  const page = await open('/');

  await page.mouse.move(1270, 360);
  await expect.poll(() => thumbOpacity(page)).toBe(1);

  await page.mouse.move(640, 360);
  await expect.poll(() => thumbOpacity(page), { timeout: 3000 }).toBe(0);
});

test('With JavaScript the scroll thumb tracks the page and dragging it scrolls', async () => {
  const page = await open('/');

  const maxScroll = await page.evaluate(
    () => document.documentElement.scrollHeight - window.innerHeight,
  );

  await page.evaluate((y) => window.scrollTo(0, y), maxScroll);
  await expect.poll(async () => (await thumbEdges(page)).bottom).toBe(716);

  await page.evaluate(() => window.scrollTo(0, 0));
  await expect.poll(async () => (await thumbEdges(page)).top).toBe(4);

  const box = (await thumb(page).boundingBox())!;

  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2, 720, { steps: 5 });
  await page.mouse.up();

  await expect.poll(() => scrollY(page)).toBe(maxScroll);
});
