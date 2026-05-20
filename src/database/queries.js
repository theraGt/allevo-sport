// =============================================
// QUERIES - Allevo Sports API
// =============================================

const queries = {

    // ---- ATLETAS (legacy - compatibilidad) ----
    // Usar get_atletas_enriched para nuevos desarrollos
    get_atletas: `SELECT * FROM allevo.atletas ORDER BY id_atleta ASC`,
    get_atleta_by_id_legacy: `SELECT * FROM allevo.atletas WHERE id_atleta = $1`,
    create_atleta: `
        INSERT INTO allevo.atletas (usuario_id, deporte_principal_id, alias, activo)
        VALUES ($1, $2, $3, $4) RETURNING id_atleta
    `,
    update_atleta: `
        UPDATE allevo.atletas SET
            usuario_id = $1,
            deporte_principal_id = $2,
            alias = $3,
            activo = $4
        WHERE id_atleta = $5 RETURNING id_atleta
    `,
    delete_atleta: `DELETE FROM allevo.atletas WHERE id_atleta = $1`,

    // ---- SPONSORS ----
    get_sponsors: `SELECT * FROM allevo.sponsors ORDER BY id ASC`,
    get_sponsor_by_id: `SELECT * FROM allevo.sponsors WHERE id = $1`,
    create_sponsor: `INSERT INTO allevo.sponsors (nombre, logo_url, sitio_web, tipo, descripcion, activo)
                              VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`,
    update_sponsor: `UPDATE allevo.sponsors SET nombre=$1, logo_url=$2, sitio_web=$3, tipo=$4, descripcion=$5, activo=$6
                              WHERE id=$7 RETURNING id`,
    delete_sponsor: `DELETE FROM allevo.sponsors WHERE id=$1`,

    // ---- INVERSIONISTAS ----
    get_inversionistas: `SELECT * FROM allevo.inversionistas ORDER BY id ASC`,
    get_inversionista_by_id: `SELECT * FROM allevo.inversionistas WHERE id = $1`,
    create_inversionista: `INSERT INTO allevo.inversionistas (nombre, apellido, empresa, email, telefono, pais, descripcion, activo)
                              VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    update_inversionista: `UPDATE allevo.inversionistas SET nombre=$1, apellido=$2, empresa=$3, email=$4, telefono=$5, pais=$6, descripcion=$7, activo=$8
                              WHERE id=$9 RETURNING id`,
    delete_inversionista: `DELETE FROM allevo.inversionistas WHERE id=$1`,

    // ---- USUARIOS ----
    get_usuarios: `SELECT id, nombres, apellidos, email, tipo_usuario, activo, created_at FROM allevo.usuarios ORDER BY id ASC`,
    get_usuario_by_id: `SELECT id, nombres, apellidos, email, tipo_usuario, activo, created_at FROM allevo.usuarios WHERE id = $1`,
    get_usuario_by_email: `SELECT * FROM allevo.usuarios WHERE email = $1`,
    create_usuario: `INSERT INTO allevo.usuarios (nombres, apellidos, email, password_hash, tipo_usuario, token_verificacion, telefono, pais, ciudad, fecha_nacimiento, genero)
                              VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING id`,
    update_usuario: `UPDATE allevo.usuarios SET nombres=$1, apellidos=$2, email=$3, tipo_usuario=$4, activo=$5
                              WHERE id=$6 RETURNING id`,
    delete_usuario: `DELETE FROM allevo.usuarios WHERE id=$1`,

    // ---- AUTH ----
    login_query: `Select id, email, password_hash, tipo_usuario, nombres, apellidos, activo, verificado FROM allevo.usuarios WHERE email = $1`,
    verificar_usuario: `UPDATE allevo.usuarios SET verificado = true, updated_at = NOW() WHERE id = $1 AND token_verificacion = $2 RETURNING id`,
    create_login_token: `INSERT INTO allevo.registro_inicio_sesion (id_usuario,token,fecha_inicio,usado)VALUES ($1, $2, NOW(),false)`,
    verify_login_token: `SELECT u.id, u.email, u.tipo_usuario, u.activo, u.verificado, t.token, t.usado FROM allevo.registro_inicio_sesion t INNER JOIN allevo.usuarios u ON u.id = t.id_usuario WHERE t.id_usuario = $1 AND t.token = $2 AND t.usado = false LIMIT 1`,
    invalidate_login_token: `UPDATE allevo.registro_inicio_sesion SET usado = true WHERE id_usuario = $1 AND token = $2`,

    // ---- NOTICIAS ----
    get_noticias: `SELECT id, titulo, extracto, categoria, red_social, link_original, portada_url, id_referencia, created_at, comentario, updated_at, create_by, update_by, estatus
                         FROM allevo.noticias ORDER BY created_at DESC`,
    get_noticias_publicadas: `SELECT id, titulo, extracto, categoria, red_social, link_original, portada_url, id_referencia, created_at, comentario, updated_at, create_by, update_by, estatus
                         FROM allevo.noticias WHERE estatus = 'publicado' ORDER BY created_at DESC`,
    get_noticia_by_id: `SELECT id, titulo, extracto, categoria, red_social, link_original, portada_url, id_referencia, created_at, comentario, updated_at, create_by, update_by, estatus
                             FROM allevo.noticias WHERE id = $1`,
    create_noticia: `INSERT INTO allevo.noticias (titulo, extracto, categoria, red_social, link_original, portada_url, id_referencia, comentario, created_at, updated_at, create_by, update_by, estatus)
                              VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING id`,
    update_noticia: `UPDATE allevo.noticias SET titulo=$1, extracto=$2, categoria=$3, red_social=$4, link_original=$5, portada_url=$6, id_referencia=$7, comentario=$8, update_by=$9, updated_at=NOW(), estatus=$10
                              WHERE id=$11 RETURNING id`,
    delete_noticia: `DELETE FROM allevo.noticias WHERE id=$1`,

    // ---- PROYECTOS ----
    get_proyectos: `SELECT * FROM allevo.proyectos ORDER BY id ASC`,
    get_proyecto_by_id: `SELECT * FROM allevo.proyectos WHERE id = $1`,
    create_proyecto: `INSERT INTO allevo.proyectos (nombre, descripcion, imagen_url, presupuesto, estado, fecha_inicio, fecha_fin, activo)
                              VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`,
    update_proyecto: `UPDATE allevo.proyectos SET nombre=$1, descripcion=$2, imagen_url=$3, presupuesto=$4, estado=$5, fecha_inicio=$6, fecha_fin=$7, activo=$8
                              WHERE id=$9 RETURNING id`,
    delete_proyecto: `DELETE FROM allevo.proyectos WHERE id=$1`,

    // ---- POSTULACIONES (genéricas: atleta, sponsor, inversionista) ----
    get_postulaciones: `SELECT id, tipo, nombre, email, telefono, ciudad, departamento, municipio, estado, notas_admin, datos, created_at, updated_at FROM allevo.postulaciones ORDER BY created_at DESC`,
    get_postulaciones_by_tipo: `SELECT id, tipo, nombre, email, telefono, ciudad, departamento, municipio, estado, notas_admin, datos, created_at, updated_at FROM allevo.postulaciones WHERE tipo = $1 ORDER BY created_at DESC`,
    get_postulacion_by_id: `SELECT id, tipo, nombre, email, telefono, ciudad, departamento, municipio, estado, notas_admin, datos, created_at, updated_at FROM allevo.postulaciones WHERE id = $1`,
    create_postulacion: `INSERT INTO allevo.postulaciones (tipo, nombre, email, telefono, ciudad, departamento, municipio, estado, notas_admin, datos)
                                VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id`,
    update_postulacion: `UPDATE allevo.postulaciones SET tipo=$1, nombre=$2, email=$3, telefono=$4, ciudad=$5, departamento=$6, municipio=$7, estado=$8, notas_admin=$9, datos=$10
                                WHERE id=$11 RETURNING id`,
    update_postulacion_estado: `UPDATE allevo.postulaciones SET estado=$1, notas_admin=$2, updated_at=NOW() WHERE id=$3 RETURNING id`,
    delete_postulacion: `DELETE FROM allevo.postulaciones WHERE id=$1`,

    // ---- NOTICIA CUERPO ----
    get_cuerpo_by_noticia: `SELECT id, noticia_id, tipo, contenido, orden FROM allevo.noticia_cuerpo WHERE noticia_id = $1 ORDER BY orden ASC`,
    create_cuerpo: `INSERT INTO allevo.noticia_cuerpo (noticia_id, tipo, contenido, orden) VALUES ($1,$2,$3,$4) RETURNING id`,
    update_cuerpo: `UPDATE allevo.noticia_cuerpo SET tipo=$1, contenido=$2, orden=$3 WHERE id=$4 RETURNING id`,
    delete_cuerpo: `DELETE FROM allevo.noticia_cuerpo WHERE id=$1`,

    // ---- NOTICIA COMENTARIOS ----
    get_comentarios_by_noticia: `SELECT id, noticia_id, usuario_nombre, comentario, fecha FROM allevo.noticia_comentarios WHERE noticia_id = $1 ORDER BY fecha DESC`,
    create_comentario: `INSERT INTO allevo.noticia_comentarios (noticia_id, usuario_nombre, comentario) VALUES ($1,$2,$3) RETURNING id`,
    delete_comentario: `DELETE FROM allevo.noticia_comentarios WHERE id=$1`,

    // ---- NOTICIA LIKES ----
    get_likes_by_noticia: `SELECT noticia_id, usuario_id FROM allevo.noticia_likes WHERE noticia_id = $1`,
    create_like: `INSERT INTO allevo.noticia_likes (noticia_id, usuario_id) VALUES ($1,$2) RETURNING id`,
    delete_like: `DELETE FROM allevo.noticia_likes WHERE noticia_id = $1 AND usuario_id = $2`,

    // =============================================
    // TALENT PANEL - ATLETAS ENRIQUECIDOS
    // =============================================

    // ---- ATLETAS ENRIQUECIDOS (con JOIN usuarios + deportes) ----
    get_atletas_enriched: `
        SELECT 
            a.id_atleta,
            a.usuario_id,
            a.deporte_principal_id,
            CONCAT(u.nombres, ' ', u.apellidos) AS nombre,
            a.alias,
            COALESCE(d.descripcion, d.nombre) AS disciplina,
            a.peso_kg,
            a.altura_cm,
            a.categoria_peso,
            a.ranking_nacional,
            a.ranking_mundial,
            a.victorias,
            a.derrotas,
            a.empates,
            a.nocauts,
            a.fecha_debut,
            a.mejor_posicion,
            a.patrocinadores_actuales,
            a.instagram_url,
            a.bibliografia,
            a.tiktok,
            a.portada,
            a.biografia,
            a.activo,
            d.nombre AS deporte_nombre,
            d.categoria AS deporte_categoria,
            u.email AS email,
            u.pais AS pais,
            u.ciudad AS ciudad,
            u.fecha_nacimiento
        FROM allevo.atletas a
        LEFT JOIN allevo.usuarios u ON a.usuario_id = u.id
        LEFT JOIN allevo.deportes d ON a.deporte_principal_id = d.id
        ORDER BY a.id_atleta ASC
    `,

    get_atleta_by_id_enriched: `
        SELECT 
            a.id_atleta,
            a.usuario_id,
            a.deporte_principal_id,
            CONCAT(u.nombres, ' ', u.apellidos) AS nombre,
            a.alias,
            COALESCE(d.descripcion, d.nombre) AS disciplina,
            a.peso_kg,
            a.altura_cm,
            a.categoria_peso,
            a.ranking_nacional,
            a.ranking_mundial,
            a.victorias,
            a.derrotas,
            a.empates,
            a.nocauts,
            a.fecha_debut,
            a.mejor_posicion,
            a.patrocinadores_actuales,
            a.instagram_url,
            a.bibliografia,
            a.tiktok,
            a.portada,
            a.biografia,
            a.activo,
            d.nombre AS deporte_nombre,
            d.categoria AS deporte_categoria,
            u.email AS email,
            u.pais AS pais,
            u.ciudad AS ciudad,
            u.fecha_nacimiento
        FROM allevo.atletas a
        LEFT JOIN allevo.usuarios u ON a.usuario_id = u.id
        LEFT JOIN allevo.deportes d ON a.deporte_principal_id = d.id
        WHERE a.id_atleta = $1
    `,

    // Para updates — campos base
    get_atleta_by_id: `SELECT * FROM allevo.atletas WHERE id_atleta = $1`,

    update_atleta_enriched: `
        UPDATE allevo.atletas SET
            usuario_id = $1,
            deporte_principal_id = $2,
            alias = $3,
            peso_kg = $4,
            altura_cm = $5,
            categoria_peso = $6,
            ranking_nacional = $7,
            ranking_mundial = $8,
            victorias = $9,
            derrotas = $10,
            empates = $11,
            nocauts = $12,
            fecha_debut = $13,
            mejor_posicion = $14,
            patrocinadores_actuales = $15,
            instagram_url = $16,
            bibliografia = $17,
            tiktok = $18,
            portada = $19,
            biografia = $20,
            activo = $21
        WHERE id_atleta = $22 RETURNING id_atleta
    `,

    // ---- DEPORTES ----
    get_deportes: `SELECT * FROM allevo.deportes WHERE activo = true OR activo IS NULL ORDER BY nombre ASC`,
    get_deporte_by_id: `SELECT * FROM allevo.deportes WHERE id = $1`,

    // ---- ATLETA LOGROS ----
    get_logros_by_atleta: `
        SELECT id_logro, fecha_logro, titulo, descripcion, atleta_fk
        FROM allevo.atleta_logros
        WHERE atleta_fk = $1
        ORDER BY fecha_logro DESC NULLS LAST
    `,

    // ---- ATLETA BLOQUES ----
    get_bloques_by_atleta: `
        SELECT id, atleta_id, tipo, contenido, orden, visible, create_by, created_at, updated_at
        FROM allevo.atleta_bloques
        WHERE atleta_id = $1
        ORDER BY orden ASC
    `,

    get_bloque_by_id: `
        SELECT id, atleta_id, tipo, contenido, orden, visible, create_by, created_at, updated_at
        FROM allevo.atleta_bloques
        WHERE id = $1
    `,

    create_bloque: `
        INSERT INTO allevo.atleta_bloques (atleta_id, tipo, contenido, orden, visible, create_by)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `,

    update_bloque: `
        UPDATE allevo.atleta_bloques SET
            tipo = $1,
            contenido = $2,
            orden = $3,
            visible = $4,
            updated_at = NOW()
        WHERE id = $5 RETURNING id
    `,

    delete_bloque: `DELETE FROM allevo.atleta_bloques WHERE id = $1`,

    // ---- PERFIL COMPLETO (atleta + logros + bloques) ----
    get_perfil_completo: `
        SELECT 
            a.id_atleta,
            a.usuario_id,
            a.deporte_principal_id,
            CONCAT(u.nombres, ' ', u.apellidos) AS nombre,
            a.alias,
            COALESCE(d.descripcion, d.nombre) AS disciplina,
            a.peso_kg,
            a.altura_cm,
            a.categoria_peso,
            a.ranking_nacional,
            a.ranking_mundial,
            a.victorias,
            a.derrotas,
            a.empates,
            a.nocauts,
            a.fecha_debut,
            a.mejor_posicion,
            a.patrocinadores_actuales,
            a.instagram_url,
            a.bibliografia,
            a.tiktok,
            a.portada,
            a.biografia,
            a.activo,
            d.nombre AS deporte_nombre,
            d.categoria AS deporte_categoria,
            u.email AS email,
            u.pais AS pais,
            u.ciudad AS ciudad
        FROM allevo.atletas a
        LEFT JOIN allevo.usuarios u ON a.usuario_id = u.id
        LEFT JOIN allevo.deportes d ON a.deporte_principal_id = d.id
        WHERE a.id_atleta = $1
    `,
};

export default queries;
