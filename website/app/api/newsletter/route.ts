import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required.' },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.log('Newsletter signup (Resend not configured):', email);
      return NextResponse.json(
        { success: true, message: 'Thanks for subscribing!' },
        { status: 200 }
      );
    }

    // Dynamic import to avoid build-time errors when key is not set
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    // Send welcome email using Resend's default domain (free tier)
    // Once you verify videoconvert.video in Resend, change to:
    // from: 'VideoConvert <newsletter@videoconvert.video>'
    const { error } = await resend.emails.send({
      from: 'VideoConvert <onboarding@resend.dev>',
      to: email,
      subject: 'Welcome to VideoConvert!',
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a2e;">Thanks for subscribing!</h1>
          <p style="color: #444; line-height: 1.6;">You're now signed up for VideoConvert updates. You'll receive:</p>
          <ul style="color: #444; line-height: 1.8;">
            <li>New feature announcements</li>
            <li>Video conversion tips & tricks</li>
            <li>Exclusive offers for subscribers</li>
          </ul>
          <p style="color: #444; line-height: 1.6;">
            In the meantime, <a href="https://videoconvert.video/download" style="color: #6366f1;">download VideoConvert</a>
            and start converting your videos for any platform!
          </p>
          <p style="color: #444; line-height: 1.6;">
            Happy converting!<br>
            <strong>The VideoConvert Team</strong>
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
          <p style="color: #999; font-size: 12px;">
            You received this email because you signed up at videoconvert.video.
            Reply to this email to unsubscribe.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend email error:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    console.log('Newsletter signup successful:', email);
    return NextResponse.json(
      { success: true, message: 'Thanks for subscribing!' },
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
