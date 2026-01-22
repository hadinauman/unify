import { createClient } from '@supabase/supabase-js';
import { Event, Contact, Document, Organisation, OrganisationType } from '../types';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export class DatabaseService {

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
      // Build metadata based on organisation type
      const metadata: Record<string, any> = {
        foundedYear: new Date().getFullYear(),
      };

      // Add type-specific fields
      if (type === 'student-isoc-msa' || type === 'student-society') {
        metadata.academicYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
        metadata.membersCount = 0;
      } else if (type === 'consulting-firm' || type === 'creative-agency' || type === 'marketing-agency') {
        metadata.employeeCount = 0;
        metadata.fiscalYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
      } else if (type === 'restaurant' || type === 'retail-store') {
        metadata.staffCount = 0;
        metadata.year = new Date().getFullYear();
      } else if (type === 'franchise' || type === 'sales-team') {
        metadata.teamSize = 0;
        metadata.fiscalYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
      } else if (type === 'nonprofit') {
        metadata.volunteerCount = 0;
        metadata.fiscalYear = `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`;
      } else {
        // Default for 'other' type
        metadata.year = new Date().getFullYear();
      }

      // Build terminology based on organisation type
      const terminologyMap: Record<OrganisationType, any> = {
        'student-society': {
          teamLabel: 'Committee',
          memberLabel: 'Member',
          leaderLabel: 'President',
          eventLabel: 'Event',
          periodLabel: 'Academic Year',
        },
        'student-isoc-msa': {
          teamLabel: 'Committee',
          memberLabel: 'Member',
          leaderLabel: 'President',
          eventLabel: 'Event',
          periodLabel: 'Academic Year',
        },
        'consulting-firm': {
          teamLabel: 'Team',
          memberLabel: 'Employee',
          leaderLabel: 'Director',
          eventLabel: 'Project',
          periodLabel: 'Fiscal Year',
        },
        'creative-agency': {
          teamLabel: 'Team',
          memberLabel: 'Team Member',
          leaderLabel: 'Creative Director',
          eventLabel: 'Campaign',
          periodLabel: 'Fiscal Year',
        },
        'marketing-agency': {
          teamLabel: 'Team',
          memberLabel: 'Team Member',
          leaderLabel: 'Account Manager',
          eventLabel: 'Campaign',
          periodLabel: 'Fiscal Year',
        },
        restaurant: {
          teamLabel: 'Staff',
          memberLabel: 'Staff Member',
          leaderLabel: 'Manager',
          eventLabel: 'Service',
          periodLabel: 'Year',
        },
        'retail-store': {
          teamLabel: 'Staff',
          memberLabel: 'Staff Member',
          leaderLabel: 'Manager',
          eventLabel: 'Event',
          periodLabel: 'Year',
        },
        franchise: {
          teamLabel: 'Team',
          memberLabel: 'Franchise Partner',
          leaderLabel: 'Franchisor',
          eventLabel: 'Initiative',
          periodLabel: 'Fiscal Year',
        },
        'sales-team': {
          teamLabel: 'Team',
          memberLabel: 'Sales Rep',
          leaderLabel: 'Sales Manager',
          eventLabel: 'Deal',
          periodLabel: 'Fiscal Year',
        },
        nonprofit: {
          teamLabel: 'Team',
          memberLabel: 'Volunteer',
          leaderLabel: 'Executive Director',
          eventLabel: 'Initiative',
          periodLabel: 'Fiscal Year',
        },
        other: {
          teamLabel: 'Team',
          memberLabel: 'Member',
          leaderLabel: 'Leader',
          eventLabel: 'Event',
          periodLabel: 'Year',
        },
      };

      const { data, error } = await supabase
        .from('organisations')
        .insert([
          {
            name,
            type,
            created_by_user_id: userId,
            metadata,
            terminology: terminologyMap[type],
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
