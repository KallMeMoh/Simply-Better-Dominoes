import { type Response, Router } from 'express';
import { resolve } from 'node:path';

import authRoutes from './authRoutes';

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

router.get('/game', (_, res: Response) => {
  res.sendFile(resolve('views', 'gamePage.html'));
});

router.get('/profile', (_, res: Response) => {
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
router.use('/api/v1/auth', authRoutes);

export default router;
