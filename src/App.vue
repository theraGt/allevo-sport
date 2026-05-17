<template>
  <ion-app>
    <Toast />
    <AppMobileMenu v-if="!isAdminRoute" />
    <ion-router-outlet content-id="main-content" />
    <FloatingInvestButton v-if="!isAdminRoute" />
    <AtletasModal />
    <InversionistaModal />
    <RegistroModal />
  </ion-app>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AppMobileMenu from './components/Home/AppMobileMenu.vue';
import Toast from './components/UI/Toast.vue';
import FloatingInvestButton from './components/Home/FloatingInvestButton.vue';
import AtletasModal from './components/Modales/AtletasModal.vue';
import InversionistaModal from './components/Modales/InversionistaModal.vue';
import RegistroModal from './components/Modales/RegistroModal.vue';

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))

// Fix for accessibility: blur focus when navigating to avoid aria-hidden focus violations
import { watch } from 'vue'
watch(() => route.path, () => {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
})
</script>
