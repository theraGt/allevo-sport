import { Router } from 'express';

import {
    login,
    register,
    verifyUser,
    verifyLoginToken
} from '../controllers/auth.controller.js';

const router = Router();

router.post(
    '/login',
    login
);

router.post(
    '/register',
    register
);

router.post(
    '/verify',
    verifyUser
);

router.post(
    '/verify-login',
    verifyLoginToken
);

export default router;