import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import { jwt as jwtConfig } from '../config';
import User from '../db/models/User';
import Session from '../db/models/Session';

export async function protectedEndpoint(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const token: string = req.cookies['token'];
    console.log(token);
    if (!token) throw new Error('unauthorized');

    const { userId, sessionId, tokenVersion } = jwt.verify(
      token,
      jwtConfig.secret,
    ) as JwtPayload;

    const [user, session] = await Promise.all([
      User.findById(userId),
      Session.findById(sessionId),
    ]);
    if (!user || user.token_version !== tokenVersion || !session)
      throw new Error('malformed cookie');

    // TODO: flag session as sus if client info are different from session
    // if (
    //   req.headers['user-agent'] !== session.device ||
    //   req.ip !== session.ip_address
    // ) {
    // }

    req.user = user;
    req.session = session;
    next();
  } catch (err: any) {
    if (err.name === 'JsonWebTokenError') return res.sendStatus(500);
  }
}

export async function protectedResource(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
