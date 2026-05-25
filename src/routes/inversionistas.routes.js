import { Router } from 'express';
import {createInversionista} from '../controllers/inversionistas.controller.js';
//import { verifyToken } from '../middleware/auth.js';

const router = Router();

router.post(
    '/',
    //verifyToken,
    createInversionista
);

export default router;