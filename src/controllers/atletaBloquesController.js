import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// =============================================
// GET /api/atletas/:id/bloques — Obtener bloques de un atleta
// =============================================
export const getBloquesByAtleta = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.get_bloques_by_atleta, [id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getBloquesByAtleta:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// POST /api/atletas/:id/bloques — Crear bloque
// =============================================
export const createBloque = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { tipo, contenido, orden, visible, create_by } = req.body;

        if (!tipo || !contenido) {
            return res.status(400).json({ message: 'tipo y contenido son requeridos' });
        }

        const result = await client.query(queries.create_bloque, [
            id,
            tipo,
            JSON.stringify(contenido),
            orden ?? 0,
            visible ?? true,
            create_by ?? 'admin'
        ]);

        res.status(201).json({ id: result.rows[0].id, message: 'Bloque creado correctamente' });
    } catch (err) {
        console.error('Error en createBloque:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// PUT /api/atletas-bloques/:id — Actualizar bloque
// =============================================
export const updateBloque = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { tipo, contenido, orden, visible } = req.body;

        const result = await client.query(queries.update_bloque, [
            tipo ?? 'parrafo',
            JSON.stringify(contenido ?? {}),
            orden ?? 0,
            visible ?? true,
            id
        ]);

        if (result.rowCount > 0) {
            res.json({ message: 'Bloque actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'Bloque no encontrado' });
        }
    } catch (err) {
        console.error('Error en updateBloque:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// DELETE /api/atletas-bloques/:id — Eliminar bloque
// =============================================
export const deleteBloque = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(queries.delete_bloque, [id]);

        if (result.rowCount > 0) {
            res.json({ message: 'Bloque eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'Bloque no encontrado' });
        }
    } catch (err) {
        console.error('Error en deleteBloque:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// PUT /api/atletas/:id/bloques/reordenar — Reordenar bloques
// =============================================
export const reorderBloques = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const { bloques } = req.body;

        if (!Array.isArray(bloques)) {
            return res.status(400).json({ message: 'bloques debe ser un array' });
        }

        // Actualizar el orden de cada bloque
        for (let i = 0; i < bloques.length; i++) {
            await client.query(
                `UPDATE allevo.atleta_bloques SET orden = $1, updated_at = NOW() WHERE id = $2 AND atleta_id = $3`,
                [i + 1, bloques[i].id, id]
            );
        }

        res.json({ message: 'Bloques reordenados correctamente' });
    } catch (err) {
        console.error('Error en reorderBloques:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};