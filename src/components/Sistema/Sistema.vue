<template>
    <section class="sistema-section" id="sistema" ref="sectionRef">
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

            <!-- Métrica flotante -->
            <div class="metric-float" v-reveal="'fade-up'">
                <div class="metric-number">
                    <span class="currency">Q</span>
                    <span class="count">{{ formattedMetric }}</span>
                    <span class="suffix">M+</span>
                </div>
                <div class="metric-label">gestionados en talentos deportivos</div>
            </div>

            <!-- ROW 1: Cards | Image | Cards -->
            <div class="sistema-layout">
                <!-- LEFT COLUMN -->
                <div class="sistema-col left-col">
                    <div class="info-card" v-reveal="'fade-up'" :class="'delay-1'">
                        <div class="card-glow"></div>
                        <h4>BENEFICIOS</h4>
                        <ul>
                            <li v-for="item in steps[0].items" :key="item">
                                <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="4">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg></span> {{ item }}
                            </li>
                        </ul>
                    </div>
                    <div class="info-card" v-reveal="'fade-up'" :class="'delay-2'">
                        <div class="card-glow"></div>
                        <h4>ESTRUCTURA DE INVERSIÓN</h4>
                        <ul>
                            <li v-for="item in steps[2].items" :key="item">
                                <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="4">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg></span> {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>

                <!-- CENTER COLUMN -->
                <div class="sistema-col center-col" v-reveal="'zoom-in'">
                    <div class="image-wrapper">
                        <img src="/assets/images/Sistema.webp" alt="Atleta Allevo" class="athlete-image" />
                        <div class="image-overlay"></div>
                        <div class="trust-badges">
                            <div class="trust-badge" v-reveal="'fade-up'" :class="'delay-3'">
                                <span class="badge-dot"></span>
                                <span>ROI hasta 36% anual</span>
                            </div>
                            <div class="trust-badge" v-reveal="'fade-up'" :class="'delay-4'">
                                <span class="badge-dot green"></span>
                                <span>Activos reales</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- RIGHT COLUMN -->
                <div class="sistema-col right-col">
                    <div class="info-card" v-reveal="'fade-up'" :class="'delay-2'">
                        <div class="card-glow"></div>
                        <h4>ÁREAS DE TRABAJO</h4>
                        <ul>
                            <li v-for="item in steps[1].items" :key="item">
                                <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="4">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg></span> {{ item }}
                            </li>
                        </ul>
                    </div>
                    <div class="info-card" v-reveal="'fade-up'" :class="'delay-3'">
                        <div class="card-glow"></div>
                        <h4>PROPÓSITO DEL RENDIMIENTO</h4>
                        <ul>
                            <li v-for="item in steps[3].items" :key="item">
                                <span class="check"><svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" stroke-width="4">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg></span> {{ item }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="cta-row" v-reveal="'scale-in-spring'">
                <a href="/talento/#quiero_ser_un_talento" class="btn-primary cta-btn">
                    <span class="shimmer-text">FORMULARIO</span>
                </a>
            </div>

            <!-- Calculadora de rendimiento -->
            <CalculadoraRendimiento />
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useCountUp } from '../../composables/useCountUp'
import CalculadoraRendimiento from './CalculadoraRendimiento.vue'

const steps = ref([
    {
        number: '01',
        title: 'Beneficios',
        items: [
            'Creación y desarrollo de marca personal',
            'Posicionamiento y relevancia en espacios clave',
            'Comunidad sólida construida desde cero'
        ],
        icon: 'star'
    },
    {
        number: '02',
        title: 'Áreas de trabajo',
        items: [
            'Sponsors y alianzas estratégicas',
            'Alcance y posicionamiento de marca',
            'Diversificación personal de ingresos'
        ],
        icon: 'users'
    },
    {
        number: '03',
        title: 'Estructura de Inversión',
        items: [
            'Retornos estimados del 1% al 3% mensual',
            'Tu talento como activo de inversión real',
            'Ganas mientras impulsas una carrera'
        ],
        icon: 'chart'
    },
    {
        number: '04',
        title: 'Propósito del rendimiento',
        items: [
            'Crear contenido de alto valor',
            'Fortalecer presencia digital',
            'Convertirte en una superestrella'
        ],
        icon: 'target'
    }
])

/* ─── Métrica animada ─── */
const sectionRef = ref<HTMLElement | null>(null)
const metricAnimated = ref(false)

const metricCount = useCountUp(25, 2000, { startImmediately: false, decimals: 1 })

const formattedMetric = computed(() => {
    return metricCount.currentValue.value.toFixed(1)
})

onMounted(() => {
    if (!sectionRef.value) return
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !metricAnimated.value) {
                    metricAnimated.value = true
                    metricCount.start()
                    observer.disconnect()
                }
            })
        },
        { threshold: 0.2 }
    )
    observer.observe(sectionRef.value)
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Oswald:wght@400;500;600;700&display=swap');

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

/* ─── Métrica flotante ─── */
.metric-float {
    text-align: center;
    margin-bottom: 50px;
    position: relative;
    z-index: 2;
}

.metric-number {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 700;
    color: #e63946;
    line-height: 1;
    display: flex;
    align-items: baseline;
    justify-content: center;
    gap: 2px;
}

.metric-number .currency {
    font-size: 0.6em;
    font-weight: 500;
    opacity: 0.8;
}

.metric-number .suffix {
    font-size: 0.6em;
    font-weight: 500;
    opacity: 0.8;
}

.metric-float .metric-label {
    font-family: 'Inter', sans-serif;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 8px;
}

/* ─── MAIN LAYOUT ─── */
.sistema-layout {
    display: grid;
    grid-template-columns: 240px 1fr 240px;
    gap: 28px;
    align-items: center;
    min-height: 620px;
}

.sistema-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    justify-content: center;
}

/* ─── CENTER IMAGE ─── */
.image-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 4px;
}

.athlete-image {
    width: 100%;
    height: 620px;
    object-fit: cover;
    object-position: center top;
    display: block;
    transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.center-col:hover .athlete-image {
    transform: scale(1.04);
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(11, 11, 11, 0.85) 0%, transparent 40%);
    pointer-events: none;
    z-index: 1;
}

/* ─── Trust Badges ─── */
.trust-badges {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 12px;
    z-index: 2;
    flex-wrap: wrap;
    justify-content: center;
}

.trust-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50px;
    padding: 8px 16px;
    font-family: 'Inter', sans-serif;
    font-size: 0.75rem;
    font-weight: 600;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    white-space: nowrap;
}

.badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e63946;
    box-shadow: 0 0 8px rgba(230, 57, 70, 0.6);
    animation: pulse-dot 2s ease-in-out infinite;
}

.badge-dot.green {
    background: #10B981;
    box-shadow: 0 0 8px rgba(16, 185, 129, 0.6);
}

@keyframes pulse-dot {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.6;
        transform: scale(1.2);
    }
}

/* ─── INFO CARDS ─── */
.info-card {
    background: #1a1a1a;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 14px;
    padding: 22px 20px;
    flex: 1;
    position: relative;
    overflow: hidden;
    transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    will-change: transform, box-shadow;
}

.card-glow {
    position: absolute;
    inset: 0;
    border-radius: inherit;
    opacity: 0;
    background: radial-gradient(circle at 50% 0%, rgba(230, 57, 70, 0.12), transparent 60%);
    transition: opacity 0.4s ease;
    pointer-events: none;
    z-index: 0;
}

.info-card:hover {
    transform: translateY(-8px);
    border-color: rgba(230, 57, 70, 0.35);
    box-shadow: 0 20px 50px rgba(230, 57, 70, 0.12), 0 0 0 1px rgba(230, 57, 70, 0.15);
}

.info-card:hover .card-glow {
    opacity: 1;
}

.info-card h4 {
    font-family: 'Oswald', sans-serif;
    font-size: 0.85rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 16px;
    position: relative;
    z-index: 1;
}

.info-card ul {
    list-style: none;
    padding: 0;
    margin: 0;
    position: relative;
    z-index: 1;
}

.info-card li {
    font-family: 'Inter', sans-serif;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.7);
    padding: 7px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    line-height: 1.4;
    transition: color 0.2s ease;
}

.info-card:hover li {
    color: rgba(255, 255, 255, 0.85);
}

.check {
    color: #e63946;
    font-weight: 700;
    font-size: 0.75rem;
    flex-shrink: 0;
    width: 22px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(230, 57, 70, 0.12);
    border-radius: 50%;
    transition: all 0.3s ease;
}

.info-card:hover .check {
    background: rgba(230, 57, 70, 0.22);
    transform: scale(1.1);
}

.check svg {
    width: 10px;
    height: 10px;
}

/* ─── CTA BUTTON ─── */
.cta-row {
    display: flex;
    justify-content: center;
    margin-top: 60px;
    position: relative;
    z-index: 2;
}

.cta-btn {
    position: relative;
    overflow: hidden;
    animation: pulse-glow 2.5s ease-in-out infinite;
    padding: 16px 56px;
    font-size: 1.05rem;
    letter-spacing: 0.15em;
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
            rgba(184, 34, 34, 0.25),
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

.shimmer-text {
    position: relative;
    z-index: 1;
    background: linear-gradient(90deg,
            #ffffff 0%,
            #ffe4e4 30%,
            #ffffff 50%,
            #ffe4e4 70%,
            #ffffff 100%);
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

@keyframes pulse-glow {

    0%,
    100% {
        box-shadow: 0 0 15px rgba(230, 57, 70, 0.3), 0 4px 15px rgba(207, 46, 46, 0.2);
    }

    50% {
        box-shadow: 0 0 35px rgba(230, 57, 70, 0.5), 0 4px 20px rgba(207, 46, 46, 0.3);
    }
}

/* ─── RESPONSIVE ─── */
@media (max-width: 1024px) {
    .sistema-layout {
        grid-template-columns: 200px 1fr 200px;
        gap: 18px;
    }

    .athlete-image {
        height: 520px;
    }
}

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

    .sistema-layout {
        grid-template-columns: 1fr;
        gap: 24px;
        min-height: auto;
    }

    .center-col {
        order: -1;
    }

    .athlete-image {
        height: 360px;
    }

    .left-col,
    .right-col {
        flex-direction: column;
        gap: 16px;
    }

    .info-card {
        flex: 1 1 100%;
        padding: 20px 18px;
    }

    .info-card h4 {
        font-size: 0.8rem;
    }

    .info-card li {
        font-size: 0.8rem;
    }

    .trust-badges {
        position: relative;
        bottom: auto;
        left: auto;
        transform: none;
        margin-top: 16px;
        justify-content: center;
    }

    .trust-badge {
        font-size: 0.7rem;
        padding: 6px 12px;
    }

    .metric-float {
        margin-bottom: 32px;
    }

    .metric-number {
        font-size: clamp(1.8rem, 8vw, 2.5rem);
    }

    .cta-row {
        margin-top: 40px;
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

    .sistema-layout {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .left-col,
    .right-col {
        flex-direction: column;
        gap: 12px;
    }

    .info-card {
        flex: 1 1 100%;
        padding: 18px 16px;
    }

    .info-card h4 {
        font-size: 0.75rem;
        margin-bottom: 12px;
    }

    .info-card li {
        font-size: 0.78rem;
        padding: 6px 0;
    }

    .athlete-image {
        height: 280px;
    }

    .trust-badges {
        flex-wrap: wrap;
        gap: 8px;
    }

    .trust-badge {
        font-size: 0.65rem;
        padding: 5px 10px;
    }

    .cta-row {
        margin-top: 32px;
        padding: 0 16px;
    }

    .cta-btn {
        width: 100%;
        justify-content: center;
        padding: 14px 32px;
        font-size: 0.95rem;
    }
}

/* ─── Reduced motion ─── */
@media (prefers-reduced-motion: reduce) {

    .athlete-image,
    .info-card,
    .check,
    .card-glow,
    .cta-btn,
    .shimmer-text,
    .badge-dot {
        animation: none !important;
        transition: none !important;
    }
}
</style>
