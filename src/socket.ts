import { Server as SocketServer } from 'socket.io';
import { getPage } from './utils/getPage.js';

import os from 'node:os';
import { formateUptime } from './utils/formateUptime.js';
import { pingDB } from './db/index.js';
import type { Server as HttpServer } from 'node:http';

export default function initSocket(server: HttpServer) {
  let statusUpdateInterval: NodeJS.Timeout;
  const io = new SocketServer(server);

  io.use((socket, next) => {
    // const token =
    next();
  });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.data.lastRequestedPage = '';
    socket.on('pageRequest', async (pageName, ack) => {
      if (socket.data.lastRequestedPage === pageName) ack({});
      try {
        const pageObj = await getPage(pageName);
        ack(pageObj);
        socket.data.lastRequestedPage = pageName;

        if (pageName === 'status') {
          socket.join('serverStatus');
          if (!statusUpdateInterval) {
            statusUpdateInterval = setInterval(async () => {
              if (
                (io.sockets.adapter.rooms.get('serverStatus')?.size ?? 0) > 0
              ) {
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
                  uptime: formateUptime(process.uptime()),
                  memory: `${(process.memoryUsage().rss / 1024 / 1024).toFixed(
                    2,
                  )} MiB`,
                };

                io.to('serverStatus').emit('statusUpdate', updatedStatus);
              } else {
                clearInterval(statusUpdateInterval);
                statusUpdateInterval;
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
