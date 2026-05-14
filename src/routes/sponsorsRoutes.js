import { Router } from 'express';
import { getSponsors, getSponsorById, createSponsor, updateSponsor, deleteSponsor } from '../controllers/sponsorsController.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', getSponsors);
router.get('/:id', getSponsorById);
router.post('/', verifyToken, createSponsor);
router.put('/:id', verifyToken, updateSponsor);
router.delete('/:id', verifyToken, deleteSponsor);

export default router;
