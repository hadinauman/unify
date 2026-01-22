// TCD MSA Demo Data - Realistic Irish Student Organization
import { Organisation, Event, Contact, Document } from '../types';

export const demoOrganisation: Organisation = {
  id: 'org-demo-tcd-msa',
  name: 'TCD MSA',
  type: 'student-society',
  metadata: {
    academicYear: '2024-2025',
    membersCount: 180,
    foundedYear: 1997,
    location: 'Trinity College Dublin, Dublin 2, Ireland',
  },
  terminology: {
    teamLabel: 'Committee',
    memberLabel: 'Member',
    leaderLabel: 'President',
    eventLabel: 'Event',
    periodLabel: 'Academic Year',
  },
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2025-01-15T00:00:00Z',
};

export const demoEvents: Event[] = [
  // Semester 1 (September - December) 2024-2025
  {
    id: 'event-001',
    organisationId: 'org-demo-tcd-msa',
    title: 'Freshers Week 2024',
    description: 'Welcome event for new students during Freshers Week',
    startDate: '2024-09-12',
    type: 'social',
    metrics: {
      attendance: 75,
      budget: {
        planned: 400,
        actual: 380,
      },
    },
    people: {
      organisers: ['Abdul Wadood', 'Events Team'],
      vendors: ['Bite Box'],
    },
    outcomes: {
      successFactors: [
        'Great turnout from first years',
        'Bite Box catering was excellent',
        'Social media promotion reached wide audience',
      ],
      challenges: ['Room booking confirmed late', 'Ran out of name tags'],
    },
    tags: ['freshers', 'welcome', 'social'],
    createdAt: '2024-08-15T00:00:00Z',
    updatedAt: '2024-09-12T00:00:00Z',
  },
  {
    id: 'event-002',
    organisationId: 'org-demo-tcd-msa',
    title: 'Weekly Halaqa - Semester 1',
    description: 'Weekly Islamic knowledge sessions every Friday',
    startDate: '2024-09-20',
    endDate: '2024-12-15',
    type: 'educational',
    metrics: {
      attendance: 30,
      budget: {
        planned: 200,
        actual: 180,
      },
    },
    people: {
      organisers: ['Committee Team'],
    },
    outcomes: {
      successFactors: [
        'Consistent attendance',
        'Good discussion topics',
        'Welcoming atmosphere',
      ],
      challenges: [
        'Some sessions clashed with lectures',
        'Finding suitable speakers was challenging',
      ],
    },
    tags: ['education', 'weekly', 'spiritual', 'halaqa'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-20T00:00:00Z',
  },
  {
    id: 'event-003',
    organisationId: 'org-demo-tcd-msa',
    title: 'Roots (Semester 1)',
    description: 'Weekly Islamic studies class with Sheikh Zorbek',
    startDate: '2024-09-25',
    endDate: '2024-12-18',
    type: 'educational',
    metrics: {
      attendance: 22,
      budget: {
        planned: 120,
        actual: 120,
      },
    },
    people: {
      organisers: ['Education Committee'],
      participants: ['Sheikh Zorbek'],
    },
    outcomes: {
      successFactors: [
        'Excellent speaker engagement',
        'Clear curriculum structure',
        'Students requesting continuation',
      ],
      challenges: ['Room sometimes too small'],
    },
    tags: ['education', 'weekly', 'islamic-studies', 'roots'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-25T00:00:00Z',
  },
  {
    id: 'event-004',
    organisationId: 'org-demo-tcd-msa',
    title: 'Autumn Social 2024',
    description: 'Social gathering with games and food',
    startDate: '2024-10-18',
    type: 'social',
    metrics: {
      attendance: 45,
      budget: {
        planned: 200,
        actual: 185,
      },
    },
    people: {
      organisers: ['Events Team', 'Secretary'],
      vendors: ['Bite Box'],
    },
    outcomes: {},
    tags: ['social', 'community', 'autumn'],
    createdAt: '2024-10-05T00:00:00Z',
    updatedAt: '2024-10-18T00:00:00Z',
  },
  {
    id: 'event-005',
    organisationId: 'org-demo-tcd-msa',
    title: 'Collaboration with TSAS - Culture Night',
    description: 'Joint cultural event with Trinity South Asian Society',
    startDate: '2024-11-08',
    type: 'social',
    metrics: {
      attendance: 65,
      budget: {
        planned: 300,
        actual: 290,
      },
    },
    people: {
      organisers: ['TCD MSA Events Team', 'TSAS Committee'],
    },
    outcomes: {
      successFactors: [
        'Strong partnership with TSAS',
        'Diverse attendance from multiple societies',
        'Great cultural exchange',
      ],
    },
    tags: ['social', 'collaboration', 'collab:TSAS', 'cultural', 'diversity'],
    createdAt: '2024-10-15T00:00:00Z',
    updatedAt: '2024-11-08T00:00:00Z',
  },
  {
    id: 'event-006',
    organisationId: 'org-demo-tcd-msa',
    title: 'Charity Week 2024',
    description: 'Annual fundraising week for Islamic Relief Ireland',
    startDate: '2024-11-18',
    endDate: '2024-11-24',
    type: 'fundraiser',
    metrics: {
      attendance: 120,
      fundraising: 8500,
      budget: {
        planned: 600,
        actual: 575,
      },
    },
    people: {
      organisers: ['Ameera Saeed', 'Charity Week Committee'],
      vendors: ['Bite Box', 'Dublin Event Rentals'],
    },
    outcomes: {
      successFactors: [
        'Exceeded fundraising target - raised €8,500',
        'Strong social media campaign',
        'Great volunteer turnout',
        'Islamic Relief Ireland provided excellent support',
      ],
      challenges: [
        'Some events had weather issues',
        'Logistics coordination could improve',
      ],
    },
    tags: ['fundraising', 'charity', 'community', 'charity-week'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-11-24T00:00:00Z',
  },
  // Semester 2 (January - May) 2024-2025
  {
    id: 'event-007',
    organisationId: 'org-demo-tcd-msa',
    title: 'Weekly Halaqa - Semester 2',
    description: 'Weekly Islamic knowledge sessions every Friday',
    startDate: '2025-01-17',
    endDate: '2025-05-09',
    type: 'educational',
    metrics: {
      attendance: 28,
      budget: {
        planned: 200,
        actual: 195,
      },
    },
    people: {
      organisers: ['Committee Team'],
    },
    outcomes: {},
    tags: ['education', 'weekly', 'spiritual', 'halaqa'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-17T00:00:00Z',
  },
  {
    id: 'event-008',
    organisationId: 'org-demo-tcd-msa',
    title: 'Roots (Semester 2)',
    description: 'Weekly Islamic studies class with Sheikh Zorbek',
    startDate: '2025-01-22',
    endDate: '2025-05-14',
    type: 'educational',
    metrics: {
      attendance: 25,
      budget: {
        planned: 120,
        actual: 120,
      },
    },
    people: {
      organisers: ['Education Committee'],
      participants: ['Sheikh Zorbek'],
    },
    outcomes: {},
    tags: ['education', 'weekly', 'islamic-studies', 'roots'],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2025-01-22T00:00:00Z',
  },
  {
    id: 'event-009',
    organisationId: 'org-demo-tcd-msa',
    title: 'Ramadan Iftar Series 2025',
    description: 'Daily iftar meals during Ramadan',
    startDate: '2025-03-01',
    endDate: '2025-03-30',
    type: 'religious',
    metrics: {
      attendance: 65,
      budget: {
        planned: 800,
        actual: 750,
      },
    },
    people: {
      organisers: ['Committee Team'],
      vendors: ['Bite Box'],
    },
    outcomes: {
      successFactors: [
        'Bite Box very reliable with 2-week lead time',
        'Great community atmosphere',
        'Strong attendance throughout',
      ],
      challenges: [
        'Room capacity sometimes exceeded',
        'Difficulty coordinating daily setup',
      ],
    },
    tags: ['ramadan', 'iftar', 'religious', 'community'],
    createdAt: '2025-02-15T00:00:00Z',
    updatedAt: '2025-03-01T00:00:00Z',
  },
  {
    id: 'event-010',
    organisationId: 'org-demo-tcd-msa',
    title: 'Interfaith Week with Christian Union',
    description: 'Interfaith dialogue series with Christian Union',
    startDate: '2025-04-10',
    endDate: '2025-04-14',
    type: 'educational',
    metrics: {
      attendance: 55,
      budget: {
        planned: 250,
        actual: 240,
      },
    },
    people: {
      organisers: ['Committee Team', 'Christian Union'],
    },
    outcomes: {},
    tags: ['interfaith', 'education', 'collaboration', 'collab:Christian Union'],
    createdAt: '2025-03-15T00:00:00Z',
    updatedAt: '2025-04-10T00:00:00Z',
  },
  {
    id: 'event-011',
    organisationId: 'org-demo-tcd-msa',
    title: 'Eid Event 2025',
    description: 'Celebration event for Eid al-Fitr',
    startDate: '2025-04-25',
    type: 'social',
    metrics: {
      attendance: 50,
      budget: {
        planned: 220,
        actual: 210,
      },
    },
    people: {
      organisers: ['Events Team'],
      vendors: ['Bite Box'],
    },
    outcomes: {},
    tags: ['social', 'community', 'religious', 'eid'],
    createdAt: '2025-04-10T00:00:00Z',
    updatedAt: '2025-04-25T00:00:00Z',
  },
];

export const demoContacts: Contact[] = [
  // Vendors
  {
    id: 'contact-001',
    organisationId: 'org-demo-tcd-msa',
    name: 'Bite Box',
    type: 'vendor',
    contactInfo: {
      email: 'info@biteboxdublin.ie',
      phone: '01 616 5877',
      address: '66B Pearse St, Dublin 2, D02 DE68',
      website: 'https://biteboxdublin.ie',
    },
    metadata: {
      services: ['Halal catering', 'Platters', 'Wraps', 'Rice boxes', 'Hot meals'],
      pricing: 'Min order €100, 10% student discount',
      notes: `Halal catering service, reliable for student events.
Key Information:
- 2-week lead time required for large orders
- Student discount available: 10%
- Specialties: Platters, wraps, rice boxes, hot meals
- Minimum order: €100
- Very reliable, always on time
- High quality halal food
- Excellent communication
- Can accommodate dietary restrictions

Contact person: Ask for catering coordinator
Payment: Invoice sent after event, 14-day payment terms`,
    },
    interactions: {
      eventsInvolved: [
        'event-001',
        'event-004',
        'event-006',
        'event-009',
        'event-011',
      ],
      lastContactDate: '2025-03-15',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['catering', 'halal', 'reliable', 'student-friendly', 'food'],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2025-03-15T00:00:00Z',
  },
  {
    id: 'contact-002',
    organisationId: 'org-demo-tcd-msa',
    name: 'Dublin Event Rentals',
    type: 'vendor',
    contactInfo: {
      email: 'bookings@dublinhire.ie',
      phone: '+353 1 555 1234',
      website: 'https://dublinhire.ie',
    },
    metadata: {
      services: [
        'Audio equipment rental',
        'Tables and chairs',
        'Lighting equipment',
        'Projectors and screens',
      ],
      pricing: 'Competitive pricing',
      notes: `Event equipment and furniture rental.

Services:
- Audio equipment rental (microphones, speakers)
- Tables, chairs for large events
- Lighting equipment
- Projectors and screens

Notes:
- Usually reliable delivery
- Sometimes 30 mins late
- Competitive pricing
- 1-week notice preferred
- Collection service available for extra fee`,
    },
    interactions: {
      eventsInvolved: ['event-006'],
      lastContactDate: '2024-11-10',
      frequency: 'occasional',
      relationshipStrength: 'moderate',
    },
    rating: 4,
    tags: ['equipment', 'rental', 'events', 'audio-visual'],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-11-10T00:00:00Z',
  },
  // Speakers
  {
    id: 'contact-003',
    organisationId: 'org-demo-tcd-msa',
    name: 'Sheikh Zorbek',
    type: 'speaker',
    contactInfo: {
      email: 'sheikh.zorbek@example.ie',
    },
    metadata: {
      expertise: [
        'Islamic sciences',
        'Quran interpretation',
        'Islamic jurisprudence',
      ],
      notes: `Regular speaker for Roots Islamic studies class.

Background:
- Formally trained in Islamic sciences
- Based in Dublin
- Excellent teaching style

Availability:
- Available Wednesday evenings for Roots
- Can do weekend events with advance notice
- Prefers 3-week advance notice for new events

Teaching Style:
- Clear and structured
- Interactive approach
- Good with students of all levels`,
    },
    interactions: {
      eventsInvolved: ['event-003', 'event-008'],
      lastContactDate: '2025-01-20',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['speaker', 'education', 'weekly', 'roots'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2025-01-20T00:00:00Z',
  },
  {
    id: 'contact-004',
    organisationId: 'org-demo-tcd-msa',
    name: 'Muhammad Zubair Khan',
    type: 'speaker',
    contactInfo: {
      email: 'mzk@example.ie',
      phone: '+353 87 123 4567',
    },
    metadata: {
      expertise: [
        'Community engagement',
        'Islam in Ireland',
        'Spiritual reminders',
      ],
      notes: `Community speaker, semi-regular contributor to TCD MSA events.

Background:
- Not formally Islamic-educated but very knowledgeable
- Active in Dublin Muslim community
- Excellent rapport with students

Availability:
- Available most Wednesday evenings
- Available for weekend events with notice
- Prefers 2-week advance notice
- No honorarium required (volunteer basis)

Topics:
- Islam in Ireland history
- Spiritual reminders
- Community building
- Youth engagement`,
    },
    interactions: {
      eventsInvolved: ['event-002', 'event-007'],
      lastContactDate: '2024-12-01',
      frequency: 'occasional',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['speaker', 'volunteer', 'community'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z',
  },
  // Partners
  {
    id: 'contact-005',
    organisationId: 'org-demo-tcd-msa',
    name: 'Islamic Relief Ireland',
    type: 'partner',
    contactInfo: {
      email: 'info@islamic-relief.ie',
      phone: '01 441 1044',
      website: 'https://www.islamic-relief.ie',
    },
    metadata: {
      company: 'Islamic Relief Ireland',
      position: 'Partnerships Team',
      notes: `Charity partner for fundraising events.

Partnership Benefits:
- Provide promotional materials (posters, banners)
- Speaker available for events
- Help with fundraising coordination
- Tax-compliant receipts for donors
- Social media support

Charity Week Collaboration:
- Main beneficiary since 2020
- Excellent communication
- Provide fundraising guide
- Connect us with other ISOCs doing Charity Week
- Representative attends kickoff meeting

Contact Process:
- Email partnerships team 6-8 weeks before event
- Schedule planning call
- They send resource pack
- Representative available for questions`,
    },
    interactions: {
      eventsInvolved: ['event-006'],
      lastContactDate: '2024-10-15',
      frequency: 'occasional',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['charity', 'partner', 'fundraising', 'reliable', 'professional'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-10-15T00:00:00Z',
  },
  {
    id: 'contact-006',
    organisationId: 'org-demo-tcd-msa',
    name: 'TSAS',
    type: 'partner',
    contactInfo: {
      email: 'tsas@tcd.ie',
    },
    metadata: {
      company: 'Trinity South Asian Society',
      position: 'Sister Society',
      notes: `Strong sister society relationship with regular collaborations.

Collaborations:
- Co-hosted Culture Night 2024 (very successful)
- Joint social events
- Cross-promotion of events
- Shared resources occasionally

Committee Contact:
- Reach out to their president or events coordinator
- Usually very responsive
- Open to collaboration ideas

What Works:
- Cultural exchange events
- Food-based socials
- Awareness weeks`,
    },
    interactions: {
      eventsInvolved: ['event-005'],
      lastContactDate: '2024-11-05',
      frequency: 'regular',
      relationshipStrength: 'strong',
    },
    rating: 5,
    tags: ['student-society', 'collaboration', 'partner', 'cultural', 'TCD'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-11-05T00:00:00Z',
  },
  {
    id: 'contact-007',
    organisationId: 'org-demo-tcd-msa',
    name: 'FOSIS Ireland',
    type: 'partner',
    contactInfo: {
      email: 'ireland@fosis.org.uk',
      website: 'https://www.fosis.org.uk',
    },
    metadata: {
      company: 'Federation of Student Islamic Societies',
      position: 'National Support',
      notes: `National federation supporting ISOCs across Ireland and UK.

Services Provided:
- Committee training workshops
- National event coordination
- Resource sharing between ISOCs
- Advocacy for Muslim students
- Conference opportunities

Benefits:
- Connect us with other ISOCs
- Training for new committee members
- Templates and guides for events
- Legal/insurance advice
- Speaker database

Events:
- Annual FOSIS conference (worth attending)
- Regional meetups
- Training weekends`,
    },
    interactions: {
      eventsInvolved: [],
      lastContactDate: '2024-09-20',
      frequency: 'occasional',
      relationshipStrength: 'moderate',
    },
    rating: 4,
    tags: ['national', 'federation', 'support', 'training', 'networking'],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-09-20T00:00:00Z',
  },
];

export const demoDocuments: Document[] = [
  {
    id: 'doc-001',
    organisationId: 'org-demo-tcd-msa',
    title: 'Freshers Week 2024 Planning',
    type: 'google-doc',
    source: 'drive',
    date: '2024-08-15',
    summary:
      'Comprehensive plan for Freshers Week including budget, timeline, vendor contacts, and responsibilities.',
    content: `Freshers Week 2024 Planning Document

Budget: €400 allocated
Catering: Bite Box - order 2 weeks in advance
Venue: Student Union Hall - booked for Sept 12
Timeline:
- Aug 15: Finalize budget
- Aug 25: Confirm catering order
- Sept 5: Promotional materials ready
- Sept 10: Final setup check
- Sept 12: Event day

Responsibilities:
- Abdul Wadood: Overall coordination
- Events Team: Decorations and setup
- Publicity: Social media campaign`,
    url: 'https://docs.google.com/document/d/1FreshersWeekPlanningDoc/edit',
    relatedEvents: ['event-001'],
    tags: ['planning', 'freshers', 'budget', 'timeline'],
  },
  {
    id: 'doc-002',
    organisationId: 'org-demo-tcd-msa',
    title: 'Venue Booking Confirmation - Union Hall',
    type: 'email',
    source: 'gmail',
    date: '2024-09-01',
    summary:
      'Confirmation email for Student Union Hall booking for Freshers event on September 12.',
    content: `From: venues@tcd.ie
To: tcdmsa@tcd.ie
Subject: Venue Booking Confirmation - Sept 12

Dear TCD MSA,

This confirms your booking of Student Union Hall for:
Date: September 12, 2024
Time: 6:00 PM - 10:00 PM
Capacity: 100 people

Please arrive 1 hour early for setup.

Best regards,
TCD Venues Team`,
    url: 'https://mail.google.com/mail/u/0/#inbox/FMfcgzGqwkhGqLvZqN',
    relatedEvents: ['event-001'],
    tags: ['venue', 'confirmation', 'email'],
  },
  {
    id: 'doc-003',
    organisationId: 'org-demo-tcd-msa',
    title: 'Charity Week 2024 Budget Tracker',
    type: 'spreadsheet',
    source: 'drive',
    date: '2024-11-01',
    summary:
      'Detailed budget tracking for Charity Week 2024 showing planned vs actual expenses and fundraising totals.',
    content: `Charity Week 2024 Budget

Expenses:
- Catering (Bite Box): €300 planned, €285 actual
- Equipment rental: €150 planned, €140 actual
- Marketing materials: €100 planned, €100 actual
- Miscellaneous: €50 planned, €50 actual
Total expenses: €600 planned, €575 actual

Fundraising:
- Target: €7,000
- Actual raised: €8,500
- Net raised for Islamic Relief: €7,925`,
    url: 'https://docs.google.com/spreadsheets/d/1CharityWeek2024Budget/edit',
    relatedEvents: ['event-006'],
    tags: ['budget', 'charity-week', 'fundraising', 'spreadsheet'],
  },
  {
    id: 'doc-004',
    organisationId: 'org-demo-tcd-msa',
    title: 'Bite Box Catering Quote',
    type: 'email',
    source: 'gmail',
    date: '2024-08-20',
    summary: 'Quote from Bite Box for Freshers Week catering - platters for 80 people.',
    content: `From: catering@biteboxdublin.ie
To: tcdmsa@tcd.ie
Subject: RE: Catering Quote for Freshers Event

Hi TCD MSA,

Thanks for your enquiry! Here's our quote:

Mixed Platter Package (serves 80):
- 3x Large mixed wrap platters
- 2x Rice box platters
- Drinks included

Total: €350 (10% student discount applied)

Lead time: 2 weeks minimum
Delivery: Free within Dublin 2

Let us know if you'd like to proceed!

Best,
Bite Box Catering Team`,
    url: 'https://mail.google.com/mail/u/0/#inbox/FMfcgzGqwkhGqLvZqP',
    relatedEvents: ['event-001'],
    tags: ['catering', 'quote', 'bite-box', 'vendor'],
  },
  {
    id: 'doc-005',
    organisationId: 'org-demo-tcd-msa',
    title: 'Ramadan Iftar Schedule 2025',
    type: 'google-doc',
    source: 'drive',
    date: '2025-02-15',
    summary: 'Complete schedule and logistics plan for daily iftars during Ramadan 2025.',
    content: `Ramadan Iftar Schedule 2025

Duration: March 1 - March 30
Location: Room 50, Arts Building
Time: Varies with sunset (check timetable)

Daily Menu Rotation:
- Day 1: Rice & curry
- Day 2: Wraps & salad
- Day 3: Biryani
(Rotating menu continues)

Volunteer Schedule:
- Setup team: 1 hour before iftar
- Cleanup team: After prayer
- Food collection: Day before

Budget: €800 total
Catering: Bite Box (bulk order discount)`,
    url: 'https://docs.google.com/document/d/1RamadanIftarSchedule2025/edit',
    relatedEvents: ['event-009'],
    tags: ['ramadan', 'iftar', 'schedule', 'planning'],
  },
  {
    id: 'doc-006',
    organisationId: 'org-demo-tcd-msa',
    title: 'Committee Handover Notes 2024',
    type: 'google-doc',
    source: 'drive',
    date: '2024-05-15',
    summary:
      'Handover document from previous committee with key contacts, lessons learned, and recommendations.',
    content: `TCD MSA Committee Handover Notes 2024

Key Contacts to Maintain:
1. Bite Box - best catering option
2. Islamic Relief Ireland - charity partner
3. Sheikh Zorbek - Roots teacher
4. TCD Venues - book early!

Lessons Learned:
- Book venues 4+ weeks in advance
- Start Charity Week planning in September
- Freshers Week is crucial for recruitment
- Weekly events build community better than big one-offs

Budget Tips:
- Apply for SU grants early
- Bite Box gives student discounts
- Equipment rental cheaper than buying

Recommendations for Next Year:
- More interfaith events
- Better social media strategy
- Earlier planning for Ramadan`,
    url: 'https://docs.google.com/document/d/1CommitteeHandoverNotes/edit',
    relatedEvents: [],
    tags: ['handover', 'committee', 'advice', 'contacts'],
  },
];

// Statistics
export const demoStatistics = {
  totalEvents: 11,
  avgAttendance: 45,
  totalFundraisingRaised: 8500,
  avgRating: 4.4,
};
