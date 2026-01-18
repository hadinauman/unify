// AI-Powered Data Extraction Service using Gemini
// Extracts structured events, contacts, and information from raw content

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export interface ExtractedEvent {
  title: string;
  description: string;
  date: string;
  endDate?: string;
  type: 'fundraiser' | 'social' | 'educational' | 'partnership' | 'administrative';
  venue?: string;
  estimatedAttendance?: number;
  budget?: number;
  tags: string[];
  sourceEmail?: string;
  confidence: number;
}

export interface ExtractedContact {
  name: string;
  type: 'vendor' | 'speaker' | 'partner' | 'alumni' | 'staff';
  email?: string;
  phone?: string;
  organization?: string;
  description: string;
  tags: string[];
  confidence: number;
}

export interface ExtractionResult {
  events: ExtractedEvent[];
  contacts: ExtractedContact[];
  keyInsights: string[];
  rawCategory: string;
}

export async function extractDataWithAI(
  content: string,
  subject: string,
  sender: string,
  date: string
): Promise<ExtractionResult> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `You are an AI assistant for a Muslim Student Association (MSA/ISOC) at a university.
Analyze the following email and extract any relevant information about events, contacts, or organizational matters.

EMAIL DETAILS:
Subject: ${subject}
From: ${sender}
Date: ${date}
Content:
${content.substring(0, 3000)}

INSTRUCTIONS:
Extract and return a JSON object with the following structure:
{
  "events": [
    {
      "title": "Event name",
      "description": "Brief description",
      "date": "YYYY-MM-DD format if found, or best estimate",
      "type": "fundraiser|social|educational|partnership|administrative",
      "venue": "Location if mentioned",
      "estimatedAttendance": null or number,
      "budget": null or number in euros,
      "tags": ["relevant", "tags"],
      "confidence": 0.0 to 1.0
    }
  ],
  "contacts": [
    {
      "name": "Person or organization name",
      "type": "vendor|speaker|partner|alumni|staff",
      "email": "email if found",
      "phone": "phone if found",
      "organization": "their org if applicable",
      "description": "Brief description of who they are",
      "tags": ["relevant", "tags"],
      "confidence": 0.0 to 1.0
    }
  ],
  "keyInsights": ["Important points from this email for future reference"],
  "rawCategory": "event|contact|financial|administrative|general"
}

Only include events and contacts that are clearly mentioned. Don't invent data.
If this email is not related to MSA/ISOC activities, return empty arrays.
Return ONLY the JSON object, no other text.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    // Parse the JSON response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.log('No JSON found in AI response');
      return { events: [], contacts: [], keyInsights: [], rawCategory: 'unknown' };
    }

    const parsed = JSON.parse(jsonMatch[0]);

    return {
      events: parsed.events || [],
      contacts: parsed.contacts || [],
      keyInsights: parsed.keyInsights || [],
      rawCategory: parsed.rawCategory || 'unknown',
    };
  } catch (error) {
    console.error('AI extraction error:', error);
    return { events: [], contacts: [], keyInsights: [], rawCategory: 'error' };
  }
}

// Batch process multiple emails
export async function batchExtractData(
  emails: Array<{ content: string; subject: string; sender: string; date: string }>
): Promise<{
  allEvents: ExtractedEvent[];
  allContacts: ExtractedContact[];
  allInsights: string[];
}> {
  const allEvents: ExtractedEvent[] = [];
  const allContacts: ExtractedContact[] = [];
  const allInsights: string[] = [];

  // Process in batches to avoid rate limits
  for (const email of emails) {
    try {
      const result = await extractDataWithAI(
        email.content,
        email.subject,
        email.sender,
        email.date
      );

      allEvents.push(...result.events.map(e => ({ ...e, sourceEmail: email.subject })));
      allContacts.push(...result.contacts);
      allInsights.push(...result.keyInsights);

      // Small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Failed to process email: ${email.subject}`, error);
    }
  }

  // Deduplicate contacts by email
  const uniqueContacts = allContacts.reduce((acc, contact) => {
    const key = contact.email || contact.name;
    if (!acc.has(key) || (contact.confidence > (acc.get(key)?.confidence || 0))) {
      acc.set(key, contact);
    }
    return acc;
  }, new Map<string, ExtractedContact>());

  return {
    allEvents,
    allContacts: Array.from(uniqueContacts.values()),
    allInsights: [...new Set(allInsights)],
  };
}
