<template>
  <div class="postulaciones-dashboard">
    <!-- Alerta de datos mock -->
    <div v-if="errorCarga" class="mock-alert">
      <ion-icon :icon="warningOutline"></ion-icon>
      <span>{{ errorCarga }}. Mostrando datos de demostración.</span>
    </div>

    <!-- Header / KPIs -->
    <div class="dashboard-header">
      <div class="header-title">
        <ion-icon :icon="peopleOutline"></ion-icon>
        <div>
          <h1>Postulaciones</h1>
          <p>Gestión de talentos, sponsors e inversionistas</p>
        </div>
      </div>

      <div class="view-toggle">
        <button
          class="toggle-btn"
          :class="{ active: vistaCards }"
          @click="vistaCards = true"
          title="Vista Kanban"
        >
          <ion-icon :icon="gridOutline"></ion-icon>
        </button>
        <button
          class="toggle-btn"
          :class="{ active: !vistaCards }"
          @click="vistaCards = false"
          title="Vista Tabla"
        >
          <ion-icon :icon="listOutline"></ion-icon>
        </button>
      </div>

      <KpiCards :stats="stats" />
    </div>

    <!-- Filtros -->
    <FiltersBar v-model="filtros" @limpiar="limpiarFiltros" />

    <!-- Vista Tabla -->
    <VistaTabla
      v-if="!vistaCards"
      :postulaciones="postulacionesFiltradas"
      v-model:busqueda="filtros.busqueda"
      @abrir-detalle="abrirDetalle"
      @cambiar-estado="cambiarEstado"
    />

    <!-- Vista Kanban -->
    <VistaKanban
      v-else
      :postulaciones="postulacionesFiltradas"
      @abrir-detalle="abrirDetalle"
      @cambiar-estado="cambiarEstado"
    />

    <!-- Modal Detalle CRM -->
    <ModalDetalle
      :is-open="showDetalle"
      :postulacion="postulacionActiva"
      @cerrar="cerrarDetalle"
      @cambiar-estado="cambiarEstado"
      @guardar-nota="guardarNota"
    />
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import {
  peopleOutline, gridOutline, listOutline, warningOutline
} from 'ionicons/icons'
import { ref, computed, onMounted } from 'vue'

import KpiCards from './KpiCards.vue'
import FiltersBar from './FiltersBar.vue'
import VistaTabla from './VistaTabla.vue'
import VistaKanban from './VistaKanban.vue'
import ModalDetalle from './ModalDetalle.vue'
import { Postulacion, formatFecha } from './postulacionesUtils'

const API_BASE_URL = 'https://allevosports.thera.com.gt:81/api'

/* ─── Estado ─── */
const postulaciones = ref<Postulacion[]>([])
const cargando = ref(false)
const errorCarga = ref<string | null>(null)
const showDetalle = ref(false)
const postulacionActiva = ref<Postulacion | null>(null)

const filtros = ref({
  busqueda: '',
  tipo: '',
  estado: ''
})

const vistaCards = ref(true)

/* ─── Computed ─── */
const postulacionesFiltradas = computed(() => {
  let resultado = postulaciones.value

  if (filtros.value.busqueda) {
    const q = filtros.value.busqueda.toLowerCase()
    resultado = resultado.filter(p =>
      p.nombre?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      JSON.stringify(p.datos).toLowerCase().includes(q)
    )
  }

  if (filtros.value.tipo) {
    resultado = resultado.filter(p => p.tipo === filtros.value.tipo)
  }

  if (filtros.value.estado) {
    resultado = resultado.filter(p => p.estado === filtros.value.estado)
  }

  return resultado
})

const stats = computed(() => {
  const total = postulaciones.value.length
  const atletas = postulaciones.value.filter(p => p.tipo === 'atleta').length
  const sponsors = postulaciones.value.filter(p => p.tipo === 'sponsor').length
  const inversionistas = postulaciones.value.filter(p => p.tipo === 'inversionista').length
  const pendientes = postulaciones.value.filter(p => p.estado === 'pendiente').length
  const aprobados = postulaciones.value.filter(p => p.estado === 'aprobado').length
  return { total, atletas, sponsors, inversionistas, pendientes, aprobados }
})

const POSTULACIONES_MOCK: Postulacion[] = [
  {
    id: 1,
    nombre: 'Carlos Mendoza',
    email: 'carlos.m@email.com',
    telefono: '+502 4123 4567',
    ciudad: 'Guatemala City',
    departamento: 'Guatemala',
    tipo: 'atleta',
    estado: 'pendiente',
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    datos: { deporte: 'Fútbol', posicion: 'Delantero', edad: 22, experiencia: '5 años' },
    notas_admin: ''
  },
  {
    id: 2,
    nombre: 'Ana Lucía Fernández',
    email: 'ana.lucia@corporativo.com',
    telefono: '+502 5890 1234',
    ciudad: 'Antigua Guatemala',
    departamento: 'Sacatepéquez',
    tipo: 'sponsor',
    estado: 'en_revision',
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
    datos: { empresa: 'Corporativo AL', industria: 'Bebidas deportivas', presupuesto: 'Q50,000 - Q100,000' },
    notas_admin: 'Revisar portafolio de marca'
  },
  {
    id: 3,
    nombre: 'Roberto Castellanos',
    email: 'roberto.c@inversiones.gt',
    telefono: '+502 3312 7890',
    ciudad: 'Quetzaltenango',
    departamento: 'Quetzaltenango',
    tipo: 'inversionista',
    estado: 'aprobado',
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    datos: { tipo_inversion: 'RWA Tokens', monto_interes: 'Q250,000', perfil_riesgo: 'Moderado' },
    notas_admin: 'Documentación completa'
  },
  {
    id: 4,
    nombre: 'María José Reyna',
    email: 'mj.reyna@email.com',
    telefono: '+502 5567 8901',
    ciudad: 'Escuintla',
    departamento: 'Escuintla',
    tipo: 'atleta',
    estado: 'documentos',
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    datos: { deporte: 'Atletismo', prueba: '100m planos', edad: 19, marca_personal: '11.2s' },
    notas_admin: 'Pendiente carta médica'
  },
  {
    id: 5,
    nombre: 'Grupo Impulsora S.A.',
    email: 'contacto@impulsora.gt',
    telefono: '+502 2222 3333',
    ciudad: 'Guatemala City',
    departamento: 'Guatemala',
    tipo: 'sponsor',
    estado: 'rechazado',
    created_at: new Date(Date.now() - 86400000 * 20).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 4).toISOString(),
    datos: { empresa: 'Grupo Impulsora', industria: 'Construcción', presupuesto: 'Q20,000' },
    notas_admin: 'Presupuesto insuficiente para requisitos mínimos'
  },
  {
    id: 6,
    nombre: 'Luis Fernando Paz',
    email: 'lf.paz@capital.gt',
    telefono: '+502 4455 6677',
    ciudad: 'Cobán',
    departamento: 'Alta Verapaz',
    tipo: 'inversionista',
    estado: 'entrevista',
    created_at: new Date(Date.now() - 86400000 * 10).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    datos: { tipo_inversion: 'Proyectos', monto_interes: 'Q500,000', perfil_riesgo: 'Alto' },
    notas_admin: 'Entrevista programada para el viernes'
  },
  {
    id: 7,
    nombre: 'Daniela Hernández',
    email: 'dani.h@email.com',
    telefono: '+502 3344 5566',
    ciudad: 'Villa Nueva',
    departamento: 'Guatemala',
    tipo: 'atleta',
    estado: 'aprobado',
    created_at: new Date(Date.now() - 86400000 * 15).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 6).toISOString(),
    datos: { deporte: 'Natación', estilo: 'Libre', edad: 17, categoria: 'Juvenil' },
    notas_admin: 'Talento aprobado, en onboarding'
  },
  {
    id: 8,
    nombre: 'Pedro Antonio Ruiz',
    email: 'paruiz@patrocinio.com',
    telefono: '+502 7788 9900',
    ciudad: 'San Marcos',
    departamento: 'San Marcos',
    tipo: 'sponsor',
    estado: 'pendiente',
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date(Date.now() - 86400000).toISOString(),
    datos: { empresa: 'Patrocinios Ruiz', industria: 'Textiles deportivos', presupuesto: 'Q75,000' },
    notas_admin: ''
  }
]

/* ─── API ─── */
const cargarPostulaciones = async () => {
  cargando.value = true
  errorCarga.value = null
  try {
    const res = await fetch(`${API_BASE_URL}/postulaciones`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      throw new Error(body.message || `Error ${res.status}: ${res.statusText}`)
    }
    postulaciones.value = await res.json()
  } catch (err: any) {
    console.error('Error cargando postulaciones:', err)
    errorCarga.value = err.message || 'No se pudieron cargar las postulaciones'
    postulaciones.value = POSTULACIONES_MOCK
  } finally {
    cargando.value = false
  }
}

const cambiarEstado = async (id: number, nuevoEstado: string) => {
  try {
    const res = await fetch(`${API_BASE_URL}/postulaciones/${id}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({ estado: nuevoEstado })
    })
    if (!res.ok) throw new Error('Error al cambiar estado')
    await cargarPostulaciones()
    if (postulacionActiva.value?.id === id) {
      postulacionActiva.value.estado = nuevoEstado
    }
  } catch (err) {
    console.error(err)
    alert('Error al cambiar estado')
  }
}

const guardarNota = async (nota: string) => {
  if (!postulacionActiva.value || !nota.trim()) return
  try {
    const res = await fetch(`${API_BASE_URL}/postulaciones/${postulacionActiva.value.id}/estado`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      },
      body: JSON.stringify({
        estado: postulacionActiva.value.estado,
        notas_admin: nota.trim()
      })
    })
    if (!res.ok) throw new Error('Error')
    postulacionActiva.value.notas_admin = nota.trim()
    await cargarPostulaciones()
  } catch (err) {
    console.error(err)
    alert('Error al guardar nota')
  }
}

/* ─── Modal ─── */
const abrirDetalle = (p: Postulacion) => {
  postulacionActiva.value = p
  showDetalle.value = true
}

const cerrarDetalle = () => {
  showDetalle.value = false
  postulacionActiva.value = null
}

const limpiarFiltros = () => {
  filtros.value = { busqueda: '', tipo: '', estado: '' }
}

onMounted(cargarPostulaciones)
</script>

<style scoped>
.mock-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  margin-bottom: 16px;
  background: rgba(245, 158, 11, 0.1);
  border: 1px solid rgba(245, 158, 11, 0.3);
  border-radius: var(--border-radius);
  color: #fbbf24;
  font-family: var(--font-body);
  font-size: 0.85rem;
}

.mock-alert ion-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
}

.postulaciones-dashboard {
  padding: 24px;
  background: linear-gradient(180deg, #0a0a0a 0%, #111111 100%);
  min-height: 100vh;
}

/* ─── Header ─── */
.dashboard-header {
  margin-bottom: 24px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.header-title {
  display: flex;
  align-items: center;
  gap: 14px;
  flex: 1;
}

.view-toggle {
  display: flex;
  gap: 4px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 4px;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 36px;
  border: none;
  background: transparent;
  color: var(--color-text-muted);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.toggle-btn:hover {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.05);
}

.toggle-btn.active {
  background: var(--color-primary);
  color: #fff;
}

.toggle-btn ion-icon {
  font-size: 1.2rem;
}

.header-title ion-icon {
  font-size: 2rem;
  color: var(--color-primary);
}

.header-title h1 {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.header-title p {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  margin: 4px 0 0;
}

@media (max-width: 768px) {
  .postulaciones-dashboard {
    padding: 16px 12px;
  }
  .dashboard-header {
    flex-direction: column;
    gap: 12px;
  }
  .header-title {
    gap: 10px;
  }
  .header-title ion-icon {
    font-size: 1.6rem;
  }
  .header-title h1 {
    font-size: 1.15rem;
    letter-spacing: 0.5px;
  }
  .header-title p {
    font-size: 0.7rem;
  }
  .view-toggle {
    align-self: flex-end;
  }
}

@media (max-width: 480px) {
  .postulaciones-dashboard {
    padding: 12px 8px;
  }
  .header-title h1 {
    font-size: 1rem;
  }
  .header-title p {
    font-size: 0.65rem;
  }
}
</style>
