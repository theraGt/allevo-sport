<template>
  <div class="talent-editor">
    <div class="editor-toolbar" v-if="atletaData">
      <span class="toolbar-label">Editando: {{ atletaData.nombre }}</span>
      <button class="btn-eye" :class="{ active: previewMode }" @click="previewMode = !previewMode" title="Vista previa">
        👁️
      </button>
    </div>

    <div class="editor-layout" :class="{ 'split-mode': previewMode }">
      <!-- Panel Izquierdo: Editor -->
      <div class="editor-main">
        <div class="editor-fields">
          <div class="field-group">
            <label>Seleccionar Atleta</label>
            <select v-model="selectedAtletaId" @change="onAtletaChange">
              <option value="">-- Seleccionar atleta --</option>
              <option v-for="a in atletas" :key="a.id_atleta" :value="a.id_atleta">
                {{ a.nombre }} ({{ a.disciplina }})
              </option>
            </select>
          </div>

          <div v-if="atletaData" class="atleta-preview">
            <img :src="atletaData.portada || '/assets/images/placeholder-athlete.webp'" :alt="atletaData.nombre" />
            <div class="preview-info">
              <h4>{{ atletaData.nombre }}</h4>
              <span>{{ atletaData.disciplina }}</span>
              <span class="preview-record">{{ getRecord(atletaData) }}</span>
            </div>
          </div>
        </div>

        <!-- Smart Blocks (Widgets) -->
        <div class="smart-section" v-if="atletaData">
          <div class="section-title">
            <span>─── Smart Blocks (auto-completados) ───</span>
            <span class="section-hint">Arrastra para reordenar</span>
          </div>

          <div class="widgets-list">
            <div v-for="(key, index) in widgetOrder" :key="key" class="widget-item" draggable="true"
              @dragstart="widgetDragStart(index)" @dragover.prevent @drop="widgetDrop(index)" @dragend="widgetDragEnd">
              <div class="widget-handle">▲▼</div>
              <div class="widget-icon-sm">{{ widgetIcon(key) }}</div>
              <span class="widget-name">{{ widgetLabel(key) }}</span>
              <label class="widget-toggle-sm">
                <input type="checkbox" :checked="(widgets as any)[key]" @change="$emit('toggle-widget', key)" />
                <span>Visible</span>
              </label>
            </div>
          </div>
        </div>

        <!-- Custom Blocks -->
        <div class="bloques-section" v-if="atletaData">
          <div class="section-title">─── Bloques Custom (editables manualmente) ───</div>

          <div class="bloques-list">
            <div v-for="(bloque, index) in bloques" :key="bloque.id" class="bloque-item" draggable="true"
              @dragstart="dragStart(index)" @dragover.prevent @drop="drop(index)" @dragend="dragEnd">
              <div class="bloque-handle">▲▼</div>
              <div class="bloque-type" :class="bloque.tipo">{{ bloqueLabel(bloque.tipo) }}</div>
              <div class="bloque-content">
                <template v-if="bloque.tipo === 'subtitulo'">
                  <div class="bloque-field">
                    <select v-model="(bloque.contenido as any).nivel" class="nivel-select">
                      <option value="h2">H2</option>
                      <option value="h3">H3</option>
                    </select>
                    <input v-model="(bloque.contenido as any).texto" type="text" placeholder="Subtítulo..." />
                  </div>
                </template>
                <textarea v-else-if="bloque.tipo === 'parrafo'" v-model="(bloque.contenido as any).texto" rows="2"
                  placeholder="Párrafo..."></textarea>
                <template v-else-if="bloque.tipo === 'imagen'">
                  <input v-model="(bloque.contenido as any).url" type="text" placeholder="URL de imagen..." />
                  <input v-model="(bloque.contenido as any).alt" type="text" placeholder="Texto alternativo..." />
                  <input v-model="(bloque.contenido as any).caption" type="text" placeholder="Pie de foto..." />
                </template>
                <template v-else-if="bloque.tipo === 'cita'">
                  <textarea v-model="(bloque.contenido as any).texto" rows="2" placeholder="Cita..."></textarea>
                  <input v-model="(bloque.contenido as any).autor" type="text" placeholder="Autor de la cita..." />
                </template>
                <template v-else-if="bloque.tipo === 'biografia'">
                  <textarea v-model="(bloque.contenido as any).texto" rows="4" placeholder="Biografía del atleta..."></textarea>
                  <input v-model="(bloque.contenido as any).resumen_ia" type="text" placeholder="Resumen IA (opcional)..." />
                </template>
                <template v-else-if="bloque.tipo === 'redes_sociales'">
                  <div class="social-inputs">
                    <div class="social-field">
                      <label>
                        <span class="social-label-icon">📷</span> Instagram
                      </label>
                      <input
                        v-model="(bloque.contenido as any).instagram"
                        type="text"
                        placeholder="https://instagram.com/..."
                        :class="{ invalid: (bloque.contenido as any).instagram && !validarInstagram((bloque.contenido as any).instagram) }"
                      />
                      <span v-if="extraerHandleInstagram((bloque.contenido as any).instagram)" class="handle-preview">
                        {{ extraerHandleInstagram((bloque.contenido as any).instagram) }}
                      </span>
                      <span v-else-if="(bloque.contenido as any).instagram && !validarInstagram((bloque.contenido as any).instagram)" class="handle-error">
                        URL no válida
                      </span>
                    </div>
                    <div class="social-field">
                      <label>🎵 TikTok</label>
                      <input v-model="(bloque.contenido as any).tiktok" type="text" placeholder="https://tiktok.com/@..." />
                    </div>
                    <div class="social-field">
                      <label>Alias</label>
                      <input v-model="(bloque.contenido as any).alias" type="text" placeholder="@usuario" />
                    </div>
                  </div>
                </template>
                <template v-else-if="bloque.tipo === 'patrocinadores'">
                  <div class="patrocinadores-list">
                    <div v-for="(pat, i) in (bloque.contenido as any).lista" :key="i" class="pat-row">
                      <input v-model="pat.nombre" type="text" placeholder="Nombre" />
                      <input v-model="pat.logo_url" type="text" placeholder="URL logo" />
                      <select v-model="pat.tipo">
                        <option value="principal">Principal</option>
                        <option value="secundario">Secundario</option>
                      </select>
                      <button class="btn-remove" @click="removePatrocinador(bloque, i)">✕</button>
                    </div>
                    <button class="btn-add-item" @click="addPatrocinador(bloque)">+ Añadir patrocinador</button>
                  </div>
                </template>
                <template v-else-if="bloque.tipo === 'galeria_media'">
                  <div class="galeria-list">
                    <div v-for="(item, i) in (bloque.contenido as any).items" :key="i" class="galeria-row">
                      <div class="galeria-thumb" v-if="item.url">
                        <img :src="item.url" alt="" @error="item.url = ''" />
                      </div>
                      <div class="galeria-fields">
                        <select v-model="item.tipo">
                          <option value="imagen">Imagen</option>
                          <option value="video">Video</option>
                        </select>
                        <input v-model="item.url" type="text" placeholder="URL..." />
                        <input v-model="item.caption" type="text" placeholder="Descripción..." />
                      </div>
                      <button class="btn-remove" @click="removeGaleriaItem(bloque, i)">✕</button>
                    </div>
                    <button class="btn-add-item" @click="addGaleriaItem(bloque)">+ Añadir multimedia</button>
                  </div>
                </template>
              </div>
              <label class="bloque-visible">
                <input type="checkbox" v-model="bloque.visible" />
                <span>Visible</span>
              </label>
              <button class="bloque-delete" @click.stop.prevent="$emit('eliminar-bloque', index)">🗑️</button>
            </div>
          </div>

          <div class="bloque-actions">
            <button class="btn-add" @click="$emit('agregar-bloque', 'subtitulo')">+ Subtítulo</button>
            <button class="btn-add" @click="$emit('agregar-bloque', 'parrafo')">+ Párrafo</button>
            <button class="btn-add" @click="$emit('agregar-bloque', 'imagen')">+ Imagen</button>
            <button class="btn-add" @click="$emit('agregar-bloque', 'cita')">+ Cita</button>
            <button class="btn-add" @click="$emit('agregar-bloque', 'biografia')">+ Biografía</button>
            <button class="btn-add" @click="$emit('agregar-bloque', 'redes_sociales')">+ Redes</button>
            <button class="btn-add" @click="$emit('agregar-bloque', 'patrocinadores')">+ Patrocinadores</button>
            <button class="btn-add" @click="$emit('agregar-bloque', 'galeria_media')">+ Galería</button>
          </div>
        </div>

        <div v-else class="no-atleta-state">
          <div class="empty-icon">👤</div>
          <p>Selecciona un atleta para editar su perfil</p>
        </div>

        <div class="editor-footer">
          <button class="btn-preview" @click="showPreview = !showPreview">
            {{ showPreview ? 'Ocultar' : 'Mostrar' }} Preview embebido
          </button>
          <button class="btn-cancel" @click="$emit('cancel')">Cancelar</button>
          <button class="btn-save" @click="$emit('save')">Guardar Cambios</button>
        </div>
      </div>

      <!-- Panel Derecho: Preview -->
      <div v-if="previewMode && atletaData" class="preview-panel">
        <div class="preview-profile">
          <div class="preview-header">
            <img :src="atletaData.portada || '/assets/images/placeholder-athlete.webp'" :alt="atletaData.nombre" />
            <div class="preview-header-info">
              <h3>{{ atletaData.nombre }}</h3>
              <span class="preview-alias" v-if="atletaData.alias">@{{ atletaData.alias }}</span>
              <span class="preview-disciplina">{{ atletaData.disciplina }}</span>
            </div>
          </div>

          <div v-if="widgets.stats_card && widgetOrder.includes('stats_card')" class="preview-stats">
            <div class="preview-stat">
              <span class="pstat-val">{{ atletaData.peso_kg || '—' }} kg</span>
              <span class="pstat-lbl">PESO</span>
            </div>
            <div class="preview-stat">
              <span class="pstat-val">{{ atletaData.altura_cm || '—' }} cm</span>
              <span class="pstat-lbl">ALTURA</span>
            </div>
            <div class="preview-stat">
              <span class="pstat-val">{{ getRecord(atletaData) }}</span>
              <span class="pstat-lbl">RÉCORD</span>
            </div>
            <div class="preview-stat">
              <span class="pstat-val">#{{ atletaData.ranking_nacional || '—' }}</span>
              <span class="pstat-lbl">RANKING NAC.</span>
            </div>
            <div class="preview-stat">
              <span class="pstat-val">{{ atletaData.nocauts || 0 }}</span>
              <span class="pstat-lbl">NOCAUTS</span>
            </div>
          </div>

          <div class="preview-bloques">
            <template v-for="bloque in bloquesVisibles" :key="bloque.id">
              <h2 v-if="bloque.tipo === 'subtitulo' && (bloque.contenido as any).nivel === 'h2'">{{ (bloque.contenido as any).texto }}</h2>
              <h3 v-else-if="bloque.tipo === 'subtitulo' && (bloque.contenido as any).nivel === 'h3'">
                {{ (bloque.contenido as any).texto }}
              </h3>
              <p v-else-if="bloque.tipo === 'parrafo'">{{ (bloque.contenido as any).texto }}</p>
              <div v-else-if="bloque.tipo === 'imagen'" class="preview-img">
                <img :src="(bloque.contenido as any).url" :alt="(bloque.contenido as any).alt" />
                <span v-if="(bloque.contenido as any).caption" class="img-caption">{{ (bloque.contenido as any).caption }}</span>
              </div>
              <blockquote v-else-if="bloque.tipo === 'cita'">
                "{{ (bloque.contenido as any).texto }}"
                <cite>— {{ (bloque.contenido as any).autor }}</cite>
              </blockquote>
              <div v-else-if="bloque.tipo === 'biografia'" class="preview-biografia">
                <p>{{ (bloque.contenido as any).texto }}</p>
                <p v-if="(bloque.contenido as any).resumen_ia" class="resumen-ia">🤖 {{ (bloque.contenido as any).resumen_ia }}</p>
              </div>
              <div v-else-if="bloque.tipo === 'redes_sociales'" class="preview-social">
                <a v-if="(bloque.contenido as any).instagram && validarInstagram((bloque.contenido as any).instagram)"
                  :href="(bloque.contenido as any).instagram" target="_blank">
                  📷 Instagram
                </a>
                <a v-if="(bloque.contenido as any).tiktok" :href="(bloque.contenido as any).tiktok" target="_blank">
                  🎵 TikTok
                </a>
                <span v-if="(bloque.contenido as any).alias" class="preview-alias-handle">@{{ (bloque.contenido as any).alias }}</span>
              </div>
              <div v-else-if="bloque.tipo === 'patrocinadores'" class="preview-patrocinadores">
                <span v-for="pat in (bloque.contenido as any).lista" :key="pat.nombre" class="pat-badge" :class="pat.tipo">
                  {{ pat.nombre }}
                </span>
              </div>
              <div v-else-if="bloque.tipo === 'galeria_media'" class="preview-galeria">
                <img v-for="(item, i) in (bloque.contenido as any).items" :key="i" :src="item.url" :alt="item.caption" />
              </div>
            </template>
          </div>

          <div v-if="widgets.logros_timeline && widgetOrder.includes('logros_timeline')" class="preview-logros">
            <h4>🏅 Logros</h4>
            <div v-if="logrosAtleta.length > 0" class="logros-timeline">
              <div v-for="(logro, i) in logrosAtleta" :key="i" class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-year">{{ logro.anio || logro.fecha || '—' }}</span>
                  <span class="timeline-title">{{ logro.titulo || logro.nombre || 'Logro' }}</span>
                  <span v-if="logro.descripcion" class="timeline-desc">{{ logro.descripcion }}</span>
                </div>
              </div>
            </div>
            <div v-else class="logros-empty">
              <p>Aún no hay logros registrados.</p>
              <button class="btn-add-item" @click="$emit('agregar-bloque', 'cita')">+ Añadir primer logro (manual)</button>
            </div>
          </div>

          <div v-if="widgets.financiamiento_bar && widgetOrder.includes('financiamiento_bar')" class="preview-financiamiento">
            <h4>💰 Financiamiento</h4>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 0%"></div>
            </div>
            <p class="no-data">Módulo de financiamiento en desarrollo.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, reactive } from 'vue'
import type { Atleta, Deport, AtletaBloque, BloqueTipoEditable } from '../../types/talent'

const API_BASE = 'http://localhost:3005/api'

function getToken(): string {
  return localStorage.getItem('token') || localStorage.getItem('access_token') || ''
}

const props = defineProps<{
  atletas: Atleta[]
  deportes: Deport[]
  selectedAtleta: Atleta | null
  bloques: AtletaBloque[]
}>()

const emit = defineEmits<{
  save: []
  cancel: []
  'agregar-bloque': [tipo: string]
  'eliminar-bloque': [index: number]
  'reordenar-bloques': [from: number, to: number]
  'toggle-widget': [widget: string]
}>()

const selectedAtletaId = ref<number | ''>('')
const showPreview = ref(false)
const previewMode = ref(false)
const logrosAtleta = reactive<any[]>([])

const widgets = ref({
  stats_card: true,
  logros_timeline: true,
  deporte_tag: true,
  financiamiento_bar: true
})

const atletaData = computed(() => {
  if (!selectedAtletaId.value) return null
  return props.atletas.find(a => a.id_atleta === selectedAtletaId.value) || null
})

const bloquesVisibles = computed(() => props.bloques.filter(b => b.visible))

let dragIndex = -1
let widgetDragIndex = -1

watch(() => props.selectedAtleta, (newVal) => {
  if (newVal) {
    selectedAtletaId.value = newVal.id_atleta
    fetchLogros(newVal.id_atleta)
  }
}, { immediate: true })

watch(selectedAtletaId, (id) => {
  if (id) fetchLogros(Number(id))
})

async function fetchLogros(atletaId: number) {
  try {
    const res = await fetch(`${API_BASE}/atleta-logros?atleta_id=${atletaId}`, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    })
    if (!res.ok) {
      logrosAtleta.splice(0, logrosAtleta.length)
      return
    }
    const data = await res.json()
    logrosAtleta.splice(0, logrosAtleta.length, ...data)
  } catch (e) {
    console.error('Error fetching logros:', e)
    logrosAtleta.splice(0, logrosAtleta.length)
  }
}

function onAtletaChange() {
  const found = props.atletas.find(a => a.id_atleta === selectedAtletaId.value)
  if (found && selectedAtletaId.value) {
    fetchLogros(Number(selectedAtletaId.value))
  }
}

function getRecord(a: Atleta): string {
  return `${a.victorias || 0}-${a.derrotas || 0}-${a.empates || 0}`
}

function bloqueLabel(tipo: string): string {
  const labels: Record<string, string> = {
    subtitulo: 'H2/H3',
    parrafo: 'P',
    imagen: 'IMG',
    cita: 'CITA',
    biografia: 'BIO',
    redes_sociales: 'RED',
    patrocinadores: 'PAT',
    galeria_media: 'GAL'
  }
  return labels[tipo] || tipo
}

// Custom blocks drag & drop
function dragStart(index: number) {
  dragIndex = index
}

function drop(index: number) {
  if (dragIndex === -1 || dragIndex === index) return
  emit('reordenar-bloques', dragIndex, index)
  dragIndex = -1
}

function dragEnd() {
  dragIndex = -1
}

// Widgets drag & drop (local, solo reordena visualmente el orden de widgets)
const widgetOrder = ref(['stats_card', 'logros_timeline', 'deporte_tag', 'financiamiento_bar'])

function widgetDragStart(index: number) {
  widgetDragIndex = index
}

function widgetDrop(index: number) {
  if (widgetDragIndex === -1 || widgetDragIndex === index) return
  const item = widgetOrder.value.splice(widgetDragIndex, 1)[0]
  widgetOrder.value.splice(index, 0, item)
  widgetDragIndex = -1
}

function widgetDragEnd() {
  widgetDragIndex = -1
}

function widgetLabel(key: string): string {
  const labels: Record<string, string> = {
    stats_card: 'Stats Card',
    logros_timeline: 'Logros Timeline',
    deporte_tag: 'Deporte Tag',
    financiamiento_bar: 'Financiamiento Bar'
  }
  return labels[key] || key
}

function widgetIcon(key: string): string {
  const icons: Record<string, string> = {
    stats_card: '📊',
    logros_timeline: '🏅',
    deporte_tag: '🎯',
    financiamiento_bar: '💰'
  }
  return icons[key] || '🔹'
}

// Instagram helpers
function validarInstagram(url: string): boolean {
  if (!url) return true
  return /^https?:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]+\/?$/.test(url)
}

function extraerHandleInstagram(url: string): string {
  if (!url) return ''
  const match = url.match(/^https?:\/\/(www\.)?instagram\.com\/([A-Za-z0-9_.]+)\/?$/)
  return match ? '@' + match[2] : ''
}

function addPatrocinador(bloque: AtletaBloque) {
  const contenido = bloque.contenido as { lista: any[] }
  contenido.lista.push({ nombre: '', logo_url: '', tipo: 'secundario' })
}

function removePatrocinador(bloque: AtletaBloque, index: number) {
  const contenido = bloque.contenido as { lista: any[] }
  contenido.lista.splice(index, 1)
}

function addGaleriaItem(bloque: AtletaBloque) {
  const contenido = bloque.contenido as { items: any[] }
  contenido.items.push({ tipo: 'imagen', url: '', caption: '' })
}

function removeGaleriaItem(bloque: AtletaBloque, index: number) {
  const contenido = bloque.contenido as { items: any[] }
  contenido.items.splice(index, 1)
}
</script>

<style scoped>
.talent-editor {
  color: #fff;
}

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

.field-group select,
.field-group input,
.field-group textarea {
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

.field-group select:focus,
.field-group input:focus,
.field-group textarea:focus {
  border-color: var(--color-primary, #cf2e2e);
  background: rgba(255, 255, 255, 0.06);
}

.field-group select option {
  background: #111;
}

.atleta-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 12px;
}

.atleta-preview img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
}

.preview-info h4 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.95rem;
  font-weight: 700;
  margin: 0 0 2px;
}

.preview-info span {
  font-size: 0.75rem;
  color: #888;
  display: block;
}

.preview-record {
  font-family: 'DM Mono', monospace;
  color: var(--color-primary, #cf2e2e) !important;
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

.bloques-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.bloque-item {
  display: flex;
  align-items: flex-start;
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
  padding-top: 8px;
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
  margin-top: 4px;
}

.bloque-type.subtitulo { background: rgba(207, 46, 46, 0.15); color: var(--color-primary, #cf2e2e); }
.bloque-type.parrafo { background: rgba(0, 224, 144, 0.1); color: #00e090; }
.bloque-type.imagen { background: rgba(59, 130, 246, 0.12); color: #60a5fa; }
.bloque-type.cita { background: rgba(255, 165, 0, 0.1); color: #fbbf24; }
.bloque-type.biografia { background: rgba(168, 85, 247, 0.12); color: #a855f7; }
.bloque-type.redes_sociales { background: rgba(236, 72, 153, 0.12); color: #ec4899; }
.bloque-type.patrocinadores { background: rgba(249, 115, 22, 0.12); color: #f97316; }
.bloque-type.galeria_media { background: rgba(34, 197, 94, 0.12); color: #22c55e; }

.bloque-content {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.bloque-content input,
.bloque-content textarea,
.bloque-content select {
  width: 100%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 8px 12px;
  color: #fff;
  font-size: 0.85rem;
  outline: none;
}

.bloque-content input:focus,
.bloque-content textarea:focus,
.bloque-content select:focus {
  border-color: var(--color-primary, #cf2e2e);
}

.bloque-content textarea {
  resize: vertical;
  min-height: 50px;
}

.bloque-field {
  display: flex;
  gap: 8px;
}

.nivel-select {
  width: 70px !important;
  flex-shrink: 0;
}

.social-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.social-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.social-field label {
  font-size: 0.7rem;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.patrocinadores-list,
.galeria-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pat-row,
.galeria-row {
  display: flex;
  gap: 6px;
  align-items: center;
}

.pat-row input,
.galeria-row input {
  flex: 1;
  min-width: 0;
}

.galeria-row select {
  width: 90px;
  flex-shrink: 0;
}

.btn-remove {
  background: transparent;
  border: none;
  color: #555;
  cursor: pointer;
  font-size: 0.85rem;
  padding: 4px;
  flex-shrink: 0;
}

.btn-remove:hover {
  color: var(--color-primary, #cf2e2e);
}

.btn-add-item {
  background: transparent;
  border: 1px dashed rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.75rem;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add-item:hover {
  border-color: var(--color-primary, #cf2e2e);
  color: var(--color-primary, #cf2e2e);
}

.bloque-visible {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 4px;
}

.bloque-visible input {
  accent-color: var(--color-primary, #cf2e2e);
}

.bloque-visible span {
  font-size: 0.65rem;
  color: #555;
}

.bloque-delete {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.4;
  transition: opacity 0.2s;
  flex-shrink: 0;
  margin-top: 4px;
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

.widgets-section {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.widgets-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.widget-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 12px;
  cursor: pointer;
  transition: all 0.25s;
}

.widget-toggle:hover {
  border-color: rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
}

.widget-toggle input {
  accent-color: var(--color-primary, #cf2e2e);
  width: 16px;
  height: 16px;
}

.widget-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.widget-icon {
  font-size: 1rem;
}

.preview-section {
  margin-top: 32px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.preview-profile {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 24px;
}

.preview-header {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.preview-header img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
}

.preview-header-info h3 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0 0 4px;
}

.preview-alias {
  font-size: 0.85rem;
  color: var(--color-primary, #cf2e2e);
  display: block;
  margin-bottom: 4px;
}

.preview-disciplina {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.preview-stats {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
  margin-bottom: 20px;
}

.preview-stat {
  text-align: center;
  padding: 12px 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.pstat-val {
  font-family: 'DM Mono', monospace;
  font-size: 0.9rem;
  font-weight: 600;
  display: block;
  color: #fff;
}

.pstat-lbl {
  font-size: 0.6rem;
  color: #555;
  letter-spacing: 0.1em;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-weight: 600;
  display: block;
  margin-top: 2px;
}

.preview-bloques {
  margin-bottom: 20px;
}

.preview-bloques h2 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--color-primary, #cf2e2e);
  margin: 20px 0 10px;
}

.preview-bloques h3 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1.1rem;
  font-weight: 600;
  color: #fff;
  margin: 16px 0 8px;
}

.preview-bloques p {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
  margin: 0 0 12px;
}

.preview-img {
  margin: 12px 0;
}

.preview-img img {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.img-caption {
  display: block;
  font-size: 0.75rem;
  color: #555;
  margin-top: 6px;
  text-align: center;
  font-style: italic;
}

blockquote {
  border-left: 3px solid var(--color-primary, #cf2e2e);
  padding-left: 16px;
  margin: 16px 0;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}

blockquote cite {
  display: block;
  font-size: 0.8rem;
  color: #888;
  margin-top: 8px;
  font-style: normal;
}

.preview-biografia p {
  margin-bottom: 8px;
}

.resumen-ia {
  background: rgba(168, 85, 247, 0.08);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.8rem;
  color: #a855f7 !important;
  margin-top: 12px;
}

.preview-social {
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 12px;
}

.preview-social a {
  color: #e1306c;
  text-decoration: none;
  font-size: 0.85rem;
  padding: 6px 12px;
  background: rgba(225, 48, 108, 0.08);
  border: 1px solid rgba(225, 48, 108, 0.15);
  border-radius: 6px;
}

.preview-social a:hover {
  background: rgba(225, 48, 108, 0.15);
}

.preview-alias-handle {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
}

.preview-patrocinadores {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.pat-badge {
  font-size: 0.75rem;
  padding: 4px 12px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
  color: rgba(255, 255, 255, 0.6);
}

.pat-badge.principal {
  background: rgba(207, 46, 46, 0.1);
  color: var(--color-primary, #cf2e2e);
  border: 1px solid rgba(207, 46, 46, 0.2);
}

.preview-galeria {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 12px;
}

.preview-galeria img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
}

.preview-logros,
.preview-financiamiento {
  margin-top: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
}

.preview-logros h4,
.preview-financiamiento h4 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 10px;
}

.progress-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 10px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary, #cf2e2e), #ff4040);
}

.no-data {
  font-size: 0.78rem;
 color: #444;
  font-style: italic;
}

.no-atleta-state {
  text-align: center;
  padding: 60px 20px;
  color: #444;
}

.no-atleta-state .empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.5;
}

.no-atleta-state p {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

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

.btn-cancel {
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

.btn-cancel:hover {
  border-color: #888;
  color: #fff;
}

.btn-save {
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

.btn-save:hover {
  background: #b91c1c;
  box-shadow: 0 0 24px rgba(207, 46, 46, 0.35);
}

/* Toolbar */
.editor-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.toolbar-label {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.85rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.btn-eye {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-eye:hover,
.btn-eye.active {
  background: rgba(207, 46, 46, 0.15);
  border-color: var(--color-primary, #cf2e2e);
}

/* Split mode */
.editor-layout.split-mode {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  max-width: none;
}

.preview-panel {
  position: sticky;
  top: 20px;
  align-self: start;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
}

/* Smart blocks */
.smart-section {
  margin-bottom: 24px;
}

.section-hint {
  font-size: 0.65rem;
  color: #666;
  margin-left: auto;
}

.widgets-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.widget-item {
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

.widget-item:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.widget-handle {
  font-size: 0.7rem;
  color: #444;
  user-select: none;
  cursor: grab;
}

.widget-icon-sm {
  font-size: 1rem;
}

.widget-name {
  flex: 1;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
}

.widget-toggle-sm {
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  font-size: 0.65rem;
  color: #555;
}

.widget-toggle-sm input {
  accent-color: var(--color-primary, #cf2e2e);
}

/* Redes validadas */
.social-label-icon {
  margin-right: 4px;
}

.handle-preview {
  font-size: 0.75rem;
  color: #00e090;
  margin-top: 4px;
  font-family: 'DM Mono', monospace;
}

.handle-error {
  font-size: 0.75rem;
  color: var(--color-primary, #cf2e2e);
  margin-top: 4px;
}

.bloque-content input.invalid {
  border-color: var(--color-primary, #cf2e2e) !important;
  background: rgba(239, 68, 68, 0.05);
}

/* Galería mejorada */
.galeria-row {
  align-items: flex-start;
  gap: 10px;
}

.galeria-thumb {
  width: 60px;
  height: 60px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.galeria-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.galeria-fields {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* Logros timeline */
.logros-timeline {
  position: relative;
  padding-left: 20px;
}

.logros-timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 4px;
  bottom: 4px;
  width: 2px;
  background: rgba(255, 255, 255, 0.08);
}

.timeline-item {
  position: relative;
  margin-bottom: 14px;
}

.timeline-dot {
  position: absolute;
  left: -18px;
  top: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--color-primary, #cf2e2e);
  border: 2px solid #111;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.timeline-year {
  font-size: 0.7rem;
  color: var(--color-primary, #cf2e2e);
  font-weight: 700;
  font-family: var(--font-heading, 'Oswald', sans-serif);
}

.timeline-title {
  font-size: 0.85rem;
  color: #fff;
  font-weight: 600;
}

.timeline-desc {
  font-size: 0.75rem;
  color: #888;
}

.logros-empty {
  text-align: center;
  padding: 16px 0;
}

.logros-empty p {
  font-size: 0.8rem;
  color: #555;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .editor-layout.split-mode {
    grid-template-columns: 1fr;
  }

  .preview-panel {
    position: static;
    max-height: none;
  }

  .widgets-grid {
    grid-template-columns: 1fr;
  }

  .preview-stats {
    grid-template-columns: repeat(3, 1fr);
  }

  .editor-footer {
    flex-direction: column;
  }

  .editor-footer button {
    width: 100%;
  }

  .pat-row,
  .galeria-row {
    flex-wrap: wrap;
  }
}
</style>