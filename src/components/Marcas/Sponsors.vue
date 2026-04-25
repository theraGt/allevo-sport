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
        <!-- Left: Benefits Grid -->
        <div class="benefits-col" v-reveal="'fade-right'">
          <div class="benefits-grid">
            <div
              v-for="(benefit, index) in benefits"
              :key="index"
              class="benefit-card"
              :class="`delay-${index % 2}`"
            >
              <ion-icon :icon="benefit.icon" class="benefit-icon"></ion-icon>
              <h3 class="benefit-title">{{ benefit.title }}</h3>
              <p class="benefit-desc">{{ benefit.desc }}</p>
            </div>
          </div>

          <div class="cta-wrapper">
            <ion-button expand="block" color="danger" class="sponsor-cta" @click="handleSponsorClick">
              CONVERTIRSE EN SPONSOR
            </ion-button>
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
import { IonButton } from '@ionic/vue'
import {
  linkOutline,
  eyeOutline,
  barChartOutline,
  trendingUpOutline,
  trophyOutline,
  shieldCheckmarkOutline
} from 'ionicons/icons'
import { useMouseParallax } from '@/composables/useMouseParallax'

const { parallaxStyle } = useMouseParallax(10)

const benefits = ref([
  {
    icon: linkOutline,
    title: 'Vinculación estratégica',
    desc: 'Con talento y proyectos en crecimiento, respaldada por una estructura profesional que reduce el riesgo de improvisación.'
  },
  {
    icon: eyeOutline,
    title: 'Exposición de marca auténtica',
    desc: 'A través de contenido, eventos y plataformas donde la audiencia conecta de forma natural con el talento.'
  },
  {
    icon: barChartOutline,
    title: 'Métricas claras de rendimiento',
    desc: 'Visibilidad y datos que permiten evaluar el impacto real de la inversión en tiempo y forma.'
  },
  {
    icon: trendingUpOutline,
    title: 'Participación temprana',
    desc: 'En proyectos con proyección a mediano y largo plazo, antes de su consolidación en mercados de mayor escala.'
  },
  {
    icon: trophyOutline,
    title: 'Posicionamiento como aliado',
    desc: 'Fortaleciendo la percepción de la marca al asociarla con el éxito deportivo y el talento emergente.'
  },
  {
    icon: shieldCheckmarkOutline,
    title: 'Compromiso de largo plazo',
    desc: 'Disciplina, transparencia y visión sostenible, priorizando el valor a partir de decisiones coherentes y medibles.'
  }
])

const handleSponsorClick = () => {
  console.log('Click en Convertirse en Sponsor')
}
</script>

<style scoped>
.sponsors-section {
  background-color: #f5f5f5;
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
  font-weight: 700;
  color: #333;
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

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.benefit-card {
  background: #fff;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.benefit-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1);
}

.benefit-icon {
  color: #CF2E2E;
  font-size: 32px;
  margin-bottom: 16px;
}

.benefit-title {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #111;
  margin: 0 0 10px 0;
}

.benefit-desc {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
}

/* CTA */
.cta-wrapper {
  margin-top: 40px;
  display: flex;
  justify-content: center;
}

.sponsor-cta {
  max-width: 400px;
  width: 100%;
  --border-radius: 12px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
}

/* Image Column */
.image-col {
  display: flex;
  justify-content: center;
  position: sticky;
  top: 100px;
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

.image-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #EF4444;
  pointer-events: none;
  z-index: 2;
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

  .image-col {
    position: relative;
    top: auto;
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

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .benefit-card {
    padding: 24px;
  }

  .image-wrapper {
    border-radius: 16px;
  }
}
</style>
