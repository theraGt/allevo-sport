import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario } from '../services/usuarios.service.js';
import { setCorsHeaders } from '../middleware/cors.js';

export const getUsuarios = async (req, res) => {
    try {
        setCorsHeaders(res);

        const usuarios = await obtenerUsuarios();

        res.json(usuarios);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const getUsuarioById = async (req, res) => {
    try {
        setCorsHeaders(res);

        const usuario = await obtenerUsuarioPorId(req.params.id);

        if (!usuario) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.json(usuario);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const createUsuario = async (req, res) => {
    try {
        setCorsHeaders(res);

        const usuario = await crearUsuario(req.body);

        res.status(201).json({
            id: usuario.id,
            message: 'Usuario creado correctamente'
        });

    } catch (err) {
        console.error(err);

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

export const updateUsuario = async (req, res) => {
    try {
        setCorsHeaders(res);

        const affectedRows = await actualizarUsuario(
            req.params.id,
            req.body
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            message: 'Usuario actualizado correctamente'
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        setCorsHeaders(res);

        const affectedRows = await eliminarUsuario(req.params.id);

        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }

        res.json({
            message: 'Usuario eliminado correctamente'
        });

    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};