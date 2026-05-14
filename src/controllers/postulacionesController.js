import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const CORS_HEADERS = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

const logRequest = (req, action, detail = '') => {
    const timestamp = new Date().toLocaleString();
    const user = req.user?.email || req.user?.correo || 'Anonymous';
    const ip = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || req.connection?.remoteAddress || 'Unknown';
    console.log(`[${timestamp}] [User: ${user}] [IP: ${ip}] ${action}${detail ? ' | ' + detail : ''}`);
};

// GET /api/postulaciones
export const getPostulaciones = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        logRequest(req, 'GET /postulaciones', 'Listando todas las postulaciones');
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_postulaciones);
        console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulaciones encontradas: ${result.rows.length}`);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getPostulaciones:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// GET /api/postulaciones/tipo/:tipo
export const getPostulacionesByTipo = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const { tipo } = req.params;
        logRequest(req, 'GET /postulaciones/tipo/' + tipo, `Filtrando por tipo: ${tipo}`);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_postulaciones_by_tipo, [tipo]);
        console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulaciones tipo '${tipo}': ${result.rows.length}`);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getPostulacionesByTipo:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// GET /api/postulaciones/:id
export const getPostulacionById = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const { id } = req.params;
        logRequest(req, 'GET /postulaciones/' + id, `Buscando postulación ID: ${id}`);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_postulacion_by_id, [id]);
        if (result.rows.length > 0) {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulación encontrada ID: ${id}`);
            res.json(result.rows[0]);
        } else {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulación NO encontrada ID: ${id}`);
            res.status(404).json({ message: 'Postulación no encontrada' });
        }
    } catch (err) {
        console.error('Error en getPostulacionById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// POST /api/postulaciones
// Público: cualquier persona puede enviar una postulación
export const createPostulacion = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const {
            tipo, nombre, email, telefono, ciudad, departamento, municipio, datos
        } = req.body;

        logRequest(req, 'POST /postulaciones', `Nueva postulación | Tipo: ${tipo} | Nombre: ${nombre} | Email: ${email}`);

        const pool = await getConnection();
        client = await pool.connect();

        const result = await client.query(queries.create_postulacion, [
            tipo || 'atleta',
            nombre,
            email,
            telefono || null,
            ciudad || null,
            departamento || null,
            municipio || null,
            'pendiente',
            null,
            JSON.stringify(datos || {})
        ]);

        console.log(`[${new Date().toLocaleString()}] [User: Anonymous] [IP: ${req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'Unknown'}] Postulación creada exitosamente | ID: ${result.rows[0].id} | Tipo: ${tipo}`);

        res.status(201).json({
            id: result.rows[0].id,
            message: 'Postulación enviada correctamente. Te contactaremos pronto.'
        });
    } catch (err) {
        console.error('Error en createPostulacion:', err);
        if (err.code === '23505') {
            return res.status(409).json({
                message: 'Ya existe una postulación con este email para este tipo.',
                error: err.message
            });
        }
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// PUT /api/postulaciones/:id
export const updatePostulacion = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const { id } = req.params;
        const {
            tipo, nombre, email, telefono, ciudad, departamento, municipio,
            estado, notas_admin, datos
        } = req.body;

        logRequest(req, 'PUT /postulaciones/' + id, `Actualizando postulación ID: ${id} | Estado: ${estado}`);

        const pool = await getConnection();
        client = await pool.connect();

        const result = await client.query(queries.update_postulacion, [
            tipo, nombre, email, telefono || null, ciudad || null,
            departamento || null, municipio || null, estado || 'pendiente',
            notas_admin || null, JSON.stringify(datos || {}), id
        ]);

        if (result.rowCount > 0) {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulación actualizada ID: ${id}`);
            res.json({ message: 'Postulación actualizada correctamente' });
        } else {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulación NO encontrada para actualizar ID: ${id}`);
            res.status(404).json({ message: 'Postulación no encontrada' });
        }
    } catch (err) {
        console.error('Error en updatePostulacion:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// PATCH /api/postulaciones/:id/estado
export const updatePostulacionEstado = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const { id } = req.params;
        const { estado, notas_admin } = req.body;

        logRequest(req, 'PATCH /postulaciones/' + id + '/estado', `Cambiando estado a: ${estado}`);

        const pool = await getConnection();
        client = await pool.connect();

        const result = await client.query(queries.update_postulacion_estado, [
            estado, notas_admin || null, id
        ]);

        if (result.rowCount > 0) {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Estado actualizado ID: ${id} -> ${estado}`);
            res.json({ message: 'Estado de postulación actualizado correctamente' });
        } else {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulación NO encontrada para cambiar estado ID: ${id}`);
            res.status(404).json({ message: 'Postulación no encontrada' });
        }
    } catch (err) {
        console.error('Error en updatePostulacionEstado:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// DELETE /api/postulaciones/:id
export const deletePostulacion = async (req, res) => {
    let client;
    try {
        CORS_HEADERS(res);
        const { id } = req.params;

        logRequest(req, 'DELETE /postulaciones/' + id, `Eliminando postulación ID: ${id}`);

        const pool = await getConnection();
        client = await pool.connect();

        const result = await client.query(queries.delete_postulacion, [id]);

        if (result.rowCount > 0) {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulación eliminada ID: ${id}`);
            res.json({ message: 'Postulación eliminada correctamente' });
        } else {
            console.log(`[${new Date().toLocaleString()}] [User: ${req.user?.email || req.user?.correo || 'Anonymous'}] Postulación NO encontrada para eliminar ID: ${id}`);
            res.status(404).json({ message: 'Postulación no encontrada' });
        }
    } catch (err) {
        console.error('Error en deletePostulacion:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};
