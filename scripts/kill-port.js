#!/usr/bin/env node
/**
 * Kill any process using port 3000
 * Works on Windows, Mac, and Linux
 */

const { exec } = require('child_process');
const os = require('os');

const PORT = 3000;

function killPort(port) {
  const platform = os.platform();

  if (platform === 'win32') {
    // Windows: find PID using netstat, then kill it
    exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
      if (err || !stdout) {
        console.log(`Port ${port} is free`);
        process.exit(0);
        return;
      }

      // Extract PIDs from output (last column)
      const lines = stdout.trim().split('\n');
      const pids = new Set();

      lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && pid !== '0' && /^\d+$/.test(pid)) {
          pids.add(pid);
        }
      });

      if (pids.size === 0) {
        console.log(`Port ${port} is free`);
        process.exit(0);
        return;
      }

      console.log(`Killing processes on port ${port}: ${[...pids].join(', ')}`);

      pids.forEach(pid => {
        exec(`taskkill /F /PID ${pid}`, (err) => {
          if (!err) {
            console.log(`Killed PID ${pid}`);
          }
        });
      });

      // Give it a moment to clean up
      setTimeout(() => process.exit(0), 500);
    });
  } else {
    // Mac/Linux: use lsof
    exec(`lsof -ti:${port}`, (err, stdout) => {
      if (err || !stdout) {
        console.log(`Port ${port} is free`);
        process.exit(0);
        return;
      }

      const pids = stdout.trim().split('\n').filter(Boolean);
      console.log(`Killing processes on port ${port}: ${pids.join(', ')}`);

      pids.forEach(pid => {
        exec(`kill -9 ${pid}`, (err) => {
          if (!err) {
            console.log(`Killed PID ${pid}`);
          }
        });
      });

      setTimeout(() => process.exit(0), 500);
    });
  }
}

killPort(PORT);
