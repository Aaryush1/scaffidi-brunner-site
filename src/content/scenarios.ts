// "See it years ahead": ILLUSTRATIVE figures only, not tax advice and not client data.
// Edit, soften or zero these out freely; `npm test` checks the shape stays valid.
import type { ScenarioId } from './types';

export interface TimelineEvent {
  /** Year on the timeline; decimals place events between years. */
  year: number;
  label: string;
  /** The moment money actually moves (sale, purchase, transfer). */
  transaction?: boolean;
}

export interface Scenario {
  label: string;
  /** One sentence shown under the timeline for each mode. */
  earlyNote: string;
  lateNote: string;
  early: TimelineEvent[];
  late: TimelineEvent[];
  /** Illustrative after-tax amount kept, in millions of dollars. */
  keptEarly: number;
  keptLate: number;
}

export const WINDOW = { start: 2026, end: 2030 } as const;

export const scenarios: Record<ScenarioId, Scenario> = {
  sale: {
    label: 'Sell the business',
    earlyNote: 'Structure, ownership and timing are shaped years before the buyer arrives.',
    lateNote: 'By the time the return is prepared, the structure of the sale is already fixed.',
    early: [
      { year: 2026, label: 'Model exit scenarios' },
      { year: 2026.9, label: 'Restructure the entity' },
      { year: 2027.8, label: 'Shift shares to family trust' },
      { year: 2029, label: 'Sale closes', transaction: true },
    ],
    late: [
      { year: 2029, label: 'Sale closes', transaction: true },
      { year: 2030, label: 'Planning starts at filing' },
    ],
    keptEarly: 8.4,
    keptLate: 6.9,
  },
  'real-estate': {
    label: 'Buy a property',
    earlyNote: 'Entity, basis and depreciation are decided before the closing table, not after.',
    lateNote: 'The deed is recorded first and the tax questions get asked a year later.',
    early: [
      { year: 2026, label: 'Entity & basis plan' },
      { year: 2026.8, label: 'Acquisition closes', transaction: true },
      { year: 2027.5, label: 'Cost segregation study' },
      { year: 2029.6, label: 'Hold, refinance or exchange' },
    ],
    late: [
      { year: 2026.8, label: 'Acquisition closes', transaction: true },
      { year: 2027.8, label: 'Planning starts at filing' },
    ],
    keptEarly: 2.6,
    keptLate: 2.1,
  },
  heirs: {
    label: 'Pass wealth to the kids',
    earlyNote: 'Gifting and trust structures do their work over years, alongside the estate attorney.',
    lateNote: 'Without a plan in place, the transfer happens on the calendar’s terms.',
    early: [
      { year: 2026, label: 'Map the estate' },
      { year: 2026.9, label: 'Annual gifting begins' },
      { year: 2027.9, label: 'Trust funded' },
      { year: 2029, label: 'Wealth transfers', transaction: true },
    ],
    late: [
      { year: 2029, label: 'Wealth transfers', transaction: true },
      { year: 2030, label: 'Planning starts at filing' },
    ],
    keptEarly: 12.1,
    keptLate: 9.8,
  },
};
