<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" id="main-content">
      <Eventos />
      <AppFooter />
    </ion-content>

    <SponsorModal />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import Eventos from '@/components/Noticias/Eventos.vue'
import SponsorModal from '@/components/Modales/SponsorModal.vue'

</script>

<style scoped>
ion-content {
  --background: var(--color-bg);
}
</style>