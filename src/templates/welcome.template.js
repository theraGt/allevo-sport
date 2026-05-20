export const welcomeTemplate = (
    nombre,
    token
) => {

    return `
    
    <!DOCTYPE html>
    <html lang="es">

    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />

        <title>
            Bienvenido a Allevo Sports
        </title>
    </head>

    <body style="
        margin: 0;
        padding: 0;
        background-color: #0F0F0F;
        font-family: Arial, Helvetica, sans-serif;
        color: #FFFFFF;
    ">

        <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            border="0"
            style="
                background-color: #0F0F0F;
                padding: 40px 0;
            "
        >
            <tr>
                <td align="center">

                    <table
                        width="600"
                        cellpadding="0"
                        cellspacing="0"
                        border="0"
                        style="
                            background-color: #181818;
                            border-radius: 18px;
                            overflow: hidden;
                            border: 1px solid #2A2A2A;
                        "
                    >

                        <!-- HEADER -->
                        <tr>
                            <td
                                align="center"
                                style="
                                    background: linear-gradient(
                                        135deg,
                                        #B91C1C,
                                        #EF4444
                                    );
                                    padding: 45px 20px;
                                "
                            >

                                <h1 style="
                                    margin: 0;
                                    font-size: 34px;
                                    font-weight: bold;
                                    color: #FFFFFF;
                                    letter-spacing: 1px;
                                ">
                                    ALLEVO SPORTS
                                </h1>

                                <p style="
                                    margin-top: 10px;
                                    margin-bottom: 0;
                                    color: #FEE2E2;
                                    font-size: 15px;
                                ">
                                    Impulsando atletas.
                                    Conectando oportunidades.
                                </p>

                            </td>
                        </tr>

                        <!-- CONTENT -->
                        <tr>
                            <td
                                style="
                                    padding: 45px 40px;
                                "
                            >

                                <h2 style="
                                    margin-top: 0;
                                    font-size: 28px;
                                    color: #FFFFFF;
                                ">
                                    ¡Bienvenido, ${nombre}!
                                </h2>

                                <p style="
                                    font-size: 16px;
                                    line-height: 1.7;
                                    color: #D1D5DB;
                                ">
                                    Gracias por registrarte en
                                    <strong>
                                        Allevo Sports
                                    </strong>.

                                    Estamos emocionados de que
                                    formes parte de nuestra
                                    comunidad deportiva.
                                </p>

                                <p style="
                                    font-size: 16px;
                                    line-height: 1.7;
                                    color: #D1D5DB;
                                ">
                                    Para completar la verificación
                                    de tu cuenta utiliza el
                                    siguiente código:
                                </p>

                                <!-- TOKEN -->
                                <div style="
                                    text-align: center;
                                    margin: 40px 0;
                                ">

                                    <div style="
                                        display: inline-block;
                                        background-color: #111111;
                                        border: 2px solid #DC2626;
                                        border-radius: 14px;
                                        padding: 18px 35px;
                                        font-size: 34px;
                                        font-weight: bold;
                                        letter-spacing: 10px;
                                        color: #F87171;
                                    ">
                                        ${token}
                                    </div>

                                </div>

                                <p style="
                                    font-size: 14px;
                                    color: #9CA3AF;
                                    line-height: 1.6;
                                ">
                                    Este código es personal
                                    y temporal. No lo compartas
                                    con nadie.
                                </p>

                                <!-- BUTTON -->
                                <div style="
                                    text-align: center;
                                    margin-top: 45px;
                                ">

                                    <a
                                        href="https://allevosport.com"
                                        style="
                                            background: linear-gradient(
                                                135deg,
                                                #B91C1C,
                                                #EF4444
                                            );
                                            color: #FFFFFF;
                                            text-decoration: none;
                                            padding: 16px 34px;
                                            border-radius: 12px;
                                            font-weight: bold;
                                            font-size: 15px;
                                            display: inline-block;
                                        "
                                    >
                                        Ir a Allevo Sports
                                    </a>

                                </div>

                            </td>
                        </tr>

                        <!-- FOOTER -->
                        <tr>
                            <td
                                style="
                                    background-color: #111111;
                                    padding: 30px;
                                    text-align: center;
                                "
                            >

                                <p style="
                                    margin: 0;
                                    color: #6B7280;
                                    font-size: 13px;
                                    line-height: 1.7;
                                ">
                                    © ${new Date().getFullYear()}
                                    Allevo Sports.
                                    Todos los derechos reservados.
                                </p>

                                <p style="
                                    margin-top: 10px;
                                    color: #6B7280;
                                    font-size: 12px;
                                ">
                                    Este correo fue enviado
                                    automáticamente.
                                </p>

                            </td>
                        </tr>

                    </table>

                </td>
            </tr>
        </table>

    </body>
    </html>
    
    `;
};