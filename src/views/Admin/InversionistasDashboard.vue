<template>
  <ion-page>
    <DashboardLayout>
      <div class="dashboard-inversionistas">
    <div class="page-header">
      <div class="title-row">
        <div class="sep"></div>
        <span class="section-label">PANEL DE INVERSIONISTAS</span>
      </div>
      <h1 class="page-title">
        MIS INVERSIONES
        <span class="title-sub">PORTAFOLIO</span>
      </h1>
    </div>

    <div class="kpi-grid animate-up" style="animation-delay: 0.1s">
      <StatsCard label="PORTAFOLIO TOTAL" :value="miPortafolio.valorPortafolio" format="currency" type="green" subLabel="USDC" />
      <StatsCard label="INVERSIÓN TOTAL" :value="miPortafolio.totalInvertido" format="currency" type="red" subLabel="USDC" />
      <StatsCard label="P&L TOTAL" :value="miPortafolio.pnlTotal" format="currency" type="green" :change="miPortafolio.pnlPorcentaje" />
      <StatsCard label="DISTRIBUCIONES" :value="miPortafolio.distribucionesRecibidas" format="currency" type="gold" subLabel="RECIBIDAS" />
    </div>

    <div class="portfolio-section animate-up" style="animation-delay: 0.2s">
      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>MI PORTAFOLIO</h4>
          </div>
        </div>
        <div class="tokens-grid">
          <div v-for="token in miPortafolio.tokens" :key="token.tokenId" class="token-card">
            <div class="token-header">
              <span class="token-id">{{ token.tokenId }}</span>
              <span class="token-cantidad">{{ token.cantidad }} tokens</span>
            </div>
            <div class="token-stats">
              <div class="token-stat">
                <span class="label">Precio Prom.</span>
                <span class="value">${{ token.precioPromedio }}</span>
              </div>
              <div class="token-stat">
                <span class="label">Valor Actual</span>
                <span class="value text-green">${{ token.valorActual }}</span>
              </div>
              <div class="token-stat">
                <span class="label">P&L</span>
                <span class="value" :class="token.pnl >= 0 ? 'text-green' : 'text-red'">
                  {{ token.pnl >= 0 ? '+' : '' }}${{ token.pnl }}
                </span>
              </div>
            </div>
            <button class="btn-outline">COMPRAR MÁS</button>
          </div>
        </div>
      </div>
    </div>

    <div class="performance-section animate-up" style="animation-delay: 0.3s">
      <div class="card chart-card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>RENDIMIENTO DE INVERSIÓN</h4>
          </div>
          <select class="period-select">
            <option>6 MESES</option>
            <option>1 AÑO</option>
            <option>TODO</option>
          </select>
        </div>
        <div id="performanceChart" class="chart-container"></div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>TOP ATLETAS POR ROI</h4>
          </div>
        </div>
        <div class="top-atletas">
          <div v-for="atleta in topAtletas" :key="atleta.id" class="atleta-row">
            <img :src="atleta.imagen" :alt="atleta.nombre" class="atleta-thumb" />
            <div class="atleta-info">
              <span class="atleta-nombre">{{ atleta.nombre }}</span>
              <span class="atleta-disciplina">{{ atleta.disciplina }}</span>
            </div>
            <div class="atleta-apy">
              <span class="apy-value">{{ atleta.apyProyectado }}%</span>
              <span class="apy-label">APY</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="transactions-section animate-up" style="animation-delay: 0.4s">
      <div class="card full-width">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>HISTORIAL DE DISTRIBUCIONES</h4>
          </div>
          <button class="btn-outline">EXPORTAR</button>
        </div>
        <div class="transactions-table">
          <table>
            <thead>
              <tr>
                <th>CONTRATO / EVENTO</th>
                <th>TIPO</th>
                <th>FECHA</th>
                <th>ESTADO</th>
                <th>DISTRIBUCIÓN</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tx in transacciones" :key="tx.id">
                <td>
                  <div class="tx-entity">
                    <div class="tx-icon" :class="tx.icon">
                      <svg v-if="tx.icon === 'sponsor'" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 10h8M6 2v6M3 5l3-3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      </svg>
                      <svg v-else-if="tx.icon === 'victoria'" width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <polygon points="6,1 7.5,4.5 11,5 8.5,7.5 9,11 6,9.5 3,11 3.5,7.5 1,5 4.5,4.5" stroke="currentColor" stroke-width="1.2" fill="none"/>
                      </svg>
                      <svg v-else width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="4.5" stroke="currentColor" stroke-width="1.2"/>
                        <path d="M6 3v3l2 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/>
                      </svg>
                    </div>
                    <span>{{ tx.entidad }}</span>
                  </div>
                </td>
                <td><span class="tx-badge" :class="tx.tipo.toLowerCase()">{{ tx.tipo }}</span></td>
                <td class="tx-date">{{ tx.fecha }}</td>
                <td><span class="tx-status" :class="tx.estado.toLowerCase()">{{ tx.estado }}</span></td>
                <td class="tx-amount" :class="tx.estado === 'EJECUTADO' ? 'positive' : ''">
                  {{ tx.estado === 'EJECUTADO' ? '+' : '' }}{{ tx.monto.toLocaleString() }} USDC
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="docs-section animate-up" style="animation-delay: 0.5s">
      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>DOCUMENTACIÓN</h4>
          </div>
        </div>
        <div class="docs-list">
          <div class="doc-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1h5.5L11 3.5V13H3V1z" stroke="#666" stroke-width="1.2"/>
              <path d="M8.5 1v3H11" stroke="#666" stroke-width="1.2"/>
            </svg>
            <span>Prospecto de Inversión</span>
            <span class="badge badge-green">DISPONIBLE</span>
          </div>
          <div class="doc-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1h5.5L11 3.5V13H3V1z" stroke="#666" stroke-width="1.2"/>
              <path d="M8.5 1v3H11" stroke="#666" stroke-width="1.2"/>
            </svg>
            <span>Contrato Smart ERC-3643</span>
            <span class="badge badge-green">VERIFICADO</span>
          </div>
          <div class="doc-item">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 1h5.5L11 3.5V13H3V1z" stroke="#666" stroke-width="1.2"/>
              <path d="M8.5 1v3H11" stroke="#666" stroke-width="1.2"/>
            </svg>
            <span>Historial de Distribuciones</span>
            <span class="badge badge-green">PDF</span>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>REDES CONECTADAS</h4>
          </div>
        </div>
        <div class="networks">
          <div class="network-item">
            <span class="network-name">Wallet</span>
            <span class="network-val">{{ miPortafolio.wallet }}</span>
          </div>
          <div class="network-item">
            <span class="network-name">Red</span>
            <span class="network-badge">POLYGON</span>
          </div>
        </div>
        <button class="btn-primary full-width">CONECTAR WALLET</button>
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
import { inversoresData, transaccionesData, atletasData, performanceData } from '../../data/adminDashboard'
import StatsCard from '../../components/Admin/Dashboard/StatsCard.vue'

const miPortafolio = inversoresData[0]
const transacciones = transaccionesData

const topAtletas = computed(() => {
  return [...atletasData].sort((a, b) => b.apyProyectado - a.apyProyectado).slice(0, 4)
})

onMounted(async () => {
  const ApexCharts = (await import('apexcharts')).default

  const perfOptions = {
    series: [{
      name: 'Valor Portafolio',
      data: performanceData.values.map(v => Math.round(v * 3.5))
    }],
    chart: {
      type: 'area',
      height: 280,
      background: 'transparent',
      toolbar: { show: false },
      animations: { enabled: true, easing: 'easeinout', speed: 1200 }
    },
    theme: { mode: 'dark' },
    colors: ['#00e090'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.0,
        stops: [0, 95, 100],
        colorStops: [
          { offset: 0, color: '#00e090', opacity: 0.35 },
          { offset: 100, color: '#00e090', opacity: 0 }
        ]
      }
    },
    stroke: { curve: 'smooth', width: 2 },
    grid: {
      borderColor: 'rgba(255,255,255,0.05)',
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } }
    },
    xaxis: {
      categories: performanceData.months,
      labels: { style: { colors: '#444', fontSize: '10px' } },
      axisBorder: { show: false }
    },
    yaxis: {
      labels: {
        style: { colors: '#444', fontSize: '10px' },
        formatter: (v: number) => '$' + v.toLocaleString()
      }
    },
    tooltip: { theme: 'dark' },
    dataLabels: { enabled: false },
    markers: { size: 0 }
  }

  new ApexCharts(document.getElementById('performanceChart'), perfOptions).render()
})
</script>

<style scoped>
.dashboard-inversionistas {
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
  background: #00e090;
}

.section-label {
  font-size: 11px;
  letter-spacing: 0.2em;
  color: #00e090;
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

.title-green {
  color: #00e090;
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

.card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  padding: 20px;
}

.chart-card {
  min-height: 340px;
  display: flex;
  flex-direction: column;
}

.chart-card .card-header {
  flex-shrink: 0;
}

.chart-card .chart-container {
  flex: 1;
  min-height: 280px;
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
  height: 280px;
  min-height: 280px;
}

.chart-container .apexcharts-canvas {
  height: 100% !important;
}

.tokens-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.token-card {
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px;
  transition: all 0.2s;
}

.token-card:hover {
  border-color: rgba(0, 224, 144, 0.2);
  background: rgba(0, 224, 144, 0.03);
}

.token-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.token-id {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  color: #00e090;
  font-weight: 600;
}

.token-cantidad {
  font-size: 11px;
  color: #666;
}

.token-stats {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
}

.token-stat {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.token-stat .label {
  color: #666;
}

.token-stat .value {
  font-family: 'DM Mono', monospace;
}

.text-green {
  color: #00e090 !important;
}

.text-red {
  color: var(--color-primary) !important;
}

.btn-outline {
  width: 100%;
  background: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.15em;
  padding: 8px 16px;
  transition: all 0.2s;
}

.btn-outline:hover {
  border-color: #00e090;
  color: #00e090;
}

.performance-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.top-atletas {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.atleta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.atleta-thumb {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.atleta-info {
  flex: 1;
}

.atleta-nombre {
  display: block;
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
}

.atleta-disciplina {
  font-size: 11px;
  color: #666;
}

.atleta-apy {
  text-align: right;
}

.apy-value {
  display: block;
  font-family: 'DM Mono', monospace;
  font-size: 18px;
  color: #00e090;
}

.apy-label {
  font-size: 10px;
  color: #666;
}

.transactions-section .card {
  padding: 0;
}

.transactions-section .card-header {
  padding: 20px;
  margin-bottom: 0;
}

.transactions-table {
  overflow-x: auto;
}

.transactions-table table {
  width: 100%;
  border-collapse: collapse;
}

.transactions-table th,
.transactions-table td {
  padding: 14px 20px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.transactions-table th {
  font-size: 10px;
  color: #555;
  letter-spacing: 0.15em;
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
}

.transactions-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.025);
}

.tx-entity {
  display: flex;
  align-items: center;
  gap: 10px;
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

.tx-icon.media {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #666;
}

.tx-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
}

.tx-badge.sponsor {
  background: rgba(207, 46, 46, 0.15);
  color: var(--color-primary);
}

.tx-badge.victoria {
  background: rgba(201, 168, 76, 0.15);
  color: #c9a84c;
}

.tx-badge.media {
  background: rgba(255, 255, 255, 0.06);
  color: #888;
}

.tx-date {
  font-family: 'DM Mono', monospace;
  font-size: 12px;
  color: #666;
}

.tx-status {
  padding: 3px 8px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 600;
}

.tx-status.ejecutado {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
}

.tx-status.pendiente {
  background: rgba(255, 200, 0, 0.08);
  color: #f0c040;
}

.tx-status.condicional {
  background: rgba(100, 120, 255, 0.08);
  color: #8090ff;
}

.tx-amount {
  font-family: 'DM Mono', monospace;
  font-size: 13px;
  text-align: right;
  color: #888;
}

.tx-amount.positive {
  color: #00e090;
}

.docs-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.docs-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.doc-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.doc-item span:nth-child(2) {
  flex: 1;
  font-size: 12px;
}

.badge-green {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
  padding: 2px 8px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 600;
}

.networks {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 16px;
}

.network-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.network-name {
  font-size: 12px;
  color: #666;
}

.network-val {
  font-family: 'DM Mono', monospace;
  font-size: 11px;
}

.network-badge {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
  padding: 4px 10px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 600;
}

.btn-primary {
  background: #00e090;
  color: #000;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  padding: 12px 20px;
  transition: all 0.25s;
}

.btn-primary:hover {
  box-shadow: 0 0 20px rgba(0, 224, 144, 0.35);
}

.full-width {
  width: 100%;
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

  .performance-section,
  .docs-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>