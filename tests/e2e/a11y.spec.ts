import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import { ROUTES } from './routes';

// Third-party consent UI (iubenda) is the firm's vendor and outside this codebase.
const EXCLUDE = ['#iubenda-cs-banner', '.iubenda-tp-btn', '[class*="iubenda"]'];

for (const theme of ['light', 'dark'] as const) {
  for (const route of ROUTES) {
    test(`axe: ${route} (${theme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto(route);
      let axe = new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']);
      for (const sel of EXCLUDE) axe = axe.exclude(sel);
      // iubenda's policy markup (summary pills, table-of-contents list) is the vendor's; everything else in the embed is still checked.
      if (route.endsWith('-policy/') || route === '/terms-conditions/') axe = axe.exclude('[data-policy-embed] .pills-list').exclude('[data-policy-embed] .table-of-content-list');
      const { violations } = await axe.analyze();
      expect(violations.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
    });
  }
}
