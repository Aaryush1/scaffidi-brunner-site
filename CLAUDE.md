# Scaffidi Brunner website

Astro 7 static site for Scaffidi Brunner CPAs & Advisors. Start with README.md for how to preview, deploy and edit.

## At the start of every session

Read `KNOWN_ISSUES.md`. If it has unchecked items, tell the user briefly before starting their task: how many are open and which ones touch the files they're about to work on. Offer to fix the ones that are relevant, and check items off in `KNOWN_ISSUES.md` as they're fixed. Also mention any `TODO(firm)` placeholders the README lists if the user is editing content.

## Working on this site

- All copy lives in `src/content/` and `src/config/site.ts`. Keep the firm's wording; ask before rewriting it.
- Never present illustrative figures (`src/content/scenarios.ts`) as real, and keep the "Illustrative only. Not tax advice." label.
- The personal note and AI concept are gift-only (`GIFT=1`, `src/gift/`). `npm run check:flags` must keep passing.
- Before switching the domain, run `npm run build && npm run check:live` to catch pages added to the old site since.
- Run `npm test` and the end-to-end suite (see README) before deploying; every page is checked with axe in both themes.
