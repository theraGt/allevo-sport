<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true">
      <SistemaSection />
      <AlianzaSection />
      <AppFooter />
    </ion-content>

    <FloatingInvestButton @click="openAtletasModal" />
    <AtletasModal ref="atletasModalRef" />
    <SponsorModal />
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import SistemaSection from '@/components/Sistema/Sistema.vue'
import AlianzaSection from '@/components/Sistema/Alianza.vue'
import FloatingInvestButton from '@/components/Home/FloatingInvestButton.vue'
import AtletasModal from '@/components/Modales/AtletasModal.vue'
import SponsorModal from '@/components/Modales/SponsorModal.vue'

const atletasModalRef = ref<InstanceType<typeof AtletasModal> | null>(null)

const openAtletasModal = () => {
  atletasModalRef.value?.open()
}
</script>

<style scoped>
ion-content {
  --background: var(--color-bg);
}
</style>
