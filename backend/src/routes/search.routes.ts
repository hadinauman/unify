import express from 'express';
import { demoEvents, demoDocuments, demoContacts } from '../services/demoData';
import { generateSearchSummary } from '../services/ai/gemini.service';
import { SearchResult, SearchResponse } from '../types';

const router = express.Router();

router.post('/', async (req, res) => {
  const { query, filters } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    console.log(`🔍 Search query: "${query}"`);

    // Simple keyword search across demo data
    const searchTerm = query.toLowerCase();

    // Search documents
    const matchingDocs = demoDocuments.filter(
      (doc) =>
        doc.title.toLowerCase().includes(searchTerm) ||
        doc.summary.toLowerCase().includes(searchTerm) ||
        doc.content.toLowerCase().includes(searchTerm) ||
        doc.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );

    // Search events
    const matchingEvents = demoEvents.filter(
      (event) =>
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm) ||
        event.tags.some((tag) => tag.toLowerCase().includes(searchTerm)) ||
        event.organizers.some((org) => org.toLowerCase().includes(searchTerm)) ||
        event.vendors.some((vendor) => vendor.toLowerCase().includes(searchTerm))
    );

    // Search contacts
    const matchingContacts = demoContacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm) ||
        contact.description.toLowerCase().includes(searchTerm) ||
        contact.notes.toLowerCase().includes(searchTerm) ||
        contact.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
    );

    // Combine into search results
    const allResults: SearchResult[] = [
      ...matchingDocs.map((doc) => ({
        id: doc.id,
        type: 'document' as const,
        title: doc.title,
        excerpt: doc.summary,
        source: {
          type: doc.type,
          platform: doc.source,
          date: doc.date,
        },
        relevanceScore: 90,
        relatedEntities: {
          events: doc.relatedEvents,
          tags: doc.tags,
        },
      })),
      ...matchingEvents.map((event) => ({
        id: event.id,
        type: 'event' as const,
        title: event.title,
        excerpt: event.description,
        source: {
          type: 'event',
          platform: 'calendar',
          date: event.date,
        },
        relevanceScore: 85,
        relatedEntities: {
          people: event.organizers,
          vendors: event.vendors,
          tags: event.tags,
        },
      })),
      ...matchingContacts.map((contact) => ({
        id: contact.id,
        type: 'contact' as const,
        title: contact.name,
        excerpt: contact.description,
        source: {
          type: contact.type,
          platform: 'contacts',
          date: contact.lastContactedAt || '',
        },
        relevanceScore: 80,
        relatedEntities: {
          events: contact.eventsUsed,
          tags: contact.tags,
        },
      })),
    ];

    // Sort by relevance score
    allResults.sort((a, b) => b.relevanceScore - a.relevanceScore);

    // Generate AI summary using Gemini
    let aiSummary = null;
    if (allResults.length > 0) {
      console.log(`🤖 Generating AI summary with Gemini...`);
      try {
        aiSummary = await generateSearchSummary(
          query,
          allResults.map((r) => ({
            id: r.id,
            title: r.title,
            summary: r.excerpt,
            content: r.excerpt,
          }))
        );
        console.log(`✅ AI summary generated (confidence: ${aiSummary.confidence})`);
      } catch (err) {
        console.log(`⚠️ AI summary generation failed, returning results without summary`);
      }
    }

    const response: SearchResponse = {
      query,
      aiSummary,
      results: allResults,
      total: allResults.length,
    };

    res.json(response);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      error: 'Search failed',
      details: error instanceof Error ? error.message : 'Unknown error',
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
