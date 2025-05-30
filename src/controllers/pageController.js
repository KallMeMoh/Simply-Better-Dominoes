const path = require('path');
const os = require('os');
const formatUptime = require('../helpers/formateUptime.js');
const { pingDB } = require('../db');
const measureLatency = require('../helpers/measureLatency.js');

exports.getHome = (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', '..', 'views', 'index.html'));
};

exports.getStatus = async (req, res) => {
  const dbPing = await pingDB();
  const latency = await measureLatency();

  res.send(`
        <html>
            <head>
                <title>Status Page</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    .status { margin-bottom: 10px; }
                </style>
            </head>
            <body>
                <h1>Server Status</h1>
                <p class="status"><strong>🟢 Server Uptime:</strong> ${formatUptime(
                  process.uptime()
                )}</p>
                <p class="status"><strong>💾 Memory Usage:</strong> ${(
                  process.memoryUsage().rss /
                  1024 /
                  1024
                ).toFixed(2)} MB</p>
                <p class="status"><strong>⚡ CPU Load:</strong> ${
                  os.platform() === 'win32'
                    ? 'N/A'
                    : os
                        .loadavg()
                        .map((load) => load.toFixed(2))
                        .join(', ')
                }</p>
                <p class="status"><strong>🔗 Active Requests:</strong> ${
                  global.activeRequests || 0
                }</p>
                <p class="status"><strong>🛢️ Database Connectivity:</strong> ${dbPing}</p>
                <p class="status"><strong>📈 Latency:</strong> ${latency} ms</p>
            </body>
        </html>
    `);
};

exports.getLogin = (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', '..', 'views', 'login.html'));
};

exports.getSignup = (req, res) => {
  res
    .status(200)
    .sendFile(path.resolve(__dirname, '..', '..', 'views', 'signup.html'));
};

exports.getChangePassword = (req, res) => {
  res
    .status(200)
    .sendFile(
      path.resolve(__dirname, '..', '..', 'views', 'change-password.html')
    );
};
exports.get404 = (req, res) => {
  res
    .status(404)
    .sendFile(path.resolve(__dirname, '..', '..', 'views', '404.html'));
};
