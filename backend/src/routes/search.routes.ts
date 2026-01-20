import express from 'express';
import { demoEvents, demoDocuments, demoContacts } from '../services/demoData';
import { generateSearchSummary, hasClaudeKey, generateContextualAnswer } from '../services/ai/claude.service';
import { SearchResult, SearchResponse } from '../types';

const router = express.Router();

router.post('/', async (req, res) => {
  let query = '';
  
  try {
    query = req.body?.query || '';
    
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ 
        error: 'Query is required',
        query: '',
        results: [],
        total: 0,
        aiSummary: null,
      });
    }

    console.log(`🔍 Search query: "${query}"`);

    // Simple keyword search across demo data
    const searchTerm = query.toLowerCase();
    const allResults: SearchResult[] = [];

    // Search documents
    try {
      if (Array.isArray(demoDocuments)) {
        const matchingDocs = demoDocuments.filter((doc) => {
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
      if (Array.isArray(demoEvents)) {
        const matchingEvents = demoEvents.filter((event) => {
          if (!event) return false;
          return (
            (event.title && event.title.toLowerCase().includes(searchTerm)) ||
            (event.description && event.description.toLowerCase().includes(searchTerm)) ||
            (Array.isArray(event.tags) && event.tags.some((tag) => tag && tag.toLowerCase().includes(searchTerm))) ||
            (Array.isArray(event.organizers) && event.organizers.some((org) => org && org.toLowerCase().includes(searchTerm))) ||
            (Array.isArray(event.vendors) && event.vendors.some((vendor) => vendor && vendor.toLowerCase().includes(searchTerm)))
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
                date: event.date || '',
              },
              relevanceScore: 85,
              relatedEntities: {
                people: Array.isArray(event.organizers) ? event.organizers : [],
                vendors: Array.isArray(event.vendors) ? event.vendors : [],
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
      if (Array.isArray(demoContacts)) {
        const matchingContacts = demoContacts.filter((contact) => {
          if (!contact) return false;
          return (
            (contact.name && contact.name.toLowerCase().includes(searchTerm)) ||
            (contact.description && contact.description.toLowerCase().includes(searchTerm)) ||
            (contact.notes && contact.notes.toLowerCase().includes(searchTerm)) ||
            (Array.isArray(contact.tags) && contact.tags.some((tag) => tag && tag.toLowerCase().includes(searchTerm)))
          );
        });

        matchingContacts.forEach((contact) => {
          if (contact && contact.id && contact.name) {
            allResults.push({
              id: contact.id,
              type: 'contact' as const,
              title: contact.name || '',
              excerpt: contact.description || '',
              source: {
                type: contact.type || 'contact',
                platform: 'contacts',
                date: contact.lastContactedAt || '',
              },
              relevanceScore: 80,
              relatedEntities: {
                events: Array.isArray(contact.eventsUsed) ? contact.eventsUsed : [],
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

    // Generate AI contextual answer using Claude
    let aiSummary = null;
    let contextualAnswer = null;

    if (allResults.length > 0) {
      try {
        if (hasClaudeKey()) {
          console.log(`🤖 Generating contextual answer with Claude...`);

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
