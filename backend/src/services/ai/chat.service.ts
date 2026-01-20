import { GoogleGenerativeAI } from '@google/generative-ai';

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

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  type: string;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function generateContextualChatAnswer(
  question: string,
  searchResults: SearchResult[],
  previousMessages: ChatMessage[] = []
): Promise<string> {
  try {
    const ai = getGenAI();
    const model = ai.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Format search results
    const resultsText = searchResults
      .map((r, i) => `[${i + 1}] ${r.title} (${r.type})\n${r.excerpt}`)
      .join('\n\n');

    // Format conversation history
    const conversationHistory = previousMessages
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const prompt = `You are a helpful assistant answering questions based on search results.
Answer conversationally and naturally, referencing the search results provided.
If information is not in the results, say so honestly.

SEARCH RESULTS:
${resultsText}

${conversationHistory ? `CONVERSATION HISTORY:\n${conversationHistory}\n` : ''}

USER QUESTION: "${question}"

Answer the question directly and conversationally. Be concise and helpful.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Chat answer generation error:', error);
    // Provide a graceful fallback
    return `I'm having trouble generating a response. Based on the search results, here's what I found: ${
      searchResults[0]?.excerpt || 'Please try searching for more specific information.'
    }`;
  }
}
