<template>
  <ion-page>
    <DashboardLayout>
      <div class="talent-panel">
        <div class="panel-header">
          <div class="panel-title">
            <span class="panel-icon">🏆</span>
            <h2>{{ panelTitle }}</h2>
          </div>
          <div class="panel-tabs">
            <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: activeTab === tab.id }"
              @click="switchTab(tab.id)">
              {{ tab.label }}
              <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
            </button>
          </div>
          <button class="btn-new" @click="nuevoAtleta">
            + Nuevo Perfil
          </button>
        </div>

        <TalentPanelPublicados v-if="activeTab === 'publicados'" :atletas="atletas" :loading="loading"
          @editar="editarAtleta" @ver="verAtleta" @toggle-visibility="toggleVisibilidad" @refresh="fetchAtletas" />

        <TalentPanelEditor v-if="activeTab === 'editor'" :atletas="atletas" :deportes="deportes"
          :selectedAtleta="atletaSeleccionado" :bloques="bloquesEditor" @save="guardarCambios" @cancel="cancelarEditor"
          @agregar-bloque="agregarBloque" @eliminar-bloque="eliminarBloque" @reordenar-bloques="reordenarBloques"
          @toggle-widget="toggleWidget" />

        <TalentPanelDashboard v-if="activeTab === 'dashboard'" :atletas="atletas" />

        <div v-if="loading && activeTab !== 'publicados'" class="loading-overlay">
          <div class="spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    </DashboardLayout>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, markRaw } from 'vue'
import { useRouter } from 'vue-router'
import { IonPage } from '@ionic/vue'
import DashboardLayout from '../../components/Admin/Dashboard/DashboardLayout.vue'
import TalentPanelPublicados from './TalentPanelPublicados.vue'
import TalentPanelEditor from './TalentPanelEditor.vue'
import TalentPanelDashboard from './TalentPanelDashboard.vue'
import type { Atleta, Deport, AtletaBloque } from '../../types/talent'

const router = useRouter()

const API_BASE = 'http://localhost:3005/api'

function getToken(): string {
  return localStorage.getItem('token') || localStorage.getItem('access_token') || ''
}

function getUsuarioActual(): string {
  try {
    const userStr = localStorage.getItem('user') || localStorage.getItem('usuario')
    if (userStr) {
      const user = JSON.parse(userStr)
      return user.nombre || user.email || 'admin'
    }
  } catch (e) {
    console.warn('No se pudo obtener usuario:', e)
  }
  return 'admin'
}

function getFechaGuatemala(): string {
  return new Date().toLocaleString('es-GT', {
    timeZone: 'America/Guatemala',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }).replace(',', '')
}

const tabs = [
  { id: 'publicados', label: 'Publicados' },
  { id: 'editor', label: 'Editor de Bloques' },
  { id: 'dashboard', label: 'Dashboard' }
]

const activeTab = ref<'publicados' | 'editor' | 'dashboard'>('publicados')
const loading = ref(false)
const error = ref('')

const atletas = reactive<Atleta[]>([])
const deportes = reactive<Deport[]>([])
const atletaSeleccionado = ref<Atleta | null>(null)
const bloquesEditor = reactive<AtletaBloque[]>([])
const widgetsEditor = reactive<Record<string, boolean>>({
  stats_card: true,
  logros_timeline: true,
  deporte_tag: true,
  financiamiento_bar: true
})

const panelTitle = computed(() => {
  if (activeTab.value === 'publicados') return 'TALENTOS PUBLICADOS'
  if (activeTab.value === 'editor') return 'EDITOR DE PERFIL'
  return 'DASHBOARD DE TALENTOS'
})

async function fetchAtletas() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE}/atletas`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) throw new Error('Error al cargar atletas')
    const data = await res.json()
    atletas.splice(0, atletas.length, ...data)
  } catch (e: any) {
    console.error('Error fetching atletas:', e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function fetchDeportes() {
  try {
    const res = await fetch(`${API_BASE}/deportes`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) return
    const data = await res.json()
    deportes.splice(0, deportes.length, ...data)
  } catch (e) {
    console.error('Error fetching deportes:', e)
  }
}

async function fetchBloques(atletaId: number) {
  try {
    const res = await fetch(`${API_BASE}/atletas/${atletaId}/bloques`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) return []
    return await res.json()
  } catch (e) {
    console.error('Error fetching bloques:', e)
    return []
  }
}

async function fetchLogros(atletaId: number) {
  try {
    const res = await fetch(`${API_BASE}/atleta-logros?atleta_id=${atletaId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) return []
    return await res.json()
  } catch (e) {
    console.error('Error fetching logros:', e)
    return []
  }
}

function switchTab(tab: string) {
  activeTab.value = tab as any
  if (tab === 'editor') {
    resetEditor()
  }
}

function resetEditor() {
  atletaSeleccionado.value = null
  bloquesEditor.splice(0, bloquesEditor.length)
  widgetsEditor.stats_card = true
  widgetsEditor.logros_timeline = true
  widgetsEditor.deporte_tag = true
  widgetsEditor.financiamiento_bar = true
}

async function nuevoAtleta() {
  atletaSeleccionado.value = null
  bloquesEditor.splice(0, bloquesEditor.length)
  bloquesEditor.push(
    { id: genId(), atleta_id: 0, tipo: 'subtitulo', contenido: { texto: '', nivel: 'h2' as const }, orden: 1, visible: true, create_by: getUsuarioActual(), created_at: '', updated_at: '' },
    { id: genId(), atleta_id: 0, tipo: 'parrafo', contenido: { texto: '' }, orden: 2, visible: true, create_by: getUsuarioActual(), created_at: '', updated_at: '' }
  )
  activeTab.value = 'editor'
}

async function editarAtleta(atleta: Atleta) {
  try {
    loading.value = true
    const [detalle, bloques, logros] = await Promise.all([
      fetch(`${API_BASE}/atletas/${atleta.id_atleta}`, {
        headers: { 'Authorization': `Bearer ${getToken()}` }
      }).then(r => r.json()),
      fetchBloques(atleta.id_atleta),
      fetchLogros(atleta.id_atleta)
    ])
    atletaSeleccionado.value = detalle
    bloquesEditor.splice(0, bloquesEditor.length, ...bloques)
    activeTab.value = 'editor'
  } catch (e) {
    console.error('Error cargando editor:', e)
  } finally {
    loading.value = false
  }
}

function verAtleta(atleta: Atleta) {
  router.push(`/talento/${atleta.id_atleta}`)
}

async function toggleVisibilidad(atleta: Atleta) {
  try {
    const nuevoEstado = !atleta.activo
    await fetch(`${API_BASE}/atletas/${atleta.id_atleta}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify({ activo: nuevoEstado, update_by: getUsuarioActual(), updated_at: getFechaGuatemala() })
    })
    atleta.activo = nuevoEstado
  } catch (e) {
    console.error('Error toggling visibilidad:', e)
  }
}

function genId(): string {
  return 'local_' + Math.random().toString(36).substring(2, 9)
}

function agregarBloque(tipo: string) {
  const baseOrden = bloquesEditor.length + 1
  let contenido: any = {}
  switch (tipo) {
    case 'subtitulo':
      contenido = { texto: '', nivel: 'h2' }
      break
    case 'parrafo':
      contenido = { texto: '' }
      break
    case 'imagen':
      contenido = { url: '', alt: '', caption: '' }
      break
    case 'cita':
      contenido = { texto: '', autor: '' }
      break
    case 'biografia':
      contenido = { texto: '', resumen_ia: '' }
      break
    case 'redes_sociales':
      contenido = { instagram: '', tiktok: '', alias: '' }
      break
    case 'patrocinadores':
      contenido = { lista: [] }
      break
    case 'galeria_media':
      contenido = { items: [] }
      break
    default:
      contenido = {}
  }
  bloquesEditor.push({
    id: genId(),
    atleta_id: atletaSeleccionado.value?.id_atleta || 0,
    tipo: tipo as any,
    contenido,
    orden: baseOrden,
    visible: true,
    create_by: getUsuarioActual(),
    created_at: '',
    updated_at: ''
  })
}

async function eliminarBloque(index: number) {
  const bloque = bloquesEditor[index]
  if (!bloque) return
  if (bloque.id && !bloque.id.startsWith('local_')) {
    try {
      await fetch(`${API_BASE}/atletas-bloques/${bloque.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${getToken()}` }
      })
    } catch (e) {
      console.error('Error eliminando bloque:', e)
    }
  }
  bloquesEditor.splice(index, 1)
  reindexarOrden()
}

function reordenarBloques(fromIndex: number, toIndex: number) {
  const item = bloquesEditor.splice(fromIndex, 1)[0]
  bloquesEditor.splice(toIndex, 0, item)
  reindexarOrden()
}

function reindexarOrden() {
  bloquesEditor.forEach((b, i) => (b.orden = i + 1))
}

function toggleWidget(widget: string) {
  if (widget in widgetsEditor) {
    (widgetsEditor as any)[widget] = !(widgetsEditor as any)[widget]
  }
}

async function guardarCambios() {
  if (!atletaSeleccionado.value) {
    alert('Selecciona un atleta primero')
    return
  }
  try {
    loading.value = true
    for (const bloque of bloquesEditor) {
      if (bloque.id.startsWith('local_')) {
        await fetch(`${API_BASE}/atletas/${atletaSeleccionado.value.id_atleta}/bloques`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            tipo: bloque.tipo,
            contenido: bloque.contenido,
            orden: bloque.orden,
            visible: bloque.visible,
            create_by: getUsuarioActual()
          })
        })
      } else {
        await fetch(`${API_BASE}/atletas-bloques/${bloque.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({
            tipo: bloque.tipo,
            contenido: bloque.contenido,
            orden: bloque.orden,
            visible: bloque.visible,
            update_by: getUsuarioActual(),
            updated_at: getFechaGuatemala()
          })
        })
      }
    }
    const bloquesReales = await fetchBloques(atletaSeleccionado.value.id_atleta)
    bloquesEditor.splice(0, bloquesEditor.length, ...bloquesReales)
    alert('Cambios guardados')
  } catch (e: any) {
    console.error('Error guardando:', e)
    alert('Error al guardar: ' + e.message)
  } finally {
    loading.value = false
  }
}

function cancelarEditor() {
  resetEditor()
  activeTab.value = 'publicados'
}

onMounted(() => {
  fetchAtletas()
  fetchDeportes()
})
</script>

<style scoped>
.talent-panel {
  color: #fff;
  font-family: var(--font-body, 'Roboto', sans-serif);
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-icon {
  font-size: 1.4rem;
}

.panel-title h2 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0;
}

.panel-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  background: rgba(255, 255, 255, 0.04);
  border-radius: 8px;
  padding: 4px;
}

.tab-btn {
  background: transparent;
  border: none;
  color: #888;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.tab-btn:hover {
  color: #fff;
}

.tab-btn.active {
  background: rgba(207, 46, 46, 0.15);
  color: var(--color-primary, #cf2e2e);
}

.tab-badge {
  background: var(--color-primary, #cf2e2e);
  color: #fff;
  font-size: 0.65rem;
  padding: 2px 6px;
  border-radius: 10px;
}

.btn-new {
  background: var(--color-primary, #cf2e2e);
  color: white;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  transition: all 0.25s;
}

.btn-new:hover {
  background: #b32424;
  transform: translateY(-1px);
}

.loading-overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  color: #555;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--color-primary, #cf2e2e);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-overlay p {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .panel-tabs {
    width: 100%;
    overflow-x: auto;
  }
}
</style>