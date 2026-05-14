import { Router } from 'express';
import {
    getPostulaciones,
    getPostulacionesByTipo,
    getPostulacionById,
    createPostulacion,
    updatePostulacion,
    updatePostulacionEstado,
    deletePostulacion
} from '../controllers/postulacionesController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

// Público: cualquiera puede enviar una postulación
router.post('/', createPostulacion);

// Protegidas: solo admin
router.get('/', verifyToken, getPostulaciones);
router.get('/tipo/:tipo', verifyToken, getPostulacionesByTipo);
router.get('/:id', verifyToken, getPostulacionById);
router.put('/:id', verifyToken, updatePostulacion);
router.patch('/:id/estado', verifyToken, updatePostulacionEstado);
router.delete('/:id', verifyToken, deletePostulacion);

export default router;
