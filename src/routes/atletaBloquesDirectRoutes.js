import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import { updateBloque, deleteBloque } from '../controllers/atletaBloquesController.js';

const router = Router();

// PUT /api/atletas-bloques/:id - Actualizar bloque (requiere auth)
router.put('/:id', verifyToken, updateBloque);

// DELETE /api/atletas-bloques/:id - Eliminar bloque (requiere auth)
router.delete('/:id', verifyToken, deleteBloque);

export default router;