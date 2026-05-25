import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';
import { publishEvent } from '../events/publisher.js';


export const obtenerProyectos = async () => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        const result = await client.query(
            queries.get_proyectos
        );

        return result.rows;

    } finally {

        client.release();
    }
};

export const obtenerProyectoPorId = async (id) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        const result = await client.query(
            queries.get_proyecto_by_id,
            [id]
        );

        return result.rows[0];

    } finally {

        client.release();
    }
};

export const crearProyecto = async (data) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        const {
            titulo,
            slug,
            descripcion,
            objetivo,
            categoria,
            portada_url,
            galeria,
            ubicacion,
            monto_objetivo,
            monto_minimo_inversion,
            monto_maximo_inversion,
            tasa_retorno_base,
            tipo_retorno,
            plazo_dias,
            fecha_inicio,
            fecha_cierre,
            fecha_retorno_estimada,
            estado,
            destacado,
            create_by,
            updated_by
        } = data;

        const result = await client.query(
            queries.create_proyecto,
            [
                titulo,
                slug,
                descripcion,
                objetivo,
                categoria,
                portada_url,
                JSON.stringify(galeria || []),
                ubicacion,
                monto_objetivo,
                monto_minimo_inversion,
                monto_maximo_inversion,
                tasa_retorno_base,
                tipo_retorno,
                plazo_dias,
                fecha_inicio,
                fecha_cierre,
                fecha_retorno_estimada,
                estado || 'borrador',
                destacado || false,
                create_by,
                updated_by
            ]
        );

        return result.rows[0];

    } finally {

        client.release();
    }
};

export const actualizarProyecto = async (
    id,
    data,
    userId
) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        const {
            titulo,
            slug,
            descripcion,
            objetivo,
            categoria,
            portada_url,
            galeria,
            ubicacion,
            monto_objetivo,
            monto_minimo_inversion,
            monto_maximo_inversion,
            tasa_retorno_base,
            tipo_retorno,
            plazo_dias,
            fecha_inicio,
            fecha_cierre,
            fecha_retorno_estimada,
            estado,
            destacado
        } = data;

        const result = await client.query(
            queries.update_proyecto,
            [
                titulo,
                slug,
                descripcion,
                objetivo,
                categoria,
                portada_url,
                JSON.stringify(galeria || []),
                ubicacion,
                monto_objetivo,
                monto_minimo_inversion,
                monto_maximo_inversion,
                tasa_retorno_base,
                tipo_retorno,
                plazo_dias,
                fecha_inicio,
                fecha_cierre,
                fecha_retorno_estimada,
                estado,
                destacado,
                userId,
                id
            ]
        );

        return result.rowCount;

    } finally {

        client.release();
    }
};

export const eliminarProyecto = async (
    id
) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        const result = await client.query(
            queries.delete_proyecto,
            [id]
        );

        return result.rowCount;

    } finally {

        client.release();
    }
};

export const actualizarEstadoProyecto =
    async (
        id,
        estado
    ) => {

        const pool =
            await getConnection();

        const client =
            await pool.connect();

        try {

            const result =
                await client.query(
                    queries.update_estado_proyecto,
                    [
                        estado,
                        id
                    ]
                );

            if (
                result.rows.length === 0
            ) {

                throw new Error(
                    'PROYECTO_NOT_FOUND'
                );
            }

            const proyecto =
                result.rows[0];

            /*
             * SI EL PROYECTO
             * SE PUBLICA
             */

            if (
                estado === 'publicado'
            ) {

                await publishEvent(
                    'allevo',
                    'proyecto.publicado',
                    {
                        id:
                            proyecto.id,
                        titulo:
                            proyecto.titulo,
                        descripcion:
                            proyecto.descripcion,
                        categoria:
                            proyecto.categoria,
                        monto_objetivo:
                            proyecto.monto_objetivo,
                        portada_url:
                            proyecto.portada_url
                    }
                );
            }

            return proyecto;

        } finally {

            client.release();
        }
    };