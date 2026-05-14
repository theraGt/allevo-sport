import { Router } from 'express';
import { getInversionistas, getInversionistaById, createInversionista, updateInversionista, deleteInversionista } from '../controllers/inversionistasController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getInversionistas);
router.get('/:id', verifyToken, getInversionistaById);
router.post('/', verifyToken, createInversionista);
router.put('/:id', verifyToken, updateInversionista);
router.delete('/:id', verifyToken, deleteInversionista);

export default router;
