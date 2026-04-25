<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" id="main-content">
      <Biografias :slug="slug" />

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
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import Biografias from '@/components/Talentos/Biografias.vue'
import FloatingInvestButton from '@/components/Home/FloatingInvestButton.vue'
import AtletasModal from '@/components/Modales/AtletasModal.vue'
import SponsorModal from '@/components/Modales/SponsorModal.vue'

const route = useRoute()
const slug = computed(() => route.params.slug as string)
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
