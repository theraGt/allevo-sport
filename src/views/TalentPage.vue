<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" id="main-content">
      <section class="talentos-page">
        <div class="poster-layout">
          <h2 class="background-text"></h2>

          <header class="section-header">
            <span class="subtitle">Nuestros Atletas</span>
            <h2 class="title-overlay">
              <span class="title">DETRÁS DE</span>
              <span class="title-red">NUESTRO ÉXITO</span>
            </h2>
            <div class="accent-line"></div>
          </header>

          <talentos :show-header="false" :show-c-t-a="false" inline />

          <TalentosCTA />
        </div>
      </section>
      <AppFooter />
    </ion-content>

    <SponsorModal />
    <AtletasModal />
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import SponsorModal from '@/components/Modales/SponsorModal.vue'
import AtletasModal from '@/components/Modales/AtletasModal.vue'
import talentos from '@/components/Talentos/talentos.vue'
import TalentosCTA from '@/components/Talentos/TalentosCTA.vue'
</script>

<style scoped>
ion-content {
  --background: var(--color-bg);
}

.talentos-page {
  background-color: var(--color-surface);
  padding: 60px 0;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.poster-layout {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.background-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Oswald', sans-serif;
  font-size: clamp(4rem, 20vw, 14rem);
  font-weight: 800;
  color: #F9B7C5;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  pointer-events: none;
  z-index: 0;
  line-height: 1;
}

.section-header {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 40px;
}

.subtitle {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #EE2B24;
  margin-bottom: 10px;
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
  margin-bottom: 20px;
}

.title {
  display: block;
}

.title-red {
  display: block;
  color: #CC0000;
}

.accent-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #EE2B24, #ff6b6b);
  margin: 0 auto;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .poster-layout {
    min-height: 300px;
  }

  .background-text {
    font-size: clamp(2rem, 20vw, 5rem);
  }
}

@media (max-width: 576px) {
  .talentos-page {
    padding: 40px 0;
  }
}
</style>
