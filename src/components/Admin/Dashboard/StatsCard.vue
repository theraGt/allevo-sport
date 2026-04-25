<template>
  <div class="stat-card" :class="[type, { 'animate-up': animate }]" :style="{ animationDelay: delay }">
    <div class="stat-label">{{ label }}</div>
    <div class="stat-value" :class="valueClass">{{ formattedValue }}</div>
    <div v-if="subLabel" class="stat-sublabel">{{ subLabel }}</div>
    <div v-if="change !== null" class="stat-change" :class="changeClass">
      <svg v-if="change > 0" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <path d="M5 1L9 7H1z"/>
      </svg>
      <svg v-else-if="change < 0" width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
        <path d="M1 3L9 3M5 9L1 3L9 3"/>
      </svg>
      {{ change > 0 ? '+' : '' }}{{ change }}%
      <span v-if="changeTime">({{ changeTime }})</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  label: string
  value: number | string
  subLabel?: string
  type?: 'red' | 'gold' | 'green' | 'default'
  change?: number
  changeTime?: string
  format?: 'currency' | 'percent' | 'number' | 'default'
  animate?: boolean
  delay?: string
}>()

const formattedValue = computed(() => {
  if (typeof props.value === 'string') return props.value
  
  switch (props.format) {
    case 'currency':
      return '$' + props.value.toLocaleString()
    case 'percent':
      return props.value + '%'
    case 'number':
      return props.value.toLocaleString()
    default:
      return props.value.toString()
  }
})

const valueClass = computed(() => {
  if (props.type === 'gold') return 'text-gold'
  if (props.type === 'green') return 'text-green'
  if (props.type === 'red') return 'text-red'
  return ''
})

const changeClass = computed(() => {
  if (props.change === null || props.change === undefined) return ''
  if (props.change > 0) return 'change-up'
  if (props.change < 0) return 'change-down'
  return 'change-neutral'
})
</script>

<style scoped>
.stat-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%);
  opacity: 0.5;
}

.stat-card.red {
  border-left: 2px solid var(--color-primary);
}

.stat-card.gold {
  border-left: 2px solid #c9a84c;
}

.stat-card.green {
  border-left: 2px solid #00e090;
}

.stat-label {
  font-size: 10px;
  color: #666;
  letter-spacing: 0.15em;
  font-family: var(--font-heading);
  font-weight: 700;
  margin-bottom: 8px;
}

.stat-value {
  font-family: 'DM Mono', monospace;
  font-size: 26px;
  font-weight: 500;
  line-height: 1;
  color: #fff;
}

.stat-sublabel {
  font-size: 10px;
  color: #555;
  margin-top: 3px;
  font-family: 'DM Mono', monospace;
}

.stat-change {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  margin-top: 8px;
}

.text-gold {
  color: #c9a84c !important;
}

.text-green {
  color: #00e090 !important;
}

.change-up {
  color: #00e090;
}

.change-down {
  color: var(--color-primary);
}

.change-neutral {
  color: #888;
}

.animate-up {
  opacity: 0;
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
</style>