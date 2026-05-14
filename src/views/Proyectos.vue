<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" id="main-content">
      <ComingSoonSection />
      <AppFooter />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import ComingSoonSection from '@/components/Sistema/ComingSoonSection.vue'
</script>

<style scoped>
ion-content {
  --background: var(--color-bg);
}
</style>
