<template>
  <div class="postulaciones-dashboard">
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
  peopleOutline, gridOutline, listOutline
} from 'ionicons/icons'
import { ref, computed, onMounted } from 'vue'

import KpiCards from './KpiCards.vue'
import FiltersBar from './FiltersBar.vue'
import VistaTabla from './VistaTabla.vue'
import VistaKanban from './VistaKanban.vue'
import ModalDetalle from './ModalDetalle.vue'
import { Postulacion } from './postulacionesUtils'

const API_BASE_URL = 'https://allevosports.thera.com.gt:81/api'

/* ─── Estado ─── */
const postulaciones = ref<Postulacion[]>([])
const cargando = ref(false)
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

/* ─── API ─── */
const cargarPostulaciones = async () => {
  cargando.value = true
  try {
    const res = await fetch(`${API_BASE_URL}/postulaciones`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token') || ''}` }
    })
    if (!res.ok) throw new Error('Error al cargar')
    postulaciones.value = await res.json()
  } catch (err) {
    console.error(err)
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
