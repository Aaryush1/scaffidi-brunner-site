# Scaffidi Brunner website

The website for Scaffidi Brunner CPAs & Advisors (Brookfield, WI): an Astro 7 static site, deployable to Vercel. The people asking you for changes are usually the firm's own team, not developers. Make the change they describe, explain it in plain English, and show them how to see it (`npm run dev`).

## At the start of every session

Read `KNOWN_ISSUES.md`. If it has unchecked items, briefly tell the user how many are open and which ones touch what they're about to work on, and offer to fix the relevant ones. Check items off as they're fixed. If they're editing content, mention any `TODO(firm)` items listed in the README.

## Where things live

| To change… | Edit |
| --- | --- |
| Address, phone, email, hours, social links, iubenda links | `src/config/site.ts` |
| Hero, approach steps, founders' note, differentiators, audiences ("Who we serve"), testimonials, team and bios, closing call to action | `src/content/firm.ts` |
| Services: all six service pages and the services list | `src/content/services.ts` (`listed: false` keeps a page out of menus and lists, like Real Estate Tax Advisory) |
| Which testimonial appears on which service page | `services: [...]` on each testimonial in `src/content/firm.ts` |
| "See it years ahead" timeline scenarios and their illustrative figures | `src/content/scenarios.ts` |
| Main and footer navigation | `src/content/nav.ts`, `src/components/Footer.astro` |
| Colors, fonts, spacing tokens (light and dark) | `src/styles/tokens.css` |
| Team headshots | add `public/team/first-last.jpg`, then set `photo: '/team/first-last.jpg'` on that person in `firm.ts` |
| A new page | add `src/pages/<name>.astro` using `Base` and `PageHero` (copy `careers.astro`), add it to `tests/e2e/routes.ts` and, if needed, `src/content/nav.ts` |
| Legal pages | privacy, cookie and terms text comes from the firm's iubenda account; the pages only embed it (`src/components/PolicyPage.astro`) |

Key components: `ServiceIndex` (service rows), `Timeline`, `AudiencePicker` ("Which one are you?", which highlights anything with `data-audiences`), `AdvisorWeb`, `People`, `Testimonials`, `ContactForm`, `Consent`, `PageHero`, `Signature`.

## Rules for changes

- **Keep the firm's wording.** Copy comes from the firm. Don't rewrite it unless asked, and never invent facts about the firm or its people (credentials, clients, results).
- **The timeline figures are illustrative.** Never present them as real, and keep the "Illustrative only. Not tax advice." label.
- **Accessibility is a requirement (WCAG 2.2 AA).** Every page is checked with axe in light and dark themes. Use the color tokens; on light backgrounds use `--accent-text`, not `--gold`, for readable text.
- **Both themes matter.** Check new UI in light and dark (the toggle is in the header).
- **Gift-only content stays out of production.** The personal note (`/note/`), the AI concept (`/concept/`) and the preview banner exist only when `GIFT=1` (files in `src/gift/`, flags in `src/config/site.ts`). `npm run check:flags` must keep passing. To remove the gift pieces for good, delete `src/gift/` and their lines in `astro.config.mjs`.
- **Contact form:** without `PUBLIC_FORM_ENDPOINT` it opens a prefilled email; with it, it POSTs JSON to that endpoint (see the README).

## Commands

```bash
npm run dev            # local preview at http://localhost:4321
npm run build          # production build → dist/
npm run build:gift     # gift build (note, concept, preview banner) → dist-gift/
npm test               # unit tests
npx playwright install chromium && npm run build && npm run build:gift && npm run test:e2e   # end-to-end + accessibility, both builds
npm run check:flags    # production build has no gift-only content
npm run check:live     # every page in the current live site's sitemap exists in dist/ (run before switching the domain)
```

Before deploying, run `npm test`, the end-to-end suite and `check:flags`. Vercel redeploys automatically on push.
