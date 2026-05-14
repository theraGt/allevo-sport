import { Router } from 'express';
import { login, register } from '../controllers/authController.js';
import cors from 'cors';

const router = Router();

router.post('/login', cors(), login);
router.post('/register', cors(), register);

export default router;
