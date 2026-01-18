import express from 'express';
import { demoDocuments, demoEvents, demoContacts } from '../services/demoData';
import { generateBriefing } from '../services/ai/gemini.service';

const router = express.Router();

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
      ...demoDocuments.map((d) => ({
        id: d.id,
        title: d.title,
        summary: d.summary,
        content: d.content,
      })),
      ...demoEvents.map((e) => ({
        id: e.id,
        title: e.title,
        summary: e.description,
        content: `${e.description}. Attendance: ${e.attendance}. Budget: €${e.budget.actual}. Organized by: ${e.organizers.join(', ')}`,
      })),
      ...demoContacts.map((c) => ({
        id: c.id,
        title: c.name,
        summary: c.description,
        content: `${c.description}. ${c.notes}`,
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
