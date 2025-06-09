const { Server } = require('socket.io');
const PageController = require('./controllers/pageController');
const pageController = new PageController();

function initSocket(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('pageRequest', ({ pageName }, callback) => {
      try {
        const pageObj = pageController.getPage(pageName);
        callback(pageObj);
      } catch (e) {
        callback('{}');
        console.error(e);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
}

module.exports = initSocket;
