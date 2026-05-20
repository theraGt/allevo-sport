import { Router } from 'express';
import {
    getUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from '../controllers/usuarios.controller.js';

import {
    verifyToken,
    isAdmin
} from '../middleware/auth.middleware.js';

const router = Router();

// Obtener todos los usuarios
router.get(
    '/',
    verifyToken,
    isAdmin,
    getUsuarios
);

// Obtener usuario por ID
router.get(
    '/:id',
    verifyToken,
    getUsuarioById
);

// Crear usuario
router.post(
    '/',
    verifyToken,
    isAdmin,
    createUsuario
);

// Actualizar usuario
router.put(
    '/:id',
    verifyToken,
    updateUsuario
);

// Eliminar usuario
router.delete(
    '/:id',
    verifyToken,
    isAdmin,
    deleteUsuario
);

export default router;