<template>
  <section class="alcance-section" ref="sectionRef">
    <div class="container">
      <header class="section-header" v-reveal="'fade-in'">
        <span class="subtitle">NUESTRO</span>
        <h2 class="title">ALCANCE</h2>
      </header>

      <div class="alcance-grid">
        <div class="alcance-item" v-reveal="'fade-up'">
          <div class="image-box">
            <img src="/assets/images/Alcance/Alcance1.webp" alt="Combate" />
          </div>
          <div class="card-body">
            <span class="athlete-name">Mario Quino</span>
            <div class="stat-box">
              <span class="number">+ {{ formatNumber(stat1) }}</span>
              <span class="label">ALCANCE</span>
            </div>
          </div>
        </div>

        <div class="alcance-item delay-1" v-reveal="'fade-up'">
          <div class="image-box">
            <img src="/assets/images/Alcance/Alcance2.webp" alt="Evento" />
          </div>
          <div class="card-body">
            <span class="athlete-name">Nathan Fino</span>
            <div class="stat-box">
              <span class="number">+ {{ formatNumber(stat2) }}</span>
              <span class="label">VISUALIZACIONES</span>
            </div>
          </div>
        </div>

        <div class="alcance-item" v-reveal="'fade-up'">
          <div class="image-box">
            <img src="/assets/images/Alcance/Alcance3.webp" alt="Modelo" />
          </div>
          <div class="card-body">
            <span class="athlete-name">Katherine Portt</span>
            <div class="stat-box">
              <span class="number">+ {{ formatNumber(stat3) }}</span>
              <span class="label">SEGUIDORES</span>
            </div>
          </div>
        </div>

        <div class="alcance-item delay-1" v-reveal="'fade-up'">
          <div class="image-box">
            <img src="/assets/images/Alcance/Alcance4.webp" alt="Atleta" />
          </div>
          <div class="card-body">
            <span class="athlete-name">Camilo Pinzón</span>
            <div class="stat-box">
              <span class="number">+ {{ formatNumber(stat4) }}</span>
              <span class="label">INTERACCIONES CON EL CONTENIDO</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCountUp } from '../../composables/useCountUp'

const sectionRef = ref<HTMLElement | null>(null)
const isAnimated = ref(false)

const { currentValue: stat1, start: start1 } = useCountUp(18043461, 2500, { startImmediately: false, decimals: 0 })
const { currentValue: stat2, start: start2 } = useCountUp(100027729, 2500, { startImmediately: false, decimals: 0 })
const { currentValue: stat3, start: start3 } = useCountUp(155960, 2500, { startImmediately: false, decimals: 0 })
const { currentValue: stat4, start: start4 } = useCountUp(5107361, 2500, { startImmediately: false, decimals: 0 })

const formatNumber = (val: number) => {
  return new Intl.NumberFormat('es-GT').format(Math.floor(val))
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isAnimated.value) {
      isAnimated.value = true
      start1()
      start2()
      start3()
      start4()
    }
  }, { threshold: 0.2 })

  if (sectionRef.value) {
    observer.observe(sectionRef.value)
  }
})
</script>

<style scoped>
.alcance-section {
  padding: 100px 0;
  background-color: #000;
  color: #fff;
}

.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 40px;
}

.section-header {
  margin-bottom: 60px;
  display: flex;
  flex-direction: column;
}

.subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: #888;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 5px;
}

.title {
  font-family: 'Oswald', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  margin: 0;
}

.alcance-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.alcance-item {
  display: flex;
  flex-direction: column;
  background: #111;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.alcance-item:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.image-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  position: relative;
}

.image-box::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #EF4444;
  pointer-events: none;
  z-index: 2;
}

.image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.alcance-item:hover .image-box img {
  transform: scale(1.05);
}

.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 12px;
}

.athlete-name {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #EF4444;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
}

.number {
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
}

.label {
  font-family: 'Oswald', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  color: #888;
  letter-spacing: 1px;
  text-transform: uppercase;
}

@media (max-width: 768px) {
  .alcance-grid {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding-bottom: 20px;
    scrollbar-width: none;
  }

  .alcance-grid::-webkit-scrollbar {
    display: none;
  }

  .alcance-item {
    flex: 0 0 85%;
    scroll-snap-align: start;
  }

  .title {
    font-size: 2.5rem;
  }

  .number {
    font-size: 1.8rem;
  }

  .container {
    padding: 0 20px;
  }
}
</style>
