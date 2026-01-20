import type { Organisation, Event, Contact, Document } from '../../types';

export const restaurantOrganisation: Organisation = {
  id: 'org-restaurant-demo',
  name: 'The Gather Restaurant',
  type: 'restaurant',
  metadata: {
    employeeCount: 24,
    fiscalYear: '2024-2025',
    industry: 'Fine Dining & Hospitality',
    foundedYear: 2018,
    location: 'Dublin, Ireland',
  },
  terminology: {
    teamLabel: 'Staff',
    memberLabel: 'Staff Member',
    leaderLabel: 'Manager',
    eventLabel: 'Service',
    periodLabel: 'Year',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-12-20T00:00:00Z',
};

export const restaurantEvents: Event[] = [
  {
    id: 'service-001',
    organisationId: 'org-restaurant-demo',
    title: 'Summer Tasting Menu Launch',
    description: 'Launch of new 5-course summer menu with wine pairings and special guests',
    startDate: '2024-06-15',
    endDate: '2024-08-31',
    type: 'menu-launch',

    metrics: {
      attendance: 450,
      revenue: 32000,
      budget: {
        planned: 15000,
        actual: 14200,
        breakdown: [
          { category: 'Ingredient Procurement', amount: 8500 },
          { category: 'Staff Training', amount: 2000 },
          { category: 'Marketing & Promotion', amount: 2500 },
          { category: 'Special Event Setup', amount: 1200 },
        ],
      },
      rating: 4.7,
    },

    people: {
      organisers: ['Chef Patrick', 'Sarah Manager'],
      participants: ['Chef Patrick', 'Sous Chef Marie', 'Sarah Manager', 'Front of House Team'],
    },

    outcomes: {
      successFactors: [
        'Menu very well received by customers',
        'Social media promotion generated strong bookings',
        'Wine pairings elevated customer experience',
        'Staff training ensured smooth service',
      ],
      challenges: [
        'Ingredient supplier delayed delivery on opening week',
        'Kitchen capacity strained on busy nights',
        'One key team member called in sick during launch weekend',
      ],
      lessonsLearned: [
        'Establish backup suppliers for key ingredients',
        'Confirm all staff availability before major launches',
        'Launch menus on quieter nights for testing',
      ],
      nextSteps: [
        'Menu to continue into autumn with minor modifications',
        'Customer feedback incorporated for refinements',
        'Considered for industry restaurant awards',
      ],
    },

    tags: ['menu-launch', 'seasonal', 'high-impact', 'marketing'],
    documents: ['doc-summer-menu', 'doc-launch-plan'],
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-08-31T00:00:00Z',
  },

  {
    id: 'service-002',
    organisationId: 'org-restaurant-demo',
    title: 'Private Events Season Q4',
    description: 'Corporate events, weddings, and private dining bookings for Q4 2024',
    startDate: '2024-10-01',
    endDate: '2024-12-23',
    type: 'catering',

    metrics: {
      attendance: 680,
      revenue: 52000,
      budget: {
        planned: 18000,
        actual: 17500,
      },
      rating: 4.8,
    },

    people: {
      organisers: ['Sarah Manager'],
      participants: ['Sarah Manager', 'Chef Patrick', 'Events Coordinator', 'All Staff'],
    },

    outcomes: {
      successFactors: [
        'Booked 12 major private events',
        'Strong repeat business from corporate clients',
        'Premium pricing strategy worked well',
      ],
      lessonsLearned: ['Build event buffer time between services', 'Create private event playbook for consistency'],
    },

    tags: ['events', 'catering', 'revenue-peak', 'seasonal'],
    documents: ['doc-event-procedures', 'doc-vendor-contacts'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-23T00:00:00Z',
  },

  {
    id: 'service-003',
    organisationId: 'org-restaurant-demo',
    title: 'Staff Training & Development Program',
    description: 'Quarterly training program covering service standards, food knowledge, and safety',
    startDate: '2024-09-01',
    endDate: '2024-12-31',
    type: 'training',

    metrics: {
      teamHours: 480,
      budget: {
        planned: 5000,
        actual: 4800,
      },
    },

    people: {
      organisers: ['Chef Patrick'],
      participants: ['All Front of House Staff', 'Kitchen Staff'],
    },

    outcomes: {
      successFactors: [
        'Improved customer satisfaction scores',
        'Reduced service errors significantly',
        'Staff engagement and retention improved',
      ],
      lessonsLearned: [
        'Monthly sessions better than quarterly block training',
        'Peer mentoring more effective than lectures',
      ],
    },

    tags: ['training', 'staff-development', 'continuous-improvement'],
    documents: ['doc-training-curriculum', 'doc-service-standards'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-12-31T00:00:00Z',
  },
];

export const restaurantContacts: Contact[] = [
  {
    id: 'contact-premium-ingredients',
    organisationId: 'org-restaurant-demo',
    name: 'Premium Irish Ingredients Ltd',
    type: 'supplier',
    contactInfo: {
      email: 'orders@premiumingredients.ie',
      phone: '+353 1 555 9900',
      address: 'Cork, Ireland',
    },
    metadata: {
      services: ['Fresh Produce', 'Specialty Meats', 'Dairy Products'],
      pricing: 'Negotiated wholesale rates',
      leadTime: '2-3 days',
      notes: 'Primary produce supplier. Excellent quality but occasional delays. Good relationships with their sales team.',
    },
    interactions: {
      eventsInvolved: ['service-001', 'service-002'],
      lastContactDate: '2024-12-15',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 4.5,
    tags: ['supplier', 'produce', 'key-vendor'],
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-12-15T00:00:00Z',
  },

  {
    id: 'contact-wine-distributor',
    organisationId: 'org-restaurant-demo',
    name: 'European Wine Importers',
    type: 'supplier',
    contactInfo: {
      email: 'sales@ewineimport.ie',
      phone: '+353 1 555 7777',
      website: 'https://ewineimport.ie',
    },
    metadata: {
      services: ['Wine & Spirits', 'Sommelier Consultation', 'Wine Education'],
      pricing: 'Competitive wholesale rates',
      notes: 'Excellent wine selection. Sommelier consultant available for menu pairings.',
    },
    interactions: {
      eventsInvolved: ['service-001'],
      lastContactDate: '2024-12-10',
      frequency: 'regular',
      relationshipStrength: 'moderate',
    },
    rating: 4.8,
    tags: ['supplier', 'wine', 'specialist'],
    createdAt: '2024-06-01T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z',
  },

  {
    id: 'contact-events-coordinator',
    organisationId: 'org-restaurant-demo',
    name: 'Elite Events Dublin',
    type: 'partner',
    contactInfo: {
      email: 'info@eliteevents.ie',
      phone: '+353 1 555 6666',
      website: 'https://eliteevents.ie',
    },
    metadata: {
      services: ['Event Planning', 'Decoration', 'Catering Coordination'],
      notes: 'Event planning partner. Brings corporate and wedding business. Collaborative relationship.',
    },
    interactions: {
      eventsInvolved: ['service-002'],
      lastContactDate: '2024-12-20',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 4.7,
    tags: ['partner', 'events', 'referral-source'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-20T00:00:00Z',
  },

  {
    id: 'contact-dishwashing-service',
    organisationId: 'org-restaurant-demo',
    name: 'Dublin Laundry & Dishwash Services',
    type: 'supplier',
    contactInfo: {
      email: 'restaurant@dublinlaundry.ie',
      phone: '+353 1 555 4444',
    },
    metadata: {
      services: ['Dishware Rental', 'Linen Service', 'Laundry'],
      leadTime: '1-2 days',
      notes: 'Provides dishware for large events. Very reliable. Pricing competitive.',
    },
    interactions: {
      eventsInvolved: ['service-002'],
      lastContactDate: '2024-12-18',
      frequency: 'occasional',
      relationshipStrength: 'moderate',
    },
    rating: 4.5,
    tags: ['supplier', 'events', 'logistics'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-18T00:00:00Z',
  },

  {
    id: 'contact-kitchen-equipment',
    organisationId: 'org-restaurant-demo',
    name: 'Pro Kitchen Solutions',
    type: 'supplier',
    contactInfo: {
      email: 'support@prokitchen.ie',
      phone: '+353 1 555 3333',
      website: 'https://prokitchen.ie',
    },
    metadata: {
      services: ['Equipment Sales', 'Maintenance & Repairs', 'Upgrades'],
      notes: 'Supplier for all kitchen equipment. Excellent after-sales service and maintenance contracts.',
    },
    interactions: {
      eventsInvolved: [],
      lastContactDate: '2024-10-15',
      frequency: 'occasional',
      relationshipStrength: 'moderate',
    },
    rating: 4.6,
    tags: ['supplier', 'equipment', 'maintenance'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-10-15T00:00:00Z',
  },
];

export const restaurantDocuments: Document[] = [
  {
    id: 'doc-summer-menu',
    title: 'The Gather Summer Menu 2024',
    type: 'google-doc',
    source: 'drive',
    date: '2024-06-01',
    url: 'https://docs.google.com/document/d/1GatherSummerMenu/edit',
    summary: '5-course tasting menu featuring seasonal produce with recommended wine pairings',
    content:
      'Menu includes: Course-by-course descriptions | Ingredient sourcing notes | Dietary adjustments | Wine pairing recommendations | Pricing structure',
    relatedEvents: ['service-001'],
    tags: ['menu', 'summer', 'tasting'],
    createdAt: '2024-06-01T00:00:00Z',
  },

  {
    id: 'doc-launch-plan',
    title: 'Summer Menu Launch Plan & Timeline',
    type: 'google-doc',
    source: 'drive',
    date: '2024-05-15',
    url: 'https://docs.google.com/document/d/1SummerLaunchPlan/edit',
    summary: 'Marketing and operational plan for summer menu launch',
    content:
      'Plan includes: Pre-launch promotion | Staff training schedule | Ingredient sourcing | Kitchen workflow changes | Social media campaign | Launch event details',
    relatedEvents: ['service-001'],
    tags: ['launch', 'planning', 'marketing'],
    createdAt: '2024-05-15T00:00:00Z',
  },

  {
    id: 'doc-event-procedures',
    title: 'Private Event Standard Procedures',
    type: 'google-doc',
    source: 'drive',
    date: '2024-10-01',
    url: 'https://docs.google.com/document/d/1EventProcedures/edit',
    summary: 'Standardised procedures for hosting private events including setup, service, and breakdown',
    content:
      'Procedures: Pre-event coordination checklist | Room setup configurations | Service timeline | Equipment requirements | Breakdown process | Contingency plans',
    relatedEvents: ['service-002'],
    tags: ['procedures', 'events', 'operations'],
    createdAt: '2024-10-01T00:00:00Z',
  },

  {
    id: 'doc-vendor-contacts',
    title: 'Vendor & Supplier Contact List',
    type: 'google-doc',
    source: 'drive',
    date: '2024-09-01',
    url: 'https://docs.google.com/spreadsheets/d/1VendorContacts/edit',
    summary: 'Complete contact list for all suppliers, vendors, and event partners',
    content:
      'List includes: Contact names & titles | Phone & email | Lead times | Pricing | Special notes | Emergency contacts | Contract dates',
    relatedEvents: ['service-001', 'service-002'],
    tags: ['vendors', 'contacts', 'directory'],
    createdAt: '2024-09-01T00:00:00Z',
  },

  {
    id: 'doc-training-curriculum',
    title: 'Staff Training Curriculum & Materials',
    type: 'google-doc',
    source: 'drive',
    date: '2024-09-01',
    url: 'https://docs.google.com/document/d/1TrainingCurriculum/edit',
    summary: 'Complete training curriculum covering service standards, food knowledge, and safety',
    content:
      'Curriculum: Module 1 - Service Standards | Module 2 - Wine & Food Knowledge | Module 3 - Safety & Hygiene | Module 4 - Customer Service | Assessments',
    relatedEvents: ['service-003'],
    tags: ['training', 'curriculum', 'development'],
    createdAt: '2024-09-01T00:00:00Z',
  },

  {
    id: 'doc-service-standards',
    title: 'The Gather Service Standards Guide',
    type: 'google-doc',
    source: 'drive',
    date: '2024-06-01',
    url: 'https://docs.google.com/document/d/1ServiceStandards/edit',
    summary: 'Complete service standards including expectations, procedures, and quality benchmarks',
    content:
      'Standards: Guest welcome protocol | Table service procedures | Complaint resolution | Table timing | Wine service | Dress code | Grooming standards',
    relatedEvents: ['service-003'],
    tags: ['standards', 'quality', 'service'],
    createdAt: '2024-06-01T00:00:00Z',
  },
];

export const restaurantDemo = {
  organisation: restaurantOrganisation,
  events: restaurantEvents,
  contacts: restaurantContacts,
  documents: restaurantDocuments,
};
