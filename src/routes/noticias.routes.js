import { Router } from 'express';

import {
    getNoticias,
    getNoticiasPublicadas,
    getNoticiaById,
    createNoticia,
    updateNoticia,
    deleteNoticia
} from '../controllers/noticias.controller.js';

import {
    verifyToken,
    isAdmin
} from '../middleware/auth.middleware.js';

const router = Router();

router.get(
    '/',
    verifyToken,
    getNoticias
);

router.get(
    '/publicadas',
    getNoticiasPublicadas
);

router.get(
    '/:id',
    verifyToken,
    getNoticiaById
);

router.post(
    '/',
    verifyToken,
    createNoticia
);

router.put(
    '/:id',
    verifyToken,
    updateNoticia
);

router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    deleteNoticia
);

export default router;