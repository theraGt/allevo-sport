import {
    obtenerNoticias,
    obtenerNoticiasPublicadas,
    obtenerNoticiaPorId,
    crearNoticia,
    actualizarNoticia,
    eliminarNoticia
} from '../services/noticias.service.js';

import { setCorsHeaders } from '../middleware/cors.js';

export const getNoticias = async (req, res) => {
    try {
        setCorsHeaders(res);

        const noticias = await obtenerNoticias();

        res.json(noticias);

    } catch (err) {
        console.error('Error en getNoticias:', err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const getNoticiasPublicadas = async (req, res) => {
    try {
        setCorsHeaders(res);

        const noticias = await obtenerNoticiasPublicadas();

        res.json(noticias);

    } catch (err) {
        console.error('Error en getNoticiasPublicadas:', err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const getNoticiaById = async (req, res) => {
    try {
        setCorsHeaders(res);

        const noticia = await obtenerNoticiaPorId(req.params.id);

        if (!noticia) {
            return res.status(404).json({
                message: 'Noticia no encontrada'
            });
        }

        res.json(noticia);

    } catch (err) {
        console.error('Error en getNoticiaById:', err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const createNoticia = async (req, res) => {
    try {
        setCorsHeaders(res);

        const noticia = await crearNoticia(req.body);

        res.status(201).json({
            id: noticia.id,
            message: 'Noticia creada correctamente'
        });

    } catch (err) {
        console.error('Error en createNoticia:', err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const updateNoticia = async (req, res) => {
    try {
        setCorsHeaders(res);

        const affectedRows = await actualizarNoticia(
            req.params.id,
            req.body
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Noticia no encontrada'
            });
        }

        res.json({
            message: 'Noticia actualizada correctamente'
        });

    } catch (err) {
        console.error('Error en updateNoticia:', err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};

export const deleteNoticia = async (req, res) => {
    try {
        setCorsHeaders(res);

        const affectedRows = await eliminarNoticia(
            req.params.id
        );

        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Noticia no encontrada'
            });
        }

        res.json({
            message: 'Noticia eliminada correctamente'
        });

    } catch (err) {
        console.error('Error en deleteNoticia:', err);

        res.status(500).json({
            message: 'Error del servidor',
            error: err.message
        });
    }
};