import { google } from 'googleapis';
import { getAuthClient } from './oauth.service';

interface EmailPreview {
  id: string;
  subject: string;
  from: string;
  date: string;
  snippet?: string;
}

export async function fetchGmailMessages(maxResults = 10): Promise<EmailPreview[]> {
  const auth = getAuthClient();
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const response = await gmail.users.messages.list({
      userId: 'me',
      maxResults,
      q: 'after:2024/01/01', // Recent emails only
    });

    const messages = response.data.messages || [];

    // Fetch details for first few
    const details = await Promise.all(
      messages.slice(0, 5).map(async (msg) => {
        try {
          const detail = await gmail.users.messages.get({
            userId: 'me',
            id: msg.id!,
            format: 'metadata',
            metadataHeaders: ['Subject', 'From', 'Date'],
          });

          const headers = detail.data.payload?.headers || [];
          return {
            id: msg.id!,
            subject:
              headers.find((h) => h.name === 'Subject')?.value || 'No subject',
            from: headers.find((h) => h.name === 'From')?.value || 'Unknown',
            date: headers.find((h) => h.name === 'Date')?.value || '',
            snippet: detail.data.snippet || '',
          };
        } catch (err) {
          console.error(`Failed to fetch message ${msg.id}:`, err);
          return null;
        }
      })
    );

    return details.filter((d): d is NonNullable<typeof d> => d !== null) as EmailPreview[];
  } catch (error) {
    console.error('Gmail fetch error:', error);
    throw error;
  }
}

export async function getEmailContent(messageId: string): Promise<string> {
  const auth = getAuthClient();
  const gmail = google.gmail({ version: 'v1', auth });

  try {
    const response = await gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full',
    });

    // Extract text content from the message
    const payload = response.data.payload;
    let content = '';

    if (payload?.body?.data) {
      content = Buffer.from(payload.body.data, 'base64').toString('utf-8');
    } else if (payload?.parts) {
      for (const part of payload.parts) {
        if (part.mimeType === 'text/plain' && part.body?.data) {
          content += Buffer.from(part.body.data, 'base64').toString('utf-8');
        }
      }
    }

    return content || response.data.snippet || '';
  } catch (error) {
    console.error('Gmail content fetch error:', error);
    throw error;
  }
}
