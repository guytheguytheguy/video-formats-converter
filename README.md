# Video Formats Converter

A Node.js CLI tool and library for converting video aspect ratios and formats. Perfect for creating content optimized for different platforms.

## Features

- **Aspect Ratio Conversion**: Convert between 16:9, 9:16, 1:1, and 4:5
- **Format Conversion**: Support for MP4, MOV, MKV, AVI, and WebM
- **Transform Modes**: Fit (letterbox), Fill (crop), or Stretch
- **Quality Presets**: High, medium, low, and draft quality options
- **Batch Processing**: Convert entire directories at once

## Prerequisites

**FFmpeg is required**. Install it before using this tool:

```bash
# Windows (using Chocolatey)
choco install ffmpeg

# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg
```

## Installation

```bash
npm install
npm link  # For global CLI access
```

## CLI Usage

### Convert a Video

```bash
# Convert 16:9 landscape to 9:16 portrait (main use case)
vconvert convert video.mp4 -r 9:16

# Convert with specific output path
vconvert convert video.mp4 -r 9:16 -o portrait_video.mp4

# Convert format and aspect ratio
vconvert convert video.mov -r 1:1 -f mp4

# Use fill mode (crop instead of letterbox)
vconvert convert video.mp4 -r 9:16 -m fill

# High quality conversion
vconvert convert video.mp4 -r 9:16 -q high
```

### Quick Convert Commands

```bash
# Convert to portrait (9:16) for TikTok/Reels
vconvert portrait video.mp4

# Convert to landscape (16:9)
vconvert landscape video.mp4

# Convert to square (1:1)
vconvert square video.mp4
```

### Batch Convert

```bash
# Convert all videos in a folder to 9:16
vconvert batch ./videos -r 9:16

# Convert to specific format
vconvert batch ./videos -r 9:16 -f mp4 -o ./converted
```

### Get Video Info

```bash
vconvert info video.mp4
```

### List Supported Options

```bash
vconvert list
```

## Options Reference

| Option | Description | Values |
|--------|-------------|--------|
| `-r, --ratio` | Target aspect ratio | `16:9`, `9:16`, `1:1`, `4:5` |
| `-f, --format` | Output format | `mp4`, `mov`, `mkv`, `avi`, `webm` |
| `-m, --mode` | Transform mode | `fit`, `fill`, `stretch` |
| `-q, --quality` | Quality preset | `high`, `medium`, `low`, `draft` |
| `-s, --resolution` | Resolution preset | `4k`, `1080p`, `720p`, `480p`, `360p` |
| `-b, --background` | Padding color | Any color name or hex |
| `-o, --output` | Output path | File path |

## Transform Modes

| Mode | Description |
|------|-------------|
| **fit** | Scales video to fit within frame, adds black bars (letterbox/pillarbox) |
| **fill** | Scales video to fill frame completely, crops excess |
| **stretch** | Stretches video to fit frame (distorts aspect ratio) |

## Aspect Ratios

| Ratio | Name | Use Case |
|-------|------|----------|
| **16:9** | Landscape | YouTube, TVs, monitors |
| **9:16** | Portrait | TikTok, Instagram Stories, YouTube Shorts |
| **1:1** | Square | Instagram feed, Facebook |
| **4:5** | Portrait | Instagram feed (taller) |

## Programmatic Usage

```javascript
const { VideoConverter, TRANSFORM_MODES } = require('video-formats-converter');

const converter = new VideoConverter();

// Convert aspect ratio
await converter.convert('input.mp4', 'output.mp4', {
  aspectRatio: '9:16',
  transformMode: TRANSFORM_MODES.FIT,
  quality: 'high',
  onProgress: (progress) => {
    console.log(`${progress.percent}% complete`);
  }
});

// Get video metadata
const metadata = await converter.getMetadata('video.mp4');
console.log(metadata);
// { width, height, duration, fps, aspectRatio, ... }

// Batch convert
const results = await converter.batchConvert(
  ['video1.mp4', 'video2.mp4'],
  './output',
  { aspectRatio: '9:16', format: 'mp4' }
);
```

## Examples

### 16:9 to 9:16 (Most Common)

Converting a standard YouTube/TV video to TikTok/Reels format:

```bash
# With letterboxing (fit mode - default)
vconvert convert youtube_video.mp4 -r 9:16

# With cropping (fill mode)
vconvert convert youtube_video.mp4 -r 9:16 -m fill
```

### Create Square Video for Instagram

```bash
vconvert square video.mp4 -m fill
```

### Convert MOV to MP4

```bash
vconvert convert video.mov -f mp4
```

### High Quality Export

```bash
vconvert convert video.mp4 -r 9:16 -q high -s 1080p
```

## License

MIT
