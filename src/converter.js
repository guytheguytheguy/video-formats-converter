const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs');
const { ASPECT_RATIOS, VIDEO_FORMATS, TRANSFORM_MODES, RESOLUTION_PRESETS } = require('./constants');

// Get bundled FFmpeg paths - handles both dev and packaged Electron app
function getBundledPaths() {
  try {
    // Check if running in packaged Electron app
    const isPackaged = process.resourcesPath &&
                       (process.resourcesPath.includes('app.asar') ||
                        fs.existsSync(path.join(process.resourcesPath, 'app.asar')));

    if (isPackaged) {
      // In packaged app, binaries are in app.asar.unpacked
      const unpackedPath = path.join(process.resourcesPath, 'app.asar.unpacked', 'node_modules');
      const platform = process.platform === 'win32' ? 'win32' : process.platform === 'darwin' ? 'darwin' : 'linux';
      const arch = process.arch;

      const ffmpegPath = path.join(unpackedPath, 'ffmpeg-static', platform === 'win32' ? 'ffmpeg.exe' : 'ffmpeg');
      const ffprobePath = path.join(unpackedPath, 'ffprobe-static', 'bin', platform, arch, platform === 'win32' ? 'ffprobe.exe' : 'ffprobe');

      console.log('Packaged mode - ffmpeg:', ffmpegPath, 'exists:', fs.existsSync(ffmpegPath));
      console.log('Packaged mode - ffprobe:', ffprobePath, 'exists:', fs.existsSync(ffprobePath));

      return { ffmpegPath, ffprobePath };
    }

    // Development mode - use require which resolves to node_modules
    const ffmpegPath = require('ffmpeg-static');
    const ffprobePath = require('ffprobe-static').path;
    console.log('Dev mode - ffmpeg:', ffmpegPath);
    console.log('Dev mode - ffprobe:', ffprobePath);
    return { ffmpegPath, ffprobePath };
  } catch (err) {
    console.error('Failed to get bundled paths:', err);
    // Fallback to system PATH if bundled versions not available
    return { ffmpegPath: null, ffprobePath: null };
  }
}

/**
 * VideoConverter class handles all video conversion operations
 */
class VideoConverter {
  constructor(options = {}) {
    const bundled = getBundledPaths();
    this.ffmpegPath = options.ffmpegPath || bundled.ffmpegPath;
    this.ffprobePath = options.ffprobePath || bundled.ffprobePath;

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
    // For portrait output (9:16), we want to maximize the output size
    // Use the larger input dimension as the basis
    if (resolution && RESOLUTION_PRESETS[resolution]) {
      const preset = RESOLUTION_PRESETS[resolution];
      if (targetRatio >= 1) {
        // Landscape output
        outputWidth = preset.width;
        outputHeight = Math.round(preset.width / targetRatio);
      } else {
        // Portrait output
        outputHeight = preset.height;
        outputWidth = Math.round(preset.height * targetRatio);
      }
    } else {
      // No resolution specified - use input dimensions smartly
      const maxDimension = Math.max(inputWidth, inputHeight);

      if (targetRatio >= 1) {
        // Landscape output (16:9, etc) - width is larger
        outputWidth = maxDimension;
        outputHeight = Math.round(maxDimension / targetRatio);
      } else {
        // Portrait output (9:16, etc) - height is larger
        outputHeight = maxDimension;
        outputWidth = Math.round(maxDimension * targetRatio);
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
      // FILL mode: Scale to fill entire frame, crop excess
      // For 16:9 -> 9:16: scale up so height fills, then crop left/right
      if (inputRatio > targetRatio) {
        // Input is wider than target - scale based on height, crop width
        // Scale so input height -> output height, then crop the extra width
        const scaleRatio = outputHeight / inputHeight;
        const scaledWidth = Math.ceil((inputWidth * scaleRatio) / 2) * 2;
        // Crop from center
        cropWidth = outputWidth;
        cropHeight = outputHeight;
        const cropX = Math.max(0, Math.floor((scaledWidth - outputWidth) / 4) * 2);
        return {
          outputWidth,
          outputHeight,
          scaledWidth,
          scaledHeight: outputHeight,
          cropX,
          cropY: 0,
          mode: 'scale_crop'
        };
      } else {
        // Input is taller than target - scale based on width, crop height
        const scaleRatio = outputWidth / inputWidth;
        const scaledHeight = Math.ceil((inputHeight * scaleRatio) / 2) * 2;
        cropWidth = outputWidth;
        cropHeight = outputHeight;
        const cropY = Math.max(0, Math.floor((scaledHeight - outputHeight) / 4) * 2);
        return {
          outputWidth,
          outputHeight,
          scaledWidth: outputWidth,
          scaledHeight,
          cropX: 0,
          cropY,
          mode: 'scale_crop'
        };
      }
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
    } else if (mode === 'scale_crop') {
      // Scale first to fill, then crop to exact dimensions
      const { scaledWidth, scaledHeight, cropX, cropY } = dimensions;
      return `scale=${scaledWidth}:${scaledHeight},crop=${outputWidth}:${outputHeight}:${cropX}:${cropY}`;
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
          watermark = false,
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

          let filterString = this.buildFilterString(dimensions, backgroundColor);

          // Add watermark for free users
          if (watermark) {
            filterString += `,drawtext=text='VideoConvert Free':fontsize=24:fontcolor=white@0.5:x=10:y=h-40`;
          }

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
