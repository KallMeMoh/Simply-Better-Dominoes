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
    if (!token) return res.status(401).json({ msg: 'Unauthorized' });

    const payload = jwt.verify(token, jwtConfig.secret) as JwtPayload;
    if (
      !payload ||
      !payload.userId ||
      !payload.sessionId ||
      !payload.tokenVersion
    )
      return res.status(401).json({ msg: 'Malformed cookie' });

    const [user, session] = await Promise.all([
      User.findById(payload.userId),
      Session.findById(payload.sessionId),
    ]);
    if (!user || user.token_version !== payload.tokenVersion || !session)
      return res.status(401).json({ msg: 'Malformed cookie' });

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
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(401).json({ msg: 'Invalid or expired token' });
    }

    next(err);
  }
}

export async function protectedResource(
  req: Request,
  res: Response,
  next: NextFunction,
) {}
