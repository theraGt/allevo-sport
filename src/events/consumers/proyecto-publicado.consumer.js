import amqp from 'amqplib';

import config from '../../config.js';

import {
    getConnection
} from '../../database/connection.js';

import {
    sendEmail
} from '../../utils/email.js';

import {
    proyectoPublicadoTemplate
} from '../../templates/proyecto-publicado.template.js';

const EXCHANGE =
    'allevo';

const QUEUE =
    'proyecto.publicado.email';

const ROUTING_KEY =
    'proyecto.publicado';

export const startProyectoPublicadoConsumer =
    async () => {

        try {

            console.log(
                '🐰 Conectando consumer RabbitMQ...'
            );

            const connection =
                await amqp.connect(
                    config.rabbitmqUrl
                );

            const channel =
                await connection.createChannel();

            console.log(
                '✅ Consumer conectado a RabbitMQ'
            );

            await channel.assertExchange(
                EXCHANGE,
                'topic',
                {
                    durable: true
                }
            );

            console.log(
                `✅ Exchange verificado:
                ${EXCHANGE}`
            );

            await channel.assertQueue(
                QUEUE,
                {
                    durable: true
                }
            );

            console.log(
                `✅ Queue verificada:
                ${QUEUE}`
            );

            await channel.bindQueue(
                QUEUE,
                EXCHANGE,
                ROUTING_KEY
            );

            console.log(
                `✅ Queue enlazada:
                ${QUEUE}
                -> ${ROUTING_KEY}`
            );

            console.log(
                '👂 Esperando mensajes...'
            );

            channel.consume(

                QUEUE,

                async (msg) => {

                    console.log(
                        '🔥 MENSAJE RECIBIDO'
                    );

                    if (!msg) {

                        console.log(
                            '⚠️ Mensaje vacío'
                        );

                        return;
                    }

                    try {

                        console.log(
                            '📦 RAW:',
                            msg.content.toString()
                        );

                        const data =
                            JSON.parse(
                                msg.content.toString()
                            );

                        console.log(
                            '📨 Evento recibido:',
                            data
                        );

                        const pool =
                            await getConnection();

                        const client =
                            await pool.connect();

                        /*
                         * OBTENER TODOS
                         * LOS INVERSIONISTAS
                         */

                        const result =
                            await client.query(`
                                SELECT
                                    email,
                                    nombres
                                FROM allevo.usuarios
                                WHERE
                                    tipo_usuario = 'inversionista'
                                    AND verificado = true
                            `);

                        const usuarios =
                            result.rows;

                        console.log(
                            `📧 Usuarios encontrados:
                            ${usuarios.length}`
                        );

                        for (
                            const usuario
                            of usuarios
                        ) {

                            console.log(
                                `📧 Enviando correo:
                                ${usuario.email}`
                            );

                            const response =
                                await sendEmail({

                                    to:
                                        usuario.email,

                                    subject:
                                        'Nueva oportunidad de inversión en Allevo Sports',

                                    html:
                                        proyectoPublicadoTemplate(
                                            usuario.nombre,
                                            data
                                        )
                                });

                            console.log(
                                '📬 Respuesta email:',
                                response
                            );
                        }

                        client.release();

                        channel.ack(msg);

                        console.log(
                            '✅ Mensaje confirmado'
                        );

                    } catch (error) {

                        console.error(
                            '❌ Error procesando mensaje:',
                            error
                        );

                        channel.nack(
                            msg,
                            false,
                            false
                        );
                    }
                },

                {
                    noAck: false
                }
            );

        } catch (error) {

            console.error(
                '❌ Error iniciando consumer:',
                error
            );
        }
    };