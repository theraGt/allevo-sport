import {crearInversion,subirComprobante} from '../services/inversiones.service.js';

export const createInversion = async (req, res) => {

    try {

        const result =
            await crearInversion(
                req.body
            );

        return res.status(201).json({

            message:
                'Inversión creada correctamente',

            inversion:
                result.inversion,

            transaccion:
                result.transaccion,

            contrato:
                result.contrato
        });

    } catch (error) {

        console.error(error);

        if (
            error.message ===
            'TIPO_INVALIDO'
        ) {

            return res.status(400).json({
                message:
                    'Tipo de destino inválido'
            });
        }

        if (
            error.message ===
            'PROYECTO_NOT_FOUND'
        ) {

            return res.status(404).json({
                message:
                    'Proyecto no encontrado'
            });
        }

        if (
            error.message ===
            'ATLETA_NOT_FOUND'
        ) {

            return res.status(404).json({
                message:
                    'Atleta no encontrado'
            });
        }

        if (
            error.message ===
            'DESTINO_NO_DISPONIBLE'
        ) {

            return res.status(400).json({
                message:
                    'Destino no disponible para inversión'
            });
        }

        return res.status(500).json({
            message:
                'Error del servidor',
            error:
                error.message
        });
    }
};

export const uploadComprobante =
    async (req, res) => {

        try {

            const transaccionId =
                req.params.id;

            const {
                comprobante_url,
                referencia_transferencia,
            } = req.body;

            if (!comprobante_url) {

                return res.status(400)
                .json({
                    message:
                        'comprobante_url es requerido'
                });
            }

            const result =
                await subirComprobante(
                    transaccionId,
                    {
                        comprobante_url,
                        referencia_transferencia,
                    }
                );

            return res.json({
                message:
                    'Comprobante registrado correctamente',
                transaccion:
                    result
            });

        } catch (error) {

            console.error(error);

            return res.status(500)
            .json({
                message:
                    'Error del servidor'
            });
        }
    };