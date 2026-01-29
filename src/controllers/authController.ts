import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import { jwt as jwtConfig, env } from '../config.js';

import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import type { Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';
import getGeolocationInfo from '../utils/getGeolocationInfo.js';
import type JWTPayload from '../types/jsonwebtoken.js';

export async function signupController(req: Request, res: Response) {
  try {
    const payload = req.cookies['token'];
    if (payload)
      return res.status(409).json({
        success: false,
        errors: [{ msg: 'Already authanticated session exists' }],
      });
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (existingUser)
      return res.status(409).json({
        success: false,
        errors: [{ msg: 'Username or Email already exists' }],
      });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      username,
      email,
      hashedPassword,
    });
    await user.save();

    const { os, device, browser } = new UAParser(
      req.headers['user-agent'],
    ).getResult();

    const { city, country, ip_address } = await getGeolocationInfo(req);

    const session = new Session({
      user_id: user._id,
      os: os.name || 'Unkown',
      device_type: device.type || 'desktop',
      device: device.model || browser.name || 'Unkown',
      city,
      country,
      ip_address,
    });
    await session.save();

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        sessionId: session._id.toString(),
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

    return res
      .status(201)
      .json({ success: true, msg: 'Account created successfully' });
  } catch (err: any) {
    console.error(err);
    if (err.name === 'ValidationError')
      return res
        .status(400)
        .json({ success: false, errors: [{ msg: err.message }] });

    if (err.name === 'MongoServerError' && err.code === 11000)
      return res.status(409).json({
        success: false,
        errors: [{ msg: 'Username or Email already exists' }],
      });

    return res
      .status(500)
      .json({ success: false, errors: [{ msg: 'Internal server error' }] });
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const payload = req.cookies['token'];
    if (payload)
      return res.status(409).json({
        success: false,
        errors: [{ msg: 'Already authanticated session exists' }],
      });
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const { username, email, password } = req.body;

    const user = await User.findOne(username ? { username } : { email });

    if (!user)
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Account does not exist' }],
      });

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch)
      return res.status(401).json({
        success: false,
        errors: [{ msg: 'Invalid credintials' }],
      });

    const { os, device, browser } = new UAParser(
      req.headers['user-agent'],
    ).getResult();

    const { city, country, ip_address } = await getGeolocationInfo(req);

    const session = new Session({
      user_id: user._id,
      os: os.name || 'Unkown',
      device_type: device.type || 'desktop',
      device: device.model || browser.name || 'Unkown',
      city,
      country,
      ip_address,
    });
    await session.save();
    console.log(session);

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

    res.status(200).json({ success: true, msg: 'Logged in successfully' });
  } catch (err: any) {
    console.error(err);
    if (err.name === 'ValidationError')
      return res.status(400).json({
        success: false,
        errors: [{ msg: err.message }],
      });

    return res
      .status(500)
      .json({ success: false, errors: [{ msg: 'Internal server error' }] });
  }
}

export async function logoutController(req: Request, res: Response) {
  res.clearCookie('token');
  return res
    .status(200)
    .json({ success: true, msg: 'Logged out successfully' });
}

export async function revokeController(req: Request, res: Response) {
  try {
  } catch (err: any) {}
}

export async function changePasswordController(req: Request, res: Response) {}
