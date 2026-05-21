import {
    loginUsuario,
    registrarUsuario, 
    verificarUsuario,
    verificarLogin
} from '../services/auth.service.js';

console.log('=== AUTH CONTROLLER LOADED ===');

export const login = async (req, res) => {

    try {

        console.log('===== LOGIN FUNCTION START =====');

        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: 'Email y contraseña son requeridos'
            });
        }

        const result = await loginUsuario(
            email,
            password
        );

        res.json({
            message: result.message,
            requires2FA: result.requires2FA,
            userId: result.userId
        });

    } catch (err) {

        console.error('Error en login:', err);

        if (err.message === 'INVALID_CREDENTIALS') {
            return res.status(401).json({
                message: 'Credenciales inválidas'
            });
        }

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const register = async (req, res) => {

    try {

        const {
            nombre,
            email,
            password,
            telefono,
            pais,
            ciudad,
            fecha_nacimiento,
            genero
        } = req.body;

        if (!nombre || !email || !password) {
            return res.status(400).json({
                message: 'Nombre, email y contraseña son requeridos'
            });
        }

        const result = await registrarUsuario(
            req.body
        );

        res.status(201).json({
            message: 'Usuario registrado correctamente',
            token: result.token,
            user: result.user
        });

    } catch (err) {

        console.error('Error en register:', err);

        if (err.message === 'EMAIL_EXISTS') {
            return res.status(409).json({
                message: 'El email ya está registrado'
            });
        }

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const verifyUser = async (
    req,
    res
) => {

    try {

        const {
            id,
            token
        } = req.body;

        if (!id || !token) {

            return res.status(400).json({
                message:
                    'ID y token requeridos'
            });
        }

        const response =
            await verificarUsuario(
                id,
                token
            );

        res.json(response);

    } catch (error) {

        if (
            error.message ===
            'INVALID_TOKEN'
        ) {

            return res.status(400).json({
                message:
                    'Token inválido'
            });
        }

        console.error(error);

        res.status(500).json({
            message:
                'Error del servidor'
        });
    }
};

export const verifyLoginToken =
    async (req, res) => {

        try {

            const {
                id_usuario,
                token
            } = req.body;

            if (
                !id_usuario ||
                !token
            ) {

                return res.status(400).json({
                    message:
                        'ID usuario y token son requeridos'
                });
            }

            const response =
                await verificarLogin(
                    id_usuario,
                    token
                );

            return res.json({
                message:
                    'Login validado correctamente',
                token:
                    response.token,
                user:
                    response.user
            });

        } catch (error) {

            console.error(
                'Error verificando login:',
                error
            );

            if (
                error.message ===
                'INVALID_TOKEN'
            ) {

                return res.status(401).json({
                    message:
                        'Token inválido o expirado'
                });
            }

            return res.status(500).json({
                message:
                    'Error del servidor'
            });
        }
    };