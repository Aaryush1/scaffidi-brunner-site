import { expect, test } from '@playwright/test';

test('advisor nodes are keyboard reachable and announce their role', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/our-approach/');
  const web = page.locator('[data-advisor-web]');
  const node = web.getByRole('button', { name: 'Estate attorneys' });
  await node.focus();
  await page.keyboard.press('Enter');
  await expect(node).toHaveAttribute('aria-pressed', 'true');
  const panel = web.locator('[aria-live="polite"]');
  await expect(panel).toContainText('estate attorneys');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Enter');
  await expect(web.getByRole('button', { pressed: true })).toHaveCount(1);
});

test('advisor web collapses to a list on small screens without overflow', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/our-approach/');
  const web = page.locator('[data-advisor-web]');
  await expect(web.locator('svg.lines')).toBeHidden();
  await expect(web.getByRole('button', { name: 'Trustees' })).toBeVisible();
  const overflow = await web.evaluate((el) => el.scrollWidth - el.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});
