import { describe, expect, it } from 'vitest';
import { mailtoHref, validateContact, type ContactFields } from '../../src/lib/contact';

const valid: ContactFields = { first: 'Ada', last: 'Lovelace', phone: '', email: 'ada@example.com', message: 'Hello', consent: true };

describe('validateContact', () => {
  it('accepts a complete form', () => {
    expect(validateContact(valid)).toEqual({});
  });
  it('requires a first name (whitespace does not count)', () => {
    expect(validateContact({ ...valid, first: '   ' })).toHaveProperty('first');
  });
  it('rejects malformed emails', () => {
    for (const email of ['', 'a@b', 'ada.example.com', 'a b@c.com', 'ada@example.']) {
      expect(validateContact({ ...valid, email }), email).toHaveProperty('email');
    }
  });
  it('requires consent', () => {
    expect(validateContact({ ...valid, consent: false })).toHaveProperty('consent');
  });
  it('reports every problem at once', () => {
    expect(Object.keys(validateContact({ ...valid, first: '', email: 'x', consent: false })).sort()).toEqual(['consent', 'email', 'first']);
  });
  it('rejects phones with letters but allows common formats', () => {
    expect(validateContact({ ...valid, phone: '(262) 283-5091' })).toEqual({});
    expect(validateContact({ ...valid, phone: 'call me' })).toHaveProperty('phone');
  });
});

describe('mailtoHref', () => {
  it('encodes newlines and ampersands', () => {
    const href = mailtoHref({ ...valid, message: 'Line one\nTax & estate' }, 'info@scaffidibrunner.com');
    expect(href.startsWith('mailto:info@scaffidibrunner.com?subject=')).toBe(true);
    expect(href).toContain('%0D%0A');
    expect(href).toContain('Tax%20%26%20estate');
    expect(href).not.toMatch(/[\n&](?!body=)/);
  });
});
