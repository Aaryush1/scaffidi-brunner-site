import { describe, expect, it } from 'vitest';
import { team } from '../../src/content/firm';

describe('team', () => {
  it('carries the bios already published on the live site', () => {
    const bio = (n: string) => { const p = team.find((t) => t.name === n)!; return `${p.bio} ${p.personal ?? ''}`; };
    expect(bio('Michael Scaffidi')).toContain('led Uline’s tax department');
    expect(bio('Eric Brunner')).toContain('Tax Director at Phoenix Investors');
    expect(bio('Franklin Wistl')).toContain('sod farm in New Berlin');
  });
});
