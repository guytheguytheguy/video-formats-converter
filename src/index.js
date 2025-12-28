/**
 * Video Formats Converter
 *
 * A comprehensive video conversion library supporting:
 * - Aspect ratio conversion (16:9, 9:16, 1:1, 4:5)
 * - Format conversion (MP4, MOV, MKV, AVI, WebM)
 * - Multiple transform modes (fit, fill, stretch)
 */

const VideoConverter = require('./converter');
const {
  ASPECT_RATIOS,
  VIDEO_FORMATS,
  TRANSFORM_MODES,
  RESOLUTION_PRESETS
} = require('./constants');

module.exports = {
  VideoConverter,
  ASPECT_RATIOS,
  VIDEO_FORMATS,
  TRANSFORM_MODES,
  RESOLUTION_PRESETS
};
