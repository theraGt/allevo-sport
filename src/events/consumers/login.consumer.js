import amqp from 'amqplib';
import { sendEmail } from '../../utils/email.js';
import { loginTokenTemplate } from '../../templates/login-token.template.js';

const EXCHANGE = 'allevo';
const QUEUE = 'usuario.login.token.email';
const ROUTING_KEY = 'usuario.login.token';

export const startLoginConsumer = async () => {

    try {

        const connection = await amqp.connect(
            process.env.RABBITMQ_URL
        );

        const channel = await connection.createChannel();

        await channel.assertExchange(
            EXCHANGE,
            'topic',
            {
                durable: true
            }
        );

        await channel.assertQueue(
            QUEUE,
            {
                durable: true
            }
        );

        await channel.bindQueue(
            QUEUE,
            EXCHANGE,
            ROUTING_KEY
        );

        console.log(
            '📩 Consumer login token iniciado'
        );

        channel.consume(
            QUEUE,
            async (msg) => {

                if (!msg) return;

                try {

                    const data = JSON.parse(
                        msg.content.toString()
                    );

                    console.log(
                        '📨 Evento login recibido:',
                        data
                    );

                    await sendEmail({

                        to: data.email,

                        subject: 'Código de acceso - Allevo Sports',

                        html: loginTokenTemplate(
                            data.nombre,
                            data.token
                        )
                    });

                    console.log(
                        '✅ Correo login enviado'
                    );

                    channel.ack(msg);

                } catch (error) {

                    console.error(
                        '❌ Error procesando login:',
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
            '❌ Error iniciando consumer login:',
            error
        );
    }
};