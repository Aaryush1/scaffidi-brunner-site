// Site-wide settings. Edit contact details here; every page reads from this file.

/**
 * Gift flags. A normal `npm run build` is the firm's production site with both off.
 * `npm run build:gift` (GIFT=1) turns on the personal note and the AI concept.
 * To ship either one on the live site, replace the expression with `true`.
 */
export function readFlags(env: Record<string, string | undefined> = process.env) {
  const gift = env.GIFT === '1';
  return { showPersonalNote: gift, showAIConcept: gift };
}

const flags = readFlags();

export const site = {
  name: 'Scaffidi Brunner',
  tagline: 'Strategic Tax. Lasting Value.',
  url: 'https://scaffidibrunner.com',
  ...flags,
  contact: {
    address: '20300 Water Tower Blvd, Suite 165, Brookfield, WI 53045',
    addressLines: ['20300 Water Tower Blvd', 'Suite 165', 'Brookfield, WI 53045'],
    mapsUrl: 'https://maps.app.goo.gl/bncDvLSmZvZLunt48',
    email: 'info@scaffidibrunner.com',
    phone: '(262) 283-5091',
    phoneHref: 'tel:2622835091',
    hours: 'Mon – Fri | 9 AM – 4 PM',
  },
  social: {
    facebook: 'https://www.facebook.com/scaffidibrunner',
    x: 'https://x.com/ScaffidiBrunner',
    instagram: 'https://www.instagram.com/scaffidibrunner/',
    linkedin: 'https://www.linkedin.com/company/scaffidi-brunner-cpas/',
  },
  /**
   * The firm's existing iubenda account (privacy policy + cookie consent). In production the
   * iubenda widget handles consent, exactly as on the current site. Set to '' to use the
   * built-in consent banner instead (the gift preview does this, since iubenda only runs on
   * the registered domain).
   */
  iubenda: {
    widgetSrc: flags.showPersonalNote ? '' : 'https://embeds.iubenda.com/widgets/7e8de080-2e28-4730-a292-39ac1bdb550f.js',
    privacyPolicyUrl: 'https://www.iubenda.com/privacy-policy/79268147',
    cookiePolicyUrl: 'https://www.iubenda.com/privacy-policy/79268147/cookie-policy',
    termsUrl: 'https://www.iubenda.com/terms-and-conditions/79268147',
  },
} as const;
