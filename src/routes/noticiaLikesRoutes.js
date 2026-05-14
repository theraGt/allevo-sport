import { Router } from 'express';
import { getLikesByNoticia, createLike, deleteLike } from '../controllers/noticiaLikesController.js';

const router = Router();

router.get('/', getLikesByNoticia);
router.post('/', createLike);
router.delete('/', deleteLike);

export default router;