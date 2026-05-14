<template>
  <div class="filter-container">
    <button
      v-for="filter in filters"
      :key="filter"
      :class="['filter-btn', { active: modelValue === filter }]"
      @click="$emit('update:modelValue', filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  filters: string[]
  modelValue: string
}>()

defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<style scoped>
.filter-container {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.filter-btn:hover {
  border-color: var(--color-primary, #EF4444);
  color: var(--color-primary, #EF4444);
  background: rgba(239, 68, 68, 0.08);
}

.filter-btn.active {
  color: #fff;
  background: var(--color-primary, #EF4444);
  border-color: var(--color-primary, #EF4444);
}

.filter-btn.active:hover {
  background: #dc2626;
  border-color: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

@media (max-width: 768px) {
  .filter-container {
    justify-content: flex-start;
    gap: 8px;
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 8px;
    margin-bottom: 30px;
  }
  .filter-container::-webkit-scrollbar {
    display: none;
  }
  .filter-btn {
    padding: 8px 14px;
    font-size: 0.72rem;
    white-space: nowrap;
    flex-shrink: 0;
  }
}

@media (max-width: 480px) {
  .filter-btn {
    padding: 7px 12px;
    font-size: 0.7rem;
  }
}
</style>
