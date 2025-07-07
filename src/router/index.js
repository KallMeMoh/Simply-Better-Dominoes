const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const { join } = require('node:path');
const authRoutes = require('./authRoutes.js');
const { env } = require('../config.js');
const { JsonWebTokenError } = require('jsonwebtoken');

router.use('/auth', authRoutes);

const isProduction = env === 'production';
const limiter = rateLimit({
  windowMs: isProduction ? 15 * 60 * 1000 : 60 * 1000,
  max: isProduction ? 100 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
});

router.get('/', limiter, (req, res) => {
  res.sendFile(join(__dirname, '..', '..', 'views', 'index.html'));
});

const jwt = require('jsonwebtoken');
const config = require('../config.js');
const User = require('../db/models/User.js');
const Session = require('../db/models/Session.js');
const protected = async (req, res, next) => {
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

router.get('/protected', protected, (req, res) => {
  res.status(200).send({ user: res.user, session: res.session });
});

module.exports = router;
