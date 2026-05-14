import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export const getCuerpoByNoticia = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { noticia_id } = req.query;
        if (!noticia_id) {
            return res.status(400).json({ message: 'Se requiere noticia_id' });
        }
        const result = await client.query(queries.get_cuerpo_by_noticia, [noticia_id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getCuerpoByNoticia:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const createCuerpo = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { noticia_id, tipo, contenido, orden } = req.body;
        const result = await client.query(queries.create_cuerpo, [noticia_id, tipo, contenido, orden]);
        res.status(201).json({ id: result.rows[0].id, message: 'Bloque creado correctamente' });
    } catch (err) {
        console.error('Error en createCuerpo:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const updateCuerpo = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { tipo, contenido, orden } = req.body;
        const result = await client.query(queries.update_cuerpo, [tipo, contenido, orden, id]);
        if (result.rowCount > 0) res.json({ message: 'Bloque actualizado correctamente' });
        else res.status(404).json({ message: 'Bloque no encontrado' });
    } catch (err) {
        console.error('Error en updateCuerpo:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const deleteCuerpo = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.delete_cuerpo, [req.params.id]);
        if (result.rowCount > 0) res.json({ message: 'Bloque eliminado correctamente' });
        else res.status(404).json({ message: 'Bloque no encontrado' });
    } catch (err) {
        console.error('Error en deleteCuerpo:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};