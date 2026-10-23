export interface ContactFields {
  first: string;
  last: string;
  phone: string;
  email: string;
  message: string;
  consent: boolean;
}

export type ContactErrors = Partial<Record<keyof ContactFields, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@.]{2,}$/;
const PHONE = /^[0-9+().\-\s]{7,}$/;

/** Field → message for every problem; an empty object means the form can be sent. */
export function validateContact(f: ContactFields): ContactErrors {
  const e: ContactErrors = {};
  if (!f.first.trim()) e.first = 'Please enter your first name.';
  if (!EMAIL.test(f.email.trim())) e.email = 'Please enter a valid email address, like name@example.com.';
  if (f.phone.trim() && !PHONE.test(f.phone.trim())) e.phone = 'Please enter a phone number using digits only.';
  if (!f.consent) e.consent = 'Please agree to the Privacy Policy so we can contact you.';
  return e;
}

/** A prefilled email to the firm, used when no form service is configured. */
export function mailtoHref(f: ContactFields, to: string): string {
  const name = [f.first, f.last].map((s) => s.trim()).filter(Boolean).join(' ');
  const body = [
    `Name: ${name}`,
    `Email: ${f.email.trim()}`,
    ...(f.phone.trim() ? [`Phone: ${f.phone.trim()}`] : []),
    '',
    f.message.trim(),
  ].join('\r\n');
  return `mailto:${to}?subject=${encodeURIComponent(`Consultation request from ${name}`)}&body=${encodeURIComponent(body)}`;
}
