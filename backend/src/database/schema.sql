-- Supabase Database Schema for Unify
-- Run these SQL statements in Supabase to create the necessary tables

-- Organisations table
CREATE TABLE IF NOT EXISTS organisations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('student-org', 'nonprofit', 'commercial')),
  members_count INTEGER DEFAULT 0,
  founded_year INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  end_date TIMESTAMP WITH TIME ZONE,
  type TEXT NOT NULL CHECK (type IN ('fundraiser', 'social', 'educational', 'partnership', 'administrative')),
  attendance INTEGER,
  fundraising NUMERIC,
  budget_planned NUMERIC DEFAULT 0,
  budget_actual NUMERIC DEFAULT 0,
  rating NUMERIC CHECK (rating >= 1 AND rating <= 5),
  success_factors TEXT[],
  challenges TEXT[],
  advice TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('vendor', 'speaker', 'partner', 'alumni', 'staff')),
  email TEXT,
  phone TEXT,
  website TEXT,
  description TEXT,
  notes TEXT,
  rating NUMERIC CHECK (rating >= 1 AND rating <= 5),
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  relationship_strength TEXT CHECK (relationship_strength IN ('strong', 'moderate', 'weak')),
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Documents table
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('email', 'google-doc', 'spreadsheet', 'presentation', 'pdf', 'other')),
  source TEXT NOT NULL CHECK (source IN ('gmail', 'drive', 'outlook', 'onedrive', 'slack')),
  summary TEXT,
  content TEXT,
  url TEXT,
  author TEXT,
  date TIMESTAMP WITH TIME ZONE,
  related_events UUID[],
  related_people TEXT[],
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Search results cache table (for quick lookups)
CREATE TABLE IF NOT EXISTS search_results_cache (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organisation_id UUID NOT NULL REFERENCES organisations(id) ON DELETE CASCADE,
  result_id TEXT NOT NULL,
  result_type TEXT NOT NULL CHECK (result_type IN ('event', 'document', 'contact')),
  title TEXT NOT NULL,
  excerpt TEXT,
  source_type TEXT,
  source_platform TEXT,
  source_date TIMESTAMP WITH TIME ZONE,
  relevance_score NUMERIC,
  url TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Event organisers junction table
CREATE TABLE IF NOT EXISTS event_organisers (
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, contact_id)
);

-- Event vendors junction table
CREATE TABLE IF NOT EXISTS event_vendors (
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  contact_id UUID NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  PRIMARY KEY (event_id, contact_id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_organisation_id ON events(organisation_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_contacts_organisation_id ON contacts(organisation_id);
CREATE INDEX IF NOT EXISTS idx_documents_organisation_id ON documents(organisation_id);
CREATE INDEX IF NOT EXISTS idx_documents_date ON documents(date);
CREATE INDEX IF NOT EXISTS idx_search_cache_org_id ON search_results_cache(organisation_id);
CREATE INDEX IF NOT EXISTS idx_search_cache_result_type ON search_results_cache(result_type);

-- Enable RLS (Row Level Security) - optional but recommended for multi-tenant apps
ALTER TABLE organisations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
