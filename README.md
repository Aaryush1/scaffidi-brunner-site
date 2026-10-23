# Scaffidi Brunner: website

A rebuilt scaffidibrunner.com, given to the firm as a gift. It keeps the same firm, the same words, and the same navy and gold, with a lot more under the hood:

- **See it years ahead:** an interactive timeline comparing the same decision planned early versus planned at filing (illustrative figures, clearly labeled).
- **Which one are you?:** visitors pick business owner, real estate investor, family, or family office, and the site re-centers on them.
- **The advisor web:** how the firm works alongside attorneys, wealth advisors and trustees, made visible.
- **People up front,** testimonials pulled forward, and a homepage that tells the whole story.
- **Light and dark mode,** fully accessible (WCAG 2.2 AA, zero automated violations), and fast (Lighthouse mobile: Performance ~97, Accessibility 100, Best Practices 100, SEO 100).

Everything here belongs to Scaffidi Brunner. Use it, change it, or ignore it. No strings.

---

## See it on your computer (5 minutes)

You need [Node.js](https://nodejs.org) 22 or 24.

```bash
npm install
npm run preview:gift
```

Open the address it prints (usually http://localhost:4321). `preview:gift` includes Aaryush's note and the AI concept page. `npm run build && npm run preview` shows exactly what would go live.

## Put it live (about an hour, most of it waiting on DNS)

1. **Vercel:** sign in at [vercel.com](https://vercel.com) → *Add New → Project* → import this GitHub repo. Vercel detects Astro; keep the defaults and click *Deploy*. You get a preview URL in a minute or two. Click through it.
   - Plan: Vercel's free Hobby plan is for personal, non-commercial use, so a firm's site belongs on **Vercel Pro** (check current pricing). It's a static site, so it also runs on any static host, such as Netlify or Cloudflare Pages, if you prefer one of their plans.
2. **Domain:** in the Vercel project, *Settings → Domains* → add `scaffidibrunner.com` and `www.scaffidibrunner.com`. Vercel shows the DNS records to set at your domain registrar. Once they're saved, the switch usually takes minutes to an hour. The old WordPress site stays untouched until then.
3. **Contact form (15 minutes):** the form works out of the box by opening the visitor's email app. To receive messages directly instead:
   - Create a free form at [formspree.io](https://formspree.io) (or any service that accepts a JSON POST) and copy its endpoint URL.
   - In Vercel: *Settings → Environment Variables* → add `PUBLIC_FORM_ENDPOINT` = that URL → redeploy.
4. **Privacy and cookies:** nothing to do. The site uses your existing iubenda account (the same privacy policy, cookie policy, terms, consent banner and "Do Not Sell or Share" opt-out as today), and it works because the domain is the same.
5. **Right before switching the domain,** run `npm run build && npm run check:live`. It reads the current site's sitemap and lists any page the new site doesn't have yet, in case someone has added a page to WordPress since. Add the page, or a redirect in `vercel.json`, before switching.

Every page in the current site's sitemap (18 pages, as of October 2026) exists here at the same URL, so existing links and search results keep working. Anything else gets a branded "Page not found" page.

## The two switches

In [`src/config/site.ts`](src/config/site.ts), the personal note and the AI concept page are **off** in the normal build and on only in `npm run build:gift`. They aren't hidden: the production build doesn't contain them at all, and `npm run check:flags` proves it.

To show the AI concept on the live site, change `showAIConcept: gift` to `showAIConcept: true` in `readFlags`, and in `astro.config.mjs` inject the `/concept` route unconditionally. To remove either one for good, delete `src/gift/` and the matching lines.

## Editing the content

Every word lives in plain files. No CMS, no database.

| What | File |
| --- | --- |
| Address, phone, email, hours, social links | `src/config/site.ts` |
| Services (all five pages) | `src/content/services.ts` |
| Hero, approach, founders' note, audiences, testimonials, team | `src/content/firm.ts` |
| Timeline scenarios and their illustrative figures | `src/content/scenarios.ts` |
| Navigation | `src/content/nav.ts` |
| Colors and fonts | `src/styles/tokens.css` |

After editing, run `npm test` (it checks, for example, that timeline data is still valid) and push. Vercel redeploys automatically.

### Still to fill in (`TODO(firm)`)

- [ ] Bios for Nick and Austin: `bio` in `src/content/firm.ts`. Mike's, Eric's and Franklin's are carried over from the current site; empty bios are simply not shown.
- [ ] Headshots: add `public/team/first-last.jpg` and set `photo: '/team/first-last.jpg'`. Monograms show until then.
- [ ] Review the Accessibility Statement (`src/pages/accessibility-statement.astro`) and add open roles to Careers when you have them.
- [ ] Review the timeline figures in `src/content/scenarios.ts`. They're invented and labeled "Illustrative only. Not tax advice." Change or soften them as you see fit.

## Prefer to have AI do it?

Open this folder in [Claude Code](https://claude.com/claude-code) and paste:

> This is our firm's website (Astro, deploys to Vercel). Walk me through deploying it to Vercel from this GitHub repo and pointing scaffidibrunner.com at it. Then set up the contact form: create the PUBLIC_FORM_ENDPOINT environment variable with a Formspree endpoint I'll give you. Don't change any content without asking me first.

## For developers

```bash
npm run dev          # local dev server
npm run build        # production build → dist/
npm run build:gift   # gift build (note + concept) → dist-gift/
npm test             # unit tests (Vitest)
npx playwright install chromium && npm run build && npm run build:gift && npm run test:e2e   # end-to-end + accessibility (axe) on both builds
npm run check:flags  # proves the production build has no gift-only content
npm run check:live   # compares the build against the current live site's sitemap
```

Astro 7, TypeScript, no UI framework: interactive pieces are small vanilla TypeScript scripts inside `.astro` components. Fonts are self-hosted, and there are no analytics or third-party requests other than the firm's iubenda consent widget.

## License

The code is MIT-licensed: use, change and own it however you like, no permission needed. The name, logos, photos and written copy belong to Scaffidi Brunner.

## Known issues

A short list of small, non-blocking items lives in [KNOWN_ISSUES.md](KNOWN_ISSUES.md). If you open this repo in Claude Code, it will bring them up automatically.
