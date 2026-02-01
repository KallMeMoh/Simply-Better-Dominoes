import { Router } from 'express';
import { body, oneOf, param } from 'express-validator';
import {
  signupController,
  loginController,
  logoutController,
  changePasswordController,
} from '../controllers/authController.js';

export const authRouter = Router();

authRouter.post(
  '/register',
  [
    body('username')
      .trim()
      .notEmpty()
      .withMessage('Username is required')
      .bail()
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be at least 3 characters long')
      .bail()
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        'Username can only contain letters, numbers, and _ (underscores)',
      ),
    body('email')
      .trim()
      .notEmpty()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .withMessage('Invalid email format'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
  ],
  signupController,
);

authRouter.post(
  '/login',
  [
    oneOf(
      [
        body('username')
          .trim()
          .notEmpty()
          .withMessage('Username is required')
          .bail()
          .isLength({ min: 3, max: 20 })
          .withMessage('Username must be at least 3 characters long')
          .bail()
          .matches(/^[a-zA-Z0-9_]+$/)
          .withMessage(
            'Username can only contain letters, numbers, and _ (underscores)',
          ),
        body('email')
          .trim()
          .notEmpty()
          .withMessage('Email is required')
          .bail()
          .isEmail()
          .withMessage('Invalid email format'),
      ],
      {
        message: 'Invalid username or email',
      },
    ),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
  ],
  loginController,
);

authRouter.post('/logout', logoutController);

authRouter.post(
  '/change-password',
  [
    body('curr_password')
      .trim()
      .notEmpty()
      .withMessage('Old Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
    body('new_password')
      .trim()
      .notEmpty()
      .withMessage('New Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
    body('re_password')
      .trim()
      .notEmpty()
      .withMessage('Repeat New Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
  ],
  changePasswordController,
);
