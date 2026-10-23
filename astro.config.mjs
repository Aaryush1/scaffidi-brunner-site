import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Gift-only pages (personal note, AI concept) live in src/gift/ and are added to the
// build only when GIFT=1. A normal build doesn't contain them at all.
const gift = process.env.GIFT === '1';
const giftPages = {
  name: 'gift-pages',
  hooks: {
    'astro:config:setup': ({ injectRoute }) => {
      if (!gift) return;
      injectRoute({ pattern: '/note', entrypoint: './src/gift/note.astro' });
      injectRoute({ pattern: '/concept', entrypoint: './src/gift/concept.astro' });
    },
  },
};

export default defineConfig({
  site: 'https://scaffidibrunner.com',
  trailingSlash: 'always',
  // Inline CSS so the first paint never waits on a stylesheet request.
  build: { inlineStylesheets: 'always' },
  integrations: [giftPages, sitemap({ filter: (page) => !/\/(note|concept)\//.test(page) })],
});
