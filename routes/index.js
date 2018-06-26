import { Router } from 'express';

import authController from '@/controllers/authController';
import config from '@Config';

const router = Router();

if (config.authentication.enabled) {
  router.post('/register', (req, res, next) => {
    authController.register(req, res, next);
  });

  router.post('/login', (req, res, next) => {
    authController.login(req, res, next);
  });
}

export default router;
