<template>
  <IonModal :is-open="isOpen" :presenting-element="props.presentingElement" @didDismiss="closeAtletasModal" :breakpoints="[0, 0.5, 0.9]" :initial-breakpoint="0.9"
    class="atletas-modal">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-brand">
          <div class="brand-icon">
            <ion-icon :icon="trophyOutline"></ion-icon>
          </div>
          <div class="header-text">
            <h2>Postulación de Talento</h2>
            <p>Completa tu perfil para formar parte del ecosistema Allevo</p>
          </div>
        </div>
        <button class="close-btn" @click="closeAtletasModal" aria-label="Cerrar">
          <ion-icon :icon="closeOutline"></ion-icon>
        </button>
      </div>

      <!-- Progress Steps -->
      <div class="progress-bar">
        <div class="progress-track">
          <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
        </div>
        <div class="progress-steps">
          <div v-for="(step, idx) in steps" :key="idx" class="step"
            :class="{ active: currentStep >= idx, completed: currentStep > idx }">
            <div class="step-dot">
              <ion-icon v-if="currentStep > idx" :icon="checkmarkOutline"></ion-icon>
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <span class="step-label">{{ step }}</span>
          </div>
        </div>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="register-form">
        <!-- Step 1: Identidad -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 0" class="form-step">
            <div class="step-title">
              <ion-icon :icon="personOutline"></ion-icon>
              <span>Identidad</span>
            </div>

            <div class="form-grid two-col">
              <div class="form-field" :class="{ focused: focusedField === 'nombreCompleto' }">
                <label>Nombre Completo <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="personOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.nombreCompleto" placeholder="Tu nombre completo" required
                    @focus="focusedField = 'nombreCompleto'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'dpi' }">
                <label>DPI <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="idCardOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.dpi" placeholder="Número de DPI" required maxlength="13"
                    @focus="focusedField = 'dpi'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'aliasDeportivo' }">
                <label>Alias Deportivo</label>
                <div class="input-wrap">
                  <ion-icon :icon="flashOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.aliasDeportivo" placeholder="Tu alias o apodo"
                    @focus="focusedField = 'aliasDeportivo'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field">
                <label>Fecha de Nacimiento <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="calendarOutline" class="field-icon"></ion-icon>
                  <input type="date" v-model="form.fechaNacimiento" required />
                </div>
              </div>
            </div>

            <div class="form-field photo-field">
              <label>Fotografía de Perfil / Acción</label>
              <div class="photo-upload" :class="{ 'has-preview': previewUrl }" @click="triggerFileInput">
                <input ref="fotografiaInput" type="file" @change="handleFotografiaChange" accept="image/*"
                  class="file-input-hidden" />
                <div v-if="!previewUrl" class="photo-placeholder">
                  <ion-icon :icon="cameraOutline"></ion-icon>
                  <span>Toca para subir foto</span>
                  <small>JPG, PNG · Máx. 5MB</small>
                </div>
                <img v-else :src="previewUrl" alt="Preview" class="photo-preview" />
                <button v-if="previewUrl" type="button" class="remove-photo" @click.stop="removePhoto">
                  <ion-icon :icon="closeCircleOutline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 2: Perfil Deportivo -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 1" class="form-step">
            <div class="step-title">
              <ion-icon :icon="fitnessOutline"></ion-icon>
              <span>Perfil Deportivo</span>
            </div>

            <div class="form-grid two-col">
              <div class="form-field">
                <label>Deporte <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="bodyOutline" class="field-icon"></ion-icon>
                  <select v-model="form.deporte" required>
                    <option value="" disabled>Selecciona tu deporte</option>
                    <option v-for="d in deportes" :key="d" :value="d">{{ d }}</option>
                  </select>
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'especialidad' }">
                <label>Especialidad <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="ribbonOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.especialidad" placeholder="Ej: Peso welter, kata, 100m planos"
                    required @focus="focusedField = 'especialidad'" @blur="focusedField = null" />
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 3: Contacto -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 2" class="form-step">
            <div class="step-title">
              <ion-icon :icon="callOutline"></ion-icon>
              <span>Contacto</span>
            </div>

            <div class="form-grid two-col">
              <div class="form-field" :class="{ focused: focusedField === 'telefono' }">
                <label>Teléfono <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="callOutline" class="field-icon"></ion-icon>
                  <input type="tel" v-model="form.telefono" placeholder="+502 0000 0000" required
                    @focus="focusedField = 'telefono'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'email' }">
                <label>E-mail <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="mailOutline" class="field-icon"></ion-icon>
                  <input type="email" v-model="form.email" placeholder="tu@email.com" required
                    @focus="focusedField = 'email'" @blur="focusedField = null" />
                </div>
              </div>
            </div>

            <div class="form-field">
              <label>Ubicación Geográfica <span class="required">*</span></label>
              <div class="location-grid">
                <div class="input-wrap" :class="{ focused: focusedField === 'ciudad' }">
                  <ion-icon :icon="businessOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.ciudad" placeholder="Ciudad" required
                    @focus="focusedField = 'ciudad'" @blur="focusedField = null" />
                </div>
                <div class="input-wrap" :class="{ focused: focusedField === 'departamento' }">
                  <ion-icon :icon="mapOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.departamento" placeholder="Departamento" required
                    @focus="focusedField = 'departamento'" @blur="focusedField = null" />
                </div>
                <div class="input-wrap" :class="{ focused: focusedField === 'municipio' }">
                  <ion-icon :icon="locationOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.municipio" placeholder="Municipio"
                    @focus="focusedField = 'municipio'" @blur="focusedField = null" />
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 4: Confirmación -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 3" class="form-step confirm-step">
            <div class="step-title">
              <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
              <span>Revisa tu información</span>
            </div>

            <div class="summary-card">
              <div class="summary-avatar">
                <img v-if="previewUrl" :src="previewUrl" alt="Foto" />
                <ion-icon v-else :icon="personCircleOutline"></ion-icon>
              </div>
              <div class="summary-name">{{ form.nombreCompleto || 'Sin nombre' }}</div>
              <div class="summary-alias" v-if="form.aliasDeportivo">
                <ion-icon :icon="flashOutline"></ion-icon>
                {{ form.aliasDeportivo }}
              </div>

              <div class="summary-grid">
                <div class="summary-item">
                  <ion-icon :icon="idCardOutline"></ion-icon>
                  <div>
                    <span class="label">DPI</span>
                    <span class="value">{{ form.dpi || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="calendarOutline"></ion-icon>
                  <div>
                    <span class="label">Nacimiento</span>
                    <span class="value">{{ form.fechaNacimiento || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="bodyOutline"></ion-icon>
                  <div>
                    <span class="label">Deporte</span>
                    <span class="value">{{ form.deporte || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="ribbonOutline"></ion-icon>
                  <div>
                    <span class="label">Especialidad</span>
                    <span class="value">{{ form.especialidad || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="callOutline"></ion-icon>
                  <div>
                    <span class="label">Teléfono</span>
                    <span class="value">{{ form.telefono || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="mailOutline"></ion-icon>
                  <div>
                    <span class="label">Email</span>
                    <span class="value">{{ form.email || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item wide">
                  <ion-icon :icon="locationOutline"></ion-icon>
                  <div>
                    <span class="label">Ubicación</span>
                    <span class="value">{{ locationLabel }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="terms-check">
              <label class="checkbox-wrap">
                <input type="checkbox" v-model="form.aceptaTerminos" required />
                <span class="checkmark"></span>
                <span class="checkbox-text">
                  Acepto los <a href="/terminos" target="_blank">términos y condiciones</a> y la
                  <a href="/privacidad" target="_blank">política de privacidad</a> de Allevo Sports.
                </span>
              </label>
            </div>
          </div>
        </transition>

        <!-- Actions -->
        <div class="form-actions">
          <button v-if="currentStep > 0" type="button" class="btn-outline" @click="prevStep">
            <ion-icon :icon="arrowBackOutline"></ion-icon>
            Atrás
          </button>

          <button v-if="currentStep < steps.length - 1" type="button" class="btn-primary" @click="nextStep"
            :disabled="!isStepValid">
            Siguiente
            <ion-icon :icon="arrowForwardOutline"></ion-icon>
          </button>

          <button v-else type="submit" class="btn-primary submit-btn" :disabled="!form.aceptaTerminos || isSubmitting">
            <span v-if="!isSubmitting">
              <ion-icon :icon="sendOutline"></ion-icon>
              Enviar Postulación
            </span>
            <span v-else class="loader"></span>
          </button>
        </div>
      </form>
    </div>
  </IonModal>
</template>

<script setup lang="ts">
import { IonModal, IonIcon } from '@ionic/vue'
import {
  trophyOutline,
  closeOutline,
  personOutline,
  idCardOutline,
  flashOutline,
  calendarOutline,
  cameraOutline,
  closeCircleOutline,
  bodyOutline,
  ribbonOutline,
  callOutline,
  mailOutline,
  businessOutline,
  mapOutline,
  locationOutline,
  shieldCheckmarkOutline,
  personCircleOutline,
  arrowBackOutline,
  arrowForwardOutline,
  sendOutline,
  checkmarkOutline,
  fitnessOutline
} from 'ionicons/icons'
import { reactive, ref, computed } from 'vue'
import { useAtletasModal } from '../../composables/useAtletasModal'
import { useToast } from '../../composables/useToast'

const props = defineProps<{
  presentingElement?: HTMLElement
}>()

const { isOpen, closeAtletasModal } = useAtletasModal()
const { success, error } = useToast()

/* ─── Steps ─── */
const steps = ['Identidad', 'Deportivo', 'Contacto', 'Confirmar']
const currentStep = ref(0)
const progressPercent = computed(() => ((currentStep.value) / (steps.length - 1)) * 100)

function nextStep() {
  if (isStepValid.value && currentStep.value < steps.length - 1) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}

/* ─── Form ─── */
const focusedField = ref<string | null>(null)
const fotografiaInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isSubmitting = ref(false)

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
  municipio: '',
  aceptaTerminos: false
})

const deportes = [
  'Muay Thai',
  'Kickboxing',
  'Boxeo',
  'Karate',
  'Fisicoculturismo',
  'Calistenia',
  'MMA',
  'Otro'
]

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0:
      return !!form.nombreCompleto && !!form.dpi && !!form.fechaNacimiento
    case 1:
      return !!form.deporte && !!form.especialidad
    case 2:
      return !!form.telefono && !!form.email && !!form.ciudad && !!form.departamento
    default:
      return true
  }
})

const locationLabel = computed(() => {
  const parts = [form.ciudad, form.departamento, form.municipio].filter(Boolean)
  return parts.join(', ') || '-'
})

/* ─── Photo ─── */
function triggerFileInput() {
  fotografiaInput.value?.click()
}

function handleFotografiaChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.fotografia = target.files[0]
    previewUrl.value = URL.createObjectURL(target.files[0])
  }
}

function removePhoto() {
  form.fotografia = null
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
  if (fotografiaInput.value) fotografiaInput.value.value = ''
}

/* ─── Submit ─── */
const API_BASE_URL = 'https://allevosports.thera.com.gt:81/api'

async function handleSubmit() {
  if (!form.aceptaTerminos) return
  isSubmitting.value = true

  try {
    const payload = {
      tipo: 'atleta',
      nombre: form.nombreCompleto,
      email: form.email,
      telefono: form.telefono || null,
      ciudad: form.ciudad || null,
      departamento: form.departamento || null,
      municipio: form.municipio || null,
      datos: {
        dpi: form.dpi,
        alias_deportivo: form.aliasDeportivo || null,
        fecha_nacimiento: form.fechaNacimiento || null,
        foto_url: null, // TODO: Subir imagen a Cloudinary/S3 y enviar la URL aquí
        deporte: form.deporte,
        especialidad: form.especialidad,
        telefono: form.telefono,
        email: form.email
      }
    }

    const response = await fetch(`${API_BASE_URL}/postulaciones`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`)
    }

    success('¡Postulación enviada!', 'Te contactaremos pronto.')
    closeAtletasModal()
    resetForm()
  } catch (err: any) {
    console.error('Error al enviar postulación:', err)
    error('Error al enviar', err.message || 'Ocurrió un error. Intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  currentStep.value = 0
  Object.assign(form, {
    nombreCompleto: '',
    dpi: '',
    aliasDeportivo: '',
    fotografia: null,
    deporte: '',
    especialidad: '',
    fechaNacimiento: '',
    telefono: '',
    email: '',
    ciudad: '',
    departamento: '',
    municipio: '',
    aceptaTerminos: false
  })
  removePhoto()
}
</script>

<style scoped>
/* ─── Modal Shell ─── */
.atletas-modal {
  --border-radius: 24px 24px 0 0;
  --background: transparent;
}

.modal-content {
  padding: 28px 24px 100px;
  background: linear-gradient(180deg, #111111 0%, #0a0a0a 100%);
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

/* ─── Header ─── */
.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 24px;
  gap: 16px;
}

.header-brand {
  display: flex;
  align-items: center;
  gap: 14px;
}

.brand-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: linear-gradient(135deg, var(--color-primary) 0%, #8b1e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 8px 24px rgba(207, 46, 46, 0.35);
}

.header-text h2 {
  font-family: var(--font-heading);
  font-size: 1.15rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0 0 4px;
}

.header-text p {
  font-family: var(--font-body);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.4;
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
  flex-shrink: 0;
}

.close-btn:hover {
  background: rgba(207, 46, 46, 0.15);
  border-color: rgba(207, 46, 46, 0.4);
  color: var(--color-primary);
}

/* ─── Progress ─── */
.progress-bar {
  margin-bottom: 28px;
}

.progress-track {
  height: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 12px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--color-primary), #ff5a5a);
  border-radius: 2px;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  flex: 1;
}

.step-dot {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-family: var(--font-heading);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.step.active .step-dot {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  box-shadow: 0 4px 14px rgba(207, 46, 46, 0.4);
}

.step.completed .step-dot {
  background: rgba(0, 224, 144, 0.15);
  border-color: rgba(0, 224, 144, 0.4);
  color: #00e090;
}

.step-label {
  font-size: 0.68rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.step.active .step-label {
  color: var(--color-text);
}

/* ─── Form ─── */
.register-form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.form-step {
  flex: 1;
}

.step-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.step-title ion-icon {
  font-size: 1.1rem;
  color: var(--color-primary);
}

.form-grid {
  display: grid;
  gap: 14px;
}

.form-grid.two-col {
  grid-template-columns: 1fr 1fr;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-field label {
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.required {
  color: var(--color-primary);
}

.input-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 0 14px;
  transition: all 0.2s ease;
}

.input-wrap:focus-within,
.input-wrap.focused {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(207, 46, 46, 0.12);
}

.field-icon {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  flex-shrink: 0;
  transition: color 0.2s ease;
}

.input-wrap:focus-within .field-icon,
.input-wrap.focused .field-icon {
  color: var(--color-primary);
}

.form-field input,
.form-field select {
  flex: 1;
  background: transparent;
  border: none;
  padding: 13px 0;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  outline: none;
  min-width: 0;
}

.form-field input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.form-field select {
  cursor: pointer;
  appearance: none;
}

.form-field select option {
  background: #151515;
  color: var(--color-text);
}

/* ─── Photo Upload ─── */
.photo-field {
  margin-top: 4px;
}

.photo-upload {
  position: relative;
  width: 100%;
  height: 160px;
  border: 2px dashed var(--color-border);
  border-radius: var(--border-radius-lg);
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-upload:hover {
  border-color: var(--color-primary);
  background: rgba(207, 46, 46, 0.04);
}

.photo-upload.has-preview {
  border-style: solid;
  border-color: var(--color-border);
}

.file-input-hidden {
  position: absolute;
  inset: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 2;
}

.photo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--color-text-muted);
  pointer-events: none;
}

.photo-placeholder ion-icon {
  font-size: 2rem;
  opacity: 0.5;
}

.photo-placeholder span {
  font-family: var(--font-heading);
  font-size: 0.85rem;
}

.photo-placeholder small {
  font-size: 0.7rem;
  opacity: 0.5;
}

.photo-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: inherit;
}

.remove-photo {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  z-index: 3;
  transition: all 0.2s ease;
}

.remove-photo:hover {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

/* ─── Location Grid ─── */
.location-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.location-grid .input-wrap {
  padding: 0 12px;
}

.location-grid input {
  padding: 12px 0;
  font-size: 0.85rem;
}

/* ─── Summary / Confirm ─── */
.confirm-step {
  display: flex;
  flex-direction: column;
}

.summary-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius-lg);
  padding: 24px;
  text-align: center;
}

.summary-avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 12px;
  border: 2px solid var(--color-primary);
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.summary-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.summary-avatar ion-icon {
  font-size: 2.5rem;
  color: var(--color-text-muted);
}

.summary-name {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-text);
  margin-bottom: 4px;
}

.summary-alias {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--color-primary);
  margin-bottom: 20px;
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  text-align: left;
}

.summary-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  background: rgba(0, 0, 0, 0.2);
  padding: 12px;
  border-radius: var(--border-radius);
}

.summary-item.wide {
  grid-column: 1 / -1;
}

.summary-item ion-icon {
  font-size: 1.1rem;
  color: var(--color-primary);
  margin-top: 2px;
  flex-shrink: 0;
}

.summary-item .label {
  display: block;
  font-size: 0.65rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 2px;
}

.summary-item .value {
  display: block;
  font-size: 0.85rem;
  color: var(--color-text);
  word-break: break-word;
}

/* ─── Terms ─── */
.terms-check {
  margin-top: 20px;
}

.checkbox-wrap {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  position: relative;
}

.checkbox-wrap input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkmark {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s ease;
}

.checkbox-wrap input:checked+.checkmark {
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.checkbox-wrap input:checked+.checkmark::after {
  content: '';
  width: 5px;
  height: 9px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  margin-bottom: 2px;
}

.checkbox-text {
  font-size: 0.8rem;
  color: var(--color-text-muted);
  line-height: 1.5;
}

.checkbox-text a {
  color: var(--color-primary);
  text-decoration: none;
}

.checkbox-text a:hover {
  text-decoration: underline;
}

/* ─── Actions ─── */
.form-actions {
  position: sticky;
  bottom: 0;
  display: flex;
  gap: 12px;
  margin-top: auto;
  padding: 16px 0;
  background: rgba(10, 10, 10, 0.88);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  z-index: 10;
}

.form-actions .btn-primary,
.form-actions .btn-outline {
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
}

.form-actions .btn-primary {
  background: linear-gradient(135deg, var(--color-primary) 0%, #8b1e1e 100%);
  color: #fff;
  border: none;
  box-shadow: 0 8px 24px rgba(207, 46, 46, 0.3);
}

.form-actions .btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 32px rgba(207, 46, 46, 0.45);
}

.form-actions .btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.form-actions .btn-outline {
  background: transparent;
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.form-actions .btn-outline:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  background: rgba(207, 46, 46, 0.06);
}

.submit-btn ion-icon {
  font-size: 1rem;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* ─── Transitions ─── */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* ─── Responsive ─── */
@media (max-width: 576px) {
  .modal-content {
    padding: 22px 18px 32px;
  }

  .form-grid.two-col {
    grid-template-columns: 1fr;
  }

  .location-grid {
    grid-template-columns: 1fr;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .step-label {
    display: none;
  }

  .brand-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }

  .header-text h2 {
    font-size: 1rem;
  }
}
</style>
