import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig, env } from '../config.js';

import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import type { Request, Response } from 'express';
// import Guest from '../db/models/Guest.js';

export async function signupController(req: Request, res: Response) {
  try {
    const payload = req.cookies['token'];
    if (payload)
      return res.json({
        status: 409,
        errors: [{ msg: 'Already authanticated session exists' }],
      });
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.json({ status: 400, errors: errors.array() });

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser)
      return res.json({
        errors: [{ status: 409, msg: 'Username or Email already exists' }],
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      hashedPassword,
    });
    await user.save();

    res.json({ OK: 1 });
  } catch (err) {
    console.error(err);
    if (err.message === 'Invalid username or password') {
      res.json({ status: 401, message: err.message });
    } else if (err.name === 'ValidationError') {
      res.json({ status: 400, message: err.message });
    } else {
      res.json({ status: 500, message: 'Internal server error' });
    }
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const payload = req.cookies['token'];
    if (payload)
      return res.json({
        status: 409,
        errors: [{ msg: 'Already authanticated session exists' }],
      });
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.json({ errors: errors.array() });

    const { username, email, password } = req.body;

    let user;
    if (email) user = await User.findOne({ email });
    else user = await User.findOne({ username });

    if (!user)
      return res.json({
        status: 401,
        errors: [{ msg: 'User does not exist' }],
      });

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch)
      return res.json({
        status: 401,
        errors: [{ msg: 'Invalid credintials' }],
      });

    const session = new Session({
      user_id: user._id,
      device: req.headers['user-agent'],
      ip_address: req.ip,
    });
    await session.save();

    const token = jwt.sign(
      {
        userId: user._id,
        sessionId: session._id,
        tokenVersion: user.token_version,
      },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.tokenExpiry,
      },
    );

    res.cookie('token', token, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: env === 'production',
    });

    res.json({ OK: 1 });
  } catch (err) {
    console.error(err);
    if (err.name === 'ValidationError') {
      res.json({
        status: 400,
        errors: [{ msg: err.message }],
      });
    } else {
      res.json({ status: 500, message: 'Internal server error' });
    }
  }
}

export async function logoutController(req: Request, res: Response) {
  res.clearCookie('token');
  res.send({ OK: 1 });
  //   const logoutAll = req.body.logout_all ?? false;
  //   /////////////
  //   const authHeader = req.headers.authorization;
  //   if (!authHeader || !authHeader.startsWith('Socket '))
  //     return res
  //       .status(401)
  //       .json({ message: 'Missing or malformed authorization header' });
  //   const accessToken = authHeader.split(' ')[1];
  //   if (!accessToken)
  //     return res.status(401).json({ message: 'Missing access token' });
  //   try {
  //     // Delete the token directly
  //     const result = await Token.deleteOne({ accessToken });
  //     if (result.deletedCount === 0) {
  //       return res.status(401).json({ message: 'Invalid access token' });
  //     }
  //     res.json({ message: 'Logged out successfully' });
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Internal Server Error' });
  //   }
}

export async function changePasswordController(req: Request, res: Response) {}
