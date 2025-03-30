import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Request body:', body); 
    
    const response = await fetch('https://www.smile.one/merchant/mobilelegends/checkrole', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: new URLSearchParams({
        user_id: body.userId,
        zone_id: body.zoneId
      }).toString()
    });

    const data = await response.json();
    console.log('API response:', data);
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error); 
    return NextResponse.json(
      { error: 'Failed to verify user' },
      { status: 500 }
    );
  }
} 