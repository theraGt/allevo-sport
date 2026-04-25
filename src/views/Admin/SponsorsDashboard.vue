<template>
  <div class="dashboard-sponsors">
    <div class="page-header">
      <div class="title-row">
        <div class="sep"></div>
        <span class="section-label">PANEL DE SPONSORS</span>
      </div>
      <h1 class="page-title">
        NUESTROS SPONSORS
        <span class="title-sub">PATROCINIOS</span>
      </h1>
    </div>

    <div class="kpi-grid animate-up" style="animation-delay: 0.1s">
      <StatsCard label="TOTAL SPONSORS" :value="sponsors.length" format="number" type="gold" />
      <StatsCard label="INVERSIÓN TOTAL" :value="inversionTotal" format="currency" type="red" subLabel="USDC" />
      <StatsCard label="ROI PROMEDIO" :value="roiPromedio" format="percent" type="green" subLabel="NET ROI" />
      <StatsCard label="ALCANCE TOTAL" :value="alcanceTotal" format="number" type="default" subLabel="SEGUIDORES" />
    </div>

    <div class="sponsors-grid animate-up" style="animation-delay: 0.2s">
      <div v-for="sponsor in sponsors" :key="sponsor.id" class="sponsor-card">
        <div class="sponsor-header">
          <div class="sponsor-logo">{{ getInitials(sponsor.nombre) }}</div>
          <div class="sponsor-info">
            <h3>{{ sponsor.nombre }}</h3>
            <span class="sponsor-tipo">{{ sponsor.tipo }}</span>
          </div>
          <span class="badge" :class="sponsor.contratoActivo ? 'badge-green' : 'badge-white'">
            {{ sponsor.contratoActivo ? '● ACTIVO' : 'INACTIVO' }}
          </span>
        </div>

        <div class="sponsor-body">
          <div class="sponsor-atletas">
            <span class="atletas-label">ATLETAS PATROCINADOS</span>
            <div class="atletas-list">
              <div v-for="atletaId in sponsor.atletasPatrocinados" :key="atletaId" class="atleta-chip">
                {{ getAtletaNombre(atletaId) }}
              </div>
            </div>
          </div>

          <div class="sponsor-stats">
            <div class="stat-row">
              <span class="stat-label">Inversión Total</span>
              <span class="stat-value">${{ sponsor.inversionTotal.toLocaleString() }}</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">ROI</span>
              <span class="stat-value text-green">{{ sponsor.roi }}%</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Impresiones</span>
              <span class="stat-value">{{ (sponsor.alcance.impresiones / 1000000).toFixed(1) }}M</span>
            </div>
            <div class="stat-row">
              <span class="stat-label">Alcance</span>
              <span class="stat-value">{{ (sponsor.alcance.alcance / 1000).toFixed(0) }}K</span>
            </div>
          </div>

          <div class="sponsor-pago" :class="{ pendiente: sponsor.propuestaPendiente }">
            <div class="pago-info">
              <span class="pago-label">PRÓXIMO PAGO</span>
              <span class="pago-fecha">{{ sponsor.proximoPago }}</span>
            </div>
            <span class="pago-monto">${{ sponsor.montoPago.toLocaleString() }}</span>
          </div>

          <div class="sponsor-actions">
            <button class="btn-primary">VER CONTRATO</button>
            <button class="btn-outline">RENOVAR</button>
          </div>
        </div>
      </div>
    </div>

    <div class="roi-chart-section animate-up" style="animation-delay: 0.3s">
      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>ROI POR SPONSOR</h4>
          </div>
        </div>
        <div id="roiChart" class="chart-container"></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>ALCANCE POR SPONSOR</h4>
          </div>
        </div>
        <div class="alcance-list">
          <div v-for="sponsor in sponsors" :key="sponsor.id" class="alcance-item">
            <div class="alcance-info">
              <span class="alcance-name">{{ sponsor.nombre }}</span>
              <span class="alcance-num">{{ (sponsor.alcance.alcance / 1000).toFixed(0) }}K</span>
            </div>
            <div class="alcance-bar">
              <div class="alcance-fill" :style="{ width: (sponsor.alcance.alcance / maxAlcance * 100) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { sponsorsData, atletasData } from '../../data/adminDashboard'
import StatsCard from '../../components/Admin/Dashboard/StatsCard.vue'

const sponsors = sponsorsData

const inversionTotal = computed(() => {
  return sponsors.reduce((acc, s) => acc + s.inversionTotal, 0)
})

const roiPromedio = computed(() => {
  const sum = sponsors.reduce((acc, s) => acc + s.roi, 0)
  return Math.round(sum / sponsors.length * 10) / 10
})

const alcanceTotal = computed(() => {
  return sponsors.reduce((acc, s) => acc + s.alcance.alcance, 0)
})

const maxAlcance = computed(() => {
  return Math.max(...sponsors.map(s => s.alcance.alcance))
})

const getInitials = (nombre: string) => {
  return nombre.split(' ').map(w => w[0]).join('').substring(0, 2)
}

const getAtletaNombre = (id: number) => {
  const atleta = atletasData.find(a => a.id === id)
  return atleta ? atleta.nombre.split(' ')[0] : ''
}

onMounted(async () => {
  const ApexCharts = (await import('apexcharts')).default

  const roiOptions = {
    series: [{
      name: 'ROI',
      data: sponsors.map(s => s.roi)
    }],
    chart: {
      type: 'bar',
      height: 280,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, speed: 1000 }
    },
    theme: { mode: 'dark' },
    colors: ['#c9a84c'],
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 2,
        barHeight: '60%'
      }
    },
    grid: {
      borderColor: 'rgba(255,255,255,0.05)',
      padding: { left: 0, right: 0 }
    },
    xaxis: {
      labels: { style: { colors: '#444', fontSize: '10px' } },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#888', fontSize: '11px' },
        formatter: (v: number) => v + '%'
      }
    },
    tooltip: { theme: 'dark', y: { formatter: (v: number) => v + '% ROI' } },
    dataLabels: {
      enabled: true,
      style: { colors: ['#c9a84c'], fontSize: '12px' },
      formatter: (v: number) => v + '%'
    }
  }

  new ApexCharts(document.getElementById('roiChart'), roiOptions).render()
})
</script>

<style scoped>
.dashboard-sponsors {
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
  width: 32px;
  height: 2px;
  background: #c9a84c;
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #c9a84c;
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

.title-gold {
  color: #c9a84c;
}

.page-subtitle {
  font-size: 12px;
  color: #555;
  font-family: 'DM Mono', monospace;
}

.kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.sponsors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 20px;
}

.sponsor-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
}

.sponsor-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, #c9a84c 50%, transparent 100%);
  opacity: 0.5;
}

.sponsor-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 3px;
  background: #c9a84c;
}

.sponsor-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.sponsor-logo {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #c9a84c, #8a6d3b);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 18px;
  color: #000;
}

.sponsor-info {
  flex: 1;
}

.sponsor-info h3 {
  font-family: var(--font-heading);
  font-weight: 700;
  font-size: 16px;
}

.sponsor-tipo {
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
}

.badge-green {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
}

.badge-white {
  background: rgba(255, 255, 255, 0.06);
  color: #888;
}

.sponsor-body {
  padding: 16px;
}

.sponsor-atletas {
  margin-bottom: 16px;
}

.atletas-label {
  display: block;
  font-size: 10px;
  color: #666;
  letter-spacing: 0.1em;
  font-family: var(--font-heading);
  font-weight: 600;
  margin-bottom: 8px;
}

.atletas-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.atleta-chip {
  padding: 4px 10px;
  background: rgba(207, 46, 46, 0.1);
  border: 1px solid rgba(207, 46, 46, 0.2);
  border-radius: 2px;
  font-size: 11px;
  font-family: var(--font-heading);
  font-weight: 600;
}

.sponsor-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 16px;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.stat-label {
  color: #666;
}

.stat-value {
  font-family: 'DM Mono', monospace;
  color: #fff;
}

.text-green {
  color: #00e090 !important;
}

.sponsor-pago {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(0, 224, 144, 0.1);
  border: 1px solid rgba(0, 224, 144, 0.2);
  border-radius: 2px;
  margin-bottom: 16px;
}

.sponsor-pago.pendiente {
  background: rgba(255, 200, 0, 0.08);
  border-color: rgba(255, 200, 0, 0.2);
}

.pago-label {
  display: block;
  font-size: 10px;
  color: #666;
  letter-spacing: 0.1em;
  font-family: var(--font-heading);
  font-weight: 600;
}

.pago-fecha {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
}

.pago-monto {
  font-family: 'DM Mono', monospace;
  font-size: 18px;
  color: #c9a84c;
}

.sponsor-actions {
  display: flex;
  gap: 8px;
}

.btn-primary {
  flex: 1;
  background: #c9a84c;
  color: #000;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 10px 16px;
  transition: all 0.25s;
}

.btn-primary:hover {
  box-shadow: 0 0 20px rgba(201, 168, 76, 0.35);
}

.btn-outline {
  flex: 1;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  padding: 10px 16px;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: #c9a84c;
  color: #c9a84c;
}

.roi-chart-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  padding: 20px;
}

.card-header {
  margin-bottom: 16px;
}

.card h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 14px;
}

.chart-container {
  height: 280px;
}

.alcance-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.alcance-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.alcance-info {
  display: flex;
  justify-content: space-between;
}

.alcance-name {
  font-size: 12px;
}

.alcance-num {
  font-family: 'DM Mono', monospace;
  color: #c9a84c;
}

.alcance-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.alcance-fill {
  height: 100%;
  background: linear-gradient(90deg, #c9a84c, #e6c76b);
  transition: width 1s ease;
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

@media (max-width: 1200px) {
  .kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .roi-chart-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>