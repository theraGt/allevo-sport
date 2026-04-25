<template>
  <ion-page>
    <DashboardLayout>
      <div class="dashboard-proyectos">
        <div class="page-header">
          <div class="title-row">
            <div class="sep"></div>
            <span class="section-label">PANEL DE PROYECTOS</span>
          </div>
          <h1 class="page-title">
            GESTIÓN DE
            <span class="title-sub">PROYECTOS</span>
          </h1>
        </div>

        <div class="kpi-grid animate-up" style="animation-delay: 0.1s">
          <StatsCard label="TOTAL PROYECTOS" :value="proyectos.length" format="number" type="red" />
          <StatsCard label="ACTIVOS" :value="proyectosActivos" format="number" type="green" />
          <StatsCard label="EN FINANCIAMIENTO" :value="proyectosEnFinanciamiento" format="number" type="gold" />
          <StatsCard label="FINANCIADOS" :value="proyectosFinanciados" format="number" type="default" />
        </div>

        <div class="filters-row animate-up" style="animation-delay: 0.15s">
          <div class="filter-tabs">
            <button 
              v-for="filtro in filtros" 
              :key="filtro.value"
              class="filter-tab"
              :class="{ active: filtroActivo === filtro.value }"
              @click="filtroActivo = filtro.value"
            >
              {{ filtro.label }}
            </button>
          </div>
          <div class="search-box">
            <input type="text" v-model="busqueda" placeholder="Buscar proyecto..." />
          </div>
        </div>

        <div class="proyectos-grid animate-up" style="animation-delay: 0.2s">
          <div v-for="proyecto in proyectosFiltrados" :key="proyecto.id" class="proyecto-card">
            <div class="proyecto-header">
              <img :src="proyecto.imagen" :alt="proyecto.nombre" class="proyecto-img" />
              <div class="proyecto-badges">
                <span class="badge" :class="'badge-' + proyecto.estado">{{ proyecto.estado }}</span>
                <span class="badge badge-tier">{{ proyecto.tier }}</span>
              </div>
            </div>

            <div class="proyecto-body">
              <h3>{{ proyecto.nombre }}</h3>
              <span class="proyecto-tipo">{{ proyecto.tipo }}</span>
              <span class="proyecto-atleta">{{ proyecto.atleta }}</span>

              <div class="proyecto-stats">
                <div class="stat-item">
                  <span class="stat-val">Q{{ proyecto.meta.toLocaleString() }}</span>
                  <span class="stat-lbl">META</span>
                </div>
                <div class="stat-item">
                  <span class="stat-val">Q{{ proyecto.recaudado.toLocaleString() }}</span>
                  <span class="stat-lbl">RECAUDADO</span>
                </div>
                <div class="stat-item">
                  <span class="stat-val">{{ proyecto.progreso }}%</span>
                  <span class="stat-lbl">PROGRESO</span>
                </div>
              </div>

              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: proyecto.progreso + '%' }"></div>
              </div>

              <div class="proyecto-footer">
                <span class="inversores">{{ proyecto.inversores }} inversores</span>
                <span class="retorno">~{{ proyecto.retorno }}% retorno</span>
              </div>
            </div>

            <div class="proyecto-actions">
              <button class="btn-outline">VER DETALLES</button>
              <button class="btn-primary" v-if="proyecto.estado === 'activo'">INVERTIR</button>
            </div>
          </div>
        </div>

        <div class="page-spacer"></div>
      </div>
    </DashboardLayout>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonPage } from '@ionic/vue'
import DashboardLayout from '../../components/Admin/Dashboard/DashboardLayout.vue'
import StatsCard from '../../components/Admin/Dashboard/StatsCard.vue'

interface Proyecto {
  id: number
  nombre: string
  tipo: string
  atleta: string
  imagen: string
  meta: number
  recaudado: number
  progreso: number
  estado: 'activo' | 'en Financiamiento' | 'financiado'
  tier: string
  inversores: number
  retorno: number
}

const filtroActivo = ref('todos')
const busqueda = ref('')

const filtros = [
  { label: 'TODOS', value: 'todos' },
  { label: 'ACTIVOS', value: 'activo' },
  { label: 'EN FINANCIAMIENTO', value: 'en Financiamiento' },
  { label: 'FINANCIADOS', value: 'financiado' }
]

const proyectos = ref<Proyecto[]>([
  {
    id: 1,
    nombre: 'ALEV-NF-001',
    tipo: 'Tokenización Atleta',
    atleta: 'Carlos Ramírez',
    imagen: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=400',
    meta: 50000,
    recaudado: 42500,
    progreso: 85,
    estado: 'activo',
    tier: 'GOLD',
    inversores: 28,
    retorno: 2.5
  },
  {
    id: 2,
    nombre: 'ALEV-NF-002',
    tipo: 'Tokenización Atleta',
    atleta: 'Maria González',
    imagen: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400',
    meta: 75000,
    recaudado: 30000,
    progreso: 40,
    estado: 'en Financiamiento',
    tier: 'PLATINUM',
    inversores: 15,
    retorno: 3.2
  },
  {
    id: 3,
    nombre: 'ALEV-NF-003',
    tipo: 'Tokenización Atleta',
    atleta: 'Juan Pérez',
    imagen: 'https://images.unsplash.com/photo-1517838277536-f7f8be9e4f28?w=400',
    meta: 35000,
    recaudado: 35000,
    progreso: 100,
    estado: 'financiado',
    tier: 'SILVER',
    inversores: 42,
    retorno: 1.8
  },
  {
    id: 4,
    nombre: 'ALEV-NF-004',
    tipo: 'Tokenización Atleta',
    atleta: 'Ana Martínez',
    imagen: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f3b9?w=400',
    meta: 60000,
    recaudado: 18000,
    progreso: 30,
    estado: 'en Financiamiento',
    tier: 'GOLD',
    inversores: 9,
    retorno: 2.1
  },
  {
    id: 5,
    nombre: 'ALEV-NF-005',
    tipo: 'Tokenización Atleta',
    atleta: 'Luis Fernández',
    imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c301a?w=400',
    meta: 45000,
    recaudado: 45000,
    progreso: 100,
    estado: 'financiado',
    tier: 'PLATINUM',
    inversores: 35,
    retorno: 2.8
  },
  {
    id: 6,
    nombre: 'ALEV-NF-006',
    tipo: 'Tokenización Atleta',
    atleta: 'Sofia Torres',
    imagen: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400',
    meta: 80000,
    recaudado: 56000,
    progreso: 70,
    estado: 'activo',
    tier: 'DIAMOND',
    inversores: 52,
    retorno: 3.5
  }
])

const proyectosActivos = computed(() => 
  proyectos.value.filter(p => p.estado === 'activo').length
)

const proyectosEnFinanciamiento = computed(() => 
  proyectos.value.filter(p => p.estado === 'en Financiamiento').length
)

const proyectosFinanciados = computed(() => 
  proyectos.value.filter(p => p.estado === 'financiado').length
)

const proyectosFiltrados = computed(() => {
  let resultado = proyectos.value
  
  if (filtroActivo.value !== 'todos') {
    resultado = resultado.filter(p => p.estado === filtroActivo.value)
  }
  
  if (busqueda.value) {
    const search = busqueda.value.toLowerCase()
    resultado = resultado.filter(p => 
      p.nombre.toLowerCase().includes(search) ||
      p.atleta.toLowerCase().includes(search) ||
      p.tipo.toLowerCase().includes(search)
    )
  }
  
  return resultado
})
</script>

<style scoped>
.dashboard-proyectos {
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  width: 4px;
  height: 20px;
  background: var(--color-primary);
}

.section-label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: var(--color-muted);
}

.page-title {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1;
  color: var(--color-text);
}

.title-sub {
  color: var(--color-primary);
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.filters-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.filter-tabs {
  display: flex;
  gap: 4px;
}

.filter-tab {
  padding: 10px 16px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-muted);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.25s;
}

.filter-tab:hover {
  border-color: var(--color-primary);
  color: var(--color-text);
}

.filter-tab.active {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
}

.search-box input {
  padding: 10px 16px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.85rem;
  width: 240px;
}

.search-box input:focus {
  outline: none;
  border-color: var(--color-primary);
}

.proyectos-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.proyecto-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.proyecto-header {
  position: relative;
  height: 140px;
  overflow: hidden;
}

.proyecto-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.proyecto-badges {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: 6px;
}

.badge {
  padding: 4px 8px;
  font-family: var(--font-heading);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.badge-activo {
  background: #00e090;
  color: #000;
}

.badge-en\ Financiamiento {
  background: #c9a227;
  color: #000;
}

.badge-financiado {
  background: var(--color-surface2);
  color: var(--color-muted);
}

.badge-tier {
  background: var(--color-primary);
  color: #fff;
}

.proyecto-body {
  padding: 16px;
  flex: 1;
}

.proyecto-body h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  margin-bottom: 4px;
}

.proyecto-tipo {
  font-size: 0.75rem;
  color: var(--color-muted);
}

.proyecto-atleta {
  display: block;
  font-size: 0.8rem;
  color: var(--color-primary);
  margin-bottom: 12px;
}

.proyecto-stats {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.stat-item {
  flex: 1;
}

.stat-val {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.95rem;
  font-weight: 700;
}

.stat-lbl {
  font-size: 0.65rem;
  color: var(--color-muted);
  letter-spacing: 0.1em;
}

.progress-bar {
  height: 4px;
  background: var(--color-surface2);
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: var(--color-primary);
}

.proyecto-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.7rem;
  color: var(--color-muted);
}

.inversores {
  color: var(--color-primary);
}

.proyecto-actions {
  padding: 12px 16px;
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: 8px;
}

.btn-outline {
  flex: 1;
  padding: 10px;
  background: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.btn-primary {
  flex: 1;
  padding: 10px;
  background: var(--color-primary);
  border: none;
  color: #fff;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.25s;
}

.btn-primary:hover {
  box-shadow: 0 0 20px rgba(207, 46, 46, 0.4);
}

.page-spacer {
  height: 60px;
}

@media (max-width: 1200px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .proyectos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
  }
  
  .kpi-grid,
  .proyectos-grid {
    grid-template-columns: 1fr;
  }
  
  .filter-tabs {
    width: 100%;
    overflow-x: auto;
  }
  
  .search-box input {
    width: 100%;
  }
}
</style>