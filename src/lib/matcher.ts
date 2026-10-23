import { conceptScenarios, signalRules, type ConceptScenario, type Urgency } from '../content/concept';

const score = (text: string, s: ConceptScenario) =>
  s.keywords.filter((k) => new RegExp(`(^|[^a-z])${k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'i').test(text)).length;

/** The scripted scenario closest to what the visitor wrote; ties and no match fall back to `general`. */
export function matchScenario(text: string): ConceptScenario {
  const general = conceptScenarios.find((s) => s.id === 'general')!;
  const ranked = conceptScenarios
    .filter((s) => s.id !== 'general')
    .map((s) => ({ s, n: score(text, s) }))
    .sort((a, b) => b.n - a.n);
  if (!ranked.length || ranked[0].n === 0 || ranked[0].n === ranked[1]?.n) return general;
  return ranked[0].s;
}

export function detectSignals(text: string): string[] {
  return signalRules.filter((r) => r.pattern.test(text)).map((r) => r.label);
}

export interface Brief extends Omit<ConceptScenario['brief'], 'urgency'> {
  scenario: ConceptScenario['id'];
  urgency: Urgency;
  inTheirWords: string;
}

/** What the partner sees before reading the message. */
export function buildBrief(text: string): Brief {
  const s = matchScenario(text);
  const signals = detectSignals(text);
  const urgency: Urgency = signals.includes('Near-term timing') && s.brief.urgency === 'This year' ? 'This quarter' : s.brief.urgency;
  const complexity = [...new Set([...signals, ...s.brief.complexity.filter((c) => c !== 'To be discovered' || signals.length === 0)])];
  return { ...s.brief, scenario: s.id, complexity, urgency, inTheirWords: text.trim() };
}
