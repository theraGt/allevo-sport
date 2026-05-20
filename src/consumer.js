import 'dotenv/config';
import { startUsuarioConsumer } from './events/consumers/usuario.consumer.js';
import { startLoginConsumer} from './events/consumers/login.consumer.js';


startUsuarioConsumer();
startLoginConsumer();