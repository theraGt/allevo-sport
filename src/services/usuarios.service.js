import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';
import bcrypt from 'bcryptjs';
import { publishEvent } from '../events/publisher.js';

export const obtenerUsuarios = async () => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const result = await client.query(queries.get_usuarios);
        return result.rows;
    } finally {
        client.release();
    }
};

export const obtenerUsuarioPorId = async (id) => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const result = await client.query(queries.get_usuario_by_id, [id]);
        return result.rows[0];
    } finally {
        client.release();
    }
};

export const crearUsuario = async (data) => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const { nombre, apellido, email, password, rol, activo } = data;

        // Validar email existente
        const existing = await client.query(
            queries.get_usuario_by_email,
            [email]
        );

        if (existing.rows.length > 0) {
            throw new Error('EMAIL_EXISTS');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            queries.create_usuario,
            [
                nombre,
                apellido,
                email,
                hashedPassword,
                rol || 'usuario',
                activo ?? true
            ]
        );

        const usuario = result.rows[0];

        await publishEvent(
            'allevo',
            'usuario.creado',
            {
                id: usuario.id,
                nombre,
                apellido,
                email,
                rol: rol || 'usuario'
            }
        );

        return usuario;
    } finally {
        client.release();
    }
};

export const actualizarUsuario = async (id, data) => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const { nombre, apellido, email, rol, activo } = data;

        const result = await client.query(
            queries.update_usuario,
            [nombre, apellido, email, rol, activo, id]
        );

        return result.rowCount;
    } finally {
        client.release();
    }
};

export const eliminarUsuario = async (id) => {
    const pool = await getConnection();
    const client = await pool.connect();

    try {
        const result = await client.query(
            queries.delete_usuario,
            [id]
        );

        return result.rowCount;
    } finally {
        client.release();
    }
};