import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

export const getProyectos = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_proyectos);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getProyectos:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const getProyectoById = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_proyecto_by_id, [req.params.id]);
        if (result.rows.length > 0) res.json(result.rows[0]);
        else res.status(404).json({ message: 'Proyecto no encontrado' });
    } catch (err) {
        console.error('Error en getProyectoById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const createProyecto = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { nombre, descripcion, imagen_url, presupuesto, estado, fecha_inicio, fecha_fin, activo } = req.body;
        const result = await client.query(queries.create_proyecto, [
            nombre, descripcion, imagen_url, presupuesto, estado || 'activo', fecha_inicio, fecha_fin, activo ?? true
        ]);
        res.status(201).json({ id: result.rows[0].id, message: 'Proyecto creado correctamente' });
    } catch (err) {
        console.error('Error en createProyecto:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const updateProyecto = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { nombre, descripcion, imagen_url, presupuesto, estado, fecha_inicio, fecha_fin, activo } = req.body;
        const result = await client.query(queries.update_proyecto, [nombre, descripcion, imagen_url, presupuesto, estado, fecha_inicio, fecha_fin, activo, id]);
        if (result.rowCount > 0) res.json({ message: 'Proyecto actualizado correctamente' });
        else res.status(404).json({ message: 'Proyecto no encontrado' });
    } catch (err) {
        console.error('Error en updateProyecto:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};

export const deleteProyecto = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.delete_proyecto, [req.params.id]);
        if (result.rowCount > 0) res.json({ message: 'Proyecto eliminado correctamente' });
        else res.status(404).json({ message: 'Proyecto no encontrado' });
    } catch (err) {
        console.error('Error en deleteProyecto:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally { if (client) client.release(); }
};
