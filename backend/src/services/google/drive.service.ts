import { google } from 'googleapis';
import { getAuthClient } from './oauth.service';

interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  createdTime?: string;
  modifiedTime?: string;
}

export async function fetchDriveFiles(maxResults = 10): Promise<DriveFile[]> {
  const auth = getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  try {
    const response = await drive.files.list({
      pageSize: maxResults,
      fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
      q: "mimeType='application/vnd.google-apps.document' or mimeType='application/vnd.google-apps.spreadsheet'",
    });

    return (response.data.files || []) as DriveFile[];
  } catch (error) {
    console.error('Drive fetch error:', error);
    throw error;
  }
}

export async function getFileContent(fileId: string): Promise<string> {
  const auth = getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  try {
    // Export Google Docs as plain text
    const response = await drive.files.export({
      fileId,
      mimeType: 'text/plain',
    });

    return response.data as string;
  } catch (error) {
    console.error('Drive content fetch error:', error);
    throw error;
  }
}

export async function searchDriveFiles(query: string): Promise<DriveFile[]> {
  const auth = getAuthClient();
  const drive = google.drive({ version: 'v3', auth });

  try {
    const response = await drive.files.list({
      pageSize: 20,
      fields: 'files(id, name, mimeType, createdTime, modifiedTime)',
      q: `fullText contains '${query}'`,
    });

    return (response.data.files || []) as DriveFile[];
  } catch (error) {
    console.error('Drive search error:', error);
    throw error;
  }
}
