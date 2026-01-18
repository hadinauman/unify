import express from 'express';
import { demoEvents, demoStatistics } from '../services/demoData';
import { getSyncedEvents } from '../services/sync/sync.service';

const router = express.Router();

// Get all events with optional filters
router.get('/', (req, res) => {
  const { year, type, semester, source } = req.query;

  // Combine demo events with synced events
  const syncedEvents = getSyncedEvents();
  let filtered = [...demoEvents, ...syncedEvents];

  // Filter by source if specified
  if (source === 'synced') {
    filtered = syncedEvents;
  } else if (source === 'demo') {
    filtered = [...demoEvents];
  }

  if (year) {
    filtered = filtered.filter((e) => e.date.startsWith(year as string));
  }

  if (type && type !== 'all') {
    filtered = filtered.filter((e) => e.type === type);
  }

  if (semester && semester !== 'all') {
    filtered = filtered.filter((e) => 'semester' in e && e.semester === semester);
  }

  // Sort by date descending (most recent first)
  filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  res.json(filtered);
});

// Get event statistics
router.get('/stats', (req, res) => {
  res.json(demoStatistics);
});

// Get single event by ID
router.get('/:id', (req, res) => {
  const event = demoEvents.find((e) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  res.json(event);
});

// Create event (demo - just returns the event)
router.post('/', (req, res) => {
  const newEvent = {
    id: `event-${Date.now()}`,
    ...req.body,
  };

  console.log('📅 New event created (demo mode):', newEvent.title);
  res.status(201).json(newEvent);
});

// Update event (demo - just returns the updated event)
router.patch('/:id', (req, res) => {
  const event = demoEvents.find((e) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const updatedEvent = { ...event, ...req.body };
  console.log('📝 Event updated (demo mode):', updatedEvent.title);
  res.json(updatedEvent);
});

// Delete event (demo - just returns success)
router.delete('/:id', (req, res) => {
  const event = demoEvents.find((e) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  console.log('🗑️ Event deleted (demo mode):', event.title);
  res.json({ success: true, message: 'Event deleted' });
});

export default router;
