// Core Types for Unify Backend

export interface Organization {
  id: string;
  name: string;
  type: string;
  founded: number;
  currentMembers: number;
  academicYear: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  endDate?: string;
  type: 'educational' | 'social' | 'religious' | 'fundraiser';
  semester: 'semester-1' | 'semester-2';
  attendance: number;
  budget: {
    planned: number;
    actual: number;
  };
  tags: string[];
  organizers: string[];
  vendors: string[];
  description: string;
  whatWorked?: string[];
  challenges?: string[];
  speaker?: string;
}

export interface Contact {
  id: string;
  name: string;
  fullName?: string;
  type: 'vendor' | 'speaker' | 'partner';
  category?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: string;
  description: string;
  notes: string;
  rating: number;
  eventsUsed?: string[];
  tags: string[];
  lastContactedAt?: string;
  relationshipStrength?: 'strong' | 'moderate' | 'weak';
}

export interface Document {
  id: string;
  title: string;
  type: 'google-doc' | 'email' | 'spreadsheet';
  source: 'drive' | 'gmail';
  date: string;
  summary: string;
  content: string;
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
