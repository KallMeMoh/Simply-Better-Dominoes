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
  '/register',
  [
    body('username')
      .notEmpty()
      .withMessage('Username is required')
      .bail()
      .isLength({ min: 3, max: 20 })
      .withMessage('Username must be at least 3 characters long')
      .bail()
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage(
        'Username can only contain letters, numbers, and _ (underscores)',
      )
      .bail(),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .bail()
      .isEmail()
      .withMessage('Invalid email format')
      .bail(),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      )
      .bail(),
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
        .bail()
        .isLength({ min: 3, max: 20 })
        .withMessage('Username must be at least 3 characters long')
        .bail()
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage(
          'Username can only contain letters, numbers, and _ (underscores)',
        )
        .bail(),
      body('email')
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Invalid email format')
        .bail(),
    ]),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      )
      .bail(),
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
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      )
      .bail(),
    body('new_password')
      .notEmpty()
      .withMessage('New Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      )
      .bail(),
    body('re_password')
      .notEmpty()
      .withMessage('Repeat New Password is required')
      .bail()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be at least 8 characters long')
      .bail()
      .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?(_|[^\W\s])).+$/)
      .withMessage(
        'Password must contain at least one uppercase letter, one lowercase letter, and one number, and special characters',
      )
      .bail(),
  ],
  changePasswordController,
);

export default authRouter;
