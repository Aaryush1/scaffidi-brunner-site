import { expect, test } from '@playwright/test';

test('choosing an audience re-centers the page and persists across pages', async ({ page }) => {
  await page.goto('/');
  const picker = page.locator('[data-audience-picker]').first();
  await picker.getByLabel('Real Estate Investors').check();

  // Timeline follows the audience.
  await expect(page.locator('#years-ahead [data-scenario="real-estate"]')).toHaveAttribute('aria-pressed', 'true');
  // Relevant services are highlighted, others dimmed.
  await expect(page.locator('#who [data-audiences~="real-estate"][data-highlight]')).toHaveCount(3);
  await expect(page.locator('#who [data-dim]')).toHaveCount(2);
  await expect(picker.getByRole('status')).toContainText('Real Estate Investors');

  await page.goto('/services/');
  await expect(page.locator('[data-audience-picker]').getByLabel('Real Estate Investors')).toBeChecked();
  await expect(page.locator('[data-audiences~="real-estate"][data-highlight]')).toHaveCount(3);
});

test('clear choice removes highlight and storage', async ({ page }) => {
  await page.goto('/');
  const picker = page.locator('[data-audience-picker]').first();
  await picker.getByLabel('Business Owners').check();
  await picker.getByRole('button', { name: 'Clear' }).click();
  await expect(page.locator('[data-highlight]')).toHaveCount(0);
  await expect(page.locator('[data-dim]')).toHaveCount(0);
  await expect(picker.getByLabel('Business Owners')).not.toBeChecked();
  expect(await page.evaluate(() => sessionStorage.getItem('sb-audience'))).toBeNull();
});

test('a stale or unknown stored audience is ignored', async ({ page }) => {
  await page.addInitScript(() => sessionStorage.setItem('sb-audience', 'astronauts'));
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.locator('[data-highlight]')).toHaveCount(0);
  expect(errors).toEqual([]);
});
