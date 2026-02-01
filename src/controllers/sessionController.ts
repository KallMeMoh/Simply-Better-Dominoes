import type { Request, Response } from 'express';
import { matchedData, validationResult } from 'express-validator';

export async function userSessionsController(req: Request, res: Response) {
  try {
  } catch (err: any) {
    return res.status(500).json({});
  }
}

export async function revokeController(req: Request, res: Response) {
  try {
    // protectedEndpoint middleware provides req.session, req.user
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    const data = matchedData(req);

    // res.clearCookie('token');
    res.status(200).json({ data });
  } catch (err: any) {
    console.log(err);
    if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
      res.clearCookie('token');
      return res.status(200).json({ success: true, msg: 'No session exist' });
    }

    return res
      .status(500)
      .json({ success: false, errors: [{ msg: 'Internal Server Error' }] });
  }
}
