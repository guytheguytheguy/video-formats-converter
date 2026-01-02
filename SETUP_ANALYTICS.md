# Analytics Setup Instructions

This guide covers setting up privacy-friendly analytics for VideoConvert. We recommend **Vercel Analytics** (simplest) or **Plausible** (most privacy-focused).

---

## Option 1: Vercel Analytics (Recommended for Simplicity)

Since your site is already on Vercel, this is the easiest option.

### Setup

1. Go to your project on [vercel.com](https://vercel.com)
2. Navigate to **Analytics** tab
3. Click **"Enable"**
4. Choose your plan:
   - **Hobby (Free)**: Basic web analytics
   - **Pro ($10/mo)**: Advanced features, more data retention

### Add to Your App

1. Install the package:
   ```bash
   cd website
   npm install @vercel/analytics
   ```

2. Update `website/app/layout.tsx`:
   ```tsx
   import { Analytics } from '@vercel/analytics/react'

   export default function RootLayout({
     children,
   }: {
     children: React.ReactNode
   }) {
     return (
       <html lang="en">
         <body>
           {children}
           <Analytics />
         </body>
       </html>
     )
   }
   ```

3. Deploy:
   ```bash
   npx vercel --prod
   ```

### What You Get

- Page views
- Unique visitors
- Top pages
- Referrers
- Countries
- Devices & browsers
- Web Vitals (performance metrics)

### Add Speed Insights (Optional)

```bash
npm install @vercel/speed-insights
```

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next'

// In layout.tsx:
<SpeedInsights />
```

---

## Option 2: Plausible Analytics (Most Privacy-Focused)

Plausible is a lightweight, privacy-friendly alternative to Google Analytics.

### Pricing

| Plan | Price | Page Views |
|------|-------|------------|
| Growth | $9/mo | 10,000 |
| Business | $19/mo | 100,000 |
| Enterprise | Custom | Unlimited |

*Free 30-day trial available*

### Setup

1. Go to [plausible.io](https://plausible.io)
2. Sign up for an account
3. Add your site: `videoconvert.video`
4. Get your script tag

### Add to Your App

**Option A: Script Tag (simplest)**

Update `website/app/layout.tsx`:

```tsx
import Script from 'next/script'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script
          defer
          data-domain="videoconvert.video"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

**Option B: Using next-plausible package**

```bash
npm install next-plausible
```

```tsx
// website/app/layout.tsx
import PlausibleProvider from 'next-plausible'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <PlausibleProvider domain="videoconvert.video" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
```

### Track Custom Events

```tsx
import { usePlausible } from 'next-plausible'

function DownloadButton() {
  const plausible = usePlausible()

  return (
    <button onClick={() => {
      plausible('Download', { props: { platform: 'windows' } })
      // Start download...
    }}>
      Download for Windows
    </button>
  )
}
```

### What You Get

- Real-time dashboard
- Page views & unique visitors
- Bounce rate
- Visit duration
- Referrers
- Countries
- Devices
- UTM campaign tracking
- Goals & conversions
- GDPR/CCPA compliant (no cookie banner needed!)

---

## Option 3: Fathom Analytics

Another privacy-focused option, slightly more features than Plausible.

### Pricing

| Plan | Price | Page Views |
|------|-------|------------|
| Starter | $14/mo | 100,000 |
| Business | $24/mo | 200,000 |
| Enterprise | Custom | Unlimited |

### Setup

1. Go to [usefathom.com](https://usefathom.com)
2. Sign up and add your site
3. Get your Site ID

### Add to Your App

```bash
npm install fathom-client
```

```tsx
// website/app/layout.tsx
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import * as Fathom from 'fathom-client'

function FathomAnalytics() {
  const pathname = usePathname()

  useEffect(() => {
    Fathom.load('YOUR_SITE_ID', {
      includedDomains: ['videoconvert.video'],
    })
  }, [])

  useEffect(() => {
    Fathom.trackPageview()
  }, [pathname])

  return null
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <FathomAnalytics />
        {children}
      </body>
    </html>
  )
}
```

---

## Option 4: Self-Hosted (Umami)

If you want full control and zero cost, self-host Umami.

### Setup with Vercel + Supabase

1. Fork [umami](https://github.com/umami-software/umami) on GitHub
2. Create a free [Supabase](https://supabase.com) project for the database
3. Deploy to Vercel from your fork
4. Add environment variables in Vercel:
   ```
   DATABASE_URL=your-supabase-connection-string
   HASH_SALT=random-string-for-hashing
   ```

### Add to Your App

```tsx
import Script from 'next/script'

<Script
  defer
  src="https://your-umami-instance.vercel.app/script.js"
  data-website-id="your-website-id"
/>
```

---

## Comparison Table

| Feature | Vercel Analytics | Plausible | Fathom | Umami |
|---------|------------------|-----------|--------|-------|
| Price | Free-$10/mo | $9-19/mo | $14-24/mo | Free (self-host) |
| Privacy | Good | Excellent | Excellent | Excellent |
| Setup | Easiest | Easy | Easy | Complex |
| Cookie-free | Yes | Yes | Yes | Yes |
| GDPR Compliant | Yes | Yes | Yes | Yes |
| Real-time | Yes | Yes | Yes | Yes |
| Custom Events | Limited | Yes | Yes | Yes |
| Self-hostable | No | Yes ($) | No | Yes |

---

## Recommendation

**For VideoConvert, we recommend:**

1. **Start with Vercel Analytics** (Free)
   - Zero config, already on Vercel
   - Basic metrics are enough to start

2. **Upgrade to Plausible later** (if needed)
   - When you want more detailed insights
   - When you want to track specific conversions (downloads, purchases)

---

## Quick Start: Vercel Analytics

Here's the minimal setup to get analytics today:

```bash
# 1. Install
cd website
npm install @vercel/analytics

# 2. Add to layout.tsx (see above)

# 3. Deploy
npx vercel --prod

# 4. Enable in Vercel Dashboard
# Go to your project > Analytics > Enable
```

---

## Track Key Events (Recommended)

Whichever option you choose, track these events:

| Event | Trigger | Why |
|-------|---------|-----|
| `download_click` | Download button clicked | Track interest |
| `download_complete` | Download started | Track conversions |
| `pro_click` | "Get Pro License" clicked | Track purchase intent |
| `newsletter_signup` | Newsletter form submitted | Track engagement |
| `demo_started` | Demo page visited | Track interest |

Example with Vercel Analytics:

```tsx
import { track } from '@vercel/analytics'

<Button onClick={() => {
  track('download_click', { platform: 'windows' })
  // Start download...
}}>
  Download for Windows
</Button>
```

---

## Checklist

- [ ] Choose analytics provider
- [ ] Create account (if not Vercel Analytics)
- [ ] Install package
- [ ] Add to layout.tsx
- [ ] Deploy changes
- [ ] Enable in dashboard
- [ ] Verify data is being collected
- [ ] Set up key event tracking (optional)
