import { Router } from 'express';
import { getProyectos, getProyectoById, createProyecto, updateProyecto, deleteProyecto } from '../controllers/proyectosController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getProyectos);
router.get('/:id', getProyectoById);
router.post('/', verifyToken, createProyecto);
router.put('/:id', verifyToken, updateProyecto);
router.delete('/:id', verifyToken, deleteProyecto);

export default router;
