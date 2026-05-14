<template>
  <ion-page>
    <DashboardLayout>
      <PostulacionesDashboard />
    </DashboardLayout>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue'
import DashboardLayout from '../../components/Admin/Dashboard/DashboardLayout.vue'
import PostulacionesDashboard from '../../components/Admin/Postulaciones/PostulacionesDashboard.vue'
</script>
