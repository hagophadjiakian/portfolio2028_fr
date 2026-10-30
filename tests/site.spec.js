import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const SITE = 'https://hagophadjiakian2028.vercel.app';

const PAGES = [
  { path: '/', title: 'Hagop Hadjiakian | Portfolio', h1: /Hagop\s+Hadjiakian/ },
  { path: '/about', title: 'My Story | Hagop Hadjiakian', h1: 'My Story' },
  { path: '/projects', title: 'Projects | Hagop Hadjiakian', h1: 'My Projects' },
  { path: '/skills', title: 'Skills | Hagop Hadjiakian', h1: 'Skills & Expertise' },
  { path: '/experience', title: 'Journey | Hagop Hadjiakian', h1: 'My Journey' },
  { path: '/videos', title: 'Videos | Hagop Hadjiakian', h1: 'Videos' },
  { path: '/contact', title: 'Contact | Hagop Hadjiakian', h1: "Let's Connect" },
];

// Scroll through the page so every scroll-revealed section is shown.
async function revealAll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
}

function collectErrors(page) {
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (msg) => {
    // Third-party resources (YouTube thumbnails) can fail on CI networks
    if (msg.type() === 'error' && !/Failed to load resource/.test(msg.text())) errors.push(msg.text());
  });
  return errors;
}

test.describe('pages', () => {
  for (const p of PAGES) {
    test(`${p.path} loads with its own title and heading, no errors, no sideways scroll`, async ({ page }) => {
      const errors = collectErrors(page);
      const response = await page.goto(p.path);
      expect(response.status()).toBe(200);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('h1')).toHaveText(p.h1);

      await revealAll(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow, 'page is wider than the screen').toBeLessThanOrEqual(0);
      expect(errors).toEqual([]);
    });
  }

  test('unknown address shows the 404 page', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist');
    expect(response.status()).toBe(404);
    await expect(page.locator('h1')).toHaveText('Page not found');
  });

  test('old /documentation address redirects to /videos', async ({ page }) => {
    await page.goto('/documentation');
    await expect(page).toHaveURL(/\/videos$/);
    await expect(page.locator('h1')).toHaveText('Videos');
  });
});

test('main navigation works', async ({ page, isMobile }) => {
  await page.goto('/');
  let nav = page.getByRole('navigation', { name: 'Main' });
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    nav = page.locator('#mobile-menu');
  }
  await nav.getByRole('link', { name: 'Skills' }).click();
  await expect(page).toHaveURL(/\/skills$/);
  await expect(page).toHaveTitle('Skills | Hagop Hadjiakian');
  await expect(page.locator('h1')).toHaveText('Skills & Expertise');
});

test.describe('home page', () => {
  test('photo is large', async ({ page, isMobile }) => {
    await page.goto('/');
    const photo = await page.getByRole('img', { name: 'Portrait of Hagop Hadjiakian' }).boundingBox();
    const { width, height } = page.viewportSize();
    if (isMobile) expect(photo.width / width, 'share of the screen width').toBeGreaterThan(0.7);
    else expect(photo.height / height, 'share of the screen height').toBeGreaterThan(0.6);
  });

  test('main buttons are visible without scrolling on computers', async ({ page, isMobile }) => {
    test.skip(isMobile, 'on phones the large photo comes first and the buttons are just below');
    await page.goto('/');
    const { height } = page.viewportSize();
    for (const name of ['My Journey', 'View Projects']) {
      const box = await page.getByRole('link', { name, exact: true }).boundingBox();
      expect(box.y + box.height, `"${name}" is below the fold`).toBeLessThanOrEqual(height);
    }
  });

  test('nothing jumps while the hero types and the quote changes', async ({ page }) => {
    await page.addInitScript(() => {
      window.__cls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) if (!entry.hadRecentInput) window.__cls += entry.value;
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto('/');
    await page.waitForTimeout(6000); // typing effect + one quote change
    const cls = await page.evaluate(() => window.__cls);
    expect(cls, 'cumulative layout shift').toBeLessThan(0.1);
  });
});

test.describe('music', () => {
  const trackAudio = (page) => {
    const audio = [];
    page.on('request', (request) => {
      if (request.url().includes('/audio/')) audio.push(request.url().split('/').pop());
    });
    return audio;
  };
  const isPlaying = (page) => page.evaluate(() => !document.querySelector('audio').paused);

  test('a first click on a link starts that page\'s track directly', async ({ page, isMobile }) => {
    test.skip(isMobile, 'uses the desktop navigation');
    const audio = trackAudio(page);
    await page.goto('/');
    await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: 'My Story' }).click();
    await expect(page).toHaveURL(/\/about$/);
    await expect
      .poll(() => page.evaluate(() => { const a = document.querySelector('audio'); return !a.paused && a.currentSrc.endsWith('about.webm'); }))
      .toBe(true);
    expect(audio).toContain('about.webm');
  });

  test('turning it off is remembered', async ({ page }) => {
    const audio = trackAudio(page);
    await page.goto('/');
    await page.getByRole('button', { name: 'Pause background music' }).click();
    await expect(page.getByRole('button', { name: 'Play background music' })).toHaveAttribute('aria-pressed', 'false');

    await page.reload();
    await expect(page.getByRole('button', { name: 'Play background music' })).toBeVisible();
    await page.locator('h1').click();
    await page.waitForTimeout(1000);
    expect(await isPlaying(page)).toBe(false);
    expect(audio).toEqual([]);
  });
});

test('phone menu covers the page, which cannot scroll while it is open', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'phone menu only');
  await page.goto('/about');
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).toBe('hidden');
  // solid background, nothing of the page shows through
  expect(await menu.evaluate((el) => getComputedStyle(el).backgroundColor)).toBe('rgb(13, 27, 42)');

  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).overflow)).not.toBe('hidden');
});

test('a playing video pauses when it is scrolled off the screen', async ({ page }) => {
  // Stand-in for YouTube's player that records the commands it receives
  await page.route('https://www.youtube-nocookie.com/embed/**', (route) =>
    route.fulfill({
      contentType: 'text/html',
      body: '<!doctype html><body style="background:#000"><script>window.__msgs=[];addEventListener("message",(e)=>__msgs.push(String(e.data)));</script></body>',
    })
  );
  await page.goto('/about');
  await page.getByRole('button', { name: 'Play video: Graduation Day' }).click();
  const frame = await (await page.waitForSelector('iframe[src*="youtube-nocookie"]')).contentFrame();
  await frame.waitForLoadState();
  const paused = () => frame.evaluate(() => window.__msgs.some((m) => m.includes('pauseVideo')));
  expect(await paused()).toBe(false);

  await page.evaluate(() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
  await expect.poll(paused).toBe(true);
});

test('contact form checks the fields, then opens the email app', async ({ page }) => {
  await page.goto('/contact');
  const send = page.getByRole('button', { name: /open in my email app/i });
  await send.click();
  await expect(page.locator('#name')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#email')).toHaveAttribute('aria-invalid', 'true');

  await page.fill('#name', 'Test Visitor');
  await page.fill('#email', 'visitor@example.com');
  await page.fill('#subject', 'Hello');
  await page.fill('#message', 'Testing the contact form.');
  await send.click();
  await expect(page.getByRole('status')).toContainText('email app should now be open');
});

test.describe('keyboard', () => {
  test('experience cards open and close', async ({ page }) => {
    await page.goto('/experience');
    const show = page.getByRole('button', { name: /^Show details: Software & QA Engineer/ });
    await show.click();
    const hide = page.getByRole('button', { name: /^Hide details: Software & QA Engineer/ });
    await expect(hide).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('heading', { name: 'Key Achievements:' })).toBeVisible();

    await hide.focus();
    await page.keyboard.press('Enter');
    await expect(show).toHaveAttribute('aria-expanded', 'false');
    await expect(page.getByRole('heading', { name: 'Key Achievements:' })).toHaveCount(0);
  });

  test('image viewer opens, traps focus and closes with Escape', async ({ page }) => {
    await page.goto('/about');
    const thumb = page.getByRole('button', { name: "Enlarge image: Dean's List Recognition" });
    await thumb.focus();
    await page.keyboard.press('Enter');

    const dialog = page.getByRole('dialog', { name: "Dean's List Recognition" });
    await expect(dialog).toBeVisible();
    const close = page.getByRole('button', { name: 'Close image' });
    await expect(close).toBeFocused();
    // The viewer covers everything, including the navigation bar at the top
    expect(await page.evaluate(() => !!document.elementFromPoint(20, 20)?.closest('[role=dialog]'))).toBe(true);
    const box = await close.boundingBox();
    expect(
      await page.evaluate(([x, y]) => document.elementFromPoint(x, y)?.closest('button')?.getAttribute('aria-label'), [
        box.x + box.width / 2,
        box.y + box.height / 2,
      ])
    ).toBe('Close image');
    await expect(dialog.getByRole('img', { name: "Dean's List Recognition" })).toHaveAttribute('src', /deans-1600\.webp$/);
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(thumb).toBeFocused();
  });
});

test.describe('before JavaScript has loaded', () => {
  // Animations on, so the CSS fade-in on scroll is exercised too
  test.use({ javaScriptEnabled: false, reducedMotion: 'no-preference' });

  test('cards and photos are visible straight away', async ({ page }) => {
    for (const [path, card] of [['/about', "Dean's List Recognition"], ['/projects', 'Project Poster']]) {
      await page.goto(path);
      const heading = page.getByRole('heading', { name: card });
      await heading.evaluate((el) => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
      await page.waitForTimeout(400);
      // the card and everything around it must be fully opaque
      const opacity = await heading.evaluate((el) => {
        let o = 1;
        for (let n = el; n; n = n.parentElement) o *= parseFloat(getComputedStyle(n).opacity);
        return o;
      });
      expect(opacity, `${card} on ${path}`).toBeGreaterThan(0.99);
      const img = page.getByRole('img', { name: card });
      await expect(img).toBeVisible();
      expect(await img.evaluate((el) => getComputedStyle(el).opacity)).toBe('1');
    }
  });
});

test('project gallery opens with the photo already shown', async ({ page }) => {
  await page.goto('/projects');
  const card = page.getByRole('img', { name: 'Project Poster' });
  const cardSrc = await card.getAttribute('src');
  await page.getByRole('button', { name: 'Enlarge image: Project Poster' }).click();
  const shown = page.getByRole('dialog').getByRole('img', { name: 'Project Poster' });
  // same file as the card, so it is already downloaded
  await expect(shown).toHaveAttribute('src', cardSrc);
  await expect(shown).toBeVisible();
});

test('contact page lists email, GitHub and LinkedIn but not NeurolinkUp', async ({ page }) => {
  await page.goto('/contact');
  const main = page.locator('main');
  await expect(main.getByRole('link', { name: /linkedin/i }).first()).toBeVisible();
  await expect(main.getByText('neurolinkup.com')).toHaveCount(0);
  await expect(main.locator('a[href*="neurolinkup.com"]')).toHaveCount(0);
});

test.describe('accessibility (axe)', () => {
  for (const p of [...PAGES, { path: '/this-page-does-not-exist' }]) {
    test(`${p.path} has no violations`, async ({ page }) => {
      await page.goto(p.path);
      await revealAll(page);
      const results = await new AxeBuilder({ page }).analyze();
      const summary = results.violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`);
      expect(summary).toEqual([]);
    });
  }
});

test.describe('without JavaScript (search engines, link previews)', () => {
  test.use({ javaScriptEnabled: false });

  test('every page is prerendered with its own metadata and visible content', async ({ page }) => {
    for (const p of PAGES) {
      await page.goto(p.path);
      await expect(page).toHaveTitle(p.title);
      await expect(page.locator('h1')).toHaveText(p.h1);
      await expect(page.locator('link[rel=canonical]')).toHaveAttribute('href', `${SITE}${p.path}`);
      await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', p.title);
      expect(await page.locator('meta[name=description]').getAttribute('content')).toBeTruthy();
      // Content that normally fades in must not stay invisible
      const hidden = await page.evaluate(
        () => [...document.querySelectorAll('[style*="opacity:0"]')].filter((el) => getComputedStyle(el).opacity !== '1').length
      );
      expect(hidden, `invisible blocks on ${p.path}`).toBe(0);
    }
  });
});

test('robots.txt and sitemap.xml are published', async ({ request }) => {
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain(`Sitemap: ${SITE}/sitemap.xml`);

  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const xml = await sitemap.text();
  for (const p of PAGES) expect(xml).toContain(`<loc>${SITE}${p.path}</loc>`);
});

test('local server uses the same security policy as vercel.json', async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop', 'configuration check runs once');
  const read = (file) => JSON.parse(fs.readFileSync(new URL(`../${file}`, import.meta.url), 'utf8'));
  const headers = (config) => Object.fromEntries(config.headers.flatMap((rule) => rule.headers).map((h) => [h.key, h.value]));
  const vercel = headers(read('vercel.json'));
  const local = headers(read('serve.json'));
  for (const key of ['Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) {
    expect(local[key], key).toBe(vercel[key]);
  }
});
