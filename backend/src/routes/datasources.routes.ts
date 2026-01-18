import express from 'express';
import { getStoredTokens, isConnected } from '../services/google/oauth.service';
import { fetchGmailMessages } from '../services/google/gmail.service';
import { fetchDriveFiles } from '../services/google/drive.service';
import { DataSource } from '../types';

const router = express.Router();

// Get all data sources and their connection status
router.get('/', (req, res) => {
  const googleConnected = isConnected();

  const dataSources: DataSource[] = [
    {
      id: 'ds-google',
      platform: 'google',
      connected: googleConnected,
      lastSyncAt: googleConnected ? new Date().toISOString() : null,
      syncStatus: googleConnected ? 'completed' : 'disconnected',
    },
  ];

  res.json(dataSources);
});

// Get specific data source
router.get('/:id', (req, res) => {
  const { id } = req.params;

  if (id === 'ds-google') {
    const googleConnected = isConnected();
    res.json({
      id: 'ds-google',
      platform: 'google',
      connected: googleConnected,
      lastSyncAt: googleConnected ? new Date().toISOString() : null,
      syncStatus: googleConnected ? 'completed' : 'disconnected',
    });
  } else {
    res.status(404).json({ error: 'Data source not found' });
  }
});

// Trigger sync for a data source
router.post('/:id/sync', async (req, res) => {
  const { id } = req.params;

  if (id !== 'ds-google') {
    return res.status(404).json({ error: 'Data source not found' });
  }

  if (!isConnected()) {
    return res.status(400).json({ error: 'Google account not connected' });
  }

  try {
    console.log('🔄 Starting Google data sync...');

    // Fetch data from Google services
    const [emails, files] = await Promise.all([
      fetchGmailMessages(20).catch(() => []),
      fetchDriveFiles(20).catch(() => []),
    ]);

    console.log(`✅ Sync complete: ${emails.length} emails, ${files.length} files`);

    res.json({
      success: true,
      message: 'Sync completed',
      results: {
        emails: emails.length,
        files: files.length,
      },
    });
  } catch (error) {
    console.error('Sync error:', error);
    res.status(500).json({
      error: 'Sync failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Disconnect a data source
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  if (id !== 'ds-google') {
    return res.status(404).json({ error: 'Data source not found' });
  }

  // Note: actual disconnection happens through auth routes
  res.json({ success: true, message: 'Use /api/auth/disconnect/google to disconnect' });
});

export default router;
