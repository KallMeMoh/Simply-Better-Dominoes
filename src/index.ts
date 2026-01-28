import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { resolve } from 'node:path';

import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { createServer } from 'node:http';
import attachSocket from './socket';

import routes from './router/index';
import { connectDB } from './db/index';
import { env, port } from './config';
import rateLimit from 'express-rate-limit';

const isDevelopment = env === 'development';
const app = express();
const server = createServer(app);
attachSocket(server);
await connectDB();

app.use(express.static(resolve('public')));

app.use(
  helmet(
    isDevelopment
      ? {
          contentSecurityPolicy: false,
          crossOriginResourcePolicy: false,
        }
      : {},
  ),
);

app.use(morgan(isDevelopment ? 'dev' : 'combined'));

app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: isDevelopment ? 15 * 60000 : 60000,
  max: isDevelopment ? 1000 : 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/', limiter, routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (
    err instanceof SyntaxError &&
    (err as any).status === 400 &&
    'body' in err
  ) {
    return res.status(400).json({
      success: false,
      errors: [
        {
          type: 'body',
          msg: 'Invalid JSON format in request body',
          location: 'body',
        },
      ],
    });
  }

  const error = isDevelopment ? err : new Error('Internal Server Error');

  // winston logging

  return res.status(500).json({ error });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
