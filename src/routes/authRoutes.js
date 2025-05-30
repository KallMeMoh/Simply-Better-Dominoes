const express = require('express');
const router = express.Router();
const { body, oneOf } = require('express-validator');

const authController = require('../controllers/authController.js');

router.post(
  '/signup',
  [
    body('username')
      .exists()
      .withMessage('Username is required')
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 characters long'),
    body('email')
      .exists()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .exists()
      .withMessage('Password is required')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long'
      ),
  ],
  authController.postSignup
);

router.post(
  '/login',
  [
    oneOf([
      body('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 5 })
        .withMessage('Username must be at least 5 characters long'),
      body('email')
        .exists()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    ]),
    body('password')
      .exists()
      .withMessage('Password is required')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and be at least 8 characters long'
      ),
  ],
  authController.postLogin
);

router.post(
  '/logout',
  [
    body('logout_all')
      .optional({ checkFalsy: true })
      .isBoolean()
      .withMessage('Logout all must be a boolean value'),
  ],
  authController.postLogout
);

router.post(
  '/change-password',
  [
    body('curr_password')
      .exists()
      .withMessage('Old Password is required')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('Invalid password format.'),
    body('new_password')
      .exists()
      .withMessage('New Password is required')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('Invalid password format.'),
    body('re_password')
      .exists()
      .withMessage('Repeat New Password is required')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
      .withMessage('Invalid password format.'),
  ],
  authController.postChangePassword
);

module.exports = router;
