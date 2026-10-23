import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

for (const route of ROUTES) {
  test(`route ${route} renders`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status()).toBe(200);
    // iubenda's embedded policy brings its own <h1>; count only ours.
    const ours = await page.$$eval('h1', (hs) => hs.filter((h) => !h.closest('[id*="iub"], [class*="iub"]')).length);
    expect(ours).toBe(1);
    await expect(page).toHaveTitle(/Scaffidi Brunner/);
  });

  test(`route ${route} has no horizontal scroll at 360px`, async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 780 });
    await page.goto(route);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
}

test('unknown URLs get the branded 404 page', async ({ request }) => {
  const res = await request.get('/404.html');
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain('Page not found');
});

test('footer carries the US privacy opt-out link iubenda binds to', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('footer a.iubenda-cs-uspr-link')).toHaveAttribute('href', '/do-not-sell-or-share-my-personal-information/');
});

test('production has no preview banner and is indexable', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('note', { name: 'Preview notice' })).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
});

test('every internal link resolves', async ({ page, request }) => {
  const seen = new Set<string>();
  for (const route of ROUTES) {
    await page.goto(route);
    const hrefs = await page.$$eval('a[href^="/"]', (as) => as.map((a) => (a as HTMLAnchorElement).getAttribute('href')!.split('#')[0]));
    hrefs.forEach((h) => h && seen.add(h));
  }
  for (const href of seen) {
    const res = await request.get(href);
    expect(res.status(), href).toBe(200);
  }
});
