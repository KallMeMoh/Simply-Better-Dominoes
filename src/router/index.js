const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const { join } = require('node:path');
const authRoutes = require('./authRoutes.js');
const { env } = require('../config.js');

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

module.exports = router;
