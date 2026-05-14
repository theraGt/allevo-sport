import { Router } from 'express';
import {
    getAtletas,
    getAtletaById,
    getPerfilCompleto,
    updateAtleta,
    deleteAtleta,
    getDeportes
} from '../controllers/atletasController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// GET /api/atletas - Lista enriquecida de atletas (con JOIN usuarios + deportes)
router.get('/', getAtletas);

// GET /api/atletas/deportes - Lista de deportes activos
router.get('/deportes', getDeportes);

// GET /api/atletas/:id/perfil - Perfil completo (atleta + logros + bloques)
router.get('/:id/perfil', getPerfilCompleto);

// GET /api/atletas/:id - Detalle de atleta
router.get('/:id', getAtletaById);

// PUT /api/atletas/:id - Actualizar atleta (requiere auth)
router.put('/:id', verifyToken, updateAtleta);

// DELETE /api/atletas/:id - Eliminar atleta (requiere auth)
router.delete('/:id', verifyToken, deleteAtleta);

export default router;