# Video Formats Converter - Project Summary

## Overview

A desktop video converter application that converts videos between aspect ratios and formats. Built for content creators who need to repurpose landscape videos (16:9) for vertical platforms like TikTok, Instagram Reels, and YouTube Shorts.

## Key Features

- **Aspect Ratio Conversion**: 16:9, 9:16, 1:1, 4:5
- **Format Support**: MP4, MOV, MKV, AVI, WebM
- **Transform Modes**: Fit (letterbox), Fill (crop to fill), Stretch
- **Resolution Presets**: 720p, 1080p, 4K
- **Real-time Progress**: Socket.IO for live conversion updates
- **Web Dashboard**: Modern dark-themed UI

## Tech Stack

| Component | Technology |
|-----------|------------|
| Core Engine | FFmpeg via `fluent-ffmpeg` |
| CLI | Node.js with `commander` |
| Web Server | Express + Socket.IO |
| Desktop App | Electron |
| Packaging | electron-builder |
| License Management | LemonSqueezy (recommended) |

## Project Structure

```
video-formats/
├── src/
│   ├── cli.js          # Command-line interface
│   ├── converter.js    # Core video conversion logic
│   ├── server.js       # Express server with API
│   └── constants.js    # Configuration constants
├── electron/
│   ├── main.js         # Electron main process
│   └── preload.js      # Preload scripts
├── public/
│   ├── index.html      # Web dashboard
│   ├── css/styles.css  # Styling
│   └── js/app.js       # Frontend logic
├── scripts/
│   └── kill-port.js    # Port cleanup utility
└── dist-electron/      # Built executables
```

## Freemium Model

### Free Tier
- MP4 format only
- 720p max resolution
- Watermark on output videos
- Single file conversion

### Pro Tier ($29 one-time)
- All formats (MP4, MOV, MKV, AVI, WebM)
- Up to 4K resolution
- No watermark
- Batch conversion
- Lifetime updates

## Built Executables

| File | Size | Type |
|------|------|------|
| `VideoConvert Setup 1.0.0.exe` | ~182 MB | Windows Installer |
| `VideoConvert 1.0.0.exe` | ~182 MB | Windows Portable |

**Note:** Executables include bundled FFmpeg - no external dependencies required!

## Quick Commands

```bash
# Run web server
npm run server

# Run Electron app (starts server automatically)
npm run electron

# Build Windows installer
npm run build:win

# Build for all platforms
npm run build:all

# CLI usage
npm start -- convert input.mp4 output.mp4 --ratio 9:16 --mode fill
npm start -- portrait input.mp4    # Quick 9:16 conversion
npm start -- landscape input.mp4   # Quick 16:9 conversion
npm start -- square input.mp4      # Quick 1:1 conversion
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/config` | GET | Get supported ratios/formats |
| `/api/upload` | POST | Upload video file |
| `/api/convert` | POST | Start conversion job |
| `/api/job/:id` | GET | Get job status |
| `/api/license` | GET | Get license status |
| `/api/license/activate` | POST | Activate license key |
| `/api/license/deactivate` | POST | Remove license |

## License Key Format

```
VC-XXXX-XXXX-XXXX
```

Example: `VC-ABC1-DEF2-GHI3`

## Distribution

See [BUILD_AND_SELL.md](./BUILD_AND_SELL.md) for detailed instructions on:
- Setting up LemonSqueezy for license sales
- Building installers for Windows/Mac/Linux
- Creating your product listing
- Integrating license validation

## Requirements

**For Users (Desktop App):**
- Windows 10+ / macOS 10.15+ / Ubuntu 20.04+
- No additional software needed (FFmpeg is bundled)

**For Developers:**
- Node.js 18+
- FFmpeg bundled via `ffmpeg-static` (auto-installed with npm)

## Development

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Test a conversion
npm start -- convert sample.mp4 output.mp4 --ratio 9:16 --mode fill --quality high
```

## Next Steps

1. **Set up LemonSqueezy** - Create account and product listing
2. **Add real license validation** - Implement LemonSqueezy API calls in server.js
3. **Create app icon** - Replace default Electron icon
4. **Code signing** - Get certificate for trusted installs
5. **Auto-updates** - Implement electron-updater
