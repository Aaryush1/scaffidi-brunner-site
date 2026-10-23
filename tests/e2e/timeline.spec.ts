import { expect, test } from '@playwright/test';

const section = (page: import('@playwright/test').Page) => page.locator('#years-ahead');

test('switches scenario and mode by keyboard, and the accessible list follows', async ({ page }) => {
  await page.goto('/');
  const s = section(page);
  await expect(s.getByRole('heading', { level: 2 })).toBeVisible();
  const list = s.locator('ol.events');
  await expect(list).toContainText('Sale closes');

  const buy = s.getByRole('button', { name: 'Buy a property' });
  await buy.focus();
  await page.keyboard.press('Enter');
  await expect(buy).toHaveAttribute('aria-pressed', 'true');
  await expect(list).toContainText('Cost segregation study');

  const late = s.getByRole('button', { name: 'Plan at filing' });
  await late.focus();
  await page.keyboard.press('Space');
  await expect(late).toHaveAttribute('aria-pressed', 'true');
  await expect(list).toContainText('Planning starts at filing');
  await expect(list).not.toContainText('Cost segregation study');
});

test('always shows the disclaimer and both outcomes', async ({ page }) => {
  await page.goto('/');
  const s = section(page);
  await expect(s.getByText('Illustrative only. Not tax advice.')).toBeVisible();
  await expect(s.locator('[data-kept="early"]')).toHaveText('$8.4M');
  await expect(s.locator('[data-kept="late"]')).toHaveText('$6.9M');
  await s.getByRole('button', { name: 'Pass wealth to the kids' }).click();
  await expect(s.locator('[data-kept="early"]')).toHaveText('$12.1M');
});

test('mobile layout: vertical list, no overflow, no overlapping labels', async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 780 });
  await page.goto('/#years-ahead');
  const s = section(page);
  await expect(s.locator('ol.events')).toBeVisible();
  await expect(s.locator('.track')).toBeHidden();
  const overflow = await s.evaluate((el) => el.scrollWidth - el.clientWidth);
  expect(overflow).toBeLessThanOrEqual(0);
});

test('desktop track labels never overlap', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const s = section(page);
  for (const name of ['Sell the business', 'Buy a property', 'Pass wealth to the kids']) {
    for (const mode of ['Plan early', 'Plan at filing']) {
      await s.getByRole('button', { name }).click();
      await s.getByRole('button', { name: mode }).click();
      await page.waitForTimeout(700);
      const boxes = await s.locator('.track .ev .lbl').evaluateAll((els) => els.map((e) => e.getBoundingClientRect().toJSON()));
      const track = await s.locator('.track').boundingBox();
      // Events must sit along the track in time order and span a real part of it.
      const centers = boxes.map((b) => b.left + b.width / 2);
      expect(centers, `${name}/${mode}: events in time order`).toEqual([...centers].sort((a, b) => a - b));
      expect(centers.at(-1)! - centers[0], `${name}/${mode}: events spread across the track`).toBeGreaterThan(track!.width * 0.15);
      for (const b of boxes) expect(b.width, `${name}/${mode}: label is laid out as a positioned box`).toBeLessThan(200);
      for (let i = 0; i < boxes.length; i++)
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i], b = boxes[j];
          const overlap = a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;
          expect(overlap, `${name}/${mode}: label ${i} overlaps ${j}`).toBe(false);
        }
    }
  }
});

test('reduced motion: no transitions on events', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto('/');
  const dur = await section(page).locator('.track .ev').first().evaluate((el) => getComputedStyle(el).transitionDuration);
  expect(dur.split(',').every((d) => parseFloat(d) === 0)).toBe(true);
});
