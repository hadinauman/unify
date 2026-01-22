import express from 'express';
import { DatabaseService } from '../services/database.service';
import { generateSearchSummary, hasGeminiKey, generateContextualAnswer } from '../services/ai/gemini.service';
import { SearchResult, SearchResponse, Event, Contact, Document } from '../types';

const router = express.Router();

// Mock data for TCD MSA testing
const mockDemoEvents: Event[] = [
  {
    id: 'event-001',
    organisationId: 'org-demo-tcd-msa',
    title: 'Freshers Week 2024',
    description: 'Welcome event for new students',
    startDate: '2024-09-12',
    type: 'social',
    metrics: { attendance: 75, budget: { planned: 400, actual: 380 } },
    people: { organisers: ['Abdul Wadood'], vendors: ['Bite Box'] },
    outcomes: { successFactors: ['Great turnout', 'Excellent catering'] },
    tags: ['freshers', 'social'],
    updatedAt: '2024-09-12T00:00:00Z',
  },
  {
    id: 'event-002',
    organisationId: 'org-demo-tcd-msa',
    title: 'Charity Week 2024',
    description: 'Annual fundraising week',
    startDate: '2024-11-18',
    endDate: '2024-11-24',
    type: 'fundraiser',
    metrics: { attendance: 120, fundraising: 8500, budget: { planned: 600, actual: 575 } },
    people: { organisers: ['Ameera Saeed'], vendors: ['Bite Box'] },
    outcomes: { successFactors: ['Exceeded target - raised €8,500'] },
    tags: ['fundraising', 'charity'],
    updatedAt: '2024-11-24T00:00:00Z',
  },
];

const mockDemoContacts: Contact[] = [
  {
    id: 'contact-001',
    organisationId: 'org-demo-tcd-msa',
    name: 'Bite Box',
    type: 'vendor',
    contactInfo: { email: 'info@biteboxdublin.ie', phone: '01 616 5877' },
    metadata: { services: ['Halal catering'], pricing: '10% student discount', notes: 'Very reliable' },
    interactions: { eventsInvolved: ['event-001', 'event-002'], frequency: 'regular', relationshipStrength: 'strong' },
    rating: 5,
    tags: ['catering', 'halal'],
    updatedAt: '2024-11-24T00:00:00Z',
  },
];

const mockDemoDocuments: Document[] = [
  {
    id: 'doc-001',
    organisationId: 'org-demo-tcd-msa',
    title: 'Freshers Week Planning',
    type: 'google-doc',
    source: 'drive',
    date: '2024-08-15',
    summary: 'Comprehensive plan for Freshers Week',
    content: 'Freshers Week budget: €400. Catering: Bite Box.',
    relatedEvents: ['event-001'],
    tags: ['planning', 'freshers'],
  },
];

router.post('/', async (req, res) => {
  let query = '';

  try {
    query = req.body?.query || '';
    const organisationId = req.body?.organisationId || '';

    if (!query || typeof query !== 'string') {
      return res.status(400).json({
        error: 'Query is required',
        query: '',
        results: [],
        total: 0,
        aiSummary: null,
      });
    }

    console.log(`🔍 Search query: "${query}" for org: ${organisationId || 'demo'}`);

    // Determine what data to search
    let eventsToSearch: Event[] = [];
    let documentsToSearch: Document[] = [];
    let contactsToSearch: Contact[] = [];

    // If organisation ID is provided and it's NOT the demo TCD MSA org, fetch real data from database
    if (organisationId && organisationId !== 'org-demo-tcd-msa' && organisationId !== 'demo') {
      try {
        eventsToSearch = await DatabaseService.getEvents(organisationId);
        documentsToSearch = await DatabaseService.getDocuments(organisationId);
        contactsToSearch = await DatabaseService.getContacts(organisationId);
        console.log(`📊 Using database data for org ${organisationId}`);
      } catch (err) {
        console.warn(`Could not fetch org data, falling back to empty results`, err);
        eventsToSearch = [];
        documentsToSearch = [];
        contactsToSearch = [];
      }
    } else if (organisationId === 'org-demo-tcd-msa' || organisationId === 'demo') {
      // Use mock data for TCD MSA testing
      eventsToSearch = mockDemoEvents;
      documentsToSearch = mockDemoDocuments;
      contactsToSearch = mockDemoContacts;
      console.log(`📚 Using mock data for TCD MSA`);
    }

    // Simple keyword search
    const searchTerm = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search documents
    try {
      if (Array.isArray(documentsToSearch)) {
        const matchingDocs = documentsToSearch.filter((doc) => {
          if (!doc) return false;
          return (
            (doc.title && doc.title.toLowerCase().includes(searchTerm)) ||
            (doc.summary && doc.summary.toLowerCase().includes(searchTerm)) ||
            (doc.content && doc.content.toLowerCase().includes(searchTerm)) ||
            (Array.isArray(doc.tags) && doc.tags.some((tag) => tag && tag.toLowerCase().includes(searchTerm)))
          );
        });

        matchingDocs.forEach((doc) => {
          if (doc && doc.id && doc.title) {
            allResults.push({
              id: doc.id,
              type: 'document' as const,
              title: doc.title || '',
              excerpt: doc.summary || '',
              source: {
                type: doc.type || 'document',
                platform: doc.source || 'unknown',
                date: doc.date || '',
              },
              relevanceScore: 90,
              url: doc.url,
              relatedEntities: {
                events: Array.isArray(doc.relatedEvents) ? doc.relatedEvents : [],
                tags: Array.isArray(doc.tags) ? doc.tags : [],
              },
            });
          }
        });
      }
    } catch (err) {
      console.error('Error searching documents:', err);
    }

    // Search events
    try {
      if (Array.isArray(eventsToSearch)) {
        const matchingEvents = eventsToSearch.filter((event) => {
          if (!event) return false;
          return (
            (event.title && event.title.toLowerCase().includes(searchTerm)) ||
            (event.description && event.description.toLowerCase().includes(searchTerm)) ||
            (Array.isArray(event.tags) && event.tags.some((tag) => tag && tag.toLowerCase().includes(searchTerm))) ||
            (event.people?.organisers && Array.isArray(event.people.organisers) && event.people.organisers.some((org: string) => org && org.toLowerCase().includes(searchTerm))) ||
            (event.people?.vendors && Array.isArray(event.people.vendors) && event.people.vendors.some((vendor: string) => vendor && vendor.toLowerCase().includes(searchTerm)))
          );
        });

        matchingEvents.forEach((event) => {
          if (event && event.id && event.title) {
            allResults.push({
              id: event.id,
              type: 'event' as const,
              title: event.title || '',
              excerpt: event.description || '',
              source: {
                type: 'event',
                platform: 'calendar',
                date: event.startDate || '',
              },
              relevanceScore: 85,
              relatedEntities: {
                people: event.people?.organisers || [],
                vendors: event.people?.vendors || [],
                tags: Array.isArray(event.tags) ? event.tags : [],
              },
            });
          }
        });
      }
    } catch (err) {
      console.error('Error searching events:', err);
    }

    // Search contacts
    try {
      if (Array.isArray(contactsToSearch)) {
        const matchingContacts = contactsToSearch.filter((contact) => {
          if (!contact) return false;
          return (
            (contact.name && contact.name.toLowerCase().includes(searchTerm)) ||
            (contact.metadata?.notes && contact.metadata.notes.toLowerCase().includes(searchTerm)) ||
            (Array.isArray(contact.tags) && contact.tags.some((tag) => tag && tag.toLowerCase().includes(searchTerm)))
          );
        });

        matchingContacts.forEach((contact) => {
          if (contact && contact.id && contact.name) {
            allResults.push({
              id: contact.id,
              type: 'contact' as const,
              title: contact.name || '',
              excerpt: contact.metadata?.notes || '',
              source: {
                type: contact.type || 'contact',
                platform: 'contacts',
                date: contact.interactions?.lastContactDate || '',
              },
              relevanceScore: 80,
              relatedEntities: {
                events: contact.interactions?.eventsInvolved || [],
                tags: Array.isArray(contact.tags) ? contact.tags : [],
              },
            });
          }
        });
      }
    } catch (err) {
      console.error('Error searching contacts:', err);
    }

    // Sort by relevance score
    allResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Generate AI contextual answer using Gemini
    let aiSummary = null;
    let contextualAnswer = null;

    if (allResults.length > 0) {
      try {
        if (hasGeminiKey()) {
          console.log(`🤖 Generating contextual answer with Gemini...`);

          // Generate conversational answer
          contextualAnswer = await generateContextualAnswer(
            query,
            allResults.slice(0, 15).map((r) => ({
              id: r.id,
              title: r.title,
              summary: r.excerpt,
              content: r.excerpt,
            }))
          );
          console.log(`✅ Contextual answer generated`);

          // Also generate structured summary for insights
          aiSummary = await generateSearchSummary(
            query,
            allResults.slice(0, 10).map((r) => ({
              id: r.id,
              title: r.title,
              summary: r.excerpt,
              content: r.excerpt,
            }))
          );
        }
      } catch (err) {
        console.log(`⚠️ AI generation skipped:`, err instanceof Error ? err.message : 'Unknown error');
      }
    }

    const response: SearchResponse = {
      query,
      aiSummary,
      contextualAnswer: contextualAnswer || undefined,
      results: allResults,
      total: allResults.length,
    };

    console.log(`✅ Search completed: ${allResults.length} results`);
    return res.json(response);
  } catch (error) {
    console.error('❌ Search error:', error);
    
    // Always return a valid response
    return res.status(500).json({
      error: 'Search failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      query: query || '',
      results: [],
      total: 0,
      aiSummary: null,
    });
  }
});

// Quick suggestions endpoint
router.get('/suggestions', (req, res) => {
  const suggestions = [
    'How did we organize Freshers Week?',
    'Who is our caterer?',
    'What was the budget for Charity Week?',
    'When are Roots classes?',
    'Speaker contacts for events',
    'Collaboration with TSAS',
    'Ramadan iftar planning',
    'Venue booking process',
  ];

  res.json({ suggestions });
});

export default router;
