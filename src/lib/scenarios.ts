import { WINDOW, type Scenario } from '../content/scenarios';

/** Returns human-readable problems; an empty list means the data is safe to ship. */
export function validateScenarios(all: Record<string, Scenario>): string[] {
  const problems: string[] = [];
  for (const [id, s] of Object.entries(all)) {
    for (const mode of ['early', 'late'] as const) {
      const events = s[mode];
      if (events.length === 0) problems.push(`${id}.${mode} has no events`);
      events.forEach((e, i) => {
        if (e.year < WINDOW.start || e.year > WINDOW.end) problems.push(`${id}.${mode}[${i}] year ${e.year} is outside ${WINDOW.start}–${WINDOW.end}`);
        if (!e.label.trim()) problems.push(`${id}.${mode}[${i}] has an empty label`);
      });
      const tx = events.filter((e) => e.transaction).length;
      if (tx !== 1) problems.push(`${id}.${mode} must have exactly one transaction (has ${tx})`);
    }
    if (!(s.keptEarly > 0 && s.keptLate > 0)) problems.push(`${id} kept amounts must be positive`);
    if (s.keptLate > s.keptEarly) problems.push(`${id} keptLate (${s.keptLate}) exceeds keptEarly (${s.keptEarly})`);
  }
  return problems;
}

/** Position of a year along the track, as a percentage with padding at both ends. */
export function yearToPercent(year: number, pad = 6): number {
  const span = WINDOW.end - WINDOW.start;
  return pad + ((year - WINDOW.start) / span) * (100 - pad * 2);
}

export const formatKept = (m: number) => `$${m.toFixed(1)}M`;
