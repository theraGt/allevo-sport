import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';
import { publishEvent } from '../events/publisher.js';
import { contratoTemplate } from '../templates/contrato.template.js';
import { generateContractPdf } from '../utils/generateContract.js';

export const crearInversion = async (data) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        await client.query(
            'BEGIN'
        );

        const {

            inversionista_id,
            destino_tipo,
            destino_id,
            monto_invertido,
            moneda,
            pago_metodo,
            banco_origen,
            banco_destino,
            fecha_retorno,
            notas

        } = data;

        // =====================================
        // VALIDAR TIPO
        // =====================================

        if (
            destino_tipo !==
            'atleta' &&

            destino_tipo !==
            'proyecto'
        ) {

            throw new Error(
                'TIPO_INVALIDO'
            );
        }

        // =====================================
        // BUSCAR DESTINO
        // =====================================

        let destino;

        if (
            destino_tipo ===
            'proyecto'
        ) {

            const result =
                await client.query(
                    queries.get_proyecto_by_id,
                    [destino_id]
                );

            if (
                result.rows.length === 0
            ) {

                throw new Error(
                    'PROYECTO_NOT_FOUND'
                );
            }

            destino =
                result.rows[0];

        } else {

            const result =
                await client.query(
                    queries.get_atleta_by_id,
                    [destino_id]
                );

            if (
                result.rows.length === 0
            ) {

                throw new Error(
                    'ATLETA_NOT_FOUND'
                );
            }

            destino =
                result.rows[0];
        }

        // =====================================
        // VALIDAR ESTADO
        // =====================================

        if (
            destino.estado &&
            destino.estado !==
            'publicado'
        ) {

            throw new Error(
                'DESTINO_NO_DISPONIBLE'
            );
        }

        // =====================================
        // VALIDAR MONTO MINIMO
        // =====================================

        if (
            destino.monto_minimo_inversion &&

            monto_invertido <
            destino.monto_minimo_inversion
        ) {

            throw new Error(
                'MONTO_MINIMO_INVALIDO'
            );
        }

        // =====================================
        // VALIDAR MONTO MAXIMO
        // =====================================

        if (

            destino.monto_maximo_inversion &&

            monto_invertido >
            destino.monto_maximo_inversion

        ) {

            throw new Error(
                'MONTO_MAXIMO_INVALIDO'
            );
        }

        // =====================================
        // CREAR INVERSION
        // =====================================

        const inversionResult =
            await client.query(
                queries.create_inversion,
                [

                    inversionista_id,
                    destino_tipo,
                    destino_id,
                    monto_invertido,
                    moneda || 'QTZ',
                    destino.tasa_retorno_base,
                    destino.plazo_dias,
                    fecha_retorno,
                    'pendiente_pago',
                    pago_metodo,
                    notas
                ]
            );

        const inversion =
            inversionResult.rows[0];

        // =====================================
        // ACTUALIZAR RECAUDADO
        // SOLO SI ES PROYECTO
        // =====================================

        if (
            destino_tipo ===
            'proyecto'
        ) {

            await client.query(
                queries.update_monto_recaudado_proyecto,
                [
                    monto_invertido,
                    destino_id
                ]
            );
        }

        // =====================================
        // CREAR TRANSACCION
        // =====================================

        const transaccionResult =
            await client.query(
                queries.create_transaccion_pago,
                [
                    inversion.id,
                    'inversion',
                    monto_invertido,
                    moneda || 'QTZ',
                    true,
                    banco_origen,
                    banco_destino,
                    'pendiente'
                ]
            );

        // =====================================
        // CREAR CONTRATO
        // =====================================

        const contratoURL =
            `https://allevo.com/contracts/${inversion.id}.pdf`;

        const contratoResult =
            await client.query(
                queries.create_contrato,
                [
                    inversion.id,
                    inversionista_id,
                    contratoURL,
                    'pendiente'
                ]
            );

        const inversionista = 
            await client.query(
                queries.get_usuario_by_id,
                [
                    inversionista_id
                ]
            );   
        console.log("Inversor:",inversionista.rows[0])
        const html =
            contratoTemplate(
                inversionista.rows[0],
                inversion,
                destino
            );

        const pdfPath =
            await generateContractPdf(
                html,
                inversion.id
            );

        const contratoActualizado =
            await client.query(
                queries.update_contract_url,
                [
                    pdfPath,
                    inversion.id
                ]
            );
        
        // =====================================
        // EVENTO
        // =====================================

        await publishEvent(
            'allevo',
            'inversion.creada',
            {

                inversion_id: inversion.id,
                inversionista_id,
                destino_tipo,
                destino_id,
                destino_nombre:
                    destino.titulo ||
                    destino.nombre,
                monto: monto_invertido
            }
        );

        await client.query(
            'COMMIT'
        );

        return {

            inversion,

            transaccion:
                transaccionResult.rows[0],

            contrato:
                contratoResult.rows[0]
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

export const subirComprobante =
    async (
        transaccionId,
        data
    ) => {

        const pool =
            await getConnection();

        const client =
            await pool.connect();

        try {

            const {
                comprobante_url,
                referencia_transferencia,
            } = data;

            const result =
                await client.query(
                    queries.upload_comprobante_transaccion,
                    [
                        comprobante_url,
                        referencia_transferencia,
                        transaccionId
                    ]
                );

            return result.rows[0];

        } finally {

            client.release();
        }
    };