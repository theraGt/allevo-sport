import { Router } from 'express';
import { getLogrosByAtleta, getLogroById } from '../controllers/atletaLogrosController.js';

const router = Router();

// GET /api/atleta-logros - Obtener todos o filtrar por atleta_id
router.get('/', getLogrosByAtleta);

// GET /api/atleta-logros/:id - Obtener logro por ID
router.get('/:id', getLogroById);

export default router;