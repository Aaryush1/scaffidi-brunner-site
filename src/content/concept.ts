// "Just tell us": a scripted CONCEPT of an AI front door. No model runs; nothing leaves the browser.
// Replies are about fit and next steps only: never advice, never numbers (a test enforces this).

export type ConceptId = 'sale' | 'real-estate' | 'family' | 'general';
export type Urgency = 'This month' | 'This quarter' | 'This year';

export interface ConceptScenario {
  id: ConceptId;
  /** Word stems that point to this scenario (matched at word starts, case-insensitive). */
  keywords: string[];
  reply: string[];
  brief: {
    who: string;
    situation: string;
    complexity: string[];
    /** Service slugs from content/services.ts */
    services: string[];
    firstCallQuestions: string[];
    urgency: Urgency;
  };
}

export const examplePrompts = [
  'I’m selling my HVAC company next year. My brother co-owns it.',
  'We’re buying a duplex and I have no idea how we should hold it.',
  'I want to set up a trust for my kids before I retire.',
  'My CPA just files my return. I think I need more than that.',
];

export const conceptScenarios: ConceptScenario[] = [
  {
    id: 'sale',
    keywords: ['sell', 'sale', 'exit', 'buyer', 'company', 'co-own', 'coown', 'succession', 'merger', 'buyout'],
    reply: [
      'Thank you for reaching out. A business sale is exactly the kind of decision we like to be part of early, while there is still room to shape it.',
      'Your first conversation would be with a partner. We’d want to understand the business, how ownership is held today, and when you’re thinking about a sale, so structure and timing can be considered before a buyer is at the table.',
      'If they’re handy, recent business and personal returns and any ownership or operating agreements help us make the most of that first call.',
      'We’ll be in touch shortly.',
    ],
    brief: {
      who: 'Business owner, closely held company',
      situation: 'Considering the sale of a business.',
      complexity: ['Sale timing', 'Entity structure'],
      services: ['transactions-technical-projects', 'strategic-tax-planning', 'advisory'],
      firstCallQuestions: [
        'How is ownership held today, and is there a buy-sell agreement?',
        'Is a buyer already in view, or is this exploratory?',
        'What does each owner want to walk away with?',
        'Who else is advising: attorney, wealth advisor, banker?',
      ],
      urgency: 'This year',
    },
  },
  {
    id: 'real-estate',
    keywords: ['property', 'properties', 'rental', 'duplex', 'real estate', 'building', 'landlord', 'apartment', '1031', 'tenant', 'cost seg'],
    reply: [
      'Thank you for reaching out. The best time to plan around a property is before the closing table, while entity, basis and depreciation choices are still open.',
      'Your first conversation would be with a partner, who’ll want to understand the property, how you plan to hold it, and how it fits with the rest of what you own.',
      'Having the purchase details and your most recent returns nearby will help us make the most of that call.',
      'We’ll be in touch shortly.',
    ],
    brief: {
      who: 'Real estate investor',
      situation: 'Acquiring or restructuring property holdings.',
      complexity: ['Entity selection', 'Basis & depreciation'],
      services: ['strategic-tax-planning', 'transactions-technical-projects', 'tax-compliance-execution'],
      firstCallQuestions: [
        'Is this a new acquisition or part of an existing portfolio?',
        'How are current properties held: personally, LLCs, partnerships?',
        'Is a cost segregation study worth exploring?',
        'What is the long-term plan: hold, refinance, or exchange?',
      ],
      urgency: 'This quarter',
    },
  },
  {
    id: 'family',
    // No bare 'estate' (it collides with "real estate") and no 'will' (too common a word).
    keywords: ['trust', 'kids', 'children', 'estate plan', 'my estate', 'the estate', 'estate tax', 'inherit', 'heir', 'grandchild', 'gift', 'legacy', 'next generation'],
    reply: [
      'Thank you for reaching out. Planning how wealth moves to the next generation works best over years, and alongside your estate attorney rather than apart from them.',
      'Your first conversation would be with a partner, who’ll want to understand what you’ve built, what you’d like it to do for your family, and who else is already advising you.',
      'If you have an existing estate plan or trust documents, bringing them helps us see the full picture.',
      'We’ll be in touch shortly.',
    ],
    brief: {
      who: 'Family planning a wealth transfer',
      situation: 'Thinking about passing wealth to children or heirs.',
      complexity: ['Multigenerational', 'Advisor coordination'],
      services: ['estate-wealth-transfer', 'advisory', 'tax-compliance-execution'],
      firstCallQuestions: [
        'Is there an existing estate plan or trust in place?',
        'Who is the estate attorney, and when was the plan last reviewed?',
        'Are there business interests or real estate in the estate?',
        'What matters most: control, simplicity, or tax efficiency?',
      ],
      urgency: 'This year',
    },
  },
  {
    id: 'general',
    keywords: [],
    reply: [
      'Thank you for reaching out. Every relationship we have started with a conversation, not a form.',
      'Your first call would be with a partner, who’ll take the time to understand your financial landscape and the decisions ahead, not simply the numbers in front of us.',
      'If it’s easy, share a little about your business, investments, or family situation and we’ll come prepared.',
      'We’ll be in touch shortly.',
    ],
    brief: {
      who: 'New inquiry',
      situation: 'Open-ended inquiry; a short discovery call will clarify fit.',
      complexity: ['To be discovered'],
      services: ['strategic-tax-planning', 'advisory'],
      firstCallQuestions: [
        'What prompted you to reach out now?',
        'What does your financial picture include: a business, real estate, trusts?',
        'Who prepares your return today, and what is missing?',
        'What would a great outcome look like a year from now?',
      ],
      urgency: 'This quarter',
    },
  },
];

/** Extra complexity signals spotted in the visitor's own words. */
export const signalRules: { label: string; pattern: RegExp }[] = [
  { label: 'Shared ownership', pattern: /\b(co-?own|partner|brother|sister|cousin|shareholder)/i },
  { label: 'Near-term timing', pattern: /\b(next year|this year|soon|months?|asap|by (the )?end of)/i },
  { label: 'Family transfer', pattern: /\b(kids|children|daughter|son|heirs?|grandchild|trust)/i },
  { label: 'Multistate', pattern: /\b(states|multi-?state|moving to|relocat)/i },
  { label: 'Real estate holdings', pattern: /\b(rental|propert|duplex|building|land)\b/i },
  { label: 'Retirement in view', pattern: /\bretir/i },
];
