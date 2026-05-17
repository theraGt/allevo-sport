<template>
  <IonModal :is-open="isOpen" @didDismiss="closeRegistroModal" presentation="modal"
    class="registro-modal">
    <div class="modal-container">
      <div class="modal-header">
        <button class="close-btn" @click="closeRegistroModal" aria-label="Cerrar">
          <ion-icon :icon="closeOutline"></ion-icon>
        </button>
      </div>
      <InvestorForm />
    </div>
  </IonModal>
</template>

<script setup lang="ts">
import { IonModal, IonIcon } from '@ionic/vue'
import { closeOutline } from 'ionicons/icons'
import { useRegistroModal } from '../../composables/useRegistroModal'
import InvestorForm from '../JoinEcosystem/InvestorForm.vue'

const { isOpen, closeRegistroModal } = useRegistroModal()
</script>

<style scoped>
.registro-modal {
  --border-radius: 24px;
  --background: transparent;
  --max-height: 90vh;
}

.modal-container {
  padding: 24px;
  background: linear-gradient(180deg, #111111 0%, #0a0a0a 100%);
  max-width: 480px;
  width: 90%;
  margin: auto;
  border-radius: 24px;
  border: 1px solid rgba(207, 46, 46, 0.3);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(207, 46, 46, 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
}

.close-btn {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background: rgba(207, 46, 46, 0.15);
  border-color: rgba(207, 46, 46, 0.4);
  color: var(--color-primary);
}
</style>