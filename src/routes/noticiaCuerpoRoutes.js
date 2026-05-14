import { Router } from 'express';
import { getCuerpoByNoticia, createCuerpo, updateCuerpo, deleteCuerpo } from '../controllers/noticiaCuerpoController.js';

const router = Router();

router.get('/', getCuerpoByNoticia);
router.post('/', createCuerpo);
router.put('/:id', updateCuerpo);
router.delete('/:id', deleteCuerpo);

export default router;