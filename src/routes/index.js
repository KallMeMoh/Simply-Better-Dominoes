const express = require('express');
const path = require('path');
const router = express.Router();

// const authRoutes = require('./authRoutes');
/*
* authRoutes.js should handle authentication-related endpoints
* such as:
  > /auth/login
  > /auth/register
  > /auth/logout
  > /auth/change-password
*/

// const userRoutes = require('./userRoutes');
/*
* [PROTECTED] userRoutes.js should handle user-related endpoints
* such as:
  > /user/:id
  > /user/update
  > /user/delete
*/

// const gameRoutes = require('./gameRoutes');
/*
 * [PROTECTED] gameRoutes.js should handle game-related endpoints
 */

// Grouped endpoints using routers
// router.use('/auth', authRoutes);
// router.use('/user', userRoutes);
// router.use('/game', gameRoutes);

// Direct/simple endpoints
router.get('/status', async (req, res) => {
  const os = require('os');
  const formatUptime = require('../helpers/formateUptime.js');
  const checkDBConnection = require('../helpers/checkDBConnection.js');
  const measureLatency = require('../helpers/measureLatency.js');

  const dbPing = await checkDBConnection();
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
});

router.get('/', (req, res) => {
  res
    .status(200)
    .sendFile(path.join(__dirname, '..', '..', 'views', 'index.html'));
});

router.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.statusCode || 500).send(err.message);
});

module.exports = router;
