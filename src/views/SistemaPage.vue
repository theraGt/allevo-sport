<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" id="main-content">
      <SistemaSection />
      <AlianzaSection />
      <AppFooter />
    </ion-content>

    <SponsorModal />
    <AtletasModal />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import SistemaSection from '@/components/Sistema/Sistema.vue'
import AlianzaSection from '@/components/Sistema/Alianza.vue'
import SponsorModal from '@/components/Modales/SponsorModal.vue'
import AtletasModal from '@/components/Modales/AtletasModal.vue'

</script>

<style scoped>
ion-content {
  --background: var(--color-bg);
}
</style>
