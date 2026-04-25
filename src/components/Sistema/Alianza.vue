<template>
    <section class="alianza-section" id="alianza" ref="sectionRef">
        <div class="background-overlay"></div>
        <div class="container">
            <header class="alianza-header" v-reveal="'fade-in'">
                <h2 class="alianza-title">
                    UNA ALIANZA QUE <span class="text-red">PRODUCE EL ÉXITO</span>
                </h2>
                <p class="alianza-subtitle">
                    Nos enfocaremos en el desarrollo de la marca personal, implementando estrategias
                    para generar alcance y posicionamiento, con el objetivo final de solidificar un
                    equipo de trabajo eficiente.
                </p>
            </header>

            <div class="stats-grid">
                <!-- OPORTUNIDADES CREADAS -->
                <div class="stats-card" v-reveal="'fade-right'">
                    <h3 class="stats-title">OPORTUNIDADES CREADAS POR ALLEVO</h3>
                    <div class="stats-items">
                        <div class="stat-item">
                            <div class="star-icon">
                                <svg viewBox="0 0 24 24" fill="#e63946">
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </div>
                            <div class="stat-numbers">
                                <span class="percentage">{{ talento70 }} %</span>
                                <span class="label">Talento</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="star-icon">
                                <svg viewBox="0 0 24 24" fill="#e63946">
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </div>
                            <div class="stat-numbers">
                                <span class="percentage">{{ allevo30 }} %</span>
                                <span class="label">Allevo</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- OPORTUNIDADES GESTIONADAS -->
                <div class="stats-card" v-reveal="'fade-left'">
                    <h3 class="stats-title">OPORTUNIDADES GESTIONADAS CON ALLEVO</h3>
                    <div class="stats-items">
                        <div class="stat-item">
                            <div class="star-icon">
                                <svg viewBox="0 0 24 24" fill="#e63946">
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </div>
                            <div class="stat-numbers">
                                <span class="percentage">{{ talento80 }} %</span>
                                <span class="label">Talento</span>
                            </div>
                        </div>
                        <div class="stat-item">
                            <div class="star-icon">
                                <svg viewBox="0 0 24 24" fill="#e63946">
                                    <path
                                        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            </div>
                            <div class="stat-numbers">
                                <span class="percentage">{{ allevo20 }} %</span>
                                <span class="label">Allevo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useCountUp } from '../../composables/useCountUp'

const sectionRef = ref<HTMLElement | null>(null)
const isAnimated = ref(false)

const { currentValue: talento70, start: startTalento70 } = useCountUp(70, 2000, { startImmediately: false, decimals: 0 })
const { currentValue: allevo30, start: startAllevo30 } = useCountUp(30, 2000, { startImmediately: false, decimals: 0 })
const { currentValue: talento80, start: startTalento80 } = useCountUp(80, 2000, { startImmediately: false, decimals: 0 })
const { currentValue: allevo20, start: startAllevo20 } = useCountUp(20, 2000, { startImmediately: false, decimals: 0 })

let observer: IntersectionObserver | null = null

const startAnimations = () => {
    if (!isAnimated.value) {
        isAnimated.value = true
        startTalento70()
        startAllevo30()
        startTalento80()
        startAllevo20()
    }
}

onMounted(() => {
    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    startAnimations()
                }
            })
        },
        { threshold: 0.3 }
    )

    if (sectionRef.value) {
        observer.observe(sectionRef.value)
    }
})

onUnmounted(() => {
    if (observer) {
        observer.disconnect()
    }
})
</script>

<style scoped>
.alianza-section {
    position: relative;
    padding: 100px 0;
    background-image: url('/assets/images/sistema2.webp');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    color: #fff;
    min-height: 500px;
    display: flex;
    align-items: center;
}

.background-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg,
            rgba(255, 255, 255, 0.306) 0%,
            rgba(39, 39, 94, 0.477) 50%,
            rgba(30, 30, 30, 0.251) 100%);
    backdrop-filter: blur(8px);
    z-index: 1;
    box-shadow: inset 0 0 150px rgba(255, 255, 255, 0.05);
}

.container {
    position: relative;
    z-index: 2;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.alianza-header {
    text-align: center;
    max-width: 900px;
    margin: 0 auto 60px;
}

.alianza-title {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    font-weight: 700;
    margin-bottom: 25px;
    letter-spacing: 1px;
}

.text-red {
    color: #e63946;
}

.alianza-subtitle {
    font-family: 'Inter', sans-serif;
    font-size: 1.1rem;
    line-height: 1.6;
    opacity: 0.9;
    color: rgba(255, 255, 255, 0.85);
}

.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
}

.stats-card {
    text-align: center;
    transition: all 0.4s ease;
    padding: 20px;
    border-radius: 12px;
    position: relative;
}

.stats-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(207, 46, 46, 0.08), transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    border-radius: inherit;
}

.stats-card:hover {
    background: rgba(207, 46, 46, 0.03);
    box-shadow: 0 15px 35px rgba(207, 46, 46, 0.15);
    border-color: rgba(207, 46, 46, 0.25);
}

.stats-card:hover::before {
    opacity: 1;
}

.stats-title {
    font-family: 'Oswald', sans-serif;
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 30px;
    letter-spacing: 1px;
}

.stats-items {
    display: flex;
    justify-content: center;
    gap: 60px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.star-icon {
    width: 50px;
    height: 50px;
    margin-bottom: 5px;
}

.stat-numbers {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.percentage {
    font-family: 'Oswald', sans-serif;
    font-size: 2.2rem;
    font-weight: 700;
    color: #fff;
    transition: all 0.3s ease;
    cursor: default;
    display: inline-block;
}

.percentage:hover {
    color: #e63946;
    transform: scale(1.15);
    text-shadow: 0 0 25px rgba(230, 57, 70, 0.7);
}

.label {
    font-family: 'Inter', sans-serif;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    opacity: 0.7;
}

@media (max-width: 768px) {
    .alianza-section {
        padding: 60px 0;
        background-attachment: scroll;
    }

    .alianza-header {
        margin-bottom: 40px;
        padding: 0 16px;
    }

    .alianza-title {
        font-size: clamp(1.6rem, 6vw, 2.2rem);
        margin-bottom: 16px;
    }

    .alianza-subtitle {
        font-size: 0.95rem;
    }

    .stats-grid {
        grid-template-columns: 1fr;
        gap: 32px;
        padding: 0 16px;
    }

    .stats-card {
        padding: 16px;
    }

    .stats-title {
        font-size: 1.1rem;
        margin-bottom: 20px;
    }

    .stats-items {
        gap: 32px;
    }

    .star-icon {
        width: 40px;
        height: 40px;
    }

    .percentage {
        font-size: 1.6rem;
    }

    .label {
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .alianza-section {
        padding: 40px 0;
    }

    .alianza-header {
        margin-bottom: 32px;
        padding: 0 12px;
    }

    .alianza-title {
        font-size: clamp(1.4rem, 7vw, 1.8rem);
    }

    .alianza-subtitle {
        font-size: 0.85rem;
        line-height: 1.5;
    }

    .stats-grid {
        gap: 24px;
        padding: 0 12px;
    }

    .stats-card {
        padding: 12px 8px;
    }

    .stats-title {
        font-size: 1rem;
        margin-bottom: 16px;
    }

    .stats-items {
        gap: 24px;
    }

    .star-icon {
        width: 36px;
        height: 36px;
    }

    .percentage {
        font-size: 1.4rem;
    }

    .label {
        font-size: 0.75rem;
    }
}
</style>
