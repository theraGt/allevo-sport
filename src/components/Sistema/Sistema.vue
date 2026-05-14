<template>
    <section class="sistema-section" id="sistema">
        <div class="bg-grid"></div>
        <div class="container">
            <header class="page-header">
                <div class="header-watermark" aria-hidden="true">ALLEVO SYSTEM</div>
                <div class="header-content">
                    <div class="header-eyebrow">
                        <span class="live-dot"></span>
                        <span class="badge-text">SISTEMA ACTIVO</span>
                    </div>
                    <h1 class="page-title">
                        SISTEMA <span class="ampersand">&amp;</span> <span class="highlight">TALENTOS</span>
                    </h1>
                    <p class="page-subtitle">La estructura que impulsa a nuestros atletas hacia la victoria</p>
                </div>
            </header>

            <!-- Comparación Talento vs Inversionista -->
            <div class="comparison-section" v-reveal="'fade-up'">
                <div class="comparison-grid">
                    <!-- Tarjeta Talento -->
                    <div class="role-card talento" v-reveal="'fade-up'" :class="'delay-1'">
                        <div class="card-header">
                            <ion-icon :icon="trophyOutline"></ion-icon>
                            <h3>TALENTO</h3>
                        </div>
                        <p class="role-description">Convierte tu carrera deportiva en un activo financiero. Gana entre el 1% y 3% mensual mientras creces.</p>
                        
                        <table class="comparison-table">
                            <thead>
                                <tr>
                                    <th>Inversión</th>
                                    <th>Retorno</th>
                                    <th>Ganancia</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in talentoRows" :key="'t-' + index">
                                    <td class="amount">Q{{ formatNumber(row.inversion) }}</td>
                                    <td class="percentage">{{ row.retorno }}%</td>
                                    <td class="gain">+Q{{ formatNumber(row.ganancia) }}/mes</td>
                                </tr>
                            </tbody>
                        </table>

                        <button class="btn-cta talento-cta" @click="openAtletasModal">
                            POSTULARME COMO TALENTO
                        </button>
                    </div>

                    <!-- Tarjeta Inversionista -->
                    <div class="role-card inversionista" v-reveal="'fade-up'" :class="'delay-2'">
                        <div class="card-header">
                            <ion-icon :icon="trendingUpOutline"></ion-icon>
                            <h3>INVERSIONISTA</h3>
                        </div>
                        <p class="role-description">Impulsa talentos emergentes y genera retornos del 1% al 3% mensual. Tu inversión, su éxito.</p>
                        
                        <table class="comparison-table">
                            <thead>
                                <tr>
                                    <th>Inversión</th>
                                    <th>Retorno</th>
                                    <th>Ganancia</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, index) in inversionistaRows" :key="'i-' + index">
                                    <td class="amount">Q{{ formatNumber(row.inversion) }}</td>
                                    <td class="percentage">{{ row.retorno }}%</td>
                                    <td class="gain">+Q{{ formatNumber(row.ganancia) }}/mes</td>
                                </tr>
                            </tbody>
                        </table>

                        <button class="btn-cta inversionista-cta" @click="openInversionistaModal">
                            QUIERO INVERTIR
                        </button>
                    </div>
                </div>
            </div>

            <!-- Cards del Sistema -->
            <CardSistema />

            <!-- Coming Soon Section -->
            <ComingSoonSection />

            <!-- Calculadora de rendimiento -->
            <CalculadoraRendimiento />
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { IonIcon } from '@ionic/vue'
import { useAtletasModal } from '../../composables/useAtletasModal'
import { useInversionistaModal } from '../../composables/useInversionistaModal'
import CalculadoraRendimiento from './CalculadoraRendimiento.vue'
import ComingSoonSection from './ComingSoonSection.vue'
import CardSistema from './CardSistema.vue'
import { trophyOutline, trendingUpOutline } from 'ionicons/icons'

const { openAtletasModal } = useAtletasModal()
const { openInversionistaModal } = useInversionistaModal()

const formatNumber = (num: number): string => {
    return num.toLocaleString('es-GT')
}

const talentoRows = computed(() => [
    { inversion: 5000, retorno: 1, ganancia: 50 },
    { inversion: 10000, retorno: 2, ganancia: 200 },
    { inversion: 25000, retorno: 3, ganancia: 750 }
])

const inversionistaRows = computed(() => [
    { inversion: 1000, retorno: 1, ganancia: 10 },
    { inversion: 5000, retorno: 2, ganancia: 100 },
    { inversion: 50000, retorno: 3, ganancia: 1500 }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Oswald:wght@400;500;600;700&display=swap');

/* ─── Comparison Section ─── */
.comparison-section {
    padding: 80px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.comparison-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
}

.role-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    overflow: hidden;
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
}

.role-card.talento {
    border-left: 4px solid #EF4444;
}

.role-card.inversionista {
    border-left: 4px solid #10B981;
}

.role-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.role-card.talento:hover {
    box-shadow: 0 20px 40px rgba(239, 68, 68, 0.1);
}

.role-card.inversionista:hover {
    box-shadow: 0 20px 40px rgba(16, 185, 129, 0.1);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 24px 24px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.card-header ion-icon {
    font-size: 28px;
    color: #EF4444;
}

.role-card.inversionista .card-header ion-icon {
    color: #10B981;
}

.card-header h3 {
    font-family: 'Oswald', sans-serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #FFFFFF;
    text-transform: uppercase;
    letter-spacing: 2px;
    margin: 0;
}

.role-description {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: #9CA3AF;
    line-height: 1.6;
    padding: 20px 24px;
    margin: 0;
}

.comparison-table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 0 0 16px 0;
}

.comparison-table th {
    background: rgba(239, 68, 68, 0.1);
    color: #EF4444;
    font-family: 'Oswald', sans-serif;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 2px;
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.comparison-table td {
    padding: 14px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
}

.comparison-table tr:nth-child(even) td {
    background: rgba(255, 255, 255, 0.03);
}

.comparison-table tr:hover td {
    background: rgba(239, 68, 68, 0.05);
    transform: translateX(4px);
    transition: all 0.2s ease;
}

.comparison-table .amount {
    color: #FFFFFF;
    font-weight: 700;
}

.comparison-table .percentage {
    color: #9CA3AF;
}

.comparison-table .gain {
    color: #EF4444;
    font-weight: 700;
    font-size: 16px;
}

.accordion {
    padding: 0 24px 16px;
}

.accordion-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 8px;
    padding: 12px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.accordion-toggle:hover {
    background: rgba(255, 255, 255, 0.05);
}

.accordion-toggle span {
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #FFFFFF;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.accordion-toggle ion-icon {
    font-size: 20px;
    color: #9CA3AF;
    transition: transform 0.3s ease;
}

.accordion-toggle ion-icon.rotated {
    transform: rotate(180deg);
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
    opacity: 0;
}

.accordion-content.v-show {
    max-height: 300px;
    opacity: 1;
}

.accordion-content p {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    color: #9CA3AF;
    line-height: 1.7;
    padding: 16px;
    margin: 8px 0 0;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
}

.accordion-content.v-show {
    max-height: 300px;
}

.btn-cta {
    margin: 0 24px 24px;
    padding: 14px 24px;
    border: none;
    border-radius: 8px;
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-cta.talento-cta {
    background: linear-gradient(135deg, #EF4444 0%, #B91C1C 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.btn-cta.talento-cta:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.5);
}

.btn-cta.inversionista-cta {
    background: linear-gradient(135deg, #10B981 0%, #047857 100%);
    color: #FFFFFF;
    box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
}

.btn-cta.inversionista-cta:hover {
    transform: translateY(-2px) scale(1.02);
    box-shadow: 0 8px 25px rgba(16, 185, 129, 0.5);
}

/* ─── Responsive Comparison ─── */
@media (max-width: 1024px) {
    .comparison-section {
        padding: 60px 20px;
    }

    .comparison-grid {
        gap: 24px;
    }
}

@media (max-width: 768px) {
    .comparison-section {
        padding: 40px 16px;
    }

    .comparison-grid {
        grid-template-columns: 1fr;
    }

    .card-header {
        padding: 20px 20px 12px;
    }

    .card-header ion-icon {
        font-size: 24px;
    }

    .card-header h3 {
        font-size: 1.25rem;
    }

    .role-description {
        padding: 16px 20px;
        font-size: 0.9rem;
    }

    .comparison-table {
        font-size: 13px;
    }

    .comparison-table th,
    .comparison-table td {
        padding: 10px 12px;
    }

    .comparison-table .gain {
        font-size: 14px;
    }

    .accordion {
        padding: 0 20px 12px;
    }

    .btn-cta {
        margin: 0 20px 20px;
        padding: 12px 20px;
        font-size: 12px;
    }
}

.sistema-section {
    padding: 100px 0;
    background-color: #0A0A0A;
    position: relative;
    overflow: hidden;
}

/* ─── Fondo grid sutil ─── */
.bg-grid {
    position: absolute;
    inset: 0;
    background-image:
        linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
    mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
    -webkit-mask-image: radial-gradient(ellipse at center, black 30%, transparent 80%);
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
    position: relative;
    z-index: 1;
}

/* ─── Page Header ─── */
.page-header {
    position: relative;
    overflow: hidden;
    text-align: center;
    padding: 80px 24px 40px;
}

.header-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: 'Oswald', sans-serif;
    font-size: clamp(120px, 15vw, 200px);
    font-weight: 900;
    color: #1A0505;
    opacity: 0.2;
    white-space: nowrap;
    letter-spacing: 0.1em;
    pointer-events: none;
    user-select: none;
    line-height: 1;
    text-transform: uppercase;
    z-index: 0;
}

.header-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.header-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 24px;
}

.live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #EF4444;
    animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {

    0%,
    100% {
        transform: scale(1);
        opacity: 1;
    }

    50% {
        transform: scale(1.3);
        opacity: 0.5;
    }
}

.badge-text {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 600;
    color: #EF4444;
    text-transform: uppercase;
    letter-spacing: 3px;
}

.page-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(32px, 5vw, 64px);
    font-weight: 800;
    line-height: 1.1;
    text-transform: uppercase;
    color: #FFFFFF;
    margin: 0;
}

.page-title .ampersand {
    color: #FFFFFF;
}

.page-title .highlight {
    color: #EF4444;
}

.page-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: clamp(14px, 2vw, 18px);
    color: #9CA3AF;
    margin: 16px 0 0;
    line-height: 1.5;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
    .page-header {
        padding: 60px 16px 32px;
    }

    .header-watermark {
        font-size: clamp(60px, 18vw, 120px);
    }

    .page-title {
        font-size: clamp(28px, 8vw, 42px);
    }

    .page-subtitle {
        font-size: 14px;
        padding: 0 8px;
    }
}

@media (max-width: 480px) {
    .sistema-section {
        padding: 40px 0;
    }

    .page-header {
        padding: 48px 12px 24px;
    }

    .header-watermark {
        font-size: clamp(48px, 20vw, 80px);
    }

    .header-eyebrow {
        margin-bottom: 16px;
    }

    .page-title {
        font-size: clamp(24px, 10vw, 32px);
    }

    .page-subtitle {
        font-size: 13px;
    }
}
</style>
