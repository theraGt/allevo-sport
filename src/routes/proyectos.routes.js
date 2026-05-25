import { Router } from 'express';
import {getProyectos,getProyectoById,createProyecto,updateProyecto,deleteProyecto,updateEstadoProyecto} from '../controllers/proyectos.controller.js';
//import {verifyToken} from '../middleware/auth.js';

const router = Router();

router.get(
    '/',
    getProyectos
);

router.get(
    '/:id',
    getProyectoById
);

router.post(
    '/',
    //verifyToken,
    createProyecto
);

router.put(
    '/:id',
    //verifyToken,
    updateProyecto
);

router.delete(
    '/:id',
    //verifyToken,
    deleteProyecto
);

router.patch(
    '/:id/estado',
    updateEstadoProyecto
);

export default router;