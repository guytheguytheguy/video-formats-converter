# Tech Stack Documentation

## Overview

Video Formats Converter is a full-stack application providing both CLI and web-based video conversion capabilities. This document details the complete technical architecture.

---

## Core Technologies

### Runtime Environment

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18.x+ | JavaScript runtime environment |
| **npm** | 9.x+ | Package management |

### Video Processing

| Technology | Version | Purpose |
|------------|---------|---------|
| **FFmpeg** | 6.x+ | Core video processing engine |
| **fluent-ffmpeg** | 2.1.3 | Node.js FFmpeg wrapper |

FFmpeg handles all video operations:
- Codec transcoding (H.264, VP9, Xvid)
- Container format conversion
- Video scaling and cropping
- Filter graph processing

---

## Backend Stack

### Web Server

| Technology | Version | Purpose |
|------------|---------|---------|
| **Express.js** | 4.18.x | HTTP server framework |
| **Socket.IO** | 4.7.x | Real-time bidirectional communication |
| **Multer** | 1.4.5 | Multipart file upload handling |

### Architecture Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                        Client (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│  HTML/CSS/JS  │  Socket.IO Client  │  Fetch API             │
└───────┬───────┴─────────┬──────────┴─────────┬──────────────┘
        │                 │                    │
        ▼                 ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                     Express.js Server                        │
├─────────────────────────────────────────────────────────────┤
│  Static Files  │  REST API  │  Socket.IO Server             │
└───────┬────────┴─────┬──────┴─────────┬─────────────────────┘
        │              │                │
        ▼              ▼                ▼
┌─────────────────────────────────────────────────────────────┐
│                    VideoConverter Class                      │
├─────────────────────────────────────────────────────────────┤
│  Metadata Extraction  │  Filter Building  │  Transcoding    │
└───────────────────────┴─────────┬─────────┴─────────────────┘
                                  │
                                  ▼
┌─────────────────────────────────────────────────────────────┐
│                         FFmpeg                               │
└─────────────────────────────────────────────────────────────┘
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/config` | Retrieve supported formats and ratios |
| `POST` | `/api/upload` | Upload video file |
| `POST` | `/api/convert` | Start conversion job |
| `GET` | `/api/job/:id` | Get job status |
| `DELETE` | `/api/file/:id` | Clean up files |

### WebSocket Events

| Event | Direction | Description |
|-------|-----------|-------------|
| `progress:{jobId}` | Server → Client | Conversion progress updates |
| `complete:{jobId}` | Server → Client | Conversion completed |
| `error:{jobId}` | Server → Client | Conversion failed |

---

## CLI Stack

### Command Line Interface

| Technology | Version | Purpose |
|------------|---------|---------|
| **Commander.js** | 12.x | CLI argument parsing and commands |
| **Chalk** | 4.1.x | Terminal string styling |
| **Ora** | 5.4.x | Terminal spinners and progress |

### CLI Commands

```bash
vconvert convert <input>   # Convert single video
vconvert batch <dir>       # Batch convert directory
vconvert info <input>      # Show video metadata
vconvert list              # List supported options
vconvert portrait <input>  # Quick 9:16 conversion
vconvert landscape <input> # Quick 16:9 conversion
vconvert square <input>    # Quick 1:1 conversion
```

---

## Frontend Stack

### Technologies

| Technology | Purpose |
|------------|---------|
| **Vanilla JavaScript** | No framework dependencies, fast loading |
| **CSS3** | Modern styling with CSS variables |
| **Google Fonts (Inter)** | Typography |
| **Socket.IO Client** | Real-time updates |

### Design System

```css
:root {
  --primary: #6366f1;      /* Indigo - primary actions */
  --secondary: #10b981;    /* Emerald - success states */
  --background: #0f0f1a;   /* Dark blue-black */
  --surface: #1a1a2e;      /* Card backgrounds */
  --text: #ffffff;         /* Primary text */
  --text-muted: #9ca3af;   /* Secondary text */
}
```

### Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Video Processing Details

### Supported Aspect Ratios

| Ratio | Dimensions | Use Case |
|-------|------------|----------|
| 16:9 | 1920x1080 | YouTube, TV, Desktop |
| 9:16 | 1080x1920 | TikTok, Reels, Shorts |
| 1:1 | 1080x1080 | Instagram, Facebook |
| 4:5 | 1080x1350 | Instagram Portrait |

### Supported Formats

| Format | Container | Video Codec | Audio Codec |
|--------|-----------|-------------|-------------|
| MP4 | MPEG-4 | H.264 (libx264) | AAC |
| MOV | QuickTime | H.264 (libx264) | AAC |
| MKV | Matroska | H.264 (libx264) | AAC |
| AVI | AVI | Xvid (libxvid) | MP3 |
| WebM | WebM | VP9 (libvpx-vp9) | Opus |

### Transform Modes

1. **Fit (Letterbox/Pillarbox)**
   - Scales video to fit within target dimensions
   - Adds black bars to fill remaining space
   - Preserves original aspect ratio

2. **Fill (Crop)**
   - Scales video to fill target dimensions
   - Crops excess content from edges
   - No black bars

3. **Stretch**
   - Stretches video to match target dimensions
   - Distorts original aspect ratio
   - No cropping or bars

### FFmpeg Filter Graphs

```
# Fit mode (letterbox)
scale=1080:608,pad=1080:1920:0:656:black

# Fill mode (crop)
crop=1080:607:420:0,scale=1080:1920

# Stretch mode
scale=1080:1920
```

---

## Quality Presets

| Preset | CRF | FFmpeg Preset | Use Case |
|--------|-----|---------------|----------|
| High | 18 | slow | Final production |
| Medium | 23 | medium | General use |
| Low | 28 | fast | Quick exports |
| Draft | 32 | ultrafast | Preview only |

---

## File Structure

```
video-formats-converter/
├── src/
│   ├── index.js        # Library entry point
│   ├── cli.js          # CLI interface
│   ├── server.js       # Express server
│   ├── converter.js    # Core conversion logic
│   └── constants.js    # Configuration constants
├── public/
│   ├── index.html      # Web dashboard
│   ├── css/
│   │   └── styles.css  # Stylesheet
│   └── js/
│       └── app.js      # Frontend JavaScript
├── uploads/            # Temporary upload storage
├── output/             # Converted files
├── package.json
├── .gitignore
└── README.md
```

---

## Performance Considerations

### Memory Management
- Files are processed using streams
- Large files are handled without loading entirely into memory
- Temporary files are cleaned up after conversion

### Concurrency
- Multiple conversions can run simultaneously
- Socket.IO provides isolated progress tracking per job
- UUID-based job IDs prevent conflicts

### Optimization Tips
- Use hardware acceleration when available (`-hwaccel auto`)
- Adjust quality preset based on hardware capabilities
- Consider resolution downscaling for faster processing

---

## Security

- File type validation on upload
- Size limits enforced (500MB default)
- Sandboxed file storage directories
- No shell command injection vulnerabilities

---

## Dependencies Summary

```json
{
  "dependencies": {
    "chalk": "^4.1.2",
    "commander": "^12.0.0",
    "express": "^4.18.2",
    "fluent-ffmpeg": "^2.1.3",
    "multer": "^1.4.5-lts.1",
    "ora": "^5.4.1",
    "socket.io": "^4.7.2",
    "uuid": "^9.0.0"
  }
}
```

---

## External Requirements

### FFmpeg Installation

**Windows:**
```bash
choco install ffmpeg
# or download from https://ffmpeg.org/download.html
```

**macOS:**
```bash
brew install ffmpeg
```

**Linux:**
```bash
sudo apt install ffmpeg
# or
sudo dnf install ffmpeg
```

---

## License

MIT License - See LICENSE file for details.
