<template>
    <section class="sponsors-section">
        <!-- Header Banner -->
        <div class="sponsors-banner" v-reveal="'fade-in'">
            <h2 class="banner-title">SPONSORS</h2>
            <div class="floating-icon">
                <div class="diamond"></div>
            </div>
        </div>

        <!-- Content Area -->
        <div class="container content-container">
            <div class="sponsors-layout">
                <!-- Left: Accordion -->
                <div class="accordion-col" v-reveal="'fade-right'">
                    <div class="accordion">
                        <!-- Beneficios -->
                        <div class="accordion-item" :class="{ active: activeTab === 'beneficios' }">
                            <button class="accordion-header" @click="activeTab = 'beneficios'">
                                <span class="icon">{{ activeTab === 'beneficios' ? '−' : '+' }}</span>
                                <span class="title">Beneficios</span>
                            </button>
                            <div class="accordion-content">
                                <ul class="benefit-list">
                                    <li>
                                        <strong>Vinculación estratégica</strong> con talento y proyectos en crecimiento,
                                        respaldada por una estructura profesional que reduce el riesgo de improvisación.
                                    </li>
                                    <li>
                                        <strong>Exposición de marca auténtica</strong> a través de contenido, eventos y
                                        plataformas donde la audiencia conecta de forma natural con el talento.
                                    </li>
                                    <li>
                                        <strong>Acceso a métricas claras</strong> de rendimiento y visibilidad, que
                                        permiten
                                        evaluar el impacto real de la inversión en tiempo y forma.
                                    </li>
                                    <li>
                                        <strong>Participación temprana</strong> en proyectos con proyección a mediano y
                                        largo
                                        plazo, antes de su consolidación en mercados de mayor escala.
                                    </li>
                                    <li>
                                        <strong>Posicionamiento como aliado estratégico</strong>, fortaleciendo la
                                        percepción
                                        de la marca al asociarla con el éxito deportivo.
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <!-- Compromisos -->
                        <div class="accordion-item" :class="{ active: activeTab === 'compromisos' }">
                            <button class="accordion-header" @click="activeTab = 'compromisos'">
                                <span class="icon">{{ activeTab === 'compromisos' ? '−' : '+' }}</span>
                                <span class="title">Compromisos</span>
                            </button>
                            <div class="accordion-content">
                                <ul class="benefit-list">
                                    <li> El Sistema Sponsors se basa en una relación de colaboración estratégica. Su
                                        propósito es acompañar, estructurar y potenciar proyectos con talento real
                                        mediante procesos profesionales, criterios claros y un uso eficiente de los
                                        recursos. </li>
                                    <li>El compromiso consiste en actuar con disciplina, transparencia y visión de largo
                                        plazo, priorizando la sostenibilidad del proyecto por encima de resultados
                                        inmediatos o promesas irreales, y construyendo valor a partir de decisiones
                                        coherentes y medibles.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right: Image -->
                <div class="image-col" v-reveal="'fade-left'">
                    <div class="image-wrapper" :style="parallaxStyle">
                        <img src="/assets/images/Alcance/sponsors.webp" alt="Atletas Allevo" />
                        <div class="image-overlay"></div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useMouseParallax } from '@/composables/useMouseParallax'

const activeTab = ref('beneficios')
const { parallaxStyle } = useMouseParallax(10)
</script>

<style scoped>
.sponsors-section {
    background-color: #f5f5f5;
    /* Fondo claro como en la imagen */
    padding-bottom: 100px;
    overflow: hidden;
}

.sponsors-banner {
    background-color: #000;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 80px;
}

.banner-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(3rem, 10vw, 8rem);
    /* Texto gigante */
    font-weight: 700;
    color: #333;
    /* Gris oscuro para efecto sutil */
    margin: 0;
    letter-spacing: 5px;
    text-transform: uppercase;
}

.floating-icon {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 40px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
}

.diamond {
    width: 30px;
    height: 30px;
    background: white url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black"><path d="M12 2L2 12l10 10 10-10L12 2z"/></svg>') center/cover;
    transform: rotate(45deg);
}

.content-container {
    max-width: var(--container-max);
    margin: 0 auto;
    padding: 0 40px;
}

.sponsors-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
}

/* Accordion Styling */
.accordion {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.accordion-item {
    border-bottom: 1px solid #ddd;
    background: #fff;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.03);
    transition: all 0.3s ease;
}

.accordion-item.active {
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.06);
}

.accordion-header {
    width: 100%;
    padding: 20px 25px;
    display: flex;
    align-items: center;
    gap: 15px;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
}

.accordion-header .icon {
    font-size: 1.5rem;
    font-weight: 300;
    color: #666;
    width: 24px;
}

.accordion-header .title {
    font-family: 'Inter', sans-serif;
    font-size: 1.15rem;
    font-weight: 600;
    color: #111;
}

.accordion-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    padding: 0 25px;
}

.accordion-item.active .accordion-content {
    max-height: 600px;
    padding: 0 25px 25px;
}

.benefit-list {
    list-style: none;
    padding: 0;
    margin: 15px 0 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
}

.benefit-list li {
    font-family: 'Inter', sans-serif;
    font-size: 0.95rem;
    color: #555;
    line-height: 1.6;
    position: relative;
    padding-left: 15px;
}

.benefit-list li::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #333;
}

.benefit-list li strong {
    color: #111;
    font-weight: 600;
}

/* Image Column */
.image-col {
    display: flex;
    justify-content: center;
}

.image-wrapper {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
    max-width: 600px;
}

.image-wrapper img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.6s ease;
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.1) 0%, transparent 100%);
    pointer-events: none;
}

@media (max-width: 1024px) {
    .sponsors-layout {
        grid-template-columns: 1fr;
        gap: 40px;
    }

    .image-wrapper {
        order: -1;
    }
}

@media (max-width: 768px) {
    .sponsors-banner {
        height: 120px;
    }

    .banner-title {
        font-size: 4rem;
    }

    .content-container {
        padding: 0 20px;
    }

    .accordion-header {
        padding: 15px 20px;
    }
}
</style>
