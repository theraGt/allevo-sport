<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" class="join-ecosystem-page">
      <div class="page-bg">
        <div class="bg-gradient"></div>
        <div class="bg-particles"></div>
      </div>

      <EcosystemHero />

      <JoinTabs 
        :active-role="activeRole" 
        @update:active-role="activeRole = $event" 
      />

      <div class="forms-section">
        <div class="forms-container">
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
import { ref, computed, markRaw } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
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
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(207, 46, 46, 0.1), transparent),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(207, 46, 46, 0.05), transparent),
    linear-gradient(180deg, #0b0b0b 0%, #0f0f0f 100%);
}

.bg-particles {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(207, 46, 46, 0.08) 0%, transparent 1%),
    radial-gradient(circle at 80% 70%, rgba(207, 46, 46, 0.05) 0%, transparent 1%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 1%);
  background-size: 100px 100px, 150px 150px, 200px 200px;
  animation: particle-float 20s linear infinite;
}

@keyframes particle-float {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

.forms-section {
  position: relative;
  z-index: 1;
  padding: 40px 20px 60px;
}

.forms-container {
  max-width: 600px;
  margin: 0 auto;
  position: relative;
}

.forms-container::before {
  content: '';
  position: absolute;
  inset: -20px;
  background: radial-gradient(ellipse at center, rgba(207, 46, 46, 0.05), transparent 70%);
  pointer-events: none;
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
    padding: 30px 16px 50px;
  }
  
  .forms-container {
    max-width: 100%;
  }
}
</style>