<template>
    <section class="sistema-section" id="sistema">
        <div class="container">
            <header class="section-header">
                <span class="subtitle">Nuestros Atletas</span>
                <h2 class="title-overlay">UN MOTOR UN MOTOR DETRÁS DE LAS VICTORIAS</h2>
                <div class="accent-line"></div>
            </header>

            <!-- ROW 1: Cards | Image | Cards -->
            <div class="sistema-top-row">
                <!-- Left Cards -->
                <div class="cards-side left-cards">
                    <div class="step-card" v-reveal="'fade-right'">
                        <div class="card-glow"></div>
                        <div class="step-number">01</div>
                        <div class="step-content">
                            <h4>BENEFICIOS</h4>
                            <ul>
                                <li v-for="item in steps[0].items" :key="item">
                                    <span class="check">✓</span> {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="step-card delay-1" v-reveal="'fade-right'">
                        <div class="card-glow"></div>
                        <div class="step-number">02</div>
                        <div class="step-content">
                            <h4>ÁREAS DE TRABAJO</h4>
                            <ul>
                                <li v-for="item in steps[1].items" :key="item">
                                    <span class="check">✓</span> {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Center Image -->
                <div class="center-col" v-reveal="'zoom-in'">
                    <div class="image-wrapper" :style="parallaxStyle">
                        <img src="/assets/images/Sistema.webp" alt="Atleta Allevo" class="athlete-image" />
                        <div class="image-overlay-glow"></div>
                    </div>
                </div>

                <!-- Right Cards -->
                <div class="cards-side right-cards">
                    <div class="step-card" v-reveal="'fade-left'">
                        <div class="card-glow"></div>
                        <div class="step-number">03</div>
                        <div class="step-content">
                            <h4>ESTRUCTURA DE INVERSIÓN</h4>
                            <ul>
                                <li v-for="item in steps[2].items" :key="item">
                                    <span class="check">✓</span> {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="step-card delay-1" v-reveal="'fade-left'">
                        <div class="card-glow"></div>
                        <div class="step-number">04</div>
                        <div class="step-content">
                            <h4>PROPÓSITO DEL RENDIMIENTO</h4>
                            <ul>
                                <li v-for="item in steps[3].items" :key="item">
                                    <span class="check">✓</span> {{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <!-- CTA -->
            <div class="cta-row" v-reveal="'scale-in-spring'">
                <a href="/talento/#quiero_ser_un_talento" class="cta-btn">FORMULARIO</a>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMouseParallax } from '@/composables/useMouseParallax'

const { parallaxStyle } = useMouseParallax(15)

const steps = ref([
    {
        number: '01',
        title: 'Beneficios',
        items: ['Marca', 'Comercialización', 'Comunidad'],
        icon: 'star'
    },
    {
        number: '02',
        title: 'Áreas de trabajo',
        items: ['Marca personal', 'Alcance & posicionamiento', 'Diversificación'],
        icon: 'users'
    },
    {
        number: '03',
        title: 'Estructura de Inversión',
        items: ['Carrera del talento 1% - 2%', 'Inversión del cliente 1% - 2%', 'Rendimiento mensual'],
        icon: 'chart'
    },
    {
        number: '04',
        title: 'Propósito del rendimiento',
        items: ['Vivienda', 'Entreno', 'Nutrición', 'Pauta publicitaria'],
        icon: 'target'
    }
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&family=Oswald:wght@400;500;600;700&display=swap');

.sistema-section {
    padding: 100px 0;
    background-color: #0b0b0b;
    position: relative;
    overflow: hidden;
}

.container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}

.section-header {
    position: relative;
    z-index: 2;
    text-align: center;
    margin-bottom: 50px;
}

.title-overlay {
    position: relative;
    z-index: 2;
    text-align: center;
    font-family: 'Oswald', sans-serif;
    font-size: clamp(1rem, 3vw, 4rem);
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    margin-bottom: 20px;
}

.subtitle {
    display: block;
    position: relative;
    z-index: 2;
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 3px;
    color: #e63946;
    margin-bottom: 10px;
}

.accent-line {
    position: relative;
    z-index: 2;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #e63946, #ff6b6b);
    margin: 0 auto;
    border-radius: 2px;
}

.display-4 {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    font-weight: 700;
    color: #fff;
    text-transform: uppercase;
    margin-bottom: 20px;
    letter-spacing: 2px;
}

.lead {
    font-family: 'Inter', sans-serif;
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.7);
    max-width: 600px;
    margin: 0 auto;
}

/* ---- TOP ROW: Cards | Image | Cards ---- */
.sistema-top-row {
    display: grid;
    grid-template-columns: 1fr 400px 1fr;
    gap: 40px;
    align-items: center;
}

.cards-side {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.left-cards {
    align-items: flex-end;
}

.right-cards {
    align-items: flex-start;
}

/* ---- CENTER IMAGE ---- */
.center-col {
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 5;
}

.image-wrapper {
    position: relative;
    width: 380px;
    height: 580px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
    transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.image-wrapper:hover {
    box-shadow: 0 30px 60px rgba(230, 57, 70, 0.2);
}

.athlete-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s ease-out;
}

.image-overlay-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 30%, rgba(0, 0, 0, 0.4) 100%);
    pointer-events: none;
}

/* ---- STEP CARDS ---- */
.step-card {
    display: flex;
    align-items: center;
    gap: 20px;
    background: #151515;
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    padding: 24px;
    width: 100%;
    max-width: 320px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    overflow: hidden;
    cursor: default;
}

.card-glow {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(230, 57, 70, 0.15) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
}

.step-card:hover {
    transform: translateY(-8px) scale(1.02);
    border-color: rgba(230, 57, 70, 0.4);
    background: #1a1a1a;
    box-shadow: 0 10px 30px rgba(230, 57, 70, 0.15);
}

.step-card:hover .card-glow {
    opacity: 1;
}

.step-card:hover .step-number {
    transform: scale(1.1);
    color: #ff4d5a;
}

.step-number {
    font-family: 'Oswald', sans-serif;
    font-size: 2.5rem;
    font-weight: 700;
    color: #e63946;
    line-height: 1;
    min-width: 55px;
    transition: all 0.3s ease;
}

.step-content h4 {
    font-family: 'Oswald', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-bottom: 10px;
}

.step-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.step-content li {
    font-family: 'Inter', sans-serif;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.65);
    padding: 4px 0;
    display: flex;
    align-items: center;
    gap: 8px;
    line-height: 1.4;
}

.check {
    color: #e63946;
    font-weight: 700;
    font-size: 0.9rem;
    flex-shrink: 0;
}

/* ---- CTA BUTTON ---- */
.cta-row {
    display: flex;
    justify-content: center;
    margin-top: 60px;
}

.cta-btn {
    display: inline-block;
    background: linear-gradient(135deg, #e63946 0%, #c1121f 100%);
    color: #fff;
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    padding: 16px 60px;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
    box-shadow: 0 10px 20px rgba(230, 57, 70, 0.3);
}

.cta-btn:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 15px 30px rgba(230, 57, 70, 0.5);
    filter: brightness(1.1);
}

/* ---- RESPONSIVE ---- */
@media (max-width: 1024px) {
    .sistema-top-row {
        grid-template-columns: 1fr 320px 1fr;
        gap: 20px;
    }

    .image-wrapper {
        width: 300px;
        height: 500px;
    }

    .step-card {
        padding: 20px;
        max-width: 260px;
    }
}

@media (max-width: 768px) {
    .sistema-top-row {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .center-col {
        order: -1;
    }

    .image-wrapper {
        width: 100%;
        max-width: 400px;
        height: 450px;
    }

    .left-cards,
    .right-cards {
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        align-items: center;
    }

    .step-card {
        flex: 1 1 calc(50% - 10px);
        max-width: none;
        min-width: 200px;
    }
}

@media (max-width: 480px) {

    .left-cards,
    .right-cards {
        flex-direction: column;
    }

    .step-card {
        width: 100%;
        max-width: 100%;
    }

    .image-wrapper {
        height: 380px;
    }

    .display-4 {
        font-size: 2.2rem;
    }
}
</style>
