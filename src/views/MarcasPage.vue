<template>
  <ion-page>
    <AppNavbar logoSrc="/assets/images/Alcance/logos-Sponsors-blanco.webp" />
    
    <ion-content :scroll-events="true" id="main-content">
      <MarcasHero />
      <AlcanceSection />
      <SponsorsSection />
      <AlianzasSection />
      <AppFooter logoSrc="/assets/images/Alcance/logos-Sponsors-blanco.webp" />
    </ion-content>

    <SponsorModal />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import MarcasHero from '@/components/Marcas/Marcas.vue'
import AlcanceSection from '@/components/Marcas/Alcance.vue'
import SponsorsSection from '@/components/Marcas/Sponsors.vue'
import AlianzasSection from '@/components/Marcas/AlianzasSection.vue'
import SponsorModal from '@/components/Modales/SponsorModal.vue'

</script>

<style scoped>
ion-content {
  --background: var(--color-bg);
}
</style>
