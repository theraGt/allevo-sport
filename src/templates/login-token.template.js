export const loginTokenTemplate = (
    nombre,
    token
) => {

    return `
    
    <div style="
        background-color:#f5f5f5;
        padding:40px;
        font-family:Arial,sans-serif;
    ">

        <div style="
            max-width:600px;
            margin:auto;
            background:white;
            border-radius:12px;
            overflow:hidden;
            box-shadow:0 4px 10px rgba(0,0,0,0.1);
        ">

            <div style="
                background:#c1121f;
                padding:30px;
                text-align:center;
                color:white;
            ">

                <h1 style="
                    margin:0;
                    font-size:28px;
                ">
                    Allevo Sports
                </h1>

            </div>

            <div style="
                padding:40px;
                color:#333;
            ">

                <h2>
                    Hola ${nombre},
                </h2>

                <p style="
                    font-size:16px;
                    line-height:1.6;
                ">
                    Hemos recibido un intento de inicio de sesión en tu cuenta.
                </p>

                <p style="
                    font-size:16px;
                    line-height:1.6;
                ">
                    Utiliza el siguiente código para completar tu acceso:
                </p>

                <div style="
                    margin:40px 0;
                    text-align:center;
                ">

                    <span style="
                        display:inline-block;
                        background:#c1121f;
                        color:white;
                        font-size:36px;
                        letter-spacing:8px;
                        padding:20px 40px;
                        border-radius:10px;
                        font-weight:bold;
                    ">
                        ${token}
                    </span>

                </div>

                <p style="
                    color:#666;
                    font-size:14px;
                ">
                    Este código expirará pronto por seguridad.
                </p>

                <p style="
                    color:#666;
                    font-size:14px;
                ">
                    Si no intentaste iniciar sesión, ignora este correo.
                </p>

            </div>

            <div style="
                background:#f1f1f1;
                padding:20px;
                text-align:center;
                font-size:12px;
                color:#777;
            ">

                © ${new Date().getFullYear()} Allevo Sports

            </div>

        </div>

    </div>
    
    `;
};