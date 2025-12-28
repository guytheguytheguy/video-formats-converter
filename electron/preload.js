const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods to the renderer process
contextBridge.exposeInMainWorld('electronAPI', {
  // License management
  validateLicense: (key) => ipcRenderer.invoke('validate-license', key),
  checkLicense: () => ipcRenderer.invoke('check-license'),

  // File dialogs
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  selectFile: () => ipcRenderer.invoke('select-file'),

  // App info
  isElectron: true,
  platform: process.platform,
  version: require('../package.json').version
});
