<template>
  <section class="marcas-hero">
    <div class="parallax-container">
      <img src="/assets/images/Alcance/Sponsors-banner.webp" alt="Allevo Sponsors" class="parallax-image"
        :style="parallaxStyle" />
      <div class="overlay-gradient"></div>
    </div>

    <div class="container">
      <div class="content-wrapper">
        <header class="text-content" v-reveal="'fade-right'">
          <h2 class="subtitle-top">ALLEVO</h2>
          <h1 class="main-title">SPONSORS</h1>
          <p class="description">
            Creemos en el poder de las alianzas estratégicas para alcanzar objetivos comunes.
            Este espacio reúne a las organizaciones y aliados que comparten nuestra visión,
            aportando su experiencia y compromiso.
          </p>
          <div class="cta-wrapper" v-reveal="'fade-up'">
            <button class="btn-aliado" @click="handleAliadoClick">
              CONVERTIRME EN ALIADO
              <span class="arrow-icon">→</span>
            </button>
          </div>
        </header>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useMouseParallax } from '@/composables/useMouseParallax'

const { parallaxStyle } = useMouseParallax(30) // Un factor mayor para un efecto más pronunciado

const handleAliadoClick = () => {
  // Aquí se podría abrir un modal o navegar a una sección de contacto
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
  /* Espacio para el Navbar */
}

.parallax-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 65%;
  /* Ocupa más de la mitad derecha */
  height: 100%;
  z-index: 1;
}

.parallax-image {
  width: 120%;
  /* Sobredimensionada para el parallax */
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
  background: linear-gradient(90deg, #000 0%, rgba(0, 0, 0, 0.8) 30%, transparent 100%);
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
  max-width: 600px;
}

.text-content {
  display: flex;
  flex-direction: column;
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
  margin: 0 0 30px 0;
  line-height: 0.9;
  letter-spacing: 1px;
}

.description {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.6;
  margin-bottom: 40px;
  max-width: 520px;
}

.cta-wrapper {
  display: flex;
}

.btn-aliado {
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #fff;
  padding: 14px 40px;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 2px;
  border-radius: 4px;
  /* Según el diseño rectangular suavizado */
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  overflow: hidden;
}

.btn-aliado::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-aliado:hover {
  background: rgba(255, 255, 255, 0.6);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.btn-aliado:hover::before {
  left: 100%;
}

.arrow-icon {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.btn-aliado:hover .arrow-icon {
  transform: translateX(5px);
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
    background: linear-gradient(0deg, #000 0%, rgba(0, 0, 0, 0.7) 100%);
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
