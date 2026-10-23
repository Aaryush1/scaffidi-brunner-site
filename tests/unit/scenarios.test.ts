import { describe, expect, it } from 'vitest';
import { scenarios, WINDOW } from '../../src/content/scenarios';
import { validateScenarios } from '../../src/lib/scenarios';

describe('timeline scenarios', () => {
  it('shipped data is valid', () => {
    expect(validateScenarios(scenarios)).toEqual([]);
  });

  it('covers all three decisions', () => {
    expect(Object.keys(scenarios).sort()).toEqual(['heirs', 'real-estate', 'sale']);
  });

  it('flags events outside the window', () => {
    const bad = structuredClone(scenarios);
    bad.sale.early[0].year = WINDOW.end + 1;
    expect(validateScenarios(bad).join()).toMatch(/sale\.early.*outside/);
  });

  it('flags planning-late outcomes that beat planning-early', () => {
    const bad = structuredClone(scenarios);
    bad.heirs.keptLate = bad.heirs.keptEarly + 1;
    expect(validateScenarios(bad).join()).toMatch(/heirs.*keptLate/);
  });

  it('requires exactly one transaction per mode', () => {
    const bad = structuredClone(scenarios);
    bad['real-estate'].late = bad['real-estate'].late.map((e) => ({ ...e, transaction: false }));
    expect(validateScenarios(bad).join()).toMatch(/real-estate\.late.*one transaction/);
  });
});
