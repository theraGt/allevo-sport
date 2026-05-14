import { Router } from 'express';
import { getComentariosByNoticia, createComentario, deleteComentario } from '../controllers/noticiaComentariosController.js';

const router = Router();

router.get('/', getComentariosByNoticia);
router.post('/', createComentario);
router.delete('/:id', deleteComentario);

export default router;