import { test, expect } from '@playwright/test';

// Playwright's trace snapshots count as a user gesture, which would let the
// music start without a click, so tracing is off for this file.
test.use({ trace: 'off' });

test('music is on by default and starts with the first click on the page', async ({ page }) => {
  const audio = [];
  page.on('request', (request) => {
    if (request.url().includes('/audio/')) audio.push(request.url().split('/').pop());
  });
  await page.goto('/');
  // No checks in the first seconds: page scripts run by Playwright also count
  // as a user gesture.
  await page.waitForTimeout(2500);
  // Browsers block sound until the visitor interacts, so nothing has downloaded yet
  expect(audio).toEqual([]);
  await expect(page.getByRole('button', { name: 'Pause background music' })).toHaveAttribute('aria-pressed', 'true');

  await page.locator('h1').click();
  await expect.poll(() => page.evaluate(() => !document.querySelector('audio').paused)).toBe(true);
  // Opus where supported (Chromium), MP3 elsewhere — one file either way
  expect([...new Set(audio)]).toEqual(['home.webm']);
});
