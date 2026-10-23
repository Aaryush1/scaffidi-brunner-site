import { expect, test } from '@playwright/test';

// The production build uses the firm's iubenda account for consent, exactly as today.
// The built-in banner is exercised against the gift build in gift.spec.ts.
test('production loads the iubenda consent widget and no built-in banner', async ({ page }) => {
  const iub: string[] = [];
  page.on('request', (r) => r.url().includes('iubenda.com') && iub.push(r.url()));
  await page.goto('/');
  await expect(page.locator('[data-consent-banner]')).toHaveCount(0);
  expect(iub.some((u) => u.includes('embeds.iubenda.com/widgets/'))).toBe(true);
});
