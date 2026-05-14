<template>
    <section class="coming-soon-section" id="sistema">
        <div class="scene-container">
            <!-- Partículas de fondo -->
            <div class="particles" ref="particlesRef"></div>

            <!-- Texto 3D principal -->
            <div class="text-3d-container" ref="text3dRef">
                <div class="text-3d" :style="text3dStyle">
                    <span class="letter" v-for="(letter, i) in 'COMING'" :key="`c-${i}`"
                        :style="getLetterStyle(i, 'top')">
                        {{ letter }}
                    </span>
                </div>
                <div class="text-3d secondary" :style="text3dStyleSecondary">
                    <span class="letter" v-for="(letter, i) in 'SOON'" :key="`s-${i}`"
                        :style="getLetterStyle(i, 'bottom')">
                        {{ letter }}
                    </span>
                </div>
            </div>

            <!-- Anillo giratorio -->
            <div class="ring-container" ref="ringRef">
                <div class="ring" :style="ringStyle"></div>
                <div class="ring reverse" :style="ringStyleReverse"></div>
            </div>

            <!-- Contador regresivo o indicador de progreso -->
            <div class="progress-indicator">
                <div class="pulse-ring"></div>
                <div class="pulse-ring delay"></div>
                <span class="status-text">EN DESARROLLO</span>
            </div>

            <!-- Decoración: líneas de cuadrícula -->
            <div class="grid-lines" ref="gridRef"></div>
        </div>

        <!-- Mensaje contextual -->
        <div class="context-message">
            <p>El sistema de gestión de talentos estará disponible próximamente</p>
            <button class="btn-notify" @click="openNotifyModal">
                <ion-icon :icon="notificationsOutline"></ion-icon>
                Notificarme cuando esté listo
            </button>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { IonIcon } from '@ionic/vue'
import { notificationsOutline } from 'ionicons/icons'

const router = useRouter()

const particlesRef = ref<HTMLElement | null>(null)
const text3dRef = ref<HTMLElement | null>(null)
const ringRef = ref<HTMLElement | null>(null)
const gridRef = ref<HTMLElement | null>(null)

// Estado del mouse para efecto 3D parallax
const mouseX = ref(0)
const mouseY = ref(0)
const targetRotateX = ref(0)
const targetRotateY = ref(0)
const currentRotateX = ref(0)
const currentRotateY = ref(0)

// Animación continua
let animationId: number
let time = ref(0)

const text3dStyle = computed(() => ({
    transform: `perspective(1000px) rotateX(${currentRotateX.value}deg) rotateY(${currentRotateY.value}deg) translateZ(50px)`
}))

const text3dStyleSecondary = computed(() => ({
    transform: `perspective(1000px) rotateX(${currentRotateX.value * 0.8}deg) rotateY(${currentRotateY.value * 0.8}deg) translateZ(30px)`
}))

const ringStyle = computed(() => ({
    transform: `rotateX(60deg) rotateZ(${time.value * 20}deg) scale(${1 + Math.sin(time.value * 0.5) * 0.1})`
}))

const ringStyleReverse = computed(() => ({
    transform: `rotateX(60deg) rotateZ(${-time.value * 15}deg) scale(${1 + Math.cos(time.value * 0.5) * 0.1})`
}))

function getLetterStyle(index: number, row: 'top' | 'bottom') {
    const offset = row === 'top' ? 0 : 6
    const wave = Math.sin(time.value * 2 + (index + offset) * 0.5) * 15
    const depth = Math.cos(time.value * 1.5 + (index + offset) * 0.3) * 20

    return {
        transform: `translateZ(${depth}px) translateY(${wave}px)`,
        textShadow: `
      0 0 20px rgba(239, 68, 68, ${0.3 + Math.sin(time.value + index) * 0.2}),
      0 0 40px rgba(239, 68, 68, ${0.2 + Math.sin(time.value + index) * 0.1}),
      0 0 60px rgba(239, 68, 68, 0.1)
    `
    }
}

function handleMouseMove(e: MouseEvent) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    mouseX.value = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    mouseY.value = ((e.clientY - rect.top) / rect.height - 0.5) * 2

    targetRotateY.value = mouseX.value * 15
    targetRotateX.value = -mouseY.value * 10
}

function animate() {
    time.value += 0.016

    // Interpolación suave para el efecto 3D
    currentRotateX.value += (targetRotateX.value - currentRotateX.value) * 0.05
    currentRotateY.value += (targetRotateY.value - currentRotateY.value) * 0.05

    animationId = requestAnimationFrame(animate)
}

function createParticles() {
    if (!particlesRef.value) return
    const count = 50
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div')
        particle.className = 'particle'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 8}s`
        particle.style.animationDuration = `${4 + Math.random() * 6}s`
        particlesRef.value.appendChild(particle)
    }
}

function createGrid() {
    if (!gridRef.value) return
    const lines = 20
    for (let i = 0; i < lines; i++) {
        const hLine = document.createElement('div')
        hLine.className = 'grid-line horizontal'
        hLine.style.top = `${(i / lines) * 100}%`
        hLine.style.animationDelay = `${i * 0.1}s`
        gridRef.value.appendChild(hLine)

        const vLine = document.createElement('div')
        vLine.className = 'grid-line vertical'
        vLine.style.left = `${(i / lines) * 100}%`
        vLine.style.animationDelay = `${i * 0.1}s`
        gridRef.value.appendChild(vLine)
    }
}

function openNotifyModal() {
    router.push('/contacto')
}

onMounted(() => {
    createParticles()
    createGrid()
    animate()

    const container = document.querySelector('.coming-soon-section')
    container?.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
    cancelAnimationFrame(animationId)
    const container = document.querySelector('.coming-soon-section')
    container?.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.coming-soon-section {
    position: relative;
    min-height: 100vh;
    background: linear-gradient(180deg, #0a0a0a 0%, #1a0505 50%, #0a0a0a 100%);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
}

.scene-container {
    position: relative;
    width: 100%;
    max-width: 800px;
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
}

/* Partículas */
.particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
}

.particle {
    position: absolute;
    width: 2px;
    height: 2px;
    background: rgba(239, 68, 68, 0.6);
    border-radius: 50%;
    animation: float-particle linear infinite;
}

@keyframes float-particle {
    0% {
        transform: translateY(100vh) scale(0);
        opacity: 0;
    }

    10% {
        opacity: 1;
    }

    90% {
        opacity: 1;
    }

    100% {
        transform: translateY(-100px) scale(1.5);
        opacity: 0;
    }
}

/* Texto 3D */
.text-3d-container {
    position: relative;
    z-index: 10;
    text-align: center;
    transform-style: preserve-3d;
}

.text-3d {
    display: flex;
    gap: 8px;
    justify-content: center;
    transform-style: preserve-3d;
    transition: transform 0.1s ease-out;
}

.text-3d.secondary {
    margin-top: 8px;
}

.letter {
    font-family: 'Oswald', sans-serif;
    font-size: clamp(3rem, 10vw, 6rem);
    font-weight: 900;
    color: #ffffff;
    display: inline-block;
    transition: transform 0.3s ease, text-shadow 0.3s ease;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.text-3d:first-child .letter {
    color: #EF4444;
}

.text-3d.secondary .letter {
    color: #ffffff;
    font-size: clamp(2.5rem, 8vw, 5rem);
    opacity: 0.9;
}

/* Anillos giratorios */
.ring-container {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
}

.ring {
    position: absolute;
    width: 300px;
    height: 300px;
    border: 2px solid rgba(239, 68, 68, 0.3);
    border-radius: 50%;
    transform-style: preserve-3d;
    box-shadow:
        0 0 30px rgba(239, 68, 68, 0.2),
        inset 0 0 30px rgba(239, 68, 68, 0.1);
}

.ring.reverse {
    width: 400px;
    height: 400px;
    border-color: rgba(239, 68, 68, 0.15);
    border-style: dashed;
}

/* Indicador de progreso */
.progress-indicator {
    position: absolute;
    bottom: 80px;
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 10;
}

.pulse-ring {
    width: 12px;
    height: 12px;
    background: #EF4444;
    border-radius: 50%;
    position: relative;
}

.pulse-ring::before,
.pulse-ring::after {
    content: '';
    position: absolute;
    inset: -4px;
    border: 2px solid #EF4444;
    border-radius: 50%;
    animation: pulse-ring 2s ease-out infinite;
}

.pulse-ring::after {
    animation-delay: 1s;
}

.pulse-ring.delay {
    opacity: 0.5;
    margin-left: -6px;
}

@keyframes pulse-ring {
    0% {
        transform: scale(1);
        opacity: 1;
    }

    100% {
        transform: scale(3);
        opacity: 0;
    }
}

.status-text {
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    font-weight: 600;
    color: #EF4444;
    letter-spacing: 3px;
    text-transform: uppercase;
}

/* Cuadrícula de fondo */
.grid-lines {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.15;
    transform: perspective(500px) rotateX(60deg);
    transform-origin: center bottom;
}

.grid-line {
    position: absolute;
    background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.5), transparent);
}

.grid-line.horizontal {
    width: 100%;
    height: 1px;
    animation: grid-fade 3s ease-in-out infinite;
}

.grid-line.vertical {
    width: 1px;
    height: 100%;
    animation: grid-fade 3s ease-in-out infinite;
}

@keyframes grid-fade {

    0%,
    100% {
        opacity: 0.3;
    }

    50% {
        opacity: 1;
    }
}

/* Mensaje contextual */
.context-message {
    text-align: center;
    margin-top: 40px;
    z-index: 10;
}

.context-message p {
    color: #9CA3AF;
    font-size: 16px;
    margin-bottom: 20px;
    max-width: 400px;
}

.btn-notify {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    background: linear-gradient(135deg, #EF4444 0%, #B91C1C 100%);
    border: none;
    border-radius: 8px;
    color: white;
    font-family: 'Oswald', sans-serif;
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(239, 68, 68, 0.3);
}

.btn-notify:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(239, 68, 68, 0.5);
}

/* Responsive */
@media (max-width: 768px) {
    .scene-container {
        height: 350px;
    }

    .ring {
        width: 200px;
        height: 200px;
    }

    .ring.reverse {
        width: 280px;
        height: 280px;
    }

    .progress-indicator {
        bottom: 60px;
    }
}
</style>