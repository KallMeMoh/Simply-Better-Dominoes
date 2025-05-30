const express = require('express');
const path = require('path');
const router = express.Router();

const pageController = require('../controllers/pageController.js');

const authRoutes = require('./authRoutes.js');
/*
* authRoutes.js should handle authentication-related endpoints
* such as:
  > /auth/login
  > /auth/register
  > /auth/logout
  > /auth/change-password
*/

// const userRoutes = require('./userRoutes');
/*
* [PROTECTED] userRoutes.js should handle user-related endpoints
* such as:
  > /user/:id
  > /user/update
  > /user/delete
*/

// const gameRoutes = require('./gameRoutes');
/*
 * [PROTECTED] gameRoutes.js should handle game-related endpoints
 */

// Grouped endpoints using routers
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
// router.use('/game', gameRoutes);

// Direct/simple endpoints
router.get('/', pageController.getHome);
router.get('/status', pageController.getStatus);

router.get('/login', pageController.getLogin);
router.get('/signup', pageController.getSignup);
router.get('/change-password', pageController.getChangePassword);

module.exports = router;
