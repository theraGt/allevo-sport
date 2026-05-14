import { Router } from 'express';
import { getNoticias, getNoticiasPublicadas, getNoticiaById, createNoticia, updateNoticia, deleteNoticia } from '../controllers/noticiasController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getNoticias);
router.get('/publicadas', getNoticiasPublicadas);
router.get('/:id', getNoticiaById);
router.post('/', verifyToken, createNoticia);
router.put('/:id', verifyToken, updateNoticia);
router.delete('/:id', verifyToken, deleteNoticia);

export default router;
