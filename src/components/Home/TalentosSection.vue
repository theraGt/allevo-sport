<template>
  <section class="talentos-section section" id="talentos">
    <InversionistaModal ref="inversionistaModal" />
    <div class="container" :style="parallaxStyle">
      <div class="poster-layout">
        <h2 class="background-text">TEAM SPORT</h2>

        <h2 class="title-overlay" v-reveal="'fade-up'">
          <span class="title">TEAM </span>
          <span class="title-red">SPORT</span>
        </h2>

        <div class="athletes-preview">
          <div
            v-for="(talento, index) in talentos"
            :key="index"
            v-reveal="'zoom-in'"
            :class="'reveal-wrap delay-' + ((index % 5) + 1)"
          >
            <RouterLink :to="'/talento/' + talento.slug" class="athlete-circle">
              <img :src="talento.imagenCircle || talento.imagen" :alt="talento.nombre"
                :style="{ objectPosition: talento.position || 'top' }" />
            </RouterLink>
          </div>
        </div>
      </div>

      <TalentosCarrusel :talentos="talentos" @invertir="openInversionista" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonIcon } from '@ionic/vue'
import { useMouseParallax } from '../../composables/useMouseParallax'
import { atletas } from '../../data/atletas'
import InversionistaModal from '../Modales/InversionistaModal.vue'
import TalentosCarrusel from './TalentosCarrusel.vue'
import { trendingUpOutline } from 'ionicons/icons'

const { parallaxStyle } = useMouseParallax(12)

const talentos = atletas
const inversionistaModal = ref<InstanceType<typeof InversionistaModal> | null>(null)

const openInversionista = (talento: any) => {
  inversionistaModal.value?.open(talento.slug)
}
</script>

<style scoped>
.talentos-section {
  background-color: var(--color-surface);
  padding: 40px 0 60px;
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.poster-layout {
  position: relative;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
}

.background-text {
  position: absolute;
  top: 50%;
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
  z-index: 3;
  text-align: center;
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2rem, 8vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
}

.title {
  display: inline;
  color: #ffffff;
  text-transform: uppercase;
}

.title-red {
  display: inline;
  color: #CC0000;
  text-transform: uppercase;
}

.athletes-preview {
  position: relative;
  z-index: 2;
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
}

.reveal-wrap {
  display: flex; /* ocupa el espacio del círculo sin interferir con hover */
}

.athlete-circle {
  display: block;
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid #CC0000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  background-color: var(--color-bg);
  z-index: 1;
  flex-shrink: 0;
}

.athlete-circle:hover {
  transform: translateY(-10px) scale(1.3);
  box-shadow: 0 20px 40px rgba(204, 0, 0, 0.7);
  border-color: #FF0000;
  z-index: 10;
}

.athlete-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  transition: transform 0.3s ease;
}

.athlete-circle:hover img {
  transform: scale(1.15);
}



@media (max-width: 768px) {
  .poster-layout {
    min-height: 250px;
  }

  .background-text {
    font-size: clamp(2rem, 20vw, 5rem);
  }

  .athletes-preview {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    max-width: 240px;
    margin: 20px auto;
  }

  .athlete-circle {
    width: 60px;
    height: 60px;
    flex-shrink: 0;
  }

  .title-overlay {
    font-size: clamp(1.5rem, 8vw, 2.5rem);
  }
}
</style>
