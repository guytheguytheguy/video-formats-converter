// Video Formats Converter - Web Dashboard

class VideoConverterApp {
  constructor() {
    this.socket = io();
    this.currentFile = null;
    this.currentJobId = null;
    this.isPro = false;
    this.limits = null;
    this.settings = {
      ratio: '9:16',
      mode: 'fill',  // Default to fill for full-frame output
      format: 'mp4',
      quality: 'medium',
      resolution: '',
      backgroundColor: 'black'
    };

    this.init();
  }

  async init() {
    await this.checkLicenseStatus();
    this.bindEvents();
    this.bindSocketEvents();
    this.updateAspectPreview();
    this.updateUIForLicense();
  }

  async checkLicenseStatus() {
    try {
      const response = await fetch('/api/license');
      const data = await response.json();
      this.isPro = data.isPro;
      this.limits = data.limits;
      console.log('License status:', this.isPro ? 'Pro' : 'Free', this.limits);
    } catch (err) {
      console.error('Failed to check license:', err);
      this.isPro = false;
    }
  }

  updateUIForLicense() {
    // Update header with Pro badge or upgrade button
    const nav = document.querySelector('.nav');
    let badge = document.getElementById('license-badge');

    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'license-badge';
      badge.className = 'license-badge';
      nav.appendChild(badge);
    }

    if (this.isPro) {
      badge.innerHTML = `<span class="pro-badge">PRO</span>`;
      badge.onclick = null;
    } else {
      badge.innerHTML = `<button class="upgrade-btn" onclick="app.showUpgradeModal()">Upgrade to Pro</button>`;
    }

    // Disable pro-only formats for free users
    const formatSelect = document.getElementById('format-select');
    if (formatSelect) {
      Array.from(formatSelect.options).forEach(option => {
        const isProFormat = !['mp4'].includes(option.value);
        if (isProFormat && !this.isPro) {
          option.disabled = true;
          option.textContent = option.textContent.replace(' (Pro)', '') + ' (Pro)';
        }
      });
    }

    // Disable 4K/1080p for free users
    const resSelect = document.getElementById('resolution-select');
    if (resSelect) {
      Array.from(resSelect.options).forEach(option => {
        const isProRes = ['4k', '1080p'].includes(option.value);
        if (isProRes && !this.isPro) {
          option.disabled = true;
          if (!option.textContent.includes('(Pro)')) {
            option.textContent += ' (Pro)';
          }
        }
      });
    }

    // Show watermark warning for free users
    let watermarkWarning = document.getElementById('watermark-warning');
    if (!this.isPro) {
      if (!watermarkWarning) {
        watermarkWarning = document.createElement('div');
        watermarkWarning.id = 'watermark-warning';
        watermarkWarning.className = 'watermark-warning';
        watermarkWarning.innerHTML = `
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          Free version adds a small watermark. <a href="#" onclick="app.showUpgradeModal(); return false;">Upgrade to remove</a>
        `;
        const convertBtn = document.getElementById('convert-btn');
        if (convertBtn) {
          convertBtn.parentNode.insertBefore(watermarkWarning, convertBtn);
        }
      }
    } else if (watermarkWarning) {
      watermarkWarning.remove();
    }
  }

  showUpgradeModal() {
    // Create modal if it doesn't exist
    let modal = document.getElementById('upgrade-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'upgrade-modal';
      modal.className = 'modal-overlay';
      modal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" onclick="app.hideUpgradeModal()">&times;</button>
          <div class="modal-header">
            <h2>Upgrade to Pro</h2>
            <p>Unlock all features for just <strong>$29</strong> (one-time)</p>
          </div>
          <div class="modal-body">
            <div class="feature-comparison">
              <div class="plan free-plan">
                <h3>Free</h3>
                <ul>
                  <li>MP4 format only</li>
                  <li>720p max resolution</li>
                  <li>Watermark on videos</li>
                  <li>Single file conversion</li>
                </ul>
              </div>
              <div class="plan pro-plan">
                <h3>Pro <span class="price">$29</span></h3>
                <ul>
                  <li class="highlight">All formats (MP4, MOV, MKV, AVI, WebM)</li>
                  <li class="highlight">Up to 4K resolution</li>
                  <li class="highlight">No watermark</li>
                  <li class="highlight">Batch conversion</li>
                  <li class="highlight">Lifetime updates</li>
                </ul>
              </div>
            </div>
            <div class="license-input-section">
              <p>Already have a license key?</p>
              <div class="license-input-group">
                <input type="text" id="license-key-input" placeholder="VC-XXXX-XXXX-XXXX" />
                <button onclick="app.activateLicense()">Activate</button>
              </div>
              <p id="license-error" class="license-error"></p>
            </div>
            <div class="buy-section">
              <a href="https://lemonsqueezy.com" target="_blank" class="buy-btn">
                Buy Pro License - $29
              </a>
              <p class="guarantee">30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    }

    modal.classList.add('show');
  }

  hideUpgradeModal() {
    const modal = document.getElementById('upgrade-modal');
    if (modal) {
      modal.classList.remove('show');
    }
  }

  async activateLicense() {
    const input = document.getElementById('license-key-input');
    const errorEl = document.getElementById('license-error');
    const licenseKey = input.value.trim().toUpperCase();

    if (!licenseKey) {
      errorEl.textContent = 'Please enter a license key';
      return;
    }

    try {
      const response = await fetch('/api/license/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey })
      });

      const data = await response.json();

      if (data.success) {
        this.isPro = true;
        this.limits = data.limits;
        this.hideUpgradeModal();
        this.updateUIForLicense();
        alert('License activated successfully! Enjoy Pro features.');
      } else {
        errorEl.textContent = data.error || 'Invalid license key';
      }
    } catch (err) {
      errorEl.textContent = 'Failed to validate license. Please try again.';
    }
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
      if (!this.isPro && e.target.value !== 'mp4') {
        e.target.value = 'mp4';
        this.showUpgradeModal();
        return;
      }
      this.settings.format = e.target.value;
    });

    document.getElementById('quality-select').addEventListener('change', (e) => {
      this.settings.quality = e.target.value;
    });

    document.getElementById('resolution-select').addEventListener('change', (e) => {
      if (!this.isPro && ['4k', '1080p'].includes(e.target.value)) {
        e.target.value = '720p';
        this.showUpgradeModal();
        return;
      }
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

    // Update UI for license status
    this.updateUIForLicense();
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

      // Check if pro feature was blocked
      if (response.status === 403 && data.requiresPro) {
        document.getElementById('progress-section').style.display = 'none';
        document.getElementById('converter-panel').style.display = 'block';
        convertBtn.disabled = false;
        this.showUpgradeModal();
        return;
      }

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

    // Show watermark notice for free users
    if (!this.isPro) {
      let notice = document.getElementById('free-notice');
      if (!notice) {
        notice = document.createElement('p');
        notice.id = 'free-notice';
        notice.className = 'free-notice';
        notice.innerHTML = 'Video includes watermark. <a href="#" onclick="app.showUpgradeModal(); return false;">Upgrade to Pro</a> to remove.';
        downloadBtn.parentNode.insertBefore(notice, downloadBtn.nextSibling);
      }
    }
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

    // Remove free notice
    const notice = document.getElementById('free-notice');
    if (notice) notice.remove();
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
