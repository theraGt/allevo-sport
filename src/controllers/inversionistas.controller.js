import {crearInversionista} from '../services/inversionistas.service.js';

export const createInversionista =
    async (req, res) => {

        try {

            const inversionista =
                await crearInversionista(
                    req.body
                );

            res.status(201).json({
                message:
                    'Perfil inversionista creado correctamente',

                inversionista
            });

        } catch (error) {

            console.error(error);

            if (
                error.message ===
                'USER_NOT_FOUND'
            ) {

                return res.status(404).json({
                    message:
                        'Usuario no encontrado'
                });
            }

            if (
                error.message ===
                'INVERSIONISTA_EXISTS'
            ) {

                return res.status(409).json({
                    message:
                        'El usuario ya es inversionista'
                });
            }

            res.status(500).json({
                message:
                    'Error del servidor',
                error:
                    error.message
            });
        }
    };