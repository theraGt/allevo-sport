<template>
  <Teleport to="body">
    <TransitionGroup name="toast" tag="div" class="toast-container">
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="toast.type">
        <div class="toast-icon">
          <ion-icon :icon="getIcon(toast.type)"></ion-icon>
        </div>
        <div class="toast-content">
          <div class="toast-title">{{ toast.title }}</div>
          <div class="toast-message" v-if="toast.message">{{ toast.message }}</div>
        </div>
        <button class="toast-close" @click="removeToast(toast.id)">
          <ion-icon :icon="close"></ion-icon>
        </button>
        <div class="toast-progress" :style="{ animationDuration: toast.duration + 'ms' }"></div>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup lang="ts">
import { IonIcon } from '@ionic/vue'
import { checkmarkCircle, alertCircle, informationCircle, close } from 'ionicons/icons'
import { useToast } from '../../composables/useToast'

const { toasts, removeToast } = useToast()

const getIcon = (type: string) => {
  switch (type) {
    case 'success': return checkmarkCircle
    case 'error': return alertCircle
    case 'info': return informationCircle
    default: return checkmarkCircle
  }
}

const closeIcon = close
</script>

<style scoped>
.toast-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 380px;
  width: 100%;
  pointer-events: none;
}

.toast {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  overflow: hidden;
  pointer-events: all;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateX(100%); }
  to { opacity: 1; transform: translateX(0); }
}

.toast.success { border-color: rgba(0, 224, 144, 0.4); }
.toast.success .toast-icon { color: #00e090; }
.toast.success .toast-progress { background: linear-gradient(90deg, #00e090, #00c078); }

.toast.error { border-color: rgba(255, 107, 107, 0.4); }
.toast.error .toast-icon { color: #ff6b6b; }
.toast.error .toast-progress { background: linear-gradient(90deg, #ff6b6b, #ee5a5a); }

.toast.info { border-color: rgba(59, 130, 246, 0.4); }
.toast.info .toast-icon { color: #3b82f6; }
.toast.info .toast-progress { background: linear-gradient(90deg, #3b82f6, #2563eb); }

.toast-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.toast-icon ion-icon { font-size: 1.4rem; }

.toast-content { flex: 1; min-width: 0; }

.toast-title {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
  line-height: 1.3;
}

.toast-message {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 4px;
  line-height: 1.4;
}

.toast-close {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.2s ease;
}
.toast-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
.toast-close ion-icon { font-size: 1rem; }

.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  transform-origin: left;
  animation: progress linear forwards;
}

@keyframes progress {
  from { transform: scaleX(1); }
  to { transform: scaleX(0); }
}

.toast-enter-active { animation: slideIn 0.3s ease; }
.toast-leave-active { animation: slideOut 0.3s ease; }

@keyframes slideOut {
  from { opacity: 1; transform: translateX(0); }
  to { opacity: 0; transform: translateX(100%); }
}

@media (max-width: 480px) {
  .toast-container { top: 10px; right: 10px; left: 10px; max-width: none; }
}
</style>