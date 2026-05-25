import {obtenerProyectos,obtenerProyectoPorId,crearProyecto,actualizarProyecto,eliminarProyecto,actualizarEstadoProyecto} from '../services/proyectos.service.js';

export const getProyectos = async (
    req,
    res
) => {

    try {

        const proyectos =
            await obtenerProyectos();

        res.json(proyectos);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Error del servidor'
        });
    }
};

export const getProyectoById = async (
    req,
    res
) => {

    try {

        const proyecto =
            await obtenerProyectoPorId(
                req.params.id
            );

        if (!proyecto) {

            return res.status(404).json({
                message:
                    'Proyecto no encontrado'
            });
        }

        res.json(proyecto);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Error del servidor'
        });
    }
};

export const createProyecto = async (
    req,
    res
) => {

    try {

        const proyecto =
            await crearProyecto(
                req.body,
                //req.user.id
            );

        res.status(201).json({
            message:
                'Proyecto creado correctamente',
            proyecto
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Error del servidor'
        });
    }
};

export const updateProyecto = async (
    req,
    res
) => {

    try {

        const affectedRows =
            await actualizarProyecto(
                req.params.id,
                req.body,
                req.user.id
            );

        if (affectedRows === 0) {

            return res.status(404).json({
                message:
                    'Proyecto no encontrado'
            });
        }

        res.json({
            message:
                'Proyecto actualizado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Error del servidor'
        });
    }
};

export const deleteProyecto = async (
    req,
    res
) => {

    try {

        const affectedRows =
            await eliminarProyecto(
                req.params.id
            );

        if (affectedRows === 0) {

            return res.status(404).json({
                message:
                    'Proyecto no encontrado'
            });
        }

        res.json({
            message:
                'Proyecto eliminado correctamente'
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message:
                'Error del servidor'
        });
    }
};

export const updateEstadoProyecto =
    async (req, res) => {

        try {

            const { id } = req.params;
            const { estado } = req.body;

            if (!estado) {

                return res.status(400).json({
                    message:
                        'Estado requerido'
                });
            }

            const proyecto =
                await actualizarEstadoProyecto(
                    id,
                    estado
                );

            return res.json({
                message:
                    'Estado actualizado correctamente',
                proyecto
            });

        } catch (error) {

            console.error(error);

            return res.status(500).json({
                message:
                    'Error del servidor'
            });
        }
    };