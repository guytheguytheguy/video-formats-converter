// Video Formats Converter - Web Dashboard

class VideoConverterApp {
  constructor() {
    this.socket = io();
    this.currentFile = null;
    this.currentJobId = null;
    this.settings = {
      ratio: '9:16',
      mode: 'fit',
      format: 'mp4',
      quality: 'medium',
      resolution: '',
      backgroundColor: 'black'
    };

    this.init();
  }

  init() {
    this.bindEvents();
    this.bindSocketEvents();
    this.updateAspectPreview();
  }

  bindEvents() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const view = e.target.dataset.view;
        this.switchView(view);
      });
    });

    // Upload zone
    const uploadZone = document.getElementById('upload-zone');
    const fileInput = document.getElementById('file-input');

    uploadZone.addEventListener('click', () => fileInput.click());
    uploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadZone.classList.add('dragover');
    });
    uploadZone.addEventListener('dragleave', () => {
      uploadZone.classList.remove('dragover');
    });
    uploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadZone.classList.remove('dragover');
      const files = e.dataTransfer.files;
      if (files.length > 0) {
        this.handleFileUpload(files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        this.handleFileUpload(e.target.files[0]);
      }
    });

    // Ratio buttons
    document.querySelectorAll('.ratio-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.ratio-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.settings.ratio = btn.dataset.ratio;
        this.updateAspectPreview();
      });
    });

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.settings.mode = btn.dataset.mode;
        this.updateAspectPreview();
      });
    });

    // Color buttons
    document.querySelectorAll('.color-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.settings.backgroundColor = btn.dataset.color;
      });
    });

    // Selects
    document.getElementById('format-select').addEventListener('change', (e) => {
      this.settings.format = e.target.value;
    });

    document.getElementById('quality-select').addEventListener('change', (e) => {
      this.settings.quality = e.target.value;
    });

    document.getElementById('resolution-select').addEventListener('change', (e) => {
      this.settings.resolution = e.target.value;
    });

    // Convert button
    document.getElementById('convert-btn').addEventListener('click', () => {
      this.startConversion();
    });

    // New conversion button
    document.getElementById('new-conversion-btn').addEventListener('click', () => {
      this.resetConverter();
    });
  }

  bindSocketEvents() {
    this.socket.on('connect', () => {
      console.log('Connected to server');
    });
  }

  switchView(view) {
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.view === view);
    });
    document.querySelectorAll('.view').forEach(v => {
      v.classList.toggle('active', v.id === `${view}-view`);
    });
  }

  async handleFileUpload(file) {
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      this.currentFile = data;
      this.showConverterPanel(file, data);
    } catch (err) {
      alert('Error uploading file: ' + err.message);
    }
  }

  showConverterPanel(file, data) {
    // Hide upload zone, show converter panel
    document.getElementById('upload-zone').style.display = 'none';
    document.getElementById('converter-panel').style.display = 'block';

    // Set video preview
    const video = document.getElementById('preview-video');
    video.src = URL.createObjectURL(file);

    // Show video info
    const infoHtml = `
      <div class="info-item">
        <label>Resolution</label>
        <span>${data.metadata.width}x${data.metadata.height}</span>
      </div>
      <div class="info-item">
        <label>Duration</label>
        <span>${this.formatDuration(data.metadata.duration)}</span>
      </div>
      <div class="info-item">
        <label>Aspect Ratio</label>
        <span>${data.metadata.aspectRatio.toFixed(2)}:1</span>
      </div>
      <div class="info-item">
        <label>Codec</label>
        <span>${data.metadata.videoCodec}</span>
      </div>
    `;
    document.getElementById('video-info').innerHTML = infoHtml;
  }

  updateAspectPreview() {
    const frame = document.getElementById('aspect-frame');

    // Update ratio class
    frame.className = 'aspect-frame';
    const ratioClass = `r-${this.settings.ratio.replace(':', '-')}`;
    frame.classList.add(ratioClass);

    // Update mode class
    frame.classList.add(`mode-${this.settings.mode}`);
  }

  async startConversion() {
    if (!this.currentFile) return;

    const convertBtn = document.getElementById('convert-btn');
    convertBtn.disabled = true;

    // Show progress section
    document.getElementById('converter-panel').style.display = 'none';
    document.getElementById('progress-section').style.display = 'block';

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId: this.currentFile.id,
          filename: this.currentFile.filename,
          aspectRatio: this.settings.ratio,
          format: this.settings.format,
          mode: this.settings.mode,
          quality: this.settings.quality,
          resolution: this.settings.resolution || undefined,
          backgroundColor: this.settings.backgroundColor
        })
      });

      const data = await response.json();
      this.currentJobId = data.jobId;

      // Listen for progress updates
      this.socket.on(`progress:${this.currentJobId}`, (data) => {
        this.updateProgress(data.progress);
      });

      this.socket.on(`complete:${this.currentJobId}`, (data) => {
        this.showDownload(data.downloadUrl, data.filename);
      });

      this.socket.on(`error:${this.currentJobId}`, (data) => {
        alert('Conversion error: ' + data.error);
        this.resetConverter();
      });

    } catch (err) {
      alert('Error starting conversion: ' + err.message);
      this.resetConverter();
    }
  }

  updateProgress(percent) {
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const progressStatus = document.getElementById('progress-status');

    progressFill.style.width = `${percent}%`;
    progressPercent.textContent = `${Math.round(percent)}%`;

    if (percent < 20) {
      progressStatus.textContent = 'Analyzing video...';
    } else if (percent < 50) {
      progressStatus.textContent = 'Processing frames...';
    } else if (percent < 80) {
      progressStatus.textContent = 'Encoding video...';
    } else {
      progressStatus.textContent = 'Finalizing...';
    }
  }

  showDownload(url, filename) {
    document.getElementById('progress-section').style.display = 'none';
    document.getElementById('download-section').style.display = 'block';

    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.href = url;
    downloadBtn.download = filename;
  }

  resetConverter() {
    // Reset state
    this.currentFile = null;
    this.currentJobId = null;

    // Reset UI
    document.getElementById('upload-zone').style.display = 'block';
    document.getElementById('converter-panel').style.display = 'none';
    document.getElementById('progress-section').style.display = 'none';
    document.getElementById('download-section').style.display = 'none';

    // Reset progress
    document.getElementById('progress-fill').style.width = '0%';
    document.getElementById('progress-percent').textContent = '0%';

    // Reset file input
    document.getElementById('file-input').value = '';

    // Enable convert button
    document.getElementById('convert-btn').disabled = false;
  }

  formatDuration(seconds) {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hrs > 0) {
      return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  window.app = new VideoConverterApp();
});
