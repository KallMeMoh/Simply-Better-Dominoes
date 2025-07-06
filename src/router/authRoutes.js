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
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be at least 3 characters long')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        'Username can only contain letters, numbers, and _ (underscores)'
      ),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
  ],
  authController.POST_Signup
);

router.post(
  '/login',
  [
    oneOf([
      body('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be at least 3 characters long')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
          'Username can only contain letters, numbers, and _ (underscores)'
        ),
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Invalid email format'),
    ]),
    body('password')
      .exists()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
  ],
  authController.POST_Login
);

router.post(
  '/logout',
  [
    body('logout_all')
      .optional({ checkFalsy: true })
      .isBoolean()
      .withMessage('Logout all must be a boolean value'),
  ],
  authController.POST_Logout
);

router.post(
  '/change-password',
  [
    body('curr_password')
      .exists()
      .withMessage('Old Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
    body('new_password')
      .exists()
      .withMessage('New Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
    body('re_password')
      .exists()
      .withMessage('Repeat New Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
  ],
  authController.POST_ChangePassword
);

module.exports = router;
