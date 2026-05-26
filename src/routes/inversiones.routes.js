import express from 'express';
import {createInversion,uploadComprobante} from '../controllers/inversiones.controller.js';

const router =
    express.Router();

router.post(
    '/',
    createInversion
);

router.patch(
    '/transacciones/:id/comprobante',
    uploadComprobante
);

export default router;