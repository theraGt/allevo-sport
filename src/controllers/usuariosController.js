import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';
import bcrypt from 'bcryptjs';

const CORS_HEADERS = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// GET /api/usuarios  — no devuelve el campo password
export const getUsuarios = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_usuarios);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getUsuarios:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// GET /api/usuarios/:id
export const getUsuarioById = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.get_usuario_by_id, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error en getUsuarioById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// GET /api/usuarios/by-email?email=...
export const getUsuarioByEmail = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { email } = req.query;
        
        if (!email) {
            return res.status(400).json({ message: 'Email es requerido' });
        }
        
        const result = await client.query(queries.get_usuario_by_email_public, [email]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error en getUsuarioByEmail:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// POST /api/usuarios  — hashea el password antes de guardar
export const createUsuario = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { nombre, apellido, email, password, rol, activo } = req.body;

        // Verificar si el email ya existe
        const existing = await client.query(queries.get_usuario_by_email, [email]);
        if (existing.rows.length > 0) {
            return res.status(409).json({ message: 'El email ya está registrado' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await client.query(queries.create_usuario, [
            nombre, apellido, email, hashedPassword, rol || 'usuario', activo ?? true
        ]);
        res.status(201).json({ id: result.rows[0].id, message: 'Usuario creado correctamente' });
    } catch (err) {
        console.error('Error en createUsuario:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// PUT /api/usuarios/:id
export const updateUsuario = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { nombre, apellido, email, rol, activo } = req.body;
        const result = await client.query(queries.update_usuario, [
            nombre, apellido, email, rol, activo, id
        ]);
        if (result.rowCount > 0) {
            res.json({ message: 'Usuario actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error en updateUsuario:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// DELETE /api/usuarios/:id
export const deleteUsuario = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.delete_usuario, [id]);
        if (result.rowCount > 0) {
            res.json({ message: 'Usuario eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error('Error en deleteUsuario:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};
