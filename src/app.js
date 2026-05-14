import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import config from './config.js';

// Routes
import authRoutes from './routes/authRoutes.js';
import atletasRoutes from './routes/atletasRoutes.js';
import sponsorsRoutes from './routes/sponsorsRoutes.js';
import inversionistasRoutes from './routes/inversionistasRoutes.js';
import usuariosRoutes from './routes/usuariosRoutes.js';
import noticiasRoutes from './routes/noticiasRoutes.js';
import proyectosRoutes from './routes/proyectosRoutes.js';
import postulacionesRoutes from './routes/postulacionesRoutes.js';
import noticiaCuerpoRoutes from './routes/noticiaCuerpoRoutes.js';
import noticiaComentariosRoutes from './routes/noticiaComentariosRoutes.js';
import noticiaLikesRoutes from './routes/noticiaLikesRoutes.js';
import atletaBloquesRoutes from './routes/atletaBloquesRoutes.js';
import atletaBloquesDirectRoutes from './routes/atletaBloquesDirectRoutes.js';
import atletaLogrosRoutes from './routes/atletaLogrosRoutes.js';
import deportesRoutes from './routes/deportesRoutes.js';

const app = express();

// CORS
const corsOptions = {
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 204
};

// Middleware global
app.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginOpenerPolicy: false
}));
app.use(cors(corsOptions));

// Limpiar headers restrictivos que puedan interferir con el frontend
app.use((req, res, next) => {
    res.removeHeader('Cross-Origin-Resource-Policy');
    res.removeHeader('Cross-Origin-Opener-Policy');
    next();
});
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configurar puerto
app.set('port', config.port);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Allevo Sports API funcionando', timestamp: new Date() });
});

// Debug route para ver qué está pasando
app.get('/api/debug', (req, res) => {
    res.json({ message: 'Debug endpoint works', time: new Date() });
});

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/atletas', atletasRoutes);
app.use('/api/sponsors', sponsorsRoutes);
app.use('/api/inversionistas', inversionistasRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/noticias', noticiasRoutes);
app.use('/api/proyectos', proyectosRoutes);
app.use('/api/postulaciones', postulacionesRoutes);
app.use('/api/noticia-cuerpo', noticiaCuerpoRoutes);
app.use('/api/noticia-comentarios', noticiaComentariosRoutes);
app.use('/api/noticia-likes', noticiaLikesRoutes);
app.use('/api/atletas', atletaBloquesRoutes);
app.use('/api/atletas-bloques', atletaBloquesDirectRoutes);
app.use('/api/atleta-logros', atletaLogrosRoutes);
app.use('/api/deportes', deportesRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

export default app;
