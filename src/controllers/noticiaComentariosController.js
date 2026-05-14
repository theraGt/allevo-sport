import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export const getComentariosByNoticia = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { noticia_id } = req.query;
        if (!noticia_id) {
            return res.status(400).json({ message: 'Se requiere noticia_id' });
        }
        const result = await client.query(queries.get_comentarios_by_noticia, [noticia_id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getComentariosByNoticia:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const createComentario = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { noticia_id, usuario_nombre, comentario } = req.body;
        const result = await client.query(queries.create_comentario, [noticia_id, usuario_nombre, comentario]);
        res.status(201).json({ id: result.rows[0].id, message: 'Comentario creado correctamente' });
    } catch (err) {
        console.error('Error en createComentario:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const deleteComentario = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.delete_comentario, [req.params.id]);
        if (result.rowCount > 0) res.json({ message: 'Comentario eliminado correctamente' });
        else res.status(404).json({ message: 'Comentario no encontrado' });
    } catch (err) {
        console.error('Error en deleteComentario:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};