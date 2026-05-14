import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';

const H = (res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST, GET, DELETE, PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
};

// =============================================
// GET /api/atleta-logros?atleta_id=:id — Obtener logros de un atleta
// =============================================
export const getLogrosByAtleta = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { atleta_id } = req.query;

        if (!atleta_id) {
            // Si no hay filtro, devolver todos los logros ordenados
            const result = await client.query(
                `SELECT al.id_logro, al.fecha_logro, al.titulo, al.descripcion, al.atleta_fk,
                        CONCAT(u.nombres, ' ', u.apellidos) AS atleta_nombre
                 FROM allevo.atleta_logros al
                 LEFT JOIN allevo.atletas a ON al.atleta_fk = a.id_atleta
                 LEFT JOIN allevo.usuarios u ON a.usuario_id = u.id
                 ORDER BY al.fecha_logro DESC NULLS LAST`
            );
            return res.json(result.rows);
        }

        const result = await client.query(queries.get_logros_by_atleta, [atleta_id]);
        res.json(result.rows);
    } catch (err) {
        console.error('Error en getLogrosByAtleta:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};

// =============================================
// GET /api/atleta-logros/:id — Obtener logro por ID
// =============================================
export const getLogroById = async (req, res) => {
    let client;
    try {
        H(res);
        const pool = await getConnection();
        client = await pool.connect();
        const { id } = req.params;
        const result = await client.query(
            `SELECT al.id_logro, al.fecha_logro, al.titulo, al.descripcion, al.atleta_fk,
                    CONCAT(u.nombres, ' ', u.apellidos) AS atleta_nombre
             FROM allevo.atleta_logros al
             LEFT JOIN allevo.atletas a ON al.atleta_fk = a.id_atleta
             LEFT JOIN allevo.usuarios u ON a.usuario_id = u.id
             WHERE al.id_logro = $1`,
            [id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]);
        } else {
            res.status(404).json({ message: 'Logro no encontrado' });
        }
    } catch (err) {
        console.error('Error en getLogroById:', err);
        res.status(500).json({ message: 'Error del servidor', error: err.message });
    } finally {
        if (client) client.release();
    }
};