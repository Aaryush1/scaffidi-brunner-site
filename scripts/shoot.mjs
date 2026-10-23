// Dev helper: screenshot a page or one element, light or dark. Usage:
// node scripts/shoot.mjs <url> <out.png> [--dark] [--width=1280] [--height=860] [--sel=#years-ahead] [--click="sel|sel"] [--full] [--scale=2]
import { chromium } from '@playwright/test';

const [url, out, ...flags] = process.argv.slice(2);
const opt = {};
for (const f of flags) {
  const [k, ...v] = f.replace(/^--/, '').split('=');
  opt[k] = v.length ? v.join('=') : true;
}

const browser = await chromium.launch();
const page = await browser.newPage({
  viewport: { width: Number(opt.width || 1280), height: Number(opt.height || 860) },
  colorScheme: opt.dark ? 'dark' : 'light',
  reducedMotion: 'reduce',
  deviceScaleFactor: Number(opt.scale || 1),
});
await page.goto(url, { waitUntil: 'networkidle' });
for (const sel of String(opt.click || '').split('|').filter(Boolean)) await page.click(sel);
await page.waitForTimeout(300);
if (opt.sel) await page.locator(opt.sel).first().screenshot({ path: out });
else await page.screenshot({ path: out, fullPage: !!opt.full });
await browser.close();
