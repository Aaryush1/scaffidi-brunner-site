# Known issues

Small, known items from the final review (October 2026). None of them block going live or affect what a visitor sees first. Fix them whenever it's convenient; check an item off (or delete it) once it's done.

## Check on the real domain after launch

- [ ] **"Your Privacy Choices" in the footer** (`src/components/Footer.astro`) relies on the firm's iubenda widget, which binds to the `iubenda-cs-preferences-link` class. The current site's widget may be set up for US privacy only (`iubenda-cs-uspr-link`). After switching the domain, click it and confirm the iubenda preferences open. If they don't, change the class or remove the button; the "Do Not Sell or Share" link next to it already covers the US opt-out. Before iubenda loads, or with an ad blocker, the button does nothing.

## Accessibility polish

- [ ] **Advisor web announces on hover** (`src/components/AdvisorWeb.astro`). The panel is an `aria-live` region and updates on `mouseenter`, which is noisy for screen-reader users who also use a mouse. Keyboard focus alone doesn't select a node until Enter is pressed. Suggested: update the panel on `focus` and `click`, not `mouseenter`.
- [ ] **Audience status is re-announced on every page load** (`src/components/AudiencePicker.astro`). When a visitor's choice is restored, the `role="status"` line is filled in on load and gets read out again. Suggested: set the text without announcing on restore, and announce only on a change.
- [ ] **Reduced motion still staggers the timeline** (`src/components/Timeline.astro`, `src/styles/global.css`). With reduced motion on, animations take 0s, but `animation-delay` still staggers events by up to about 0.2s. Suggested: add `animation-delay: 0s !important;` to the reduced-motion block in `global.css`.
- [ ] **Built-in consent banner (gift preview only)** (`src/components/Consent.astro`). After a choice, focus isn't returned to the button that opened it. When browser storage is blocked, the banner reappears on every page. Production uses iubenda instead, so this only affects the preview build.

## Copy and content

- [ ] **Advisor web wording** (`src/components/AdvisorWeb.astro`). One node is labeled "Business attorneys", and the "Investment professionals" and "Trustees" panels reuse service descriptions rather than describing how the firm works alongside them. Worth a pass in the firm's own words.
- [ ] **Phone error message** (`src/lib/contact.ts`). It says "digits only", but the check also allows `+ ( ) . -` and spaces. Suggested: "Please enter a valid phone number."

## Edge cases

- [ ] **Very long messages in the email fallback** (`src/components/ContactForm.astro`). Without a form service configured, the form opens a prefilled email. Messages over about 2,000 characters can be cut off by some Windows and Outlook mail handlers. This is moot once `PUBLIC_FORM_ENDPOINT` is set (see README); otherwise, cap the body length or tell the visitor to email directly.
- [ ] **Timeline label clips by 1px at exactly 721px wide** (`src/components/Timeline.astro`). "Planning starts at filing" in "Plan at filing" mode touches the panel border at that one width. It's cosmetic only.
