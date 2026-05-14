<template>
  <div class="talent-dashboard">
    <!-- KPIs -->
    <div class="kpi-grid animate-up" style="animation-delay: 0.1s">
      <template v-if="!hasData">
        <div v-for="n in 4" :key="n" class="kpi-card kpi-skeleton">
          <div class="kpi-icon skeleton-shimmer"></div>
          <div class="kpi-info skeleton-info">
            <span class="kpi-value skeleton-shimmer"></span>
            <span class="kpi-label skeleton-shimmer skeleton-short"></span>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="kpi-card" v-for="kpi in kpis" :key="kpi.label">
          <div class="kpi-icon" :style="{ background: kpi.bg }">{{ kpi.icon }}</div>
          <div class="kpi-info">
            <span class="kpi-value" :style="{ color: kpi.color }">{{ kpi.value }}</span>
            <span class="kpi-label">{{ kpi.label }}</span>
          </div>
          <div v-if="kpi.sub" class="kpi-sub">{{ kpi.sub }}</div>
        </div>
      </template>
    </div>

    <!-- Alerta perfiles incompletos -->
    <div v-if="perfilesIncompletos.length > 0" class="incomplete-alert animate-up" style="animation-delay: 0.12s">
      <span class="alert-badge">{{ perfilesIncompletos.length }}</span>
      <span class="alert-text">
        {{ perfilesIncompletos.length === 1 ? 'perfil incompleto' : 'perfiles incompletos' }}
      </span>
      <span class="alert-hint">Falta peso, altura, portada o deporte asignado</span>
    </div>

    <!-- Distribución por deporte -->
    <div v-if="hasData" class="chart-section animate-up" style="animation-delay: 0.14s">
      <div class="chart-header">
        <div class="sep"></div>
        <span class="chart-title">DISTRIBUCIÓN POR DEPORTE</span>
      </div>
      <div ref="chartRef" class="donut-chart"></div>
    </div>

    <!-- Header de página -->
    <div class="page-header animate-up" style="animation-delay: 0.15s">
      <div class="title-row">
        <div class="sep"></div>
        <span class="section-label">PANEL DE TALENTOS</span>
      </div>
      <h1 class="page-title">
        NUESTROS ATLETAS
        <span class="title-red">TOKENIZADOS</span>
      </h1>
    </div>

    <!-- Grid de atletas (tarjetas) -->
    <div class="athletes-grid animate-up" style="animation-delay: 0.2s">
      <div v-for="atleta in atletasFiltrados.slice(0, 6)" :key="atleta.id_atleta" class="atleta-card"
        :class="{ 'inactivo': !atleta.activo }">
        <div class="atleta-header">
          <img :src="atleta.portada || '/assets/images/placeholder-athlete.webp'" :alt="atleta.nombre"
            class="atleta-img" />
          <div class="atleta-badges">
            <span class="badge" :class="atleta.activo ? 'badge-green' : 'badge-gray'">
              {{ atleta.activo ? '● ACTIVO' : '○ INACTIVO' }}
            </span>
            <span v-if="atleta.disciplina" class="badge badge-gold">{{ atleta.disciplina }}</span>
            <span v-if="esTokenizable(atleta)" class="badge badge-token">💎 TOKENIZABLE</span>
          </div>
          <!-- Indicador de estado flotante -->
          <div class="status-dot" :class="getEstadoVisual(atleta)"></div>
        </div>

        <div class="atleta-body">
          <h3>{{ atleta.nombre }}</h3>
          <span v-if="atleta.alias" class="atleta-alias">@{{ atleta.alias }}</span>
          <span class="atleta-discipline">{{ atleta.disciplina }}</span>

          <div class="atleta-stats">
            <div class="stat-item">
              <span class="stat-val record-badge" :class="getRecordBadge(atleta).type">
                {{ getRecordBadge(atleta).text }}
              </span>
              <span class="stat-lbl">RÉCORD</span>
            </div>
            <div class="stat-item">
              <span class="stat-val">
                {{ atleta.altura_cm ? (atleta.altura_cm / 100).toFixed(2) + 'm' : '—' }}
              </span>
              <span v-if="atleta.altura_cm" class="stat-imperial">{{ cmToImperial(atleta.altura_cm) }}</span>
              <span class="stat-lbl">ALTURA</span>
            </div>
            <div class="stat-item">
              <span class="stat-val text-gold">#{{ atleta.ranking_nacional || '—' }}</span>
              <span class="stat-lbl">RANKING</span>
            </div>
          </div>

          <div v-if="atleta.peso_kg || atleta.categoria_peso" class="atleta-info">
            <div class="info-row">
              <span class="info-label">Peso:</span>
              <span class="info-value">{{ atleta.peso_kg || '—' }} kg</span>
            </div>
            <div v-if="atleta.categoria_peso" class="info-row">
              <span class="info-label">Categoría:</span>
              <span class="info-value">{{ atleta.categoria_peso }}</span>
            </div>
          </div>

          <div v-if="atleta.patrocinadores_actuales?.length" class="atleta-sponsors">
            <span class="sponsors-label">PATROCINADORES</span>
            <div class="sponsors-tags">
              <span v-for="(s, i) in atleta.patrocinadores_actuales.slice(0, 2)" :key="i" class="sponsor-tag">
                {{ s }}
              </span>
              <span v-if="atleta.patrocinadores_actuales.length > 2"
                class="sponsor-more">+{{ atleta.patrocinadores_actuales.length - 2 }}</span>
            </div>
          </div>

          <div class="atleta-actions">
            <a v-if="atleta.instagram_url" :href="atleta.instagram_url" target="_blank" class="social-link instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a v-if="atleta.tiktok" :href="atleta.tiktok" target="_blank" class="social-link tiktok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Simulador de inversión -->
    <div v-if="hasData" class="simulador-section animate-up" style="animation-delay: 0.25s">
      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>🧮 SIMULADOR DE INVERSIÓN</h4>
          </div>
        </div>
        <div class="simulador-body">
          <div class="sim-field">
            <label>Atleta</label>
            <select v-model="simAtletaId">
              <option value="">-- Seleccionar atleta --</option>
              <option v-for="a in atletasFiltrados" :key="a.id_atleta" :value="a.id_atleta">
                {{ a.nombre }} ({{ a.disciplina }})
              </option>
            </select>
          </div>
          <div class="sim-field">
            <label>Monto de inversión (GTQ)</label>
            <input v-model.number="simMonto" type="number" min="1000" step="5000" />
          </div>
          <div v-if="simRetorno && simAtleta" class="sim-result">
            <div class="sim-row">
              <span class="sim-label">Retorno estimado:</span>
              <span class="sim-value">{{ simRetorno.porcentaje }}%</span>
            </div>
            <div class="sim-row">
              <span class="sim-label">Ganancia aproximada:</span>
              <span class="sim-value">Q{{ simRetorno.retornoQ.toLocaleString('es-GT') }}</span>
            </div>
            <div class="sim-hint">&lt; Q10K = 1% · Q10K–50K = 2% · &gt; Q50K = 3%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Comparador / Tabla -->
    <div class="comparison-section animate-up" style="animation-delay: 0.3s">
      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>COMPARADOR DE ATLETAS</h4>
          </div>
          <div class="table-controls">
            <select v-model="filtroDisciplina" class="sort-select">
              <option value="">Todas las disciplinas</option>
              <option v-for="d in disciplinasUnicas" :key="d" :value="d">{{ d }}</option>
            </select>
            <select v-model="filtroEstatus" class="sort-select">
              <option value="todos">Todos</option>
              <option value="activo">Activos</option>
              <option value="inactivo">Inactivos</option>
            </select>
            <input v-model="searchTable" type="text" placeholder="Buscar en tabla..." class="search-input" />
            <select v-model="sortBy" class="sort-select">
              <option value="ranking">Ordenar por Ranking</option>
              <option value="victorias">Ordenar por Victorias</option>
              <option value="nombre">Ordenar por Nombre</option>
            </select>
            <button v-if="seleccionados.length >= 2" class="btn-compare" @click="abrirComparador">
              Comparar ({{ seleccionados.length }})
            </button>
          </div>
        </div>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>
                  <span class="th-tooltip">
                    Atleta
                    <span class="tooltip-box">Nombre completo del atleta registrado</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Disciplina
                    <span class="tooltip-box">Deporte principal de competición</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Récord
                    <span class="tooltip-box">Victorias - Derrotas - Empates</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Ranking Nac.
                    <span class="tooltip-box">Posición en ranking nacional actual</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Altura
                    <span class="tooltip-box">Altura en metros con conversión imperial</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Peso
                    <span class="tooltip-box">Peso en kilogramos</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Nocauts
                    <span class="tooltip-box">Total de nocauts logrados</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Tokenizable
                    <span class="tooltip-box">Cumple requisitos para tokenización RWA</span>
                  </span>
                </th>
                <th>
                  <span class="th-tooltip">
                    Estatus
                    <span class="tooltip-box">Activo o inactivo en la plataforma</span>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              <template v-if="!hasData">
                <tr v-for="n in 5" :key="n" class="skeleton-row">
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 16px; height: 16px;"></div></td>
                  <td>
                    <div class="atleta-cell">
                      <div class="skeleton-cell skeleton-shimmer" style="width: 32px; height: 32px; border-radius: 50%;"></div>
                      <div class="skeleton-cell skeleton-shimmer" style="width: 120px; height: 14px;"></div>
                    </div>
                  </td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 80px; height: 14px;"></div></td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 60px; height: 14px;"></div></td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 40px; height: 14px;"></div></td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 50px; height: 14px;"></div></td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 50px; height: 14px;"></div></td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 30px; height: 14px;"></div></td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 30px; height: 14px;"></div></td>
                  <td><div class="skeleton-cell skeleton-shimmer" style="width: 60px; height: 14px;"></div></td>
                </tr>
              </template>
              <tr v-for="atleta in atletasFiltrados" :key="atleta.id_atleta" :class="{ 'selected-row': seleccionados.includes(atleta.id_atleta) }">
                <td>
                  <input
                    type="checkbox"
                    :checked="seleccionados.includes(atleta.id_atleta)"
                    @change="toggleSeleccion(atleta.id_atleta)"
                    :disabled="!seleccionados.includes(atleta.id_atleta) && seleccionados.length >= 3"
                  />
                </td>
                <td class="atleta-cell">
                  <img :src="atleta.portada || '/assets/images/placeholder-athlete.webp'" :alt="atleta.nombre"
                    class="table-thumb" />
                  <span>{{ atleta.nombre }}</span>
                </td>
                <td>{{ atleta.disciplina || '—' }}</td>
                <td>
                  <span class="record-badge" :class="getRecordBadge(atleta).type">
                    {{ getRecordBadge(atleta).text }}
                  </span>
                </td>
                <td class="text-gold">#{{ atleta.ranking_nacional || '—' }}</td>
                <td>
                  {{ atleta.altura_cm ? (atleta.altura_cm / 100).toFixed(2) + 'm' : '—' }}
                  <span v-if="atleta.altura_cm" class="imperial-unit">{{ cmToImperial(atleta.altura_cm) }}</span>
                </td>
                <td>{{ atleta.peso_kg ? atleta.peso_kg + ' kg' : '—' }}</td>
                <td>{{ atleta.nocauts || 0 }}</td>
                <td>
                  <span v-if="esTokenizable(atleta)" class="token-badge">💎</span>
                  <span v-else>—</span>
                </td>
                <td>
                  <span class="status-badge" :class="atleta.activo ? 'activo' : 'inactivo'">
                    {{ atleta.activo ? 'ACTIVO' : 'INACTIVO' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Modal Comparador Side-by-Side -->
    <div v-if="mostrarComparador" class="modal-overlay" @click.self="cerrarComparador">
      <div class="modal-content compare-modal">
        <button class="modal-close" @click="cerrarComparador">✕</button>
        <h3>Comparación de Atletas</h3>
        <div class="compare-grid">
          <div v-for="atleta in atletasComparar" :key="atleta.id_atleta" class="compare-col">
            <div class="compare-header">
              <img :src="atleta.portada || '/assets/images/placeholder-athlete.webp'" :alt="atleta.nombre" />
              <h4>{{ atleta.nombre }}</h4>
              <span class="compare-disciplina">{{ atleta.disciplina }}</span>
              <span v-if="esTokenizable(atleta)" class="compare-token">💎 Tokenizable</span>
            </div>
            <div class="compare-stats">
              <div class="compare-row">
                <span class="compare-label">Récord</span>
                <span class="compare-val">{{ getRecord(atleta) }}</span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Ranking Nac.</span>
                <span class="compare-val text-gold">#{{ atleta.ranking_nacional || '—' }}</span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Altura</span>
                <span class="compare-val">{{ atleta.altura_cm ? (atleta.altura_cm / 100).toFixed(2) + 'm' : '—' }}</span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Peso</span>
                <span class="compare-val">{{ atleta.peso_kg ? atleta.peso_kg + ' kg' : '—' }}</span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Nocauts</span>
                <span class="compare-val">{{ atleta.nocauts || 0 }}</span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Victorias</span>
                <span class="compare-val">{{ atleta.victorias || 0 }}</span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Derrotas</span>
                <span class="compare-val">{{ atleta.derrotas || 0 }}</span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Win Rate</span>
                <span class="compare-val">
                  {{ ((atleta.victorias || 0) / ((atleta.victorias || 0) + (atleta.derrotas || 0) + 1) * 100).toFixed(1) }}%
                </span>
              </div>
              <div class="compare-row">
                <span class="compare-label">Patrocinadores</span>
                <span class="compare-val">{{ atleta.patrocinadores_actuales?.length || 0 }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast Container -->
    <div class="toast-container">
      <TransitionGroup name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="toast-item"
          :class="`toast-${toast.type}`"
        >
          <span class="toast-icon">{{ toast.type === 'success' ? '✓' : toast.type === 'warning' ? '⚠' : toast.type === 'error' ? '✕' : 'ℹ' }}</span>
          <span class="toast-message">{{ toast.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Atleta } from '../../types/talent'

const props = defineProps<{
  atletas: Atleta[]
}>()

const route = useRoute()
const router = useRouter()

// Sistema de toasts
interface Toast {
  id: number
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
}
const toasts = ref<Toast[]>([])
let toastIdCounter = 0

function showToast(message: string, type: Toast['type'] = 'info') {
  const id = ++toastIdCounter
  toasts.value.push({ id, message, type })
  setTimeout(() => {
    toasts.value = toasts.value.filter(t => t.id !== id)
  }, 3000)
}

const searchTable = ref('')
const sortBy = ref<'ranking' | 'victorias' | 'nombre'>('ranking')
const filtroDisciplina = ref('')
const filtroEstatus = ref<'todos' | 'activo' | 'inactivo'>('todos')

// Comparador side-by-side
const seleccionados = ref<number[]>([])
const mostrarComparador = ref(false)

// Simulador de inversión
const simAtletaId = ref<number | ''>('')
const simMonto = ref(50000)
const simAtleta = computed(() => {
  if (!simAtletaId.value) return null
  return props.atletas.find(a => a.id_atleta === simAtletaId.value) || null
})
const simRetorno = computed(() => {
  if (!simAtleta.value || !simMonto.value) return null
  const monto = simMonto.value
  let porcentaje: number
  if (monto < 10000) {
    porcentaje = 1
  } else if (monto <= 50000) {
    porcentaje = 2
  } else {
    porcentaje = 3
  }
  const retornoQ = Math.round(monto * (porcentaje / 100))
  return { baseReturn: porcentaje / 100, retornoQ, porcentaje: porcentaje.toFixed(0) }
})

// Sincronizar filtros con URL
onMounted(() => {
  if (route.query.disciplina) filtroDisciplina.value = String(route.query.disciplina)
  if (route.query.estatus) filtroEstatus.value = String(route.query.estatus) as any
  if (route.query.search) searchTable.value = String(route.query.search)
  if (route.query.sort) sortBy.value = String(route.query.sort) as any
})

watch([filtroDisciplina, filtroEstatus, searchTable, sortBy], ([d, e, s, so]) => {
  const query: Record<string, string> = {}
  if (d) query.disciplina = d
  if (e && e !== 'todos') query.estatus = e
  if (s) query.search = s
  if (so && so !== 'ranking') query.sort = so
  router.replace({ query: Object.keys(query).length ? query : undefined })
})

const hasData = computed(() => props.atletas.length > 0)

const disciplinasUnicas = computed(() => {
  const set = new Set(props.atletas.map(a => a.disciplina).filter(Boolean))
  return Array.from(set).sort()
})

const perfilesIncompletos = computed(() => {
  return props.atletas.filter(a =>
    !a.peso_kg || !a.altura_cm || !a.portada || !a.deporte_principal_id
  )
})

const tokenizables = computed(() => props.atletas.filter(esTokenizable))

const kpis = computed(() => [
  {
    icon: '🏆',
    label: 'TOTAL ATLETAS',
    value: props.atletas.length,
    sub: `${props.atletas.filter(a => a.activo).length} activos`,
    color: 'var(--color-primary, #cf2e2e)',
    bg: 'rgba(207, 46, 46, 0.1)'
  },
  {
    icon: '⚖️',
    label: 'TOTAL VICTORIAS',
    value: props.atletas.reduce((s, a) => s + (a.victorias || 0), 0),
    sub: `${props.atletas.reduce((s, a) => s + (a.derrotas || 0), 0)} derrotas`,
    color: '#00e090',
    bg: 'rgba(0, 224, 144, 0.1)'
  },
  {
    icon: '📊',
    label: 'RANKING PROMEDIO',
    value: promedioRanking.value !== null ? '#' + promedioRanking.value : '—',
    sub: 'Nacional',
    color: '#c9a84c',
    bg: 'rgba(201, 168, 76, 0.1)'
  },
  {
    icon: '💎',
    label: 'TOKENIZABLES',
    value: tokenizables.value.length,
    sub: `${tokenizables.value.filter(a => a.activo).length} listos para RWA`,
    color: '#a855f7',
    bg: 'rgba(168, 85, 247, 0.1)'
  }
])

const promedioRanking = computed(() => {
  const withRanking = props.atletas.filter(a => a.ranking_nacional)
  if (withRanking.length === 0) return null
  return Math.round(withRanking.reduce((s, a) => s + (a.ranking_nacional || 0), 0) / withRanking.length)
})

const atletasFiltrados = computed(() => {
  let result = [...props.atletas]
  if (filtroDisciplina.value) {
    result = result.filter(a => a.disciplina === filtroDisciplina.value)
  }
  if (filtroEstatus.value !== 'todos') {
    result = result.filter(a => a.activo === (filtroEstatus.value === 'activo'))
  }
  if (searchTable.value.trim()) {
    const q = searchTable.value.toLowerCase()
    result = result.filter(a =>
      a.nombre.toLowerCase().includes(q) ||
      (a.disciplina?.toLowerCase().includes(q)) ||
      (a.alias?.toLowerCase().includes(q))
    )
  }
  switch (sortBy.value) {
    case 'victorias':
      return result.sort((a, b) => (b.victorias || 0) - (a.victorias || 0))
    case 'nombre':
      return result.sort((a, b) => a.nombre.localeCompare(b.nombre))
    default:
      return result.sort((a, b) => (a.ranking_nacional || 999) - (b.ranking_nacional || 999))
  }
})

// Donut chart
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: any = null

const donutData = computed(() => {
  const counts: Record<string, number> = {}
  props.atletas.forEach(a => {
    const d = a.disciplina || 'Sin disciplina'
    counts[d] = (counts[d] || 0) + 1
  })
  return {
    labels: Object.keys(counts),
    series: Object.values(counts)
  }
})

async function renderChart() {
  if (!chartRef.value || donutData.value.series.length === 0) return
  const ApexCharts = (await import('apexcharts')).default
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
  chartInstance = new ApexCharts(chartRef.value, {
    chart: {
      type: 'donut',
      height: 280,
      background: 'transparent',
      fontFamily: 'inherit',
      animations: { enabled: true }
    },
    labels: donutData.value.labels,
    series: donutData.value.series,
    colors: ['#cf2e2e', '#00e090', '#c9a84c', '#3b82f6', '#a855f7', '#f97316', '#ec4899', '#14b8a6'],
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Atletas',
              color: '#888',
              fontSize: '14px',
              fontWeight: 600
            },
            value: {
              color: '#fff',
              fontSize: '22px',
              fontWeight: 700
            }
          }
        }
      }
    },
    dataLabels: { enabled: false },
    legend: {
      position: 'bottom',
      labels: { colors: '#888' },
      fontSize: '12px'
    },
    stroke: { show: true, colors: ['#111'], width: 2 },
    tooltip: {
      theme: 'dark',
      y: {
        formatter: (val: number) => `${val} atleta${val !== 1 ? 's' : ''}`
      }
    }
  })
  chartInstance.render()
}

watch(() => props.atletas, () => {
  nextTick(renderChart)
}, { deep: true })

onMounted(() => {
  nextTick(renderChart)
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})

// Helpers
function cmToImperial(cm: number | null): string {
  if (!cm) return ''
  const totalInches = cm / 2.54
  const feet = Math.floor(totalInches / 12)
  const inches = Math.round(totalInches % 12)
  return `${feet}'${inches}"`
}

function getRecordBadge(atleta: Atleta) {
  const v = atleta.victorias || 0
  const d = atleta.derrotas || 0
  const e = atleta.empates || 0
  if (v === 0 && d === 0 && e === 0) return { type: 'none', text: '⚪ Sin debut' }
  return { type: 'record', text: `${v}-${d}-${e}` }
}

function getEstadoVisual(atleta: Atleta) {
  if (!atleta.activo) return 'rojo'
  const incompleto = !atleta.peso_kg || !atleta.altura_cm || !atleta.portada || !atleta.deporte_principal_id
  if (incompleto) return 'naranja'
  return 'verde'
}

function getRecord(a: Atleta): string {
  return `${a.victorias || 0}-${a.derrotas || 0}-${a.empates || 0}`
}

function esTokenizable(a: Atleta): boolean {
  const statsOk = !!a.peso_kg && !!a.altura_cm && !!a.ranking_nacional && (a.victorias !== undefined || a.derrotas !== undefined)
  const logrosOk = !!a.mejor_posicion || !!a.fecha_debut
  const comunidadOk = !!(a.instagram_url || a.tiktok || a.alias)
  return statsOk && logrosOk && comunidadOk
}

function toggleSeleccion(id: number) {
  const idx = seleccionados.value.indexOf(id)
  const atleta = props.atletas.find(a => a.id_atleta === id)
  if (idx > -1) {
    seleccionados.value.splice(idx, 1)
    showToast(`${atleta?.nombre || 'Atleta'} removido de la comparación`, 'info')
  } else if (seleccionados.value.length < 3) {
    seleccionados.value.push(id)
    showToast(`${atleta?.nombre || 'Atleta'} añadido a la comparación (${seleccionados.value.length}/3)`, 'success')
  } else {
    showToast('Máximo 3 atletas para comparar', 'warning')
  }
}

function abrirComparador() {
  if (seleccionados.value.length >= 2) {
    mostrarComparador.value = true
    showToast(`Comparando ${seleccionados.value.length} atletas`, 'success')
  }
}

function cerrarComparador() {
  mostrarComparador.value = false
}

const atletasComparar = computed(() => {
  return seleccionados.value.map(id => props.atletas.find(a => a.id_atleta === id)).filter(Boolean) as Atleta[]
})
</script>

<style scoped>
.talent-dashboard {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.kpi-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  transition: all 0.3s;
}

.kpi-card:hover {
  border-color: rgba(255, 255, 255, 0.12);
}

.kpi-icon {
  font-size: 1.5rem;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  flex-shrink: 0;
}

.kpi-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.kpi-value {
  font-family: 'DM Mono', monospace;
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1;
}

.kpi-label {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #555;
}

.kpi-sub {
  position: absolute;
  bottom: 8px;
  right: 12px;
  font-size: 0.65rem;
  color: #444;
}

/* Skeleton para KPIs vacíos */
.kpi-skeleton {
  pointer-events: none;
}

.kpi-skeleton .kpi-icon.skeleton-shimmer {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  width: 44px;
  height: 44px;
}

.skeleton-info {
  gap: 8px;
  flex: 1;
}

.kpi-skeleton .kpi-value.skeleton-shimmer {
  display: block;
  width: 60%;
  height: 20px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.08);
}

.kpi-skeleton .kpi-label.skeleton-shimmer {
  display: block;
  width: 80%;
  height: 12px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.06);
}

.kpi-skeleton .kpi-label.skeleton-short {
  width: 50%;
}

.skeleton-shimmer {
  position: relative;
  overflow: hidden;
}

.skeleton-shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.04) 50%,
    transparent 100%
  );
  animation: skeleton-shimmer 1.6s infinite;
}

@keyframes skeleton-shimmer {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

/* Alerta perfiles incompletos */
.incomplete-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 4px;
  padding: 10px 14px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
}

.alert-badge {
  background: var(--color-primary, #cf2e2e);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 4px;
  min-width: 24px;
  text-align: center;
}

.alert-text {
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #fff;
}

.alert-hint {
  font-size: 0.7rem;
  color: #888;
  margin-left: auto;
}

/* Chart section */
.chart-section {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  padding: 20px;
}

.chart-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.chart-title {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-weight: 700;
}

.donut-chart {
  max-width: 400px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 8px;
}

.title-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 4px;
}

.sep {
  width: 32px;
  height: 2px;
  background: var(--color-primary);
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--color-primary);
  font-family: var(--font-heading);
  font-weight: 700;
}

.page-title {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: 0.04em;
  line-height: 1;
  margin-bottom: 6px;
}

.title-red {
  color: var(--color-primary);
}

.athletes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.atleta-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.atleta-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%);
  opacity: 0.5;
}

.atleta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(207, 46, 46, 0.25);
  border-color: rgba(207, 46, 46, 0.3);
}

.atleta-card.inactivo {
  opacity: 0.5;
}

.atleta-header {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.atleta-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
}

.atleta-card:hover .atleta-img {
  transform: scale(1.05);
}

/* Indicador de estado flotante */
.status-dot {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  border: 2px solid var(--color-surface, #111);
  z-index: 2;
}

.status-dot.verde {
  background: #00e090;
  box-shadow: 0 0 8px rgba(0, 224, 144, 0.5);
}

.status-dot.naranja {
  background: #f97316;
  box-shadow: 0 0 8px rgba(249, 115, 22, 0.5);
}

.status-dot.rojo {
  background: #ef4444;
  box-shadow: 0 0 8px rgba(239, 68, 68, 0.5);
}

.atleta-badges {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
}

.badge-green {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
  border: 1px solid rgba(0, 224, 144, 0.2);
}

.badge-gray {
  background: rgba(100, 100, 100, 0.1);
  color: #888;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.badge-gold {
  background: rgba(201, 168, 76, 0.1);
  color: #c9a84c;
  border: 1px solid rgba(201, 168, 76, 0.2);
}

.atleta-body {
  padding: 16px;
}

.atleta-body h3 {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.05em;
  margin-bottom: 2px;
}

.atleta-alias {
  display: block;
  font-size: 12px;
  color: var(--color-primary);
  margin-bottom: 4px;
}

.atleta-discipline {
  display: block;
  font-size: 12px;
  color: #888;
  letter-spacing: 0.15em;
  font-family: var(--font-heading);
  font-weight: 700;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.atleta-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.stat-item {
  text-align: center;
  padding: 10px 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.stat-val {
  font-family: 'DM Mono', monospace;
  font-size: 14px;
  font-weight: 600;
  display: block;
}

.stat-lbl {
  font-size: 9px;
  color: #555;
  letter-spacing: 0.1em;
  font-family: var(--font-heading);
  font-weight: 700;
  margin-top: 2px;
}

.stat-imperial {
  font-size: 10px;
  color: #666;
  font-family: 'DM Mono', monospace;
  display: block;
  margin-top: 2px;
}

/* Record badge */
.record-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-family: 'DM Mono', monospace;
  font-weight: 600;
}

.record-badge.record {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
  border: 1px solid rgba(0, 224, 144, 0.2);
}

.record-badge.none {
  background: rgba(100, 100, 100, 0.1);
  color: #666;
  border: 1px solid rgba(100, 100, 100, 0.2);
  font-size: 10px;
}

.text-gold {
  color: #c9a84c !important;
}

.atleta-info {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  padding: 3px 0;
}

.info-label {
  color: #555;
}

.info-value {
  color: rgba(255, 255, 255, 0.7);
}

.atleta-sponsors {
  margin-bottom: 12px;
}

.sponsors-label {
  font-size: 0.65rem;
  color: #444;
  letter-spacing: 0.12em;
  font-family: var(--font-heading);
  font-weight: 700;
  display: block;
  margin-bottom: 6px;
}

.sponsors-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.sponsor-tag {
  font-size: 0.65rem;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.5);
}

.sponsor-more {
  font-size: 0.65rem;
  color: var(--color-primary, #cf2e2e);
}

.atleta-actions {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  transition: all 0.25s;
}

.social-link svg {
  width: 16px;
  height: 16px;
}

.social-link.instagram {
  background: rgba(225, 48, 108, 0.12);
  color: #e1306c;
}

.social-link.instagram:hover {
  background: rgba(225, 48, 108, 0.2);
}

.social-link.tiktok {
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
}

.social-link.tiktok:hover {
  background: rgba(255, 255, 255, 0.15);
}

.comparison-section {
  margin-top: 16px;
}

.card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  padding: 20px;
}

.card-header {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

.card h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 14px;
}

.table-controls {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.search-input,
.sort-select {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 6px 10px;
  color: #fff;
  font-size: 0.8rem;
  outline: none;
}

.search-input {
  min-width: 160px;
}

.sort-select option {
  background: #111;
}

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  white-space: nowrap;
}

.comparison-table th {
  font-size: 10px;
  color: #555;
  letter-spacing: 0.15em;
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
}

.comparison-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.025);
}

.comparison-table tbody tr.selected-row {
  background: rgba(207, 46, 46, 0.06);
}

.comparison-table input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--color-primary, #cf2e2e);
  cursor: pointer;
}

.atleta-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  object-position: top;
}

.status-badge {
  font-size: 0.65rem;
  font-family: var(--font-heading);
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 4px;
  letter-spacing: 0.06em;
}

.status-badge.activo {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
}

.status-badge.inactivo {
  background: rgba(100, 100, 100, 0.1);
  color: #888;
}

.imperial-unit {
  font-size: 0.7rem;
  color: #666;
  margin-left: 4px;
}

/* Badge tokenizable */
.badge-token {
  background: rgba(168, 85, 247, 0.15);
  color: #a855f7;
  border: 1px solid rgba(168, 85, 247, 0.25);
}

.token-badge {
  font-size: 1rem;
}

/* Simulador de inversión */
.simulador-section {
  margin-top: 16px;
}

.simulador-body {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
}

.sim-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 200px;
  flex: 1;
}

.sim-field label {
  font-size: 0.7rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-family: var(--font-heading);
  font-weight: 600;
}

.sim-field select,
.sim-field input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 6px;
  padding: 8px 12px;
  color: #fff;
  font-size: 0.85rem;
  outline: none;
}

.sim-field select option {
  background: #1a1a1a;
  color: #fff;
}

.sim-result {
  background: rgba(168, 85, 247, 0.06);
  border: 1px solid rgba(168, 85, 247, 0.15);
  border-radius: 8px;
  padding: 14px 18px;
  min-width: 220px;
}

.sim-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.sim-label {
  font-size: 0.78rem;
  color: #888;
}

.sim-value {
  font-family: 'DM Mono', monospace;
  font-size: 1rem;
  font-weight: 700;
  color: #a855f7;
}

.sim-hint {
  font-size: 0.7rem;
  color: #555;
  margin-top: 4px;
}

/* Botón comparar */
.btn-compare {
  background: rgba(207, 46, 46, 0.12);
  border: 1px solid var(--color-primary, #cf2e2e);
  color: var(--color-primary, #cf2e2e);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-compare:hover {
  background: rgba(207, 46, 46, 0.2);
}

/* Modal comparador */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(6px);
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: #141414;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: transparent;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  transition: color 0.2s;
}

.modal-close:hover {
  color: #fff;
}

.compare-modal h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: 0.06em;
  margin-bottom: 20px;
  text-align: center;
}

.compare-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.compare-col {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 16px;
}

.compare-header {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.compare-header img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 8px;
}

.compare-header h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 1rem;
  margin: 0 0 4px;
}

.compare-disciplina {
  font-size: 0.75rem;
  color: #888;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.compare-token {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.75rem;
  color: #a855f7;
  background: rgba(168, 85, 247, 0.1);
  border: 1px solid rgba(168, 85, 247, 0.2);
  padding: 2px 10px;
  border-radius: 4px;
}

.compare-stats {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.compare-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  padding: 6px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.compare-label {
  color: #666;
}

.compare-val {
  color: #fff;
  font-weight: 600;
  font-family: 'DM Mono', monospace;
}

.animate-up {
  animation: fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Tooltips informativos en columnas */
.th-tooltip {
  position: relative;
  cursor: help;
  border-bottom: 1px dotted rgba(255, 255, 255, 0.2);
}

.th-tooltip .tooltip-box {
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.72rem;
  font-weight: 400;
  color: #ccc;
  white-space: nowrap;
  letter-spacing: 0.02em;
  text-transform: none;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  pointer-events: none;
  z-index: 10;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
}

.th-tooltip .tooltip-box::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border: 5px solid transparent;
  border-top-color: #1a1a1a;
}

.th-tooltip:hover .tooltip-box {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

/* Toast notifications */
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  pointer-events: none;
}

.toast-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 500;
  color: #fff;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  pointer-events: auto;
  min-width: 260px;
  max-width: 360px;
}

.toast-success {
  border-left: 3px solid #00e090;
}

.toast-info {
  border-left: 3px solid #3b82f6;
}

.toast-warning {
  border-left: 3px solid #f59e0b;
}

.toast-error {
  border-left: 3px solid #ef4444;
}

.toast-icon {
  font-size: 1rem;
  flex-shrink: 0;
}

.toast-message {
  line-height: 1.4;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* Skeleton rows para tabla */
.skeleton-row td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
}

.skeleton-cell {
  background: rgba(255, 255, 255, 0.06);
  border-radius: 4px;
}

@media (max-width: 1200px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }

  .incomplete-alert {
    flex-wrap: wrap;
  }

  .alert-hint {
    width: 100%;
    margin-left: 0;
    margin-top: 4px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-controls {
    width: 100%;
    flex-direction: column;
  }

  .comparison-table th,
  .comparison-table td {
    padding: 8px 10px;
    font-size: 0.75rem;
  }
}
</style>
