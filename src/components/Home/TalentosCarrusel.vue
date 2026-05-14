<template>
  <div
    class="carrusel-wrapper"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <!-- Status Badge -->
    <div class="carrusel-status" :class="{ 'is-paused': isManuallyPaused || isHovered || isPaused }">
      <span class="status-dot"></span>
      <span class="status-text">{{ statusText }}</span>
    </div>

    <!-- Arrow Left -->
    <button
      class="carrusel-arrow carrusel-arrow--prev"
      :class="{ 'is-paused': isManuallyPaused }"
      @click="prev"
      aria-label="Anterior talento"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6"></polyline>
      </svg>
    </button>

    <!-- Arrow Right -->
    <button
      class="carrusel-arrow carrusel-arrow--next"
      :class="{ 'is-paused': isManuallyPaused }"
      @click="next"
      aria-label="Siguiente talento"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6"></polyline>
      </svg>
    </button>

    <!-- Viewport -->
    <div ref="viewportRef" class="carrusel-viewport">
      <div
        ref="trackRef"
        class="carrusel-track"
        :class="{ 'is-transitioning': isTransitioning }"
        :style="trackStyle"
        @transitionend="onTransitionEnd"
      >
        <RouterLink
          v-for="(talento, index) in displayTalentos"
          :key="`card-${index}`"
          :to="`/talento/${talento.slug}`"
          class="carrusel-card"
          :class="{ 'is-active': isActiveIndex(index) }"
          :style="{ width: cardWidth ? `${cardWidth}px` : '100%' }"
        >
          <div class="card-img">
            <img :src="talento.imagen" :alt="talento.nombre" />
            <div class="card-overlay"></div>
            <div class="card-name">{{ talento.aliasDeportivo }}</div>
          </div>
          <div class="card-info">
            <h3>{{ talento.nombre }}</h3>
            <span class="disciplina">{{ talento.disciplina }}</span>
            <div class="social-links" v-if="talento.instagram || talento.tiktok">
              <a v-if="talento.instagram" :href="talento.instagram" target="_blank" rel="noopener noreferrer"
                class="social-icon instagram" @click.stop>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a v-if="talento.tiktok" :href="talento.tiktok" target="_blank" rel="noopener noreferrer"
                class="social-icon tiktok" @click.stop>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
            </div>
            <button class="btn-primary btn-invertir" @click.prevent.stop="$emit('invertir', talento)">
              <ion-icon :icon="trendingUpOutline"></ion-icon>
              Invertir
            </button>
          </div>
        </RouterLink>
      </div>
    </div>

    <!-- Controls -->
    <div class="carrusel-controls">
      <button
        class="carrusel-play-pause"
        @click="togglePlay"
        :aria-label="isManuallyPaused ? 'Reanudar carrusel' : 'Pausar carrusel'"
      >
        <svg v-if="isManuallyPaused" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
        </svg>
      </button>

      <div class="carrusel-dots">
        <button
          v-for="i in talentos.length"
          :key="i"
          class="carrusel-dot"
          :class="{ active: currentRealIndex === i - 1 }"
          @click="goTo(i - 1)"
          :aria-label="`Ir al talento ${i} de ${talentos.length}`"
        ></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { IonIcon } from '@ionic/vue'
import { trendingUpOutline } from 'ionicons/icons'

const props = defineProps<{
  talentos: any[]
}>()

const emit = defineEmits<{
  (e: 'invertir', talento: any): void
}>()

const currentIndex = ref(0)
const isPaused = ref(false)
const isManuallyPaused = ref(false)
const isTransitioning = ref(true)
const isHovered = ref(false)
const touchStartX = ref(0)

const viewportRef = ref<HTMLElement | null>(null)
const trackRef = ref<HTMLElement | null>(null)

const displayTalentos = computed(() => [...props.talentos, ...props.talentos, ...props.talentos])
const currentRealIndex = computed(() => currentIndex.value % props.talentos.length)

const statusText = computed(() => {
  if (isManuallyPaused.value || isHovered.value || isPaused.value) return 'PAUSADO'
  return 'EN VIVO'
})

let intervalId: ReturnType<typeof setInterval> | null = null
let observer: IntersectionObserver | null = null
let resizeObserver: ResizeObserver | null = null

const cardsPerView = ref(3)
const stepWidth = ref(0)
const cardWidth = ref(0)

const computeLayout = () => {
  const w = window.innerWidth
  if (w <= 768) cardsPerView.value = 1
  else if (w <= 1024) cardsPerView.value = 2
  else cardsPerView.value = 3

  // Usamos clientWidth del viewport si está disponible; si no, restamos el padding del wrapper (40px x2)
  const viewportWidth = (viewportRef.value?.clientWidth && viewportRef.value.clientWidth > 0)
    ? viewportRef.value.clientWidth
    : Math.max(w - 80, 260)

  const visible = cardsPerView.value
  const gap = 30

  const calculated = visible === 1
    ? viewportWidth
    : (viewportWidth - gap * (visible - 1)) / visible

  if (calculated > 0) {
    cardWidth.value = calculated
    stepWidth.value = calculated + gap
  }
}

const updateLayout = () => {
  nextTick(() => {
    computeLayout()
    // Múltiples reintentos para cuando el viewport aún no tiene dimensiones reales
    setTimeout(computeLayout, 100)
    setTimeout(computeLayout, 300)
    setTimeout(computeLayout, 600)
  })
}

const trackStyle = computed(() => {
  return {
    transform: `translateX(-${currentIndex.value * stepWidth.value}px)`,
    transition: isTransitioning.value ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
    width: stepWidth.value ? `${stepWidth.value * displayTalentos.value.length}px` : 'auto'
  }
})

const shouldAutoPlay = computed(() => !isPaused.value && !isManuallyPaused.value && !isHovered.value)

const isNavigating = ref(false)

const isActiveIndex = (index: number) => {
  return index === currentIndex.value
}

const onTransitionEnd = () => {
  isNavigating.value = false
  // Si llegamos al final del segundo set, saltamos al primer set sin transición
  if (currentIndex.value >= props.talentos.length * 2) {
    isTransitioning.value = false
    currentIndex.value = currentIndex.value % props.talentos.length
    nextTick(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
      })
    })
  } else if (currentIndex.value < props.talentos.length) {
    // Si llegamos al principio, saltamos al segundo set
    isTransitioning.value = false
    currentIndex.value = props.talentos.length + currentIndex.value
    nextTick(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
      })
    })
  }
}

const next = () => {
  if (isNavigating.value) return
  isNavigating.value = true
  isManuallyPaused.value = true
  currentIndex.value++
}

const prev = () => {
  if (isNavigating.value) return
  isNavigating.value = true
  isManuallyPaused.value = true
  if (currentIndex.value <= 0) {
    isTransitioning.value = false
    currentIndex.value = props.talentos.length
    nextTick(() => {
      requestAnimationFrame(() => {
        isTransitioning.value = true
        currentIndex.value = props.talentos.length - 1
      })
    })
  } else {
    currentIndex.value--
  }
}

const goTo = (index: number) => {
  isManuallyPaused.value = true
  currentIndex.value = index
}

const togglePlay = () => {
  isManuallyPaused.value = !isManuallyPaused.value
}

const autoAdvance = () => {
  if (isNavigating.value) return
  // Permitimos que avance más allá de la longitud para que el transitionEnd maneje el reset
  isNavigating.value = true
  currentIndex.value++

  // Seguridad: si por alguna razón no termina la navegación en 1.5s, liberamos el bloqueo
  setTimeout(() => {
    isNavigating.value = false
  }, 1500)
}

const startAutoPlay = () => {
  if (intervalId) clearInterval(intervalId)
  intervalId = setInterval(autoAdvance, 5000)
}

const stopAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

watch(shouldAutoPlay, (val) => {
  if (val) startAutoPlay()
  else stopAutoPlay()
})

const onTouchStart = (e: TouchEvent) => {
  touchStartX.value = e.changedTouches[0].screenX
}

const onTouchEnd = (e: TouchEvent) => {
  const touchEndX = e.changedTouches[0].screenX
  const delta = touchStartX.value - touchEndX
  if (delta > 50) next()
  else if (delta < -50) prev()
}

onMounted(() => {
  // Empezamos en el medio para permitir scroll infinito en ambos sentidos
  currentIndex.value = props.talentos.length

  updateLayout()
  window.addEventListener('resize', updateLayout)

  if (viewportRef.value && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => {
      updateLayout()
    })
    resizeObserver.observe(viewportRef.value)
  }

  if (viewportRef.value && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
      (entries) => {
        isPaused.value = !entries[0].isIntersecting
      },
      { threshold: 0.1 }
    )
    observer.observe(viewportRef.value)
  }

  if (shouldAutoPlay.value) startAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
  window.removeEventListener('resize', updateLayout)
  if (observer) observer.disconnect()
  if (resizeObserver) resizeObserver.disconnect()
})
</script>

<style scoped>
.carrusel-wrapper {
  position: relative;
  width: 100%;
  padding: 0 40px;
}

.carrusel-status {
  position: absolute;
  top: -30px;
  right: 40px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-heading);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #00e090;
  z-index: 10;
  transition: color 0.3s ease;
}

.carrusel-status.is-paused {
  color: #888888;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: currentColor;
  animation: pulse-live 2s ease-in-out infinite;
}

.carrusel-status.is-paused .status-dot {
  animation: none;
  opacity: 0.6;
}

@keyframes pulse-live {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.8);
  }
}

.carrusel-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  opacity: 0.5;
  padding: 0;
}

.carrusel-arrow:hover {
  background: rgba(204, 0, 0, 0.8);
  border-color: #CC0000;
  opacity: 1 !important;
  transform: translateY(-50%) scale(1.1);
}

.carrusel-arrow svg {
  width: 20px;
  height: 20px;
}

.carrusel-arrow--prev {
  left: -10px;
}

.carrusel-arrow--next {
  right: -10px;
}

.carrusel-arrow.is-paused {
  opacity: 1;
}

.carrusel-viewport {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.carrusel-track {
  display: flex;
  gap: 30px;
  padding: 0 6px;
  will-change: transform;
  width: max-content;
}

.carrusel-track.is-transitioning {
  transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
}

.carrusel-card {
  display: block;
  position: relative;
  background-color: var(--color-bg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  flex: 0 0 auto;
  min-width: 260px; /* seguridad mientras se calcula el ancho dinámico */
  /* el ancho lo controla :style en la template */
  text-decoration: none;
  color: inherit;
  box-sizing: border-box;
}

.carrusel-card.is-active {
  transform: scale(1.03);
  filter: brightness(1.08);
  border-color: rgba(204, 0, 0, 0.5);
  box-shadow: 0 0 30px rgba(204, 0, 0, 0.2);
  z-index: 2;
}

.carrusel-card:hover {
  transform: translateY(-5px) scale(1.02);
  box-shadow: 0 15px 40px rgba(204, 0, 0, 0.3);
  border-color: #CC0000;
  z-index: 3;
}

.carrusel-card.is-active:hover {
  transform: translateY(-5px) scale(1.05);
}

.carrusel-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-lg);
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

.carrusel-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-lg);
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

.card-img {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.carrusel-card:hover .card-img img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(204, 0, 0, 0.85) 0%, rgba(204, 0, 0, 0) 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.carrusel-card:hover .card-overlay {
  opacity: 1;
}

.card-name {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.02em;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.carrusel-card:hover .card-name {
  opacity: 1;
  transform: translateY(0);
}

.card-info {
  padding: 20px;
  text-align: center;
}

.card-info h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 5px;
  text-transform: uppercase;
}

.disciplina {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}

.btn-invertir {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  width: 100%;
  margin-top: 12px;
  padding: 8px 14px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #8b1e1e 100%);
  border: none;
  border-radius: var(--border-radius);
  color: #ffffff;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(207, 46, 46, 0.3);
  clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
}

.btn-invertir:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 10px 28px rgba(207, 46, 46, 0.45);
  filter: brightness(1.1);
}

.btn-invertir:active {
  transform: translateY(-1px) scale(0.99);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon svg {
  width: 16px;
  height: 16px;
}

.social-icon.instagram:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  border-color: transparent;
  color: white;
  transform: scale(1.1);
}

.social-icon.tiktok:hover {
  background-color: #000000;
  border-color: transparent;
  color: white;
  transform: scale(1.1);
}

.carrusel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-top: 30px;
}

.carrusel-play-pause {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carrusel-play-pause:hover {
  background: rgba(204, 0, 0, 0.8);
  border-color: #CC0000;
  transform: scale(1.1);
}

.carrusel-play-pause svg {
  width: 18px;
  height: 18px;
}

.carrusel-dots {
  display: flex;
  gap: 10px;
  align-items: center;
}

.carrusel-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.carrusel-dot:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: scale(1.2);
}

.carrusel-dot.active {
  background: #CC0000;
  transform: scale(1.3);
  box-shadow: 0 0 10px rgba(204, 0, 0, 0.5);
}

@media (max-width: 1024px) {
  .carrusel-wrapper {
    padding: 0 30px;
  }

  .carrusel-arrow--prev {
    left: -5px;
  }

  .carrusel-arrow--next {
    right: -5px;
  }
}

@media (max-width: 768px) {
  .carrusel-wrapper {
    padding: 0 20px;
  }

  .carrusel-arrow {
    width: 36px;
    height: 36px;
    opacity: 0.8;
  }

  .carrusel-arrow--prev {
    left: -10px;
  }

  .carrusel-arrow--next {
    right: -10px;
  }

  .carrusel-status {
    right: 20px;
    top: -24px;
  }

  .card-img {
    height: 250px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .carrusel-track.is-transitioning {
    transition: none;
  }

  .carrusel-card,
  .carrusel-card.is-active,
  .carrusel-card:hover {
    transform: none;
  }
}
</style>
