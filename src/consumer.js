import 'dotenv/config';
import { startUsuarioConsumer } from './events/consumers/usuario.consumer.js';
import { startLoginConsumer} from './events/consumers/login.consumer.js';
import {startNoticiaConsumer} from './events/consumers/noticia.consumer.js';
import {startProyectoPublicadoConsumer} from './events/consumers/proyecto-publicado.consumer.js';

startUsuarioConsumer();
startLoginConsumer();
startNoticiaConsumer();
startProyectoPublicadoConsumer();