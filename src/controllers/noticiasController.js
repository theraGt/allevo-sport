import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export const getNoticias = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_noticias);
        const noticias = result.rows;
        for (const noticia of noticias) {
            const cuerpoResult = await client.query(queries.get_cuerpo_by_noticia, [noticia.id]);
            noticia.cuerpo = cuerpoResult.rows;
        }
        res.json(noticias);
    } catch (err) {
        console.error('Error en getNoticias:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const getNoticiasPublicadas = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_noticias_publicadas);
        const noticias = result.rows;
        for (const noticia of noticias) {
            const cuerpoResult = await client.query(queries.get_cuerpo_by_noticia, [noticia.id]);
            noticia.cuerpo = cuerpoResult.rows;
        }
        res.json(noticias);
    } catch (err) {
        console.error('Error en getNoticiasPublicadas:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const getNoticiaById = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_noticia_by_id, [req.params.id]);
        if (result.rows.length > 0) {
            const noticia = result.rows[0];
            const cuerpoResult = await client.query(queries.get_cuerpo_by_noticia, [req.params.id]);
            noticia.cuerpo = cuerpoResult.rows;
            res.json(noticia);
        } else {
            res.status(404).json({ message: 'Noticia no encontrada' });
        }
    } catch (err) {
        console.error('Error en getNoticiaById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const createNoticia = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { titulo, extracto, categoria, red_social, link_original, portada_url, id_referencia, comentario, create_by, updated_at, estatus } = req.body;
        const refId = id_referencia && id_referencia !== 'null' && id_referencia !== '' ? id_referencia : null;
        const result = await client.query(queries.create_noticia, [
            titulo, extracto, categoria, red_social, link_original, portada_url, refId, comentario, new Date(), updated_at || new Date(), create_by, create_by, estatus || 'pendiente'
        ]);
        res.status(201).json({ id: result.rows[0].id, message: 'Noticia creada correctamente' });
    } catch (err) {
        console.error('Error en createNoticia:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const updateNoticia = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { titulo, extracto, categoria, red_social, link_original, portada_url, id_referencia, comentario, update_by, estatus } = req.body;
        const refId = id_referencia && id_referencia !== 'null' && id_referencia !== '' ? id_referencia : null;
        const result = await client.query(queries.update_noticia, [
            titulo, extracto, categoria, red_social, link_original, portada_url, refId, comentario, update_by, estatus || 'pendiente', id
        ]);
        if (result.rowCount > 0) res.json({ message: 'Noticia actualizada correctamente' });
        else res.status(404).json({ message: 'Noticia no encontrada' });
    } catch (err) {
        console.error('Error en updateNoticia:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const deleteNoticia = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.delete_noticia, [req.params.id]);
        if (result.rowCount > 0) res.json({ message: 'Noticia eliminada correctamente' });
        else res.status(404).json({ message: 'Noticia no encontrada' });
    } catch (err) {
        console.error('Error en deleteNoticia:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};
