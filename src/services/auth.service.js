import { getConnection } from '../database/connection.js';
import queries from '../database/queries.js';
import { publishEvent } from '../events/publisher.js';
import { generarToken } from '../utils/token.js';


import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import config from '../config.js';

export const loginUsuario = async (email, password) => {

    const pool = await getConnection();
    const client = await pool.connect();

    const result =
        await client.query(
            queries.login_query,
            [email]
        );

    if (
        result.rows.length === 0
    ) {

        throw new Error(
                'INVALID_CREDENTIALS'
        );
    }

    const user =
        result.rows[0];

    const validPassword =
        await bcrypt.compare(
            password,
            user.password_hash
        );

    if (!validPassword) {

        throw new Error(
            'INVALID_CREDENTIALS'
        );
    }
 
    const tokenLogin = await generarToken();


    await client.query(
        queries.create_login_token,
        [
            user.id,
            tokenLogin
        ]
    );

    await publishEvent(
        'allevo',
        'usuario.login.token',
        {
            email:
                user.email,
            nombre:
                user.nombres,
            token:
                tokenLogin
        }
    );

    return {

        requires2FA: true,
        userId:
            user.id,
        message:
            'Token enviado al correo'
    };
};

export const registrarUsuario = async (data) => {

    const pool = await getConnection();
    const client = await pool.connect();

    try {

        const {
            nombre,
            apellido,
            email,
            password,
            rol,
            telefono,
            pais,
            ciudad,
            fecha_nacimiento,
            genero,
        } = data;

        const existing = await client.query(
            queries.get_usuario_by_email,
            [email]
        );

        if (existing.rows.length > 0) {
            throw new Error('EMAIL_EXISTS');
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        const tokenVerificacion = await generarToken();

        const result = await client.query(
            queries.create_usuario,
            [
                nombre,
                apellido || '',
                email,
                hashedPassword,
                rol || 'usuario',
                tokenVerificacion,
                telefono,
                pais,
                ciudad,
                fecha_nacimiento,
                genero
            ]
        );

        const token = jwt.sign(
            {
                id: result.rows[0].id,
                email,
                rol: rol || 'usuario'
            },
            config.jwtSecret,
            {
                expiresIn: config.jwtExpires
            }
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
                rol: rol || 'usuario',
                token: tokenVerificacion
            }
        );

        return {
            token,
            user: {
                id: result.rows[0].id,
                nombre,
                email,
                rol: rol || 'usuario'
            }
        };

    } finally {
        client.release();
    }
};

export const verificarUsuario = async (
    id,
    token
) => {

    const pool =
        await getConnection();

    const client =
        await pool.connect();

    try {

        const result =
            await client.query(
                queries.verificar_usuario,
                [id, token]
            );

        if (
            result.rows.length === 0
        ) {

            throw new Error(
                'INVALID_TOKEN'
            );
        }

        return {
            message:
                'Usuario verificado correctamente'
        };

    } finally {

        client.release();
    }
};

export const verificarLogin =
    async (
        id_usuario,
        token
    ) => {

        const pool = await getConnection();
        const client = await pool.connect();

        const result =
            await client.query(
                queries.verify_login_token,
                [
                    id_usuario,
                    token
                ]
            );

        if (
            result.rows.length === 0
        ) {

            throw new Error(
                'INVALID_TOKEN'
            );
        }

        const user =
            result.rows[0];

        const jwtToken =
            jwt.sign(
                {
                    id: user.id,
                    email:user.email,
                    rol:user.tipo_usuario
                },
                config.jwtSecret,
                {
                    expiresIn:
                        config.jwtExpires
                }
            );

        await client.query(
            queries.invalidate_login_token,
            [
                id_usuario,
                token
            ]
        );

        return {
            token:jwtToken,
            user: {
                id: user.id,
                email: user.email,
                tipo_usuario: user.tipo_usuario,
                activo: user.activo,
                verificado: user.verificado
            }
        };
    };