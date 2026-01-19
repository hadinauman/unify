import type {
  Event,
  SearchResults,
  SearchFilters,
  Briefing,
  Contact,
  ContactFilters,
  GraphData,
  Organisation,
  DataSource,
} from '@/types';

// Base configuration
// Always use relative URLs to go through Next.js API routes
// The Next.js API routes will use NEXT_PUBLIC_API_URL from .env.local to proxy to backend
const API_BASE_URL = '';

// Helper function for authenticated requests
async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> {
  // Get token from Clerk - this will be implemented when Clerk is set up
  // For now, we'll use a placeholder
  const token = ''; // await getAuthToken();

  const url = API_BASE_URL ? `${API_BASE_URL}${endpoint}` : endpoint;
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers || {}),
    },
  });
}

export const api = {
  // Events
  async getTimelineEvents(year?: number): Promise<Event[]> {
    const url = year ? `/api/events?year=${year}` : '/api/events';
    const res = await fetchWithAuth(url);
    if (!res.ok) throw new Error('Failed to fetch events');
    return res.json();
  },

  async getEventDetails(eventId: string): Promise<Event> {
    const res = await fetchWithAuth(`/api/events/${eventId}`);
    if (!res.ok) throw new Error('Failed to fetch event details');
    return res.json();
  },

  async createEvent(event: Partial<Event>): Promise<Event> {
    const res = await fetchWithAuth('/api/events', {
      method: 'POST',
      body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error('Failed to create event');
    return res.json();
  },

  async updateEvent(eventId: string, event: Partial<Event>): Promise<Event> {
    const res = await fetchWithAuth(`/api/events/${eventId}`, {
      method: 'PATCH',
      body: JSON.stringify(event),
    });
    if (!res.ok) throw new Error('Failed to update event');
    return res.json();
  },

  async deleteEvent(eventId: string): Promise<void> {
    const res = await fetchWithAuth(`/api/events/${eventId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete event');
  },

  // Search
  async searchKnowledge(
    query: string,
    filters?: SearchFilters
  ): Promise<SearchResults> {
    try {
      const res = await fetchWithAuth('/api/search', {
        method: 'POST',
        body: JSON.stringify({ query, filters }),
      });
      
      if (!res.ok) {
        let errorMessage = `Search failed (HTTP ${res.status})`;
        try {
          const errorData = await res.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
          console.error('[API] Search error response:', errorData);
        } catch (e) {
          // If response is not JSON, try to get text
          try {
            const errorText = await res.text();
            errorMessage = errorText || res.statusText || errorMessage;
          } catch {
            errorMessage = res.statusText || `HTTP ${res.status}: Failed to search`;
          }
        }
        console.error('[API] Search failed:', errorMessage, 'Status:', res.status);
        throw new Error(errorMessage);
      }
      
      return res.json();
    } catch (error) {
      // Re-throw with more context if it's not already an Error
      if (error instanceof Error) {
        throw error;
      }
      throw new Error(`Search failed: ${String(error)}`);
    }
  },

  // Briefings
  async generateBriefing(role: string): Promise<Briefing> {
    const res = await fetchWithAuth('/api/briefings/generate', {
      method: 'POST',
      body: JSON.stringify({ role }),
    });
    if (!res.ok) throw new Error('Failed to generate briefing');
    return res.json();
  },

  async getBriefings(): Promise<Briefing[]> {
    const res = await fetchWithAuth('/api/briefings');
    if (!res.ok) throw new Error('Failed to fetch briefings');
    return res.json();
  },

  async getBriefing(briefingId: string): Promise<Briefing> {
    const res = await fetchWithAuth(`/api/briefings/${briefingId}`);
    if (!res.ok) throw new Error('Failed to fetch briefing');
    return res.json();
  },

  // Contacts
  async getContacts(filters?: ContactFilters): Promise<Contact[]> {
    const params = new URLSearchParams();
    if (filters?.type?.length) params.append('type', filters.type.join(','));
    if (filters?.rating) params.append('rating', filters.rating.toString());
    if (filters?.archived !== undefined)
      params.append('archived', filters.archived.toString());

    const url = `/api/contacts${params.toString() ? `?${params}` : ''}`;
    const res = await fetchWithAuth(url);
    if (!res.ok) throw new Error('Failed to fetch contacts');
    return res.json();
  },

  async getContact(contactId: string): Promise<Contact> {
    const res = await fetchWithAuth(`/api/contacts/${contactId}`);
    if (!res.ok) throw new Error('Failed to fetch contact');
    return res.json();
  },

  async createContact(contact: Partial<Contact>): Promise<Contact> {
    const res = await fetchWithAuth('/api/contacts', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error('Failed to create contact');
    return res.json();
  },

  async updateContact(
    contactId: string,
    contact: Partial<Contact>
  ): Promise<Contact> {
    const res = await fetchWithAuth(`/api/contacts/${contactId}`, {
      method: 'PATCH',
      body: JSON.stringify(contact),
    });
    if (!res.ok) throw new Error('Failed to update contact');
    return res.json();
  },

  async deleteContact(contactId: string): Promise<void> {
    const res = await fetchWithAuth(`/api/contacts/${contactId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete contact');
  },

  // Knowledge Graph
  async getKnowledgeGraph(): Promise<GraphData> {
    const res = await fetchWithAuth('/api/graph');
    if (!res.ok) throw new Error('Failed to fetch knowledge graph');
    return res.json();
  },

  // Data Sources
  async connectSource(platform: string): Promise<{ authUrl: string }> {
    const res = await fetchWithAuth(`/api/auth/connect/${platform}`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to initiate connection');
    return res.json();
  },

  async handleOAuthCallback(platform: string, code: string): Promise<void> {
    const res = await fetchWithAuth(`/api/auth/callback/${platform}`, {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
    if (!res.ok) throw new Error('Failed to complete OAuth');
  },

  async getDataSources(): Promise<DataSource[]> {
    const res = await fetchWithAuth('/api/datasources');
    if (!res.ok) throw new Error('Failed to fetch data sources');
    return res.json();
  },

  async disconnectSource(sourceId: string): Promise<void> {
    const res = await fetchWithAuth(`/api/datasources/${sourceId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to disconnect source');
  },

  async syncSource(sourceId: string): Promise<void> {
    const res = await fetchWithAuth(`/api/datasources/${sourceId}/sync`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to trigger sync');
  },

  // Organisation
  async getOrganisation(): Promise<Organisation> {
    const res = await fetchWithAuth('/api/organization');
    if (!res.ok) throw new Error('Failed to fetch organisation');
    return res.json();
  },

  async updateOrganisation(
    data: Partial<Organisation>
  ): Promise<Organisation> {
    const res = await fetchWithAuth('/api/organization', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update organisation');
    return res.json();
  },
};
