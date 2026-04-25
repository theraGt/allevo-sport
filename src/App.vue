<template>
  <ion-app>
    <AppMobileMenu />
    <ion-router-outlet content-id="main-content" />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import AppMobileMenu from './components/Home/AppMobileMenu.vue';
</script>
