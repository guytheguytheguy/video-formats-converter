# Build & Sell Guide for VideoConvert

## Step 1: Prepare FFmpeg Binaries

FFmpeg must be bundled with the app for it to work standalone.

### Windows
1. Download from: https://github.com/BtbN/FFmpeg-Builds/releases
2. Get: `ffmpeg-master-latest-win64-gpl.zip`
3. Extract and copy these files to `ffmpeg/` folder:
   - `ffmpeg.exe`
   - `ffprobe.exe`

```powershell
# Or use chocolatey to find the path
where ffmpeg
# Then copy the binaries
copy C:\ProgramData\chocolatey\bin\ffmpeg.exe ffmpeg\
copy C:\ProgramData\chocolatey\bin\ffprobe.exe ffmpeg\
```

### macOS
```bash
brew install ffmpeg
cp $(which ffmpeg) ffmpeg/
cp $(which ffprobe) ffmpeg/
```

---

## Step 2: Build the Executable

```powershell
# Install dependencies (if not done)
npm install

# Build for Windows (creates .exe installer)
npm run build:win

# Build for macOS
npm run build:mac

# Build for all platforms
npm run build:all
```

**Output location:** `dist-electron/`
- Windows: `VideoConvert Setup 1.0.0.exe` (installer) + `VideoConvert 1.0.0.exe` (portable)
- macOS: `VideoConvert-1.0.0.dmg`
- Linux: `VideoConvert-1.0.0.AppImage`

---

## Step 3: Set Up LemonSqueezy

### Create Account
1. Go to https://lemonsqueezy.com
2. Sign up with email
3. Complete seller verification (takes 1-2 days)

### Create Product
1. Dashboard → Products → Create Product
2. Fill in:
   - **Name:** VideoConvert Pro
   - **Price:** $29 (one-time)
   - **Description:**
     ```
     Convert video aspect ratios instantly.
     Perfect for TikTok, Instagram Reels, YouTube Shorts.

     ✓ All formats (MP4, MOV, MKV, AVI, WebM)
     ✓ Up to 4K resolution
     ✓ No watermark
     ✓ Batch conversion
     ✓ Lifetime updates
     ```

### Upload Files
1. Product → Files → Add File
2. Upload your built executables:
   - `VideoConvert-Setup-1.0.0-win.exe`
   - `VideoConvert-1.0.0-mac.dmg`
   - `VideoConvert-1.0.0-linux.AppImage`

### Enable License Keys
1. Product → License Keys → Enable
2. Settings:
   - **Activation limit:** 3 (allows 3 devices)
   - **Key format:** `XXXXX-XXXXX-XXXXX-XXXXX`

---

## Step 4: Integrate License Validation

LemonSqueezy provides an API to validate licenses. Update the Electron app:

### API Endpoint
```
POST https://api.lemonsqueezy.com/v1/licenses/validate
```

### Implementation (already in electron/main.js)
The app already has license validation scaffolding. Update it to use LemonSqueezy:

```javascript
// In electron/main.js - replace the validate-license handler

const LEMON_API_KEY = 'your_api_key_here'; // From LemonSqueezy dashboard

ipcMain.handle('validate-license', async (event, licenseKey) => {
  try {
    const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        license_key: licenseKey,
        instance_name: require('os').hostname()
      })
    });

    const data = await response.json();

    if (data.valid) {
      const Store = require('electron-store');
      const store = new Store();
      store.set('license', licenseKey);
      store.set('isPro', true);
      store.set('licenseData', data);
      return { valid: true, isPro: true };
    }

    return { valid: false, isPro: false, error: data.error };
  } catch (err) {
    return { valid: false, isPro: false, error: err.message };
  }
});
```

---

## Step 5: Create Landing Page

Use the `marketing/homepage.html` as a base, or host on:
- **Vercel** (free): Connect GitHub repo
- **Netlify** (free): Drag & drop deploy
- **Carrd** ($19/yr): Simple landing pages

Update the "Buy" button to link to your LemonSqueezy checkout:
```
https://yourstore.lemonsqueezy.com/checkout/buy/your-product-id
```

---

## Step 6: Distribution Strategy

### Free Version
- Host on GitHub Releases
- Limited features (MP4 only, 720p, watermark)
- In-app prompt to upgrade

### Paid Version
- Sold via LemonSqueezy
- Full features unlocked via license key
- Customer enters key in app → validates → unlocks Pro

---

## Pricing Strategy

| Tier | Price | What's Included |
|------|-------|-----------------|
| **Free** | $0 | MP4 only, 720p max, watermark |
| **Pro** | $29 | All formats, 4K, no watermark, batch |
| **Launch Special** | $19 | Same as Pro (limited time) |

---

## Launch Checklist

- [ ] FFmpeg binaries in `ffmpeg/` folder
- [ ] Build executables: `npm run build:win`
- [ ] Test installer on clean Windows machine
- [ ] LemonSqueezy account verified
- [ ] Product created with files uploaded
- [ ] License keys enabled
- [ ] Landing page deployed
- [ ] Update license validation code with API key
- [ ] Test purchase flow end-to-end
- [ ] Announce on Twitter, Reddit, Product Hunt

---

## Marketing Channels

1. **Product Hunt** - Launch day traffic spike
2. **Reddit** - r/SideProject, r/webdev, r/EntrepreneurRideAlong
3. **Twitter/X** - Build in public, show demos
4. **TikTok** - Ironic: use your own tool to make vertical videos about it
5. **YouTube** - Tutorial videos, before/after comparisons

---

## Revenue Expectations

Realistic first-month targets for a solo launch:
- **Conservative:** 20 sales × $29 = $580
- **Moderate:** 50 sales × $29 = $1,450
- **Good launch:** 100 sales × $29 = $2,900

LemonSqueezy fee (~8%): -$230 on good launch
**Net:** ~$2,670

---

## Support

- Create a simple FAQ page
- Use GitHub Issues for bug reports
- Email support via LemonSqueezy (they provide customer email)

---

## Next Steps

1. Run `npm run build:win` to create the installer
2. Sign up for LemonSqueezy
3. Upload and configure product
4. Deploy landing page
5. Launch! 🚀
