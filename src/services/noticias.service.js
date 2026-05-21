import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';
import { publishEvent } from '../events/publisher.js';

export const obtenerNoticias = async () => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const result = await client.query(queries.get_noticias);

        const noticias = result.rows;

        for (const noticia of noticias) {
            const cuerpoResult = await client.query(
                queries.get_cuerpo_by_noticia,
                [noticia.id]
            );

            noticia.cuerpo = cuerpoResult.rows;
        }

        return noticias;

    } finally {
        client.release();
    }
};

export const obtenerNoticiasPublicadas = async () => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const result = await client.query(
            queries.get_noticias_publicadas
        );

        const noticias = result.rows;

        for (const noticia of noticias) {
            const cuerpoResult = await client.query(
                queries.get_cuerpo_by_noticia,
                [noticia.id]
            );

            noticia.cuerpo = cuerpoResult.rows;
        }

        return noticias;

    } finally {
        client.release();
    }
};

export const obtenerNoticiaPorId = async (id) => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const result = await client.query(
            queries.get_noticia_by_id,
            [id]
        );

        if (result.rows.length === 0) {
            return null;
        }

        const noticia = result.rows[0];

        const cuerpoResult = await client.query(
            queries.get_cuerpo_by_noticia,
            [id]
        );

        noticia.cuerpo = cuerpoResult.rows;

        return noticia;

    } finally {
        client.release();
    }
};

export const crearNoticia = async (data) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        await client.query('BEGIN');

        const {
            titulo,
            extracto,
            categoria,
            red_social,
            link_original,
            portada_url,
            id_referencia,
            comentario,
            create_by,
            updated_at,
            estatus,
            cuerpo = []
        } = data;

        const refId =
            id_referencia &&
            id_referencia !== 'null' &&
            id_referencia !== ''
                ? id_referencia
                : null;

        // INSERTAR NOTICIA
        const noticiaResult = await client.query(
            queries.create_noticia,
            [
                titulo,
                extracto,
                categoria,
                red_social,
                link_original,
                portada_url,
                refId,
                comentario,
                new Date(),
                updated_at || new Date(),
                create_by,
                create_by,
                estatus || 'pendiente'
            ]
        );

        const noticia = noticiaResult.rows[0];

        // INSERTAR CUERPO
        for (const bloque of cuerpo) {

            await client.query(
                queries.create_noticia_cuerpo,
                [
                    noticia.id,
                    bloque.tipo,
                    bloque.contenido,
                    bloque.orden
                ]
            );
        }

        await client.query('COMMIT');

        await publishEvent(
            'allevo',
            'noticia.creada',
            {
                id: noticia.id,
                titulo,
                extracto,
                categoria,
                portada_url
            }
        );

        return noticia;

    } catch (error) {

        await client.query('ROLLBACK');

        throw error;

    } finally {

        client.release();
    }
};

export const actualizarNoticia = async (id, data) => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const {
            titulo,
            extracto,
            categoria,
            red_social,
            link_original,
            portada_url,
            id_referencia,
            comentario,
            update_by,
            estatus
        } = data;

        const refId =
            id_referencia &&
            id_referencia !== 'null' &&
            id_referencia !== ''
                ? id_referencia
                : null;

        const result = await client.query(
            queries.update_noticia,
            [
                titulo,
                extracto,
                categoria,
                red_social,
                link_original,
                portada_url,
                refId,
                comentario,
                update_by,
                estatus || 'pendiente',
                id
            ]
        );

        return result.rowCount;

    } finally {
        client.release();
    }
};

export const eliminarNoticia = async (id) => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const result = await client.query(
            queries.delete_noticia,
            [id]
        );

        return result.rowCount;

    } finally {
        client.release();
    }
};