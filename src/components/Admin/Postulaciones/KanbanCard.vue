<template>
  <div class="kanban-card" :class="postulacion.tipo" @click="$emit('click', postulacion)">
    <div class="card-header">
      <div class="card-avatar" :class="postulacion.tipo">
        <ion-icon :icon="avatarIcon(postulacion.tipo)"></ion-icon>
      </div>
      <div class="card-meta">
        <div class="card-name">{{ postulacion.nombre }}</div>
        <div class="card-type">{{ labelTipo(postulacion.tipo) }}</div>
      </div>
    </div>

    <div class="card-body">
      <div class="card-field" v-if="datoExtra(postulacion, 'deporte') || datoExtra(postulacion, 'industria') || datoExtra(postulacion, 'profesion')">
        <ion-icon :icon="briefcaseOutline"></ion-icon>
        <span>{{ datoExtra(postulacion, 'deporte') || datoExtra(postulacion, 'industria') || datoExtra(postulacion, 'profesion') }}</span>
      </div>
      <div class="card-field">
        <ion-icon :icon="locationOutline"></ion-icon>
        <span>{{ postulacion.ciudad || 'Sin ciudad' }}{{ postulacion.departamento ? ', ' + postulacion.departamento : '' }}</span>
      </div>
      <div class="card-field">
        <ion-icon :icon="mailOutline"></ion-icon>
        <span>{{ postulacion.email }}</span>
      </div>
      <div class="card-field">
        <ion-icon :icon="callOutline"></ion-icon>
        <span>{{ postulacion.telefono || 'Sin teléfono' }}</span>
      </div>
    </div>

    <div class="card-footer">
      <span class="card-date">{{ fechaRelativa(postulacion.created_at) }}</span>
      <div class="card-actions" @click.stop>
        <button
          v-for="next in nextEstados(postulacion.estado)"
          :key="next"
          class="btn-mover"
          :style="{ background: colorEstado(next) }"
          @click="$emit('cambiarEstado', postulacion.id, next)"
        >
          {{ labelEstado(next) }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { briefcaseOutline, locationOutline, mailOutline, callOutline } from 'ionicons/icons'
import { Postulacion, labelTipo, labelEstado, colorEstado, avatarIcon, nextEstados, fechaRelativa, datoExtra } from './postulacionesUtils'

defineProps<{
  postulacion: Postulacion
}>()

defineEmits<{
  (e: 'click', postulacion: Postulacion): void
  (e: 'cambiarEstado', id: number, estado: string): void
}>()
</script>

<style scoped>
.kanban-card {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.kanban-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.kanban-card.atleta { border-left: 3px solid #EF4444; }
.kanban-card.sponsor { border-left: 3px solid #3B82F6; }
.kanban-card.inversionista { border-left: 3px solid #10B981; }

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.card-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}

.card-avatar.atleta { background: rgba(239, 68, 68, 0.15); color: #EF4444; }
.card-avatar.sponsor { background: rgba(59, 130, 246, 0.15); color: #3B82F6; }
.card-avatar.inversionista { background: rgba(16, 185, 129, 0.15); color: #10B981; }

.card-name {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--color-text);
  font-weight: 600;
}

.card-type {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
}

.card-field {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.card-field ion-icon {
  font-size: 0.9rem;
  color: var(--color-primary);
  flex-shrink: 0;
}

.card-field span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.card-date {
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
}

.card-actions {
  display: flex;
  gap: 6px;
}

.btn-mover {
  padding: 4px 10px;
  border-radius: 6px;
  border: none;
  color: #fff;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  opacity: 0.85;
  transition: opacity 0.2s ease;
}

.btn-mover:hover {
  opacity: 1;
}

@media (max-width: 768px) {
  .kanban-card {
    padding: 12px;
  }
  .card-avatar {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  .card-name {
    font-size: 0.9rem;
  }
  .card-body {
    gap: 6px;
    margin-bottom: 12px;
  }
  .card-field {
    font-size: 0.8rem;
  }
  .card-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .card-actions {
    width: 100%;
    flex-wrap: wrap;
    gap: 8px;
  }
  .btn-mover {
    flex: 1 1 45%;
    padding: 8px 10px;
    font-size: 0.7rem;
    text-align: center;
    min-height: 36px;
  }
}

@media (max-width: 480px) {
  .kanban-card {
    padding: 10px;
  }
  .card-avatar {
    width: 32px;
    height: 32px;
  }
  .card-name {
    font-size: 0.85rem;
  }
  .card-field {
    font-size: 0.75rem;
  }
  .card-field ion-icon {
    font-size: 0.85rem;
  }
  .card-field span {
    max-width: 180px;
  }
  .btn-mover {
    flex: 1 1 100%;
    padding: 8px;
    font-size: 0.7rem;
  }
}
</style>
