export const noticiaTemplate = (
    noticia
) => {

    return `
    
    <div style="
        background:#f5f5f5;
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
                padding:20px;
                text-align:center;
            ">

                <h1 style="
                    color:white;
                    margin:0;
                ">
                    Allevo Sports
                </h1>

            </div>

            <img 
                src="${noticia.portada_url}"
                style="
                    width:100%;
                    max-height:300px;
                    object-fit:cover;
                "
            />

            <div style="padding:30px;">

                <p style="
                    color:#c1121f;
                    font-weight:bold;
                    margin-bottom:10px;
                ">
                    NUEVA NOTICIA
                </p>

                <h2 style="
                    margin-top:0;
                    color:#222;
                ">
                    ${noticia.titulo}
                </h2>

                <p style="
                    color:#555;
                    line-height:1.6;
                ">
                    ${noticia.extracto}
                </p>

                <div style="
                    margin-top:30px;
                    text-align:center;
                ">

                    <a 
                        href="https://allevosport.com"
                        style="
                            background:#c1121f;
                            color:white;
                            text-decoration:none;
                            padding:14px 24px;
                            border-radius:8px;
                            display:inline-block;
                            font-weight:bold;
                        "
                    >
                        Ver noticia
                    </a>

                </div>

            </div>

        </div>

    </div>
    
    `;
};