<template>
  <ion-page>
    <DashboardLayout>
      <BlogsPanel />
    </DashboardLayout>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage } from '@ionic/vue'
import DashboardLayout from '@/components/Admin/Dashboard/DashboardLayout.vue'
import BlogsPanel from '@/views/Front/BlogsPanel.vue'
</script>
