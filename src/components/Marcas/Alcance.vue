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
          <div class="stat-box">
            <span class="number">+ {{ formatNumber(stat1) }}</span>
            <span class="label">ALCANCE</span>
          </div>
        </div>

        <div class="alcance-item delay-1" v-reveal="'fade-up'">
          <div class="image-box">
            <img src="/assets/images/Alcance/Alcance2.webp" alt="Evento" />
          </div>
          <div class="stat-box">
            <span class="number">+ {{ formatNumber(stat2) }}</span>
            <span class="label">VISUALIZACIONES</span>
          </div>
        </div>

        <div class="alcance-item" v-reveal="'fade-up'">
          <div class="image-box">
            <img src="/assets/images/Alcance/Alcance3.webp" alt="Modelo" />
          </div>
          <div class="stat-box">
            <span class="number">+ {{ formatNumber(stat3) }}</span>
            <span class="label">SEGUIDORES</span>
          </div>
        </div>

        <div class="alcance-item delay-1" v-reveal="'fade-up'">
          <div class="image-box">
            <img src="/assets/images/Alcance/Alcance4.webp" alt="Atleta" />
          </div>
          <div class="stat-box">
            <span class="number">+ {{ formatNumber(stat4) }}</span>
            <span class="label">INTERACCIONES CON EL CONTENIDO</span>
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
}

.image-box {
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 20px;
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

.stat-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.number {
  font-family: 'Inter', sans-serif;
  font-size: 2.2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
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
    grid-template-columns: 1fr;
    gap: 50px;
  }
  
  .title {
    font-size: 2.5rem;
  }
  
  .number {
    font-size: 1.8rem;
  }
}
</style>
