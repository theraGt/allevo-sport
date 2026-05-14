-- ============================================================
--  SCHEMA: postulantes
--  Proyecto: Allevo Sports
--  Descripción: Tabla para almacenar las postulaciones de
--               talentos deportivos que se registran desde
--               el modal AtletasModal.vue del frontend.
--  Motor: PostgreSQL 14+
-- ============================================================

-- Extensión recomendada para generación de UUIDs
-- (descomentar si prefieres UUID sobre SERIAL)
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enumeración de estados del pipeline de selección
CREATE TYPE postulante_estado AS ENUM (
    'pendiente',      -- Recién enviado, sin revisar
    'en_revision',    -- En proceso de evaluación
    'aprobado',       -- Aceptado como talento Allevo
    'rechazado'       -- No cumple perfil / descartado
);

-- Tabla principal de postulantes
CREATE TABLE IF NOT EXISTS postulantes (
    id                  SERIAL PRIMARY KEY,

    -- ─── Identidad ───
    nombre_completo     VARCHAR(255)        NOT NULL,
    dpi                 VARCHAR(13)         NOT NULL,
    alias_deportivo     VARCHAR(100),
    fecha_nacimiento    DATE                NOT NULL,
    foto_url            TEXT,               -- URL o path en S3/bucket

    -- ─── Perfil Deportivo ───
    deporte             VARCHAR(100)        NOT NULL,
    especialidad        VARCHAR(150)        NOT NULL,

    -- ─── Contacto ───
    telefono            VARCHAR(20)         NOT NULL,
    email               VARCHAR(255)        NOT NULL,
    ciudad              VARCHAR(100)        NOT NULL,
    departamento        VARCHAR(100)        NOT NULL,
    municipio           VARCHAR(100),

    -- ─── Gestión Interna ───
    estado              postulante_estado   NOT NULL DEFAULT 'pendiente',
    notas_admin         TEXT,               -- Comentarios internos del staff
    acepta_terminos     BOOLEAN             NOT NULL DEFAULT FALSE,

    -- ─── Metadata ───
    created_at          TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

-- Comentarios sobre columnas (documentación inline)
COMMENT ON TABLE postulantes IS 'Registro de postulaciones de talentos deportivos para el ecosistema Allevo';
COMMENT ON COLUMN postulantes.dpi IS 'Documento Personal de Identificación (Guatemala). Único por persona.';
COMMENT ON COLUMN postulantes.foto_url IS 'URL pública o path relativo a la imagen de perfil subida por el postulante';
COMMENT ON COLUMN postulantes.estado IS 'Pipeline de selección: pendiente → en_revision → aprobado / rechazado';
COMMENT ON COLUMN postulantes.notas_admin IS 'Campo libre para que el equipo administrativo agregue observaciones';

-- ============================================================
--  ÍNDICES
-- ============================================================

-- Búsquedas rápidas por DPI (evita duplicados implícitamente)
CREATE UNIQUE INDEX IF NOT EXISTS idx_postulantes_dpi
    ON postulantes (dpi);

-- Búsquedas por email (contacto)
CREATE UNIQUE INDEX IF NOT EXISTS idx_postulantes_email
    ON postulantes (email);

-- Filtrado por estado para el dashboard de administración
CREATE INDEX IF NOT EXISTS idx_postulantes_estado
    ON postulantes (estado);

-- Filtrado por deporte para categorización
CREATE INDEX IF NOT EXISTS idx_postulantes_deporte
    ON postulantes (deporte);

-- Búsqueda por nombre (para el buscador del admin)
CREATE INDEX IF NOT EXISTS idx_postulantes_nombre
    ON postulantes USING gin (nombre_completo gin_trgm_ops);

-- Ordenamiento por fecha de llegada
CREATE INDEX IF NOT EXISTS idx_postulantes_created_at
    ON postulantes (created_at DESC);

-- ============================================================
--  TRIGGER: updated_at automático
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_postulantes_updated_at
    BEFORE UPDATE ON postulantes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
--  VISTA: Postulantes Activos (dashboard admin)
-- ============================================================

SELECT
    id,
    nombre_completo,
    alias_deportivo,
    deporte,
    especialidad,
    ciudad,
    departamento,
    email,
    telefono,
    estado,
    created_at,
    EXTRACT(YEAR FROM AGE(NOW(), fecha_nacimiento))::INT AS edad_aprox
FROM postulantes
WHERE estado IN ('pendiente', 'en_revision')
ORDER BY created_at DESC;

-- ============================================================
--  DATOS DE EJEMPLO (opcional, eliminar en producción)
-- ============================================================

/*
INSERT INTO postulantes (
    nombre_completo, dpi, alias_deportivo, fecha_nacimiento,
    deporte, especialidad, telefono, email,
    ciudad, departamento, municipio, estado, acepta_terminos
) VALUES (
    'Carlos Alberto Mendez', '1234567890101', 'El Toro', '1998-04-15',
    'Muay Thai', 'Peso Welter', '+502 5555 1234', 'carlos.m@email.com',
    'Ciudad de Guatemala', 'Guatemala', 'Zona 1', 'pendiente', TRUE
);
*/
