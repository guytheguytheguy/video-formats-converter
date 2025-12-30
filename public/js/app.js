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

    // Batch conversion state
    this.batchQueue = [];
    this.batchResults = [];
    this.batchProcessing = false;
    this.currentBatchIndex = 0;

    this.init();
  }

  async init() {
    await this.checkLicenseStatus();
    this.bindEvents();
    this.bindBatchEvents();
    this.bindSocketEvents();
    this.updateAspectPreview();
    this.updateUIForLicense();
    this.updateBatchUIForLicense();
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

  // ==================== BATCH CONVERSION ====================

  updateBatchUIForLicense() {
    const proNotice = document.getElementById('batch-pro-notice');
    const batchContainer = document.getElementById('batch-container');

    if (proNotice && batchContainer) {
      if (this.isPro) {
        proNotice.style.display = 'none';
        batchContainer.style.display = 'block';
      } else {
        proNotice.style.display = 'flex';
        batchContainer.style.display = 'none';
      }
    }
  }

  bindBatchEvents() {
    const batchUploadZone = document.getElementById('batch-upload-zone');
    const batchFileInput = document.getElementById('batch-file-input');

    if (!batchUploadZone || !batchFileInput) return;

    // Upload zone click
    batchUploadZone.addEventListener('click', () => batchFileInput.click());

    // Drag and drop
    batchUploadZone.addEventListener('dragover', (e) => {
      e.preventDefault();
      batchUploadZone.classList.add('dragover');
    });
    batchUploadZone.addEventListener('dragleave', () => {
      batchUploadZone.classList.remove('dragover');
    });
    batchUploadZone.addEventListener('drop', (e) => {
      e.preventDefault();
      batchUploadZone.classList.remove('dragover');
      this.handleBatchFiles(e.dataTransfer.files);
    });

    // File input change
    batchFileInput.addEventListener('change', (e) => {
      this.handleBatchFiles(e.target.files);
    });

    // Add more button
    const addMoreBtn = document.getElementById('add-more-btn');
    if (addMoreBtn) {
      addMoreBtn.addEventListener('click', () => batchFileInput.click());
    }

    // Clear queue button
    const clearQueueBtn = document.getElementById('clear-queue-btn');
    if (clearQueueBtn) {
      clearQueueBtn.addEventListener('click', () => this.clearBatchQueue());
    }

    // Convert all button
    const batchConvertBtn = document.getElementById('batch-convert-btn');
    if (batchConvertBtn) {
      batchConvertBtn.addEventListener('click', () => this.startBatchConversion());
    }

    // New batch button
    const batchNewBtn = document.getElementById('batch-new-btn');
    if (batchNewBtn) {
      batchNewBtn.addEventListener('click', () => this.resetBatch());
    }
  }

  async handleBatchFiles(files) {
    if (!this.isPro) {
      this.showUpgradeModal();
      return;
    }

    const allowedTypes = ['.mp4', '.mov', '.mkv', '.avi', '.webm', '.m4v', '.wmv'];

    for (const file of files) {
      const ext = '.' + file.name.split('.').pop().toLowerCase();
      if (!allowedTypes.includes(ext)) {
        console.warn(`Skipping ${file.name}: unsupported format`);
        continue;
      }

      // Upload each file
      try {
        const formData = new FormData();
        formData.append('video', file);

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });

        if (response.ok) {
          const data = await response.json();
          this.batchQueue.push({
            file,
            data,
            status: 'pending',
            progress: 0,
            downloadUrl: null
          });
        }
      } catch (err) {
        console.error(`Failed to upload ${file.name}:`, err);
      }
    }

    this.updateBatchQueueUI();
  }

  updateBatchQueueUI() {
    const uploadZone = document.getElementById('batch-upload-zone');
    const queue = document.getElementById('batch-queue');
    const queueCount = document.getElementById('queue-count');
    const batchList = document.getElementById('batch-list');

    if (this.batchQueue.length === 0) {
      uploadZone.style.display = 'block';
      queue.style.display = 'none';
      return;
    }

    uploadZone.style.display = 'none';
    queue.style.display = 'block';
    queueCount.textContent = `${this.batchQueue.length} video${this.batchQueue.length !== 1 ? 's' : ''}`;

    batchList.innerHTML = this.batchQueue.map((item, index) => `
      <div class="batch-item" data-index="${index}">
        <div class="batch-item-info">
          <span class="batch-item-name">${item.file.name}</span>
          <span class="batch-item-size">${this.formatFileSize(item.file.size)}</span>
        </div>
        <div class="batch-item-status">
          ${item.status === 'pending' ? '<span class="status-pending">Pending</span>' : ''}
          ${item.status === 'uploading' ? '<span class="status-uploading">Uploading...</span>' : ''}
          ${item.status === 'converting' ? `<span class="status-converting">${Math.round(item.progress)}%</span>` : ''}
          ${item.status === 'complete' ? '<span class="status-complete">Done</span>' : ''}
          ${item.status === 'error' ? '<span class="status-error">Error</span>' : ''}
        </div>
        <button class="batch-item-remove" onclick="app.removeBatchItem(${index})" ${this.batchProcessing ? 'disabled' : ''}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');
  }

  removeBatchItem(index) {
    if (this.batchProcessing) return;
    this.batchQueue.splice(index, 1);
    this.updateBatchQueueUI();
  }

  clearBatchQueue() {
    if (this.batchProcessing) return;
    this.batchQueue = [];
    this.updateBatchQueueUI();
  }

  async startBatchConversion() {
    if (this.batchQueue.length === 0 || this.batchProcessing) return;

    this.batchProcessing = true;
    this.batchResults = [];
    this.currentBatchIndex = 0;

    // Get batch settings
    const settings = {
      ratio: document.getElementById('batch-ratio').value,
      mode: document.getElementById('batch-mode').value,
      format: document.getElementById('batch-format').value,
      quality: document.getElementById('batch-quality').value
    };

    // Show progress view
    document.getElementById('batch-queue').style.display = 'none';
    document.getElementById('batch-progress').style.display = 'block';

    // Process each video sequentially
    for (let i = 0; i < this.batchQueue.length; i++) {
      this.currentBatchIndex = i;
      const item = this.batchQueue[i];
      item.status = 'converting';
      this.updateBatchProgressUI();

      try {
        const result = await this.convertBatchItem(item, settings);
        item.status = 'complete';
        item.downloadUrl = result.downloadUrl;
        this.batchResults.push({
          filename: item.file.name,
          downloadUrl: result.downloadUrl,
          outputFilename: result.filename
        });
      } catch (err) {
        console.error(`Failed to convert ${item.file.name}:`, err);
        item.status = 'error';
      }

      this.updateBatchProgressUI();
    }

    this.batchProcessing = false;
    this.showBatchComplete();
  }

  convertBatchItem(item, settings) {
    return new Promise((resolve, reject) => {
      fetch('/api/convert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fileId: item.data.id,
          filename: item.data.filename,
          aspectRatio: settings.ratio,
          format: settings.format,
          mode: settings.mode,
          quality: settings.quality
        })
      })
      .then(res => res.json())
      .then(data => {
        const jobId = data.jobId;

        // Listen for progress
        const progressHandler = (progressData) => {
          item.progress = progressData.progress;
          this.updateBatchProgressUI();
        };

        const completeHandler = (completeData) => {
          this.socket.off(`progress:${jobId}`, progressHandler);
          this.socket.off(`complete:${jobId}`, completeHandler);
          this.socket.off(`error:${jobId}`, errorHandler);
          resolve(completeData);
        };

        const errorHandler = (errorData) => {
          this.socket.off(`progress:${jobId}`, progressHandler);
          this.socket.off(`complete:${jobId}`, completeHandler);
          this.socket.off(`error:${jobId}`, errorHandler);
          reject(new Error(errorData.error));
        };

        this.socket.on(`progress:${jobId}`, progressHandler);
        this.socket.on(`complete:${jobId}`, completeHandler);
        this.socket.on(`error:${jobId}`, errorHandler);
      })
      .catch(reject);
    });
  }

  updateBatchProgressUI() {
    const countEl = document.getElementById('batch-progress-count');
    const listEl = document.getElementById('batch-progress-list');

    const completed = this.batchQueue.filter(i => i.status === 'complete').length;
    countEl.textContent = `${completed} / ${this.batchQueue.length}`;

    listEl.innerHTML = this.batchQueue.map((item, index) => `
      <div class="batch-progress-item ${item.status}">
        <div class="batch-progress-item-info">
          <span class="batch-progress-item-name">${item.file.name}</span>
          <span class="batch-progress-item-status">
            ${item.status === 'pending' ? 'Waiting...' : ''}
            ${item.status === 'converting' ? `Converting ${Math.round(item.progress)}%` : ''}
            ${item.status === 'complete' ? 'Complete' : ''}
            ${item.status === 'error' ? 'Failed' : ''}
          </span>
        </div>
        <div class="batch-progress-item-bar">
          <div class="batch-progress-item-fill" style="width: ${item.status === 'complete' ? 100 : item.progress}%"></div>
        </div>
      </div>
    `).join('');
  }

  showBatchComplete() {
    document.getElementById('batch-progress').style.display = 'none';
    document.getElementById('batch-complete').style.display = 'block';

    const countEl = document.getElementById('batch-complete-count');
    const listEl = document.getElementById('batch-download-list');

    const successCount = this.batchResults.length;
    countEl.textContent = `${successCount} video${successCount !== 1 ? 's' : ''} converted successfully`;

    listEl.innerHTML = this.batchResults.map(result => `
      <a href="${result.downloadUrl}" download="${result.outputFilename}" class="batch-download-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        <span>${result.outputFilename}</span>
      </a>
    `).join('');
  }

  resetBatch() {
    this.batchQueue = [];
    this.batchResults = [];
    this.batchProcessing = false;
    this.currentBatchIndex = 0;

    document.getElementById('batch-upload-zone').style.display = 'block';
    document.getElementById('batch-queue').style.display = 'none';
    document.getElementById('batch-progress').style.display = 'none';
    document.getElementById('batch-complete').style.display = 'none';
    document.getElementById('batch-file-input').value = '';
  }

  formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
  }
}

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  window.app = new VideoConverterApp();
});
