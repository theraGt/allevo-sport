import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export const getLikesByNoticia = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { noticia_id } = req.query;
        if (!noticia_id) {
            return res.status(400).json({ message: 'Se requiere noticia_id' });
        }
        const result = await client.query(queries.get_likes_by_noticia, [noticia_id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getLikesByNoticia:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const createLike = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { noticia_id, usuario_id } = req.body;
        const result = await client.query(queries.create_like, [noticia_id, usuario_id]);
        res.status(201).json({ id: result.rows[0].id, message: 'Like creado correctamente' });
    } catch (err) {
        console.error('Error en createLike:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const deleteLike = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { noticia_id, usuario_id } = req.query;
        if (!noticia_id || !usuario_id) {
            return res.status(400).json({ message: 'Se requieren noticia_id y usuario_id' });
        }
        const result = await client.query(queries.delete_like, [noticia_id, usuario_id]);
        if (result.rowCount > 0) res.json({ message: 'Like eliminado correctamente' });
        else res.status(404).json({ message: 'Like no encontrado' });
    } catch (err) {
        console.error('Error en deleteLike:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};