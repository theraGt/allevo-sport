import { Router } from 'express';
import {
    getBloquesByAtleta,
    createBloque,
    updateBloque,
    deleteBloque,
    reorderBloques
} from '../controllers/atletaBloquesController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/atletas/:id/bloques - Obtener bloques de un atleta
router.get('/:id/bloques', getBloquesByAtleta);

// POST /api/atletas/:id/bloques - Crear bloque (requiere auth)
router.post('/:id/bloques', verifyToken, createBloque);

// PUT /api/atletas/:id/bloques/reordenar - Reordenar bloques (requiere auth)
router.put('/:id/bloques/reordenar', verifyToken, reorderBloques);

export default router;