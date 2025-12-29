// Video Formats Converter - Electron Main Process
const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');

let mainWindow = null;
let serverStarted = false;

// Start Express server
async function startServer() {
  if (serverStarted) return;
  serverStarted = true;

  // Set FFmpeg paths before loading server
  if (app.isPackaged) {
    process.env.FFMPEG_PATH = path.join(process.resourcesPath, 'ffmpeg', 'ffmpeg.exe');
    process.env.FFPROBE_PATH = path.join(process.resourcesPath, 'ffmpeg', 'ffprobe.exe');
  }

  require('../src/server.js');

  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 1500));
}

// Create browser window
async function createWindow() {
  await startServer();

  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    backgroundColor: '#0f0f1a',
    show: false
  });

  mainWindow.loadURL('http://localhost:3000');

  // Show dev tools in development
  // mainWindow.webContents.openDevTools();

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  // Handle load failures
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
    // Retry after a delay if server wasn't ready
    setTimeout(() => {
      mainWindow.loadURL('http://localhost:3000');
    }, 2000);
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

// IPC Handlers for license management
const LICENSE_KEY_PATTERN = /^VC-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/;

ipcMain.handle('validate-license', async (event, licenseKey) => {
  if (LICENSE_KEY_PATTERN.test(licenseKey)) {
    const Store = require('electron-store');
    const store = new Store();
    store.set('license', licenseKey);
    store.set('isPro', true);
    return { valid: true, isPro: true };
  }
  return { valid: false, isPro: false };
});

ipcMain.handle('check-license', async () => {
  try {
    const Store = require('electron-store');
    const store = new Store();
    return {
      isPro: store.get('isPro', false),
      license: store.get('license', null)
    };
  } catch (e) {
    return { isPro: false, license: null };
  }
});

ipcMain.handle('select-folder', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  });
  return result.filePaths[0] || null;
});

ipcMain.handle('select-file', async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ['openFile'],
    filters: [
      { name: 'Videos', extensions: ['mp4', 'mov', 'mkv', 'avi', 'webm', 'm4v', 'wmv'] }
    ]
  });
  return result.filePaths[0] || null;
});

// App lifecycle
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
