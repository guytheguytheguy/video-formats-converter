const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const VideoConverter = require('./converter');
const { ASPECT_RATIOS, VIDEO_FORMATS, TRANSFORM_MODES, RESOLUTION_PRESETS } = require('./constants');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

// Ensure directories exist
const uploadsDir = path.join(__dirname, '../uploads');
const outputDir = path.join(__dirname, '../output');
[uploadsDir, outputDir].forEach(dir => {
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

// API Routes
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

  const jobId = uuidv4();
  const inputPath = path.join(uploadsDir, `${fileId}${path.extname(filename)}`);

  if (!fs.existsSync(inputPath)) {
    return res.status(404).json({ error: 'Input file not found' });
  }

  const outputFormat = format || 'mp4';
  const outputFilename = `${fileId}_converted.${outputFormat}`;
  const outputPath = path.join(outputDir, outputFilename);

  activeConversions.set(jobId, {
    status: 'processing',
    progress: 0,
    inputPath,
    outputPath
  });

  res.json({ jobId, message: 'Conversion started' });

  // Start conversion in background
  const converter = new VideoConverter();

  try {
    await converter.convert(inputPath, outputPath, {
      aspectRatio,
      format: outputFormat,
      transformMode: mode || 'fit',
      quality: quality || 'medium',
      resolution,
      backgroundColor: backgroundColor || 'black',
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
