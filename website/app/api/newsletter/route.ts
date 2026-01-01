import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.log('Newsletter signup (Resend not configured):', email);
      // Still return success - you can manually add subscribers or configure Resend later
      return NextResponse.json(
        { success: true, message: 'Thanks for subscribing!' },
        { status: 200 }
      );
    }

    // Dynamic import to avoid build-time errors when key is not set
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Create contact in Resend
    const { data, error } = await resend.contacts.create({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error('Resend contacts.create error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, contactId: data?.id ?? null },
      { status: 200 }
    );
  } catch (err) {
    console.error('Newsletter route error:', err);
    return NextResponse.json(
      { error: 'Unexpected error.' },
      { status: 500 }
    );
  }
}
