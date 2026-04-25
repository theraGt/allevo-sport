<template>
  <section class="alianzas-section section" id="alianzas">
    <div class="container">
      <div class="poster-layout">
        <h2 class="background-text">PARTNERS</h2>

        <h2 class="title-overlay" v-reveal="'fade-up'">
          <span class="title">ALIANZAS</span>
        </h2>

        <div class="alianzas-scroll">
          <div class="alianzas-track">
            <a v-for="(alianza, index) in alianzas" :key="index" :href="alianza.link" target="_blank"
              class="alianza-logo parallax-float" v-reveal="'fade-left'" :class="'delay-' + ((index % 5) + 1)">
              <img :src="alianza.logo" :alt="alianza.nombre" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const alianzas = [
  {
    nombre: 'K1 Combat Challenge GT',
    logo: '/assets/images/alianzas/ALianzas1.webp',
    link: 'https://www.sunriserungt.com/landing'
  },
  {
    nombre: 'UCC Latam',
    logo: '/assets/images/alianzas/ALianzas2.webp',
    link: 'https://www.instagram.com/ucc_latam/?hl=es'
  },
  {
    nombre: 'Sunrise Run GT',
    logo: '/assets/images/alianzas/ALianzas3.webp',
    link: 'https://www.instagram.com/k1combatchallengegt/?hl=es'
  }
]
</script>

<style scoped>
.alianzas-section {
  background-color: var(--color-surface);
  padding: 60px 0;
  position: relative;
  overflow: hidden;
}

.poster-layout {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.background-text {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Oswald', sans-serif;
  font-size: clamp(4rem, 15vw, 12rem);
  font-weight: 700;
  color: #FFB6C1;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0.4;
  z-index: 1;
  line-height: 1;
}

.title-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 30px;
}

.alianzas-scroll {
  position: relative;
  z-index: 2;
  overflow-x: auto;
  padding: 20px 0;
  width: 100%;
  -webkit-overflow-scrolling: touch;
}

.alianzas-scroll::-webkit-scrollbar {
  height: 4px;
}

.alianzas-scroll::-webkit-scrollbar-track {
  background: transparent;
}

.alianzas-scroll::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 2px;
}

.alianzas-track {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  padding: 10px 20px;
}

.alianza-logo {
  flex-shrink: 0;
  padding: 15px;
  transition: all var(--transition-normal);
  display: flex;
  justify-content: center;
}

.alianza-logo img {
  height: 130px;
  width: auto;
  max-width: 100%;
  filter: grayscale(80%);
  opacity: 0.9;
  transition: all var(--transition-normal);
}

.alianza-logo:hover {
  transform: scale(1.05);
}

.alianza-logo:hover img {
  filter: grayscale(0%);
  opacity: 1;
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .background-text {
    font-size: clamp(2rem, 20vw, 5rem);
  }

  .title-overlay {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
  }

  .alianzas-track {
    gap: 30px;
    flex-wrap: wrap;
  }

  .alianza-logo {
    flex: 0 0 50%;
    max-width: 50%;
    justify-content: center;
  }

  .alianza-logo img {
    height: 60px;
  }
}

@media (max-width: 480px) {
  .alianza-logo {
    flex: 0 0 100%;
    max-width: 100%;
  }

  .alianza-logo img {
    height: 50px;
    width: 50%;
  }
}
</style>