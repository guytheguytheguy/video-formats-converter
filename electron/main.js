// Video Formats Converter - Electron Main Process
const { app, BrowserWindow, ipcMain, dialog, shell } = require('electron');
const path = require('path');
const net = require('net');

let mainWindow = null;
let serverPort = 3000;

// Find an available port
function findAvailablePort(startPort = 3000) {
  return new Promise((resolve) => {
    const server = net.createServer();
    server.listen(startPort, '127.0.0.1', () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    server.on('error', () => {
      // Port in use, try next one
      resolve(findAvailablePort(startPort + 1));
    });
  });
}

// Wait for server to be ready
function waitForServer(port, maxAttempts = 30) {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const check = () => {
      attempts++;
      const socket = net.createConnection(port, '127.0.0.1', () => {
        socket.destroy();
        resolve(true);
      });
      socket.on('error', () => {
        if (attempts < maxAttempts) {
          setTimeout(check, 300);
        } else {
          reject(new Error('Server failed to start'));
        }
      });
    };
    check();
  });
}

// Start Express server
async function startServer() {
  try {
    // Find an available port
    serverPort = await findAvailablePort(3000);
    console.log(`Using port: ${serverPort}`);

    // Set the port as environment variable before requiring server
    process.env.PORT = serverPort;

    // Start the server
    require('../src/server.js');

    // Wait for server to be ready
    await waitForServer(serverPort);
    console.log('Server started successfully on port', serverPort);
    return serverPort;
  } catch (err) {
    console.error('Failed to start server:', err);
    throw err;
  }
}

// Create browser window
async function createWindow() {
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
    show: true, // Show immediately
    title: 'VideoConvert',
    icon: path.join(__dirname, '../assets/icon.png')
  });

  // Show a loading page while server starts
  mainWindow.loadURL(`data:text/html,
    <html>
    <head>
      <style>
        body {
          background: #0f0f1a;
          color: white;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
          flex-direction: column;
        }
        .spinner {
          width: 50px;
          height: 50px;
          border: 3px solid #333;
          border-top-color: #6366f1;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        p { margin-top: 20px; color: #9ca3af; }
      </style>
    </head>
    <body>
      <div class="spinner"></div>
      <p>Starting VideoConvert...</p>
    </body>
    </html>
  `);

  // Start server
  try {
    await startServer();
  } catch (err) {
    dialog.showErrorBox('Server Error',
      'Failed to start the video conversion server.\n\n' + err.message);
    app.quit();
    return;
  }

  // If window was closed during startup, don't proceed
  if (!mainWindow) return;

  // Load the actual app
  const appUrl = `http://localhost:${serverPort}`;
  console.log('Loading app from:', appUrl);
  mainWindow.loadURL(appUrl);
  mainWindow.setTitle('VideoConvert');

  // Handle load failures
  let retryCount = 0;
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription, 'Retry:', retryCount);
    retryCount++;
    if (retryCount < 5) {
      setTimeout(() => {
        if (mainWindow) mainWindow.loadURL(appUrl);
      }, 1000);
    } else {
      dialog.showErrorBox('Connection Failed',
        'Could not connect to the video conversion server after multiple attempts.\n\n' +
        'Please restart the application.');
    }
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
