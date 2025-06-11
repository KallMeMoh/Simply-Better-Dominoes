const { Server } = require('socket.io');
const PageController = require('./controllers/pageController');
const pageController = new PageController();

const os = require('os');
const formatUptime = require('./helpers/formateUptime.js');
const { pingDB } = require('./db');

function initSocket(server) {
  let statusUpdateInterval = null;
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.lastRequestedPage = '';
    socket.on('pageRequest', async (pageName, ack) => {
      if (socket.lastRequestedPage === pageName) ack({});
      try {
        const pageObj = pageController.getPage(pageName);
        ack(pageObj);
        socket.lastRequestedPage = pageName;

        if (pageName === 'status') {
          socket.join('serverStatus');
          if (!statusUpdateInterval) {
            statusUpdateInterval = setInterval(async () => {
              if (io.sockets.adapter.rooms.get('serverStatus')?.size > 0) {
                const updatedStatus = {
                  sentAt: Date.now(),
                  databasePing: `${await pingDB()} ms`,
                  CPULoad:
                    os.platform() === 'win32'
                      ? 'N/A'
                      : os
                          .loadavg()
                          .map((load) => load.toFixed(2))
                          .join(','),
                  activeRequests: io.engine.clientsCount,
                  uptime: formatUptime(process.uptime()),
                  memory: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(
                    2
                  )} MiB`,
                };

                io.to('serverStatus').emit('statusUpdate', updatedStatus);
              } else {
                clearInterval(statusUpdateInterval);
                statusUpdateInterval = null;
              }
            }, 5000);
          }
        } else {
          socket.leave('serverStatus');
        }
      } catch (e) {
        ack({});
        console.error(e);
      }
    });

    socket.on('ping', (clientT0, ack) => ack(clientT0));

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      socket.leave('serverStatus');
    });
  });

  return io;
}

module.exports = initSocket;
