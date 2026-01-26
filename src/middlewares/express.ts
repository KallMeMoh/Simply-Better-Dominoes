import jwt from 'jsonwebtoken';
import { jwt as jwtConfig } from '../config.js';
import User from '../db/models/User.js';
import Session from '../db/models/Session.js';
import type { NextFunction, Request, Response } from 'express';

export default async function protectedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token: string = req.cookies['token'] ?? '';
    console.log(token);
    if (!token) return res.sendStatus(401);

    const { userId, sessionId, tokenVersion } = jwt.verify(
      token,
      jwtConfig.secret,
    );

    const user = await User.findById(userId);
    if (!user || user.token_version !== tokenVersion) {
      res.clearCookie('token');
      return res.redirect('/login');
    }

    // idk what this is for
    const session = await Session.findById(sessionId);
    if (!session) {
      res.clearCookie('token');
      return res.sendStatus(400);
    }

    if (
      req.headers['user-agent'] === session.device &&
      req.ip === session.ip_address
    ) {
      req.user = user;
      req.session = session;
      next();
    } else {
      // email the person to confirm if this was them
      // user can flag as not sus or login from trusted session
      // to revoke sus session

      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}
