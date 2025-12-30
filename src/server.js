const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os');
const { v4: uuidv4 } = require('uuid');
const VideoConverter = require('./converter');
const { ASPECT_RATIOS, VIDEO_FORMATS, TRANSFORM_MODES, RESOLUTION_PRESETS } = require('./constants');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Determine base directory for uploads/output
// In packaged Electron app, use user's app data directory
// In development, use project directory
function getDataDir() {
  // Check if running in packaged Electron app (multiple detection methods)
  const isPackaged = process.resourcesPath ||
                     __dirname.includes('app.asar') ||
                     process.argv[0].includes('VideoConvert');

  if (isPackaged) {
    // Use user's home directory for packaged app
    const appDataDir = path.join(os.homedir(), '.videoconvert');
    console.log('Running in packaged mode, using data dir:', appDataDir);
    return appDataDir;
  }
  // Development mode - use project directory
  console.log('Running in dev mode, using project dir');
  return path.join(__dirname, '..');
}

const dataDir = getDataDir();
const uploadsDir = path.join(dataDir, 'uploads');
const outputDir = path.join(dataDir, 'output');

// Ensure directories exist
[dataDir, uploadsDir, outputDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const uniqueName = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v', '.wmv'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: MP4, MOV, MKV, AVI, WebM'));
    }
  }
});

// Serve static files
app.use(express.static(path.join(__dirname, '../public')));
app.use('/output', express.static(outputDir));
app.use(express.json());

// Store active conversions
const activeConversions = new Map();

// License/Pro status management
// In Electron, this comes from electron-store. In web, we use a simple in-memory store.
let proStatus = {
  isPro: false,
  license: null,
  // For development/testing, set DEV_PRO=true to enable pro features
  // In production, this is set via license validation
};

// Free tier limits
const FREE_LIMITS = {
  maxResolution: 720,           // 720p max
  allowedFormats: ['mp4'],      // MP4 only
  watermark: true,              // Add watermark
  batchConversion: false,       // No batch
};

// Pro tier - no limits
const PRO_LIMITS = {
  maxResolution: 4320,          // 4K+
  allowedFormats: ['mp4', 'mov', 'mkv', 'avi', 'webm'],
  watermark: false,
  batchConversion: true,
};

function getLimits() {
  return proStatus.isPro ? PRO_LIMITS : FREE_LIMITS;
}

// API Routes

// Get license status
app.get('/api/license', (req, res) => {
  const limits = getLimits();
  res.json({
    isPro: proStatus.isPro,
    license: proStatus.license ? '****' + proStatus.license.slice(-4) : null,
    limits
  });
});

// Validate and activate license
app.post('/api/license/activate', async (req, res) => {
  const { licenseKey } = req.body;

  if (!licenseKey) {
    return res.status(400).json({ error: 'License key required' });
  }

  // Simple pattern validation (VC-XXXX-XXXX-XXXX)
  const pattern = /^VC-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

  // For production, validate against LemonSqueezy API:
  // const response = await fetch('https://api.lemonsqueezy.com/v1/licenses/validate', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ license_key: licenseKey })
  // });

  if (pattern.test(licenseKey)) {
    proStatus.isPro = true;
    proStatus.license = licenseKey;
    res.json({
      success: true,
      isPro: true,
      message: 'License activated successfully!',
      limits: PRO_LIMITS
    });
  } else {
    res.status(400).json({
      success: false,
      error: 'Invalid license key format'
    });
  }
});

// Deactivate license
app.post('/api/license/deactivate', (req, res) => {
  proStatus.isPro = false;
  proStatus.license = null;
  res.json({ success: true, isPro: false, limits: FREE_LIMITS });
});
app.get('/api/config', (req, res) => {
  res.json({
    aspectRatios: ASPECT_RATIOS,
    formats: VIDEO_FORMATS,
    transformModes: TRANSFORM_MODES,
    resolutions: RESOLUTION_PRESETS
  });
});

app.post('/api/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const converter = new VideoConverter();
    const metadata = await converter.getMetadata(req.file.path);

    res.json({
      id: path.basename(req.file.filename, path.extname(req.file.filename)),
      filename: req.file.originalname,
      path: req.file.path,
      size: req.file.size,
      metadata
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/convert', async (req, res) => {
  const { fileId, filename, aspectRatio, format, mode, quality, resolution, backgroundColor } = req.body;

  if (!fileId) {
    return res.status(400).json({ error: 'Missing file ID' });
  }

  // Get current limits based on license status
  const limits = getLimits();
  let outputFormat = format || 'mp4';
  let outputResolution = resolution;

  // Enforce free tier limits
  if (!proStatus.isPro) {
    // Check format restriction
    if (!limits.allowedFormats.includes(outputFormat)) {
      return res.status(403).json({
        error: `Format "${outputFormat}" requires Pro. Free tier only supports: ${limits.allowedFormats.join(', ')}`,
        requiresPro: true,
        feature: 'format'
      });
    }

    // Enforce 720p max for free users
    if (outputResolution && ['4k', '1080p'].includes(outputResolution)) {
      outputResolution = '720p';
    }
  }

  const jobId = uuidv4();
  const inputPath = path.join(uploadsDir, `${fileId}${path.extname(filename)}`);

  if (!fs.existsSync(inputPath)) {
    return res.status(404).json({ error: 'Input file not found' });
  }

  const outputFilename = `${fileId}_converted.${outputFormat}`;
  const outputPath = path.join(outputDir, outputFilename);

  activeConversions.set(jobId, {
    status: 'processing',
    progress: 0,
    inputPath,
    outputPath,
    isPro: proStatus.isPro
  });

  res.json({ jobId, message: 'Conversion started', isPro: proStatus.isPro });

  // Start conversion in background
  const converter = new VideoConverter();

  try {
    await converter.convert(inputPath, outputPath, {
      aspectRatio,
      format: outputFormat,
      transformMode: mode || 'fill',
      quality: quality || 'medium',
      resolution: outputResolution,
      backgroundColor: backgroundColor || 'black',
      watermark: limits.watermark,  // Add watermark for free users
      onProgress: (progress) => {
        const job = activeConversions.get(jobId);
        if (job) {
          job.progress = progress.percent || 0;
          io.emit(`progress:${jobId}`, { progress: job.progress });
        }
      }
    });

    activeConversions.set(jobId, {
      status: 'completed',
      progress: 100,
      outputPath,
      downloadUrl: `/output/${outputFilename}`
    });

    io.emit(`complete:${jobId}`, {
      downloadUrl: `/output/${outputFilename}`,
      filename: outputFilename
    });

  } catch (err) {
    activeConversions.set(jobId, {
      status: 'error',
      error: err.message
    });
    io.emit(`error:${jobId}`, { error: err.message });
  }
});

app.get('/api/job/:jobId', (req, res) => {
  const job = activeConversions.get(req.params.jobId);
  if (!job) {
    return res.status(404).json({ error: 'Job not found' });
  }
  res.json(job);
});

app.delete('/api/file/:fileId', (req, res) => {
  const { fileId } = req.params;

  // Clean up uploaded and converted files
  const patterns = [
    path.join(uploadsDir, `${fileId}.*`),
    path.join(outputDir, `${fileId}_converted.*`)
  ];

  try {
    fs.readdirSync(uploadsDir)
      .filter(f => f.startsWith(fileId))
      .forEach(f => fs.unlinkSync(path.join(uploadsDir, f)));

    fs.readdirSync(outputDir)
      .filter(f => f.startsWith(fileId))
      .forEach(f => fs.unlinkSync(path.join(outputDir, f)));

    res.json({ message: 'Files cleaned up' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════╗
║           VIDEO FORMATS CONVERTER                         ║
║               Web Dashboard                               ║
╚═══════════════════════════════════════════════════════════╝

Server running at: http://localhost:${PORT}

Press Ctrl+C to stop
  `);
});

module.exports = { app, server };
