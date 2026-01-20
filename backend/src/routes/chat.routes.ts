import express from 'express';
import { generateContextualChatAnswer, hasGeminiKey } from '../services/ai/chat.service';

const router = express.Router();

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

router.post('/', async (req, res) => {
  try {
    const { question, searchResults, previousMessages } = req.body;

    if (!question || !searchResults || !Array.isArray(searchResults)) {
      return res.status(400).json({
        error: 'Question and search results are required',
      });
    }

    console.log(`💬 Chat question: "${question}"`);

    let answer = '';

    // Try to use Gemini API if key is available
    if (hasGeminiKey()) {
      try {
        console.log(`🤖 Generating contextual answer...`);
        answer = await generateContextualChatAnswer(
          question,
          searchResults as SearchResult[],
          previousMessages as ChatMessage[]
        );
        console.log(`✅ Answer generated`);
      } catch (err) {
        console.error('AI generation failed:', err);
        // Fall back to data-driven answer
        answer = generateFallbackAnswer(question, searchResults as SearchResult[]);
      }
    } else {
      // Use fallback answer when no API key
      answer = generateFallbackAnswer(question, searchResults as SearchResult[]);
    }

    return res.json({ answer });
  } catch (error) {
    console.error('❌ Chat error:', error);

    return res.status(500).json({
      error: 'Chat failed',
      details: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// Fallback answer generator based on search results
function generateFallbackAnswer(question: string, searchResults: SearchResult[]): string {
  const lowerQuestion = question.toLowerCase();

  // Count by type
  const byType = searchResults.reduce(
    (acc, r) => {
      acc[r.type] = (acc[r.type] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  // Build response
  let answer = '';

  // Check what the question is asking about
  if (
    lowerQuestion.includes('how many') ||
    lowerQuestion.includes('count') ||
    lowerQuestion.includes('total')
  ) {
    answer = `I found ${searchResults.length} relevant result${searchResults.length !== 1 ? 's' : ''}. `;
    if (Object.keys(byType).length > 0) {
      const typeBreakdown = Object.entries(byType)
        .map(([type, count]) => `${count} ${type}${count !== 1 ? 's' : ''}`)
        .join(', ');
      answer += `That includes: ${typeBreakdown}.`;
    }
  } else if (
    lowerQuestion.includes('what') ||
    lowerQuestion.includes('tell me about') ||
    lowerQuestion.includes('explain')
  ) {
    const topResult = searchResults[0];
    answer = `Based on the search results, I found information about this. Here's the key detail: ${topResult.excerpt}`;
  } else if (
    lowerQuestion.includes('when') ||
    lowerQuestion.includes('date') ||
    lowerQuestion.includes('time')
  ) {
    answer = `Based on the search results, I found relevant information. The results contain details about timing and dates for the topics you searched for.`;
  } else if (
    lowerQuestion.includes('who') ||
    lowerQuestion.includes('person') ||
    lowerQuestion.includes('contact')
  ) {
    answer = `I found ${searchResults.length} relevant result${searchResults.length !== 1 ? 's' : ''} related to people and contacts. You can review the details in the search results above.`;
  } else {
    // Generic fallback
    answer = `I found ${searchResults.length} relevant result${searchResults.length !== 1 ? 's' : ''} for your question. The top match is: "${searchResults[0]?.title}". You can review all the results above for more details.`;
  }

  return answer;
}

export default router;
