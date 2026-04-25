<template>
  <ion-page>
    <DashboardLayout>
      <div class="dashboard-atletas">
    <div class="page-header">
      <div class="title-row">
        <div class="sep"></div>
        <span class="section-label">PANEL DE TALENTOS</span>
      </div>
      <h1 class="page-title">
        NUESTROS ATLETAS
        <span class="title-sub">TOKENIZADOS</span>
      </h1>
    </div>

    <div class="kpi-grid animate-up" style="animation-delay: 0.1s">
      <StatsCard label="TOTAL ATLETAS" :value="atletas.length" format="number" type="red" />
      <StatsCard label="VALOR PROMEDIO TOKEN" :value="valorPromedio" format="currency" type="gold" subLabel="USDC" />
      <StatsCard label="FINANCIAMIENTO ACTIVO" :value="financiamientoTotal" format="currency" type="green"
        subLabel="USDC" />
      <StatsCard label="SPONSORS ACTIVOS" :value="sponsorsCount" format="number" type="default" />
    </div>

    <div class="athletes-grid animate-up" style="animation-delay: 0.2s">
      <div v-for="atleta in atletas" :key="atleta.id" class="atleta-card">
        <div class="atleta-header">
          <img :src="atleta.imagen" :alt="atleta.nombre" class="atleta-img" />
          <div class="atleta-badges">
            <span class="badge badge-green">● ACTIVO</span>
            <span class="badge badge-gold">{{ atleta.tier }}</span>
          </div>
        </div>

        <div class="atleta-body">
          <h3>{{ atleta.nombre }}</h3>
          <span class="atleta-discipline">{{ atleta.disciplina }}</span>

          <div class="atleta-stats">
            <div class="stat-item">
              <span class="stat-val">{{ atleta.record.victories }}-{{ atleta.record.defeats }}</span>
              <span class="stat-lbl">RÉCORD</span>
            </div>
            <div class="stat-item">
              <span class="stat-val">{{ atleta.edad }}</span>
              <span class="stat-lbl">EDAD</span>
            </div>
            <div class="stat-item">
              <span class="stat-val text-gold">#{{ atleta.ranking }}</span>
              <span class="stat-lbl">RANKING</span>
            </div>
          </div>

          <div class="atleta-financiamiento">
            <div class="funding-header">
              <span class="funding-label">FINANCIAMIENTO</span>
              <span class="funding-value">${{ atleta.financiacion.actual.toLocaleString() }} / ${{
                atleta.financiacion.meta.toLocaleString() }}</span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" :style="{ width: getFundingPercent(atleta) + '%' }"></div>
            </div>
            <div class="funding-meta">
              <span>{{ atleta.financiacion.tokens.toLocaleString() }} tokens</span>
              <span class="funding-percent">{{ getFundingPercent(atleta) }}%</span>
            </div>
          </div>

          <div class="atleta-prediction">
            <span class="prediction-label">PREDICCIÓN IA</span>
            <div class="prediction-bar">
              <div class="prediction-fill" :style="{ width: atleta.probabilidadVictoria + '%' }"></div>
            </div>
            <span class="prediction-value">{{ atleta.probabilidadVictoria }}% probabilidad de victoria</span>
          </div>

          <div class="atleta-actions">
            <button class="btn-primary">VER PERFIL</button>
            <button class="btn-outline">INVERTIR</button>
          </div>
        </div>
      </div>
    </div>

    <div class="comparison-section animate-up" style="animation-delay: 0.3s">
      <div class="card">
        <div class="card-header">
          <div class="title-row">
            <div class="sep"></div>
            <h4>COMPARADOR DE ATLETAS</h4>
          </div>
        </div>
        <div class="comparison-table">
          <table>
            <thead>
              <tr>
                <th>Atleta</th>
                <th>Disciplina</th>
                <th>Récord</th>
                <th>Ranking</th>
                <th>Valor Token</th>
                <th>APY</th>
                <th>Predicción</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="atleta in sortedByRanking" :key="atleta.id">
                <td class="atleta-cell">
                  <img :src="atleta.imagen" :alt="atleta.nombre" class="table-thumb" />
                  <span>{{ atleta.nombre }}</span>
                </td>
                <td>{{ atleta.disciplina }}</td>
                <td>{{ atleta.record.victories }}-{{ atleta.record.defeats }}</td>
                <td>#{{ atleta.ranking }}</td>
                <td class="text-green">${{ atleta.valorToken }}</td>
                <td class="text-gold">{{ atleta.apyProyectado }}%</td>
                <td>
                  <div class="mini-progress">
                    <div class="mini-fill" :style="{ width: atleta.probabilidadVictoria + '%' }"></div>
                  </div>
                  <span>{{ atleta.probabilidadVictoria }}%</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
      </div>
    </DashboardLayout>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IonPage } from '@ionic/vue'
import DashboardLayout from '../../components/Admin/Dashboard/DashboardLayout.vue'
import { atletasData } from '../../data/adminDashboard'
import StatsCard from '../../components/Admin/Dashboard/StatsCard.vue'

const atletas = atletasData

const valorPromedio = computed(() => {
  const sum = atletas.reduce((acc, a) => acc + a.valorToken, 0)
  return Math.round(sum / atletas.length * 100) / 100
})

const financiamientoTotal = computed(() => {
  return atletas.reduce((acc, a) => acc + a.financiacion.actual, 0)
})

const sponsorsCount = computed(() => {
  return atletas.reduce((acc, a) => acc + a.contratos, 0)
})

const sortedByRanking = computed(() => {
  return [...atletas].sort((a, b) => a.ranking - b.ranking)
})

const getFundingPercent = (atleta: any) => {
  return Math.round((atleta.financiacion.actual / atleta.financiacion.meta) * 100)
}
</script>

<style scoped>
.dashboard-atletas {
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

.title-red {
  color: var(--color-primary);
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

.athletes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.atleta-card {
  background: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.07);
  border-radius: 2px;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
}

.atleta-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent 0%, var(--color-primary) 50%, transparent 100%);
  opacity: 0.5;
}

.atleta-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(207, 46, 46, 0.25);
  border-color: rgba(207, 46, 46, 0.3);
}

.atleta-header {
  position: relative;
  height: 180px;
  overflow: hidden;
}

.atleta-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.4s ease;
}

.atleta-card:hover .atleta-img {
  transform: scale(1.05);
}

.atleta-badges {
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 2px;
  font-size: 10px;
  font-family: var(--font-heading);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.badge-green {
  background: rgba(0, 224, 144, 0.1);
  color: #00e090;
  border: 1px solid rgba(0, 224, 144, 0.2);
}

.badge-gold {
  background: rgba(201, 168, 76, 0.1);
  color: #c9a84c;
  border: 1px solid rgba(201, 168, 76, 0.2);
}

.atleta-body {
  padding: 16px;
}

.atleta-body h3 {
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.05em;
}

.atleta-discipline {
  display: block;
  font-size: 12px;
  color: var(--color-primary);
  letter-spacing: 0.15em;
  font-family: var(--font-heading);
  font-weight: 700;
  margin-bottom: 16px;
}

.atleta-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-bottom: 16px;
}

.stat-item {
  text-align: center;
  padding: 10px 6px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 2px;
}

.stat-val {
  font-family: 'DM Mono', monospace;
  font-size: 16px;
  font-weight: 600;
  display: block;
}

.stat-lbl {
  font-size: 9px;
  color: #555;
  letter-spacing: 0.1em;
  font-family: var(--font-heading);
  font-weight: 700;
  margin-top: 2px;
}

.text-gold {
  color: #c9a84c !important;
}

.atleta-financiamiento {
  margin-bottom: 16px;
}

.funding-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.funding-label {
  font-size: 10px;
  color: #666;
  letter-spacing: 0.1em;
  font-family: var(--font-heading);
  font-weight: 600;
}

.funding-value {
  font-size: 11px;
  font-family: 'DM Mono', monospace;
}

.funding-value span {
  color: var(--color-primary);
}

.progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #ff4040);
  transition: width 1.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.funding-meta {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  color: #555;
  margin-top: 4px;
}

.funding-percent {
  font-family: 'DM Mono', monospace;
  color: var(--color-primary);
}

.atleta-prediction {
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(207, 46, 46, 0.08);
  border: 1px solid rgba(207, 46, 46, 0.15);
  border-radius: 2px;
}

.prediction-label {
  display: block;
  font-size: 10px;
  color: #666;
  letter-spacing: 0.1em;
  font-family: var(--font-heading);
  font-weight: 600;
  margin-bottom: 8px;
}

.prediction-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 4px;
}

.prediction-fill {
  height: 100%;
  background: linear-gradient(90deg, #00e090, #00ffb0);
  transition: width 1s ease;
}

.prediction-value {
  font-size: 12px;
  color: #00e090;
}

.atleta-actions {
  display: flex;
  gap: 8px;
}

.btn-primary {
  flex: 1;
  background: var(--color-primary);
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  padding: 10px 16px;
  transition: all 0.25s;
  clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
}

.btn-primary:hover {
  box-shadow: 0 0 20px rgba(207, 46, 46, 0.35);
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
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.comparison-section {
  margin-top: 16px;
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

.comparison-table {
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th,
.comparison-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.comparison-table th {
  font-size: 10px;
  color: #555;
  letter-spacing: 0.15em;
  font-family: var(--font-heading);
  font-weight: 700;
  text-transform: uppercase;
}

.comparison-table tbody tr:hover {
  background: rgba(255, 255, 255, 0.025);
}

.atleta-cell {
  display: flex;
  align-items: center;
  gap: 10px;
}

.table-thumb {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.text-green {
  color: #00e090;
}

.mini-progress {
  width: 60px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  display: inline-block;
  vertical-align: middle;
  margin-right: 6px;
}

.mini-fill {
  height: 100%;
  background: #00e090;
  border-radius: 2px;
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
}

@media (max-width: 768px) {
  .kpi-grid {
    grid-template-columns: 1fr;
  }
}
</style>