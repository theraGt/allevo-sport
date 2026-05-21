import amqp from 'amqplib';
import { sendEmail } from '../../utils/email.js';
import { noticiaTemplate } from '../../templates/noticia.template.js';
import { getConnection } from '../../database/connection.js';

const EXCHANGE = 'allevo';
const QUEUE = 'noticia.creada.email';
const ROUTING_KEY = 'noticia.creada';

export const startNoticiaConsumer =
    async () => {

        try {

            const connection =
                await amqp.connect(
                    process.env.RABBITMQ_URL
                );

            const channel =
                await connection.createChannel();

            await channel.assertExchange(
                EXCHANGE,
                'topic',
                {
                    durable:true
                }
            );

            await channel.assertQueue(
                QUEUE,
                {
                    durable:true
                }
            );

            await channel.bindQueue(
                QUEUE,
                EXCHANGE,
                ROUTING_KEY
            );

            console.log(
                '📰 Consumer noticia.creada iniciado'
            );

            channel.consume(
                QUEUE,
                async (msg) => {

                    if (!msg) return;

                    try {

                        const noticia =
                            JSON.parse(
                                msg.content.toString()
                            );

                        console.log(
                            '📨 Nueva noticia recibida:',
                            noticia.titulo
                        );

                        const pool =
                            await getConnection();

                        const client =
                            await pool.connect();

                        try {

                            const users =
                                await client.query(`
                                    SELECT email
                                    FROM allevo.usuarios
                                `);

                            for (
                                const user
                                of users.rows
                            ) {

                                await sendEmail({

                                    to:
                                        user.email,

                                    subject:
                                        `Nueva noticia: ${noticia.titulo}`,

                                    html:
                                        noticiaTemplate(
                                            noticia
                                        )
                                });
                            }

                            console.log(
                                `📧 Correos enviados: ${users.rows.length}`
                            );

                        } finally {

                            client.release();
                        }

                        channel.ack(msg);

                    } catch (error) {

                        console.error(
                            'Error procesando noticia:',
                            error
                        );

                        channel.nack(
                            msg,
                            false,
                            false
                        );
                    }
                }
            );

        } catch (error) {

            console.error(
                'Error iniciando consumer:',
                error
            );
        }
    };