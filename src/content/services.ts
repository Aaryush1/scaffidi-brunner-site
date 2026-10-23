// Copy is word for word from scaffidibrunner.com. Edit freely; every page reads from here.
import type { AudienceId } from './types';

export interface Service {
  slug: string;
  title: string;
  /** Short line from the Services overview. */
  tagline: string;
  /** Overview card body from the Services page. */
  summary: string;
  eyebrow: string;
  heading: string;
  intro: string[];
  pillarsHeading: string;
  pillars: { title: string; body: string }[];
  closingTitle: string;
  closingBody: string;
  image: string;
  audiences: AudienceId[];
  /** false = the page exists but isn't listed in menus and grids (as on the current site). */
  listed?: boolean;
}

export const isListed = (s: Service) => s.listed !== false;

export const services: Service[] = [
  {
    slug: 'tax-compliance-execution',
    title: 'Tax Compliance & Execution',
    tagline: 'Precision where it matters. Strategy behind every return.',
    summary: 'Comprehensive tax compliance and execution for individuals, businesses, trusts, and complex ownership structures, with a deep understanding of strategy behind the numbers.',
    eyebrow: 'Precision where it matters',
    heading: 'Compliance Should Support the Strategy.',
    intro: [
      'A tax return is more than a filing obligation. It is the execution of decisions made throughout the year.',
      'By understanding the entities, investments, ownership structures, and transactions behind the numbers, we help keep compliance accurate, coordinated, and connected to the broader tax strategy.',
    ],
    pillarsHeading: 'Built for More Complex Reporting',
    pillars: [
      { title: 'Business & Partnership Returns', body: 'Tax compliance for partnerships, corporations, and privately held businesses with layered ownership and reporting requirements.' },
      { title: 'Individual Tax Compliance', body: 'Preparation for individuals with business interests, investments, real estate, and other complex financial activity.' },
      { title: 'Trust & Foundation Compliance', body: 'Coordinated tax reporting for trusts, private foundations, and related family structures.' },
      { title: 'Multistate Reporting', body: 'Support for clients whose businesses, investments, or ownership interests extend across state lines.' },
    ],
    closingTitle: 'Precision Matters.',
    closingBody: 'The strongest planning still depends on accurate execution. Our partner-led approach helps ensure the strategy carries through to the return.',
    image: '/media/accounting-reporting.jpg',
    audiences: ['owners', 'real-estate', 'families', 'family-offices'],
  },
  {
    slug: 'strategic-tax-planning',
    title: 'Strategic Tax Planning',
    tagline: 'Plan before the decision becomes a transaction.',
    summary: 'Proactive tax planning designed around your broader financial goals, helping identify opportunities, manage exposure, and make informed decisions well before deadlines arrive.',
    eyebrow: 'Designed around your financial goals',
    heading: 'Tax Planning Should Be Proactive by Design.',
    intro: [
      'Income, ownership, investments, real estate, and business activity rarely exist in isolation.',
      'We look across the full picture to identify opportunities, anticipate tax consequences, and build strategies around what comes next.',
    ],
    pillarsHeading: 'Planning With the Bigger Picture in Mind',
    pillars: [
      { title: 'Multi-Year Tax Planning', body: 'Look beyond the current year to understand how today’s decisions may affect future tax exposure.' },
      { title: 'Entity & Ownership Strategy', body: 'Evaluate business and investment structures with tax efficiency, flexibility, and long-term goals in mind.' },
      { title: 'Real Estate Tax Planning', body: 'Plan around entity structure, basis, depreciation, acquisitions, dispositions, and partnership activity.' },
      { title: 'Tax Projections & Decision Modeling', body: 'Understand potential outcomes before significant financial decisions are made.' },
    ],
    closingTitle: 'Coordinated Advice Matters.',
    closingBody: 'We collaborate with attorneys, wealth advisors, and other professionals so tax strategy remains coordinated with the broader financial picture.',
    image: '/media/tax-planning1.jpg',
    audiences: ['owners', 'real-estate', 'families'],
  },
  {
    slug: 'estate-wealth-transfer',
    title: 'Estate & Wealth Transfer',
    tagline: 'Protect what you’ve built. Plan for what comes next.',
    summary: 'We help families navigate the tax considerations surrounding wealth transfer, estate planning, gifting, charitable giving, and the preservation of assets across generations.',
    eyebrow: 'Preserve What You’ve Built',
    heading: 'A More Connected Approach to Wealth Transfer.',
    intro: [
      'Estate planning often brings several advisors to the table. We work alongside estate attorneys, wealth advisors, trustees, and other professionals to bring tax perspective into the broader plan, evaluate potential structures, and help clients understand the implications of the decisions ahead.',
    ],
    pillarsHeading: 'Planning Across Generations',
    pillars: [
      { title: 'Estate & Gift Tax Planning', body: 'Evaluate tax exposure and strategies for transferring wealth thoughtfully.' },
      { title: 'Trust & Distribution Planning', body: 'Consider the tax implications of trusts, distributions, and multigenerational structures.' },
      { title: 'Charitable Planning', body: 'Coordinate charitable giving with broader tax, estate, and family objectives.' },
      { title: 'Estate, Gift & Trust Compliance', body: 'Support the ongoing reporting required to carry the strategy forward.' },
    ],
    closingTitle: 'The Structure Matters.',
    closingBody: 'How wealth is held, transferred, and reported can have lasting tax and financial implications. Thoughtful planning helps preserve flexibility, support long-term goals, and shape the financial picture for generations.',
    image: '/media/estate-services1.jpg',
    audiences: ['families', 'family-offices'],
  },
  {
    slug: 'advisory',
    title: 'Advisory for Owners & Families',
    tagline: 'Guidance for the decisions behind the numbers.',
    summary: 'We provide thoughtful advisory grounded in your goals, ownership structure, and long-term plans for business owners and families’ complex financial decisions.',
    eyebrow: 'Decisions Behind the Numbers',
    heading: 'Perspective Changes the Conversation.',
    intro: [
      'Our partner-led advisory relationships are built around understanding more than the numbers. We take the time to understand the businesses, investments, entities, and priorities behind them so we can help evaluate decisions before they become transactions.',
    ],
    pillarsHeading: 'Advice Built Around What You’re Building',
    pillars: [
      { title: 'Business & Ownership Decisions', body: 'Navigate growth, ownership changes, entity structures, and other strategic decisions.' },
      { title: 'Succession & Transition Planning', body: 'Consider the tax implications of trusts, distributions, and multigenerational structures.' },
      { title: 'Investment & Financial Decisions', body: 'Bring tax perspective to significant investments, capital allocation, and other consequential financial decisions.' },
      { title: 'Advisor Coordination', body: 'Work alongside attorneys, wealth advisors, and other professionals to keep tax, business, estate, and ownership decisions connected.' },
    ],
    closingTitle: 'Complexity Benefits From Continuity.',
    closingBody: 'As financial lives evolve, continuity of advice becomes increasingly important. A deep understanding of the broader picture allows decisions to be evaluated with greater context, coordination, and long-term perspective.',
    image: '/media/tax-guidance.jpg',
    audiences: ['owners', 'families', 'family-offices'],
  },
  {
    slug: 'transactions-technical-projects',
    title: 'Transactions & Technical Projects',
    tagline: 'Technical expertise for high-impact decisions.',
    summary: 'From acquisitions and restructurings to specialized tax projects, we bring technical depth and practical perspective to complex financial situations.',
    eyebrow: 'Strategy Before the Transaction',
    heading: 'Technical Expertise With Practical Perspective.',
    intro: [
      'Complex tax questions require more than a technically correct answer. Our partner-led approach brings technical expertise together with an understanding of the transaction, the ownership structure, and the broader financial strategy so clients can move forward with greater clarity.',
    ],
    pillarsHeading: 'Support for Complex Tax Matters',
    pillars: [
      { title: 'Mergers, Acquisitions & Restructurings', body: 'Tax planning and analysis surrounding acquisitions, dispositions, recapitalizations, ownership changes, and restructurings.' },
      { title: 'Cost Segregation & Fixed Assets', body: 'Depreciation strategies, asset classifications, and fixed asset opportunities within significant real estate investments.' },
      { title: 'Research & Development Tax Credits', body: 'Technical analysis and support for businesses evaluating available R&D tax incentives.' },
      { title: 'State & Local Tax Projects', body: 'Nexus studies, multistate considerations, and available state and local tax credits and incentives.' },
    ],
    closingTitle: 'Timing Shapes the Outcome.',
    closingBody: 'The structure and timing of a transaction can materially affect its tax impact. Bringing tax strategy into the process early helps preserve options and support a more deliberate outcome.',
    image: '/media/business-buildings.jpg',
    audiences: ['owners', 'real-estate'],
  },
  {
    slug: 'real-estate-tax-advisory',
    title: 'Real Estate Tax Advisory',
    tagline: 'Every investment is part of a larger plan.',
    summary: 'Specialized planning for investors, developers, and property owners navigating acquisitions, ownership structures or strategies, and portfolio growth.',
    eyebrow: 'Strategy Before the Transaction',
    heading: 'Tax Strategy Built Around Real Estate.',
    intro: [
      'Real estate creates tax complexity at nearly every stage, from acquisition and ownership structure to operations, financing, and disposition.',
      'We advise owners, developers, investors, and real estate partnerships on the tax decisions behind significant portfolios and transactions.',
    ],
    pillarsHeading: 'Built for Complex Real Estate',
    pillars: [
      { title: 'Partnership & Entity Structuring', body: 'Tax planning around partnerships, ownership structures, allocations, timely delivery of accurate investor K-1s, and evolving investment portfolios.' },
      { title: 'Acquisitions & Dispositions', body: 'Evaluate tax considerations surrounding property acquisitions, sales, exchanges, and other significant real estate transactions.' },
      { title: 'Depreciation & Cost Segregation', body: 'Planning around depreciation, fixed assets, and cost segregation opportunities across real estate holdings.' },
      { title: 'Portfolio & Multistate Tax Planning', body: 'Coordinate tax strategy across multiple properties, entities, jurisdictions, and investment structures.' },
    ],
    closingTitle: 'Strategy Across the Life of the Investment.',
    closingBody: 'The tax considerations surrounding real estate rarely begin or end with a single transaction. We help clients evaluate decisions across the full investment lifecycle, with the technical depth and continuity required as portfolios become more complex.',
    image: '/media/real-estate-investors.jpg',
    audiences: ['real-estate'],
    listed: false,
  },
];
