<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" @ionScroll="handleScroll" id="main-content">
      <HeroSection :scroll-y="scrollY" />
      <TalentosSection />
      <AlianzasSection />
      <SistemaSponsors />
      <SponsorCTA />
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
import SponsorModal from '@/components/Modales/SponsorModal.vue'
import AtletasModal from '@/components/Modales/AtletasModal.vue'
import HeroSection from '@/components/Home/HeroSection.vue'
import TalentosSection from '@/components/Home/TalentosSection.vue'
import AlianzasSection from '@/components/Home/AlianzasSection.vue'
import SistemaSponsors from '@/components/Home/SistemaSponsors.vue'
import SponsorCTA from '@/components/Home/SponsorCTA.vue'
import FloatingInvestButton from '@/components/Home/FloatingInvestButton.vue'
import { useScrollEffects } from '@/composables/useScrollEffects'
import { useModal } from '@/composables/useModal'

const { handleScroll, scrollY } = useScrollEffects()
const { openModal } = useModal()
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
