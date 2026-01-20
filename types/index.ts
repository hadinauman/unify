// Core entities

export interface Organisation {
  id: string;
  name: string;
  type: 'isoc' | 'student-org' | 'nonprofit' | 'commercial';
  membersCount: number;
  foundedYear: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  organisationId: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  type: 'fundraiser' | 'social' | 'educational' | 'partnership' | 'administrative';

  // Metrics
  attendance?: number;
  fundraising?: number;
  budget: {
    planned: number;
    actual: number;
    breakdown: { category: string; amount: number }[];
  };
  rating: number; // 1-5

  // Relationships
  organisers: string[]; // User IDs
  vendors: string[]; // Contact IDs
  partners: string[]; // Contact IDs

  // Context
  successFactors: string[];
  challenges: string[];
  adviceForNextTime: string[];
  tags: string[];

  // Resources
  documents: Document[];
  photos: string[];

  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  organisationId: string;
  name: string;
  type: 'vendor' | 'speaker' | 'partner' | 'alumni' | 'staff';

  // Contact info
  email?: string;
  phone?: string;
  website?: string;

  // Context
  description: string;
  notes: string;
  rating: number;

  // Usage
  eventsUsed: string[]; // Event IDs
  lastContactedAt?: string;
  relationshipStrength: 'strong' | 'moderate' | 'weak';

  // Metadata
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Document {
  id: string;
  organisationId: string;
  title: string;
  type: 'email' | 'google-doc' | 'spreadsheet' | 'presentation' | 'pdf' | 'whatsapp';
  source: 'gmail' | 'drive' | 'outlook' | 'onedrive' | 'slack' | 'whatsapp';

  // Content
  summary: string;
  content?: string; // Full text if available
  url?: string; // Link to original

  // Metadata
  author?: string;
  date: string;

  // Relationships
  relatedEvents: string[];
  relatedPeople: string[];
  tags: string[];

  createdAt: string;
}

export interface SearchResult {
  id: string;
  type: 'event' | 'document' | 'contact' | 'decision';
  title: string;
  excerpt: string;
  source: {
    type: string;
    platform: string;
    date: string;
  };
  relevanceScore: number; // 0-100
  relatedEntities: {
    people?: string[];
    events?: string[];
    vendors?: string[];
    tags?: string[];
  };
  url?: string;
}

export interface SearchResults {
  query: string;
  aiSummary?: {
    summary: string;
    keyInsights: string[];
    relatedQueries: string[];
    sources: string[];
    confidence: 'high' | 'medium' | 'low';
  };
  contextualAnswer?: string;
  results: SearchResult[];
  total: number;
}

export interface Briefing {
  id: string;
  role: string;
  generatedAt: string;
  content: string; // Markdown format
}

export interface GraphNode {
  id: string;
  type: 'person' | 'event' | 'organisation' | 'document';
  label: string;
  metadata: Record<string, any>;
}

export interface GraphEdge {
  id: string;
  source: string; // Node ID
  target: string; // Node ID
  type: 'organised' | 'partnered' | 'created' | 'attended';
  label?: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

// API request/response types

export interface SearchFilters {
  source?: string[];
  dateRange?: { from: string; to: string };
  type?: string[];
}

export interface ContactFilters {
  type?: string[];
  rating?: number;
  archived?: boolean;
}

export interface DataSource {
  id: string;
  platform: 'google' | 'microsoft' | 'slack' | 'whatsapp';
  connected: boolean;
  lastSyncAt?: string;
  syncStatus?: 'pending' | 'syncing' | 'completed' | 'error';
  syncProgress?: {
    current: number;
    total: number;
    type: string;
  };
}
