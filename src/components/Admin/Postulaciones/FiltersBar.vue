<template>
  <div class="filters-bar">
    <div class="filter-group">
      <ion-icon :icon="searchOutline"></ion-icon>
      <input
        :value="modelValue.busqueda"
        @input="$emit('update:modelValue', { ...modelValue, busqueda: ($event.target as HTMLInputElement).value })"
        type="text"
        placeholder="Buscar por nombre, email, empresa..."
      />
    </div>
    <div class="filter-group">
      <select
        :value="modelValue.tipo"
        @change="$emit('update:modelValue', { ...modelValue, tipo: ($event.target as HTMLSelectElement).value })"
      >
        <option value="">Todos los tipos</option>
        <option value="atleta">Atleta</option>
        <option value="sponsor">Sponsor</option>
        <option value="inversionista">Inversionista</option>
      </select>
    </div>
    <div class="filter-group">
      <select
        :value="modelValue.estado"
        @change="$emit('update:modelValue', { ...modelValue, estado: ($event.target as HTMLSelectElement).value })"
      >
        <option value="">Todos los estados</option>
        <option value="pendiente">Pendiente</option>
        <option value="en_revision">En revisión</option>
        <option value="documentos">Documentos</option>
        <option value="entrevista">Entrevista</option>
        <option value="aprobado">Aprobado</option>
        <option value="rechazado">Rechazado</option>
      </select>
    </div>
    <button class="btn-clear" @click="$emit('limpiar')" v-if="hayFiltros">
      <ion-icon :icon="closeOutline"></ion-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { searchOutline, closeOutline } from 'ionicons/icons'
import { computed } from 'vue'

export interface Filtros {
  busqueda: string
  tipo: string
  estado: string
}

const props = defineProps<{
  modelValue: Filtros
}>()

defineEmits<{
  (e: 'update:modelValue', value: Filtros): void
  (e: 'limpiar'): void
}>()

const hayFiltros = computed(() => {
  return props.modelValue.busqueda || props.modelValue.tipo || props.modelValue.estado
})
</script>

<style scoped>
.filters-bar {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0 14px;
  flex: 1;
  min-width: 200px;
}

.filter-group ion-icon {
  font-size: 1rem;
  color: var(--color-text-muted);
}

.filter-group input,
.filter-group select {
  flex: 1;
  background: transparent;
  border: none;
  padding: 12px 0;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
}

.filter-group input::placeholder {
  color: rgba(255, 255, 255, 0.25);
}

.btn-clear {
  width: 40px;
  height: 40px;
  border-radius: var(--border-radius);
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.btn-clear:hover {
  background: rgba(207, 46, 46, 0.15);
  border-color: var(--color-primary);
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .filters-bar {
    gap: 8px;
  }
  .filter-group {
    min-width: auto;
    flex: 1 1 45%;
  }
  .filter-group:first-child {
    flex: 1 1 100%;
  }
}

@media (max-width: 480px) {
  .filters-bar {
    gap: 6px;
  }
  .filter-group {
    flex: 1 1 42%;
    padding: 0 10px;
    min-height: 40px;
  }
  .filter-group:first-child {
    flex: 1 1 100%;
  }
  .filter-group input,
  .filter-group select {
    font-size: 0.85rem;
    padding: 10px 0;
  }
  .btn-clear {
    width: 36px;
    height: 36px;
  }
}
</style>
