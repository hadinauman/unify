// ISOC/MSA Content Filtering Service
// Filters Google data for relevant society/organization content

// Keywords that indicate ISOC/MSA related content
export const ISOC_MSA_KEYWORDS = [
  // Organization names
  'isoc', 'msa', 'islamic society', 'muslim student', 'tcd msa', 'trinity msa',
  'muslim association', 'islamic association',

  // Event types
  'iftar', 'eid', 'ramadan', 'jummah', 'prayer', 'salah', 'halaqah', 'halaqa',
  'islamic week', 'charity week', 'dawah', 'interfaith',

  // Activities
  'fundraiser', 'charity', 'donation', 'volunteer', 'community service',
  'speaker event', 'lecture', 'workshop', 'social event', 'gathering',
  'welcome week', 'freshers', 'agm', 'egm', 'committee meeting',

  // Roles
  'president', 'treasurer', 'secretary', 'committee', 'auditor', 'welfare',
  'events officer', 'pr officer', 'sisters rep', 'brothers rep',

  // Venues/Partners
  'prayer room', 'mosque', 'masjid', 'halal', 'catering',
  'student union', 'society', 'club',

  // Financial
  'budget', 'sponsorship', 'grant', 'capitation', 'invoice', 'receipt',

  // Documents
  'constitution', 'minutes', 'agenda', 'proposal', 'report',
];

// Email domains that are likely relevant
export const RELEVANT_DOMAINS = [
  'tcd.ie',
  'students.tcd.ie',
  'trinitysocieties.ie',
  'csc.tcd.ie',
];

export interface FilterResult {
  isRelevant: boolean;
  matchedKeywords: string[];
  relevanceScore: number; // 0-100
  category: 'event' | 'contact' | 'document' | 'financial' | 'administrative' | 'unknown';
}

export function filterContent(text: string, sender?: string): FilterResult {
  const lowerText = text.toLowerCase();
  const lowerSender = sender?.toLowerCase() || '';

  const matchedKeywords: string[] = [];

  // Check for keyword matches
  for (const keyword of ISOC_MSA_KEYWORDS) {
    if (lowerText.includes(keyword.toLowerCase())) {
      matchedKeywords.push(keyword);
    }
  }

  // Check sender domain
  let domainBonus = 0;
  for (const domain of RELEVANT_DOMAINS) {
    if (lowerSender.includes(domain)) {
      domainBonus = 20;
      break;
    }
  }

  // Calculate relevance score
  const keywordScore = Math.min(matchedKeywords.length * 15, 80);
  const relevanceScore = Math.min(keywordScore + domainBonus, 100);

  // Determine category based on keywords
  const category = categorizeContent(matchedKeywords, lowerText);

  return {
    isRelevant: relevanceScore >= 30,
    matchedKeywords,
    relevanceScore,
    category,
  };
}

function categorizeContent(keywords: string[], text: string): FilterResult['category'] {
  const eventKeywords = ['iftar', 'eid', 'event', 'fundraiser', 'lecture', 'workshop', 'social', 'gathering', 'week'];
  const contactKeywords = ['speaker', 'vendor', 'catering', 'partner', 'sponsor'];
  const financialKeywords = ['budget', 'invoice', 'receipt', 'sponsorship', 'grant', 'donation', 'treasurer'];
  const adminKeywords = ['agm', 'egm', 'committee', 'minutes', 'agenda', 'constitution', 'proposal'];

  const hasEvent = keywords.some(k => eventKeywords.some(e => k.includes(e))) ||
                   eventKeywords.some(e => text.includes(e));
  const hasContact = keywords.some(k => contactKeywords.some(c => k.includes(c)));
  const hasFinancial = keywords.some(k => financialKeywords.some(f => k.includes(f)));
  const hasAdmin = keywords.some(k => adminKeywords.some(a => k.includes(a)));

  if (hasEvent) return 'event';
  if (hasContact) return 'contact';
  if (hasFinancial) return 'financial';
  if (hasAdmin) return 'administrative';
  return 'document';
}

// Extract potential event details from text
export function extractEventHints(text: string): {
  possibleTitle?: string;
  possibleDate?: string;
  possibleVenue?: string;
  possibleAttendance?: number;
} {
  const hints: ReturnType<typeof extractEventHints> = {};

  // Try to find dates (simple patterns)
  const datePatterns = [
    /(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/,
    /(\d{1,2}(?:st|nd|rd|th)?\s+(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*\s*\d{0,4})/i,
    /((?:monday|tuesday|wednesday|thursday|friday|saturday|sunday),?\s+\d{1,2}(?:st|nd|rd|th)?)/i,
  ];

  for (const pattern of datePatterns) {
    const match = text.match(pattern);
    if (match) {
      hints.possibleDate = match[1];
      break;
    }
  }

  // Try to find venue
  const venuePatterns = [
    /(?:at|in|venue:?)\s+([A-Z][^.,\n]{5,50})/i,
    /(?:location:?)\s+([^.,\n]{5,50})/i,
  ];

  for (const pattern of venuePatterns) {
    const match = text.match(pattern);
    if (match) {
      hints.possibleVenue = match[1].trim();
      break;
    }
  }

  // Try to find attendance numbers
  const attendanceMatch = text.match(/(\d+)\s*(?:people|attendees|attended|participants|members)/i);
  if (attendanceMatch) {
    hints.possibleAttendance = parseInt(attendanceMatch[1]);
  }

  return hints;
}

// Extract potential contact details from text
export function extractContactHints(text: string): {
  possibleName?: string;
  possibleEmail?: string;
  possiblePhone?: string;
  possibleRole?: string;
} {
  const hints: ReturnType<typeof extractContactHints> = {};

  // Email
  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) {
    hints.possibleEmail = emailMatch[1];
  }

  // Phone (Irish format)
  const phoneMatch = text.match(/(\+?353\s?[\d\s-]{9,12}|\b0[1-9][\d\s-]{8,10})/);
  if (phoneMatch) {
    hints.possiblePhone = phoneMatch[1];
  }

  // Role detection
  const rolePatterns = [
    /(?:i am|i'm|acting as|role:?|position:?)\s+(?:the\s+)?([a-z\s]+(?:president|treasurer|secretary|officer|rep|coordinator))/i,
  ];

  for (const pattern of rolePatterns) {
    const match = text.match(pattern);
    if (match) {
      hints.possibleRole = match[1].trim();
      break;
    }
  }

  return hints;
}
