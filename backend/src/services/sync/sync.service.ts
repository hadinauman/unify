// Main Sync Service
// Orchestrates fetching, filtering, and storing ISOC/MSA data from Google

import { fetchGmailMessages, getEmailContent } from '../google/gmail.service';
import { fetchDriveFiles } from '../google/drive.service';
import { filterContent, ISOC_MSA_KEYWORDS } from './content-filter.service';
import { extractDataWithAI, ExtractedEvent, ExtractedContact } from './ai-extractor.service';
import { isConnected } from '../google/oauth.service';

// In-memory storage for synced data (would be database in production)
interface SyncedData {
  events: ExtractedEvent[];
  contacts: ExtractedContact[];
  insights: string[];
  lastSyncAt: string;
  syncStatus: 'idle' | 'syncing' | 'completed' | 'error';
  syncProgress: {
    current: number;
    total: number;
    phase: string;
  };
}

let syncedData: SyncedData = {
  events: [],
  contacts: [],
  insights: [],
  lastSyncAt: '',
  syncStatus: 'idle',
  syncProgress: { current: 0, total: 0, phase: '' },
};

export function getSyncedData(): SyncedData {
  return syncedData;
}

export function getSyncStatus() {
  return {
    status: syncedData.syncStatus,
    lastSyncAt: syncedData.lastSyncAt,
    progress: syncedData.syncProgress,
    stats: {
      events: syncedData.events.length,
      contacts: syncedData.contacts.length,
      insights: syncedData.insights.length,
    },
  };
}

export async function performSync(): Promise<{
  success: boolean;
  message: string;
  stats: { events: number; contacts: number; insights: number };
}> {
  if (!isConnected()) {
    return {
      success: false,
      message: 'Google account not connected',
      stats: { events: 0, contacts: 0, insights: 0 },
    };
  }

  if (syncedData.syncStatus === 'syncing') {
    return {
      success: false,
      message: 'Sync already in progress',
      stats: { events: 0, contacts: 0, insights: 0 },
    };
  }

  try {
    syncedData.syncStatus = 'syncing';
    syncedData.syncProgress = { current: 0, total: 100, phase: 'Starting...' };

    console.log('🔄 Starting ISOC/MSA data sync...');

    // Phase 1: Fetch emails
    syncedData.syncProgress = { current: 10, total: 100, phase: 'Fetching emails...' };
    console.log('📧 Fetching Gmail messages...');

    const emails = await fetchGmailMessages(50); // Get more emails
    console.log(`📬 Found ${emails.length} emails`);

    // Phase 2: Filter for relevant content
    syncedData.syncProgress = { current: 20, total: 100, phase: 'Filtering content...' };
    console.log('🔍 Filtering for ISOC/MSA content...');

    const relevantEmails: Array<{
      id: string;
      subject: string;
      from: string;
      date: string;
      content: string;
      relevance: number;
    }> = [];

    for (let i = 0; i < emails.length; i++) {
      const email = emails[i];
      const filterResult = filterContent(
        `${email.subject} ${email.snippet}`,
        email.from
      );

      if (filterResult.isRelevant) {
        // Fetch full content for relevant emails
        try {
          const content = await getEmailContent(email.id);
          relevantEmails.push({
            id: email.id,
            subject: email.subject,
            from: email.from,
            date: email.date,
            content,
            relevance: filterResult.relevanceScore,
          });
          console.log(`✅ Relevant: "${email.subject}" (score: ${filterResult.relevanceScore})`);
        } catch (err) {
          console.log(`⚠️ Could not fetch content for: ${email.subject}`);
        }
      }

      syncedData.syncProgress = {
        current: 20 + Math.floor((i / emails.length) * 30),
        total: 100,
        phase: `Filtering emails (${i + 1}/${emails.length})...`,
      };
    }

    console.log(`📊 Found ${relevantEmails.length} relevant emails`);

    // Phase 3: AI extraction
    syncedData.syncProgress = { current: 50, total: 100, phase: 'Extracting data with AI...' };
    console.log('🤖 Extracting data with AI...');

    const allEvents: ExtractedEvent[] = [];
    const allContacts: ExtractedContact[] = [];
    const allInsights: string[] = [];

    for (let i = 0; i < relevantEmails.length; i++) {
      const email = relevantEmails[i];

      try {
        const result = await extractDataWithAI(
          email.content,
          email.subject,
          email.from,
          email.date
        );

        if (result.events.length > 0) {
          console.log(`📅 Found ${result.events.length} events in: ${email.subject}`);
          allEvents.push(...result.events);
        }

        if (result.contacts.length > 0) {
          console.log(`👤 Found ${result.contacts.length} contacts in: ${email.subject}`);
          allContacts.push(...result.contacts);
        }

        if (result.keyInsights.length > 0) {
          allInsights.push(...result.keyInsights);
        }

        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 300));
      } catch (err) {
        console.error(`Failed to extract from: ${email.subject}`, err);
      }

      syncedData.syncProgress = {
        current: 50 + Math.floor((i / relevantEmails.length) * 40),
        total: 100,
        phase: `AI extraction (${i + 1}/${relevantEmails.length})...`,
      };
    }

    // Phase 4: Fetch Drive files
    syncedData.syncProgress = { current: 90, total: 100, phase: 'Checking Drive files...' };
    console.log('📁 Checking Google Drive...');

    try {
      const files = await fetchDriveFiles(20);
      console.log(`📂 Found ${files.length} Drive files`);
      // Could add Drive file processing here
    } catch (err) {
      console.log('⚠️ Could not fetch Drive files');
    }

    // Phase 5: Deduplicate and store
    syncedData.syncProgress = { current: 95, total: 100, phase: 'Saving data...' };

    // Deduplicate contacts by email/name
    const uniqueContacts = allContacts.reduce((acc, contact) => {
      const key = (contact.email || contact.name).toLowerCase();
      if (!acc.has(key) || (contact.confidence > (acc.get(key)?.confidence || 0))) {
        acc.set(key, contact);
      }
      return acc;
    }, new Map<string, ExtractedContact>());

    // Store the data
    syncedData = {
      events: allEvents,
      contacts: Array.from(uniqueContacts.values()),
      insights: [...new Set(allInsights)],
      lastSyncAt: new Date().toISOString(),
      syncStatus: 'completed',
      syncProgress: { current: 100, total: 100, phase: 'Complete!' },
    };

    console.log('');
    console.log('═══════════════════════════════════════════════');
    console.log('  ✅ Sync Complete!');
    console.log('═══════════════════════════════════════════════');
    console.log(`  📅 Events found:    ${syncedData.events.length}`);
    console.log(`  👤 Contacts found:  ${syncedData.contacts.length}`);
    console.log(`  💡 Insights found:  ${syncedData.insights.length}`);
    console.log('═══════════════════════════════════════════════');
    console.log('');

    return {
      success: true,
      message: 'Sync completed successfully',
      stats: {
        events: syncedData.events.length,
        contacts: syncedData.contacts.length,
        insights: syncedData.insights.length,
      },
    };
  } catch (error) {
    console.error('❌ Sync failed:', error);
    syncedData.syncStatus = 'error';
    syncedData.syncProgress = { current: 0, total: 100, phase: 'Error' };

    return {
      success: false,
      message: error instanceof Error ? error.message : 'Unknown error',
      stats: { events: 0, contacts: 0, insights: 0 },
    };
  }
}

// Get synced events formatted for the timeline
export function getSyncedEvents() {
  return syncedData.events.map((event, index) => ({
    id: `synced-${index}`,
    organisationId: 'org-1',
    title: event.title,
    description: event.description,
    date: event.date,
    endDate: event.endDate,
    type: event.type,
    attendance: event.estimatedAttendance,
    budget: {
      planned: event.budget || 0,
      actual: 0,
      breakdown: [],
    },
    rating: Math.round(event.confidence * 5),
    organisers: [],
    vendors: [],
    partners: [],
    successFactors: [],
    challenges: [],
    adviceForNextTime: [],
    tags: event.tags,
    documents: [],
    photos: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: 'google-sync',
    sourceEmail: event.sourceEmail,
  }));
}

// Get synced contacts
export function getSyncedContacts() {
  return syncedData.contacts.map((contact, index) => ({
    id: `synced-contact-${index}`,
    organisationId: 'org-1',
    name: contact.name,
    type: contact.type,
    email: contact.email,
    phone: contact.phone,
    description: contact.description,
    notes: contact.organization ? `Organization: ${contact.organization}` : '',
    rating: Math.round(contact.confidence * 5),
    eventsUsed: [],
    relationshipStrength: contact.confidence > 0.7 ? 'strong' : contact.confidence > 0.4 ? 'moderate' : 'weak',
    tags: contact.tags,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    source: 'google-sync',
  }));
}

// Get insights
export function getSyncedInsights() {
  return syncedData.insights;
}
