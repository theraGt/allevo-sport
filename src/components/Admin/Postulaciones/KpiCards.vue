<template>
  <div class="kpis-grid">
    <div class="kpi-card">
      <div class="kpi-value">{{ stats.total }}</div>
      <div class="kpi-label">Total</div>
    </div>
    <div class="kpi-card atleta">
      <div class="kpi-value">{{ stats.atletas }}</div>
      <div class="kpi-label">Atletas</div>
    </div>
    <div class="kpi-card sponsor">
      <div class="kpi-value">{{ stats.sponsors }}</div>
      <div class="kpi-label">Sponsors</div>
    </div>
    <div class="kpi-card inversionista">
      <div class="kpi-value">{{ stats.inversionistas }}</div>
      <div class="kpi-label">Inversionistas</div>
    </div>
    <div class="kpi-card pendiente">
      <div class="kpi-value">{{ stats.pendientes }}</div>
      <div class="kpi-label">Pendientes</div>
    </div>
    <div class="kpi-card aprobado">
      <div class="kpi-value">{{ stats.aprobados }}</div>
      <div class="kpi-label">Aprobados</div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Stats {
  total: number
  atletas: number
  sponsors: number
  inversionistas: number
  pendientes: number
  aprobados: number
}

defineProps<{
  stats: Stats
}>()
</script>

<style scoped>
.kpis-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  width: 100%;
}

.kpi-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 16px;
  text-align: center;
  transition: all 0.2s ease;
}

.kpi-card:hover {
  border-color: rgba(255, 255, 255, 0.15);
}

.kpi-value {
  font-family: var(--font-heading);
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-text);
}

.kpi-label {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-top: 4px;
}

.kpi-card.atleta { border-left: 3px solid #EF4444; }
.kpi-card.sponsor { border-left: 3px solid #3B82F6; }
.kpi-card.inversionista { border-left: 3px solid #10B981; }
.kpi-card.pendiente { border-left: 3px solid #F59E0B; }
.kpi-card.aprobado { border-left: 3px solid #10B981; }

@media (max-width: 1024px) {
  .kpis-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .kpis-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }
  .kpi-card {
    padding: 10px 8px;
    border-radius: 10px;
  }
  .kpi-value {
    font-size: 1.2rem;
  }
  .kpi-label {
    font-size: 0.6rem;
  }
}

@media (max-width: 480px) {
  .kpis-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .kpi-card:last-child {
    grid-column: span 2;
  }
  .kpi-value {
    font-size: 1.15rem;
  }
  .kpi-label {
    font-size: 0.55rem;
  }
}

@media (max-width: 360px) {
  .kpis-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 6px;
  }
  .kpi-card {
    padding: 8px 6px;
  }
  .kpi-value {
    font-size: 1.05rem;
  }
  .kpi-label {
    font-size: 0.5rem;
  }
}
</style>
