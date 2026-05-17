import { Router } from 'express';
import { getUsuarios, getUsuarioById, getUsuarioByEmail, createUsuario, updateUsuario, deleteUsuario } from '../controllers/usuariosController.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, isAdmin, getUsuarios);
router.get('/by-email', verifyToken, getUsuarioByEmail);
router.get('/:id', verifyToken, getUsuarioById);
router.post('/', verifyToken, isAdmin, createUsuario);
router.put('/:id', verifyToken, updateUsuario);
router.delete('/:id', verifyToken, isAdmin, deleteUsuario);

export default router;
