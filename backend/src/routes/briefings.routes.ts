import express from 'express';
import { generateBriefing } from '../services/ai/gemini.service';

const router = express.Router();

// Mock demo data for briefings
const mockDemoDocuments = [
  {
    id: 'doc-001',
    title: 'Freshers Week Planning',
    summary: 'Comprehensive plan for Freshers Week',
    content: 'Freshers Week budget: €400.',
  },
];

const mockDemoEvents = [
  {
    id: 'event-001',
    title: 'Freshers Week 2024',
    description: 'Welcome event for new students',
    metrics: { attendance: 75, budget: { actual: 380 } },
    people: { organisers: ['Abdul Wadood'] },
  },
];

const mockDemoContacts = [
  {
    id: 'contact-001',
    name: 'Bite Box',
    metadata: { notes: 'Halal catering service' },
  },
];

// Store generated briefings in memory (demo)
const briefingsStore: Map<string, any> = new Map();

// Get all briefings
router.get('/', (req, res) => {
  const briefings = Array.from(briefingsStore.values());
  res.json(briefings);
});

// Get a specific briefing
router.get('/:id', (req, res) => {
  const briefing = briefingsStore.get(req.params.id);

  if (!briefing) {
    return res.status(404).json({ error: 'Briefing not found' });
  }

  res.json(briefing);
});

// Generate a new briefing for a role
router.post('/generate', async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  try {
    console.log(`📋 Generating briefing for ${role}...`);

    // Combine all available knowledge
    const documents = [
      ...mockDemoDocuments.map((d: any) => ({
        id: d.id,
        title: d.title,
        summary: d.summary,
        content: d.content,
      })),
      ...mockDemoEvents.map((e: any) => ({
        id: e.id,
        title: e.title,
        summary: e.description,
        content: `${e.description}. Attendance: ${e.metrics?.attendance || 0}. Budget: €${e.metrics?.budget?.actual || 0}. Organized by: ${(e.people?.organisers || []).join(', ')}`,
      })),
      ...mockDemoContacts.map((c: any) => ({
        id: c.id,
        title: c.name,
        summary: c.metadata?.notes,
        content: `${c.metadata?.notes || ''}`,
      })),
    ];

    const content = await generateBriefing(role, documents);

    const briefing = {
      id: `briefing-${Date.now()}`,
      role,
      generatedAt: new Date().toISOString(),
      content,
    };

    // Store the briefing
    briefingsStore.set(briefing.id, briefing);

    console.log(`✅ Briefing generated for ${role}`);
    res.status(201).json(briefing);
  } catch (error) {
    console.error('Briefing generation error:', error);
    res.status(500).json({
      error: 'Failed to generate briefing',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

export default router;
