import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

// In-memory token storage (temporary for demo)
let storedTokens: any = null;

export function getAuthUrl(): string {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/gmail.readonly',
      'https://www.googleapis.com/auth/drive.readonly',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    prompt: 'consent',
  });
}

export async function getTokensFromCode(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  storedTokens = tokens;
  oauth2Client.setCredentials(tokens);
  return tokens;
}

export function getStoredTokens() {
  return storedTokens;
}

export function clearStoredTokens() {
  storedTokens = null;
}

export function getAuthClient() {
  if (storedTokens) {
    oauth2Client.setCredentials(storedTokens);
  }
  return oauth2Client;
}

export function isConnected(): boolean {
  return !!storedTokens;
}
