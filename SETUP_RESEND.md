# Resend Setup Instructions

This guide walks you through setting up Resend to handle newsletter subscriptions for VideoConvert.

## 1. Create a Resend Account

1. Go to [resend.com](https://resend.com)
2. Click "Start for free" or "Sign up"
3. Create an account with your email
4. Verify your email address

## 2. Add Your Domain

1. In the Resend dashboard, go to **Domains**
2. Click **"Add domain"**
3. Enter: `videoconvert.video`
4. Follow the DNS verification steps

### DNS Records to Add

Resend will provide specific records, but typically you need:

| Type | Name | Value |
|------|------|-------|
| TXT | `resend._domainkey` | (provided by Resend) |
| TXT | `@` or root | `v=spf1 include:_spf.resend.com ~all` |

Add these records in your domain registrar's DNS settings (or Cloudflare if using it).

5. Click **"Verify"** in Resend after adding DNS records
6. Wait for verification (can take up to 48 hours, usually faster)

## 3. Get Your API Key

1. Go to **API Keys** in the Resend dashboard
2. Click **"Create API Key"**
3. Name it: `VideoConvert Newsletter`
4. Set permission: **Sending access**
5. Copy the API key (starts with `re_`)

**Important**: Save this key securely - you won't be able to see it again!

## 4. Add to Vercel Environment Variables

1. Go to [vercel.com](https://vercel.com) and open your project
2. Navigate to **Settings** > **Environment Variables**
3. Add a new variable:

   | Name | Value |
   |------|-------|
   | `RESEND_API_KEY` | `re_xxxxxxxxxx` (your API key) |

4. Select environments: **Production**, **Preview**, **Development**
5. Click **Save**

## 5. Create Newsletter Audience

1. In Resend dashboard, go to **Audiences**
2. Click **"Create audience"**
3. Name it: `VideoConvert Newsletter`
4. Note the Audience ID (you'll need this if using audience features)

## 6. Update the Newsletter API Route

The current implementation at `website/app/api/newsletter/route.ts` is already set up, but here's the full version with audience support:

```typescript
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email required' },
        { status: 400 }
      )
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      // Log for debugging, but return success to user
      console.log('Newsletter signup (Resend not configured):', email)
      return NextResponse.json(
        { success: true, message: 'Thanks for subscribing!' },
        { status: 200 }
      )
    }

    // Dynamic import to avoid build-time errors
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Option 1: Send welcome email
    await resend.emails.send({
      from: 'VideoConvert <newsletter@videoconvert.video>',
      to: email,
      subject: 'Welcome to VideoConvert!',
      html: `
        <h1>Thanks for subscribing!</h1>
        <p>You'll receive updates about:</p>
        <ul>
          <li>New features and updates</li>
          <li>Video conversion tips</li>
          <li>Exclusive offers</li>
        </ul>
        <p>Happy converting!<br>The VideoConvert Team</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          You can unsubscribe at any time by replying to this email.
        </p>
      `
    })

    // Option 2: Add to audience (if using Resend Audiences)
    // const AUDIENCE_ID = 'your-audience-id'
    // await resend.contacts.create({
    //   email,
    //   audienceId: AUDIENCE_ID,
    // })

    return NextResponse.json(
      { success: true, message: 'Thanks for subscribing!' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter signup error:', error)
    return NextResponse.json(
      { error: 'Subscription failed. Please try again.' },
      { status: 500 }
    )
  }
}
```

## 7. Test the Integration

### Local Testing

1. Create a `.env.local` file in the `website` directory:
   ```
   RESEND_API_KEY=re_xxxxxxxxxx
   ```

2. Run the development server:
   ```bash
   cd website
   npm run dev
   ```

3. Go to the footer and submit the newsletter form
4. Check your email for the welcome message
5. Check Resend dashboard for the sent email

### Production Testing

1. After deploying to Vercel with the env variable
2. Go to your live site
3. Subscribe with a test email
4. Verify email is received

## 8. Email Templates

### Welcome Email (sent on signup)

Already included in the API route above.

### Update Email Template (for sending updates)

Use Resend's API or dashboard to send broadcast emails:

```typescript
// Example: Send update to all subscribers
const { Resend } = require('resend')
const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'VideoConvert <newsletter@videoconvert.video>',
  to: 'subscriber@example.com', // or use batch sending
  subject: 'VideoConvert 1.1.0 Released!',
  html: `
    <h1>New Update Available</h1>
    <p>VideoConvert 1.1.0 is now available with:</p>
    <ul>
      <li>macOS support</li>
      <li>Performance improvements</li>
      <li>Bug fixes</li>
    </ul>
    <a href="https://videoconvert.video/download">Download Now</a>
  `
})
```

## 9. Monitor Usage

1. Resend free tier includes 3,000 emails/month
2. Check usage in **Dashboard** > **Usage**
3. Upgrade if needed: Plans start at $20/month for 50,000 emails

## Sending Limits

| Plan | Emails/Month | Price |
|------|--------------|-------|
| Free | 3,000 | $0 |
| Pro | 50,000 | $20/mo |
| Business | 100,000 | $45/mo |

## Checklist

- [ ] Resend account created
- [ ] Domain `videoconvert.video` added
- [ ] DNS records configured
- [ ] Domain verified
- [ ] API key created
- [ ] API key added to Vercel environment variables
- [ ] Newsletter audience created (optional)
- [ ] Local testing completed
- [ ] Production testing completed
- [ ] Welcome email template reviewed

## Troubleshooting

### "Domain not verified"
- Check DNS records are correctly added
- Wait up to 48 hours for propagation
- Use a DNS checker tool to verify records

### Emails going to spam
- Ensure SPF and DKIM records are set up
- Use a professional "from" address (not gmail)
- Include unsubscribe instructions in emails

### API key not working
- Verify the key in Vercel environment variables
- Redeploy after adding the env variable
- Check for typos in the variable name
