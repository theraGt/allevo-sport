-- ============================================================
--  SCHEMA: postulaciones (genérica)
--  Proyecto: Allevo Sports
--  Descripción: Tabla única para almacenar postulaciones de
--               cualquier tipo: atletas, sponsors, inversionistas.
--               Los campos específicos de cada tipo van en JSONB.
--  Motor: PostgreSQL 14+
-- ============================================================

-- Enumeración de tipos de postulación
CREATE TYPE postulacion_tipo AS ENUM ('atleta', 'sponsor', 'inversionista');

-- Tabla principal de postulaciones
CREATE TABLE IF NOT EXISTS postulaciones (
    id                  SERIAL PRIMARY KEY,
    tipo                postulacion_tipo    NOT NULL,

    -- Campos comunes a todos los tipos
    nombre              VARCHAR(255)        NOT NULL,
    email               VARCHAR(255)        NOT NULL,
    telefono            VARCHAR(20),
    ciudad              VARCHAR(100),
    departamento        VARCHAR(100),
    municipio           VARCHAR(100),

    -- Estado del pipeline
    estado              VARCHAR(50)         NOT NULL DEFAULT 'pendiente',
    notas_admin         TEXT,

    -- Campos específicos en JSONB según el tipo
    -- atleta:    { dpi, alias_deportivo, fecha_nacimiento, foto_url, deporte, especialidad }
    -- sponsor:   { nombre_empresa, industria, sitio_web, presupuesto, tipo_apoyo, nit, ... }
    datos               JSONB               NOT NULL DEFAULT '{}',

    -- Metadata
    created_at          TIMESTAMPTZ         NOT NULL DEFAULT NOW(),
    updated_at          TIMESTAMPTZ         NOT NULL DEFAULT NOW()
);

-- Comentarios
COMMENT ON TABLE postulaciones IS 'Postulaciones genéricas: atletas, sponsors, inversionistas';
COMMENT ON COLUMN postulaciones.tipo IS 'Tipo de postulación: atleta, sponsor, inversionista';
COMMENT ON COLUMN postulaciones.datos IS 'Campos específicos del tipo de postulación en formato JSON';

-- ============================================================
--  ÍNDICES
-- ============================================================

CREATE UNIQUE INDEX IF NOT EXISTS idx_postulaciones_email_tipo
    ON postulaciones (email, tipo);

CREATE INDEX IF NOT EXISTS idx_postulaciones_tipo
    ON postulaciones (tipo);

CREATE INDEX IF NOT EXISTS idx_postulaciones_estado
    ON postulaciones (estado);

CREATE INDEX IF NOT EXISTS idx_postulaciones_created_at
    ON postulaciones (created_at DESC);

-- Búsqueda dentro del JSONB para filtros avanzados
CREATE INDEX IF NOT EXISTS idx_postulaciones_datos_gin
    ON postulaciones USING gin (datos);

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

CREATE TRIGGER trigger_postulaciones_updated_at
    BEFORE UPDATE ON postulaciones
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
--  VISTAS
-- ============================================================

CREATE OR REPLACE VIEW vw_postulaciones_pendientes AS
SELECT
    id,
    tipo,
    nombre,
    email,
    telefono,
    ciudad,
    departamento,
    estado,
    datos,
    created_at
FROM postulaciones
WHERE estado IN ('pendiente', 'en_revision')
ORDER BY created_at DESC;
