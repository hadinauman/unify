import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const response = await fetch(`${BACKEND_URL}/api/organization/${params.id}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Organisation not found' },
        { status: response.status }
      );
    }

    const organisation = await response.json();
    return NextResponse.json(organisation);
  } catch (error) {
    console.error('Error fetching organisation:', error);
    return NextResponse.json(
      { error: 'Failed to fetch organisation' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/organization/${params.id}`, {
      method: 'PATCH',
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
    return NextResponse.json(organisation);
  } catch (error) {
    console.error('Error updating organisation:', error);
    return NextResponse.json(
      { error: 'Failed to update organisation' },
      { status: 500 }
    );
  }
}
