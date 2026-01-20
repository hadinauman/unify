import type { Organisation, Event, Contact, Document } from '../../types';

export const marketingAgencyOrganisation: Organisation = {
  id: 'org-marketing-demo',
  name: 'Creative Pulse Agency',
  type: 'marketing-agency',
  metadata: {
    employeeCount: 28,
    fiscalYear: '2024-2025',
    industry: 'Digital Marketing & Advertising',
    foundedYear: 2015,
    location: 'Dublin, Ireland',
  },
  terminology: {
    teamLabel: 'Team',
    memberLabel: 'Team Member',
    leaderLabel: 'Creative Director',
    eventLabel: 'Campaign',
    periodLabel: 'Year',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-12-20T00:00:00Z',
};

export const marketingAgencyEvents: Event[] = [
  {
    id: 'campaign-001',
    organisationId: 'org-marketing-demo',
    title: 'TechBrand Q4 Product Launch Campaign',
    description: 'Integrated campaign for new product launch across digital and traditional channels',
    startDate: '2024-10-01',
    endDate: '2024-12-31',
    type: 'campaign',

    metrics: {
      revenue: 85000,
      clientSatisfaction: 9.1,
      teamHours: 520,
      budget: {
        planned: 95000,
        actual: 85000,
        breakdown: [
          { category: 'Creative & Design', amount: 35000 },
          { category: 'Media Buying', amount: 40000 },
          { category: 'Content Production', amount: 8000 },
          { category: 'Analytics & Reporting', amount: 2000 },
        ],
      },
      rating: 5,
    },

    people: {
      organisers: ['Lisa Chen', 'David O\'Brien'],
      clients: ['TechBrand Corp'],
      participants: ['Lisa Chen', 'David O\'Brien', 'Emma O\'Connor', 'James Park', 'Sarah Walsh'],
    },

    outcomes: {
      successFactors: [
        'Strong creative concept resonated with target audience',
        'Integrated approach across channels maximised reach',
        'Real-time optimisation improved ROI by 23%',
      ],
      challenges: [
        'Last-minute brief change required design rework',
        'Media supply issues on digital platforms',
      ],
      lessonsLearned: [
        'Build 10% contingency into creative timelines',
        'Establish media partner relationships earlier',
        'Weekly stakeholder workshops prevent scope creep',
      ],
      nextSteps: [
        'Phase 2 retainer contract being finalised',
        'Case study approved for industry awards',
        'Client considering bigger 2025 campaign',
      ],
    },

    tags: ['product-launch', 'integrated', 'high-impact', 'tech', 'digital'],
    documents: ['doc-techbrand-brief', 'doc-techbrand-campaign-plan'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },

  {
    id: 'campaign-002',
    organisationId: 'org-marketing-demo',
    title: 'RetailGood Brand Refresh & Social Campaign',
    description: 'Complete brand refresh with social media strategy and content calendar',
    startDate: '2024-09-15',
    endDate: '2024-11-30',
    type: 'campaign',

    metrics: {
      revenue: 45000,
      clientSatisfaction: 8.3,
      teamHours: 280,
      budget: {
        planned: 50000,
        actual: 45000,
      },
      rating: 4,
    },

    people: {
      organisers: ['Emma O\'Connor'],
      clients: ['RetailGood Ltd'],
      participants: ['Emma O\'Connor', 'James Park', 'Sarah Walsh'],
    },

    outcomes: {
      successFactors: [
        'New brand identity well received by customers',
        'Social media engagement increased 45%',
      ],
      challenges: [
        'Client indecision on brand colours delayed work',
        'Content approval process slower than expected',
      ],
      lessonsLearned: ['Get design sign-off in writing upfront', 'Establish approval workflows earlier'],
    },

    tags: ['brand-refresh', 'social-media', 'content-creation', 'retail'],
    documents: ['doc-retailgood-brand-brief', 'doc-retailgood-content-calendar'],
    createdAt: '2024-09-15T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z',
  },

  {
    id: 'campaign-003',
    organisationId: 'org-marketing-demo',
    title: 'FoodCo Influencer Marketing Campaign',
    description: 'Influencer partnership campaign targeting millennials and Gen Z',
    startDate: '2024-11-01',
    endDate: '2025-01-15',
    type: 'campaign',

    metrics: {
      revenue: 62000,
      clientSatisfaction: 8.8,
      teamHours: 380,
      budget: {
        planned: 70000,
        actual: 62000,
      },
      rating: 4.5,
    },

    people: {
      organisers: ['David O\'Brien'],
      clients: ['FoodCo Ireland'],
      participants: ['David O\'Brien', 'Emma O\'Connor', 'Sophie Byrne'],
    },

    outcomes: {
      successFactors: [
        'Strong influencer fit with target demographic',
        'Authentic content performed exceptionally',
      ],
      lessonsLearned: ['Micro-influencers often outperform mega-influencers for engagement'],
    },

    tags: ['influencer', 'social', 'food', 'youth-target'],
    documents: ['doc-foodco-brief', 'doc-foodco-influencer-list'],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },
];

export const marketingAgencyContacts: Contact[] = [
  {
    id: 'contact-techbrand',
    organisationId: 'org-marketing-demo',
    name: 'TechBrand Corp',
    type: 'client',
    contactInfo: {
      email: 'marketing@techbrand.ie',
      phone: '+353 1 555 4321',
      website: 'https://techbrand.ie',
      address: 'Cork, Ireland',
    },
    metadata: {
      accountValue: 150000,
      contractEndDate: '2025-12-31',
      company: 'TechBrand Corp',
      position: 'Key Account',
      notes: 'Fast-growing tech company. Very responsive to new ideas. Considering expanded 2025 engagement.',
    },
    interactions: {
      eventsInvolved: ['campaign-001'],
      lastContactDate: '2024-12-20',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['tech', 'growth-account', 'recurring', 'high-value'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },

  {
    id: 'contact-retailgood',
    organisationId: 'org-marketing-demo',
    name: 'RetailGood Ltd',
    type: 'client',
    contactInfo: {
      email: 'brand@retailgood.com',
      phone: '+353 1 555 5555',
      address: 'Dublin, Ireland',
    },
    metadata: {
      accountValue: 60000,
      contractEndDate: '2025-03-31',
      company: 'RetailGood Ltd',
      notes: 'Excellent collaboration on brand refresh. Slow decision-maker but committed.',
    },
    interactions: {
      eventsInvolved: ['campaign-002'],
      lastContactDate: '2024-11-30',
      frequency: 'occasional',
      relationshipStrength: 'moderate',
    },
    rating: 4,
    tags: ['retail', 'seasonal'],
    createdAt: '2024-09-15T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z',
  },

  {
    id: 'contact-foodco',
    organisationId: 'org-marketing-demo',
    name: 'FoodCo Ireland',
    type: 'client',
    contactInfo: {
      email: 'marketing@foodco.ie',
      phone: '+353 1 555 8899',
      address: 'Dublin, Ireland',
    },
    metadata: {
      accountValue: 85000,
      contractEndDate: '2025-06-30',
      company: 'FoodCo Ireland Ltd',
      notes: 'New client from referral. Very collaborative and open to experimentation.',
    },
    interactions: {
      eventsInvolved: ['campaign-003'],
      lastContactDate: '2025-01-15',
      frequency: 'regular',
      relationshipStrength: 'moderate',
    },
    rating: 4.5,
    tags: ['food', 'new-client', 'social-focused'],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2025-01-15T00:00:00Z',
  },

  {
    id: 'contact-freelance-designer',
    organisationId: 'org-marketing-demo',
    name: 'Mark Thompson',
    type: 'contractor',
    contactInfo: {
      email: 'mark@designstudio.ie',
      phone: '+353 87 654 3210',
      website: 'https://markthompson.design',
    },
    metadata: {
      expertise: ['UI/UX Design', 'Branding', 'Web Design'],
      hourlyRate: 85,
      notes: 'Freelance designer. Does excellent brand work. Usually available within 2 weeks notice.',
    },
    interactions: {
      eventsInvolved: ['campaign-001', 'campaign-002'],
      lastContactDate: '2024-12-10',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['freelancer', 'designer', 'trusted'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z',
  },

  {
    id: 'contact-media-partner',
    organisationId: 'org-marketing-demo',
    name: 'Media Network Ireland',
    type: 'partner',
    contactInfo: {
      email: 'partnerships@medianetwork.ie',
      phone: '+353 1 555 2222',
      website: 'https://medianetwork.ie',
    },
    metadata: {
      services: ['Media Planning', 'Media Buying', 'Programmatic Advertising'],
      pricing: 'Negotiated rates',
      notes: 'Primary media partner. Good rates, responsive support team.',
    },
    interactions: {
      eventsInvolved: ['campaign-001'],
      lastContactDate: '2024-12-01',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 4.5,
    tags: ['media-partner', 'key-vendor'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
  },
];

export const marketingAgencyDocuments: Document[] = [
  {
    id: 'doc-techbrand-brief',
    title: 'TechBrand Q4 Launch Campaign Brief',
    type: 'google-doc',
    source: 'drive',
    date: '2024-10-01',
    url: 'https://docs.google.com/document/d/1TechBrandBrief/edit',
    summary:
      'Campaign brief for TechBrand product launch including objectives, audience, messaging, and channel strategy.',
    content: 'Brief includes: Business Objectives | Target Audience | Key Messages | Channel Mix | Timeline | Success Metrics',
    relatedEvents: ['campaign-001'],
    tags: ['brief', 'techbrand', 'product-launch'],
    createdAt: '2024-10-01T00:00:00Z',
  },

  {
    id: 'doc-techbrand-campaign-plan',
    title: 'TechBrand Campaign Execution Plan',
    type: 'google-doc',
    source: 'drive',
    date: '2024-10-15',
    url: 'https://docs.google.com/document/d/1TechBrandPlan/edit',
    summary: 'Detailed execution plan with creative concepts, timeline, resource allocation, and measurement framework.',
    content:
      'Plan includes: Creative Directions | Production Schedule | Resource Allocation | Budget Breakdown | KPIs & Measurement',
    relatedEvents: ['campaign-001'],
    tags: ['plan', 'techbrand', 'execution'],
    createdAt: '2024-10-15T00:00:00Z',
  },

  {
    id: 'doc-retailgood-brand-brief',
    title: 'RetailGood Brand Refresh Brief',
    type: 'google-doc',
    source: 'drive',
    date: '2024-09-15',
    url: 'https://docs.google.com/document/d/1RetailGoodBrief/edit',
    summary: 'Brand refresh brief covering brand positioning, visual identity, and messaging framework.',
    content: 'Brief includes: Brand Audit | Positioning Strategy | Visual Identity Direction | Messaging Framework | Brand Guidelines',
    relatedEvents: ['campaign-002'],
    tags: ['brand', 'retailgood', 'refresh'],
    createdAt: '2024-09-15T00:00:00Z',
  },

  {
    id: 'doc-retailgood-content-calendar',
    title: 'RetailGood Social Media Content Calendar',
    type: 'google-doc',
    source: 'drive',
    date: '2024-10-01',
    url: 'https://docs.google.com/spreadsheets/d/1RetailGoodCalendar/edit',
    summary: '3-month content calendar for Instagram, TikTok, and Facebook with post themes and content specs.',
    content: 'Calendar includes: Daily post schedule | Content themes | Hashtag strategy | Engagement plan | Analytics tracking',
    relatedEvents: ['campaign-002'],
    tags: ['content', 'social-media', 'calendar'],
    createdAt: '2024-10-01T00:00:00Z',
  },

  {
    id: 'doc-foodco-brief',
    title: 'FoodCo Influencer Campaign Brief',
    type: 'google-doc',
    source: 'drive',
    date: '2024-11-01',
    url: 'https://docs.google.com/document/d/1FoodCoBrief/edit',
    summary: 'Influencer campaign brief including target demographics, influencer selection criteria, and content requirements.',
    content:
      'Brief includes: Campaign Objectives | Target Audience | Influencer Criteria | Content Requirements | Deliverables | Timeline',
    relatedEvents: ['campaign-003'],
    tags: ['influencer', 'foodco', 'brief'],
    createdAt: '2024-11-01T00:00:00Z',
  },

  {
    id: 'doc-foodco-influencer-list',
    title: 'FoodCo Influencer Partners List',
    type: 'google-doc',
    source: 'drive',
    date: '2024-11-05',
    url: 'https://docs.google.com/spreadsheets/d/1FoodCoInfluencers/edit',
    summary: 'Curated list of micro-influencers with audience demographics, engagement rates, and collaboration history.',
    content:
      'List includes: Influencer profiles | Audience demographics | Engagement metrics | Previous collaborations | Contact details | Proposed rates',
    relatedEvents: ['campaign-003'],
    tags: ['influencer', 'foodco', 'partnerships'],
    createdAt: '2024-11-05T00:00:00Z',
  },
];

export const marketingAgencyDemo = {
  organisation: marketingAgencyOrganisation,
  events: marketingAgencyEvents,
  contacts: marketingAgencyContacts,
  documents: marketingAgencyDocuments,
};
