// Runs against the gift preview build (npm run build:gift → dist-gift).
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const skipNote = async (page: import('@playwright/test').Page) =>
  page.addInitScript(() => { try { sessionStorage.setItem('sb-note-seen', '1'); localStorage.setItem('sb-consent', 'necessary'); } catch {} });

test.describe('preview safeguards', () => {
  test('every page says it is a preview, links to the real site, and is not indexed', async ({ page }) => {
    for (const route of ['/', '/services/', '/contact/']) {
      await page.goto(route);
      const banner = page.getByRole('note', { name: 'Preview notice' });
      await expect(banner).toContainText('Not the firm’s official website');
      await expect(banner.getByRole('link', { name: 'scaffidibrunner.com' })).toHaveAttribute('href', 'https://scaffidibrunner.com/');
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    }
  });
});

test.describe('personal note', () => {
  test('does not pop up over the site', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('dialog')).toHaveCount(0);
    await expect(page.locator('footer').getByRole('link', { name: 'A note from Aaryush' })).toHaveAttribute('href', '/note/');
  });

  test('/note/ page exists, signed with the animated signature', async ({ page }) => {
    const res = await page.goto('/note/');
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText('Mike');
    await expect(page.getByRole('img', { name: 'Aaryush' })).toBeVisible();
    await expect(page.locator('.letter')).toContainText('open the repo in Claude');
  });
});

test.describe('just tell us concept', () => {
  test.beforeEach(async ({ page }) => skipNote(page));

  test('example prompt produces a reply and a brief, with zero network requests', async ({ page }) => {
    await page.goto('/concept/');
    await expect(page.getByText('Concept: no AI is running.')).toBeVisible();
    const requests: string[] = [];
    page.on('request', (r) => requests.push(r.url()));
    await page.getByRole('button', { name: /selling my HVAC company/i }).click();
    await page.getByRole('button', { name: 'Send' }).click();
    const reply = page.locator('[data-reply]');
    const brief = page.locator('[data-brief]');
    await expect(reply).toContainText('business sale');
    await expect(brief).toContainText('Shared ownership');
    await expect(brief).toContainText('Transactions & Technical Projects');
    await expect(brief).toContainText('HVAC');
    // Screen readers get the whole reply once; the typing animation is hidden from them.
    await expect(page.locator('[data-reply-sr]')).toContainText('We’ll be in touch shortly.');
    await expect(reply).toHaveAttribute('aria-hidden', 'true');
    expect(requests).toEqual([]);
  });

  test('empty or whitespace input cannot be sent', async ({ page }) => {
    await page.goto('/concept/');
    const send = page.getByRole('button', { name: 'Send' });
    await expect(send).toBeDisabled();
    await page.getByLabel('What’s going on?').fill('    ');
    await expect(send).toBeDisabled();
  });

  test('free text with no match gets the honest general reply', async ({ page }) => {
    await page.goto('/concept/');
    await page.getByLabel('What’s going on?').fill('hello there');
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.locator('[data-brief]')).toContainText('New inquiry');
  });

  test('contact page links to the concept', async ({ page }) => {
    await page.goto('/contact/');
    await expect(page.getByRole('link', { name: /try the concept/i })).toHaveAttribute('href', '/concept/');
  });

  for (const theme of ['light', 'dark'] as const) {
    for (const route of ['/concept/', '/note/']) {
      test(`axe ${route} (${theme})`, async ({ page }) => {
        await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
        await page.goto(route);
        if (route === '/concept/') {
          await page.getByRole('button', { name: /trust for my kids/i }).click();
          await page.getByRole('button', { name: 'Send' }).click();
          await expect(page.locator('[data-brief]')).toBeVisible();
        }
        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      });
    }
  }
});

test.describe('built-in consent banner (gift build has no iubenda)', () => {
  test('shows, dismisses, stays dismissed, and reopens from the footer', async ({ page }) => {
    await page.addInitScript(() => { try { sessionStorage.setItem('sb-note-seen', '1'); } catch {} });
    await page.goto('/about/');
    const banner = page.getByRole('region', { name: 'Cookie choices' });
    await expect(banner).toBeVisible();
    await banner.getByRole('button', { name: 'Necessary only' }).click();
    await expect(banner).toBeHidden();
    await page.reload();
    await expect(banner).toBeHidden();
    await page.getByRole('button', { name: 'Your Privacy Choices' }).click();
    await expect(banner).toBeVisible();
  });
});
