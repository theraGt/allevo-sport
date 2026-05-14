import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const CORS_HEADERS = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// GET /api/sponsors
export const getSponsors = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_sponsors);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getSponsors:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// GET /api/sponsors/:id
export const getSponsorById = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.get_sponsor_by_id, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Sponsor no encontrado' });
        }
    } catch (err) {
        console.error('Error en getSponsorById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// POST /api/sponsors
export const createSponsor = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { nombre, logo_url, sitio_web, tipo, descripcion, activo } = req.body;
        const result = await client.query(queries.create_sponsor, [
            nombre, logo_url, sitio_web, tipo, descripcion, activo ?? true
        ]);
        res.status(201).json({ id: result.rows[0].id, message: 'Sponsor creado correctamente' });
    } catch (err) {
        console.error('Error en createSponsor:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// PUT /api/sponsors/:id
export const updateSponsor = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { nombre, logo_url, sitio_web, tipo, descripcion, activo } = req.body;
        const result = await client.query(queries.update_sponsor, [
            nombre, logo_url, sitio_web, tipo, descripcion, activo, id
        ]);
        if (result.rowCount > 0) {
            res.json({ message: 'Sponsor actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Sponsor no encontrado' });
        }
    } catch (err) {
        console.error('Error en updateSponsor:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// DELETE /api/sponsors/:id
export const deleteSponsor = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.delete_sponsor, [id]);
        if (result.rowCount > 0) {
            res.json({ message: 'Sponsor eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Sponsor no encontrado' });
        }
    } catch (err) {
        console.error('Error en deleteSponsor:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};
