import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { question, searchResults, previousMessages } = body;

    if (!question || !searchResults) {
      return NextResponse.json(
        { error: 'Question and search results are required' },
        { status: 400 }
      );
    }

    console.log(`[Next.js API] Proxying chat request to backend`);
    console.log(`[Next.js API] Question: ${question}`);

    const response = await fetch(`${BACKEND_URL}/api/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        searchResults,
        previousMessages,
      }),
    });

    console.log(`[Next.js API] Response status: ${response.status}`);

    if (!response.ok) {
      let errorMessage = `Chat failed (HTTP ${response.status})`;

      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorData.details || errorMessage;
      } catch (e) {
        const errorText = await response.text();
        errorMessage = errorText || response.statusText || errorMessage;
      }

      console.error(`[Next.js API] Backend error (${response.status}):`, errorMessage);

      return NextResponse.json(
        {
          error: errorMessage,
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`[Next.js API] Chat successful`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Next.js API] Chat proxy error:', error);

    const isConnectionError = error instanceof Error && (
      error.message.includes('fetch failed') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('Failed to fetch')
    );

    if (isConnectionError) {
      return NextResponse.json(
        {
          error: `Backend server is not running. Please start the backend server on port 3002.`,
        },
        { status: 503 }
      );
    }

    return NextResponse.json(
      {
        error: 'Chat failed',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
