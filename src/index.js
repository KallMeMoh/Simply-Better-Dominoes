const path = require('path');
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const { connectDB } = require('./db');
const { env, port } = require('./config.js');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
connectDB();

const isProduction = env === 'production';

app.use(
  express.static(path.resolve(__dirname, '..', 'public'), {
    fallthrough: false,
  })
);

if (isProduction) {
  app.use(helmet());
} else {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
}

app.use(morgan(isProduction ? 'combined' : 'dev'));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: !isProduction,
  })
);

const limiter = rateLimit({
  windowMs: isProduction ? 15 * 60 * 1000 : 60 * 1000, // Rate limit window
  max: isProduction ? 100 : 1000, // Limit per window
  standardHeaders: true, // Ensures proper rate limit headers
  legacyHeaders: false, // Disables old-style headers
});
app.use(limiter);

const routes = require('./routes');
app.use('/', routes);

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

if (isProduction) {
  app.use((err, req, res, next) => {
    console.log('Error logged:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  });
} else {
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
