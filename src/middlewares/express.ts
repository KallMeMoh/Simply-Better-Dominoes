import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import { jwt as jwtConfig } from '../config';
import User from '../db/models/User';
import Session from '../db/models/Session';
import type JWTPayload from '../types/jsonwebtoken';

export async function protectedMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token: string = req.cookies['token'];
    console.log(token);
    if (!token) return res.redirect('/login');

    const { userId, sessionId, tokenVersion } = jwt.verify(
      token,
      jwtConfig.secret,
    ) as JWTPayload;

    const user = await User.findById(userId);
    if (!user || user.token_version !== tokenVersion) {
      res.clearCookie('token');
      return res.redirect('/login');
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      res.clearCookie('token');
      return res.redirect('/login');
    }

    // TODO: flag session as sus if client info are different from session
    // if (
    //   req.headers['user-agent'] !== session.device ||
    //   req.ip !== session.ip_address
    // ) {
    // }

    req.user = user;
    req.session = session;
    next();
  } catch (error) {
    if (error instanceof JsonWebTokenError) res.sendStatus(500);
  }
}
