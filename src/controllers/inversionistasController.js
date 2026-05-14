import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const CORS_HEADERS = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// GET /api/inversionistas
export const getInversionistas = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_inversionistas);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getInversionistas:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// GET /api/inversionistas/:id
export const getInversionistaById = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.get_inversionista_by_id, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Inversionista no encontrado' });
        }
    } catch (err) {
        console.error('Error en getInversionistaById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// POST /api/inversionistas
export const createInversionista = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { nombre, apellido, empresa, email, telefono, pais, descripcion, activo } = req.body;
        const result = await client.query(queries.create_inversionista, [
            nombre, apellido, empresa, email, telefono, pais, descripcion, activo ?? true
        ]);
        res.status(201).json({ id: result.rows[0].id, message: 'Inversionista creado correctamente' });
    } catch (err) {
        console.error('Error en createInversionista:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// PUT /api/inversionistas/:id
export const updateInversionista = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { nombre, apellido, empresa, email, telefono, pais, descripcion, activo } = req.body;
        const result = await client.query(queries.update_inversionista, [
            nombre, apellido, empresa, email, telefono, pais, descripcion, activo, id
        ]);
        if (result.rowCount > 0) {
            res.json({ message: 'Inversionista actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Inversionista no encontrado' });
        }
    } catch (err) {
        console.error('Error en updateInversionista:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// DELETE /api/inversionistas/:id
export const deleteInversionista = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.delete_inversionista, [id]);
        if (result.rowCount > 0) {
            res.json({ message: 'Inversionista eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Inversionista no encontrado' });
        }
    } catch (err) {
        console.error('Error en deleteInversionista:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};
