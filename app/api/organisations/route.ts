import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/organization`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(error, { status: response.status });
    }

    const organisation = await response.json();
    return NextResponse.json(organisation, { status: 201 });
  } catch (error) {
    console.error('Error creating organisation:', error);
    return NextResponse.json(
      { error: 'Failed to create organisation' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = request.nextUrl.searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'userId query parameter is required' },
        { status: 400 }
      );
    }

    const response = await fetch(`${BACKEND_URL}/api/organization/user/${userId}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch organisations' },
        { status: response.status }
      );
    }

    const organisations = await response.json();
    return NextResponse.json(organisations);
  } catch (error) {
    console.error('Error fetching organisations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organisations' },
      { status: 500 }
    );
  }
}
