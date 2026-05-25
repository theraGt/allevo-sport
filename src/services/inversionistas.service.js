import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

export const crearInversionista = async (data) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        await client.query('BEGIN');

        const {
            usuario_id,
            identificacion,
            tipo_identificacion,
            direccion,
            profesion,
            capital_disponible,
            moneda_preferida,
            riesgo_permitido,
            plazo_preferido,
            banco_nombre,
            banco_cuenta_tipo,
            banco_cuenta_numero
        } = data;

        /*
        =====================================
        VALIDAR USUARIO
        =====================================
        */

        const userResult =
            await client.query(
                queries.get_usuario_by_id,
                [usuario_id]
            );

        if (
            userResult.rows.length === 0
        ) {

            throw new Error(
                'USER_NOT_FOUND'
            );
        }

        /*
        =====================================
        VALIDAR SI YA ES INVERSIONISTA
        =====================================
        */

        const inversionistaExistente =
            await client.query(
                queries.get_inversionista_by_id,
                [usuario_id]
            );

        if (
            inversionistaExistente.rows.length > 0
        ) {

            throw new Error(
                'INVERSIONISTA_EXISTS'
            );
        }

        /*
        =====================================
        CREAR PERFIL INVERSIONISTA
        =====================================
        */

        const result =
            await client.query(
                queries.create_inversionista,
                [
                    usuario_id,
                    identificacion,
                    tipo_identificacion,
                    direccion,
                    profesion,
                    capital_disponible,
                    moneda_preferida || 'QTZ',
                    riesgo_permitido || 'medio',
                    plazo_preferido || 180,
                    banco_nombre,
                    banco_cuenta_tipo,
                    banco_cuenta_numero
                ]
            );

        await client.query('COMMIT');

        return result.rows[0];

    } catch (error) {

        await client.query(
            'ROLLBACK'
        );

        throw error;

    } finally {

        client.release();
    }
};