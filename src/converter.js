const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const { ASPECT_RATIOS, VIDEO_FORMATS, TRANSFORM_MODES, RESOLUTION_PRESETS } = require('./constants');

/**
 * VideoConverter class handles all video conversion operations
 */
class VideoConverter {
  constructor(options = {}) {
    this.ffmpegPath = options.ffmpegPath || null;
    this.ffprobePath = options.ffprobePath || null;

    if (this.ffmpegPath) {
      ffmpeg.setFfmpegPath(this.ffmpegPath);
    }
    if (this.ffprobePath) {
      ffmpeg.setFfprobePath(this.ffprobePath);
    }
  }

  /**
   * Get video metadata using ffprobe
   */
  getMetadata(inputPath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(inputPath, (err, metadata) => {
        if (err) {
          reject(new Error(`Failed to read video metadata: ${err.message}`));
          return;
        }

        const videoStream = metadata.streams.find(s => s.codec_type === 'video');
        const audioStream = metadata.streams.find(s => s.codec_type === 'audio');

        if (!videoStream) {
          reject(new Error('No video stream found in file'));
          return;
        }

        resolve({
          width: videoStream.width,
          height: videoStream.height,
          duration: parseFloat(metadata.format.duration) || 0,
          bitrate: parseInt(metadata.format.bit_rate) || 0,
          fps: eval(videoStream.r_frame_rate) || 30,
          videoCodec: videoStream.codec_name,
          audioCodec: audioStream?.codec_name || null,
          hasAudio: !!audioStream,
          aspectRatio: videoStream.width / videoStream.height
        });
      });
    });
  }

  /**
   * Calculate output dimensions for aspect ratio conversion
   */
  calculateDimensions(inputWidth, inputHeight, targetRatio, mode = TRANSFORM_MODES.FIT, resolution = null) {
    const inputRatio = inputWidth / inputHeight;
    let outputWidth, outputHeight, cropWidth, cropHeight, padWidth, padHeight;

    // Determine base dimensions
    if (resolution && RESOLUTION_PRESETS[resolution]) {
      const preset = RESOLUTION_PRESETS[resolution];
      if (targetRatio >= 1) {
        outputWidth = preset.width;
        outputHeight = Math.round(preset.width / targetRatio);
      } else {
        outputHeight = preset.height;
        outputWidth = Math.round(preset.height * targetRatio);
      }
    } else {
      // Use input dimensions as base
      if (targetRatio >= inputRatio) {
        outputWidth = inputWidth;
        outputHeight = Math.round(inputWidth / targetRatio);
      } else {
        outputHeight = inputHeight;
        outputWidth = Math.round(inputHeight * targetRatio);
      }
    }

    // Ensure dimensions are even (required by most codecs)
    outputWidth = Math.round(outputWidth / 2) * 2;
    outputHeight = Math.round(outputHeight / 2) * 2;

    if (mode === TRANSFORM_MODES.FIT) {
      // Calculate letterbox/pillarbox padding
      if (inputRatio > targetRatio) {
        // Input is wider - add vertical padding (letterbox)
        const scaledWidth = outputWidth;
        const scaledHeight = Math.round(outputWidth / inputRatio / 2) * 2;
        padWidth = 0;
        padHeight = Math.round((outputHeight - scaledHeight) / 2);
        return {
          outputWidth,
          outputHeight,
          scaleWidth: scaledWidth,
          scaleHeight: scaledHeight,
          padX: 0,
          padY: padHeight,
          mode: 'pad'
        };
      } else {
        // Input is taller - add horizontal padding (pillarbox)
        const scaledHeight = outputHeight;
        const scaledWidth = Math.round(outputHeight * inputRatio / 2) * 2;
        padWidth = Math.round((outputWidth - scaledWidth) / 2);
        padHeight = 0;
        return {
          outputWidth,
          outputHeight,
          scaleWidth: scaledWidth,
          scaleHeight: scaledHeight,
          padX: padWidth,
          padY: 0,
          mode: 'pad'
        };
      }
    } else if (mode === TRANSFORM_MODES.FILL) {
      // Calculate crop dimensions to fill the frame
      if (inputRatio > targetRatio) {
        // Input is wider - crop sides
        cropHeight = inputHeight;
        cropWidth = Math.round(inputHeight * targetRatio / 2) * 2;
      } else {
        // Input is taller - crop top/bottom
        cropWidth = inputWidth;
        cropHeight = Math.round(inputWidth / targetRatio / 2) * 2;
      }
      return {
        outputWidth,
        outputHeight,
        cropWidth,
        cropHeight,
        cropX: Math.round((inputWidth - cropWidth) / 2),
        cropY: Math.round((inputHeight - cropHeight) / 2),
        mode: 'crop'
      };
    } else {
      // Stretch mode - just scale to target dimensions
      return {
        outputWidth,
        outputHeight,
        mode: 'stretch'
      };
    }
  }

  /**
   * Build ffmpeg filter string for aspect ratio conversion
   */
  buildFilterString(dimensions, backgroundColor = 'black') {
    const { mode, outputWidth, outputHeight } = dimensions;

    if (mode === 'pad') {
      const { scaleWidth, scaleHeight, padX, padY } = dimensions;
      return `scale=${scaleWidth}:${scaleHeight},pad=${outputWidth}:${outputHeight}:${padX}:${padY}:${backgroundColor}`;
    } else if (mode === 'crop') {
      const { cropWidth, cropHeight, cropX, cropY } = dimensions;
      return `crop=${cropWidth}:${cropHeight}:${cropX}:${cropY},scale=${outputWidth}:${outputHeight}`;
    } else {
      return `scale=${outputWidth}:${outputHeight}`;
    }
  }

  /**
   * Convert video with aspect ratio and/or format conversion
   */
  convert(inputPath, outputPath, options = {}) {
    return new Promise(async (resolve, reject) => {
      try {
        const metadata = await this.getMetadata(inputPath);

        const {
          aspectRatio = null,
          format = null,
          transformMode = TRANSFORM_MODES.FIT,
          resolution = null,
          backgroundColor = 'black',
          quality = 'medium',
          onProgress = null
        } = options;

        // Determine output format
        const outputExt = path.extname(outputPath).toLowerCase().slice(1);
        const formatKey = format || outputExt || 'mp4';
        const formatConfig = VIDEO_FORMATS[formatKey];

        if (!formatConfig) {
          throw new Error(`Unsupported format: ${formatKey}`);
        }

        // Start building ffmpeg command
        let command = ffmpeg(inputPath);

        // Apply aspect ratio conversion if specified
        if (aspectRatio) {
          const ratioConfig = ASPECT_RATIOS[aspectRatio];
          if (!ratioConfig) {
            throw new Error(`Unsupported aspect ratio: ${aspectRatio}`);
          }

          const dimensions = this.calculateDimensions(
            metadata.width,
            metadata.height,
            ratioConfig.ratio,
            transformMode,
            resolution
          );

          const filterString = this.buildFilterString(dimensions, backgroundColor);
          command = command.videoFilters(filterString);
        } else if (resolution) {
          // Just apply resolution without aspect ratio change
          const preset = RESOLUTION_PRESETS[resolution];
          if (preset) {
            command = command.size(`${preset.width}x${preset.height}`);
          }
        }

        // Set video codec
        command = command.videoCodec(formatConfig.videoCodec);

        // Set audio codec if input has audio
        if (metadata.hasAudio) {
          command = command.audioCodec(formatConfig.audioCodec);
        } else {
          command = command.noAudio();
        }

        // Set quality presets
        const qualitySettings = this.getQualitySettings(quality, formatConfig.videoCodec);
        Object.entries(qualitySettings).forEach(([key, value]) => {
          command = command.outputOption(`-${key}`, value);
        });

        // Add format-specific options
        if (formatKey === 'mp4') {
          command = command.outputOption('-movflags', '+faststart');
        } else if (formatKey === 'webm') {
          command = command.outputOption('-deadline', 'good');
        }

        // Handle progress
        if (onProgress) {
          command.on('progress', (progress) => {
            onProgress({
              percent: progress.percent || 0,
              frames: progress.frames,
              currentFps: progress.currentFps,
              targetSize: progress.targetSize,
              timemark: progress.timemark
            });
          });
        }

        // Execute conversion
        command
          .on('start', (commandLine) => {
            // Command started
          })
          .on('error', (err) => {
            reject(new Error(`Conversion failed: ${err.message}`));
          })
          .on('end', () => {
            resolve({
              inputPath,
              outputPath,
              inputMetadata: metadata,
              aspectRatio,
              format: formatKey
            });
          })
          .save(outputPath);

      } catch (err) {
        reject(err);
      }
    });
  }

  /**
   * Get quality settings based on preset
   */
  getQualitySettings(quality, codec) {
    const settings = {
      high: { crf: '18', preset: 'slow' },
      medium: { crf: '23', preset: 'medium' },
      low: { crf: '28', preset: 'fast' },
      draft: { crf: '32', preset: 'ultrafast' }
    };

    const preset = settings[quality] || settings.medium;

    // Adjust for different codecs
    if (codec === 'libvpx-vp9') {
      return { crf: preset.crf, 'cpu-used': quality === 'high' ? '1' : '2' };
    } else if (codec === 'libxvid') {
      return { qscale: Math.round(parseInt(preset.crf) / 3) };
    }

    return preset;
  }

  /**
   * Batch convert multiple files
   */
  async batchConvert(files, outputDir, options = {}) {
    const results = [];

    for (const inputPath of files) {
      const basename = path.basename(inputPath, path.extname(inputPath));
      const format = options.format || 'mp4';
      const formatConfig = VIDEO_FORMATS[format];
      const outputPath = path.join(outputDir, `${basename}_converted${formatConfig.extension}`);

      try {
        const result = await this.convert(inputPath, outputPath, options);
        results.push({ success: true, ...result });
      } catch (err) {
        results.push({ success: false, inputPath, error: err.message });
      }
    }

    return results;
  }

  /**
   * Get supported aspect ratios
   */
  static getSupportedRatios() {
    return Object.entries(ASPECT_RATIOS).map(([key, value]) => ({
      ratio: key,
      ...value
    }));
  }

  /**
   * Get supported formats
   */
  static getSupportedFormats() {
    return Object.entries(VIDEO_FORMATS).map(([key, value]) => ({
      format: key,
      ...value
    }));
  }
}

module.exports = VideoConverter;
