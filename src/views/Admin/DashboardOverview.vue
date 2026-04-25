<template>
  <ion-page>
    <DashboardLayout>
      <div class="dashboard-overview">
    <div class="page-header">
      <div class="title-row">
        <div class="sep"></div>
        <span class="section-label">PANEL DE INVERSIÓN</span>
      </div>
      <h1 class="page-title">
        OVERVIEW
        <span class="title-sub">PLATAFORMA TOTAL</span>
      </h1>
    </div>

    <div class="kpi-grid animate-up" style="animation-delay: 0.1s">
      <StatsCard label="VALOR TOTAL INVERTIDO" :value="overview.totalInvertido" format="currency" type="red" subLabel="USDC" :change="overview.crecimientoMes" changeTime="24h" />
      <StatsCard label="PROMEDIO VALOR TOKEN" :value="overview.valorTokenPromedio" format="currency" type="gold" subLabel="USDC" :change="2.4" changeTime="24h" />
      <StatsCard label="TOTAL ATLETAS" :value="overview.numAtletas" format="number" type="green" subLabel="ACTIVOS" />
      <StatsCard label="INVERSIONISTAS" :value="overview.numInversores" format="number" type="default" subLabel="REGISTRADOS" />
    </div>

    <div class="charts-row animate-up" style="animation-delay: 0.2s">
      <div class="card chart-card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>RENDIMIENTO GENERAL</h4>
          </div>
          <select class="period-select">
            <option>6 MESES</option>
            <option>1 AÑO</option>
            <option>TODO</option>
          </select>
        </div>
        <div id="performanceChart" class="chart-container"></div>
      </div>

      <div class="card distribution-card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>DISTRIBUCIÓN</h4>
          </div>
        </div>
        <div id="donutChart" class="chart-donut"></div>
        <div class="distribution-legend">
          <div class="legend-item">
            <span class="legend-dot" style="background: var(--color-primary)"></span>
            <span>Contratos</span>
            <span class="legend-val">{{ overviewStats.contratos }}%</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background: #c9a84c"></span>
            <span>Victorias</span>
            <span class="legend-val">{{ overviewStats.victorias }}%</span>
          </div>
          <div class="legend-item">
            <span class="legend-dot" style="background: #3a5a9a"></span>
            <span>Sponsor</span>
            <span class="legend-val">{{ overviewStats.sponsor }}%</span>
          </div>
        </div>
      </div>
    </div>

    <div class="bottom-row animate-up" style="animation-delay: 0.3s">
      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>TOP ATLETAS POR ROI</h4>
          </div>
        </div>
        <div class="athletes-list">
          <div v-for="atleta in topAtletas" :key="atleta.id" class="athlete-row">
            <div class="athlete-info">
              <img :src="atleta.imagen" :alt="atleta.nombre" class="athlete-thumb" />
              <div>
                <div class="athlete-name">{{ atleta.nombre }}</div>
                <div class="athlete-discipline">{{ atleta.disciplina }}</div>
              </div>
            </div>
            <div class="athlete-stats">
              <span class="roi-value">{{ atleta.apyProyectado }}%</span>
              <span class="roi-label">APY</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>TRANSACCIONES RECIENTES</h4>
          </div>
          <button class="btn-outline">VER TODO</button>
        </div>
        <div class="transactions-list">
          <div v-for="tx in transaccionesData.slice(0, 4)" :key="tx.id" class="tx-row">
            <div class="tx-icon" :class="tx.icon">
              <svg v-if="tx.icon === 'sponsor'" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10h8M6 2v6M3 5l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <svg v-else-if="tx.icon === 'victoria'" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
              </svg>
              <svg v-else-if="tx.icon === 'media'" width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="3" width="10" height="8" rx="1" stroke="currentColor" stroke-width="1.2"/>
                <path d="M4 3V2a2 2 0 014 0v1" stroke="currentColor" stroke-width="1.2"/>
              </svg>
              <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.2"/>
                <path d="M6 3v3l2 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
              </svg>
            </div>
            <div class="tx-info">
              <span class="tx-entity">{{ tx.entidad }}</span>
              <span class="tx-type" :class="tx.tipo.toLowerCase()">{{ tx.tipo }}</span>
            </div>
            <div class="tx-date">{{ tx.fecha }}</div>
            <div class="tx-status" :class="tx.estado.toLowerCase()">{{ tx.estado }}</div>
            <div class="tx-amount" :class="tx.estado === 'EJECUTADO' ? 'positive' : ''">
              {{ tx.estado === 'EJECUTADO' ? '+' : '' }}{{ tx.monto.toLocaleString() }}
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>FINANCIAMIENTO</h4>
          </div>
        </div>
        <div class="funding-stats">
          <div class="funding-total">
            <span class="funding-label">Total Recaudado</span>
            <span class="funding-value">${{ overview.financiacionTotal.toLocaleString() }}</span>
          </div>
          <div class="progress-track">
            <div class="progress-fill" :style="{ width: fundingPercent + '%' }"></div>
          </div>
          <div class="funding-meta">
            <span>{{ overview.financiacionTotal.toLocaleString() }} / {{ overview.financiacionMeta.toLocaleString() }} tokens</span>
            <span class="funding-percent">{{ fundingPercent }}%</span>
          </div>
          <div class="funding-month">
            <span class="badge badge-green">+${{ overview.distribucionesMes.toLocaleString() }} este mes</span>
          </div>
        </div>
      </div>
    </div>
      </div>
    </DashboardLayout>
  </ion-page>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { IonPage } from '@ionic/vue'
import DashboardLayout from '../../components/Admin/Dashboard/DashboardLayout.vue'
import { atletasData, transaccionesData, distributionData, performanceData, overviewStats } from '../../data/adminDashboard'
import StatsCard from '../../components/Admin/Dashboard/StatsCard.vue'

const overview = overviewStats

const fundingPercent = computed(() => {
  return Math.round((overview.financiacionTotal / overview.financiacionMeta) * 100)
})

const topAtletas = computed(() => {
  return [...atletasData].sort((a, b) => b.apyProyectado - a.apyProyectado).slice(0, 4)
})

onMounted(async () => {
  const ApexCharts = (await import('apexcharts')).default

  const perfOptions = {
    series: [{
      name: 'Valor Token (USDC)',
      data: performanceData.values
    }],
    chart: {
      type: 'area',
      height: 250,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, easing: 'easeinout', speed: 1200 }
    },
    theme: { mode: 'dark' },
    colors: ['#cf2e2e'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.0,
        stops: [0, 95, 100],
        colorStops: [
          { offset: 0, color: '#cf2e2e', opacity: 0.35 },
          { offset: 100, color: '#cf2e2e', opacity: 0 }
        ]
      }
    },
    stroke: { curve: 'smooth', width: 2, colors: ['#cf2e2e'] },
    grid: {
      borderColor: 'rgba(255,255,255,0.05)',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
      padding: { left: 0, right: 0 }
    },
    xaxis: {
      categories: performanceData.months,
      labels: { style: { colors: '#444', fontSize: '10px', fontFamily: 'DM Mono' } },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#444', fontSize: '10px', fontFamily: 'DM Mono' },
        formatter: (v: number) => '$' + v.toFixed(0)
      }
    },
    tooltip: { theme: 'dark', style: { fontSize: '11px' }, y: { formatter: (v: number) => '$' + v.toFixed(2) + ' USDC' } },
    dataLabels: { enabled: false },
    markers: { size: 0, hover: { size: 5, sizeOffset: 3 } }
  }

  new ApexCharts(document.getElementById('performanceChart'), perfOptions).render()

  const donutOptions = {
    series: [distributionData.contratos, distributionData.victorias, distributionData.sponsor],
    labels: ['Contratos', 'Victorias', 'Sponsor'],
    chart: {
      type: 'donut',
      height: 180,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, speed: 1000 }
    },
    theme: { mode: 'dark' },
    colors: ['#cf2e2e', '#c9a84c', '#3a5a9a'],
    plotOptions: {
      pie: {
        donut: {
          size: '68%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'POOL',
              color: '#666',
              fontSize: '10px',
              fontFamily: 'Barlow Condensed',
              fontWeight: 700,
              formatter: () => '$' + (overview.financiacionTotal / 1000).toFixed(1) + 'K'
            },
            value: { color: '#fff', fontSize: '20px', fontFamily: 'DM Mono', fontWeight: 500 }
          }
        }
      }
    },
    stroke: { width: 0 },
    legend: { show: false },
    dataLabels: { enabled: false },
    tooltip: { theme: 'dark', y: { formatter: (v: number) => v + '%' } }
  }

  new ApexCharts(document.getElementById('donutChart'), donutOptions).render()
})
</script>

<style scoped>
.dashboard-overview {
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
  background: var(--color-primary);
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--color-primary);
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

.title-sub {
  font-size: 0.55em;
  color: #2a2a2a;
  margin-left: 12px;
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

.charts-row {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 20px;
}

.card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  padding: 20px;
  position: relative;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%);
  opacity: 0.5;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.card h4 {
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: 0.1em;
  font-size: 14px;
}

.card-header .btn-outline {
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  padding: 6px 14px;
  transition: all 0.2s;
}

.card-header .btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.period-select {
  -webkit-appearance: none;
  background: #111;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23666'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #888;
  font-size: 12px;
  font-family: 'DM Mono', monospace;
  padding: 6px 28px 6px 10px;
  border-radius: 2px;
}

.chart-container {
  height: 250px;
}

.chart-donut {
  height: 180px;
}

.distribution-legend {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 16px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.legend-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.legend-val {
  margin-left: auto;
  font-family: 'DM Mono', monospace;
  color: #fff;
}

.bottom-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
}

.athletes-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.athlete-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  transition: all 0.2s;
}

.athlete-row:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(207, 46, 46, 0.2);
}

.athlete-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.athlete-thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.athlete-name {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
}

.athlete-discipline {
  font-size: 11px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.athlete-stats {
  text-align: right;
}

.roi-value {
  font-family: 'DM Mono', monospace;
  font-size: 18px;
  color: #00e090;
  font-weight: 600;
}

.roi-label {
  font-size: 10px;
  color: #666;
  letter-spacing: 0.1em;
  margin-left: 4px;
}

.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tx-row {
  display: grid;
  grid-template-columns: 32px 1fr 80px 80px 80px;
  gap: 12px;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tx-row:last-child {
  border-bottom: none;
}

.tx-icon {
  width: 28px;
  height: 28px;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tx-icon.sponsor {
  background: rgba(207, 46, 46, 0.12);
  border: 1px solid rgba(207, 46, 46, 0.2);
  color: var(--color-primary);
}

.tx-icon.victoria {
  background: rgba(201, 168, 76, 0.12);
  border: 1px solid rgba(201, 168, 76, 0.2);
  color: #c9a84c;
}

.tx-icon.media, .tx-icon.trofeo {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #666;
}

.tx-entity {
  font-size: 12px;
}

.tx-type {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
  margin-left: 8px;
}

.tx-type.sponsor {
  background: rgba(207, 46, 46, 0.15);
  color: var(--color-primary);
  border: 1px solid rgba(207, 46, 46, 0.25);
}

.tx-type.victoria {
  background: rgba(201, 168, 76, 0.15);
  color: #c9a84c;
  border: 1px solid rgba(201, 168, 76, 0.25);
}

.tx-type.media {
  background: rgba(255, 255, 255, 0.06);
  color: #888;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.tx-date {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  color: #666;
}

.tx-status {
  padding: 3px 8px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 600;
  text-align: center;
}

.tx-status.ejecutado {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
  border: 1px solid rgba(0, 224, 144, 0.2);
}

.tx-status.pendiente {
  background: rgba(255, 200, 0, 0.08);
  color: #f0c040;
  border: 1px solid rgba(255, 200, 0, 0.2);
}

.tx-status.condicional {
  background: rgba(100, 120, 255, 0.08);
  color: #8090ff;
  border: 1px solid rgba(100, 120, 255, 0.2);
}

.tx-amount {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  text-align: right;
  color: #888;
}

.tx-amount.positive {
  color: #00e090;
}

.funding-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.funding-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.funding-label {
  font-size: 11px;
  color: #666;
  letter-spacing: 0.1em;
  font-family: var(--font-heading);
  font-weight: 600;
}

.funding-value {
  font-family: 'DM Mono', monospace;
  font-size: 24px;
  color: var(--color-primary);
  font-weight: 500;
}

.progress-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--color-primary), #ff4040);
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  right: 0;
  top: -3px;
  bottom: -3px;
  width: 12px;
  border-radius: 50%;
  background: #ff6060;
  box-shadow: 0 0 10px #ff4040;
}

.funding-meta {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: #555;
}

.funding-percent {
  font-family: 'DM Mono', monospace;
  color: var(--color-primary);
}

.badge-green {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
  border: 1px solid rgba(0, 224, 144, 0.2);
  border-radius: 2px;
  font-size: 11px;
  font-family: var(--font-heading);
  font-weight: 600;
  letter-spacing: 0.05em;
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

  .charts-row {
    grid-template-columns: 1fr;
  }

  .bottom-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>