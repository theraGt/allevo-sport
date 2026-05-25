import {getConnection} from '../database/connection.js';
import queries from '../database/queries.js';
import {publishEvent} from '../events/publisher.js';

export const crearInversion =
    async (data) => {

        const pool =
            await getConnection();

        const client =
            await pool.connect();

        try {

            await client.query('BEGIN');

            const {

                inversionista_id,
                proyecto_id,
                monto_invertido,
                moneda,
                pago_metodo,
                notas

            } = data;

            /*
             * VALIDAR PROYECTO
             */

            const proyectoResult =
                await client.query(
                    queries.get_proyecto_by_id,
                    [proyecto_id]
                );

            if (
                proyectoResult.rows.length === 0
            ) {

                throw new Error(
                    'PROYECTO_NOT_FOUND'
                );
            }

            const proyecto =
                proyectoResult.rows[0];

            /*
             * VALIDAR MONTO
             */

            if (
                monto_invertido <
                proyecto.monto_minimo_inversion
            ) {

                throw new Error(
                    'MONTO_MINIMO_INVALIDO'
                );
            }

            /*
             * CREAR INVERSIÓN
             */

            const inversionResult =
                await client.query(

                    queries.create_inversion,

                    [
                        inversionista_id,
                        proyecto_id,
                        monto_invertido,
                        moneda || 'QTZ',
                        proyecto.tasa_retorno_base,
                        proyecto.plazo_dias,
                        proyecto.fecha_retorno_estimada,
                        pago_metodo,
                        notas
                    ]
                );

            const inversion =
                inversionResult.rows[0];

            /*
             * GENERAR CONTRATO
             */

            const contratoResult =
                await client.query(

                    queries.create_contrato,

                    [
                        inversion.id,
                        inversionista_id,
                        proyecto_id,
                        `https://allevo.gt/contracts/${inversion.id}.pdf`
                    ]
                );

            /*
             * GENERAR TRANSACCIÓN
             */

            const transaccionResult =
                await client.query(

                    queries.create_transaccion_pago,

                    [
                        inversion.id,
                        monto_invertido,
                        moneda || 'QTZ',
                        pago_metodo
                    ]
                );

            /*
             * CREAR RETORNO
             */

            await client.query(

                queries.create_pago_retorno,

                [
                    inversion.id,
                    inversion.retorno_estimado,
                    moneda || 'QTZ',
                    'Retorno inversión',
                    proyecto.fecha_retorno_estimada,
                    'Retorno final'
                ]
            );

            /*
             * ACTUALIZAR MONTO RECAUDADO
             */

            await client.query(

                queries.update_monto_recaudado,

                [
                    monto_invertido,
                    proyecto_id
                ]
            );

            /*
             * PUBLICAR EVENTO
             */

            await publishEvent(
                'allevo',
                'inversion.creada',
                {
                    inversion_id:
                        inversion.id,

                    proyecto:
                        proyecto.titulo,

                    monto:
                        monto_invertido
                }
            );

            await client.query('COMMIT');

            return {

                inversion,
                contrato:
                    contratoResult.rows[0],

                transaccion:
                    transaccionResult.rows[0]
            };

        } catch (error) {

            await client.query(
                'ROLLBACK'
            );

            throw error;

        } finally {

            client.release();
        }
    };