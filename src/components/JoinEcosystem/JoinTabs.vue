<template>
  <section class="join-tabs-section">
    <div class="tabs-container">
      <!-- Segment -->
      <ion-segment
        v-model="activeRole"
        class="role-segment"
        mode="ios"
        v-reveal="'fade-up'"
      >
        <ion-segment-button value="inversionista">
          <ion-icon :icon="cashOutline"></ion-icon>
          <ion-label>QUIERO INVERTIR</ion-label>
        </ion-segment-button>
        <ion-segment-button value="talento">
          <ion-icon :icon="personOutline"></ion-icon>
          <ion-label>SOY ATLETA</ion-label>
        </ion-segment-button>
        <ion-segment-button value="aliado">
          <ion-icon :icon="peopleOutline"></ion-icon>
          <ion-label>SOY ALIADO</ion-label>
        </ion-segment-button>
      </ion-segment>

      <!-- Form Container -->
      <div class="form-container" v-reveal="'fade-up'">
        <div class="role-badge">
          <ion-icon :icon="currentRoleIcon" class="role-badge-icon"></ion-icon>
          {{ activeRole.toUpperCase() }}
        </div>

        <h2 class="form-title">ÚNETE COMO {{ activeRole.toUpperCase() }}</h2>
        <p class="form-subtitle">{{ roleSubtitle }}</p>

        <ion-button expand="block" class="social-btn google" @click="loginWithGoogle">
          <svg width="20" height="20" viewBox="0 0 24 24" slot="start" class="social-icon">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continuar con Google
        </ion-button>

        <ion-button expand="block" class="social-btn apple" @click="loginWithApple">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" slot="start" class="social-icon">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          Continuar con Apple
        </ion-button>

        <div class="divider">
          <span>O CONTINUA CON EMAIL</span>
        </div>

        <ion-button fill="clear" color="danger" class="email-btn" @click="goToEmailForm">
          Registrarse con correo electrónico
          <ion-icon :icon="arrowForwardOutline" slot="end"></ion-icon>
        </ion-button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { IonSegment, IonSegmentButton, IonLabel, IonIcon, IonButton } from '@ionic/vue'
import {
  cashOutline,
  personOutline,
  peopleOutline,
  arrowForwardOutline
} from 'ionicons/icons'

const props = defineProps<{
  activeRole: 'inversionista' | 'talento' | 'aliado'
}>()

const emit = defineEmits<{
  'update:activeRole': [value: 'inversionista' | 'talento' | 'aliado']
  'showEmailForm': [value: 'inversionista' | 'talento' | 'aliado']
}>()

const activeRole = ref(props.activeRole)

watch(() => props.activeRole, (val) => {
  activeRole.value = val
})

watch(activeRole, (val) => {
  emit('update:activeRole', val)
})

const roleData = {
  inversionista: {
    icon: cashOutline,
    subtitle: 'Invierte en el talento deportivo de Guatemala y Latinoamérica'
  },
  talento: {
    icon: personOutline,
    subtitle: 'Tokeniza tu carrera deportiva y conecta con inversionistas'
  },
  aliado: {
    icon: peopleOutline,
    subtitle: 'Colabora con nosotros y expande tu alcance en el ecosistema deportivo'
  }
}

const currentRoleIcon = computed(() => roleData[activeRole.value].icon)
const roleSubtitle = computed(() => roleData[activeRole.value].subtitle)

const loginWithGoogle = () => {
  console.log('Login with Google:', activeRole.value)
}

const loginWithApple = () => {
  console.log('Login with Apple:', activeRole.value)
}

const goToEmailForm = () => {
  emit('showEmailForm', activeRole.value)
}
</script>

<style scoped>
.join-tabs-section {
  position: relative;
  z-index: 2;
  padding: 0 20px 60px;
}

.tabs-container {
  max-width: 600px;
  margin: 0 auto;
}

/* Top Badges */
.top-badges {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.top-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: transparent;
  border: 1px solid #10B981;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #10B981;
}

.top-badge-icon {
  font-size: 14px;
}

/* Segment */
.role-segment {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 4px;
  --background: transparent;
}

ion-segment-button {
  --background: transparent;
  --background-checked: #EF4444;
  --color: #9CA3AF;
  --color-checked: #fff;
  --border-radius: 10px;
  --indicator-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  min-height: 44px;
}

ion-segment-button ion-icon {
  font-size: 18px;
  margin-bottom: 2px;
}

ion-segment-button::part(indicator) {
  display: none;
}

/* Form Container */
.form-container {
  margin-top: 32px;
  text-align: center;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #EF4444;
  letter-spacing: 1px;
  margin-bottom: 16px;
}

.role-badge-icon {
  font-size: 14px;
}

.form-title {
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  margin: 0 0 8px 0;
  letter-spacing: 1px;
}

.form-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #9CA3AF;
  margin: 0 0 28px 0;
  line-height: 1.5;
}

/* Social Buttons */
.social-btn {
  height: 48px;
  font-weight: 500;
  font-size: 14px;
  margin-bottom: 12px;
  --border-radius: 8px;
}

.social-btn.google {
  --background: #ffffff;
  --color: #1f1f1f;
}

.social-btn.apple {
  --background: #000000;
  --color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.social-icon {
  margin-right: 8px;
  flex-shrink: 0;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 20px 0;
  color: #9CA3AF;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 1px;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

/* Email Button */
.email-btn {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-transform: none;
  --color: #EF4444;
}

.email-btn:hover {
  text-decoration: underline;
}

@media (max-width: 480px) {
  .top-badges {
    flex-direction: column;
    align-items: center;
  }

  ion-segment-button ion-label {
    font-size: 10px;
  }
}
</style>
