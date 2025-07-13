import { Router } from 'express';
import rateLimit from 'express-rate-limit';

import authRoutes from './authRoutes.js';
import { env } from '../config.js';

const router = Router();
router.use('/auth', authRoutes);

const isProduction = env === 'production';
const limiter = rateLimit({
  windowMs: isProduction ? 15 * 60 * 1000 : 60 * 1000,
  max: isProduction ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', limiter, (req, res) => {
  res.sendFile('../../views/index.html');
});

// temp code -> shall be a socket io middleware
import jwt from 'jsonwebtoken';
import config from '../config.js';
import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
const protectedMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies['token'];
    console.log(token);
    if (!token) return res.sendStatus(401);

    const { userId, sessionId, tokenVersion } = jwt.verify(
      token,
      config.jwt.secret
    );

    const user = await User.findById(userId);
    if (!user) {
      res.clearCookie('token');
      return res.sendStatus(404);
    }

    if (user.token_version !== tokenVersion) return res.sendStatus(400);

    const session = await Session.findById(sessionId);
    if (!session) {
      res.clearCookie('token');
      return res.sendStatus(400);
    }

    if (
      req.headers['user-agent'] === session.device &&
      req.ip === session.ip_address
    ) {
      req.user = user;
      req.session = session;
      next();
    } else {
      // email the person to confirm if this was them
      // user can flag as not sus or login from trusted session
      // to revoke sus session

      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
};

router.get('/protected', protectedMiddleware, (req, res) => {
  res.status(200).send({ user: res.user, session: res.session });
});

export default router;
