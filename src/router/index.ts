import { type Response, Router } from 'express';
import { resolve } from 'node:path';

import { authRouter } from './authRoutes';
import { sessionRouter } from './sessionRoutes';
import { protectedEndpoint, protectedResource } from '../middlewares/express';

const router = Router();

router.get('/', (_, res) => {
  res.sendFile(resolve('views', 'homePage.html'));
});

router.get('/login', (_, res: Response) => {
  res.sendFile(resolve('views', 'loginPage.html'));
});

router.get('/signup', (_, res: Response) => {
  res.sendFile(resolve('views', 'registerPage.html'));
});

router.get('/status', (_, res: Response) => {
  res.sendFile(resolve('views', 'statusPage.html'));
});

router.get('/game', protectedResource, (_, res: Response) => {
  res.sendFile(resolve('views', 'gamePage.html'));
});

router.get('/profile', protectedResource, (_, res: Response) => {
  res.sendFile(resolve('views', 'profilePage.html'));
});

/**
 * /user
 *
 */
// router.use('/user', userRoutes);

/**
 * /api/v1/auth/login
 * /api/v1/auth/register
 * /api/v1/auth/logout
 * /api/v1/auth/change-password
 */
router.use('/api/v1/auth', authRouter);
router.use('/api/v1/session', protectedEndpoint, sessionRouter);

export default router;
