<template>
    <section class="card-sistema-section">
        <div class="section-container">
            <!-- Header -->
            <div class="section-header">
                <span class="section-badge">ECOSISTEMA ALLEVO</span>
                <h2 class="section-title">Tu camino hacia el <span class="highlight">éxito deportivo</span></h2>
                <p class="section-subtitle">
                    Conectamos talento, inversión y oportunidades en una plataforma diseñada para escalar tu carrera.
                </p>
            </div>

            <!-- Grid de tarjetas -->
            <ion-grid class="cards-grid">
                <ion-row class="ion-justify-content-center">
                    <ion-col v-for="(card, index) in cards" :key="index" size="12" size-sm="6" size-md="4" size-lg="4"
                        class="col-wrapper">
                        <div class="feature-card" :class="{ 'featured': card.featured, 'expanded': expandedCards[index] }">
                            <!-- Glow decorativo -->
                            <div class="card-glow"></div>

                            <!-- Header de la card (clickeable) -->
                            <div class="card-header-section" @click="toggleCard(index)">
                                <!-- Icono -->
                                <div class="icon-wrapper">
                                    <div class="icon-circle">
                                        <ion-icon :icon="card.icon" class="card-icon"></ion-icon>
                                    </div>
                                </div>

                                <!-- Título -->
                                <h3 class="card-title">{{ card.title }}</h3>

                                <!-- Indicador de acordeón -->
                                <div class="accordion-indicator">
                                    <ion-icon :icon="chevronDownOutline" class="accordion-icon"></ion-icon>
                                </div>
                            </div>

                            <!-- Contenido colapsable -->
                            <div class="card-body" :class="{ 'is-open': expandedCards[index] }">
                                <div v-for="(item, i) in card.items" :key="i" class="content-block">
                                    <div class="item-header" v-if="item.subtitle">
                                        <ion-icon icon="chevronForwardOutline" class="bullet-icon"></ion-icon>
                                        <span class="item-subtitle">{{ item.subtitle }}</span>
                                    </div>
                                    <p class="item-text" v-if="item.text">{{ item.text }}</p>

                                    <!-- Sub-items anidados -->
                                    <div v-if="item.subItems" class="sub-items">
                                        <div v-for="(sub, j) in item.subItems" :key="j" class="sub-item">
                                            <span class="sub-bullet">○</span>
                                            <span class="sub-text">{{ sub }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Borde decorativo inferior -->
                            <div class="card-border-bottom"></div>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue';
import { IonIcon } from '@ionic/vue';
import {
    trendingUpOutline,
    cashOutline,
    peopleOutline,
    businessOutline,
    rocketOutline,
    chevronForwardOutline,
    chevronDownOutline,
    shieldCheckmarkOutline,
    timeOutline,
    statsChartOutline
} from 'ionicons/icons';

const expandedCards = ref(new Array(5).fill(false));

const toggleCard = (index) => {
    expandedCards.value[index] = !expandedCards.value[index];
};

const cards = [
    {
        title: 'BENEFICIOS',
        icon: shieldCheckmarkOutline,
        featured: false,
        items: [
            {
                subtitle: 'Creación y desarrollo de marca personal',
                text: 'Con nuestro equipo altamente preparado, desarrollamos y potenciamos tu marca personal con un enfoque estratégico y comercial, alineado a tu esencia y objetivos.'
            },
            {
                subtitle: 'Posicionamiento y relevancia',
                text: 'Trabajamos para posicionar tu marca en espacios clave, logrando que seas reconocido en eventos, colaboraciones y oportunidades que impulsen tu crecimiento.'
            },
            {
                subtitle: 'Comunidad',
                text: 'Si aún no cuentas con una comunidad sólida, te ayudamos a construirla desde cero. Creamos las herramientas necesarias para generar confianza, conexión y convertir tu audiencia en una base que invierta en tu carrera como talento.'
            }
        ]
    },
    {
        title: 'ESTRUCTURA DE INVERSIÓN',
        icon: statsChartOutline,
        featured: false,
        items: [
            {
                subtitle: 'Carrera del talento',
                text: 'Te brindamos acceso a oportunidades de mercado donde tu talento se convierte en un activo de inversión. Puedes generar entre un 1% y 3% de beneficios, dependiendo de tu crecimiento y posicionamiento. A medida que evolucionas, aumentan tus oportunidades, ingresos y proyección profesional.'
            }
        ]
    },
    {
        title: 'INVERSIÓN EN TALENTO',
        icon: cashOutline,
        featured: true,
        items: [
            {
                subtitle: 'Inversión en talento',
                text: 'Invertir en talento sigue la misma estructura, con el diferencial de que el talento obtiene mayores beneficios conforme crece.',
                subItems: [
                    'Estás creando un activo de inversión con retornos estimados entre 1% y 3%, mientras impulsas a un talento a convertirse en una superestrella.',
                    'No solo apoyas una carrera, también generas ganancias.',
                    'Para más información, contáctanos.'
                ]
            }
        ]
    },
    {
        title: 'SPONSORS',
        icon: businessOutline,
        featured: false,
        items: [
            {
                subtitle: 'Alianzas estratégicas',
                text: 'El objetivo del desarrollo de tu marca es atraer empresas que deseen colaborar contigo, generando alianzas estratégicas y nuevas fuentes de ingreso.'
            },
            {
                subtitle: 'Alcance y posicionamiento',
                text: 'Este proceso te permite acceder a mejores oportunidades, logrando colaboraciones y acuerdos con marcas alineadas al nivel y tipo de empresas con las que aspiras trabajar.'
            },
            {
                subtitle: 'Diversificación personal',
                text: 'Impulsamos tu crecimiento en distintas áreas, permitiéndote expandir tu marca, aumentar tus fuentes de ingreso y consolidarte como un talento integral.'
            }
        ]
    },
    {
        title: 'PROPÓSITO DEL RENDIMIENTO',
        icon: rocketOutline,
        featured: false,
        items: [
            {
                subtitle: 'Producción de contenido',
                text: 'Crear contenido de alto valor que conecte con tu audiencia, fortalezca tu presencia digital y potencie tu posicionamiento.'
            },
            {
                subtitle: 'Formación profesional',
                text: 'Brindar herramientas, asesoría y acompañamiento continuo para elevar tu nivel artístico y profesional.'
            },
            {
                subtitle: 'Visibilidad y oportunidades',
                text: 'Impulsar tu exposición en espacios clave, generando oportunidades de crecimiento, colaboraciones y proyección dentro de la industria.'
            }
        ]
    }
];
</script>

<style scoped>
.card-sistema-section {
    --bg-primary: #0A0A0A;
    --bg-surface: #1E1E1E;
    --bg-surface-hover: #252525;
    --accent-primary: #EF4444;
    --accent-glow: rgba(239, 68, 68, 0.15);
    --accent-glow-strong: rgba(239, 68, 68, 0.3);
    --text-primary: #FFFFFF;
    --text-secondary: #9CA3AF;
    --text-muted: #6B7280;
    --border-subtle: rgba(255, 255, 255, 0.06);
    --border-accent: rgba(239, 68, 68, 0.3);

    background: var(--bg-primary);
    padding: 80px 16px;
    position: relative;
    overflow: hidden;
}

/* Decoración de fondo */
.card-sistema-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.03) 0%, transparent 50%);
    pointer-events: none;
}

.section-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
}

/* Header */
.section-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 64px;
}

.section-badge {
    display: inline-block;
    padding: 6px 16px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    border-radius: 100px;
    color: var(--accent-primary);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 20px;
}

.section-title {
    font-size: clamp(28px, 5vw, 42px);
    font-weight: 800;
    color: var(--text-primary);
    line-height: 1.2;
    margin: 0 0 16px 0;
    letter-spacing: -0.02em;
    text-align: center;
}

.section-title .highlight {
    color: var(--accent-primary);
    position: relative;
}

.section-subtitle {
    font-size: 16px;
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
}

/* Grid */
.cards-grid {
    --ion-grid-padding: 0;
    --ion-grid-column-padding: 12px;
}

.col-wrapper {
    margin-bottom: 24px;
}

/* Tarjeta */
.feature-card {
    background: var(--bg-surface);
    border: 1px solid var(--border-subtle);
    border-radius: 20px;
    padding: 32px 28px;
    height: auto;
    position: relative;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    display: flex;
    flex-direction: column;
}

/* Efecto neon rojo - borde LED animado */
.feature-card::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(90deg, #FF0000 0%, #FF0000 25%, #FF4444 50%, #FF0000 75%, #FF0000 100%);
    background-size: 200% 100%;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: led-paseo 2s linear infinite;
    pointer-events: none;
    z-index: 10;
    opacity: 0;
}

/* Efecto neon rojo - trazo de borde */
.feature-card::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 20px;
    padding: 2px;
    background: linear-gradient(90deg, transparent 0%, transparent 45%, #FF0000 45%, #FF0000 55%, transparent 55%, transparent 100%);
    background-size: 200% 100%;
    background-position: 100% 0;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    animation: draw-border 3s linear infinite;
    pointer-events: none;
    z-index: 10;
}

.feature-card:hover {
    background: var(--bg-surface-hover);
    border-color: #CC0000;
    transform: translateY(-6px);
    box-shadow:
        0 24px 48px rgba(0, 0, 0, 0.5),
        0 15px 40px rgba(204, 0, 0, 0.3),
        0 0 0 1px var(--border-accent);
}

.feature-card.featured {
    border-color: var(--border-accent);
    background: linear-gradient(145deg, var(--bg-surface) 0%, rgba(239, 68, 68, 0.06) 100%);
    box-shadow: 0 0 30px rgba(239, 68, 68, 0.08);
}

.feature-card.featured:hover {
    box-shadow:
        0 24px 48px rgba(239, 68, 68, 0.12),
        0 15px 40px rgba(204, 0, 0, 0.3),
        0 0 0 1px var(--accent-primary);
}

/* Glow interno */
.card-glow {
    position: absolute;
    top: 0;
    right: 0;
    width: 150px;
    height: 150px;
    background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
}

.feature-card:hover .card-glow {
    opacity: 1;
}

.feature-card.featured .card-glow {
    opacity: 0.5;
}

/* Icono */
.icon-wrapper {
    position: relative;
    width: fit-content;
    margin: 0 auto 20px;
}

.icon-circle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(239, 68, 68, 0.05) 100%);
    border: 1px solid rgba(239, 68, 68, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    transition: all 0.3s ease;
}

.feature-card:hover .icon-circle {
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.3) 0%, rgba(239, 68, 68, 0.1) 100%);
    transform: scale(1.05);
    box-shadow: 0 0 24px rgba(239, 68, 68, 0.25);
}

.card-icon {
    font-size: 26px;
    color: var(--accent-primary);
    --ionicon-stroke-width: 32px;
}

/* Acordeón - indicador */
.accordion-indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.accordion-icon {
    font-size: 20px;
    color: var(--accent-primary);
    transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
    --ionicon-stroke-width: 40px;
}

.feature-card.expanded .accordion-icon {
    transform: rotate(180deg);
}

/* Card header section */
.card-header-section {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
    text-align: left;
    padding-right: 32px;
}

.card-title {
    font-size: 15px;
    font-weight: 800;
    color: var(--text-primary);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin: 0;
    line-height: 1.3;
    text-align: left;
    flex: 1;
}

/* Icono */
.icon-wrapper {
    position: relative;
    width: fit-content;
    margin: 0;
    flex-shrink: 0;
}

/* Contenido */
.card-body {
    display: flex;
    flex-direction: column;
    max-height: 0;
    overflow: hidden;
    opacity: 0;
    gap: 0;
    padding-top: 0;
    border-top: none;
    margin-top: 0;
    transition: max-height 0.45s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.35s ease,
                padding-top 0.35s ease,
                margin-top 0.35s ease,
                gap 0.35s ease;
}

.card-body.is-open {
    max-height: 2000px;
    opacity: 1;
    gap: 20px;
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px solid var(--border-subtle);
}

.content-block {
    position: relative;
}

.content-block:not(:last-child) {
    padding-bottom: 16px;
    border-bottom: 1px solid var(--border-subtle);
}

.item-header {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 8px;
}

.bullet-icon {
    font-size: 14px;
    color: var(--accent-primary);
    margin-top: 3px;
    flex-shrink: 0;
    --ionicon-stroke-width: 48px;
}

.item-subtitle {
    font-size: 14px;
    font-weight: 700;
    color: var(--text-primary);
    line-height: 1.4;
}

.item-text {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.7;
    margin: 0 0 0 22px;
}

/* Sub-items */
.sub-items {
    margin: 10px 0 0 22px;
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.sub-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
}

.sub-bullet {
    font-size: 10px;
    color: var(--accent-primary);
    margin-top: 4px;
    line-height: 1;
}

.sub-text {
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.6;
}

/* Borde inferior decorativo */
.card-border-bottom {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
    transition: width 0.4s ease;
    opacity: 0.6;
}

.feature-card:hover .card-border-bottom {
    width: 60%;
}

.feature-card.featured .card-border-bottom {
    width: 40%;
    opacity: 0.4;
}

/* Keyframes efecto neon */
@keyframes led-paseo {
    0% {
        background-position: 0% 50%;
        box-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000, inset 0 0 5px rgba(255, 0, 0, 0.3);
        opacity: 0;
    }
    50% {
        box-shadow: 0 0 15px #FF0000, 0 0 25px #FF0000, inset 0 0 10px rgba(255, 0, 0, 0.5);
        opacity: 1;
    }
    100% {
        background-position: 200% 50%;
        box-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000, inset 0 0 5px rgba(255, 0, 0, 0.3);
        opacity: 0;
    }
}

@keyframes draw-border {
    0% {
        background-position: 100% 0;
    }
    100% {
        background-position: -100% 0;
    }
}

/* Responsive */
@media (max-width: 768px) {
    .card-sistema-section {
        padding: 60px 12px;
    }

    .feature-card {
        padding: 20px;
        height: auto;
    }

    .section-title {
        font-size: 28px;
    }

    .cards-grid {
        --ion-grid-column-padding: 8px;
    }

    .item-text {
        margin-left: 0;
    }

    .sub-items {
        margin-left: 0;
    }

    .icon-circle {
        width: 52px;
        height: 52px;
    }

    .card-icon {
        font-size: 22px;
    }

    .card-title {
        font-size: 14px;
    }
}

@media (min-width: 769px) and (max-width: 1024px) {
    .feature-card {
        padding: 28px 22px;
    }
}
</style>
