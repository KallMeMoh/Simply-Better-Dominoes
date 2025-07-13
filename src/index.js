import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import express from 'express';
import { createServer } from 'node:http';
import io from './socket.js';

import { connectDB } from './db/index.js';
import { env, port } from './config.js';
const isProduction = env === 'production';

const app = express();
const server = createServer(app);
io(server);
connectDB();

app.use(express.static('../public'));

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
app.use(cookieParser());

import routes from './router/index.js';
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
