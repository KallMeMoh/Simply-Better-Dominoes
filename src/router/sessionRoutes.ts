import { Router } from 'express';
import { param } from 'express-validator';
import { revokeController } from '../controllers/sessionController';

export const sessionRouter = Router();

// get authenticated user sessions
// sessionRouter.get('/', userSessionController);

// revoke specific session by id
sessionRouter.delete(
  '/:sessionId',
  param('sessionId').trim().notEmpty().withMessage('SessionId is required'),
  revokeController,
);
