# VideoConvert Website Maintenance Guide

Last updated: January 2026

## Critical Fixes Needed

### 1. Remove CLI References (High Priority)
The CLI is only available via npm install, not in the downloadable Electron app. Remove all CLI mentions:

| File | Line | Issue | Action |
|------|------|-------|--------|
| `website/app/pricing/Pricing.tsx` | 19 | "CLI Access" in comparison table | Remove this row |
| `website/app/features/Features.tsx` | 43-47 | "CLI Support" feature card | Remove or replace |
| `website/app/features/Features.tsx` | 49-53 | "Multiple Interfaces" mentions CLI | Update to just "Desktop App" |
| `website/lib/constants.ts` | 15 | "CLI & Web dashboard" in free features | Change to "Desktop app" |
| `website/app/about/About.tsx` | 34 | Milestone "CLI support added" | Remove this milestone |
| `website/app/download/Download.tsx` | 63 | Changelog mentions "CLI and web dashboard" | Remove CLI reference |

### 2. Update Payment Provider (High Priority)
Currently mentions LemonSqueezy, but you're using Gumroad:

| File | Line | Issue | Action |
|------|------|-------|--------|
| `website/app/pricing/Pricing.tsx` | 33 | "LemonSqueezy" in FAQ | Change to "Gumroad" |

### 3. Fix Placeholder Links (Medium Priority)
Several social/external links are generic placeholders:

| File | Lines | Current | Action |
|------|-------|---------|--------|
| `website/components/layout/Footer.tsx` | 110-132 | Generic twitter.com, github.com, discord.com | Add real URLs or remove |
| `website/app/about/About.tsx` | 145 | Generic github.com | Point to actual repo |
| `website/lib/constants.ts` | 107, 118-120 | Generic social URLs | Update or remove |
| `website/components/home/Testimonials.tsx` | 112 | Generic github.com | Point to actual repo |

**Your GitHub repo:** `https://github.com/guytheguytheguy/video-formats-converter`

---

## Content Improvements

### Homepage (Hero.tsx)
- **Status:** Good
- Hero messaging is accurate and compelling
- Trust badges are truthful

### Features Page (Features.tsx)
- **Issues:**
  - CLI Support card should be removed
  - "Multiple Interfaces" should be simplified to just "Desktop App"
- **Good:**
  - Aspect ratios, transform modes, formats are accurate
  - Quality presets table is accurate

### Pricing Page (Pricing.tsx)
- **Issues:**
  - CLI Access row in comparison table
  - LemonSqueezy mentioned instead of Gumroad
- **FAQs:**
  - All other FAQs are good
  - Consider adding: "Do I need FFmpeg installed?" (No, it's bundled)

### Download Page (Download.tsx)
- **Issues:**
  - Changelog mentions CLI
- **Good:**
  - Windows downloads link to actual GitHub releases
  - macOS/Linux correctly marked as "Coming Soon"
  - System requirements are accurate

### Docs Page (Docs.tsx)
- **Status:** Recently updated, CLI removed
- Focuses on desktop app usage
- All content is accurate

### About Page (About.tsx)
- **Issues:**
  - Milestone "CLI support added" should be removed
  - Generic GitHub link

### Blog Posts
- Check if any blog posts mention CLI features

---

## Technical Improvements

### 1. Newsletter Integration
- **File:** `website/app/api/newsletter/route.ts`
- **Status:** Functional with fallback when Resend API key not configured
- **TODO:** Add `RESEND_API_KEY` to Vercel environment variables to enable actual email collection

### 2. "Get Pro License" Button
- **File:** `website/app/pricing/Pricing.tsx` line 143
- **Current:** Button doesn't link anywhere
- **TODO:** Add Gumroad product link

### 3. Pro License Activation
- The app validates license format `VC-XXXX-XXXX-XXXX`
- **TODO:** Set up Gumroad to generate keys in this format, or update validation

### 4. Analytics
- No analytics currently installed
- **Consider:** Adding privacy-friendly analytics (Plausible, Fathom, or Vercel Analytics)

### 5. SEO
- Missing Open Graph images for social sharing
- Consider adding structured data (JSON-LD) for software application

---

## Deployment

### Vercel Settings
- **Production URL:** https://videoconvert.video
- **Framework:** Next.js
- **Build Command:** Default
- **Environment Variables Needed:**
  - `RESEND_API_KEY` - For newsletter functionality

### GitHub Releases
- Windows downloads are hosted on GitHub Releases
- Current version: v1.0.0
- **Files:**
  - `VideoConvert.Setup.1.0.0.exe` (Installer)
  - `VideoConvert.1.0.0.exe` (Portable)

---

## Quick Fix Script

To fix all CLI references, update these files:

```tsx
// website/app/pricing/Pricing.tsx - Remove line 19
// Change: { name: 'CLI Access', free: true, pro: true },
// To: (delete this line)

// website/app/pricing/Pricing.tsx - Line 33
// Change: 'We accept all major credit cards, PayPal, and Apple Pay through our secure payment provider LemonSqueezy.'
// To: 'We accept all major credit cards, PayPal, and Apple Pay through our secure payment provider Gumroad.'

// website/app/features/Features.tsx - Remove lines 43-47 (CLI Support card)
// website/app/features/Features.tsx - Update lines 49-53:
// Change: 'Multiple Interfaces' + 'Use the desktop app, web dashboard, or CLI'
// To: 'Desktop App' + 'Clean, intuitive interface for all your video conversion needs'

// website/lib/constants.ts - Line 15
// Change: 'CLI & Web dashboard',
// To: 'Desktop app',

// website/app/about/About.tsx - Remove line 34
// { year: '2024', event: 'CLI support added' },

// website/app/download/Download.tsx - Line 63
// Change: 'CLI and web dashboard interfaces',
// To: 'Desktop app interface',
```

---

## Maintenance Checklist

### Before Each Release
- [ ] Update version number in `lib/constants.ts`
- [ ] Update changelog in `download/Download.tsx`
- [ ] Upload new builds to GitHub Releases
- [ ] Update download URLs if version changed
- [ ] Deploy to Vercel

### Monthly
- [ ] Check for broken links
- [ ] Review and respond to feedback submissions
- [ ] Update blog with new content
- [ ] Check analytics (if installed)

### Quarterly
- [ ] Review pricing competitiveness
- [ ] Update testimonials (when you have real ones)
- [ ] Check for outdated content
- [ ] Review SEO performance

---

## Contact Information
- **Support:** support@videoconvert.video
- **Contact:** contact@videoconvert.video
- **Newsletter:** newsletter@videoconvert.video
