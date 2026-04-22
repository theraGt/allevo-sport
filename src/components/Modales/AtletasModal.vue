<template>
  <IonModal :is-open="isOpen" @didDismiss="closeAtletasModal" :breakpoints="[0, 0.5, 0.9]" :initial-breakpoint="0.9"
    class="atletas-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>DATOS DEL TALENTO</h2>
        <button class="close-btn" @click="() => closeAtletasModal()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
            <path
              d="M277.1 238.6L155.7 377.2c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L183.2 156.8 99.8 73.4c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 24.7-9.3 34.3.4L220.3 112.5c4.2 4.2 6.2 10.1 5.4 15.7-.7 5.6-3.7 10.7-8.3 14.2l-73.5 73.5c-4.2 4.2-6.2 10.1-5.4 15.7.7 5.6 3.7 10.7 8.3 14.2l121.3 121.3c9.5 9.5 24.7 9.3 34.3-.4l22.2-22.2c9.4-9.4 9.4-24.6-.2-34.1z" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="register-form">
        <div class="form-group">
          <label>Nombre Completo</label>
          <input type="text" v-model="form.nombreCompleto" placeholder="Tu nombre completo" required />
        </div>

        <div class="form-group">
          <label>DPI</label>
          <input type="text" v-model="form.dpi" placeholder="Número de DPI" required />
        </div>

        <div class="form-group">
          <label>Alias Deportivo</label>
          <input type="text" v-model="form.aliasDeportivo" placeholder="Tu alias o apodo" />
        </div>

<div class="form-group">
            <label>Fotografía de Perfil / Acción</label>
            <input type="file" :ref="el => fotografiaInput = el" @change="handleFotografiaChange" accept="image/*" class="file-input" />
        </div>

        <div class="form-group">
          <label>Deporte</label>
          <select v-model="form.deporte" required>
            <option value="">Selecciona un deporte</option>
            <option value="Muay Thai">Muay Thai</option>
            <option value="Kickboxing">Kickboxing</option>
            <option value="Boxeo">Boxeo</option>
            <option value="Karate">Karate</option>
            <option value="Fisicoculturismo">Fisicoculturismo</option>
            <option value="Calistenia">Calistenia</option>
            <option value="MMA">MMA</option>
            <option value="Otro">Otro</option>
          </select>
        </div>

        <div class="form-group">
          <label>Especialidad</label>
          <input type="text" v-model="form.especialidad" placeholder="Tu especialidad en el deporte" required />
        </div>

        <div class="form-group">
          <label>Fecha de Nacimiento</label>
          <input type="date" v-model="form.fechaNacimiento" required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>Teléfono</label>
            <input type="tel" v-model="form.telefono" placeholder="+502 0000 0000" required />
          </div>

          <div class="form-group">
            <label>E-mail</label>
            <input type="email" v-model="form.email" placeholder="tu@email.com" required />
          </div>
        </div>

        <div class="form-group">
          <label>Ubicación Geográfica</label>
          <div class="ubicacion-grid">
            <input type="text" v-model="form.ciudad" placeholder="Ciudad" required />
            <input type="text" v-model="form.departamento" placeholder="Departamento" required />
            <input type="text" v-model="form.municipio" placeholder="Municipio" />
          </div>
        </div>

        <button type="submit" class="btn-primary submit-btn">
          Enviar
        </button>
      </form>
    </div>
  </IonModal>
</template>

<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { reactive, ref, defineExpose } from 'vue'
import { useAtletasModal } from '../../composables/useAtletasModal'

const { isOpen, closeAtletasModal, openAtletasModal } = useAtletasModal()

defineExpose({
  open: openAtletasModal
})

const fotografiaInput = ref<HTMLInputElement | null>(null)

const handleFotografiaChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.fotografia = target.files[0]
  }
}

const form = reactive({
  nombreCompleto: '',
  dpi: '',
  aliasDeportivo: '',
  fotografia: null as File | null,
  deporte: '',
  especialidad: '',
  fechaNacimiento: '',
  telefono: '',
  email: '',
  ciudad: '',
  departamento: '',
  municipio: ''
})

const handleSubmit = () => {
  console.log('Form submitted:', form)
  alert('¡Gracias por registrarte! Te contactaremos pronto.')
  closeAtletasModal()
}
</script>

<style scoped>
.atletas-modal {
  --border-radius: 16px 16px 0 0;
  --background: var(--color-bg);
}

.modal-content {
  padding: 30px;
  background-color: var(--color-surface);
  height: 100%;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.modal-header h2 {
  font-size: 1.1rem;
  color: var(--color-text);
  flex: 1;
  font-family: var(--font-heading);
  text-transform: uppercase;
}

.close-btn {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 5px;
  line-height: 1;
  transition: color var(--transition-fast);
}

.close-btn:hover {
  color: var(--color-primary);
}

.close-btn svg {
  width: 24px;
  height: 24px;
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: var(--font-heading);
  font-size: 0.85rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 12px 15px;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.ubicacion-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.file-input {
  padding: 10px;
  background-color: var(--color-bg);
  border: 1px dashed var(--color-border);
  border-radius: var(--border-radius);
  cursor: pointer;
}

.file-input::file-selector-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: var(--border-radius);
  cursor: pointer;
  margin-right: 10px;
}

.submit-btn {
  margin-top: 10px;
  padding: 14px 20px;
  font-size: 0.95rem;
}

@media (max-width: 576px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .ubicacion-grid {
    grid-template-columns: 1fr;
  }
}
</style>
