// TCD MSA Demo Data - Realistic Irish Student Organization
import { Organization, Event, Contact, Document } from '../types';

export const demoOrganization: Organization = {
  id: 'org-tcd-msa',
  name: 'TCD MSA',
  type: 'ISOC/MSA',
  founded: 1997,
  currentMembers: 180,
  academicYear: '2025-2026',
};

export const demoEvents: Event[] = [
  // Semester 1 (September - December) 2024-2025
  {
    id: 'event-001',
    title: 'Freshers Week 2024',
    date: '2024-09-12',
    type: 'social',
    semester: 'semester-1',
    attendance: 75,
    budget: { planned: 400, actual: 380 },
    tags: ['freshers', 'welcome', 'social'],
    organizers: ['Abdul Wadood', 'Events Team'],
    vendors: ['Bite Box'],
    description: 'Welcome event for new students during Freshers Week',
    whatWorked: [
      'Great turnout from first years',
      'Bite Box catering was excellent',
      'Social media promotion reached wide audience',
    ],
    challenges: ['Room booking confirmed late', 'Ran out of name tags'],
  },
  {
    id: 'event-002',
    title: 'Weekly Halaqa - Semester 1',
    date: '2024-09-20',
    endDate: '2024-12-15',
    type: 'educational',
    semester: 'semester-1',
    attendance: 30,
    budget: { planned: 200, actual: 180 },
    tags: ['education', 'weekly', 'spiritual', 'halaqa'],
    organizers: ['Committee Team'],
    vendors: [],
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
    id: 'event-003',
    title: 'Roots (Semester 1)',
    date: '2024-09-25',
    endDate: '2024-12-18',
    type: 'educational',
    semester: 'semester-1',
    attendance: 22,
    budget: { planned: 120, actual: 120 },
    tags: ['education', 'weekly', 'islamic-studies', 'roots'],
    organizers: ['Education Committee'],
    vendors: [],
    description: 'Weekly Islamic studies class with Sheikh Zorbek',
    speaker: 'Sheikh Zorbek',
    whatWorked: [
      'Excellent speaker engagement',
      'Clear curriculum structure',
      'Students requesting continuation',
    ],
    challenges: ['Room sometimes too small'],
  },
  {
    id: 'event-004',
    title: 'Autumn Social 2024',
    date: '2024-10-18',
    type: 'social',
    semester: 'semester-1',
    attendance: 45,
    budget: { planned: 200, actual: 185 },
    tags: ['social', 'community', 'autumn'],
    organizers: ['Events Team', 'Secretary'],
    vendors: ['Bite Box'],
    description: 'Social gathering with games and food',
  },
  {
    id: 'event-005',
    title: 'Collaboration with TSAS - Culture Night',
    date: '2024-11-08',
    type: 'social',
    semester: 'semester-1',
    attendance: 65,
    budget: { planned: 300, actual: 290 },
    tags: ['social', 'collaboration', 'collab:TSAS', 'cultural', 'diversity'],
    organizers: ['TCD MSA Events Team', 'TSAS Committee'],
    vendors: [],
    description: 'Joint cultural event with Trinity South Asian Society',
    whatWorked: [
      'Strong partnership with TSAS',
      'Diverse attendance from multiple societies',
      'Great cultural exchange',
    ],
  },
  {
    id: 'event-006',
    title: 'Charity Week 2024',
    date: '2024-11-18',
    endDate: '2024-11-24',
    type: 'fundraiser',
    semester: 'semester-1',
    attendance: 120,
    budget: { planned: 600, actual: 575 },
    tags: ['fundraising', 'charity', 'community', 'charity-week'],
    organizers: ['Ameera Saeed', 'Charity Week Committee'],
    vendors: ['Bite Box', 'Dublin Event Rentals'],
    description: 'Annual fundraising week for Islamic Relief Ireland',
    whatWorked: [
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
  // Semester 2 (January - May) 2024-2025
  {
    id: 'event-007',
    title: 'Weekly Halaqa - Semester 2',
    date: '2025-01-17',
    endDate: '2025-05-09',
    type: 'educational',
    semester: 'semester-2',
    attendance: 28,
    budget: { planned: 200, actual: 195 },
    tags: ['education', 'weekly', 'spiritual', 'halaqa'],
    organizers: ['Committee Team'],
    vendors: [],
    description: 'Weekly Islamic knowledge sessions every Friday',
  },
  {
    id: 'event-008',
    title: 'Roots (Semester 2)',
    date: '2025-01-22',
    endDate: '2025-05-14',
    type: 'educational',
    semester: 'semester-2',
    attendance: 25,
    budget: { planned: 120, actual: 120 },
    tags: ['education', 'weekly', 'islamic-studies', 'roots'],
    organizers: ['Education Committee'],
    vendors: [],
    description: 'Weekly Islamic studies class with Sheikh Zorbek',
    speaker: 'Sheikh Zorbek',
  },
  {
    id: 'event-009',
    title: 'Ramadan Iftar Series 2025',
    date: '2025-03-01',
    endDate: '2025-03-30',
    type: 'religious',
    semester: 'semester-2',
    attendance: 65,
    budget: { planned: 800, actual: 750 },
    tags: ['ramadan', 'iftar', 'religious', 'community'],
    organizers: ['Committee Team'],
    vendors: ['Bite Box'],
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
  },
  {
    id: 'event-010',
    title: 'Interfaith Week with Christian Union',
    date: '2025-04-10',
    endDate: '2025-04-14',
    type: 'educational',
    semester: 'semester-2',
    attendance: 55,
    budget: { planned: 250, actual: 240 },
    tags: ['interfaith', 'education', 'collaboration', 'collab:Christian Union'],
    organizers: ['Committee Team', 'Christian Union'],
    vendors: [],
    description: 'Interfaith dialogue series with Christian Union',
  },
  {
    id: 'event-011',
    title: 'Eid Event 2025',
    date: '2025-04-25',
    type: 'social',
    semester: 'semester-2',
    attendance: 50,
    budget: { planned: 220, actual: 210 },
    tags: ['social', 'community', 'religious', 'eid'],
    organizers: ['Events Team'],
    vendors: ['Bite Box'],
    description: 'Celebration event for Eid al-Fitr',
  },
];

export const demoContacts: Contact[] = [
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
    eventsUsed: [
      'event-001',
      'event-004',
      'event-006',
      'event-009',
      'event-011',
    ],
    tags: ['catering', 'halal', 'reliable', 'student-friendly', 'food'],
    lastContactedAt: '2025-03-15',
    relationshipStrength: 'strong',
  },
  {
    id: 'contact-002',
    name: 'Dublin Event Rentals',
    type: 'vendor',
    category: 'equipment',
    email: 'bookings@dublinhire.ie',
    phone: '+353 1 555 1234',
    website: 'https://dublinhire.ie',
    description: 'Event equipment and furniture rental',
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
    eventsUsed: ['event-006'],
    tags: ['equipment', 'rental', 'events', 'audio-visual'],
    lastContactedAt: '2024-11-10',
    relationshipStrength: 'moderate',
  },
  // Speakers
  {
    id: 'contact-003',
    name: 'Sheikh Zorbek',
    type: 'speaker',
    email: 'sheikh.zorbek@example.ie',
    description: 'Regular speaker for Roots Islamic studies class',
    notes: `Main speaker for weekly Roots sessions.

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
    rating: 5,
    eventsUsed: ['event-003', 'event-008'],
    tags: ['speaker', 'education', 'weekly', 'roots'],
    lastContactedAt: '2025-01-20',
    relationshipStrength: 'strong',
  },
  {
    id: 'contact-004',
    name: 'Muhammad Zubair Khan',
    type: 'speaker',
    email: 'mzk@example.ie',
    phone: '+353 87 123 4567',
    description: 'Community speaker, semi-regular contributor to TCD MSA events',
    notes: `Good backup speaker to give reminders at events.

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
    rating: 5,
    eventsUsed: ['event-002', 'event-007'],
    tags: ['speaker', 'volunteer', 'community'],
    lastContactedAt: '2024-12-01',
    relationshipStrength: 'strong',
  },
  // Partners
  {
    id: 'contact-005',
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
- Connect us with other ISOCs doing Charity Week
- Representative attends kickoff meeting

Contact Process:
- Email partnerships team 6-8 weeks before event
- Schedule planning call
- They send resource pack
- Representative available for questions`,
    rating: 5,
    eventsUsed: ['event-006'],
    tags: ['charity', 'partner', 'fundraising', 'reliable', 'professional'],
    lastContactedAt: '2024-10-15',
    relationshipStrength: 'strong',
  },
  {
    id: 'contact-006',
    name: 'TSAS',
    fullName: 'Trinity South Asian Society',
    type: 'partner',
    category: 'student-society',
    email: 'tsas@tcd.ie',
    description: 'Sister society, frequent collaboration partner',
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
    rating: 5,
    eventsUsed: ['event-005'],
    tags: ['student-society', 'collaboration', 'partner', 'cultural', 'TCD'],
    lastContactedAt: '2024-11-05',
    relationshipStrength: 'strong',
  },
  {
    id: 'contact-007',
    name: 'FOSIS Ireland',
    type: 'partner',
    category: 'federation',
    email: 'ireland@fosis.org.uk',
    website: 'https://www.fosis.org.uk',
    description:
      'Federation of Student Islamic Societies - National support organisation',
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
    rating: 4,
    eventsUsed: [],
    tags: ['national', 'federation', 'support', 'training', 'networking'],
    lastContactedAt: '2024-09-20',
    relationshipStrength: 'moderate',
  },
];

export const demoDocuments: Document[] = [
  {
    id: 'doc-001',
    title: 'Freshers Week 2024 Planning',
    type: 'google-doc',
    source: 'drive',
    date: '2024-08-15',
    url: 'https://docs.google.com/document/d/1FreshersWeekPlanningDoc/edit',
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
    relatedEvents: ['event-001'],
    tags: ['planning', 'freshers', 'budget', 'timeline'],
  },
  {
    id: 'doc-002',
    title: 'Venue Booking Confirmation - Union Hall',
    type: 'email',
    source: 'gmail',
    date: '2024-09-01',
    url: 'https://mail.google.com/mail/u/0/#inbox/FMfcgzGqwkhGqLvZqN',
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
    relatedEvents: ['event-001'],
    tags: ['venue', 'confirmation', 'email'],
  },
  {
    id: 'doc-003',
    title: 'Charity Week 2024 Budget Tracker',
    type: 'spreadsheet',
    source: 'drive',
    date: '2024-11-01',
    url: 'https://docs.google.com/spreadsheets/d/1CharityWeek2024Budget/edit',
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
    relatedEvents: ['event-006'],
    tags: ['budget', 'charity-week', 'fundraising', 'spreadsheet'],
  },
  {
    id: 'doc-004',
    title: 'Bite Box Catering Quote',
    type: 'email',
    source: 'gmail',
    date: '2024-08-20',
    url: 'https://mail.google.com/mail/u/0/#inbox/FMfcgzGqwkhGqLvZqP',
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
    relatedEvents: ['event-001'],
    tags: ['catering', 'quote', 'bite-box', 'vendor'],
  },
  {
    id: 'doc-005',
    title: 'Ramadan Iftar Schedule 2025',
    type: 'google-doc',
    source: 'drive',
    date: '2025-02-15',
    url: 'https://docs.google.com/document/d/1RamadanIftarSchedule2025/edit',
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
    relatedEvents: ['event-009'],
    tags: ['ramadan', 'iftar', 'schedule', 'planning'],
  },
  {
    id: 'doc-006',
    title: 'Committee Handover Notes 2024',
    type: 'google-doc',
    source: 'drive',
    date: '2024-05-15',
    url: 'https://docs.google.com/document/d/1CommitteeHandoverNotes/edit',
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
    relatedEvents: [],
    tags: ['handover', 'committee', 'advice', 'contacts'],
  },
];

// Statistics
export const demoStatistics = {
  totalEvents: 47,
  avgAttendance: 45,
  totalFundraisingRaised: 30000,
  avgRating: 4.4,
  semester1Events: 22,
  semester2Events: 25,
  semester1Budget: { planned: 15000, actual: 14200 },
  semester2Budget: { planned: 15000, actual: 14800 },
};
