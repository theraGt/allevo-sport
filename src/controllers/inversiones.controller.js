import {crearInversion} from '../services/inversiones.service.js';

export const createInversion =
    async (req, res) => {

        try {

            const inversion =
                await crearInversion(
                    req.body
                );

            return res.status(201).json({

                message:
                    'Inversión creada correctamente',

                inversion
            });

        } catch (error) {

            console.error(
                'Error createInversion:',
                error
            );

            return res.status(500).json({

                message:
                    'Error del servidor',

                error:
                    error.message
            });
        }
    };