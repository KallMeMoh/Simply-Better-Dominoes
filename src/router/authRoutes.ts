import { Router } from 'express';
import { body, oneOf } from 'express-validator';
import {
  signupController,
  loginController,
  logoutController,
  changePasswordController,
} from '../controllers/authController.js';

const authRouter = Router();

authRouter.post(
  '/signup',
  [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be at least 3 characters long')
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        'Username can only contain letters, numbers, and _ (underscores)',
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
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
  ],
  signupController,
);

authRouter.post(
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
          'Username can only contain letters, numbers, and _ (underscores)',
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
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
  ],
  loginController,
);

authRouter.post(
  '/logout',
  [
    body('logout_all')
      .optional({ checkFalsy: true })
      .isBoolean()
      .withMessage('Logout all must be a boolean value'),
  ],
  logoutController,
);

authRouter.post(
  '/change-password',
  [
    body('curr_password')
      .notEmpty()
      .withMessage('Old Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
    body('new_password')
      .notEmpty()
      .withMessage('New Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
    body('re_password')
      .notEmpty()
      .withMessage('Repeat New Password is required')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      ),
  ],
  changePasswordController,
);

export default authRouter;
