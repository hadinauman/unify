import express from 'express';
import { demoContacts } from '../services/demoData';
import { getSyncedContacts } from '../services/sync/sync.service';

const router = express.Router();

// Get all contacts with optional filters
router.get('/', (req, res) => {
  const { type, rating, source } = req.query;

  // Combine demo contacts with synced contacts
  const syncedContacts = getSyncedContacts();
  let filtered = [...demoContacts, ...syncedContacts];

  // Filter by source if specified
  if (source === 'synced') {
    filtered = syncedContacts;
  } else if (source === 'demo') {
    filtered = [...demoContacts];
  }

  if (type && type !== 'all') {
    // Support comma-separated types
    const types = (type as string).split(',');
    filtered = filtered.filter((c) => types.includes(c.type));
  }

  if (rating) {
    const minRating = parseInt(rating as string, 10);
    filtered = filtered.filter((c) => c.rating >= minRating);
  }

  // Sort by rating (highest first), then by name
  filtered.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  res.json(filtered);
});

// Get single contact by ID
router.get('/:id', (req, res) => {
  const contact = demoContacts.find((c) => c.id === req.params.id);

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  res.json(contact);
});

// Create contact (demo - just returns the contact)
router.post('/', (req, res) => {
  const newContact = {
    id: `contact-${Date.now()}`,
    ...req.body,
    rating: req.body.rating || 3,
    tags: req.body.tags || [],
    eventsUsed: [],
  };

  console.log('👤 New contact created (demo mode):', newContact.name);
  res.status(201).json(newContact);
});

// Update contact (demo - just returns the updated contact)
router.patch('/:id', (req, res) => {
  const contact = demoContacts.find((c) => c.id === req.params.id);

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  const updatedContact = { ...contact, ...req.body };
  console.log('📝 Contact updated (demo mode):', updatedContact.name);
  res.json(updatedContact);
});

// Delete contact (demo - just returns success)
router.delete('/:id', (req, res) => {
  const contact = demoContacts.find((c) => c.id === req.params.id);

  if (!contact) {
    return res.status(404).json({ error: 'Contact not found' });
  }

  console.log('🗑️ Contact deleted (demo mode):', contact.name);
  res.json({ success: true, message: 'Contact deleted' });
});

export default router;
