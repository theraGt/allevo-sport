import { Router } from 'express';
import { getDeportes } from '../controllers/atletasController.js';

const router = Router();

// GET /api/deportes - Lista de deportes activos
router.get('/', getDeportes);

export default router;