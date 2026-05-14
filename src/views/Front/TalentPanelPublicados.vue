<template>
  <div class="talent-publicados">
    <div class="toolbar">
      <div class="search-spotlight">
        <input
          v-model="busqueda"
          type="text"
          placeholder="Buscar talento..."
          @focus="mostrarSpotlight = true"
          @blur="onBlurSpotlight"
          @keydown.esc="mostrarSpotlight = false"
        />
        <div v-if="mostrarSpotlight && atletasSpotlight.length > 0" class="spotlight-dropdown">
          <div
            v-for="atleta in atletasSpotlight"
            :key="atleta.id_atleta"
            class="spotlight-item"
            @mousedown.prevent="seleccionarSpotlight(atleta)"
          >
            <img :src="atleta.portada || '/assets/images/placeholder-athlete.webp'" :alt="atleta.nombre" class="spotlight-img" />
            <div class="spotlight-info">
              <span class="spotlight-name">{{ atleta.nombre }}</span>
              <span class="spotlight-meta">{{ atleta.disciplina }} • #{{ atleta.ranking_nacional || '—' }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="filter-group">
        <select v-model="filtroDisciplina">
          <option value="">Todas las disciplinas</option>
          <option v-for="dep in disciplinasUnicas" :key="dep" :value="dep">{{ dep }}</option>
        </select>
      </div>

      <div class="filter-group">
        <select v-model="ordenamiento">
          <option value="ranking">Ranking ↑</option>
          <option value="reciente">Recién añadido</option>
          <option value="completo">Más completo</option>
          <option value="alfabetico">Alfabético</option>
        </select>
      </div>

      <div class="stats-bar">
        <span class="stat-item">
          <strong>{{ atletasFiltrados.length }}</strong> talentos
        </span>
        <span class="stat-divider">|</span>
        <span class="stat-item">
          <strong>{{ totalVictorias }}</strong> victorias
        </span>
        <span class="stat-divider">|</span>
        <span class="stat-item">
          <strong>{{ promedioRanking }}</strong> ranking promedio
        </span>
      </div>
    </div>

    <!-- Chips de filtros rápidos -->
    <div class="chips-bar">
      <button
        v-for="chip in chips"
        :key="chip.id"
        class="chip-btn"
        :class="{ active: filtroChip === chip.id }"
        @click="filtroChip = filtroChip === chip.id ? '' : chip.id"
      >
        <span class="chip-icon">{{ chip.icon }}</span>
        <span class="chip-label">{{ chip.label }}</span>
        <span v-if="chip.count > 0" class="chip-count">{{ chip.count }}</span>
      </button>
    </div>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>Cargando talentos...</p>
    </div>

    <!-- Empty state útil -->
    <div v-else-if="atletasFiltrados.length === 0" class="empty-state">
      <div class="empty-icon">🏆</div>
      <h3 v-if="props.atletas.length === 0">Aún no hay talentos publicados</h3>
      <h3 v-else>No hay talentos que coincidan</h3>

      <div v-if="props.atletas.length === 0" class="checklist">
        <div class="checklist-item">
          <span class="check-num">1</span>
          <span class="check-text">Crear perfil del atleta desde el panel</span>
        </div>
        <div class="checklist-item">
          <span class="check-num">2</span>
          <span class="check-text">Completar stats (peso, altura, récord, ranking)</span>
        </div>
        <div class="checklist-item">
          <span class="check-num">3</span>
          <span class="check-text">Publicar el perfil para que aparezca aquí</span>
        </div>
      </div>

      <p v-else class="empty-hint">
        Prueba ajustando los filtros o la búsqueda
      </p>
    </div>

    <div v-else class="atletas-grid">
      <div v-for="atleta in atletasFiltrados" :key="atleta.id_atleta" class="atleta-card"
        :class="{ 'inactivo': !atleta.activo }">
        <div class="card-portada">
          <img :src="atleta.portada || '/assets/images/placeholder-athlete.webp'" :alt="atleta.nombre" />
          <div class="card-badges">
            <span class="badge-status" :class="atleta.activo ? 'activo' : 'inactivo'">
              {{ atleta.activo ? '● ACTIVO' : '○ INACTIVO' }}
            </span>
            <span class="badge-disciplina">{{ atleta.disciplina }}</span>
          </div>
          <div v-if="atleta.alias" class="card-alias">@{{ atleta.alias }}</div>
          <!-- Indicador de completitud -->
          <div class="completeness-badge" :class="getCompletitud(atleta).clase">
            {{ getCompletitud(atleta).porcentaje }}%
          </div>
        </div>

        <div class="card-body">
          <h4>{{ atleta.nombre }}</h4>

          <div class="card-stats">
            <div class="stat-item">
              <span class="stat-val">{{ getRecord(atleta) }}</span>
              <span class="stat-lbl">RÉCORD</span>
            </div>
            <div class="stat-item">
              <span class="stat-val">#{{ atleta.ranking_nacional || '—' }}</span>
              <span class="stat-lbl">RANKING</span>
            </div>
            <div class="stat-item">
              <span class="stat-val">{{ atleta.altura_cm ? (atleta.altura_cm / 100).toFixed(2) + 'm' : '—' }}</span>
              <span class="stat-lbl">ALTURA</span>
            </div>
          </div>

          <div class="card-info">
            <div v-if="atleta.peso_kg" class="info-row">
              <span class="info-label">Peso:</span>
              <span class="info-value">{{ atleta.peso_kg }} kg</span>
            </div>
            <div v-if="atleta.categoria_peso" class="info-row">
              <span class="info-label">Categoría:</span>
              <span class="info-value">{{ atleta.categoria_peso }}</span>
            </div>
            <div v-if="atleta.fecha_debut" class="info-row">
              <span class="info-label">Debut:</span>
              <span class="info-value">{{ formatDate(atleta.fecha_debut) }}</span>
            </div>
          </div>

          <div v-if="atleta.patrocinadores_actuales?.length" class="card-sponsors">
            <span class="sponsors-label">Patrocinadores:</span>
            <div class="sponsors-list">
              <span v-for="(s, i) in atleta.patrocinadores_actuales.slice(0, 3)" :key="i" class="sponsor-tag">
                {{ s }}
              </span>
              <span v-if="atleta.patrocinadores_actuales.length > 3" class="sponsor-more">
                +{{ atleta.patrocinadores_actuales.length - 3 }}
              </span>
            </div>
          </div>

          <div class="card-social">
            <a v-if="atleta.instagram_url" :href="atleta.instagram_url" target="_blank" class="social-link instagram">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a v-if="atleta.tiktok" :href="atleta.tiktok" target="_blank" class="social-link tiktok">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
              </svg>
            </a>
          </div>

          <div class="card-actions">
            <button class="action-btn view" @click="$emit('ver', atleta)">Ver Perfil</button>
            <button class="action-btn edit" @click="$emit('editar', atleta)">Editar</button>
            <button class="action-btn" :class="atleta.activo ? 'hide' : 'show'"
              @click="$emit('toggle-visibility', atleta)">
              {{ atleta.activo ? 'Ocultar' : 'Mostrar' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Atleta } from '../../types/talent'

const props = defineProps<{
  atletas: Atleta[]
  loading: boolean
}>()

const emit = defineEmits<{
  editar: [atleta: Atleta]
  ver: [atleta: Atleta]
  'toggle-visibility': [atleta: Atleta]
  refresh: []
}>()

const busqueda = ref('')
const filtroDisciplina = ref('')
const filtroChip = ref('')
const ordenamiento = ref<'ranking' | 'reciente' | 'completo' | 'alfabetico'>('ranking')
const mostrarSpotlight = ref(false)

const disciplinasUnicas = computed(() => {
  const set = new Set<string>()
  props.atletas.forEach(a => {
    if (a.disciplina) set.add(a.disciplina)
  })
  return Array.from(set).sort()
})

// Chips con conteo
const chips = computed(() => [
  {
    id: 'sin_portada',
    label: 'Sin portada',
    icon: '🖼️',
    count: props.atletas.filter(a => !a.portada).length
  },
  {
    id: 'sin_logros',
    label: 'Sin logros',
    icon: '🏅',
    count: props.atletas.filter(a => !a.mejor_posicion && !a.fecha_debut).length
  },
  {
    id: 'sin_redes',
    label: 'Sin redes',
    icon: '📱',
    count: props.atletas.filter(a => !a.instagram_url && !a.tiktok).length
  },
  {
    id: 'incompletos',
    label: 'Incompletos',
    icon: '⚠️',
    count: props.atletas.filter(a => !a.peso_kg || !a.altura_cm || !a.portada || !a.deporte_principal_id).length
  }
])

const atletasFiltrados = computed(() => {
  let result = [...props.atletas]

  // Filtro chip
  switch (filtroChip.value) {
    case 'sin_portada':
      result = result.filter(a => !a.portada)
      break
    case 'sin_logros':
      result = result.filter(a => !a.mejor_posicion && !a.fecha_debut)
      break
    case 'sin_redes':
      result = result.filter(a => !a.instagram_url && !a.tiktok)
      break
    case 'incompletos':
      result = result.filter(a => !a.peso_kg || !a.altura_cm || !a.portada || !a.deporte_principal_id)
      break
  }

  // Filtro disciplina
  if (filtroDisciplina.value) {
    result = result.filter(a => a.disciplina === filtroDisciplina.value)
  }

  // Búsqueda
  if (busqueda.value.trim()) {
    const q = busqueda.value.toLowerCase()
    result = result.filter(a =>
      a.nombre.toLowerCase().includes(q) ||
      (a.alias?.toLowerCase().includes(q)) ||
      (a.disciplina?.toLowerCase().includes(q)) ||
      (a.pais?.toLowerCase().includes(q))
    )
  }

  // Ordenamiento
  switch (ordenamiento.value) {
    case 'reciente':
      // Asumimos que id_atleta mayor = más reciente, o podemos usar fecha de creación si existe
      result.sort((a, b) => (b.id_atleta || 0) - (a.id_atleta || 0))
      break
    case 'completo':
      result.sort((a, b) => getCompletitud(b).porcentaje - getCompletitud(a).porcentaje)
      break
    case 'alfabetico':
      result.sort((a, b) => a.nombre.localeCompare(b.nombre))
      break
    case 'ranking':
    default:
      result.sort((a, b) => (a.ranking_nacional || 999) - (b.ranking_nacional || 999))
      break
  }

  return result
})

// Spotlight (solo primeros 5 resultados)
const atletasSpotlight = computed(() => {
  if (!busqueda.value.trim()) return []
  const q = busqueda.value.toLowerCase()
  return props.atletas
    .filter(a =>
      a.nombre.toLowerCase().includes(q) ||
      (a.alias?.toLowerCase().includes(q)) ||
      (a.disciplina?.toLowerCase().includes(q))
    )
    .slice(0, 5)
})

const totalVictorias = computed(() => {
  return atletasFiltrados.value.reduce((sum, a) => sum + (a.victorias || 0), 0)
})

const promedioRanking = computed(() => {
  const withRanking = atletasFiltrados.value.filter(a => a.ranking_nacional)
  if (withRanking.length === 0) return '—'
  const avg = withRanking.reduce((sum, a) => sum + (a.ranking_nacional || 0), 0) / withRanking.length
  return Math.round(avg)
})

function getRecord(atleta: Atleta): string {
  const v = atleta.victorias || 0
  const d = atleta.derrotas || 0
  const e = atleta.empates || 0
  return `${v}-${d}-${e}`
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '—'
  try {
    return new Date(dateStr).toLocaleDateString('es-GT', { year: 'numeric', month: 'short' })
  } catch {
    return dateStr
  }
}

function getCompletitud(atleta: Atleta) {
  const campos = [
    atleta.portada,
    atleta.peso_kg,
    atleta.altura_cm,
    atleta.ranking_nacional,
    atleta.victorias !== undefined,
    atleta.instagram_url || atleta.tiktok,
    atleta.deporte_principal_id
  ]
  const completados = campos.filter(Boolean).length
  const porcentaje = Math.round((completados / campos.length) * 100)
  let clase = 'bajo'
  if (porcentaje >= 80) clase = 'alto'
  else if (porcentaje >= 50) clase = 'medio'
  return { porcentaje, clase }
}

function seleccionarSpotlight(atleta: Atleta) {
  busqueda.value = atleta.nombre
  mostrarSpotlight.value = false
}

function onBlurSpotlight() {
  setTimeout(() => {
    mostrarSpotlight.value = false
  }, 150)
}
</script>

<style scoped>
.talent-publicados {
  color: #fff;
}

.toolbar {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.toolbar select,
.toolbar input {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 8px 12px;
  color: #fff;
  font-size: 0.85rem;
  outline: none;
}

.toolbar input {
  min-width: 200px;
}

.toolbar select option {
  background: #111;
}

/* Spotlight */
.search-spotlight {
  position: relative;
}

.spotlight-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  right: 0;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 6px;
  z-index: 50;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.6);
}

.spotlight-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.15s;
}

.spotlight-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.spotlight-img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.spotlight-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.spotlight-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: #fff;
}

.spotlight-meta {
  font-size: 0.7rem;
  color: #666;
}

/* Chips */
.chips-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.chip-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 100px;
  padding: 6px 14px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.78rem;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  cursor: pointer;
  transition: all 0.2s;
}

.chip-btn:hover {
  border-color: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.chip-btn.active {
  background: rgba(207, 46, 46, 0.12);
  border-color: var(--color-primary, #cf2e2e);
  color: var(--color-primary, #cf2e2e);
}

.chip-icon {
  font-size: 0.9rem;
}

.chip-count {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 1px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
}

.chip-btn.active .chip-count {
  background: rgba(207, 46, 46, 0.2);
}

.stats-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.stats-bar strong {
  color: #fff;
}

.stat-divider {
  color: rgba(255, 255, 255, 0.15);
}

.loading-state {
  text-align: center;
  padding: 60px 20px;
  color: #444;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--color-primary, #cf2e2e);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 12px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.9rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

/* Empty state útil */
.empty-state {
  text-align: center;
  padding: 60px 20px;
  color: #444;
}

.empty-state h3 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 12px 0 20px;
  letter-spacing: 0.04em;
}

.empty-icon {
  font-size: 3rem;
  margin-bottom: 12px;
  opacity: 0.5;
}

.empty-hint {
  font-size: 0.85rem;
  color: #555;
}

.checklist {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
  margin: 0 auto;
  text-align: left;
}

.checklist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 8px;
  padding: 12px 16px;
}

.check-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(207, 46, 46, 0.15);
  color: var(--color-primary, #cf2e2e);
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-weight: 700;
  font-size: 0.85rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.check-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.atletas-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.atleta-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}

.atleta-card:hover {
  transform: translateY(-3px);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.4);
}

.atleta-card.inactivo {
  opacity: 0.6;
}

.card-portada {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.card-portada img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.4s;
}

.atleta-card:hover .card-portada img {
  transform: scale(1.05);
}

.card-badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.badge-status {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 4px 10px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.badge-status.activo {
  background: rgba(0, 224, 144, 0.15);
  color: #00e090;
  border: 1px solid rgba(0, 224, 144, 0.2);
}

.badge-status.inactivo {
  background: rgba(100, 100, 100, 0.15);
  color: #888;
  border: 1px solid rgba(100, 100, 100, 0.2);
}

.badge-disciplina {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.6rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 3px 8px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
}

.card-alias {
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  padding: 3px 10px;
  border-radius: 4px;
}

/* Badge de completitud */
.completeness-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-size: 0.65rem;
  font-weight: 700;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  padding: 3px 8px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}

.completeness-badge.bajo {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.completeness-badge.medio {
  background: rgba(249, 115, 22, 0.2);
  color: #f97316;
}

.completeness-badge.alto {
  background: rgba(0, 224, 144, 0.2);
  color: #00e090;
}

.card-body {
  padding: 16px;
}

.card-body h4 {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 12px;
  letter-spacing: 0.03em;
}

.card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 12px;
}

.card-stats .stat-item {
  text-align: center;
  padding: 8px 4px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 6px;
}

.stat-val {
  font-family: 'DM Mono', monospace;
  font-size: 0.85rem;
  font-weight: 600;
  display: block;
  color: #fff;
}

.stat-lbl {
  font-size: 0.6rem;
  color: #555;
  letter-spacing: 0.1em;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-weight: 600;
  margin-top: 2px;
  display: block;
}

.card-info {
  margin-bottom: 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.78rem;
  padding: 3px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
}

.info-label {
  color: #555;
}

.info-value {
  color: rgba(255, 255, 255, 0.7);
}

.card-sponsors {
  margin-bottom: 12px;
}

.sponsors-label {
  font-size: 0.7rem;
  color: #555;
  display: block;
  margin-bottom: 6px;
}

.sponsors-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.sponsor-tag {
  font-size: 0.65rem;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.6);
}

.sponsor-more {
  font-size: 0.65rem;
  color: var(--color-primary, #cf2e2e);
}

.card-social {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
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

.card-actions {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.action-btn {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 6px 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.action-btn:hover {
  border-color: var(--color-primary, #cf2e2e);
  color: var(--color-primary, #cf2e2e);
}

.action-btn.view {
  background: rgba(207, 46, 46, 0.08);
  border-color: rgba(207, 46, 46, 0.2);
  color: var(--color-primary, #cf2e2e);
}

.action-btn.view:hover {
  background: rgba(207, 46, 46, 0.15);
}

.action-btn.edit:hover {
  border-color: #888;
  color: #888;
}

.action-btn.hide {
  border-color: rgba(255, 200, 0, 0.2);
  color: #ffc800;
}

.action-btn.hide:hover {
  background: rgba(255, 200, 0, 0.08);
}

.action-btn.show {
  border-color: rgba(0, 224, 144, 0.2);
  color: #00e090;
}

.action-btn.show:hover {
  background: rgba(0, 224, 144, 0.08);
}

@media (max-width: 768px) {
  .toolbar {
    flex-direction: column;
    align-items: stretch;
  }

  .stats-bar {
    margin-left: 0;
    justify-content: center;
  }

  .atletas-grid {
    grid-template-columns: 1fr;
  }

  .card-actions {
    flex-direction: column;
  }

  .card-actions .action-btn {
    flex: none;
    width: 100%;
  }
}
</style>
