export const proyectoPublicadoTemplate =
(
    nombre,
    proyecto
) => {

    return `
        <div
            style="
                font-family: Arial;
                background:#F8FAFC;
                padding:40px;
            "
        >

            <div
                style="
                    max-width:600px;
                    margin:auto;
                    background:white;
                    border-radius:12px;
                    overflow:hidden;
                "
            >

                ${
                    proyecto.portada_url
                    ? `
                        <img
                            src="${proyecto.portada_url}"
                            style="
                                width:100%;
                                height:300px;
                                object-fit:cover;
                            "
                        />
                    `
                    : ''
                }

                <div style="padding:30px;">

                    <h2
                        style="
                            color:#0F172A;
                            margin-bottom:10px;
                        "
                    >
                        Nueva oportunidad de inversión
                    </h2>

                    <p>
                        Hola ${nombres},
                    </p>

                    <p>
                        Se ha publicado un nuevo
                        proyecto de inversión
                        en Allevo Sports.
                    </p>

                    <h3>
                        ${proyecto.titulo}
                    </h3>

                    <p>
                        ${proyecto.descripcion}
                    </p>

                    <p>
                        <strong>
                            Categoría:
                        </strong>
                        ${proyecto.categoria}
                    </p>

                    <p>
                        <strong>
                            Meta:
                        </strong>
                        Q${proyecto.monto_objetivo}
                    </p>

                    <br/>

                    <a
                        href="https://allevo.gt/proyectos/${proyecto.slug}"
                        style="
                            background:#0F172A;
                            color:white;
                            padding:14px 24px;
                            border-radius:8px;
                            text-decoration:none;
                            display:inline-block;
                        "
                    >
                        Ver Proyecto
                    </a>

                </div>

            </div>

        </div>
    `;
};