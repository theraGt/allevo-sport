export interface Atleta {
  id_atleta: number
  usuario_id: number | null
  deporte_principal_id: number | null
  nombre: string
  alias: string | null
  disciplina: string
  peso_kg: number | null
  altura_cm: number | null
  categoria_peso: string | null
  ranking_nacional: number | null
  ranking_mundial: number | null
  victorias: number
  derrotas: number
  empates: number
  nocauts: number
  fecha_debut: string | null
  mejor_posicion: string | null
  patrocinadores_actuales: string[] | null
  instagram_url: string | null
  bibliografia: string[] | null
  tiktok: string | null
  portada: string | null
  biografia: BiografiaContent | null
  activo: boolean
  fecha_nacimiento?: string | null
  pais?: string | null
  ciudad?: string | null
  email?: string | null
}

export interface Logro {
  id_logro: number
  fecha_logro: string | null
  titulo: string | null
  descripcion: string | null
  atleta_fk: number
}

export interface Deport {
  id: number
  nombre: string
  categoria: string | null
  descripcion: string | null
  activo: boolean
}

export type BloqueTipoEditable =
  | 'subtitulo'
  | 'parrafo'
  | 'imagen'
  | 'cita'
  | 'biografia'
  | 'redes_sociales'
  | 'patrocinadores'
  | 'galeria_media'

export type BloqueTipoWidget =
  | 'stats_card'
  | 'logros_timeline'
  | 'deporte_tag'
  | 'financiamiento_bar'

export type BloqueTipo = BloqueTipoEditable | BloqueTipoWidget

export interface AtletaBloque {
  id: string
  atleta_id: number
  tipo: BloqueTipo
  contenido: SubtuloContent | ParrafoContent | ImagenContent | CitaContent
           | BiografiaContent | RedesContent | PatrocinadoresContent | GaleriaContent
           | StatsCardContent | LogrosContent | DeportTagContent | FinanciamientoContent
  orden: number
  visible: boolean
  create_by: string
  created_at: string
  updated_at: string
}

export interface SubtuloContent {
  texto: string
  nivel: 'h2' | 'h3'
}

export interface ParrafoContent {
  texto: string
}

export interface ImagenContent {
  url: string
  alt: string
  caption: string
}

export interface CitaContent {
  texto: string
  autor: string
}

export interface BiografiaContent {
  texto: string
  resumen_ia: string
}

export interface RedesContent {
  instagram: string
  tiktok: string
  alias: string
}

export interface PatrocinadoresContent {
  lista: PatrocinadorItem[]
}

export interface PatrocinadorItem {
  nombre: string
  logo_url: string
  tipo: string
}

export interface GaleriaContent {
  items: GaleriaItem[]
}

export interface GaleriaItem {
  tipo: 'imagen' | 'video'
  url: string
  thumbnail?: string
  caption: string
}

export interface StatsCardContent {
  mostrar?: boolean
}

export interface LogrosContent {
  mostrar?: boolean
}

export interface DeportTagContent {
  mostrar?: boolean
}

export interface FinanciamientoContent {
  mostrar?: boolean
  meta?: number
}

export interface PerfilCompleto {
  atleta: Atleta
  logros: Logro[]
  bloques: AtletaBloque[]
}