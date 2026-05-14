<template>
  <div class="kanban-board">
    <div
      v-for="columna in columnasKanban"
      :key="columna.estado"
      class="kanban-column"
      :class="columna.estado"
    >
      <div class="column-header">
        <span class="column-dot" :style="{ background: columna.color }"></span>
        <span class="column-title">{{ columna.titulo }}</span>
        <span class="column-count">{{ postulacionesPorEstado(columna.estado).length }}</span>
      </div>

      <div class="column-cards">
        <KanbanCard
          v-for="p in postulacionesPorEstado(columna.estado)"
          :key="p.id"
          :postulacion="p"
          @click="$emit('abrirDetalle', $event)"
          @cambiar-estado="(id, estado) => $emit('cambiarEstado', id, estado)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Postulacion, columnasKanban } from './postulacionesUtils'
import KanbanCard from './KanbanCard.vue'

const props = defineProps<{
  postulaciones: Postulacion[]
}>()

defineEmits<{
  (e: 'abrirDetalle', postulacion: Postulacion): void
  (e: 'cambiarEstado', id: number, estado: string): void
}>()

const postulacionesPorEstado = (estado: string) => {
  return props.postulaciones.filter(p => p.estado === estado)
}
</script>

<style scoped>
.kanban-board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  align-items: flex-start;
}

.kanban-column {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 16px;
  min-height: 300px;
}

.column-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.column-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.column-title {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex: 1;
}

.column-count {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 8px;
  border-radius: 10px;
}

.column-cards {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 1024px) {
  .kanban-board {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .kanban-board {
    display: flex;
    gap: 12px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 8px;
  }
  .kanban-board::-webkit-scrollbar {
    display: none;
  }
  .kanban-column {
    flex: 0 0 85vw;
    max-width: 320px;
    min-width: 260px;
    scroll-snap-align: start;
    padding: 12px;
    min-height: auto;
    max-height: calc(100vh - 280px);
    overflow-y: auto;
  }
  .column-header {
    margin-bottom: 12px;
    padding-bottom: 8px;
    position: sticky;
    top: 0;
    background: inherit;
    z-index: 2;
  }
  .column-title {
    font-size: 0.75rem;
  }
  .column-count {
    font-size: 0.7rem;
  }
}
</style>
