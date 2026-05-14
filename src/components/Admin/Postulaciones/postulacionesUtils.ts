import { personOutline, businessOutline, trendingUpOutline } from 'ionicons/icons'

export interface Postulacion {
  id: number
  nombre: string
  email?: string
  telefono?: string
  ciudad?: string
  departamento?: string
  tipo: 'atleta' | 'sponsor' | 'inversionista'
  estado: string
  created_at: string
  updated_at: string
  datos: Record<string, any>
  notas_admin?: string
}

export const labelTipo = (tipo: string): string => {
  const map: Record<string, string> = {
    atleta: 'Atleta',
    sponsor: 'Sponsor',
    inversionista: 'Inversionista'
  }
  return map[tipo] || tipo
}

export const labelEstado = (estado: string): string => {
  const map: Record<string, string> = {
    pendiente: 'Postulado',
    en_revision: 'En revisión',
    documentos: 'Documentos',
    entrevista: 'Entrevista',
    aprobado: 'Aprobado',
    rechazado: 'Rechazado'
  }
  return map[estado] || estado
}

export const colorEstado = (estado: string): string => {
  const map: Record<string, string> = {
    pendiente: '#F59E0B',
    en_revision: '#3B82F6',
    documentos: '#8B5CF6',
    entrevista: '#EC4899',
    aprobado: '#10B981',
    rechazado: '#EF4444'
  }
  return map[estado] || '#999'
}

export const avatarIcon = (tipo: string) => {
  if (tipo === 'atleta') return personOutline
  if (tipo === 'sponsor') return businessOutline
  return trendingUpOutline
}

export const nextEstados = (actual: string): string[] => {
  const flujo: Record<string, string[]> = {
    pendiente: ['en_revision', 'rechazado'],
    en_revision: ['documentos', 'entrevista', 'rechazado'],
    documentos: ['entrevista', 'rechazado'],
    entrevista: ['aprobado', 'rechazado'],
    aprobado: [],
    rechazado: ['pendiente']
  }
  return flujo[actual] || []
}

export const fechaRelativa = (fecha: string): string => {
  const diff = Date.now() - new Date(fecha).getTime()
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24))
  if (dias === 0) return 'Hoy'
  if (dias === 1) return 'Ayer'
  return `${dias}d`
}

export const formatFechaCorta = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-GT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

export const formatFecha = (fecha: string): string => {
  return new Date(fecha).toLocaleDateString('es-GT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export const formatoArray = (val: any): any => {
  if (Array.isArray(val)) return val.join(', ')
  return val
}

export const datoExtra = (p: Postulacion | null, key: string): any => {
  if (!p?.datos) return null
  return p.datos[key] ?? null
}

export const columnasKanban = [
  { estado: 'pendiente', titulo: 'Postulado', color: '#F59E0B' },
  { estado: 'en_revision', titulo: 'En revisión', color: '#3B82F6' },
  { estado: 'documentos', titulo: 'Documentos', color: '#8B5CF6' },
  { estado: 'entrevista', titulo: 'Entrevista', color: '#EC4899' },
  { estado: 'aprobado', titulo: 'Aprobado', color: '#10B981' },
  { estado: 'rechazado', titulo: 'Rechazado', color: '#EF4444' }
]

export const estadosDisponibles = ['pendiente', 'en_revision', 'documentos', 'entrevista', 'aprobado', 'rechazado']

export const tabsModal = [
  { id: 'resumen', label: 'Resumen', icon: personOutline },
  { id: 'datos', label: 'Datos JSON', icon: 'documentTextOutline' as any },
  { id: 'notas', label: 'Notas Admin', icon: 'chatbubbleOutline' as any },
  { id: 'acciones', label: 'Acciones', icon: 'flagOutline' as any }
]
