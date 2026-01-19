// TCD MSA Mock Data - Realistic demo data for Trinity College Dublin Muslim Students Association

export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'educational' | 'social' | 'religious' | 'fundraiser';
  attendance?: number;
  fundraising?: number;
  rating: number;
  budget: {
    planned: number;
    actual: number;
  };
  tags: string[];
  description?: string;
  whatWorked?: string[];
  challenges?: string[];
  organizers?: string[];
  vendors?: string[];
  speaker?: string;
  semester?: 'semester-1' | 'semester-2';
  academicYear?: string;
}

export interface Contact {
  id: string;
  name: string;
  type: 'vendor' | 'speaker' | 'partner';
  category?: string;
  email?: string;
  phone?: string;
  address?: string;
  website?: string;
  description: string;
  notes: string;
  rating: number;
  eventsUsed: string[];
  lastContactedAt: string;
  relationshipStrength: 'strong' | 'moderate' | 'weak';
  tags: string[];
  topics?: string[];
}

export interface Organisation {
  name: string;
  type: string;
  subtype?: string;
  founded: number;
  currentMembers: number;
  academicYear: string;
  description: string;
  logo?: string;
}

export interface CommitteeMember {
  id: string;
  name: string;
  role: string;
  academicYear: string;
  email: string;
}

// Default Organisation Data
export const defaultOrganisation: Organisation = {
  name: 'TCD MSA',
  type: 'Student Organisation',
  subtype: 'ISOC/MSA',
  founded: 1997,
  currentMembers: 180,
  academicYear: '2025-2026',
  description: 'Trinity College Dublin Muslim Students Association',
};

// Committee Roles Hierarchy
export const committeeRoles = [
  'President',
  'Secretary',
  'Treasurer',
  'Events Coordinator',
  'Public Relation Officer',
  'Ordinary Committee Member',
  'Other',
];

// Previous Committee (2024-2025)
export const previousCommittee: CommitteeMember[] = [
  {
    id: 'cm-001',
    name: 'Ameera Saeed',
    role: 'President',
    academicYear: '2024-2025',
    email: 'president@tcdmsa.ie',
  },
];

// Demo Events
export const mockEvents: Event[] = [
  // Semester 1 (September - December) 2024-2025
  {
    id: 'evt-001',
    title: 'Freshers Week 2024',
    date: '2024-09-12',
    type: 'social',
    attendance: 75,
    rating: 5,
    budget: { planned: 400, actual: 380 },
    tags: ['freshers', 'welcome', 'social'],
    semester: 'semester-1',
    academicYear: '2024-2025',
    description: 'Welcome event for new students during Freshers Week',
    whatWorked: [
      'Great turnout from first years',
      'Bite Box catering was excellent',
      'Social media promotion reached wide audience',
    ],
    challenges: [
      'Room booking confirmed late',
      'Ran out of name tags',
    ],
    organizers: ['Abdul Wadood', 'Events Team'],
    vendors: ['Bite Box'],
  },
  {
    id: 'evt-002',
    title: 'Weekly Halaqa - Semester 1',
    date: '2024-09-20',
    endDate: '2024-12-15',
    type: 'educational',
    attendance: 30,
    rating: 4,
    budget: { planned: 200, actual: 180 },
    tags: ['education', 'weekly', 'spiritual', 'halaqa'],
    semester: 'semester-1',
    academicYear: '2024-2025',
    description: 'Weekly Islamic knowledge sessions every Friday',
    whatWorked: [
      'Consistent attendance',
      'Good discussion topics',
      'Welcoming atmosphere',
    ],
    challenges: [
      'Some sessions clashed with lectures',
      'Finding suitable speakers was challenging',
    ],
  },
  {
    id: 'evt-003',
    title: 'Roots (Semester 1)',
    date: '2024-09-25',
    endDate: '2024-12-18',
    type: 'educational',
    attendance: 22,
    rating: 5,
    budget: { planned: 120, actual: 120 },
    tags: ['education', 'weekly', 'islamic-studies', 'roots'],
    semester: 'semester-1',
    academicYear: '2024-2025',
    description: 'Weekly Islamic studies class with Sheikh Zorbek',
    speaker: 'Sheikh Zorbek',
    whatWorked: [
      'Excellent speaker engagement',
      'Clear curriculum structure',
      'Students requesting continuation',
    ],
    challenges: [
      'Room sometimes too small',
    ],
  },
  {
    id: 'evt-004',
    title: 'Autumn Social 2024',
    date: '2024-10-18',
    type: 'social',
    attendance: 45,
    rating: 4,
    budget: { planned: 200, actual: 185 },
    tags: ['social', 'community', 'autumn'],
    semester: 'semester-1',
    academicYear: '2024-2025',
    description: 'Social gathering with games and food',
    organizers: ['Events Team', 'Secretary'],
    vendors: ['Bite Box'],
  },
  {
    id: 'evt-005',
    title: 'Collaboration with TSAS - Culture Night',
    date: '2024-11-08',
    type: 'social',
    attendance: 65,
    rating: 5,
    budget: { planned: 300, actual: 290 },
    tags: ['social', 'collaboration', 'collab:TSAS', 'cultural', 'diversity'],
    semester: 'semester-1',
    academicYear: '2024-2025',
    description: 'Joint cultural event with Trinity South Asian Society',
    whatWorked: [
      'Strong partnership with TSAS',
      'Diverse attendance from multiple societies',
      'Great cultural exchange',
    ],
    organizers: ['TCD MSA Events Team', 'TSAS Committee'],
  },
  {
    id: 'evt-006',
    title: 'Charity Week 2024',
    date: '2024-11-18',
    endDate: '2024-11-24',
    type: 'fundraiser',
    attendance: 120,
    fundraising: 8500,
    rating: 5,
    budget: { planned: 600, actual: 575 },
    tags: ['fundraising', 'charity', 'community', 'charity-week'],
    semester: 'semester-1',
    academicYear: '2024-2025',
    description: 'Annual fundraising week for Islamic Relief Ireland',
    whatWorked: [
      'Exceeded fundraising target',
      'Strong social media campaign',
      'Great volunteer turnout',
      'Islamic Relief Ireland provided excellent support',
    ],
    challenges: [
      'Some events had weather issues',
      'Logistics coordination could improve',
    ],
    organizers: ['Ameera Saeed', 'Charity Week Committee'],
    vendors: ['Bite Box', 'Dublin Event Rentals'],
  },

  // Semester 2 (January - May) 2024-2025
  {
    id: 'evt-007',
    title: 'Weekly Halaqa - Semester 2',
    date: '2025-01-17',
    endDate: '2025-05-09',
    type: 'educational',
    attendance: 28,
    rating: 4,
    budget: { planned: 200, actual: 195 },
    tags: ['education', 'weekly', 'spiritual', 'halaqa'],
    semester: 'semester-2',
    academicYear: '2024-2025',
    description: 'Weekly Islamic knowledge sessions every Friday',
  },
  {
    id: 'evt-008',
    title: 'Roots (Semester 2)',
    date: '2025-01-22',
    endDate: '2025-05-14',
    type: 'educational',
    attendance: 25,
    rating: 5,
    budget: { planned: 120, actual: 120 },
    tags: ['education', 'weekly', 'islamic-studies', 'roots'],
    semester: 'semester-2',
    academicYear: '2024-2025',
    description: 'Weekly Islamic studies class with Sheikh Zorbek',
    speaker: 'Sheikh Zorbek',
  },
  {
    id: 'evt-009',
    title: 'Ramadan Iftar Series 2025',
    date: '2025-03-01',
    endDate: '2025-03-30',
    type: 'religious',
    attendance: 65,
    rating: 5,
    budget: { planned: 800, actual: 750 },
    tags: ['ramadan', 'iftar', 'religious', 'community'],
    semester: 'semester-2',
    academicYear: '2024-2025',
    description: 'Daily iftar meals during Ramadan',
    whatWorked: [
      'Bite Box very reliable with 2-week lead time',
      'Great community atmosphere',
      'Strong attendance throughout',
    ],
    challenges: [
      'Room capacity sometimes exceeded',
      'Difficulty coordinating daily setup',
    ],
    vendors: ['Bite Box'],
  },
  {
    id: 'evt-010',
    title: 'Interfaith Week with Christian Union',
    date: '2025-04-10',
    endDate: '2025-04-14',
    type: 'educational',
    attendance: 55,
    rating: 4,
    budget: { planned: 250, actual: 240 },
    tags: ['interfaith', 'education', 'collaboration', 'collab:Christian Union'],
    semester: 'semester-2',
    academicYear: '2024-2025',
    description: 'Interfaith dialogue series with Christian Union',
  },
  {
    id: 'evt-011',
    title: 'Eid Event 2025',
    date: '2025-04-25',
    type: 'social',
    attendance: 50,
    rating: 4,
    budget: { planned: 220, actual: 210 },
    tags: ['social', 'community', 'religious'],
    semester: 'semester-2',
    academicYear: '2024-2025',
    description: 'Celebration event for Eid al-Fitr',
    vendors: ['Bite Box'],
  },

  // Previous Year Events (2023-2024) - Sample
  {
    id: 'evt-012',
    title: 'Charity Week 2023',
    date: '2023-11-20',
    endDate: '2023-11-26',
    type: 'fundraiser',
    attendance: 100,
    fundraising: 7200,
    rating: 4,
    budget: { planned: 550, actual: 580 },
    tags: ['fundraising', 'charity', 'community', 'charity-week'],
    semester: 'semester-1',
    academicYear: '2023-2024',
    description: 'Annual fundraising week for Islamic Relief Ireland',
  },
  {
    id: 'evt-013',
    title: 'Ramadan Iftar Series 2024',
    date: '2024-03-11',
    endDate: '2024-04-10',
    type: 'religious',
    attendance: 60,
    rating: 5,
    budget: { planned: 750, actual: 720 },
    tags: ['ramadan', 'iftar', 'religious', 'community'],
    semester: 'semester-2',
    academicYear: '2023-2024',
    description: 'Daily iftar meals during Ramadan',
    vendors: ['Bite Box'],
  },
];

// Demo Contacts
export const mockContacts: Contact[] = [
  // Vendors
  {
    id: 'contact-001',
    name: 'Bite Box',
    type: 'vendor',
    category: 'catering',
    email: 'info@biteboxdublin.ie',
    phone: '01 616 5877',
    address: '66B Pearse St, Dublin 2, D02 DE68',
    website: 'https://biteboxdublin.ie',
    description: 'Halal catering service, reliable for student events',
    notes: `Used for Freshers Week 2024, Ramadan Iftars, multiple social events.

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
    rating: 5,
    eventsUsed: ['Freshers Week 2024', 'Ramadan Iftars 2025', 'Ramadan Iftars 2024', 'Autumn Social 2024', 'Spring Social 2025'],
    lastContactedAt: '2025-03-15',
    relationshipStrength: 'strong',
    tags: ['catering', 'halal', 'reliable', 'student-friendly', 'food'],
  },
  {
    id: 'contact-002',
    name: 'Dublin Event Rentals',
    type: 'vendor',
    category: 'equipment',
    email: 'bookings@dublinhire.ie',
    phone: '+353 1 555 1234',
    website: 'https://dublinhire.ie',
    description: 'Event equipment rental company',
    notes: `Used for Charity Week 2024.

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
    rating: 4,
    eventsUsed: ['Charity Week 2024'],
    lastContactedAt: '2024-11-10',
    relationshipStrength: 'moderate',
    tags: ['equipment', 'rental', 'events', 'audio-visual'],
  },

  // Speakers
  {
    id: 'contact-003',
    name: 'Muhammad Zubair Khan',
    type: 'speaker',
    email: 'mzk@example.ie',
    phone: '+353 87 123 4567',
    description: 'Community speaker, semi-regular contributor to TCD MSA events',
    notes: `Good back up speaker to give reminders at events',

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
- Youth engagement
- Practical Islamic living

Teaching Style:
- Interactive and engaging
- Encourages questions
- Relatable examples
- Good with diverse audiences`,
    rating: 5,
    eventsUsed: ['Roots - Islamic Studies Class (Semester 1)', 'Roots - Islamic Studies Class (Semester 2)', 'Weekly Halaqas'],
    lastContactedAt: '2025-01-20',
    relationshipStrength: 'strong',
    tags: ['speaker', 'volunteer', 'weekly', 'education', 'community'],
    topics: ['Islamic History', 'Reminders', 'Community Building', 'Youth Engagement'],
  },

  // Partners
  {
    id: 'contact-004',
    name: 'Islamic Relief Ireland',
    type: 'partner',
    category: 'charity',
    email: 'info@islamic-relief.ie',
    phone: '01 441 1044',
    website: 'https://www.islamic-relief.ie',
    description: 'Charity partner for fundraising events',
    notes: `Primary charity partner for Charity Week annually.

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
- Connect us with other ISOC's doing Charity Week
- Representative attends kickoff meeting

Contact Process:
- Email partnerships team 6-8 weeks before event
- Schedule planning call
- They send resource pack
- Representative available for questions

Payment:
- Online donation page setup
- Direct bank transfer option
- Provide detailed breakdown of funds raised`,
    rating: 5,
    eventsUsed: ['Charity Week 2024', 'Charity Week 2023'],
    lastContactedAt: '2024-10-15',
    relationshipStrength: 'strong',
    tags: ['charity', 'partner', 'fundraising', 'reliable', 'professional'],
  },
  {
    id: 'contact-005',
    name: 'TSAS - Trinity South Asian Society',
    type: 'partner',
    category: 'student-society',
    email: 'tsas@tcd.ie',
    description: 'Sister society, frequent collaboration partner',
    notes: `Strong sister society relationship with regular collaborations.

Collaborations:
- Co-hosted Cultural Night 2024 (very successful)
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
- Awareness weeks
- Interfaith/intercultural panels

Planning:
- 4-6 weeks notice preferred
- They have good social media reach
- Can help with venue booking
- Bring enthusiastic volunteers`,
    rating: 5,
    eventsUsed: ['Collaboration with TSAS - Cultural Night'],
    lastContactedAt: '2024-11-05',
    relationshipStrength: 'strong',
    tags: ['student-society', 'collaboration', 'partner', 'cultural', 'TCD'],
  },
  {
    id: 'contact-006',
    name: 'FOSIS Ireland',
    type: 'partner',
    category: 'federation',
    email: 'ireland@fosis.org.uk',
    website: 'https://www.fosis.org.uk',
    description: 'Federation of Student Islamic Societies - National support organisation',
    notes: `National federation supporting ISOC's across Ireland and UK.

Services Provided:
- Committee training workshops
- National event coordination
- Resource sharing between ISOC's
- Advocacy for Muslim students
- Conference opportunities

Benefits:
- Connect us with other ISOC's
- Training for new committee members
- Templates and guides for events
- Legal/insurance advice
- Speaker database

Events:
- Annual FOSIS conference (worth attending)
- Regional meetups
- Training weekends

Contact:
- Email for specific support
- Active WhatsApp group for Irish ISOC's
- Newsletter with resources`,
    rating: 4,
    eventsUsed: [],
    lastContactedAt: '2024-09-20',
    relationshipStrength: 'moderate',
    tags: ['national', 'federation', 'support', 'training', 'networking'],
  },
];

// Statistics
export const mockStatistics = {
  totalEvents: 47,
  avgAttendance: 45,
  totalFundraisingRaised: 30000, // €30,000
  avgRating: 4.4,
  semester1Events: 22,
  semester2Events: 25,
  semester1Budget: { planned: 15000, actual: 14200 },
  semester2Budget: { planned: 15000, actual: 14800 },
};

// Helper function to check if backend is available
let BACKEND_AVAILABLE = false;

export async function checkBackendAvailability(): Promise<boolean> {
  try {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000), // 2 second timeout
    });
    BACKEND_AVAILABLE = response.ok;
    return response.ok;
  } catch {
    BACKEND_AVAILABLE = false;
    return false;
  }
}

export function isBackendAvailable(): boolean {
  return BACKEND_AVAILABLE;
}

// Export data getters that automatically fallback to mock data
export async function getEvents(): Promise<Event[]> {
  if (BACKEND_AVAILABLE) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/events`);
      if (response.ok) return response.json();
    } catch {
      // Fall through to mock data
    }
  }
  return mockEvents;
}

export async function getContacts(): Promise<Contact[]> {
  if (BACKEND_AVAILABLE) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contacts`);
      if (response.ok) return response.json();
    } catch {
      // Fall through to mock data
    }
  }
  return mockContacts;
}

export async function getOrganisation(): Promise<Organisation> {
  if (BACKEND_AVAILABLE) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/organization`);
      if (response.ok) return response.json();
    } catch {
      // Fall through to mock data
    }
  }
  return defaultOrganisation;
}
