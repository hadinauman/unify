import { NextRequest, NextResponse } from 'next/server';

// Use NEXT_PUBLIC_API_URL from .env.local if set, otherwise default to backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002';

export async function POST(request: NextRequest) {
  let query = '';
  
  try {
    const body = await request.json();
    query = body.query || '';
    
    if (!query) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    console.log(`[Next.js API] Proxying search request to backend: ${BACKEND_URL}/api/search`);
    console.log(`[Next.js API] Request body:`, JSON.stringify(body));
    
    const response = await fetch(`${BACKEND_URL}/api/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    console.log(`[Next.js API] Response status: ${response.status} ${response.statusText}`);

    if (!response.ok) {
      let errorMessage = `Search failed (HTTP ${response.status})`;
      
      // Read response body once - check content type first
      const contentType = response.headers.get('content-type') || '';
      
      try {
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorData.details || errorMessage;
        } else {
          const errorText = await response.text();
          errorMessage = errorText || response.statusText || errorMessage;
        }
      } catch (e) {
        // If reading fails, use status text
        errorMessage = response.statusText || `HTTP ${response.status}: Search failed`;
      }
      
      console.error(`[Next.js API] Backend error (${response.status}):`, errorMessage);
      
      return NextResponse.json(
        { 
          error: errorMessage,
          query: query,
          results: [],
          total: 0
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(`[Next.js API] Search successful: ${data.total || 0} results found`);
    return NextResponse.json(data);
  } catch (error) {
    console.error('[Next.js API] Search proxy error:', error);
    
    // Check if it's a connection error
    const isConnectionError = error instanceof Error && (
      error.message.includes('fetch failed') ||
      error.message.includes('ECONNREFUSED') ||
      error.message.includes('Failed to fetch')
    );
    
    if (isConnectionError) {
      return NextResponse.json(
        { 
          error: `Backend server is not running. Please start the backend server on port 3002.`,
          query: query,
          results: [],
          total: 0
        },
        { status: 503 }
      );
    }
    
    return NextResponse.json(
      { 
        error: 'Search failed', 
        details: error instanceof Error ? error.message : 'Unknown error',
        query: query,
        results: [],
        total: 0
      },
      { status: 500 }
    );
  }
}
