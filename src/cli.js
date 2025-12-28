#!/usr/bin/env node

const { program } = require('commander');
const path = require('path');
const fs = require('fs');
const ora = require('ora');
const chalk = require('chalk');
const VideoConverter = require('./converter');
const { ASPECT_RATIOS, VIDEO_FORMATS, TRANSFORM_MODES, RESOLUTION_PRESETS } = require('./constants');

// ASCII Banner
const banner = `
╔═══════════════════════════════════════════════════════════╗
║           VIDEO FORMATS CONVERTER v1.0.0                  ║
║     Convert aspect ratios and formats with ease           ║
╚═══════════════════════════════════════════════════════════╝
`;

program
  .name('vconvert')
  .description('Video format and aspect ratio converter')
  .version('1.0.0');

// Main convert command
program
  .command('convert <input>')
  .alias('c')
  .description('Convert a video file')
  .option('-o, --output <path>', 'Output file path')
  .option('-r, --ratio <ratio>', 'Target aspect ratio (16:9, 9:16, 1:1, 4:5)')
  .option('-f, --format <format>', 'Output format (mp4, mov, mkv, avi, webm)')
  .option('-m, --mode <mode>', 'Transform mode: fit, fill, stretch', 'fit')
  .option('-q, --quality <quality>', 'Quality preset: high, medium, low, draft', 'medium')
  .option('-s, --resolution <res>', 'Resolution preset: 4k, 1080p, 720p, 480p, 360p')
  .option('-b, --background <color>', 'Background color for padding', 'black')
  .option('--ffmpeg <path>', 'Custom ffmpeg path')
  .option('--ffprobe <path>', 'Custom ffprobe path')
  .action(async (input, options) => {
    console.log(chalk.cyan(banner));

    const spinner = ora('Initializing converter...').start();

    try {
      // Validate input file
      const inputPath = path.resolve(input);
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Input file not found: ${inputPath}`);
      }

      // Validate aspect ratio
      if (options.ratio && !ASPECT_RATIOS[options.ratio]) {
        throw new Error(`Invalid aspect ratio: ${options.ratio}. Valid options: ${Object.keys(ASPECT_RATIOS).join(', ')}`);
      }

      // Validate format
      if (options.format && !VIDEO_FORMATS[options.format]) {
        throw new Error(`Invalid format: ${options.format}. Valid options: ${Object.keys(VIDEO_FORMATS).join(', ')}`);
      }

      // Validate transform mode
      const validModes = Object.values(TRANSFORM_MODES);
      if (!validModes.includes(options.mode)) {
        throw new Error(`Invalid mode: ${options.mode}. Valid options: ${validModes.join(', ')}`);
      }

      // Determine output path
      let outputPath = options.output;
      if (!outputPath) {
        const dir = path.dirname(inputPath);
        const basename = path.basename(inputPath, path.extname(inputPath));
        const ext = VIDEO_FORMATS[options.format]?.extension || path.extname(inputPath);
        const ratioSuffix = options.ratio ? `_${options.ratio.replace(':', 'x')}` : '';
        outputPath = path.join(dir, `${basename}${ratioSuffix}_converted${ext}`);
      }

      // Initialize converter
      const converter = new VideoConverter({
        ffmpegPath: options.ffmpeg,
        ffprobePath: options.ffprobe
      });

      // Get input metadata
      spinner.text = 'Reading video metadata...';
      const metadata = await converter.getMetadata(inputPath);

      console.log('\n' + chalk.yellow('Input Video:'));
      console.log(`  Resolution: ${metadata.width}x${metadata.height}`);
      console.log(`  Duration: ${formatDuration(metadata.duration)}`);
      console.log(`  Aspect Ratio: ${(metadata.aspectRatio).toFixed(2)}:1`);
      console.log(`  Codec: ${metadata.videoCodec}`);

      if (options.ratio) {
        console.log('\n' + chalk.yellow('Conversion:'));
        console.log(`  Target Ratio: ${options.ratio} (${ASPECT_RATIOS[options.ratio].name})`);
        console.log(`  Mode: ${options.mode}`);
      }

      console.log('\n' + chalk.yellow('Output:'));
      console.log(`  Path: ${outputPath}`);
      console.log(`  Format: ${options.format || path.extname(outputPath).slice(1)}`);
      console.log(`  Quality: ${options.quality}`);
      console.log('');

      spinner.text = 'Converting video...';

      // Convert video
      const result = await converter.convert(inputPath, outputPath, {
        aspectRatio: options.ratio,
        format: options.format,
        transformMode: options.mode,
        resolution: options.resolution,
        backgroundColor: options.background,
        quality: options.quality,
        onProgress: (progress) => {
          if (progress.percent) {
            spinner.text = `Converting... ${Math.round(progress.percent)}%`;
          }
        }
      });

      spinner.succeed(chalk.green('Conversion complete!'));
      console.log(chalk.green(`\nOutput saved to: ${outputPath}`));

    } catch (err) {
      spinner.fail(chalk.red(`Error: ${err.message}`));
      process.exit(1);
    }
  });

// Batch convert command
program
  .command('batch <inputDir>')
  .alias('b')
  .description('Batch convert all videos in a directory')
  .option('-o, --output <dir>', 'Output directory')
  .option('-r, --ratio <ratio>', 'Target aspect ratio')
  .option('-f, --format <format>', 'Output format', 'mp4')
  .option('-m, --mode <mode>', 'Transform mode: fit, fill, stretch', 'fit')
  .option('-q, --quality <quality>', 'Quality preset', 'medium')
  .option('-e, --extensions <exts>', 'Input extensions to process', 'mp4,mov,mkv,avi,webm')
  .action(async (inputDir, options) => {
    console.log(chalk.cyan(banner));

    const spinner = ora('Scanning directory...').start();

    try {
      const inputPath = path.resolve(inputDir);
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Directory not found: ${inputPath}`);
      }

      // Find video files
      const extensions = options.extensions.split(',').map(e => `.${e.trim()}`);
      const files = fs.readdirSync(inputPath)
        .filter(file => extensions.includes(path.extname(file).toLowerCase()))
        .map(file => path.join(inputPath, file));

      if (files.length === 0) {
        throw new Error('No video files found in directory');
      }

      spinner.info(`Found ${files.length} video files`);

      // Determine output directory
      const outputDir = options.output ? path.resolve(options.output) : path.join(inputPath, 'converted');
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      const converter = new VideoConverter();
      let completed = 0;
      let failed = 0;

      for (const file of files) {
        const basename = path.basename(file);
        spinner.start(`Converting ${basename} (${completed + failed + 1}/${files.length})...`);

        try {
          const outputName = path.basename(file, path.extname(file));
          const outputFile = path.join(outputDir, `${outputName}_converted.${options.format}`);

          await converter.convert(file, outputFile, {
            aspectRatio: options.ratio,
            format: options.format,
            transformMode: options.mode,
            quality: options.quality
          });

          completed++;
          spinner.succeed(`Converted: ${basename}`);
        } catch (err) {
          failed++;
          spinner.fail(`Failed: ${basename} - ${err.message}`);
        }
      }

      console.log('\n' + chalk.green(`Batch conversion complete!`));
      console.log(`  Successful: ${completed}`);
      console.log(`  Failed: ${failed}`);
      console.log(`  Output: ${outputDir}`);

    } catch (err) {
      spinner.fail(chalk.red(`Error: ${err.message}`));
      process.exit(1);
    }
  });

// Info command - show metadata
program
  .command('info <input>')
  .alias('i')
  .description('Show video file information')
  .action(async (input) => {
    const spinner = ora('Reading metadata...').start();

    try {
      const inputPath = path.resolve(input);
      if (!fs.existsSync(inputPath)) {
        throw new Error(`File not found: ${inputPath}`);
      }

      const converter = new VideoConverter();
      const metadata = await converter.getMetadata(inputPath);

      spinner.stop();

      console.log(chalk.cyan('\nVideo Information:'));
      console.log(chalk.yellow('─'.repeat(40)));
      console.log(`  File:        ${path.basename(inputPath)}`);
      console.log(`  Resolution:  ${metadata.width}x${metadata.height}`);
      console.log(`  Duration:    ${formatDuration(metadata.duration)}`);
      console.log(`  Aspect Ratio: ${(metadata.aspectRatio).toFixed(2)}:1 (${detectRatio(metadata.aspectRatio)})`);
      console.log(`  Frame Rate:  ${metadata.fps.toFixed(2)} fps`);
      console.log(`  Bitrate:     ${formatBitrate(metadata.bitrate)}`);
      console.log(`  Video Codec: ${metadata.videoCodec}`);
      console.log(`  Audio:       ${metadata.hasAudio ? metadata.audioCodec : 'None'}`);
      console.log(chalk.yellow('─'.repeat(40)));

    } catch (err) {
      spinner.fail(chalk.red(`Error: ${err.message}`));
      process.exit(1);
    }
  });

// List supported formats and ratios
program
  .command('list')
  .alias('l')
  .description('List supported formats and aspect ratios')
  .action(() => {
    console.log(chalk.cyan(banner));

    console.log(chalk.yellow('\nSupported Aspect Ratios:'));
    console.log('─'.repeat(60));
    Object.entries(ASPECT_RATIOS).forEach(([key, value]) => {
      console.log(`  ${chalk.green(key.padEnd(8))} ${value.name.padEnd(20)} ${chalk.gray(value.description)}`);
    });

    console.log(chalk.yellow('\nSupported Formats:'));
    console.log('─'.repeat(60));
    Object.entries(VIDEO_FORMATS).forEach(([key, value]) => {
      console.log(`  ${chalk.green(key.padEnd(8))} ${value.name.padEnd(8)} ${chalk.gray(value.description)}`);
    });

    console.log(chalk.yellow('\nTransform Modes:'));
    console.log('─'.repeat(60));
    console.log(`  ${chalk.green('fit'.padEnd(10))} Scale to fit, add letterbox/pillarbox padding`);
    console.log(`  ${chalk.green('fill'.padEnd(10))} Scale to fill, crop excess`);
    console.log(`  ${chalk.green('stretch'.padEnd(10))} Stretch to fit (distorts video)`);

    console.log(chalk.yellow('\nResolution Presets:'));
    console.log('─'.repeat(60));
    Object.entries(RESOLUTION_PRESETS).forEach(([key, value]) => {
      console.log(`  ${chalk.green(key.padEnd(8))} ${value.width}x${value.height}`);
    });

    console.log('');
  });

// Quick convert shortcuts
program
  .command('landscape <input>')
  .description('Quick convert to 16:9 landscape format')
  .option('-o, --output <path>', 'Output file path')
  .option('-m, --mode <mode>', 'Transform mode', 'fit')
  .action(async (input, options) => {
    await runQuickConvert(input, '16:9', options);
  });

program
  .command('portrait <input>')
  .description('Quick convert to 9:16 portrait format (TikTok/Reels)')
  .option('-o, --output <path>', 'Output file path')
  .option('-m, --mode <mode>', 'Transform mode', 'fit')
  .action(async (input, options) => {
    await runQuickConvert(input, '9:16', options);
  });

program
  .command('square <input>')
  .description('Quick convert to 1:1 square format')
  .option('-o, --output <path>', 'Output file path')
  .option('-m, --mode <mode>', 'Transform mode', 'fit')
  .action(async (input, options) => {
    await runQuickConvert(input, '1:1', options);
  });

// Helper function for quick converts
async function runQuickConvert(input, ratio, options) {
  const spinner = ora(`Converting to ${ratio}...`).start();

  try {
    const inputPath = path.resolve(input);
    if (!fs.existsSync(inputPath)) {
      throw new Error(`File not found: ${inputPath}`);
    }

    const dir = path.dirname(inputPath);
    const basename = path.basename(inputPath, path.extname(inputPath));
    const ext = path.extname(inputPath);
    const outputPath = options.output || path.join(dir, `${basename}_${ratio.replace(':', 'x')}${ext}`);

    const converter = new VideoConverter();
    await converter.convert(inputPath, outputPath, {
      aspectRatio: ratio,
      transformMode: options.mode,
      onProgress: (progress) => {
        if (progress.percent) {
          spinner.text = `Converting to ${ratio}... ${Math.round(progress.percent)}%`;
        }
      }
    });

    spinner.succeed(chalk.green(`Converted to ${ratio}!`));
    console.log(chalk.green(`Output: ${outputPath}`));

  } catch (err) {
    spinner.fail(chalk.red(`Error: ${err.message}`));
    process.exit(1);
  }
}

// Helper functions
function formatDuration(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatBitrate(bitrate) {
  if (bitrate > 1000000) {
    return `${(bitrate / 1000000).toFixed(2)} Mbps`;
  }
  return `${(bitrate / 1000).toFixed(0)} Kbps`;
}

function detectRatio(ratio) {
  const tolerance = 0.05;
  for (const [name, config] of Object.entries(ASPECT_RATIOS)) {
    if (Math.abs(ratio - config.ratio) < tolerance) {
      return name;
    }
  }
  return 'custom';
}

// Parse command line arguments
program.parse();

// Show help if no command provided
if (!process.argv.slice(2).length) {
  console.log(chalk.cyan(banner));
  program.outputHelp();
}
