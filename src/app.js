import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config.js';

// Routes
import authRoutes from './routes/auth.routes.js';
import atletasRoutes from './routes/atletasRoutes.js';
import sponsorsRoutes from './routes/sponsorsRoutes.js';
import inversionistasRoutes from './routes/inversionistas.routes.js';
import inversionesRoutes from './routes/inversiones.routes.js';
import usuariosRoutes from './routes/usuarios.routes.js';
import noticiasRoutes from './routes/noticias.routes.js';
import proyectosRoutes from './routes/proyectos.routes.js';
import postulacionesRoutes from './routes/postulacionesRoutes.js';
import noticiaComentariosRoutes from './routes/noticiaComentariosRoutes.js';
import noticiaLikesRoutes from './routes/noticiaLikesRoutes.js';
import atletaBloquesRoutes from './routes/atletaBloquesRoutes.js';
import atletaBloquesDirectRoutes from './routes/atletaBloquesDirectRoutes.js';
import atletaLogrosRoutes from './routes/atletaLogrosRoutes.js';
import deportesRoutes from './routes/deportesRoutes.js';

const app = express();

// ======================
// MIDDLEWARES
// ======================
app.use(
    helmet({
        crossOriginResourcePolicy: false,
        crossOriginOpenerPolicy: false
    })
);

app.use(
    cors({
        origin: true,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization']
    })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true
    })
);

// ======================
// CONFIG
// ======================
app.set('port', config.port);

// ======================
// HEALTH CHECK
// ======================
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Allevo Sports API funcionando',
        timestamp: new Date()
    });
});

// ======================
// ROUTES
// ======================
app.use('/api/auth', authRoutes);
app.use('/api/atletas', atletasRoutes);
app.use('/api/sponsors', sponsorsRoutes);
app.use('/api/inversionistas', inversionistasRoutes);
app.use('/api/inversiones', inversionesRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/postulaciones', postulacionesRoutes);
app.use('/api/noticia-comentarios', noticiaComentariosRoutes);
app.use('/api/noticia-likes', noticiaLikesRoutes);
app.use('/api/atletas', atletaBloquesRoutes);
app.use('/api/atletas-bloques', atletaBloquesDirectRoutes);
app.use('/api/atleta-logros', atletaLogrosRoutes);
app.use('/api/deportes', deportesRoutes);

app.use(
    '/uploads',
    express.static('uploads')
);

// ======================
// 404
// ======================
app.use((req, res) => {
    res.status(404).json({
        message: 'Ruta no encontrada'
    });
});

export default app;