import express from 'express';
import {
  getAuthUrl,
  getTokensFromCode,
  getStoredTokens,
  clearStoredTokens,
} from '../services/google/oauth.service';
import { fetchGmailMessages } from '../services/google/gmail.service';
import { fetchDriveFiles } from '../services/google/drive.service';

const router = express.Router();

// Initiate OAuth - returns the URL to redirect user to
router.post('/connect/google', (req, res) => {
  try {
    const authUrl = getAuthUrl();
    console.log('🔗 Generated Google OAuth URL');
    res.json({ authUrl });
  } catch (error) {
    console.error('OAuth init error:', error);
    res.status(500).json({ error: 'Failed to generate auth URL' });
  }
});

// OAuth callback - GET handler for browser redirect from Google
router.get('/callback/google', async (req, res) => {
  const { code, error } = req.query;

  if (error) {
    console.error('OAuth error from Google:', error);
    return res.send(`
      <html>
        <body>
          <h1>Connection Failed</h1>
          <p>Error: ${error}</p>
          <script>window.close();</script>
        </body>
      </html>
    `);
  }

  if (!code || typeof code !== 'string') {
    return res.send(`
      <html>
        <body>
          <h1>Connection Failed</h1>
          <p>No authorization code received</p>
          <script>window.close();</script>
        </body>
      </html>
    `);
  }

  try {
    console.log('🔑 Exchanging code for tokens...');
    const tokens = await getTokensFromCode(code);

    console.log('✅ Google account connected successfully');
    console.log('📧 Fetching sample data to verify connection...');

    // Fetch sample data to show it works
    let emailsFound = 0;
    let filesFound = 0;

    try {
      const emails = await fetchGmailMessages(5);
      emailsFound = emails.length;
      console.log(`📬 Found ${emailsFound} recent emails`);
    } catch (err) {
      console.log('⚠️ Could not fetch emails (might need different scope)');
    }

    try {
      const files = await fetchDriveFiles(5);
      filesFound = files.length;
      console.log(`📁 Found ${filesFound} Drive files`);
    } catch (err) {
      console.log('⚠️ Could not fetch Drive files (might need different scope)');
    }

    // Return a success page that closes itself
    res.send(`
      <html>
        <head>
          <title>Connection Successful</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .card {
              background: white;
              padding: 40px;
              border-radius: 16px;
              text-align: center;
              box-shadow: 0 20px 60px rgba(0,0,0,0.3);
            }
            .success-icon {
              width: 60px;
              height: 60px;
              background: #10B981;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              margin: 0 auto 20px;
            }
            .success-icon svg {
              width: 30px;
              height: 30px;
              fill: white;
            }
            h1 { color: #1F2937; margin: 0 0 10px; }
            p { color: #6B7280; margin: 0; }
            .stats { margin-top: 20px; font-size: 14px; color: #9CA3AF; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="success-icon">
              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            </div>
            <h1>Connected!</h1>
            <p>Google Workspace connected successfully</p>
            <div class="stats">
              Found ${emailsFound} emails and ${filesFound} files
            </div>
            <p style="margin-top: 20px; font-size: 14px;">This window will close automatically...</p>
          </div>
          <script>
            setTimeout(() => window.close(), 2000);
          </script>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.send(`
      <html>
        <body>
          <h1>Connection Failed</h1>
          <p>${error instanceof Error ? error.message : 'Unknown error'}</p>
          <script>setTimeout(() => window.close(), 3000);</script>
        </body>
      </html>
    `);
  }
});

// OAuth callback - POST handler (for API calls)
router.post('/callback/google', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ error: 'Authorization code required' });
  }

  try {
    console.log('🔑 Exchanging code for tokens...');
    const tokens = await getTokensFromCode(code);

    console.log('✅ Google account connected successfully');
    console.log('📧 Fetching sample data to verify connection...');

    // Fetch sample data to show it works
    let emailsFound = 0;
    let filesFound = 0;

    try {
      const emails = await fetchGmailMessages(5);
      emailsFound = emails.length;
      console.log(`📬 Found ${emailsFound} recent emails`);
    } catch (err) {
      console.log('⚠️ Could not fetch emails (might need different scope)');
    }

    try {
      const files = await fetchDriveFiles(5);
      filesFound = files.length;
      console.log(`📁 Found ${filesFound} Drive files`);
    } catch (err) {
      console.log('⚠️ Could not fetch Drive files (might need different scope)');
    }

    res.json({
      success: true,
      message: 'Google account connected successfully',
      preview: {
        emailsFound,
        filesFound,
      },
    });
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({
      error: 'Failed to connect Google account',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Check connection status
router.get('/status/google', (req, res) => {
  const tokens = getStoredTokens();
  res.json({
    connected: !!tokens,
    platform: 'google',
  });
});

// Disconnect Google account
router.delete('/disconnect/google', (req, res) => {
  try {
    clearStoredTokens();
    console.log('🔌 Google account disconnected');
    res.json({ success: true, message: 'Google account disconnected' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to disconnect' });
  }
});

export default router;
