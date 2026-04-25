<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" class="join-ecosystem-page" id="main-content">
      <div class="page-bg">
        <div class="bg-gradient"></div>
      </div>

      <EcosystemHero />

      <JoinTabs
        :active-role="activeRole"
        @update:active-role="activeRole = $event"
        @show-email-form="showEmailForm = true"
      />

      <div v-if="showEmailForm" class="forms-section">
        <div class="forms-container">
          <button class="back-btn" @click="showEmailForm = false">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
            Volver a opciones de registro
          </button>
          <Transition name="fade-slide" mode="out-in">
            <component
              :is="formComponents[activeRole]"
              :key="activeRole"
            />
          </Transition>
        </div>
      </div>

      <TrustSignals />

      <JoinFAQ />

      <AppFooter />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, markRaw } from 'vue'
import { IonContent, IonPage, IonIcon } from '@ionic/vue'
import { arrowBackOutline } from 'ionicons/icons'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import EcosystemHero from '@/components/JoinEcosystem/EcosystemHero.vue'
import JoinTabs from '@/components/JoinEcosystem/JoinTabs.vue'
import JoinFAQ from '@/components/JoinEcosystem/JoinFAQ.vue'
import TrustSignals from '@/components/JoinEcosystem/TrustSignals.vue'
import InvestorForm from '@/components/JoinEcosystem/InvestorForm.vue'
import TalentForm from '@/components/JoinEcosystem/TalentForm.vue'
import AllyForm from '@/components/JoinEcosystem/AllyForm.vue'

const activeRole = ref<'inversionista' | 'talento' | 'aliado'>('inversionista')
const showEmailForm = ref(false)

const formComponents = {
  inversionista: markRaw(InvestorForm),
  talento: markRaw(TalentForm),
  aliado: markRaw(AllyForm)
}
</script>

<style scoped>
.join-ecosystem-page {
  --background: transparent;
  position: relative;
}

.page-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #1a0505 0%, #0a0a0a 70%);
}

.forms-section {
  position: relative;
  z-index: 1;
  padding: 0 20px 60px;
}

.forms-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #9CA3AF;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 20px;
  padding: 0;
  transition: color 0.2s ease;
}

.back-btn:hover {
  color: #EF4444;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(30px) scale(0.95);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-30px) scale(0.95);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateX(0) scale(1);
}

@media (max-width: 768px) {
  .forms-section {
    padding: 0 16px 50px;
  }

  .forms-container {
    max-width: 100%;
  }
}
</style>
