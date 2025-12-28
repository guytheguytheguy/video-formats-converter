/**
 * Video aspect ratio definitions
 */
const ASPECT_RATIOS = {
  '16:9': {
    name: 'Landscape/Widescreen',
    ratio: 16 / 9,
    width: 16,
    height: 9,
    description: 'Standard HD video for YouTube, TVs, monitors'
  },
  '9:16': {
    name: 'Portrait/Vertical',
    ratio: 9 / 16,
    width: 9,
    height: 16,
    description: 'Mobile-first format for TikTok, Instagram Stories, YouTube Shorts'
  },
  '1:1': {
    name: 'Square',
    ratio: 1,
    width: 1,
    height: 1,
    description: 'Popular on Instagram and Facebook feeds'
  },
  '4:5': {
    name: 'Portrait',
    ratio: 4 / 5,
    width: 4,
    height: 5,
    description: 'Instagram and Facebook portrait format'
  }
};

/**
 * Video format definitions with codec settings
 */
const VIDEO_FORMATS = {
  mp4: {
    extension: '.mp4',
    name: 'MP4',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    description: 'Universal format, best for online sharing'
  },
  mov: {
    extension: '.mov',
    name: 'MOV',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    description: 'Apple QuickTime format, high quality'
  },
  mkv: {
    extension: '.mkv',
    name: 'MKV',
    videoCodec: 'libx264',
    audioCodec: 'aac',
    description: 'Open-source container, supports multiple tracks'
  },
  avi: {
    extension: '.avi',
    name: 'AVI',
    videoCodec: 'libxvid',
    audioCodec: 'libmp3lame',
    description: 'Microsoft format, high quality, large files'
  },
  webm: {
    extension: '.webm',
    name: 'WebM',
    videoCodec: 'libvpx-vp9',
    audioCodec: 'libopus',
    description: 'Royalty-free format for HTML5 web video'
  }
};

/**
 * Transformation modes for aspect ratio conversion
 */
const TRANSFORM_MODES = {
  FIT: 'fit',           // Fit entire video with letterbox/pillarbox
  FILL: 'fill',         // Fill frame, crop excess
  STRETCH: 'stretch'    // Stretch to fit (distorts video)
};

/**
 * Common resolution presets
 */
const RESOLUTION_PRESETS = {
  '4k': { width: 3840, height: 2160 },
  '1080p': { width: 1920, height: 1080 },
  '720p': { width: 1280, height: 720 },
  '480p': { width: 854, height: 480 },
  '360p': { width: 640, height: 360 }
};

module.exports = {
  ASPECT_RATIOS,
  VIDEO_FORMATS,
  TRANSFORM_MODES,
  RESOLUTION_PRESETS
};
