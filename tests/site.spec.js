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
  test('main buttons are visible without scrolling', async ({ page }) => {
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

  test('no music is downloaded until the visitor turns it on', async ({ page }) => {
    const audio = [];
    page.on('request', (request) => {
      if (request.url().includes('/audio/')) audio.push(request.url().split('/').pop());
    });
    await page.goto('/');
    await page.waitForTimeout(2000);
    expect(audio).toEqual([]);

    await page.getByRole('button', { name: 'Play background music' }).click();
    await expect.poll(() => audio.length).toBeGreaterThan(0);
    expect([...new Set(audio)]).toEqual(['home.mp3']);
  });
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
    await expect(dialog.locator('img')).toHaveAttribute('src', /deans-1600\.webp$/);
    await page.keyboard.press('Tab');
    await expect(close).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toBeHidden();
    await expect(thumb).toBeFocused();
  });
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
