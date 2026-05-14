import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// =============================================
// GET /api/atletas — Lista enriquecida con JOIN
// =============================================
export const getAtletas = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_atletas_enriched);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getAtletas:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// GET /api/atletas/:id — Detalle enriquecido
// =============================================
export const getAtletaById = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.get_atleta_by_id_enriched, [id]);
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Atleta no encontrado' });
        }
    } catch (err) {
        console.error('Error en getAtletaById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// GET /api/atletas/:id/perfil — Perfil completo (atleta + logros + bloques)
// =============================================
export const getPerfilCompleto = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;

        // 1. Obtener datos del atleta enriquecidos
        const atletaResult = await client.query(queries.get_perfil_completo, [id]);
        if (atletaResult.rows.length === 0) {
            return res.status(404).json({ message: 'Atleta no encontrado' });
        }

        // 2. Obtener logros
        const logrosResult = await client.query(queries.get_logros_by_atleta, [id]);

        // 3. Obtener bloques editables
        const bloquesResult = await client.query(queries.get_bloques_by_atleta, [id]);

        const perfil = {
            atleta: atletaResult.rows[0],
            logros: logrosResult.rows,
            bloques: bloquesResult.rows
        };

        res.json(perfil);
    } catch (err) {
        console.error('Error en getPerfilCompleto:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// PUT /api/atletas/:id — Actualizar atleta
// =============================================
export const updateAtleta = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const {
            usuario_id,
            deporte_principal_id,
            alias,
            peso_kg,
            altura_cm,
            categoria_peso,
            ranking_nacional,
            ranking_mundial,
            victorias,
            derrotas,
            empates,
            nocauts,
            fecha_debut,
            mejor_posicion,
            patrocinadores_actuales,
            instagram_url,
            bibliografia,
            tiktok,
            portada,
            biografia,
            activo
        } = req.body;

        const result = await client.query(queries.update_atleta_enriched, [
            usuario_id ?? null,
            deporte_principal_id ?? null,
            alias ?? null,
            peso_kg ?? null,
            altura_cm ?? null,
            categoria_peso ?? null,
            ranking_nacional ?? null,
            ranking_mundial ?? null,
            victorias ?? 0,
            derrotas ?? 0,
            empates ?? 0,
            nocauts ?? 0,
            fecha_debut ?? null,
            mejor_posicion ?? null,
            patrocinadores_actuales ?? null,
            instagram_url ?? null,
            bibliografia ?? null,
            tiktok ?? null,
            portada ?? null,
            biografia ?? null,
            activo ?? true,
            id
        ]);

        if (result.rowCount > 0) {
            res.json({ id: result.rows[0].id_atleta, message: 'Atleta actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Atleta no encontrado' });
        }
    } catch (err) {
        console.error('Error en updateAtleta:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// GET /api/deportes — Lista de deportes
// =============================================
export const getDeportes = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const result = await client.query(queries.get_deportes);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getDeportes:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// DELETE /api/atletas/:id — Eliminar atleta
// =============================================
export const deleteAtleta = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.delete_atleta, [id]);
        if (result.rowCount > 0) {
            res.json({ message: 'Atleta eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Atleta no encontrado' });
        }
    } catch (err) {
        console.error('Error en deleteAtleta:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};