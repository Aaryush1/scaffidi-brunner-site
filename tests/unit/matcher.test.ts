import { describe, expect, it } from 'vitest';
import { conceptScenarios, examplePrompts } from '../../src/content/concept';
import { buildBrief, detectSignals, matchScenario } from '../../src/lib/matcher';

describe('matchScenario', () => {
  it.each([
    ["I'm selling my HVAC company next year and my brother co-owns it", 'sale'],
    ['We are buying a duplex', 'real-estate'],
    ['I want a trust for my kids', 'family'],
    ['Thinking about our rental properties and a 1031', 'real-estate'],
    ['hello', 'general'],
    ['We are buying real estate', 'real-estate'],
    ['I own some real estate', 'real-estate'],
    ['We will buy a rental', 'real-estate'],
    ['Updating my estate plan', 'family'],
  ])('%s → %s', (text, id) => {
    expect(matchScenario(text).id).toBe(id);
  });

  it('falls back to general on a tie', () => {
    expect(matchScenario('selling a rental property').id).toBe('real-estate');
    expect(matchScenario('sell the building and set up a trust').id).toBe('general');
  });

  it('every example prompt lands on a specific scenario', () => {
    const ids = examplePrompts.map((p) => matchScenario(p).id);
    expect(new Set(ids).size).toBe(examplePrompts.length);
  });
});

describe('detectSignals', () => {
  it('picks up shared ownership, timing and family', () => {
    expect(detectSignals('my brother co-owns it, selling next year, then a trust for the kids')).toEqual(
      expect.arrayContaining(['Shared ownership', 'Near-term timing', 'Family transfer']),
    );
  });
  it('returns nothing for plain text', () => {
    expect(detectSignals('hello there')).toEqual([]);
  });
});

describe('buildBrief', () => {
  it('quotes the visitor verbatim and raises urgency for near-term timing', () => {
    const b = buildBrief("Selling my company next year");
    expect(b.inTheirWords).toBe('Selling my company next year');
    expect(b.urgency).toBe('This quarter');
    expect(b.complexity).toContain('Near-term timing');
  });
});

describe('concept copy', () => {
  it('visitor replies never contain numbers or dollar amounts', () => {
    for (const s of conceptScenarios) for (const line of s.reply) expect(line, s.id).not.toMatch(/[0-9$%]/);
  });
  it('every scenario has a full brief', () => {
    for (const s of conceptScenarios) {
      expect(s.brief.services.length, s.id).toBeGreaterThan(0);
      expect(s.brief.firstCallQuestions.length, s.id).toBeGreaterThanOrEqual(3);
    }
  });
});
