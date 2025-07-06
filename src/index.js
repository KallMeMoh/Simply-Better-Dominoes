const morgan = require('morgan');
const helmet = require('helmet');

const express = require('express');
const { createServer } = require('node:http');
const initSocket = require('./socket.js');

const { resolve } = require('node:path');
const { connectDB } = require('./db');
const { env, port } = require('./config.js');
const isProduction = env === 'production';

const app = express();
const server = createServer(app);
initSocket(server);
connectDB();

app.use(express.static(resolve(__dirname, '..', 'public')));

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

const routes = require('./router');
app.use('/', routes);

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

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
