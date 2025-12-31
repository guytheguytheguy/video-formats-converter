# Distribution & Monetization Guide

## Business Model: Freemium

### Free Tier
- All 4 aspect ratios (16:9, 9:16, 1:1, 4:5)
- MP4 output only
- 720p maximum resolution
- Single file conversion
- Small watermark on output

### Pro License ($29 one-time)
- All output formats (MP4, MOV, MKV, AVI, WebM)
- Up to 4K resolution
- Batch conversion
- No watermark
- Custom presets
- Priority support

---

## Packaging Options

### 1. Electron (Recommended)

**Pros:**
- Full native app experience
- Bundle FFmpeg inside
- Auto-updates support
- Works offline

**Build Commands:**
```bash
# Install dependencies
npm install

# Build for Windows
npm run build:win

# Build for macOS
npm run build:mac

# Build for all platforms
npm run build:all
```

**Output:**
- Windows: `.exe` installer + portable
- macOS: `.dmg` + `.zip`
- Linux: `.AppImage` + `.deb`

### 2. pkg (Simpler alternative)

Single executable without installer:
```bash
npm install -g pkg
pkg src/cli.js --targets node18-win-x64 --output VideoConvert.exe
```

### 3. Tauri (Lighter alternative)

Rust-based, smaller bundle size (~10MB vs Electron's ~150MB):
```bash
npm install @tauri-apps/cli
npx tauri build
```

---

## Bundling FFmpeg

FFmpeg must be included with the app. Options:

### Option A: Download during install
```javascript
// In installer script
const ffmpegUrl = 'https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip';
// Download and extract to app directory
```

### Option B: Bundle in build (Recommended)
1. Download FFmpeg binaries:
   - Windows: https://github.com/BtbN/FFmpeg-Builds/releases
   - macOS: `brew install ffmpeg` then copy binaries
   - Linux: Include in AppImage

2. Place in `ffmpeg/` folder:
```
ffmpeg/
├── ffmpeg.exe
├── ffprobe.exe
└── ffplay.exe (optional)
```

3. electron-builder will include via `extraResources`

---

## License Key System

### Simple Approach: Pattern-based keys
```
Format: VC-XXXX-XXXX-XXXX
Example: VC-A1B2-C3D4-E5F6
```

Generate keys with:
```javascript
function generateLicenseKey() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segment = () => Array(4).fill(0).map(() =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
  return `VC-${segment()}-${segment()}-${segment()}`;
}
```

### Better Approach: License server

Services to consider:
| Service | Pricing | Features |
|---------|---------|----------|
| **Gumroad** | 10% fee | Payments + license keys |
| **Paddle** | 5-10% fee | Payments + licensing + tax handling |
| **LemonSqueezy** | 5-8% fee | Similar to Paddle, indie-friendly |
| **Keygen** | $0-99/mo | Dedicated licensing API |

### Implementation with Gumroad
```javascript
async function validateWithGumroad(licenseKey) {
  const response = await fetch('https://api.gumroad.com/v2/licenses/verify', {
    method: 'POST',
    body: new URLSearchParams({
      product_id: 'YOUR_PRODUCT_ID',
      license_key: licenseKey
    })
  });
  const data = await response.json();
  return data.success;
}
```

---

## Selling Platforms

### Digital Product Marketplaces
| Platform | Fee | Best For |
|----------|-----|----------|
| **Gumroad** | 10% | Indie products, simple setup |
| **Paddle** | 5%+$0.50 | Professional, handles taxes |
| **LemonSqueezy** | 5-8% | Modern Paddle alternative |
| **FastSpring** | 5-8% | Enterprise, global taxes |

### App Stores
| Store | Fee | Pros | Cons |
|-------|-----|------|------|
| **Microsoft Store** | 15% | Windows distribution | Review process |
| **Mac App Store** | 30% | Mac distribution | Sandboxing limits |
| **Steam** | 30% | Huge audience | Gaming-focused |

### Your Own Website
- Use Stripe/PayPal for payments
- Host downloads on S3/Cloudflare R2
- Full control, no fees except payment processing (2.9%)

---

## Recommended Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     SALES FUNNEL                            │
├─────────────────────────────────────────────────────────────┤
│  Landing Page (Vercel/Netlify) → marketing/homepage.html    │
│         ↓                                                   │
│  Free Download → GitHub Releases or your CDN                │
│         ↓                                                   │
│  In-App Upgrade Prompt → Links to Gumroad/LemonSqueezy     │
│         ↓                                                   │
│  License Validation → Gumroad API or Keygen                 │
│         ↓                                                   │
│  Unlock Pro Features                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## Code Signing (Important!)

Without code signing, users see scary warnings.

### Windows
- **Cost:** ~$200-400/year
- **Providers:** DigiCert, Sectigo, Comodo
- **Cheap option:** Certum Open Source certificate (~$50/year, requires open source)

### macOS
- **Cost:** $99/year (Apple Developer Program)
- **Required for:** Notarization (no "unidentified developer" warning)

### Alternative: Build Trust
- Open source the code (users can verify)
- Distribute via trusted platforms (Microsoft Store)
- Build reputation over time

---

## Quick Start Checklist

1. [ ] Set up Gumroad/LemonSqueezy account
2. [ ] Create product page with screenshots
3. [ ] **Generate app icons:**
   - Use `assets/icon.svg` to generate:
     - `assets/icon.ico` (Windows)
     - `assets/icon.icns` (macOS)
     - `assets/icon.png` (Linux/Web)
   - Recommended tool: [IconGenerator](https://icon.kitchen/) or `sharp` CLI.
4. [ ] Download FFmpeg binaries for each platform
5. [ ] Build Electron app: `npm run build:win`
5. [ ] Test installer on clean Windows VM
6. [ ] Upload to GitHub Releases (free tier)
7. [ ] Add upgrade prompts in app
8. [ ] Set up license validation
9. [ ] Create landing page
10. [ ] Launch!

---

## Pricing Psychology

- **$29** is the sweet spot for utility apps
- Offer **$19 launch price** for early adopters
- Consider **$49 "lifetime + updates"** tier
- Annual subscription only if you add ongoing value (cloud features, new formats)
