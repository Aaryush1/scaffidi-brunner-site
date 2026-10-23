// Run right before switching the domain: lists every page in the CURRENT live site's sitemap that this
// build doesn't have, so no existing link or search result lands on a 404.
// Usage: npm run build && npm run check:live   [optional: node scripts/check-live-urls.mjs <site> <dir>]
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const site = process.argv[2] || 'https://scaffidibrunner.com';
const dir = process.argv[3] || 'dist';
const locs = async (url) => [...(await (await fetch(url)).text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

const index = await locs(`${site}/wp-sitemap.xml`).catch(() => []);
const urls = index.length ? (await Promise.all(index.map(locs))).flat() : await locs(`${site}/sitemap.xml`);
if (!urls.length) {
  console.error(`✗ couldn't read a sitemap from ${site}`);
  process.exit(2);
}

const missing = urls
  .map((u) => new URL(u).pathname)
  .filter((p) => !existsSync(join(dir, p, 'index.html')) && !existsSync(join(dir, p)));

if (missing.length) {
  console.error(`✗ ${missing.length} live page(s) missing from ${dir}/:\n  ${missing.join('\n  ')}\nAdd the page, or a redirect in vercel.json.`);
  process.exit(1);
}
console.log(`✓ all ${urls.length} pages in ${site}'s sitemap exist in ${dir}/`);
