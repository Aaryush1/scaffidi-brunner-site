import { expect, test } from '@playwright/test';

test('services overview lists every capability as an even, full-width row', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/services/');
  const rows = page.locator('#capabilities .svc-index > li');
  await expect(rows).toHaveCount(5);
  const widths = await rows.evaluateAll((els) => els.map((e) => Math.round(e.getBoundingClientRect().width)));
  expect(new Set(widths).size, 'all rows share one width (no orphan grid cells)').toBe(1);
  // The section eyebrow is not repeated on the same page.
  const eyebrows = await page.locator('.eyebrow').allTextContents();
  expect(eyebrows.filter((t) => /layered financial lives/i.test(t)).length).toBeLessThanOrEqual(1);
});

test('a service page leads with its whole intro and says who it is for', async ({ page }) => {
  await page.goto('/services/strategic-tax-planning/');
  const hero = page.locator('.page-hero');
  await expect(hero).toContainText('rarely exist in isolation');
  await expect(hero).toContainText('build strategies around what comes next');
  const who = page.locator('[data-who-for]');
  await expect(who.getByRole('link', { name: 'Business Owners' })).toHaveAttribute('href', '/who-we-serve/#owners');
  await expect(who.getByRole('link', { name: 'Real Estate Investors' })).toBeVisible();
  await expect(page.locator('.pillars > li')).toHaveCount(4);
});

test('other capabilities reuse the index rows and exclude the current page', async ({ page }) => {
  await page.goto('/services/advisory/');
  const others = page.locator('[aria-labelledby="other-h"] .svc-index > li');
  await expect(others).toHaveCount(4);
  await expect(page.locator('[aria-labelledby="other-h"]')).not.toContainText('Advisory for Owners & Families');
});

test('rows stay readable on a phone', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/services/');
  const row = page.locator('#capabilities .svc-index > li').first();
  const box = await row.boundingBox();
  expect(box!.width).toBeLessThanOrEqual(360);
  await expect(row.locator('.svc-title')).toBeVisible();
});
