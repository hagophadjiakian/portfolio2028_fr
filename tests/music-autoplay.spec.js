import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

// Some browsers allow sound without a click (for example sites the visitor
// plays media on often). There the music should start by itself.
test.use({ launchOptions: { args: ['--autoplay-policy=no-user-gesture-required'] } });

test('music starts by itself where the browser allows it, and its controls stay accessible', async ({ page }) => {
  const audio = [];
  page.on('request', (request) => {
    if (request.url().includes('/audio/')) audio.push(request.url().split('/').pop());
  });
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => !document.querySelector('audio').paused), { timeout: 10_000 }).toBe(true);
  expect([...new Set(audio)]).toEqual(['home.webm']);

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.map((v) => v.id)).toEqual([]);
});
