import express from 'express';
import { getSyncedEvents } from '../services/sync/sync.service';

const router = express.Router();

// Mock events data for demo/testing
const mockDemoEvents = [
  {
    id: 'event-001',
    title: 'Freshers Week 2024',
    startDate: '2024-09-12',
    type: 'social',
    metrics: { attendance: 75 },
    tags: ['freshers', 'social'],
  },
  {
    id: 'event-002',
    title: 'Charity Week 2024',
    startDate: '2024-11-18',
    endDate: '2024-11-24',
    type: 'fundraiser',
    metrics: { attendance: 120 },
    tags: ['fundraising', 'charity'],
  },
];

const mockDemoStatistics = {
  totalEvents: 2,
  avgAttendance: 97,
  totalFundraisingRaised: 8500,
  avgRating: 4.5,
};

// Get all events with optional filters
router.get('/', (req, res) => {
  const { year, type, semester, source } = req.query;

  // Combine mock demo events with synced events
  const syncedEvents = getSyncedEvents();
  let filtered = [...mockDemoEvents, ...syncedEvents];

  // Filter by source if specified
  if (source === 'synced') {
    filtered = syncedEvents;
  } else if (source === 'demo') {
    filtered = [...mockDemoEvents];
  }

  if (year) {
    filtered = filtered.filter((e) => {
      const dateField = 'startDate' in e ? e.startDate : (e as any).date;
      return dateField?.startsWith(year as string);
    });
  }

  if (type && type !== 'all') {
    filtered = filtered.filter((e) => e.type === type);
  }

  if (semester && semester !== 'all') {
    filtered = filtered.filter((e) => 'semester' in e && (e as any).semester === semester);
  }

  // Sort by date descending (most recent first)
  filtered.sort((a, b) => {
    const dateA = 'startDate' in a ? a.startDate : (a as any).date;
    const dateB = 'startDate' in b ? b.startDate : (b as any).date;
    return new Date(dateB).getTime() - new Date(dateA).getTime();
  });

  res.json(filtered);
});

// Get event statistics
router.get('/stats', (req, res) => {
  res.json(mockDemoStatistics);
});

// Get single event by ID
router.get('/:id', (req, res) => {
  const event = mockDemoEvents.find((e) => e.id === req.params.id);

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
  const event = mockDemoEvents.find((e: any) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const updatedEvent = { ...event, ...req.body };
  console.log('📝 Event updated (demo mode):', updatedEvent.title);
  res.json(updatedEvent);
});

// Delete event (demo - just returns success)
router.delete('/:id', (req, res) => {
  const event = mockDemoEvents.find((e: any) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  console.log('🗑️ Event deleted (demo mode):', event.title);
  res.json({ success: true, message: 'Event deleted' });
});

export default router;
