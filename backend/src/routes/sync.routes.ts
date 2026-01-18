import { Router } from 'express';
import {
  performSync,
  getSyncStatus,
  getSyncedEvents,
  getSyncedContacts,
  getSyncedInsights,
  getSyncedData,
} from '../services/sync/sync.service';
import { isConnected } from '../services/google/oauth.service';

const router = Router();

// Get sync status
router.get('/status', (req, res) => {
  const connected = isConnected();
  const status = getSyncStatus();

  res.json({
    connected,
    ...status,
  });
});

// Trigger a sync
router.post('/trigger', async (req, res) => {
  console.log('📡 Sync triggered via API');

  // Start sync in background
  performSync()
    .then(result => {
      console.log('Sync result:', result);
    })
    .catch(err => {
      console.error('Sync error:', err);
    });

  // Return immediately with status
  res.json({
    message: 'Sync started',
    status: 'syncing',
  });
});

// Wait for sync to complete (polling endpoint)
router.get('/wait', async (req, res) => {
  const maxWait = 60000; // 60 seconds max
  const startTime = Date.now();

  const checkStatus = async (): Promise<void> => {
    const status = getSyncStatus();

    if (status.status === 'completed' || status.status === 'error') {
      res.json(status);
      return;
    }

    if (Date.now() - startTime > maxWait) {
      res.json({ ...status, timeout: true });
      return;
    }

    // Check again in 1 second
    await new Promise(resolve => setTimeout(resolve, 1000));
    return checkStatus();
  };

  await checkStatus();
});

// Get synced events
router.get('/events', (req, res) => {
  const events = getSyncedEvents();
  res.json(events);
});

// Get synced contacts
router.get('/contacts', (req, res) => {
  const contacts = getSyncedContacts();
  res.json(contacts);
});

// Get synced insights
router.get('/insights', (req, res) => {
  const insights = getSyncedInsights();
  res.json(insights);
});

// Get all synced data
router.get('/all', (req, res) => {
  const data = getSyncedData();
  res.json({
    events: getSyncedEvents(),
    contacts: getSyncedContacts(),
    insights: data.insights,
    lastSyncAt: data.lastSyncAt,
    status: data.syncStatus,
  });
});

export default router;
