import { Router } from 'express';
import {createInversion} from '../controllers/inversiones.controller';

router.post(
    '/',
    createInversion
);