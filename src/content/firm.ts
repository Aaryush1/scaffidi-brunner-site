// Firm-level copy, word for word from scaffidibrunner.com unless marked NEW.
import type { AudienceId, ScenarioId } from './types';

export const hero = {
  eyebrow: 'Built for Complex Financial Lives',
  title: 'Strategic Tax Advisory',
  titleAccent: 'for Complex Wealth',
  lede: 'We serve clients whose financial lives demand more than annual tax preparation. Through proactive tax planning and partner-led guidance, we help build long-term success.',
  signature: 'Michael Scaffidi & Eric Brunner',
};

export const approach = {
  eyebrow: 'How We Think',
  heading: 'Complexity Requires Perspective.',
  intro: 'We bring together tax expertise, technical knowledge, and a deep understanding of your goals to help you make decisions with the full picture in view.',
  steps: [
    { title: 'Understand', line: 'Start with the full picture.', body: 'We take the time to understand your financial landscape, your priorities, and the decisions ahead—not simply the numbers in front of us.' },
    { title: 'Anticipate', line: 'Look ahead, not just at what’s due.', body: 'We identify opportunities, risks, and tax implications before they become transactions or obligations.' },
    { title: 'Strategize', line: 'Build a plan around what matters.', body: 'We develop thoughtful strategies that connect tax, business, ownership, estate, and wealth considerations.' },
    { title: 'Execute', line: 'Turn strategy into action.', body: 'We stay involved through implementation, compliance, and the decisions that follow—bringing strategy and execution together.' },
  ],
  commodity: {
    heading: 'We Don’t Believe in Commodity Advice',
    body: [
      'Your financial life isn’t standard. Your advice shouldn’t be either. A growing business, a real estate portfolio, a family wealth plan, and a major transaction each bring their own complexities. We don’t believe in forcing those decisions into a standard formula.',
      'Instead, we build our advice around the people, businesses, and goals behind the numbers.',
      'That’s what makes our approach different.',
    ],
  },
  together: {
    heading: 'Your Advisors Should Work Together.',
    body: [
      'Your financial strategy doesn’t stop with your CPA. We collaborate with attorneys, wealth advisors, investment professionals, and other trusted partners when their expertise is part of the bigger picture.',
      'The result is a more connected approach to complex decisions—and fewer financial decisions made in isolation.',
    ],
  },
};

export const founders = {
  heading: 'A Word from Our Founders',
  body: [
    'We built Scaffidi Brunner around a simple belief: the best advisory relationships are built on trust, perspective, and a willingness to think ahead. That’s why we take a different approach. We stay close to our clients, ask better questions, plan before decisions become transactions, and bring the right perspective to the table when complexity arises.',
    'We’re here to be more than your tax advisor. We’re here to be a trusted partner in the decisions that shape what you’ve built—and what’s next.',
  ],
  signature: 'Scaffidi Brunner',
};

export const differentiators = {
  eyebrow: 'Built for Clients with Layered Financial Lives',
  heading: 'Sophisticated Financial Lives Require More Than Standard Solutions.',
  items: [
    { title: 'Partner-Led', body: 'Direct access to experienced advisors who stay close to your goals and decisions.' },
    { title: 'Big-Firm Expertise', body: 'Technical experience shaped by careers at Deloitte and leading organizations.' },
    { title: 'Proactive by Design', body: 'Planning happens before the transaction—not after the tax bill arrives.' },
    { title: 'One Connected Perspective', body: 'Tax, business, estate, and wealth considerations under one roof.' },
  ],
  complete: {
    heading: 'More than Tax. A More Complete Perspective.',
    body: [
      'Your financial decisions rarely exist in isolation. A business transaction can affect your personal wealth. An estate plan can have significant tax implications. A real estate investment can reshape your broader financial strategy.',
      'We bring tax, advisory, and technical expertise together to help clients understand the full picture—and make decisions with greater confidence.',
    ],
  },
  apart: [
    { title: 'Big-Firm Experience', body: 'Former Big Four advisors' },
    { title: 'Partner-Led', body: 'Direct access to your advisors' },
    { title: 'Strategy First', body: 'Proactive planning throughout the year' },
    { title: 'Long-Term', body: 'Built around enduring client relationships' },
  ],
};

export interface Audience {
  id: AudienceId;
  name: string;
  short: string;
  tagline: string;
  body: string;
  image: string;
  scenario: ScenarioId;
}

export const whoWeServe = {
  eyebrow: 'Built for Financial Lives With More to Consider',
  heading: 'Complexity is a Sign of Success',
  intro: 'Growth, ownership, investment, and wealth bring new opportunities—and new layers of financial complexity. We work with clients whose financial lives extend beyond a single return, bringing strategic tax expertise and coordinated guidance to the decisions that matter most.',
};

export const audiences: Audience[] = [
  { id: 'owners', name: 'Business Owners', short: 'Strategic planning for growing companies, partnerships, and closely held businesses.', tagline: 'Build what’s next with a strategy behind it.', body: 'Growing companies and closely held businesses require decisions around more than revenue and operations. We help owners navigate tax strategy, ownership structures, growth, transactions, and succession with the long-term picture in mind.', image: '/media/business-owners.jpg', scenario: 'sale' },
  { id: 'real-estate', name: 'Real Estate Investors', short: 'Guidance for acquisitions, ownership structures, and long-term portfolio planning.', tagline: 'Every investment is part of a larger plan.', body: 'From acquisitions to portfolio growth, real estate decisions carry tax and ownership implications that can extend well beyond a single transaction. We provide strategic guidance designed to help investors understand the full picture.', image: '/media/real-estate-investors.jpg', scenario: 'real-estate' },
  { id: 'families', name: 'High-Net-Worth Families', short: 'Integrated tax strategies designed to preserve wealth across generations.', tagline: 'Protect what you’ve built. Plan for what comes next.', body: 'As wealth grows, so does the importance of thoughtful planning. We help families navigate tax strategy, wealth preservation, estate considerations, and multigenerational wealth transfer.', image: '/media/high-net-worth-families.jpg', scenario: 'heirs' },
  { id: 'family-offices', name: 'Family Offices & Trusts', short: 'Coordinated advisory supporting sophisticated estate and ownership structures.', tagline: 'Coordinated advice for complex structures.', body: 'Sophisticated wealth structures require an advisor who can see how the pieces fit together. We provide coordinated tax and advisory support for family offices, trusts, and the professionals who help manage them.', image: '/media/complex-structures.jpg', scenario: 'heirs' },
];

export const testimonials = [
  { quote: 'Scaffidi Brunner consistently helps us see the tax and structural implications years ahead—not just at filing time. The partner‑led approach and discretion make them feel like an extension of our family office rather than an outside vendor.', name: 'Greg R.' },
  { quote: 'Their guidance around entity design and ongoing acquisitions has materially improved our long‑term, after‑tax returns while keeping compliance clean and predictable.', name: 'Melissa J.' },
  { quote: 'They bring the same technical rigor you’d expect from a large firm, but with a partner‑led, relationship‑driven model that fits the way our family actually makes decisions.', name: 'Mark C.' },
];

export interface Person { name: string; role: string; initials: string; partner?: boolean; /** Leave empty until written; empty bios are not shown. */ bio: string; personal?: string; photo?: string }

// Bios are word for word from the live About page. TODO(firm): bios for Nick and Austin, and headshots at
// /public/team/<first-last>.jpg (then set `photo`).
export const team: Person[] = [
  { name: 'Michael Scaffidi', role: 'CPA & Partner', initials: 'MS', partner: true, bio: 'A Brookfield native, Mike earned both his undergraduate and master’s degrees from University of Wisconsin–Milwaukee before beginning his career at Deloitte, where he advised high-net-worth individuals and businesses on complex tax matters. He later led Uline’s tax department before partnering with Eric in 2022 to establish what is now Scaffidi Brunner CPAs & Advisors.', personal: 'Mike is married to Jessica and has three daughters. Outside the office, he enjoys cheering on the Bucks and spending time up north with his family.' },
  { name: 'Eric Brunner', role: 'CPA & Partner', initials: 'EB', partner: true, bio: 'Eric earned bachelor’s degrees in accounting and finance from Illinois State University before beginning his career at Deloitte, where he worked with privately held businesses and high-net-worth families. He later served as Tax Director at Phoenix Investors before establishing his own practice in 2020 and ultimately partnering with Mike to form what is now Scaffidi Brunner CPAs & Advisors.', personal: 'Eric and his wife, Jordan, live in Brookfield with their three sons. Outside the office, he enjoys traveling with his family and staying involved in his church.' },
  { name: 'Nick Vogel', role: 'Tax Manager', initials: 'NV', bio: '' },
  { name: 'Franklin Wistl', role: 'Senior Tax Associate', initials: 'FW', bio: 'Franklin first worked with Mike and Eric during his time at Deloitte and now supports the Scaffidi Brunner team as a seasonal Senior Tax Associate. He earned his undergraduate degree in accounting and finance from University of Wisconsin–Whitewater and brings experience supporting complex tax compliance and client engagements.', personal: 'Outside of tax season, Franklin helps run his family’s sod farm in New Berlin, just down the road from the office. He also enjoys weightlifting, is a member of the 1,000-pound club, and travels between busy seasons.' },
  { name: 'Austin Kleisner', role: 'Tax Associate', initials: 'AK', bio: '' },
];

export const closingCta = {
  eyebrow: 'Contact Scaffidi Brunner',
  heading: 'Ready to Start Your Financial Journey?',
  body: 'Let’s talk about what’s ahead—and how thoughtful planning can help you get there.',
  button: 'Schedule a Conversation',
};
