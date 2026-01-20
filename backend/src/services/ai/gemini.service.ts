import { GoogleGenerativeAI } from '@google/generative-ai';
import { AISearchSummary } from '../../types';

let genAI: GoogleGenerativeAI | null = null;

function getGenAI(): GoogleGenerativeAI {
  if (!genAI) {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY not configured');
    }
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  }
  return genAI;
}

export function hasGeminiKey(): boolean {
  return !!process.env.GEMINI_API_KEY;
}

interface SearchableDocument {
  id: string;
  title: string;
  summary?: string;
  content?: string;
}

export async function generateSearchSummary(
  query: string,
  documents: SearchableDocument[]
): Promise<AISearchSummary> {
  try {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const docsText = documents
      .slice(0, 10)
      .map(
        (d, i) =>
          `[${i + 1}] ${d.title}: ${d.summary || d.content || 'No content available'}`
      )
      .join('\n\n');

    const prompt = `You are an AI assistant helping student organizations find information from their past activities.

User Query: "${query}"

Available Documents:
${docsText}

Based on these documents, provide a helpful response in JSON format:

{
  "summary": "2-3 sentence answer to the query using information from documents",
  "keyInsights": ["insight 1", "insight 2", "insight 3"],
  "relatedQueries": ["related question 1", "related question 2"],
  "confidence": "high or medium or low"
}

Rules:
- Only use information from the provided documents
- If documents don't answer the query, say so honestly
- Focus on actionable information (dates, contacts, budgets, processes)
- For "how to" questions, provide step-by-step guidance from past events
- Mention specific people, vendors, or numbers when relevant

Respond with only valid JSON, no markdown formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Clean up response - remove markdown if present
    const cleanText = text
      .replace(/```json\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    const parsed = JSON.parse(cleanText);

    return {
      summary: parsed.summary,
      keyInsights: parsed.keyInsights || [],
      relatedQueries: parsed.relatedQueries || [],
      confidence: parsed.confidence || 'medium',
      sources: documents.slice(0, 5).map((d) => d.id),
    };
  } catch (error) {
    console.error('Gemini API error:', error);

    // Fallback response
    return {
      summary: `I found ${documents.length} relevant documents about "${query}". ${documents[0]?.summary || 'Check the search results below for details.'}`,
      keyInsights: [
        documents[0]?.title || 'Document available',
        `${documents.length} related items found`,
      ],
      relatedQueries: [
        'Who organized this?',
        'What was the budget?',
        'When did this happen?',
      ],
      confidence: 'low',
      sources: documents.slice(0, 3).map((d) => d.id),
    };
  }
}

export async function generateContextualAnswer(
  query: string,
  documents: SearchableDocument[]
): Promise<string> {
  try {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const docsText = documents
      .slice(0, 15)
      .map((d, i) => `[${i + 1}] ${d.title}\n${d.summary || d.content || 'No details'}`)
      .join('\n\n');

    const prompt = `You are an AI assistant for a student Islamic society. Answer the user's question conversationally based ONLY on the provided organizational data.

USER QUESTION: "${query}"

AVAILABLE INFORMATION:
${docsText}

INSTRUCTIONS:
- Give a natural, conversational answer as if you're helping a committee member
- Only use information from the provided documents
- If information is incomplete, say so honestly
- Include specific details like dates, people, vendors, or numbers when relevant
- For "how to" questions, provide practical steps based on past experiences
- Be helpful and supportive in tone
- If the documents don't contain relevant information, suggest what they should look for

ANSWER:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini contextual answer error:', error);
    return `I encountered an error generating a response. Please check the search results below for information about "${query}".`;
  }
}

export async function generateBriefing(
  role: string,
  documents: SearchableDocument[]
): Promise<string> {
  try {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const docsText = documents
      .slice(0, 15)
      .map((d, i) => `[${i + 1}] ${d.title}: ${d.summary || d.content}`)
      .join('\n\n');

    const prompt = `You are creating a briefing document for a new ${role} of a student Islamic society (TCD MSA).

Available organizational knowledge:
${docsText}

Create a comprehensive briefing document in Markdown format that includes:

1. **Role Overview**: Key responsibilities for the ${role}
2. **Key Contacts**: Important vendors, partners, and people to know
3. **Upcoming Priorities**: Based on the academic calendar
4. **Past Successes**: What worked well that should continue
5. **Lessons Learned**: Challenges and how to avoid them
6. **Budget Guidelines**: Financial considerations for this role
7. **Quick Tips**: Practical advice from previous committee members

Make it practical, actionable, and specific to the information available.
Use bullet points for readability.
Keep it under 1000 words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini briefing generation error:', error);

    return `# ${role} Briefing

## Overview
Welcome to your role as ${role} of TCD MSA. This briefing will help you get started.

## Key Information
- Review past event documentation
- Connect with key contacts (vendors, partners)
- Check the committee handover notes

## Next Steps
1. Schedule a meeting with the outgoing ${role}
2. Review the contact database
3. Familiarize yourself with the event timeline

*Note: AI-generated briefing temporarily unavailable. Please refer to historical documents.*`;
  }
}
