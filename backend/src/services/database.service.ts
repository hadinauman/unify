import { createClient } from '@supabase/supabase-js';
import { Event, Contact, Document, Organisation, OrganisationType } from '../types';
import { organisationPresets } from '../../organisationPresets';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export class DatabaseService {
  /**
   * Save an event to the database
   */
  static async saveEvent(organisationId: string, event: Event): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .insert([
          {
            organisation_id: organisationId,
            title: event.title,
            description: event.description,
            date: event.date,
            end_date: event.endDate,
            type: event.type,
            attendance: event.attendance,
            budget_planned: event.budget?.planned || 0,
            budget_actual: event.budget?.actual || 0,
            success_factors: event.whatWorked,
            challenges: event.challenges,
            tags: event.tags,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error saving event:', error);
        return null;
      }

      return data as Event;
    } catch (error) {
      console.error('Database error saving event:', error);
      return null;
    }
  }

  /**
   * Save a contact to the database
   */
  static async saveContact(organisationId: string, contact: Contact): Promise<Contact | null> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .insert([
          {
            organisation_id: organisationId,
            name: contact.name,
            type: contact.type,
            email: contact.email,
            phone: contact.phone,
            website: contact.website,
            description: contact.description,
            notes: contact.notes,
            rating: contact.rating,
            last_contacted_at: contact.lastContactedAt,
            relationship_strength: contact.relationshipStrength,
            tags: contact.tags,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error saving contact:', error);
        return null;
      }

      return data as Contact;
    } catch (error) {
      console.error('Database error saving contact:', error);
      return null;
    }
  }

  /**
   * Save a document to the database
   */
  static async saveDocument(organisationId: string, document: Document): Promise<Document | null> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .insert([
          {
            organisation_id: organisationId,
            title: document.title,
            type: document.type,
            source: document.source,
            summary: document.summary,
            content: document.content,
            url: document.url,
            date: document.date,
            related_events: document.relatedEvents,
            tags: document.tags,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error saving document:', error);
        return null;
      }

      return data as Document;
    } catch (error) {
      console.error('Database error saving document:', error);
      return null;
    }
  }

  /**
   * Get all events for an organization
   */
  static async getEvents(organisationId: string): Promise<Event[]> {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organisation_id', organisationId)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching events:', error);
        return [];
      }

      return data as Event[];
    } catch (error) {
      console.error('Database error fetching events:', error);
      return [];
    }
  }

  /**
   * Get all contacts for an organization
   */
  static async getContacts(organisationId: string): Promise<Contact[]> {
    try {
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .eq('organisation_id', organisationId)
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching contacts:', error);
        return [];
      }

      return data as Contact[];
    } catch (error) {
      console.error('Database error fetching contacts:', error);
      return [];
    }
  }

  /**
   * Get all documents for an organization
   */
  static async getDocuments(organisationId: string): Promise<Document[]> {
    try {
      const { data, error } = await supabase
        .from('documents')
        .select('*')
        .eq('organisation_id', organisationId)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching documents:', error);
        return [];
      }

      return data as Document[];
    } catch (error) {
      console.error('Database error fetching documents:', error);
      return [];
    }
  }

  /**
   * Search across documents, events, and contacts
   */
  static async search(
    organisationId: string,
    query: string,
    limit: number = 50
  ): Promise<Array<{ type: 'event' | 'contact' | 'document'; data: Event | Contact | Document }>> {
    const results: Array<{ type: 'event' | 'contact' | 'document'; data: Event | Contact | Document }> = [];

    try {
      const searchTerm = `%${query.toLowerCase()}%`;

      // Search events
      const { data: events, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('organisation_id', organisationId)
        .or(
          `title.ilike.${searchTerm},description.ilike.${searchTerm},tags.cs.${JSON.stringify([query])}`
        )
        .limit(limit / 3);

      if (!eventsError && events) {
        results.push(...events.map((e) => ({ type: 'event' as const, data: e as Event })));
      }

      // Search contacts
      const { data: contacts, error: contactsError } = await supabase
        .from('contacts')
        .select('*')
        .eq('organisation_id', organisationId)
        .or(
          `name.ilike.${searchTerm},description.ilike.${searchTerm},notes.ilike.${searchTerm},tags.cs.${JSON.stringify([query])}`
        )
        .limit(limit / 3);

      if (!contactsError && contacts) {
        results.push(...contacts.map((c) => ({ type: 'contact' as const, data: c as Contact })));
      }

      // Search documents
      const { data: documents, error: documentsError } = await supabase
        .from('documents')
        .select('*')
        .eq('organisation_id', organisationId)
        .or(
          `title.ilike.${searchTerm},summary.ilike.${searchTerm},content.ilike.${searchTerm},tags.cs.${JSON.stringify([query])}`
        )
        .limit(limit / 3);

      if (!documentsError && documents) {
        results.push(...documents.map((d) => ({ type: 'document' as const, data: d as Document })));
      }

      return results;
    } catch (error) {
      console.error('Database search error:', error);
      return [];
    }
  }

  /**
   * Get events by year
   */
  static async getEventsByYear(organisationId: string, year: number): Promise<Event[]> {
    try {
      const startDate = new Date(`${year}-01-01`).toISOString();
      const endDate = new Date(`${year}-12-31T23:59:59`).toISOString();

      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('organisation_id', organisationId)
        .gte('date', startDate)
        .lte('date', endDate)
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching events by year:', error);
        return [];
      }

      return data as Event[];
    } catch (error) {
      console.error('Database error fetching events by year:', error);
      return [];
    }
  }

  /**
   * Delete an event
   */
  static async deleteEvent(eventId: string): Promise<boolean> {
    try {
      const { error } = await supabase.from('events').delete().eq('id', eventId);

      if (error) {
        console.error('Error deleting event:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Database error deleting event:', error);
      return false;
    }
  }

  /**
   * Update an event
   */
  static async updateEvent(eventId: string, updates: Partial<Event>): Promise<Event | null> {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          title: updates.title,
          description: updates.description,
          attendance: updates.attendance,
          budget_planned: updates.budget?.planned,
          budget_actual: updates.budget?.actual,
          tags: updates.tags,
          updated_at: new Date().toISOString(),
        })
        .eq('id', eventId)
        .select()
        .single();

      if (error) {
        console.error('Error updating event:', error);
        return null;
      }

      return data as Event;
    } catch (error) {
      console.error('Database error updating event:', error);
      return null;
    }
  }

  /**
   * Create a user account
   */
  static async createUser(
    email: string,
    name: string,
    googleId?: string
  ): Promise<{ id: string; email: string } | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          {
            email,
            name,
            google_id: googleId,
          },
        ])
        .select('id, email')
        .single();

      if (error) {
        console.error('Error creating user:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Database error creating user:', error);
      return null;
    }
  }

  /**
   * Get or create a user by email
   */
  static async getOrCreateUser(
    email: string,
    name: string,
    googleId?: string
  ): Promise<{ id: string; email: string } | null> {
    try {
      // Try to get existing user
      const { data: existing } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', email)
        .single();

      if (existing) {
        return existing;
      }

      // Create new user if doesn't exist
      return this.createUser(email, name, googleId);
    } catch (error) {
      console.error('Database error getting/creating user:', error);
      return null;
    }
  }

  /**
   * Create a new organisation
   */
  static async createOrganisation(
    userId: string,
    name: string,
    type: OrganisationType
  ): Promise<Organisation | null> {
    try {
      const preset = organisationPresets[type];
      if (!preset) {
        console.error('Invalid organisation type:', type);
        return null;
      }

      const { data, error } = await supabase
        .from('organisations')
        .insert([
          {
            name,
            type,
            created_by_user_id: userId,
            metadata: {
              foundedYear: new Date().getFullYear(),
            },
            terminology: preset.terminology,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error('Error creating organisation:', error);
        return null;
      }

      // Add the creator as an admin member
      await supabase.from('user_organisations').insert([
        {
          user_id: userId,
          organisation_id: data.id,
          role: 'admin',
        },
      ]);

      return data as Organisation;
    } catch (error) {
      console.error('Database error creating organisation:', error);
      return null;
    }
  }

  /**
   * Get an organisation by ID
   */
  static async getOrganisation(organisationId: string): Promise<Organisation | null> {
    try {
      const { data, error } = await supabase
        .from('organisations')
        .select('*')
        .eq('id', organisationId)
        .single();

      if (error) {
        console.error('Error fetching organisation:', error);
        return null;
      }

      return data as Organisation;
    } catch (error) {
      console.error('Database error fetching organisation:', error);
      return null;
    }
  }

  /**
   * Get all organisations for a user
   */
  static async getUserOrganisations(userId: string): Promise<Organisation[]> {
    try {
      const { data, error } = await supabase
        .from('user_organisations')
        .select('organisations(*)')
        .eq('user_id', userId);

      if (error) {
        console.error('Error fetching user organisations:', error);
        return [];
      }

      return data.map((row: any) => row.organisations as Organisation);
    } catch (error) {
      console.error('Database error fetching user organisations:', error);
      return [];
    }
  }

  /**
   * Update an organisation
   */
  static async updateOrganisation(
    organisationId: string,
    updates: Partial<Organisation>
  ): Promise<Organisation | null> {
    try {
      const { data, error } = await supabase
        .from('organisations')
        .update({
          name: updates.name,
          metadata: updates.metadata,
          terminology: updates.terminology,
          updated_at: new Date().toISOString(),
        })
        .eq('id', organisationId)
        .select()
        .single();

      if (error) {
        console.error('Error updating organisation:', error);
        return null;
      }

      return data as Organisation;
    } catch (error) {
      console.error('Database error updating organisation:', error);
      return null;
    }
  }
}
