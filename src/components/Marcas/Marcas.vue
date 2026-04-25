<template>
  <section class="marcas-hero">
    <div class="parallax-container">
      <img src="/assets/images/Alcance/Sponsors-banner.webp" alt="Allevo Sponsors" class="parallax-image"
        :style="parallaxStyle" />
      <div class="overlay-gradient"></div>
    </div>

    <div class="container">
      <div class="content-wrapper" v-reveal="'fade-up'">
        <header class="text-content">
          <h2 class="subtitle-top">ALLEVO</h2>
          <h1 class="main-title">SPONSORS</h1>
          <p class="description">
            Creemos en el poder de las alianzas estratégicas para alcanzar objetivos comunes.
            Este espacio reúne a las organizaciones y aliados que comparten nuestra visión,
            aportando su experiencia y compromiso.
          </p>
          <div class="cta-wrapper">
            <button class="btn-primary" @click="handleAliadoClick">
              CONVERTIRME EN ALIADO
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/></svg>
            </button>
          </div>
        </header>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMouseParallax } from '@/composables/useMouseParallax'

const { parallaxStyle } = useMouseParallax(30)

const handleAliadoClick = () => {
  console.log('Click en Convertirme en Aliado')
}
</script>

<style scoped>
.marcas-hero {
  position: relative;
  min-height: 80vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #000;
  overflow: hidden;
  padding-top: 80px;
}

.parallax-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 65%;
  height: 100%;
  z-index: 1;
}

.parallax-image {
  width: 120%;
  height: 110%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: -5%;
  left: -10%;
}

.overlay-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0.15) 65%, transparent 100%);
  z-index: 2;
}

.container {
  position: relative;
  z-index: 5;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 40px;
  width: 100%;
}

.content-wrapper {
  max-width: 640px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 48px 56px;
  text-align: center;
}

.text-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}

.subtitle-top {
  font-family: 'Oswald', sans-serif;
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  opacity: 0.6;
  margin: 0;
  line-height: 1;
  letter-spacing: 2px;
}

.main-title {
  font-family: 'Oswald', sans-serif;
  font-size: 5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 24px 0;
  line-height: 0.9;
  letter-spacing: 1px;
}

.description {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-bottom: 32px;
  max-width: 520px;
}

.cta-wrapper {
  display: flex;
  justify-content: center;
}

@media (max-width: 1024px) {
  .main-title {
    font-size: 4rem;
  }

  .subtitle-top {
    font-size: 2.5rem;
  }

  .parallax-container {
    width: 100%;
  }

  .overlay-gradient {
    background: linear-gradient(0deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.2) 100%);
  }

  .marcas-hero {
    min-height: 70vh;
    padding-top: 100px;
  }
}

@media (max-width: 768px) {
  .marcas-hero {
    padding-top: 80px;
    align-items: flex-end;
    padding-bottom: 60px;
  }

  .container {
    padding: 0 20px;
  }

  .content-wrapper {
    padding: 32px 24px;
    max-width: 100%;
  }

  .main-title {
    font-size: 3rem;
  }

  .subtitle-top {
    font-size: 2rem;
  }

  .description {
    font-size: 1rem;
  }
}
</style>
