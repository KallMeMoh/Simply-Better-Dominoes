import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import {
  POST_Signup,
  POST_Login,
  POST_Logout,
  POST_ChangePassword,
} from '../controllers/authController.js';

const router = Router();

router.post(
  '/signup',
  [
    body('username')
      .notEmpty()
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
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
  ],
  POST_Signup
);

router.post(
  '/login',
  [
    oneOf([
      body('username')
        .notEmpty()
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
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
  ],
  POST_Login
);

router.post(
  '/logout',
  [
    body('logout_all')
      .optional({ checkFalsy: true })
      .isBoolean()
      .withMessage('Logout all must be a boolean value'),
  ],
  POST_Logout
);

router.post(
  '/change-password',
  [
    body('curr_password')
      .notEmpty()
      .withMessage('Old Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
    body('new_password')
      .notEmpty()
      .withMessage('New Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
    body('re_password')
      .notEmpty()
      .withMessage('Repeat New Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters'
      ),
  ],
  POST_ChangePassword
);

export default router;
