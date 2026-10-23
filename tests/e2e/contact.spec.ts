import { expect, test } from '@playwright/test';

test('invalid submit shows inline errors and focuses the first one', async ({ page }) => {
  await page.goto('/contact/');
  await page.locator('#cf-email').fill('not-an-email');
  await page.getByRole('button', { name: 'Submit Message' }).click();
  await expect(page.locator('#cf-first')).toBeFocused();
  await expect(page.locator('#cf-first')).toHaveAttribute('aria-invalid', 'true');
  await expect(page.locator('#cf-first-err')).toBeVisible();
  await expect(page.locator('#cf-email-err')).toContainText('valid email');
  await expect(page.locator('#cf-consent-err')).toBeVisible();
});

test('without a form service, a valid submit opens a prefilled email', async ({ page }) => {
  await page.goto('/contact/');
  await page.evaluate(() => {
    (window as any).__mailto = '';
    (window as any).__openMail = (href: string) => ((window as any).__mailto = href);
  });
  await page.locator('#cf-first').fill('Ada');
  await page.locator('#cf-email').fill('ada@example.com');
  await page.locator('#cf-message').fill('Selling my business & planning ahead');
  await page.locator('#cf-consent').check();
  await page.getByRole('button', { name: 'Submit Message' }).click();
  await expect.poll(() => page.evaluate(() => (window as any).__mailto)).toContain('mailto:info@scaffidibrunner.com');
  await expect(page.getByRole('status')).toContainText('email app');
});

test.describe('no JavaScript', () => {
  test.use({ javaScriptEnabled: false });
  test('form still works as a mailto form', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.locator('form[data-contact-form]')).toHaveAttribute('action', 'mailto:info@scaffidibrunner.com');
    await expect(page.getByRole('button', { name: 'Submit Message' })).toBeEnabled();
  });

  test('empty submit is blocked by the browser, so consent cannot be skipped', async ({ page }) => {
    await page.goto('/contact/');
    await page.getByRole('button', { name: 'Submit Message' }).click();
    await page.waitForTimeout(300);
    expect(page.url()).toContain('/contact/');
    expect(await page.locator('#cf-first').evaluate((el: HTMLInputElement) => el.validity.valid)).toBe(false);
  });

  test('mobile navigation is reachable', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('#site-nav').getByRole('link', { name: 'Who We Serve' })).toBeVisible();
  });
});
