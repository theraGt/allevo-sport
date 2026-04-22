<template>
  <section class="hero" id="inicio">
    <div class="hero-bg">
      <div class="carousel">
        <div v-for="(slide, index) in slides" :key="index" class="carousel-slide"
          :class="{ active: currentSlide === index }">
          <img :src="slide.image" alt="Allevo Sports" class="hero-image" :style="parallaxStyle" />
        </div>
      </div>
      <div class="gradient-overlay delay-2" :style="overlayStyle" v-reveal="'fade-in'"></div>
    </div>

    <div class="hero-content" :style="mouseParallaxStyle">
      <div class="hero-text-wrapper">
        <div class="reveal-wrapper delay-1 revealed">
          <h2 class="hero-subtitle-small">{{ slides[currentSlide].subtitle }}</h2>
        </div>
        <h1 class="hero-title">
          <div class="reveal-wrapper delay-2 revealed">
            <span class="title-accent">{{ slides[currentSlide].title }}</span>
          </div>
        </h1>
        <div class="reveal-wrapper delay-4" v-reveal="'fade-up'">
          <p class="hero-description shimmer-text">
            {{ slides[currentSlide].description }}
          </p>
        </div>
      </div>

      <div class="reveal-wrapper delay-5" v-reveal="'scale-in-spring'">
        <button class="btn-primary hero-cta" @click="() => openModal()">
          Ser un Talento
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
          </svg>
        </button>
      </div>

      <div class="carousel-dots">
        <button v-for="(slide, index) in slides" :key="index" class="dot" :class="{ active: currentSlide === index }"
          @click="goToSlide(index)" :aria-label="'Ir al slide ' + (index + 1)"></button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useModal } from '../../composables/useModal'

const props = defineProps<{
  scrollY?: number
}>()

const { openModal } = useModal()

const slides = [
  {
    image: '/assets/images/HeroCarrusel/portada-1.png',
    subtitle: '¿Qué es',
    title: 'Sponsors?',
    description: 'Descubre el motor financiero que impulsa tu carrera profesional'
  },
  {
    image: '/assets/images/HeroCarrusel/portada-2.webp',
    subtitle: '¿Cómo alcanzar',
    title: 'Mi Carrera?',
    description: '5 pasos clave si quieres convertirte en un atleta a tiempo completo'
  },
  {
    image: '/assets/images/HeroCarrusel/portada-3.webp',
    subtitle: 'Transforma tu',
    title: 'Potencial',
    description: 'Únete a nuestra comunidad de atletas respaldados por sponsors'
  },
  {
    image: '/assets/images/HeroCarrusel/portada-4.webp',
    subtitle: 'Alcanza el',
    title: 'Éxito',
    description: 'Convierte tu pasión deportiva en una carrera profesional exitosa'
  },
  {
    image: '/assets/images/HeroCarrusel/portada-5.webp',
    subtitle: 'Entrena con',
    title: 'Profesionales',
    description: 'Los mejores atletas y coaches te ayudan a alcanzar tus metas'
  },
  {
    image: '/assets/images/HeroCarrusel/portada-6.webp',
    subtitle: 'Únete al',
    title: 'Equipo',
    description: 'Sé parte de la comunidad deportiva más grande de Latinoamérica'
  }
]

const currentSlide = ref(0)
let intervalId: ReturnType<typeof setInterval> | null = null

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
  resetInterval()
}

const resetInterval = () => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  intervalId = setInterval(nextSlide, 7000)
}

onMounted(() => {
  intervalId = setInterval(nextSlide, 7000)
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
  window.removeEventListener('mousemove', handleMouseMove)
})

// Mouse Parallax Logic
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e: MouseEvent) => {
  mouseX.value = (e.clientX / window.innerWidth - 0.5) * 20
  mouseY.value = (e.clientY / window.innerHeight - 0.5) * 20
}

const mouseParallaxStyle = computed(() => {
  return {
    transform: `translate3d(${mouseX.value}px, ${mouseY.value}px, 0)`,
    transition: 'transform 0.2s ease-out'
  }
})

const parallaxStyle = computed(() => {
  const scrollFactor = props.scrollY ? Math.min(props.scrollY / 600, 1) : 0
  const translateY = scrollFactor * 120
  const scale = 1 + scrollFactor * 0.1
  return {
    transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`
  }
})

const overlayStyle = computed(() => {
  const scrollFactor = props.scrollY ? Math.min(props.scrollY / 400, 1) : 0
  const opacity = 1 - scrollFactor * 0.4
  return {
    opacity
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.carousel {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.carousel-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.carousel-slide.active {
  opacity: 1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  will-change: transform;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 120px 100px;
  max-width: 900px;
  will-change: transform;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100vh;
}

.hero-text-wrapper {
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hero-subtitle-small {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 10px;
}

.hero-title {
  font-family: var(--font-heading);
  font-size: 4.5rem;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.title-accent {
  color: var(--color-primary);
  display: inline-block;
}

.title-normal {
  color: var(--color-text);
  display: inline-block;
}

.hero-description {
  font-family: var(--font-accent);
  font-size: 1.125rem;
  font-weight: 400;
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 500px;
}

.hero-cta {
  font-size: 1rem;
  padding: 14px 28px;
}

.hero-cta svg {
  width: 16px;
  height: 16px;
}

.carousel-dots {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 3;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.5);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot:hover {
  border-color: rgba(255, 255, 255, 0.8);
}

.dot.active {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  transform: scale(1.2);
}

@media (max-width: 1024px) {
  .hero-content {
    padding: 100px 50px;
  }

  .hero-title {
    font-size: 3.5rem;
  }

  .hero-subtitle-small {
    font-size: 1.25rem;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: 80vh;
  }

  .hero-content {
    padding: 100px 20px;
    text-align: center;
  }

  .hero-text-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .reveal-wrapper {
    margin: 0 auto;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-description {
    font-size: 1rem;
    max-width: 100%;
  }

  .hero-cta {
    font-size: 0.9rem;
    padding: 12px 24px;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle-small {
    font-size: 1rem;
  }
}
</style>