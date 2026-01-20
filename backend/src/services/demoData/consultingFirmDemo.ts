import type { Organisation, Event, Contact, Document } from '../../types';

export const consultingFirmOrganisation: Organisation = {
  id: 'org-consulting-demo',
  name: 'Acme Consulting Partners',
  type: 'consulting-firm',
  metadata: {
    employeeCount: 45,
    fiscalYear: '2024-2025',
    industry: 'Management Consulting',
    foundedYear: 2018,
    location: 'Dublin, Ireland',
  },
  terminology: {
    teamLabel: 'Team',
    memberLabel: 'Consultant',
    leaderLabel: 'Partner',
    eventLabel: 'Project',
    periodLabel: 'Fiscal Year',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-12-20T00:00:00Z',
};

export const consultingFirmEvents: Event[] = [
  {
    id: 'project-001',
    organisationId: 'org-consulting-demo',
    title: 'Digital Transformation - TechCorp',
    description: 'Complete digital transformation strategy for TechCorp Industries',
    startDate: '2024-09-15',
    endDate: '2024-12-20',
    type: 'client-project',

    metrics: {
      revenue: 125000,
      clientSatisfaction: 9.2,
      teamHours: 850,
      budget: {
        planned: 150000,
        actual: 125000,
        breakdown: [
          { category: 'Consulting Hours', amount: 95000 },
          { category: 'Research & Analysis', amount: 15000 },
          { category: 'Tools & Software', amount: 10000 },
          { category: 'Travel', amount: 5000 },
        ],
      },
      rating: 5,
    },

    people: {
      organisers: ['Sarah Chen', 'Mike Johnson'],
      clients: ['TechCorp Industries'],
      participants: ['Sarah Chen', 'Mike Johnson', 'Alex Kumar', 'Emma Davis'],
    },

    outcomes: {
      successFactors: [
        'Clear communication with client stakeholders',
        'Iterative approach allowed for flexibility',
        'Strong technical expertise on team',
      ],
      challenges: [
        'Client initially resistant to cloud migration',
        'Tight timeline required overtime',
        'Integration with legacy systems complex',
      ],
      lessonsLearned: [
        'Build in 20% time buffer for enterprise projects',
        'Involve IT team earlier in discovery phase',
        'Weekly client check-ins prevent misalignment',
      ],
      nextSteps: [
        'Phase 2 implementation contract under negotiation',
        'Client referred two similar companies',
        'Case study approved for marketing use',
      ],
    },

    tags: ['digital-transformation', 'enterprise', 'high-value', 'technology'],
    documents: ['doc-techcorp-proposal', 'doc-techcorp-final-report'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },

  {
    id: 'project-002',
    organisationId: 'org-consulting-demo',
    title: 'Market Entry Strategy - RetailCo',
    description: 'European market entry strategy for UK retailer',
    startDate: '2024-10-01',
    endDate: '2024-11-30',
    type: 'client-project',

    metrics: {
      revenue: 65000,
      clientSatisfaction: 8.5,
      teamHours: 420,
      budget: {
        planned: 70000,
        actual: 65000,
      },
      rating: 4,
    },

    people: {
      organisers: ['Emma Davis'],
      clients: ['RetailCo UK'],
      participants: ['Emma Davis', 'James Wilson', 'Sophie Martin'],
    },

    outcomes: {
      successFactors: [
        'Comprehensive market research',
        'Strong competitive analysis',
        'Actionable recommendations',
      ],
      challenges: [
        'Limited data for Eastern European markets',
        'Client decision timeline compressed',
      ],
      lessonsLearned: [
        'Partner with local research firms for international projects',
        'Build data uncertainty into recommendations',
      ],
    },

    tags: ['market-entry', 'retail', 'international', 'strategy'],
    documents: ['doc-retailco-research', 'doc-retailco-strategy'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z',
  },

  {
    id: 'project-003',
    organisationId: 'org-consulting-demo',
    title: 'Operations Efficiency Review - FinServ',
    description: 'Complete operations review and efficiency improvements for financial services firm',
    startDate: '2024-08-01',
    endDate: '2024-10-15',
    type: 'client-project',

    metrics: {
      revenue: 185000,
      clientSatisfaction: 9.5,
      teamHours: 1200,
      budget: {
        planned: 200000,
        actual: 185000,
      },
      rating: 5,
    },

    people: {
      organisers: ['Sarah Chen', 'James Wilson'],
      clients: ['FinServ Corp'],
      participants: ['Sarah Chen', 'James Wilson', 'Alex Kumar', 'Sophie Martin', 'Mike Johnson'],
    },

    outcomes: {
      successFactors: [
        'Identified €2.5M in cost savings',
        'Implemented process automation',
        'Strong stakeholder engagement',
      ],
      lessonsLearned: ['Early quick wins build client confidence', 'Regular progress reports essential'],
    },

    tags: ['operations', 'efficiency', 'financial-services', 'cost-reduction'],
    documents: ['doc-finserv-proposal', 'doc-finserv-findings'],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-10-15T00:00:00Z',
  },
];

export const consultingFirmContacts: Contact[] = [
  {
    id: 'contact-techcorp',
    organisationId: 'org-consulting-demo',
    name: 'TechCorp Industries',
    type: 'client',
    contactInfo: {
      email: 'partnerships@techcorp.ie',
      phone: '+353 1 555 0100',
      website: 'https://techcorp.ie',
      address: 'Silicon Docks, Dublin 2',
    },
    metadata: {
      accountValue: 250000,
      contractEndDate: '2025-12-31',
      company: 'TechCorp Industries Ltd',
      position: 'Enterprise Client',
      notes: 'Prefers morning meetings. Decision maker is CTO (John Murphy). Annual budget review in Q4.',
    },
    interactions: {
      eventsInvolved: ['project-001'],
      lastContactDate: '2024-12-20',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['enterprise', 'technology', 'recurring-client', 'high-value'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },

  {
    id: 'contact-retailco',
    organisationId: 'org-consulting-demo',
    name: 'RetailCo UK',
    type: 'client',
    contactInfo: {
      email: 'strategy@retailco.com',
      phone: '+44 20 7946 0958',
      address: 'London, UK',
    },
    metadata: {
      accountValue: 80000,
      contractEndDate: '2025-06-30',
      company: 'RetailCo UK Ltd',
      notes: 'Good prospect for follow-on work. Considering Phase 2 engagement.',
    },
    interactions: {
      eventsInvolved: ['project-002'],
      lastContactDate: '2024-11-30',
      frequency: 'occasional',
      relationshipStrength: 'moderate',
    },
    rating: 4,
    tags: ['retail', 'international', 'growth-prospect'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z',
  },

  {
    id: 'contact-finserv',
    organisationId: 'org-consulting-demo',
    name: 'FinServ Corp',
    type: 'client',
    contactInfo: {
      email: 'operations@finserv.ie',
      phone: '+353 1 555 8888',
      address: 'Dublin Financial District',
    },
    metadata: {
      accountValue: 350000,
      contractEndDate: '2026-03-31',
      company: 'FinServ Corp Ireland',
      notes: 'Long-term retainer relationship. Very satisfied with work. Sponsor is COO (Patricia Brown).',
    },
    interactions: {
      eventsInvolved: ['project-003'],
      lastContactDate: '2024-12-15',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['financial-services', 'enterprise', 'recurring', 'retainer'],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
  },

  {
    id: 'contact-freelance-analyst',
    organisationId: 'org-consulting-demo',
    name: 'Dr. Maria Rodriguez',
    type: 'consultant',
    contactInfo: {
      email: 'maria.rodriguez@consulting.com',
      phone: '+353 87 123 4567',
    },
    metadata: {
      expertise: ['Market Research', 'Statistical Analysis', 'Data Science'],
      hourlyRate: 150,
      notes: 'PhD in Economics. Specialised in European markets. Available for project-based work.',
    },
    interactions: {
      eventsInvolved: ['project-002'],
      lastContactDate: '2024-11-30',
      frequency: 'occasional',
      relationshipStrength: 'moderate',
    },
    rating: 5,
    tags: ['freelancer', 'analyst', 'research', 'expert'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z',
  },

  {
    id: 'contact-partner-john',
    organisationId: 'org-consulting-demo',
    name: 'John Murphy',
    type: 'other',
    contactInfo: {
      email: 'john.murphy@acme.ie',
      phone: '+353 1 555 1234',
    },
    metadata: {
      company: 'Acme Consulting Partners',
      position: 'Managing Partner',
      notes: 'Founder and Managing Partner. Handles key accounts and strategic initiatives.',
    },
    interactions: {
      eventsInvolved: ['project-001', 'project-003'],
      lastContactDate: '2024-12-20',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['internal', 'partner', 'leadership'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },
];

export const consultingFirmDocuments: Document[] = [
  {
    id: 'doc-techcorp-proposal',
    title: 'TechCorp Digital Transformation Proposal',
    type: 'google-doc',
    source: 'drive',
    date: '2024-09-01',
    url: 'https://docs.google.com/document/d/1TechCorpProposal/edit',
    summary:
      'Comprehensive proposal for TechCorp digital transformation including cloud migration, process automation, and data analytics implementation.',
    content:
      'Proposal includes: Executive Summary | Current State Analysis | Proposed Roadmap | Implementation Timeline | Budget Breakdown',
    relatedEvents: ['project-001'],
    tags: ['proposal', 'techcorp', 'digital-transformation'],
    createdAt: '2024-09-01T00:00:00Z',
  },

  {
    id: 'doc-techcorp-final-report',
    title: 'TechCorp Project Final Report',
    type: 'google-doc',
    source: 'drive',
    date: '2024-12-20',
    url: 'https://docs.google.com/document/d/1TechCorpFinalReport/edit',
    summary:
      'Final deliverable including implementation roadmap, ROI projections, change management strategy, and recommendations for Phase 2.',
    content: 'Final report includes: Deliverables Summary | Key Achievements | Financial Impact | Lessons Learned | Phase 2 Recommendations',
    relatedEvents: ['project-001'],
    tags: ['deliverable', 'techcorp', 'final-report'],
    createdAt: '2024-12-20T00:00:00Z',
  },

  {
    id: 'doc-retailco-research',
    title: 'RetailCo Market Research Report',
    type: 'google-doc',
    source: 'drive',
    date: '2024-10-31',
    url: 'https://docs.google.com/document/d/1RetailCoResearch/edit',
    summary: 'Comprehensive market research covering European retail landscape, competitive analysis, and entry opportunities.',
    content: 'Research includes: Market Overview | Competitive Landscape | Regulatory Environment | Consumer Insights | Opportunities',
    relatedEvents: ['project-002'],
    tags: ['research', 'retailco', 'market-analysis'],
    createdAt: '2024-10-31T00:00:00Z',
  },

  {
    id: 'doc-retailco-strategy',
    title: 'RetailCo Market Entry Strategy',
    type: 'google-doc',
    source: 'drive',
    date: '2024-11-30',
    url: 'https://docs.google.com/document/d/1RetailCoStrategy/edit',
    summary: 'Recommended market entry strategy with phased implementation approach, partner recommendations, and risk mitigation.',
    content:
      'Strategy includes: Phase 1 - Market Validation | Phase 2 - Pilot Launch | Phase 3 - Full Rollout | Partner Selection | Resource Requirements',
    relatedEvents: ['project-002'],
    tags: ['strategy', 'retailco', 'entry-plan'],
    createdAt: '2024-11-30T00:00:00Z',
  },

  {
    id: 'doc-finserv-proposal',
    title: 'FinServ Operations Review Proposal',
    type: 'google-doc',
    source: 'drive',
    date: '2024-08-01',
    url: 'https://docs.google.com/document/d/1FinServProposal/edit',
    summary: 'Proposal for comprehensive operations review targeting cost reduction and efficiency improvements.',
    content:
      'Proposal includes: Scope of Work | Timeline (12 weeks) | Team Structure | Expected Deliverables | Investment and ROI',
    relatedEvents: ['project-003'],
    tags: ['proposal', 'finserv', 'operations'],
    createdAt: '2024-08-01T00:00:00Z',
  },

  {
    id: 'doc-finserv-findings',
    title: 'FinServ Operations Review - Key Findings',
    type: 'google-doc',
    source: 'drive',
    date: '2024-10-15',
    url: 'https://docs.google.com/document/d/1FinServFindings/edit',
    summary: 'Key findings and recommendations from operations review, including €2.5M in identified cost savings.',
    content:
      'Findings: Process Inefficiencies (€1.2M savings) | Automation Opportunities (€800K savings) | Staffing Optimisation (€500K savings) | Technology Stack Review',
    relatedEvents: ['project-003'],
    tags: ['findings', 'finserv', 'cost-reduction'],
    createdAt: '2024-10-15T00:00:00Z',
  },
];

export const consultingFirmDemo = {
  organisation: consultingFirmOrganisation,
  events: consultingFirmEvents,
  contacts: consultingFirmContacts,
  documents: consultingFirmDocuments,
};
