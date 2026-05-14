<template>
  <div class="table-view">
    <div class="table-toolbar">
      <div class="search-box">
        <ion-icon :icon="searchOutline"></ion-icon>
        <input
          :value="busqueda"
          @input="$emit('update:busqueda', ($event.target as HTMLInputElement).value)"
          type="text"
          placeholder="Buscar por nombre, email, empresa..."
        />
      </div>
      <div class="table-stats">
        <span class="stats-count">{{ postulaciones.length }}</span>
        <span class="stats-label">registros</span>
      </div>
    </div>

    <div class="table-container">
      <div class="table-scroll">
        <div class="table-wrapper">
          <div class="table-header">
            <div class="header-row">
              <div class="col col-id sortable" @click="toggleSort('id')">
                <span>ID</span>
                <span class="sort-icon" :class="{ active: sortField === 'id' }">
                  <ion-icon :icon="sortDirection === 'asc' ? arrowUp : arrowDown"></ion-icon>
                </span>
              </div>
              <div class="col col-tipo sortable" @click="toggleSort('tipo')">
                <span>Tipo</span>
              </div>
              <div class="col col-nombre sortable" @click="toggleSort('nombre')">
                <span>Nombre</span>
              </div>
              <div class="col col-email">Email</div>
              <div class="col col-telefono">Teléfono</div>
              <div class="col col-ciudad">Ciudad</div>
              <div class="col col-departamento">Departamento</div>
              <div class="col col-estado sortable" @click="toggleSort('estado')">
                <span>Estado</span>
              </div>
              <div class="col col-fecha sortable" @click="toggleSort('created_at')">
                <span>Fecha</span>
              </div>
              <div class="col col-acciones">Acciones</div>
            </div>
          </div>

          <div class="table-body">
            <div
              v-for="p in postulacionesOrdenadas"
              :key="p.id"
              class="data-row"
              :class="p.tipo"
              @click="$emit('abrirDetalle', p)"
            >
              <div class="col col-id">#{{ p.id }}</div>
              <div class="col col-tipo">
                <span class="tipo-badge" :class="p.tipo">{{ labelTipo(p.tipo) }}</span>
              </div>
              <div class="col col-nombre">
                <div class="name-cell">
                  <div class="avatar-mini" :class="p.tipo">
                    <ion-icon :icon="avatarIcon(p.tipo)"></ion-icon>
                  </div>
                  <span>{{ p.nombre }}</span>
                </div>
              </div>
              <div class="col col-email">{{ p.email || '-' }}</div>
              <div class="col col-telefono">{{ p.telefono || '-' }}</div>
              <div class="col col-ciudad">{{ p.ciudad || '-' }}</div>
              <div class="col col-departamento">{{ p.departamento || '-' }}</div>
              <div class="col col-estado">
                <span class="estado-badge" :style="{ background: colorEstado(p.estado) }">
                  {{ labelEstado(p.estado) }}
                </span>
              </div>
              <div class="col col-fecha">{{ formatFechaCorta(p.created_at) }}</div>
              <div class="col col-acciones" @click.stop>
                <button
                  class="action-btn"
                  @click="$emit('cambiarEstado', p.id, 'aprobado')"
                  title="Aprobar"
                  v-if="p.estado !== 'aprobado'"
                >
                  <ion-icon :icon="checkmarkOutline" color="success"></ion-icon>
                </button>
                <button
                  class="action-btn"
                  @click="$emit('cambiarEstado', p.id, 'rechazado')"
                  title="Rechazar"
                  v-if="p.estado !== 'rechazado'"
                >
                  <ion-icon :icon="closeOutline" color="danger"></ion-icon>
                </button>
                <button class="action-btn" @click="$emit('abrirDetalle', p)" title="Ver detalle">
                  <ion-icon :icon="documentTextOutline" color="primary"></ion-icon>
                </button>
              </div>
            </div>

            <div v-if="postulacionesOrdenadas.length === 0" class="empty-state">
              <ion-icon :icon="peopleOutline"></ion-icon>
              <p>No se encontraron postulaciones</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { IonIcon } from '@ionic/vue'
import {
  searchOutline, checkmarkOutline, closeOutline, documentTextOutline,
  peopleOutline, arrowUp, arrowDown
} from 'ionicons/icons'
import { Postulacion, labelTipo, labelEstado, colorEstado, avatarIcon, formatFechaCorta } from './postulacionesUtils'

const props = defineProps<{
  postulaciones: Postulacion[]
  busqueda: string
}>()

defineEmits<{
  (e: 'update:busqueda', value: string): void
  (e: 'abrirDetalle', postulacion: Postulacion): void
  (e: 'cambiarEstado', id: number, estado: string): void
}>()

const sortField = ref('created_at')
const sortDirection = ref('desc')

const toggleSort = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const postulacionesOrdenadas = computed(() => {
  const sorted = [...props.postulaciones]
  sorted.sort((a: Postulacion, b: Postulacion) => {
    const aVal = (a as any)[sortField.value]
    const bVal = (b as any)[sortField.value]
    if (sortField.value === 'created_at') {
      const aDate = new Date(aVal).getTime()
      const bDate = new Date(bVal).getTime()
      return sortDirection.value === 'asc' ? aDate - bDate : bDate - aDate
    }
    if (typeof aVal === 'number') {
      return sortDirection.value === 'asc' ? aVal - bVal : bVal - aVal
    }
    const aStr = String(aVal || '')
    const bStr = String(bVal || '')
    return sortDirection.value === 'asc'
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr)
  })
  return sorted
})
</script>

<style scoped>
.table-view {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.table-toolbar {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0 14px;
  flex: 1;
  min-width: 250px;
}

.search-box ion-icon {
  color: var(--color-text-muted);
  font-size: 1rem;
}

.search-box input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 0;
  color: var(--color-text);
  font-size: 0.9rem;
  outline: none;
}

.search-box input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.table-stats {
  display: flex;
  align-items: baseline;
  gap: 4px;
  padding: 8px 14px;
  background: rgba(207, 46, 46, 0.1);
  border-radius: 8px;
}

.table-stats .stats-count {
  font-size: 1rem;
  font-weight: 800;
  color: var(--color-primary);
}

.table-stats .stats-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
}

.table-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
}

.table-scroll {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
}

.table-wrapper {
  min-width: 900px;
}

.table-header {
  background: linear-gradient(180deg, #1a1a1a 0%, #141414 100%);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 10;
}

.header-row {
  display: flex;
}

.table-header .col {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.table-body {
  max-height: calc(100vh - 400px);
  overflow-y: auto;
}

.col {
  padding: 14px 10px;
  font-size: 0.8rem;
  color: var(--color-text);
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.col-id { width: 60px; }
.col-tipo { width: 90px; }
.col-nombre { width: 180px; }
.col-email { width: 180px; }
.col-telefono { width: 100px; }
.col-ciudad { width: 100px; }
.col-departamento { width: 120px; }
.col-estado { width: 100px; }
.col-fecha { width: 100px; }
.col-acciones { width: 100px; text-align: center; }

.sortable {
  cursor: pointer;
  user-select: none;
}

.sortable:hover {
  color: var(--color-text);
}

.sort-icon {
  margin-left: 4px;
  opacity: 0.3;
  font-size: 0.7rem;
}

.sort-icon.active {
  opacity: 1;
  color: var(--color-primary);
}

.data-row {
  display: flex;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  transition: all 0.15s ease;
  cursor: pointer;
}

.data-row:hover {
  background: rgba(207, 46, 46, 0.05);
}

.data-row.atleta { border-left: 3px solid #EF4444; }
.data-row.sponsor { border-left: 3px solid #3B82F6; }
.data-row.inversionista { border-left: 3px solid #10B981; }

.tipo-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.tipo-badge.atleta {
  background: rgba(239, 68, 68, 0.15);
  color: #EF4444;
}

.tipo-badge.sponsor {
  background: rgba(59, 130, 246, 0.15);
  color: #3B82F6;
}

.tipo-badge.inversionista {
  background: rgba(16, 185, 129, 0.15);
  color: #10B981;
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar-mini {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  flex-shrink: 0;
}

.avatar-mini.atleta { background: rgba(239, 68, 68, 0.15); color: #EF4444; }
.avatar-mini.sponsor { background: rgba(59, 130, 246, 0.15); color: #3B82F6; }
.avatar-mini.inversionista { background: rgba(16, 185, 129, 0.15); color: #10B981; }

.estado-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

.col-email, .col-telefono, .col-ciudad, .col-departamento {
  color: var(--color-text-muted);
}

.col-fecha {
  color: var(--color-text-muted);
  font-size: 0.75rem;
}

.col-acciones {
  display: flex;
  justify-content: center;
  gap: 4px;
}

.action-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: var(--color-primary);
}

.action-btn ion-icon {
  font-size: 0.9rem;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-state ion-icon {
  font-size: 3rem;
  color: var(--color-text-muted);
  margin-bottom: 12px;
}

.empty-state p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin: 0;
}

@media (max-width: 1024px) {
  .table-toolbar {
    flex-direction: column;
    align-items: stretch;
  }
  .search-box {
    min-width: auto;
  }
  .table-stats {
    align-self: flex-start;
  }
}

@media (max-width: 768px) {
  .table-container {
    border-radius: var(--border-radius);
  }
  .col {
    padding: 10px 8px;
    font-size: 0.75rem;
  }
  .col-id { width: 50px; }
  .col-tipo { width: 70px; }
  .col-nombre { width: 160px; }
  .col-email { width: 150px; }
  .col-telefono { width: 90px; }
  .col-ciudad { width: 90px; }
  .col-departamento { width: 100px; }
  .col-estado { width: 90px; }
  .col-fecha { width: 85px; }
  .col-acciones { width: 90px; }
}

@media (max-width: 640px) {
  .table-wrapper {
    min-width: auto;
  }
  .col-email,
  .col-telefono,
  .col-ciudad,
  .col-departamento {
    display: none !important;
  }
  .col-id { width: 45px; }
  .col-tipo { width: 65px; }
  .col-nombre { width: 150px; }
  .col-estado { width: 85px; }
  .col-fecha { width: 75px; }
  .col-acciones { width: 85px; }
  .table-body {
    max-height: calc(100vh - 350px);
  }
}
</style>
