import express from 'express';
import { SlackService } from '../services/slack/slack.service';
import { DatabaseService } from '../services/database.service';
import { extractSlackData } from '../services/ai/gemini.service';

const router = express.Router();

// Connect Slack workspace
router.post('/connect', async (req, res) => {
  try {
    const { apiKey, organisationId } = req.body;

    if (!apiKey) {
      return res.status(400).json({ error: 'Slack API key required' });
    }

    if (!organisationId) {
      return res.status(400).json({ error: 'Organisation ID required' });
    }

    console.log(`🔗 Connecting Slack for org: ${organisationId}`);

    // Set the token and verify it
    SlackService.setToken(apiKey);
    const isValid = await SlackService.verifyToken();

    if (!isValid) {
      SlackService.disconnect();
      return res.status(401).json({ error: 'Invalid Slack API key' });
    }

    console.log('✅ Slack API key verified');

    res.json({
      success: true,
      message: 'Slack connected successfully',
      organisationId,
    });
  } catch (error) {
    console.error('❌ Slack connection error:', error);
    res.status(500).json({
      error: 'Failed to connect Slack',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Check Slack connection status
router.get('/status', (req, res) => {
  const connected = SlackService.isConnected();
  res.json({
    connected,
    platform: 'slack',
  });
});

// Sync Slack data and organize with AI
router.post('/sync', async (req, res) => {
  try {
    const { organisationId } = req.body;

    if (!organisationId) {
      return res.status(400).json({ error: 'Organisation ID required' });
    }

    if (!SlackService.isConnected()) {
      return res.status(400).json({ error: 'Slack not connected' });
    }

    console.log(`🔄 Starting Slack sync for org: ${organisationId}`);

    // Fetch all data from Slack
    const { channels, users, messages } = await SlackService.fetchAllData(30);

    console.log(`📊 Processing ${messages.length} messages with AI...`);

    // Group messages by channel for context
    const messagesByChannel: Record<string, string[]> = {};
    channels.forEach(channel => {
      const channelMessages = messages.filter(msg => msg.channel === channel.id);
      messagesByChannel[channel.name] = channelMessages.map(msg => msg.text || '');
    });

    // Use AI to extract and organize data into contacts, events, and insights
    const extractedData = await extractSlackData({
      channels: channels.map(ch => ({
        name: ch.name,
        topic: ch.topic?.value || '',
        purpose: ch.purpose?.value || '',
        messageCount: messagesByChannel[ch.name]?.length || 0,
      })),
      users: users.map(u => ({ id: u.id, name: u.real_name || u.name })),
      messagesByChannel,
      organisationId,
    });

    // Store extracted data in database
    if (extractedData.contacts && extractedData.contacts.length > 0) {
      for (const contact of extractedData.contacts) {
        try {
          // TODO: Add contact to database
          console.log(`👤 Extracted contact: ${contact.name}`);
        } catch (err) {
          console.warn(`Failed to save contact ${contact.name}:`, err);
        }
      }
    }

    if (extractedData.events && extractedData.events.length > 0) {
      for (const event of extractedData.events) {
        try {
          // TODO: Add event to database
          console.log(`📅 Extracted event: ${event.title}`);
        } catch (err) {
          console.warn(`Failed to save event ${event.title}:`, err);
        }
      }
    }

    console.log('✅ Slack sync complete');

    res.json({
      success: true,
      message: 'Slack data synced and organized',
      stats: {
        channels: channels.length,
        users: users.length,
        messages: messages.length,
        extractedContacts: extractedData.contacts?.length || 0,
        extractedEvents: extractedData.events?.length || 0,
      },
    });
  } catch (error) {
    console.error('❌ Slack sync error:', error);
    res.status(500).json({
      error: 'Sync failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Disconnect Slack
router.delete('/disconnect', (req, res) => {
  try {
    SlackService.disconnect();
    console.log('🔌 Slack disconnected');
    res.json({ success: true, message: 'Slack disconnected' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to disconnect Slack' });
  }
});

export default router;
