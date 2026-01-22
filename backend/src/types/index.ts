// Core Types for Unify Backend

export type OrganisationType =
  | 'student-isoc-msa'
  | 'student-society'
  | 'consulting-firm'
  | 'marketing-agency'
  | 'creative-agency'
  | 'nonprofit'
  | 'restaurant'
  | 'retail-store'
  | 'franchise'
  | 'sales-team'
  | 'other';

export interface OrganisationTerminology {
  teamLabel: string;          // "Committee" | "Team" | "Staff" | "Employees"
  memberLabel: string;        // "Member" | "Employee" | "Staff Member"
  leaderLabel: string;        // "President" | "CEO" | "Manager" | "Director"
  eventLabel: string;         // "Event" | "Project" | "Campaign" | "Service"
  periodLabel: string;        // "Academic Year" | "Fiscal Year" | "Quarter" | "Year"
}

export interface Organisation {
  id: string;
  name: string;
  type: OrganisationType;

  // Flexible metadata based on org type
  metadata: {
    // For student orgs:
    academicYear?: string;
    membersCount?: number;

    // For businesses:
    employeeCount?: number;
    fiscalYear?: string;
    industry?: string;

    // Universal:
    foundedYear: number;
    location?: string;
  };

  // Customisation
  terminology: OrganisationTerminology;

  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  organisationId: string;

  // Universal fields
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  type: string;  // Dynamic based on org type

  // Metrics (different orgs track different things)
  metrics: {
    // Student org metrics:
    attendance?: number;
    fundraising?: number;

    // Business metrics:
    revenue?: number;
    clientSatisfaction?: number;
    teamHours?: number;

    // Universal:
    budget?: {
      planned: number;
      actual: number;
      breakdown?: { category: string; amount: number }[];
    };
    rating?: number;
  };

  // Relationships (flexible)
  people: {
    organisers?: string[];
    participants?: string[];
    clients?: string[];
    vendors?: string[];
  };

  // Context
  outcomes: {
    successFactors?: string[];
    challenges?: string[];
    lessonsLearned?: string[];
    nextSteps?: string[];
  };

  tags: string[];
  documents?: string[];  // Document IDs

  createdAt?: string;
  updatedAt: string;
}

export type ContactType =
  | 'vendor'
  | 'client'
  | 'partner'
  | 'speaker'
  | 'consultant'
  | 'alumnus'
  | 'sponsor'
  | 'supplier'
  | 'contractor'
  | 'other';

export interface Contact {
  id: string;
  organisationId: string;

  name: string;
  type: ContactType;

  contactInfo: {
    email?: string;
    phone?: string;
    website?: string;
    address?: string;
  };

  // Flexible metadata per type
  metadata: {
    // For clients:
    accountValue?: number;
    contractEndDate?: string;

    // For vendors:
    services?: string[];
    pricing?: string;
    leadTime?: string;

    // For speakers/consultants:
    expertise?: string[];
    hourlyRate?: number;

    // Universal:
    company?: string;
    position?: string;
    notes?: string;
  };

  // Relationship tracking
  interactions: {
    eventsInvolved: string[];
    lastContactDate?: string;
    frequency: 'regular' | 'occasional' | 'one-time';
    relationshipStrength: 'strong' | 'moderate' | 'weak';
  };

  rating?: number;
  tags: string[];

  createdAt?: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  organisationId: string;
  title: string;
  type: 'google-doc' | 'email' | 'spreadsheet';
  source: 'drive' | 'gmail';
  date: string;
  summary: string;
  content: string;
  url?: string;
  relatedEvents: string[];
  tags: string[];
}

export interface SearchResult {
  id: string;
  type: 'document' | 'event' | 'contact';
  title: string;
  excerpt: string;
  source: {
    type: string;
    platform: string;
    date: string;
  };
  relevanceScore: number;
  url?: string;
  relatedEntities: {
    events?: string[];
    people?: string[];
    vendors?: string[];
    tags?: string[];
  };
}

export interface AISearchSummary {
  summary: string;
  keyInsights: string[];
  relatedQueries: string[];
  confidence: 'high' | 'medium' | 'low';
  sources: string[];
}

export interface SearchResponse {
  query: string;
  aiSummary: AISearchSummary | null;
  contextualAnswer?: string; // Conversational AI answer
  results: SearchResult[];
  total: number;
}

export interface DataSource {
  id: string;
  platform: 'google' | 'microsoft' | 'slack';
  connected: boolean;
  lastSyncAt: string | null;
  syncStatus: 'completed' | 'syncing' | 'disconnected' | 'error';
}
