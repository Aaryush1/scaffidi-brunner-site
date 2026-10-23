import { describe, expect, it } from 'vitest';
import { readFlags } from '../../src/config/site';

describe('gift flags', () => {
  it('are off for a normal build', () => {
    expect(readFlags({})).toEqual({ showPersonalNote: false, showAIConcept: false });
  });
  it('are on when GIFT=1', () => {
    expect(readFlags({ GIFT: '1' })).toEqual({ showPersonalNote: true, showAIConcept: true });
  });
  it('ignore other values', () => {
    expect(readFlags({ GIFT: 'true' }).showPersonalNote).toBe(false);
  });
});
