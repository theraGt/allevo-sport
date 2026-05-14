<template>
  <div class="blogs-panel">
    <!-- Header del panel -->
    <div class="panel-header">
      <div class="panel-title">
        <span class="panel-icon">🤖</span>
        <h2>{{ panelTitle }}</h2>
      </div>
      <div class="panel-tabs">
        <button v-for="tab in tabs" :key="tab.id" class="tab-btn" :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)">
          {{ tab.label }}
          <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
        </button>
      </div>
      <button class="btn-config" v-if="activeTab === 'bandeja'" @click="showConfig = true">
        Configurar fuentes
      </button>
      <button class="btn-new" @click="nuevaNoticia">
        + Nueva Noticia
      </button>
    </div>

    <!-- ─── PANTALLA A: BANDEJA ─── -->
    <div v-if="activeTab === 'bandeja'" class="tab-content">
      <!-- KPIs de fuentes -->
      <div class="fuentes-grid">
        <div v-for="fuente in fuentesKPI" :key="fuente.nombre" class="fuente-card"
          :class="{ active: fuente.count > 0 }">
          <div class="fuente-name">{{ fuente.nombre }}</div>
          <div class="fuente-count">
            <span class="dot" :class="{ pulse: fuente.count > 0 }"></span>
            {{ fuente.count }} {{ fuente.count === 1 ? 'nueva' : 'nuevas' }}
          </div>
        </div>
      </div>

      <!-- Lista de pendientes -->
      <div class="section-title">──── Pendientes de revisión ────</div>

      <div class="bandeja-list">
        <div v-for="noticia in noticiasPendientes" :key="noticia.id" class="bandeja-item">
          <div class="item-main">
            <input type="checkbox" class="item-check" />
            <div class="item-info">
              <div class="item-title">{{ noticia.titulo }}</div>
              <div class="item-meta">
                <span class="badge-fuente" :class="noticia.red_social">{{ noticia.red_social }}</span>
                <span class="item-time">{{ timeAgo(noticia.created_at) }}</span>
              </div>
              <div class="item-ia-status">
                <IAStatus :estado="noticia.estado" />
              </div>
              <div v-if="noticia.comentario" class="item-comentario">
                💬 {{ noticia.comentario }}
              </div>
            </div>
          </div>
          <div class="item-actions">
            <button class="action-btn view" @click="verNoticia(noticia)">Ver</button>
            <button class="action-btn publish" @click="publicarDirecto(noticia)">Publicar directo</button>
            <button class="action-btn edit" @click="editarNoticia(noticia)">Editar</button>
            <button class="action-btn discard" @click="descartarNoticia(noticia)">Descartar</button>
          </div>
        </div>
      </div>

      <div v-if="noticiasPendientes.length === 0" class="empty-state">
        <div class="empty-icon">📭</div>
        <p>No hay noticias pendientes de revisión</p>
      </div>
    </div>

    <!-- ─── PANTALLA B: EDITOR ─── -->
    <div v-if="activeTab === 'editor'" class="tab-content">
      <div class="editor-layout">
        <!-- Columna izquierda: formulario -->
        <div class="editor-main">
          <div class="editor-fields">
            <div class="field-group">
              <label>Título</label>
              <input v-model="editorNoticia.titulo" type="text" placeholder="Título de la noticia" />
            </div>
            <div class="field-group">
              <label>Extracto</label>
              <textarea v-model="editorNoticia.extracto" rows="3" placeholder="Resumen generado por IA..."></textarea>
            </div>
          </div>

          <div class="bloques-section">
            <div class="section-title">─── Contenido (arrastra para reordenar) ───</div>

            <div class="bloques-list">
              <div v-for="(bloque, index) in editorBloques" :key="bloque.id" class="bloque-item" draggable="true"
                @dragstart="dragStart(index)" @dragover.prevent @drop="drop(index)">
                <div class="bloque-handle">▲▼</div>
                <div class="bloque-type" :class="bloque.tipo">{{ bloqueLabel(bloque.tipo) }}</div>
                <div class="bloque-content">
                  <input v-if="bloque.tipo === 'subtitulo'" v-model="bloque.contenido" type="text"
                    placeholder="Subtítulo..." />
                  <textarea v-else-if="bloque.tipo === 'parrafo'" v-model="bloque.contenido" rows="2"
                    placeholder="Párrafo..."></textarea>
                  <input v-else-if="bloque.tipo === 'imagen'" v-model="bloque.contenido" type="text"
                    placeholder="URL de imagen..." />
                  <textarea v-else-if="bloque.tipo === 'cita'" v-model="bloque.contenido" rows="2"
                    placeholder="Cita..."></textarea>
                </div>
                <button class="bloque-delete" draggable="false" @click.stop.prevent="eliminarBloque(index)">🗑️</button>
              </div>
            </div>

            <div class="bloque-actions">
              <button class="btn-add" @click="agregarBloque('imagen')">+ Añadir imagen</button>
              <button class="btn-add" @click="agregarBloque('subtitulo')">+ Añadir subtítulo</button>
              <button class="btn-add" @click="agregarBloque('parrafo')">+ Añadir párrafo</button>
              <button class="btn-add" @click="agregarBloque('cita')">+ Añadir cita</button>
            </div>
          </div>

          <div class="metadata-section">
            <div class="section-title">─── Metadata ───</div>
            <div class="metadata-grid">
              <div class="field-group">
                <label>Categoría</label>
                <select v-model="editorNoticia.categoria">
                  <option value="Talento">Talento</option>
                  <option value="Proyecto">Proyecto</option>
                </select>
              </div>
              <div class="field-group">
                <label>Referencia</label>
                <select v-model="editorNoticia.id_referencia">
                  <option :value="null">Ninguna</option>
                  <option value="ref-001">Camilo Pinzón</option>
                  <option value="ref-002">Katherine Portt</option>
                  <option value="ref-003">Smoker's Gym</option>
                </select>
              </div>
              <div class="field-group">
                <label>Fuente</label>
                <select v-model="editorNoticia.red_social">
                  <option value="instagram">Instagram</option>
                  <option value="tiktok">TikTok</option>
                  <option value="youtube">YouTube</option>
                  <option value="web">Web RSS</option>
                  <option value="manual">Manual</option>
                </select>
              </div>
              <div class="field-group full">
                <label>Link original</label>
                <input v-model="editorNoticia.link_original" type="text" placeholder="https://..." />
              </div>
              <div class="field-group full">
                <label>Portada (URL)</label>
                <input v-model="editorNoticia.portada_url" type="text" placeholder="https://..." />
              </div>
              <div class="field-group">
                <label>Estatus</label>
                <select v-model="editorNoticia.estatus">
                  <option value="pendiente">Pendiente</option>
                  <option value="borrador">Borrador</option>
                  <option value="publicado">Publicado</option>
                  <option value="archivado">Archivado</option>
                </select>
              </div>
              <div class="field-group full">
                <label>Comentario</label>
                <textarea v-model="editorNoticia.comentario" rows="2" placeholder="Agregar un comentario..."></textarea>
              </div>
            </div>
          </div>

          <div class="editor-footer">
            <button class="btn-preview" @click="vistaPrevia = true">Vista previa</button>
            <button class="btn-draft" @click="guardarBorrador">Guardar borrador</button>
            <button class="btn-publish" @click="publicarNoticia">Publicar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── PANTALLA C: PUBLICADOS ─── -->
    <div v-if="activeTab === 'publicados'" class="tab-content">
      <div class="publicados-toolbar">
        <div class="filter-group">
          <select v-model="filtroCategoria">
            <option value="">Todas las categorías</option>
            <option value="Talento">Talento</option>
            <option value="Proyecto">Proyecto</option>
          </select>
        </div>
        <div class="search-group">
          <input v-model="busqueda" type="text" placeholder="Buscar noticia..." />
        </div>
      </div>

      <div class="publicados-grid">
        <div v-for="noticia in noticiasPublicadasFiltradas" :key="noticia.id" class="publicado-card">
          <div class="card-portada">
            <img :src="noticia.portada_url || '/assets/images/placeholder-news.webp'" :alt="noticia.titulo" />
            <span class="card-cat">{{ noticia.categoria }}</span>
          </div>
          <div class="card-body">
            <h4>{{ noticia.titulo }}</h4>
            <div class="card-time">{{ timeAgo(noticia.created_at) }}</div>
            <div class="card-metrics">
              <span>👁 0</span>
              <span>❤️ 0</span>
            </div>
            <div class="card-actions">
              <button class="action-btn edit" @click="editarNoticia(noticia)">Editar</button>
              <button class="action-btn preview" @click="verVistaPrevia(noticia)">Vista previa</button>
              <button class="action-btn unpublish" @click="despublicar(noticia)">Despublicar</button>
            </div>
          </div>
        </div>
      </div>

      <div v-if="noticiasPublicadasFiltradas.length === 0" class="empty-state">
        <div class="empty-icon">📰</div>
        <p>No hay noticias publicadas</p>
      </div>
    </div>

    <!-- Modal vista previa -->
    <div v-if="vistaPrevia" class="modal-overlay" @click.self="vistaPrevia = false">
      <div class="modal-content preview-modal">
        <button class="modal-close" @click="vistaPrevia = false">✕</button>
        <h3>{{ editorNoticia.titulo }}</h3>
        <div v-if="editorNoticia.portada_url" class="preview-portada">
          <img :src="editorNoticia.portada_url" :alt="editorNoticia.titulo" />
        </div>
        <p class="preview-extracto">{{ editorNoticia.extracto }}</p>
        <a v-if="editorNoticia.link_original" :href="editorNoticia.link_original" target="_blank" class="preview-link">
          Ver fuente original ↗
        </a>
        <div class="preview-body">
          <div v-for="bloque in editorBloques" :key="bloque.id" :class="'preview-' + bloque.tipo">
            <h4 v-if="bloque.tipo === 'subtitulo'">{{ bloque.contenido }}</h4>
            <p v-else-if="bloque.tipo === 'parrafo'">{{ bloque.contenido }}</p>
            <img v-else-if="bloque.tipo === 'imagen'" :src="bloque.contenido" alt="" />
            <blockquote v-else-if="bloque.tipo === 'cita'">{{ bloque.contenido }}</blockquote>
          </div>
        </div>
        <div class="preview-comentario">
          <label>Comentario</label>
          <textarea v-model="editorNoticia.comentario" rows="2" placeholder="Agregar un comentario..."></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

// ─── API Config ─────────────────────────────────────────────────
const API_BASE = 'https://allevosports.thera.com.gt:81/api'

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

// ─── Types ─────────────────────────────────────────────────────
interface Noticia {
  id: string
  titulo: string
  extracto: string
  categoria: 'Talento' | 'Proyecto'
  red_social: 'instagram' | 'tiktok' | 'youtube' | 'web' | 'manual'
  link_original: string
  portada_url: string
  id_referencia: string | null
  estado: 'pendiente' | 'procesando' | 'listo' | 'publicado' | 'descartado'
  estatus: 'pendiente' | 'borrador' | 'publicado' | 'archivado'
  comentario: string
  created_at: string
}

interface NoticiaCuerpo {
  id: string
  noticia_id: string
  tipo: 'subtitulo' | 'parrafo' | 'imagen' | 'cita'
  contenido: string
  orden: number
}

// ─── Data (se carga desde API) ─────────────────────────────────
const noticias = reactive<Noticia[]>([])
const cuerpoMap = reactive<Record<string, NoticiaCuerpo[]>>({})

// ─── State ─────────────────────────────────────────────────────
const route = useRoute()
const router = useRouter()

const tabs = [
  { id: 'bandeja', label: 'Bandeja de Entrada' },
  { id: 'editor', label: 'Editor de Bloques' },
  { id: 'publicados', label: 'Publicados' }
]

const activeTab = ref<'bandeja' | 'editor' | 'publicados'>('bandeja')
const showConfig = ref(false)
const vistaPrevia = ref(false)
const filtroCategoria = ref('')
const busqueda = ref('')
const loading = ref(false)
const error = ref('')

// ─── API Functions ─────────────────────────────────────────────
async function fetchNoticias() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE}/noticias`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) throw new Error('Error al cargar noticias')
    const data = await res.json()
    noticias.splice(0, noticias.length, ...data.map((n: any) => ({
      ...n,
      estado: n.comentario || 'pendiente',
      comentario: n.comentario || ''
    })))
    for (const n of data) {
      const cuerpo = await fetchCuerpo(n.id)
      if (cuerpo.length > 0) {
        cuerpoMap[n.id] = cuerpo
      }
    }
  } catch (e: any) {
    console.error('Error fetching noticias:', e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

async function fetchCuerpo(noticiaId: string) {
  try {
    const res = await fetch(`${API_BASE}/noticia-cuerpo?noticia_id=${noticiaId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) return []
    return await res.json()
  } catch (e) {
    console.error('Error fetching cuerpo:', e)
    return []
  }
}

async function createNoticia(noticia: Partial<Noticia>) {
  const res = await fetch(`${API_BASE}/noticias`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      titulo: noticia.titulo,
      extracto: noticia.extracto,
      categoria: noticia.categoria,
      red_social: noticia.red_social,
      link_original: noticia.link_original,
      portada_url: noticia.portada_url,
      id_referencia: noticia.id_referencia,
      create_by: getUsuarioActual(),
      comentario: noticia.comentario || '',
      estatus: noticia.estatus || 'pendiente'
    })
  })
  if (!res.ok) throw new Error('Error al crear noticia')
  return await res.json()
}

async function updateNoticia(id: string, noticia: Partial<Noticia>) {
  const res = await fetch(`${API_BASE}/noticias/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      titulo: noticia.titulo,
      extracto: noticia.extracto,
      categoria: noticia.categoria,
      red_social: noticia.red_social,
      link_original: noticia.link_original,
      portada_url: noticia.portada_url,
      id_referencia: noticia.id_referencia,
      update_by: getUsuarioActual(),
      comentario: noticia.comentario || '',
      updated_at: getFechaGuatemala(),
      estatus: noticia.estatus || 'pendiente'
    })
  })
  if (!res.ok) throw new Error('Error al actualizar noticia')
  return await res.json()
}

async function deleteNoticia(id: string) {
  const res = await fetch(`${API_BASE}/noticias/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  if (!res.ok) throw new Error('Error al eliminar noticia')
}

async function createCuerpoBloque(bloque: any) {
  const res = await fetch(`${API_BASE}/noticia-cuerpo`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify(bloque)
  })
  if (!res.ok) throw new Error('Error al crear bloque')
  return await res.json()
}

async function deleteCuerpoBloque(id: string) {
  const res = await fetch(`${API_BASE}/noticia-cuerpo/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  })
  if (!res.ok) {
    const err = new Error(`Error al eliminar bloque`)
    ;(err as any).status = res.status
    throw err
  }
}

async function updateCuerpoBloque(id: string, bloque: any) {
  const res = await fetch(`${API_BASE}/noticia-cuerpo/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`
    },
    body: JSON.stringify({
      tipo: bloque.tipo,
      contenido: bloque.contenido,
      orden: bloque.orden
    })
  })
  if (!res.ok) throw new Error('Error al actualizar bloque')
  return await res.json()
}

// ─── Lifecycle ─────────────────────────────────────────────────
onMounted(() => {
  fetchNoticias()
})

const editorNoticia = reactive<Partial<Noticia>>({
  id: '',
  titulo: '',
  extracto: '',
  categoria: '',
  red_social: '',
  link_original: '',
  portada_url: '',
  id_referencia: null,
  estado: '',
  estatus: 'pendiente',
  comentario: ''
})

const editorBloques = reactive<NoticiaCuerpo[]>([])
let dragIndex = -1

// ─── Computeds ─────────────────────────────────────────────────
const panelTitle = computed(() => {
  if (activeTab.value === 'bandeja') return 'BANDEJA DEL BOT'
  if (activeTab.value === 'editor') return 'EDITOR RÁPIDO'
  return 'NOTICIAS PUBLICADAS'
})

const noticiasPendientes = computed(() =>
  noticias.filter(n => n.estado !== 'publicado' && n.estatus !== 'publicado')
)

const noticiasPublicadas = computed(() =>
  noticias.filter(n => n.estado === 'publicado')
)

const noticiasPublicadasFiltradas = computed(() => {
  let result = noticiasPublicadas.value
  if (filtroCategoria.value) {
    result = result.filter(n => n.categoria === filtroCategoria.value)
  }
  if (busqueda.value.trim()) {
    const q = busqueda.value.toLowerCase()
    result = result.filter(n => n.titulo.toLowerCase().includes(q))
  }
  return result
})

const fuentesKPI = computed(() => {
  const fuentes = ['instagram', 'tiktok', 'youtube', 'web', 'manual']
  return fuentes.map(f => ({
    nombre: f.charAt(0).toUpperCase() + f.slice(1),
    count: noticias.filter(n => n.red_social === f && ['pendiente', 'procesando', 'listo'].includes(n.estado)).length
  }))
})

// ─── Helpers ───────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (seconds < 60) return 'hace un momento'
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `hace ${minutes}m`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `hace ${hours}h`
  const days = Math.floor(hours / 24)
  return `hace ${days}d`
}

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k'
  return String(n)
}

function bloqueLabel(tipo: string): string {
  const labels: Record<string, string> = { subtitulo: 'H2', parrafo: 'P', imagen: 'IMG', cita: 'CITA' }
  return labels[tipo] || tipo
}

function switchTab(tab: string) {
  activeTab.value = tab as any
  if (tab === 'editor') {
    resetEditor()
  }
}

function resetEditor() {
  editorNoticia.id = ''
  editorNoticia.titulo = ''
  editorNoticia.extracto = ''
  editorNoticia.categoria = ''
  editorNoticia.red_social = ''
  editorNoticia.link_original = ''
  editorNoticia.portada_url = ''
  editorNoticia.id_referencia = null
  editorNoticia.estado = ''
  editorNoticia.estatus = 'pendiente'
  editorNoticia.comentario = ''
  editorBloques.splice(0, editorBloques.length)
  editorBloques.push(
    { id: genId(), noticia_id: '', tipo: 'subtitulo', contenido: '', orden: 1 },
    { id: genId(), noticia_id: '', tipo: 'parrafo', contenido: '', orden: 2 }
  )
}

function genId(): string {
  return 'local_' + Math.random().toString(36).substring(2, 9)
}

// ─── Acciones Bandeja ──────────────────────────────────────────
function verNoticia(n: Noticia) {
  cargarEnEditor(n)
  activeTab.value = 'editor'
}

function editarNoticia(n: Noticia) {
  cargarEnEditor(n)
  activeTab.value = 'editor'
}

function verVistaPrevia(n: Noticia) {
  cargarEnEditor(n)
  vistaPrevia.value = true
}

function nuevaNoticia() {
  resetEditor()
  activeTab.value = 'editor'
}

function cargarEnEditor(n: Noticia) {
  Object.assign(editorNoticia, n, { comentario: n.comentario || '' })
  const bloques = cuerpoMap[n.id] || []
  editorBloques.splice(0, editorBloques.length, ...bloques.map(b => ({ ...b })))
}

async function publicarDirecto(n: Noticia) {
  try {
    await updateNoticia(n.id, { ...n, comentario: 'publicado directo' })
    n.estado = 'publicado'
    activeTab.value = 'publicados'
  } catch (e: any) {
    console.error('Error:', e)
    n.estado = 'publicado'
    activeTab.value = 'publicados'
  }
}

async function descartarNoticia(n: Noticia) {
  try {
    await updateNoticia(n.id, { ...n, comentario: 'descartado' })
    n.estado = 'descartado'
  } catch (e: any) {
    console.error('Error:', e)
    n.estado = 'descartado'
  }
}

// ─── Acciones Editor ───────────────────────────────────────────
function agregarBloque(tipo: NoticiaCuerpo['tipo']) {
  editorBloques.push({
    id: genId(),
    noticia_id: editorNoticia.id || '',
    tipo,
    contenido: '',
    orden: editorBloques.length + 1
  })
}

async function eliminarBloque(index: number) {
  const bloque = editorBloques[index]
  console.log('Eliminando bloque', index, bloque?.tipo, bloque?.id)
  if (!bloque) return
  if (bloque.id && !bloque.id.startsWith('local_')) {
    try {
      await deleteCuerpoBloque(bloque.id)
    } catch (e: any) {
      if (e.status === 404) {
        console.warn('Bloque ya no existe en el servidor, eliminando de la UI')
      } else {
        console.error('Error eliminando bloque:', e)
        alert('Error al eliminar bloque: ' + e.message)
        return
      }
    }
  }
  editorBloques.splice(index, 1)
  // Reordenar
  editorBloques.forEach((b, i) => (b.orden = i + 1))
}

function dragStart(index: number) {
  dragIndex = index
}

function drop(index: number) {
  if (dragIndex === -1 || dragIndex === index) return
  const item = editorBloques.splice(dragIndex, 1)[0]
  editorBloques.splice(index, 0, item)
  editorBloques.forEach((b, i) => (b.orden = i + 1))
  dragIndex = -1
}

async function guardarBorrador() {
  if (!editorNoticia.titulo) {
    alert('El título es obligatorio')
    return
  }
  const isNew = !editorNoticia.id
  try {
    if (isNew) {
      const result = await createNoticia({ ...editorNoticia, estatus: 'borrador' })
      const newId = String(result.id)
      for (const bloque of editorBloques) {
        await createCuerpoBloque({ ...bloque, noticia_id: newId })
      }
      // Recargar bloques reales del servidor para evitar duplicados
      const bloquesReales = await fetchCuerpo(newId)
      editorBloques.splice(0, editorBloques.length, ...bloquesReales)
      cuerpoMap[newId] = bloquesReales.map(b => ({ ...b, noticia_id: newId }))

      const nueva: Noticia = {
        ...(editorNoticia as Noticia),
        id: newId,
        estado: 'pendiente',
        estatus: 'borrador',
        created_at: new Date().toISOString()
      }
      noticias.push(nueva)
      editorNoticia.id = newId
    } else {
      await updateNoticia(editorNoticia.id!, { ...editorNoticia, estatus: 'borrador' })
      for (const bloque of editorBloques) {
        if (bloque.id && !bloque.id.startsWith('local_')) {
          await updateCuerpoBloque(bloque.id, bloque)
        }
      }
      for (const bloque of editorBloques) {
        if (!bloque.id || bloque.id.startsWith('local_')) {
          await createCuerpoBloque({ ...bloque, noticia_id: editorNoticia.id })
        }
      }
      // Recargar bloques reales del servidor para evitar duplicados
      const bloquesReales = await fetchCuerpo(editorNoticia.id!)
      editorBloques.splice(0, editorBloques.length, ...bloquesReales)
      cuerpoMap[editorNoticia.id!] = bloquesReales.map(b => ({ ...b, noticia_id: editorNoticia.id! }))

      const idx = noticias.findIndex(n => n.id === editorNoticia.id)
      if (idx !== -1) {
        Object.assign(noticias[idx], editorNoticia)
        Object.assign(noticias[idx], { estatus: 'borrador' })
      }
    }
    alert('Borrador guardado')
  } catch (e: any) {
    console.error('Error guardando:', e)
    alert('Error al guardar: ' + e.message)
  }
}

async function publicarNoticia() {
  if (!editorNoticia.titulo) {
    alert('El título es obligatorio')
    return
  }
  const isNew = !editorNoticia.id
  try {
    if (isNew) {
      const result = await createNoticia({ ...editorNoticia, comentario: 'publicado', estatus: 'publicado' })
      const newId = String(result.id)
      for (const bloque of editorBloques) {
        await createCuerpoBloque({ ...bloque, noticia_id: newId })
      }
      // Recargar bloques reales del servidor para evitar duplicados
      const bloquesReales = await fetchCuerpo(newId)
      editorBloques.splice(0, editorBloques.length, ...bloquesReales)
      cuerpoMap[newId] = bloquesReales.map(b => ({ ...b, noticia_id: newId }))

      const nueva: Noticia = {
        ...(editorNoticia as Noticia),
        id: newId,
        estado: 'publicado',
        estatus: 'publicado',
        created_at: new Date().toISOString()
      }
      noticias.push(nueva)
      editorNoticia.id = newId
    } else {
      await updateNoticia(editorNoticia.id!, { ...editorNoticia, comentario: 'publicado', estatus: 'publicado' })
      for (const bloque of editorBloques) {
        if (bloque.id && !bloque.id.startsWith('local_')) {
          await updateCuerpoBloque(bloque.id, bloque)
        }
      }
      for (const bloque of editorBloques) {
        if (!bloque.id || bloque.id.startsWith('local_')) {
          await createCuerpoBloque({ ...bloque, noticia_id: editorNoticia.id })
        }
      }
      // Recargar bloques reales del servidor para evitar duplicados
      const bloquesReales = await fetchCuerpo(editorNoticia.id!)
      editorBloques.splice(0, editorBloques.length, ...bloquesReales)
      cuerpoMap[editorNoticia.id!] = bloquesReales.map(b => ({ ...b, noticia_id: editorNoticia.id! }))

      const idx = noticias.findIndex(n => n.id === editorNoticia.id)
      if (idx !== -1) {
        noticias[idx].estado = 'publicado'
        Object.assign(noticias[idx], editorNoticia)
      }
    }
    activeTab.value = 'publicados'
    await fetchNoticias()
  } catch (e: any) {
    console.error('Error publicando:', e)
    alert('Error al publicar: ' + e.message)
  }
}

// ─── Acciones Publicados ───────────────────────────────────────
async function despublicar(n: Noticia) {
  try {
    await updateNoticia(n.id, { ...n, comentario: 'despublicado' })
    n.estado = 'pendiente'
  } catch (e: any) {
    console.error('Error:', e)
    n.estado = 'pendiente'
  }
}

// ─── Componente interno: IAStatus ──────────────────────────────
const IAStatus = {
  props: ['estado'],
  setup(props: { estado: string }) {
    const map: Record<string, string> = {
      pendiente: '⚠️ Falta portada',
      procesando: '⏳ Procesando...',
      listo: '✅ Listo | 🔴 Requiere aprobación (evento)',
      publicado: '✅ Publicado',
      descartado: '❌ Descartado'
    }
    return () => map[props.estado] || props.estado
  }
}
</script>

<style scoped>
/* ─── Base ──────────────────────────────────────────────────── */
.blogs-panel {
  color: #fff;
  font-family: var(--font-body, 'Roboto', sans-serif);
}

/* ─── Header ────────────────────────────────────────────────── */
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

.btn-config {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-config:hover {
  border-color: var(--color-primary, #cf2e2e);
  color: var(--color-primary, #cf2e2e);
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

/* ─── Tab Content ───────────────────────────────────────────── */
.tab-content {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #555;
  margin: 24px 0 16px;
}

/* ─── Fuentes KPI ───────────────────────────────────────────── */
.fuentes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 8px;
}

.fuente-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 16px;
  transition: all 0.25s;
}

.fuente-card.active {
  border-color: rgba(207, 46, 46, 0.3);
  background: rgba(207, 46, 46, 0.05);
}

.fuente-name {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #888;
  margin-bottom: 8px;
}

.fuente-count {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #444;
}

.dot.pulse {
  background: var(--color-primary, #cf2e2e);
  animation: dotPulse 2s infinite;
}

@keyframes dotPulse {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(207, 46, 46, 0.4);
  }

  50% {
    box-shadow: 0 0 0 6px transparent;
  }
}

/* ─── Bandeja List ──────────────────────────────────────────── */
.bandeja-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.bandeja-item {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 10px;
  padding: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  transition: all 0.25s;
}

.bandeja-item:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.item-main {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
}

.item-check {
  margin-top: 4px;
  accent-color: var(--color-primary, #cf2e2e);
}

.item-info {
  flex: 1;
}

.item-title {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 6px;
}

.item-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 6px;
}

.badge-fuente {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  color: #aaa;
}

.badge-fuente.instagram {
  background: rgba(225, 48, 108, 0.15);
  color: #e1306c;
}

.badge-fuente.tiktok {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.badge-fuente.youtube {
  background: rgba(255, 0, 0, 0.15);
  color: #ff4444;
}

.badge-fuente.web {
  background: rgba(0, 224, 144, 0.12);
  color: #00e090;
}

.badge-fuente.manual {
  background: rgba(255, 165, 0, 0.12);
  color: #ffa500;
}

.item-time {
  font-size: 0.75rem;
  color: #555;
}

.item-ia-status {
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.5);
}

.item-comentario {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 6px;
  font-style: italic;
}

.item-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex-shrink: 0;
}

.action-btn {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 6px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  border-color: var(--color-primary, #cf2e2e);
  color: var(--color-primary, #cf2e2e);
}

.action-btn.publish {
  background: rgba(207, 46, 46, 0.1);
  border-color: rgba(207, 46, 46, 0.3);
  color: var(--color-primary, #cf2e2e);
}

.action-btn.publish:hover {
  background: rgba(207, 46, 46, 0.2);
}

.action-btn.discard:hover {
  border-color: #555;
  color: #888;
}

/* ─── Editor ────────────────────────────────────────────────── */
.editor-layout {
  max-width: 900px;
}

.editor-fields {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-group label {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #888;
}

.field-group input,
.field-group textarea,
.field-group select {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: 0.9rem;
  outline: none;
  transition: all 0.25s;
}

.field-group input:focus,
.field-group textarea:focus,
.field-group select:focus {
  border-color: var(--color-primary, #cf2e2e);
  background: rgba(255, 255, 255, 0.06);
}

.field-group textarea {
  resize: vertical;
  min-height: 60px;
}

.field-group select option {
  background: #111;
  color: #fff;
}

/* ─── Bloques ───────────────────────────────────────────────── */
.bloques-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.bloque-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 10px 12px;
  cursor: grab;
  transition: all 0.2s;
}

.bloque-item:active {
  cursor: grabbing;
}

.bloque-item:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.bloque-handle {
  font-size: 0.7rem;
  color: #444;
  user-select: none;
  cursor: grab;
}

.bloque-type {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.65rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
  color: #aaa;
  flex-shrink: 0;
}

.bloque-type.subtitulo {
  background: rgba(207, 46, 46, 0.15);
  color: var(--color-primary, #cf2e2e);
}

.bloque-type.parrafo {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
}

.bloque-type.imagen {
  background: rgba(59, 130, 246, 0.12);
  color: #60a5fa;
}

.bloque-type.cita {
  background: rgba(255, 165, 0, 0.1);
  color: #fbbf24;
}

.bloque-content {
  flex: 1;
  min-width: 0;
}

.bloque-content input,
.bloque-content textarea {
  width: 100%;
  background: transparent;
  border: none;
  color: #fff;
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: 0.88rem;
  outline: none;
  padding: 4px 0;
}

.bloque-content textarea {
  resize: vertical;
  min-height: 40px;
}

.bloque-delete {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.4;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.bloque-delete:hover {
  opacity: 1;
}

.bloque-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.btn-add {
  background: rgba(255, 255, 255, 0.04);
  border: 1px dashed rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-add:hover {
  border-color: var(--color-primary, #cf2e2e);
  color: var(--color-primary, #cf2e2e);
  background: rgba(207, 46, 46, 0.05);
}

/* ─── Metadata ──────────────────────────────────────────────── */
.metadata-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.metadata-grid .field-group.full {
  grid-column: 1 / -1;
}

/* ─── Editor Footer ─────────────────────────────────────────── */
.editor-footer {
  display: flex;
  gap: 10px;
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  flex-wrap: wrap;
}

.btn-preview {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-preview:hover {
  background: rgba(255, 255, 255, 0.08);
}

.btn-draft {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-draft:hover {
  border-color: #888;
  color: #fff;
}

.btn-publish {
  background: var(--color-primary, #cf2e2e);
  border: none;
  color: #fff;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 10px 24px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-publish:hover {
  background: #b91c1c;
  box-shadow: 0 0 24px rgba(207, 46, 46, 0.35);
}

/* ─── Publicados Toolbar ────────────────────────────────────── */
.publicados-toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.publicados-toolbar select,
.publicados-toolbar input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 12px;
  color: #fff;
  font-size: 0.85rem;
  outline: none;
}

.publicados-toolbar input {
  min-width: 220px;
}

.publicados-toolbar select option {
  background: #111;
}

/* ─── Publicados Grid ───────────────────────────────────────── */
.publicados-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 16px;
}

.publicado-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.publicado-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.card-portada {
  position: relative;
  height: 160px;
  overflow: hidden;
}

.card-portada img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s;
}

.publicado-card:hover .card-portada img {
  transform: scale(1.05);
}

.card-cat {
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  color: #fff;
}

.card-body {
  padding: 14px;
}

.card-body h4 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 8px;
  line-height: 1.3;
}

.card-time {
  font-size: 0.75rem;
  color: #555;
  margin-bottom: 10px;
}

.card-metrics {
  display: flex;
  gap: 12px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}

.card-actions {
  display: flex;
  gap: 6px;
}

.card-actions .action-btn {
  flex: 1;
  text-align: center;
}

.action-btn.unpublish:hover {
  border-color: #555;
  color: #888;
}

/* ─── Empty State ───────────────────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #444;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-state p {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* ─── Modal ─────────────────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 2000;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: #0f0f0f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 32px;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #888;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #fff;
}

.preview-modal h3 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 12px;
}

.preview-extracto {
  color: rgba(255, 255, 255, 0.6);
  font-style: italic;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.preview-portada {
  margin-bottom: 16px;
}

.preview-portada img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.preview-link {
  display: inline-block;
  margin-bottom: 16px;
  color: #EF4444;
  font-size: 0.85rem;
  text-decoration: none;
}

.preview-link:hover {
  text-decoration: underline;
}

.preview-body h4 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--color-primary, #cf2e2e);
  margin: 20px 0 10px;
}

.preview-body p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0 0 12px;
}

.preview-body img {
  width: 100%;
  border-radius: 8px;
  margin: 12px 0;
}

.preview-body blockquote {
  border-left: 3px solid var(--color-primary, #cf2e2e);
  padding-left: 16px;
  margin: 12px 0;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}

.preview-comentario {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.preview-comentario label {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #888;
  display: block;
  margin-bottom: 8px;
}

.preview-comentario textarea {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 10px 14px;
  color: #fff;
  font-family: var(--font-body, 'Roboto', sans-serif);
  font-size: 0.9rem;
  outline: none;
  resize: vertical;
}

.preview-comentario textarea:focus {
  border-color: var(--color-primary, #cf2e2e);
  background: rgba(255, 255, 255, 0.06);
}

/* ─── Responsive ────────────────────────────────────────────── */
@media (max-width: 768px) {
  .panel-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .panel-tabs {
    width: 100%;
    overflow-x: auto;
  }

  .bandeja-item {
    flex-direction: column;
  }

  .item-actions {
    width: 100%;
  }

  .metadata-grid {
    grid-template-columns: 1fr;
  }

  .publicados-grid {
    grid-template-columns: 1fr;
  }

  .editor-footer {
    flex-direction: column;
  }

  .editor-footer button {
    width: 100%;
  }
}
</style>
