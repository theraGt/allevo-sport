<template>
  <section class="calculadora-section" id="calculadora">
    <div class="calc-bg-grid"></div>
    <div class="container">
      <!-- Header -->
      <header class="calc-header" v-reveal="'fade-up'">
        <ion-label class="section-label">INVERSIÓN RWA</ion-label>
        <h1 class="section-title">
          INVIERTE EN <span class="highlight shimmer-text">TU FUTURO</span>
        </h1>
        <p class="section-subtitle">
          Simula tu rendimiento con activos reales. Ajusta tu capital y tasa de retorno para descubrir el potencial de
          tu inversión.
        </p>
        <div class="accent-separator"></div>
      </header>

      <!-- Calculadora Grid -->
      <div class="calculadora-grid" v-reveal="'fade-up'">
        <!-- Columna Izquierda: Inputs -->
        <div class="calc-col calc-col-input" v-reveal="'fade-right'">
          <div class="input-panel">
            <!-- MONTO -->
            <label for="monto-inversion" class="input-label">Capital a invertir</label>
            <div class="currency-input-wrapper">
              <span class="currency-symbol" aria-hidden="true">Q</span>
              <input id="monto-inversion" ref="montoInputRef" type="number" :value="inputMonto" @input="onInputChange"
                :min="MIN_MONTO" :max="MAX_MONTO" :step="STEP_MONTO" class="currency-input"
                aria-label="Monto a invertir en quetzales" />
            </div>

            <div class="range-group">
              <label for="monto-range" class="range-label">Ajustar capital</label>
              <ion-range id="monto-range" :min="MIN_MONTO" :max="MAX_MONTO" :step="STEP_MONTO" :value="monto"
                @ionInput="onRangeChange" snaps ticks class="monto-range"
                aria-label="Slider de monto a invertir"></ion-range>
              <div class="range-extremes">
                <span>Q{{ formatCompact(MIN_MONTO) }}</span>
                <span>Q{{ formatCompact(MAX_MONTO) }}</span>
              </div>
            </div>

            <div class="amount-presets">
              <button v-for="preset in presets" :key="preset" class="preset-btn" :class="{ active: monto === preset }"
                @click="monto = preset; inputMonto = preset">
                Q{{ formatCompact(preset) }}
              </button>
            </div>

            <!-- SEPARADOR -->
            <div class="input-divider"></div>

            <!-- TASA -->
            <label class="input-label">Tasa de retorno mensual</label>
            <div class="rate-input-row">
              <button v-for="r in tasaOpciones" :key="r" class="rate-chip" :class="{ active: tasa === r }"
                @click="setTasa(r)">
                {{ r }}%
              </button>
            </div>

            <div class="range-group rate-range-group">
              <ion-range :min="1" :max="3" :step="0.5" :value="tasa" @ionInput="onTasaRangeChange" snaps ticks
                class="tasa-range" aria-label="Slider de tasa de retorno"></ion-range>
              <div class="range-extremes">
                <span>1%</span>
                <span>3%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Tasa de Retorno Visual -->
        <div class="calc-col calc-col-rate" v-reveal="'fade-left'">
          <ion-card class="rate-card">
            <div class="rate-card-bg"></div>
            <div class="rate-content">
              <h3 class="rate-title">
                <ion-icon :icon="trendingUpOutline" class="rate-icon"></ion-icon>
                Tasa de Retorno
              </h3>
              <div class="rate-indicator">
                <div class="rate-circle" :style="circleStyle">
                  <div class="rate-circle-inner">
                    <span class="rate-percentage">{{ tasa }}%</span>
                    <span class="rate-period">mensual</span>
                  </div>
                </div>
              </div>
              <p class="rate-description">Rendimiento fijo garantizado por activos reales</p>
              <div class="rate-annual">
                <ion-icon :icon="timeOutline" class="rate-annual-icon"></ion-icon>
                <span>{{ tasaAnual }}% anual</span>
              </div>
            </div>
          </ion-card>
        </div>
      </div>

      <!-- Métricas Destacadas -->
      <div class="metrics-row" v-reveal="'fade-up'">
        <div class="metric-card primary" v-reveal="'zoom-in'" :class="'delay-1'">
          <div class="metric-label">GANANCIA MENSUAL</div>
          <div class="metric-value" :key="displayGananciaMensual">{{ displayGananciaMensual }}</div>
          <div class="metric-badge">+{{ formatPercent(gananciaMensual / monto) }}</div>
        </div>
        <div class="metric-card" v-reveal="'zoom-in'" :class="'delay-2'">
          <div class="metric-label">GANANCIA ANUAL</div>
          <div class="metric-value" :key="displayGananciaAnual">{{ displayGananciaAnual }}</div>
        </div>
        <div class="metric-card" v-reveal="'zoom-in'" :class="'delay-3'">
          <div class="metric-label">ROI ANUALIZADO</div>
          <div class="metric-value accent">{{ tasaAnual }}%</div>
        </div>
        <div class="metric-card highlight" v-reveal="'zoom-in'" :class="'delay-4'">
          <div class="metric-label">TOTAL A 5 AÑOS</div>
          <div class="metric-value" :key="displayTotal5">{{ displayTotal5 }}</div>
          <div class="metric-sublabel">Capital + Rendimientos</div>
        </div>
      </div>

      <!-- Resultados -->
      <div class="resultados-wrapper" v-reveal="'fade-up'">
        <div class="resultados-scroll">
          <div v-for="year in projectionYears" :key="year" class="resultado-card" :class="{ destaque: year === 1 }">
            <div class="resultado-periodo">
              <ion-icon :icon="calendarOutline"></ion-icon>
              <span>{{ year }} AÑO{{ year > 1 ? 'S' : '' }}</span>
            </div>
            <div class="resultado-valor">{{ displayValues[year - 1] }}</div>
            <div class="resultado-total">
              Total: {{ displayTotals[year - 1] }}
            </div>
            <div class="resultado-roi">ROI: {{ tasaAnual * year }}%</div>
          </div>
        </div>
      </div>

      <!-- CTA -->
      <div class="cta-wrapper" v-reveal="'scale-in-spring'">
        <button class="btn-primary cta-btn" @click="onNotifyClick">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
            stroke-linecap="round" stroke-linejoin="round" width="18" height="18">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          CONVERTIRSE EN INVERSOR
        </button>
      </div>
    </div>

    <!-- FAB Moneda -->
    <ion-fab vertical="bottom" horizontal="end" slot="fixed" class="currency-fab-wrapper">
      <ion-fab-button class="currency-fab" size="small">
        <ion-icon :icon="cashOutline"></ion-icon>
      </ion-fab-button>
    </ion-fab>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  IonLabel,
  IonRange,
  IonCard,
  IonIcon,
  IonFab,
  IonFabButton
} from '@ionic/vue'
import {
  cashOutline,
  trendingUpOutline,
  timeOutline,
  calendarOutline
} from 'ionicons/icons'

/* ─── Constantes ─── */
const MIN_MONTO = 1000
const MAX_MONTO = 500000
const STEP_MONTO = 1000

const tasaOpciones = [1, 1.5, 2, 2.5, 3]

/* ─── Estado ─── */
const monto = ref<number>(10000)
const inputMonto = ref<number>(10000)
const tasa = ref<number>(2) // 2% mensual por defecto
const tasaAnual = computed(() => Number((tasa.value * 12).toFixed(1)))
const projectionYears = [1, 2, 3, 4, 5]
const presets = [1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000]

const montoInputRef = ref<HTMLInputElement | null>(null)

/* ─── Debounce input ─── */
let debounceTimer: ReturnType<typeof setTimeout> | null = null

const onInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  let val = Number(target.value)

  if (Number.isNaN(val)) val = MIN_MONTO
  if (val < MIN_MONTO) val = MIN_MONTO
  if (val > MAX_MONTO) val = MAX_MONTO

  // Redondear al step más cercano
  val = Math.round(val / STEP_MONTO) * STEP_MONTO

  inputMonto.value = val

  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    monto.value = val
  }, 300)
}

const onRangeChange = (event: CustomEvent) => {
  const val = Number(event.detail.value)
  monto.value = val
  inputMonto.value = val
}

const setTasa = (r: number) => {
  tasa.value = r
}

const onTasaRangeChange = (event: CustomEvent) => {
  const val = Number(event.detail.value)
  if (!Number.isNaN(val)) {
    tasa.value = val
  }
}

/* ─── Cálculos ─── */
const gananciaMensual = computed(() => monto.value * (tasa.value / 100))
const gananciaAnual = computed(() => gananciaMensual.value * 12)
const total5Anios = computed(() => monto.value + gananciaAnual.value * 5)

const gananciaPorAnio = computed(() =>
  projectionYears.map(year => gananciaAnual.value * year)
)

const totalPorAnio = computed(() =>
  projectionYears.map(year => monto.value + gananciaAnual.value * year)
)

/* ─── Formateo ─── */
const currencyFormatter = new Intl.NumberFormat('es-GT', {
  style: 'currency',
  currency: 'GTQ',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const formatCurrency = (val: number): string => currencyFormatter.format(val)

const formatCompact = (val: number): string => {
  if (val >= 1000) {
    return (val / 1000) + 'K'
  }
  return String(val)
}

const percentFormatter = new Intl.NumberFormat('es-GT', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
})

const formatPercent = (val: number): string => percentFormatter.format(val)

/* ─── Animación de contador ─── */
const displayGananciaMensual = ref(formatCurrency(0))
const displayGananciaAnual = ref(formatCurrency(0))
const displayTotal5 = ref(formatCurrency(0))
const displayValues = ref<string[]>(projectionYears.map(() => formatCurrency(0)))
const displayTotals = ref<string[]>(projectionYears.map(() => formatCurrency(0)))

function animateValue(
  target: number,
  duration: number,
  setter: (v: string) => void
) {
  const startTime = performance.now()
  const startValue = 0

  const tick = (now: number) => {
    const elapsed = now - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = startValue + (target - startValue) * easeOut
    setter(formatCurrency(current))
    if (progress < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

watch(
  () => gananciaMensual.value,
  (newVal) => {
    animateValue(newVal, 600, (v) => { displayGananciaMensual.value = v })
  },
  { immediate: true }
)

watch(
  () => gananciaAnual.value,
  (newVal) => {
    animateValue(newVal, 600, (v) => { displayGananciaAnual.value = v })
  },
  { immediate: true }
)

watch(
  () => total5Anios.value,
  (newVal) => {
    animateValue(newVal, 800, (v) => { displayTotal5.value = v })
  },
  { immediate: true }
)

watch(
  () => gananciaPorAnio.value,
  (newVals) => {
    newVals.forEach((target, i) => {
      animateValue(target, 600, (v) => { displayValues.value[i] = v })
    })
  },
  { immediate: true }
)

watch(
  () => totalPorAnio.value,
  (newVals) => {
    newVals.forEach((target, i) => {
      animateValue(target, 600, (v) => { displayTotals.value[i] = v })
    })
  },
  { immediate: true }
)

/* ─── Estilo del indicador circular ─── */
const circleStyle = computed(() => {
  // Mapear tasa 1%-3% a 0%-100% del círculo
  const pct = Math.min(((tasa.value - 1) / 2) * 100, 100)
  return {
    background: `conic-gradient(var(--color-primary) 0% ${pct}%, rgba(255,255,255,0.08) ${pct}% 100%)`
  }
})

/* ─── CTA ─── */
const onNotifyClick = () => {
  window.dispatchEvent(new CustomEvent('open-investor-modal'))
}
</script>

<style scoped>
/* ─── Variables locales ─── */
.calculadora-section {
  --calc-bg: #0A0A0A;
  --calc-surface: #1E1E1E;
  --calc-accent: #EF4444;
  --calc-accent-soft: rgba(239, 68, 68, 0.15);
  --calc-text: #FFFFFF;
  --calc-text-muted: #9CA3AF;
  --calc-success: #10B981;
  --calc-border: rgba(255, 255, 255, 0.08);

  background-color: var(--calc-bg);
  padding: 80px 0 100px;
  position: relative;
  overflow: hidden;
}

/* ─── Fondo grid sutil ─── */
.calc-bg-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
  mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 20%, transparent 70%);
}

.container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

/* ─── Header ─── */
.calc-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-label {
  display: block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--calc-accent);
  margin-bottom: 12px;
}

.section-title {
  font-family: 'Oswald', system-ui, sans-serif;
  font-size: clamp(32px, 5vw, 40px);
  font-weight: 800;
  color: var(--calc-text);
  text-transform: uppercase;
  line-height: 1.1;
  margin-bottom: 16px;
}

.section-title .highlight {
  color: var(--calc-accent);
}

.shimmer-text {
  background: linear-gradient(90deg,
      var(--calc-accent) 0%,
      #ff9999 40%,
      var(--calc-accent) 50%,
      #ff9999 60%,
      var(--calc-accent) 100%);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: shimmer 2.5s infinite linear;
}

@keyframes shimmer {
  0% {
    background-position: -200% center;
  }

  100% {
    background-position: 200% center;
  }
}

.section-subtitle {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 16px;
  color: var(--calc-text-muted);
  max-width: 500px;
  margin: 0 auto 20px;
  line-height: 1.6;
}

.accent-separator {
  width: 40px;
  height: 2px;
  background-color: var(--calc-accent);
  margin: 0 auto;
  border-radius: 1px;
}

/* ─── Grid Calculadora ─── */
.calculadora-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-bottom: 40px;
}

.calc-col {
  display: flex;
  flex-direction: column;
}

/* ─── Panel Input ─── */
.input-panel {
  background: var(--calc-surface);
  border-radius: 16px;
  padding: 32px;
  border: 1px solid var(--calc-border);
  height: 100%;
  transition: all 0.3s ease;
  position: relative;
}

.input-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.06), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.input-panel:hover {
  border-color: rgba(239, 68, 68, 0.25);
  box-shadow: 0 10px 30px rgba(239, 68, 68, 0.1);
}

.input-panel:hover::before {
  opacity: 1;
}

.input-label {
  display: block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--calc-text-muted);
  margin-bottom: 12px;
}

.currency-input-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 28px;
  transition: all 0.3s ease;
}

.currency-input-wrapper:focus-within {
  border-color: var(--calc-accent);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2);
}

.currency-symbol {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 20px;
  font-weight: 700;
  color: var(--calc-accent);
  user-select: none;
}

.currency-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 24px;
  font-weight: 700;
  color: var(--calc-text);
  font-variant-numeric: tabular-nums;
  width: 100%;
}

.currency-input::-webkit-outer-spin-button,
.currency-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.currency-input::placeholder {
  color: rgba(255, 255, 255, 0.25) !important;
  opacity: 1 !important;
}

/* ─── Range ─── */
.range-group {
  margin-bottom: 24px;
}

.rate-range-group {
  margin-bottom: 0;
}

.range-label {
  display: block;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: var(--calc-text-muted);
  margin-bottom: 8px;
}

.monto-range {
  --bar-background: rgba(255, 255, 255, 0.701);
  --bar-background-active: rgba(239, 68, 68, 0.5);
  --bar-height: 6px;
  --bar-border-radius: 3px;
  --knob-background: #fff;
  --knob-size: 22px;
  --knob-box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
  --pin-background: #650505;
  --pin-color: #fff;
  padding: 0 4px;
}

.tasa-range {
  --bar-background: rgba(255, 255, 255, 0.1);
  --bar-background-active: #10B981;
  --bar-height: 6px;
  --bar-border-radius: 3px;
  --knob-background: #10B981;
  --knob-size: 22px;
  --knob-box-shadow: 0 0 10px rgba(16, 185, 129, 0.5);
  --pin-background: #10B981;
  --pin-color: #fff;
  padding: 0 4px;
}

.range-extremes {
  display: flex;
  justify-content: space-between;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  color: var(--calc-text-muted);
  margin-top: 4px;
  font-variant-numeric: tabular-nums;
}

/* ─── Amount Presets ─── */
.amount-presets {
  display: flex;
  gap: 0;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  overflow: hidden;
}

.preset-btn {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 12px 8px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--calc-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.preset-btn:last-child {
  border-right: none;
}

.preset-btn:first-child {
  border-radius: 8px 0 0 8px;
}

.preset-btn:last-child {
  border-radius: 0 8px 8px 0;
}

.preset-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.05);
}

.preset-btn.active {
  background: var(--calc-accent);
  color: #fff;
  border-color: transparent;
}

/* ─── Divider ─── */
.input-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 28px 0;
}

/* ─── Rate Chips ─── */
.rate-input-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.rate-chip {
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(148, 54, 54, 0.12);
  border-radius: 8px;
  padding: 10px 18px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: var(--calc-text-muted);
  cursor: pointer;
  transition: all 0.2s ease;
}

.rate-chip:hover {
  border-color: rgba(16, 185, 129, 0.5);
  color: #fff;
}

.rate-chip.active {
  background: rgba(16, 185, 129, 0.15);
  border-color: #10B981;
  color: #10B981;
}

/* ─── Rate Card ─── */
.rate-card {
  background: var(--calc-surface);
  border-radius: 16px;
  border: 1px solid var(--calc-border);
  margin: 0;
  box-shadow: none;
  position: relative;
  overflow: hidden;
  height: 100%;
}

.rate-card-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(127, 29, 29, 0.25) 0%, transparent 60%);
  pointer-events: none;
}

.rate-content {
  position: relative;
  z-index: 1;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100%;
  justify-content: center;
}

.rate-title {
  font-family: 'Oswald', system-ui, sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--calc-text-muted);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.rate-icon {
  font-size: 18px;
  color: var(--calc-accent);
}

.rate-indicator {
  margin-bottom: 20px;
}

.rate-circle {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  animation: pulse 2s ease-in-out infinite;
}

.rate-circle-inner {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background: var(--calc-surface);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 0 20px rgba(0, 0, 0, 0.5);
}

.rate-percentage {
  font-family: 'Oswald', system-ui, sans-serif;
  font-size: 36px;
  font-weight: 800;
  color: var(--calc-accent);
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.rate-period {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 500;
  color: var(--calc-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.rate-description {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 13px;
  color: var(--calc-text-muted);
  margin-bottom: 16px;
  max-width: 220px;
}

.rate-annual {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 6px 14px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: var(--calc-text);
}

.rate-annual-icon {
  font-size: 14px;
  color: var(--calc-accent);
}

/* ─── Métricas Destacadas ─── */
.metrics-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 40px;
}

.metric-card {
  background: var(--calc-surface);
  border: 1px solid var(--calc-border);
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.metric-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.12), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.metric-card:hover {
  transform: translateY(-6px);
  border-color: rgba(239, 68, 68, 0.4);
  box-shadow: 0 15px 35px rgba(239, 68, 68, 0.2);
}

.metric-card:hover::before {
  opacity: 1;
}

.metric-card.primary {
  border-color: rgba(16, 185, 129, 0.3);
  background: linear-gradient(180deg, rgba(16, 185, 129, 0.08) 0%, var(--calc-surface) 100%);
}

.metric-card.highlight {
  border-color: rgba(239, 68, 68, 0.3);
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--calc-surface) 100%);
}

.metric-label {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--calc-text-muted);
  margin-bottom: 12px;
}

.metric-value {
  font-family: 'Oswald', system-ui, sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  color: var(--calc-text);
  font-variant-numeric: tabular-nums;
  margin-bottom: 8px;
  line-height: 1.2;
  word-break: break-word;
}

.metric-value.accent {
  color: var(--calc-accent);
}

.metric-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 700;
  color: var(--calc-success);
  background: rgba(16, 185, 129, 0.15);
  padding: 4px 12px;
  border-radius: 20px;
}

.metric-sublabel {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  color: var(--calc-text-muted);
}

/* ─── Resultados ─── */
.resultados-wrapper {
  margin-bottom: 40px;
}

.resultados-scroll {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.resultado-card {
  background: var(--calc-surface);
  border: 1px solid var(--calc-border);
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  transition: all 0.3s ease;
  min-width: 0;
  position: relative;
}

.resultado-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.resultado-card:hover {
  transform: translateY(-6px);
  border-color: rgba(239, 68, 68, 0.4);
  box-shadow: 0 15px 35px rgba(239, 68, 68, 0.2);
}

.resultado-card:hover::before {
  opacity: 1;
}

.resultado-card.destaque {
  border-color: rgba(239, 68, 68, 0.3);
  background: linear-gradient(180deg, rgba(239, 68, 68, 0.08) 0%, var(--calc-surface) 100%);
}

.resultado-card.destaque:hover {
  border-color: rgba(239, 68, 68, 0.5);
  box-shadow: 0 15px 35px rgba(239, 68, 68, 0.25);
}

.resultado-periodo {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--calc-text-muted);
  margin-bottom: 12px;
}

.resultado-valor {
  font-family: 'Oswald', system-ui, sans-serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 700;
  color: var(--calc-text);
  font-variant-numeric: tabular-nums;
  margin-bottom: 8px;
  line-height: 1.2;
  word-break: break-word;
}

.resultado-card.destaque .resultado-valor {
  color: var(--calc-accent);
  font-size: clamp(22px, 3vw, 28px);
}

.resultado-total {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 11px;
  color: var(--calc-text-muted);
  font-variant-numeric: tabular-nums;
  margin-bottom: 4px;
}

.resultado-roi {
  font-family: 'Inter', system-ui, sans-serif;
  font-size: 10px;
  font-weight: 700;
  color: var(--calc-success);
  letter-spacing: 0.05em;
}

/* ─── CTA ─── */
.cta-wrapper {
  display: flex;
  justify-content: center;
}

.cta-btn {
  position: relative;
  overflow: hidden;
  animation: pulse-glow 2.5s ease-in-out infinite;
}

.cta-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent);
  transition: left 0.6s ease;
  z-index: 0;
}

.cta-btn:hover::before {
  left: 100%;
}

.cta-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 8px 30px rgba(230, 57, 70, 0.45);
}

@keyframes pulse-glow {

  0%,
  100% {
    box-shadow: 0 0 15px rgba(239, 68, 68, 0.3), 0 4px 15px rgba(207, 46, 46, 0.2);
  }

  50% {
    box-shadow: 0 0 35px rgba(239, 68, 68, 0.5), 0 4px 20px rgba(207, 46, 46, 0.3);
  }
}

/* ─── FAB ─── */
.currency-fab-wrapper {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
}

.currency-fab {
  --background: var(--calc-accent);
  --background-activated: #dc2626;
  --box-shadow: 0 4px 16px rgba(239, 68, 68, 0.4);
}

/* ─── Responsive ─── */
@media (max-width: 1024px) {
  .calculadora-grid {
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .metrics-row {
    grid-template-columns: repeat(2, 1fr);
  }

  .resultados-scroll {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .calculadora-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .rate-card {
    min-height: 280px;
  }
}

@media (max-width: 768px) {
  .calculadora-section {
    padding: 60px 0 80px;
  }

  .calculadora-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .input-panel {
    padding: 24px;
  }

  /* Ranges más compactos */
  .monto-range,
  .tasa-range {
    --knob-size: 20px;
    --bar-height: 4px;
    --knob-box-shadow: 0 0 6px rgba(239, 68, 68, 0.4);
    padding: 0;
  }

  .tasa-range {
    --knob-box-shadow: 0 0 6px rgba(16, 185, 129, 0.4);
  }

  /* Amount presets: grid de 4 columnas en tablet */
  .amount-presets {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
    background: transparent;
    border-radius: 0;
  }

  .preset-btn {
    width: 100%;
    border-right: none;
    border-radius: 8px;
    padding: 10px 4px;
    font-size: 12px;
  }

  .preset-btn:first-child,
  .preset-btn:last-child {
    border-radius: 8px;
  }

  /* Rate chips más compactos */
  .rate-input-row {
    gap: 8px;
  }

  .rate-chip {
    padding: 8px 14px;
    font-size: 13px;
    flex: 1 1 auto;
    min-width: 48px;
    text-align: center;
  }

  /* Rate card */
  .rate-card {
    min-height: auto;
  }

  .rate-content {
    padding: 24px 20px;
  }

  .rate-title {
    font-size: 12px;
    letter-spacing: 0.1em;
    margin-bottom: 16px;
  }

  .rate-circle {
    width: 110px;
    height: 110px;
  }

  .rate-circle-inner {
    width: 82px;
    height: 82px;
  }

  .rate-percentage {
    font-size: 26px;
  }

  .metrics-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .metric-card {
    padding: 20px 12px;
  }

  .resultados-scroll {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 12px;
    padding-bottom: 12px;
    -webkit-overflow-scrolling: touch;
  }

  .resultados-scroll::-webkit-scrollbar {
    height: 4px;
  }

  .resultados-scroll::-webkit-scrollbar-track {
    background: transparent;
  }

  .resultados-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.15);
    border-radius: 2px;
  }

  .resultado-card {
    flex: 0 0 calc(60% - 6px);
    min-width: 140px;
    scroll-snap-align: start;
  }

  /* FAB más pequeño */
  .currency-fab-wrapper {
    bottom: 16px;
    right: 16px;
  }

  .currency-fab {
    --box-shadow: 0 2px 10px rgba(239, 68, 68, 0.3);
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 16px;
  }

  .section-title {
    font-size: clamp(22px, 7vw, 28px);
  }

  .section-subtitle {
    font-size: 14px;
    padding: 0 8px;
  }

  .input-panel {
    padding: 20px 16px;
  }

  .currency-input-wrapper {
    padding: 12px 14px;
    gap: 6px;
  }

  .currency-symbol {
    font-size: 16px;
  }

  .currency-input {
    font-size: 18px;
    min-width: 0;
  }

  .range-label {
    font-size: 11px;
  }

  /* Amount presets: grid de 2 columnas en mobile */
  .amount-presets {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    background: transparent;
    border-radius: 0;
  }

  .preset-btn {
    width: 100%;
    border-right: none;
    border-radius: 8px;
    height: 44px;
    padding: 8px 4px;
    font-size: 14px;
  }

  .preset-btn:first-child,
  .preset-btn:last-child {
    border-radius: 8px;
  }

  /* Rate chips */
  .rate-chip {
    padding: 8px 12px;
    font-size: 12px;
    min-width: 44px;
  }

  /* Rate card */
  .rate-card {
    min-height: auto;
  }

  .rate-content {
    padding: 20px 16px;
  }

  .rate-title {
    font-size: 11px;
    letter-spacing: 0.1em;
    margin-bottom: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    display: block;
  }

  .rate-circle {
    width: 100px;
    height: 100px;
  }

  .rate-circle-inner {
    width: 74px;
    height: 74px;
  }

  .rate-percentage {
    font-size: 24px;
  }

  .rate-period {
    font-size: 10px;
  }

  .rate-description {
    font-size: 12px;
    margin-bottom: 12px;
    max-width: 200px;
  }

  .rate-annual {
    font-size: 11px;
    padding: 5px 12px;
  }

  /* Métricas */
  .metrics-row {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .metric-card {
    padding: 16px 10px;
    border-radius: 12px;
  }

  .metric-label {
    font-size: 9px;
    margin-bottom: 8px;
  }

  .metric-value {
    font-size: 15px;
    margin-bottom: 6px;
  }

  .metric-badge {
    font-size: 10px;
    padding: 3px 8px;
  }

  .metric-sublabel {
    font-size: 10px;
  }

  /* Resultados scroll */
  .resultado-card {
    flex: 0 0 calc(72% - 6px);
    padding: 18px 12px;
    border-radius: 12px;
  }

  .resultado-valor {
    font-size: 18px;
  }

  .resultado-card.destaque .resultado-valor {
    font-size: 20px;
  }

  .resultado-periodo {
    font-size: 10px;
  }

  /* CTA */
  .cta-btn {
    width: 100%;
    justify-content: center;
    padding: 14px 24px;
    font-size: 13px;
  }

  /* FAB */
  .currency-fab-wrapper {
    bottom: 12px;
    right: 12px;
  }

  .currency-fab {
    width: 40px;
    height: 40px;
  }
}

/* iPhone SE y pantallas muy pequeñas */
@media (max-width: 375px) {
  .input-panel {
    padding: 16px 12px;
  }

  .currency-input-wrapper {
    padding: 10px 12px;
  }

  .currency-input {
    font-size: 16px;
  }

  .preset-btn {
    height: 40px;
    padding: 6px 4px;
    font-size: 13px;
  }

  .rate-chip {
    padding: 6px 10px;
    font-size: 11px;
    min-width: 40px;
  }

  .rate-content {
    padding: 16px 12px;
  }

  .rate-circle {
    width: 90px;
    height: 90px;
  }

  .rate-circle-inner {
    width: 66px;
    height: 66px;
  }

  .rate-percentage {
    font-size: 22px;
  }

  .rate-title {
    font-size: 10px;
  }

  .metric-value {
    font-size: 14px;
  }

  .resultado-card {
    flex: 0 0 calc(75% - 6px);
    padding: 16px 10px;
  }

  .resultado-valor {
    font-size: 16px;
  }

  .resultado-card.destaque .resultado-valor {
    font-size: 18px;
  }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {
  .rate-circle {
    animation: none;
  }

  .resultado-card,
  .currency-input-wrapper,
  .cta-investor {
    transition: none;
  }
}

/* ─── Pulse animation ─── */
@keyframes pulse {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3);
  }

  50% {
    box-shadow: 0 0 0 12px rgba(239, 68, 68, 0);
  }
}
</style>
