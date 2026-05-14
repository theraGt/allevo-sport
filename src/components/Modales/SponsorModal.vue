<template>
  <IonModal :is-open="isOpen" @didDismiss="closeModal" :breakpoints="[0, 0.5, 0.9]" :initial-breakpoint="0.9"
    class="sponsor-modal">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-brand">
          <div class="brand-icon">
            <ion-icon :icon="businessOutline"></ion-icon>
          </div>
          <div class="header-text">
            <h2>Patrocinador Allevo</h2>
            <p>Postula tu marca para formar parte del ecosistema deportivo</p>
          </div>
        </div>
        <button class="close-btn" @click="closeModal" aria-label="Cerrar">
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
        <!-- Step 1: Identidad de Marca -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 0" class="form-step">
            <div class="step-title">
              <ion-icon :icon="businessOutline"></ion-icon>
              <span>Identidad de Marca</span>
            </div>

            <div class="form-grid two-col">
              <div class="form-field" :class="{ focused: focusedField === 'nombreEmpresa' }">
                <label>Nombre de la Empresa o Marca <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="storefrontOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.nombreEmpresa" placeholder="Nombre de tu empresa" required
                    @focus="focusedField = 'nombreEmpresa'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'industria' }">
                <label>Industria / Sector <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="layersOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.industria" placeholder="Ej: Alimentos, Tecnología" required
                    @focus="focusedField = 'industria'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'sitioWeb' }">
                <label>Sitio Web</label>
                <div class="input-wrap">
                  <ion-icon :icon="globeOutline" class="field-icon"></ion-icon>
                  <input type="url" v-model="form.sitioWeb" placeholder="https://tuempresa.com"
                    @focus="focusedField = 'sitioWeb'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'redesSociales' }">
                <label>Redes Sociales</label>
                <div class="input-wrap">
                  <ion-icon :icon="shareSocialOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.redesSociales" placeholder="Instagram, LinkedIn..."
                    @focus="focusedField = 'redesSociales'" @blur="focusedField = null" />
                </div>
              </div>
            </div>

            <div class="form-field photo-field">
              <label>Logotipo de Alta Resolución</label>
              <div class="photo-upload" :class="{ 'has-preview': previewUrl }" @click="triggerFileInput">
                <input ref="logotipoInput" type="file" @change="handleLogotipoChange" accept="image/*"
                  class="file-input-hidden" />
                <div v-if="!previewUrl" class="photo-placeholder">
                  <ion-icon :icon="imageOutline"></ion-icon>
                  <span>Toca para subir logo</span>
                  <small>PNG, SVG · Máx. 5MB</small>
                </div>
                <img v-else :src="previewUrl" alt="Logo preview" class="photo-preview" />
                <button v-if="previewUrl" type="button" class="remove-photo" @click.stop="removePhoto">
                  <ion-icon :icon="closeCircleOutline"></ion-icon>
                </button>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 2: Objetivos -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 1" class="form-step">
            <div class="step-title">
              <ion-icon :icon="flagOutline"></ion-icon>
              <span>Objetivos de Patrocinio</span>
            </div>

            <div class="form-field">
              <label>Objetivo Principal <span class="required">*</span></label>
              <div class="input-wrap">
                <ion-icon :icon="trendingUpOutline" class="field-icon"></ion-icon>
                <select v-model="form.objetivoPrincipal" required>
                  <option value="" disabled>Selecciona un objetivo</option>
                  <option value="exposicion">Exposición de marca</option>
                  <option value="ventas">Ventas directas</option>
                  <option value="imagen">Imagen y reputación</option>
                  <option value="compromiso">Compromiso social</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div class="form-field" :class="{ focused: focusedField === 'publicoObjetivo' }">
              <label>Público Objetivo (Target)</label>
              <div class="input-wrap">
                <ion-icon :icon="peopleOutline" class="field-icon"></ion-icon>
                <input type="text" v-model="form.publicoObjetivo" placeholder="Ej: Jóvenes 18-35, atletas, familias"
                  @focus="focusedField = 'publicoObjetivo'" @blur="focusedField = null" />
              </div>
            </div>

            <div class="form-field" :class="{ focused: focusedField === 'valoresMarca' }">
              <label>Valores de Marca</label>
              <div class="input-wrap textarea-wrap">
                <textarea v-model="form.valoresMarca" placeholder="¿Qué valores quieres alinear con el deportista?"
                  rows="3" @focus="focusedField = 'valoresMarca'" @blur="focusedField = null"></textarea>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 3: Patrocinio -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 2" class="form-step">
            <div class="step-title">
              <ion-icon :icon="cashOutline"></ion-icon>
              <span>Detalle del Patrocinio</span>
            </div>

            <div class="form-field">
              <label>Presupuesto Estimado</label>
              <div class="input-wrap">
                <ion-icon :icon="walletOutline" class="field-icon"></ion-icon>
                <select v-model="form.presupuesto">
                  <option value="">Selecciona un rango</option>
                  <option value="menos-500">Menos de Q.500</option>
                  <option value="500-1000">Q.500 - Q.1,000</option>
                  <option value="1000-5000">Q.1,000 - Q.5,000</option>
                  <option value="5000-10000">Q.5,000 - Q.10,000</option>
                  <option value="mas-10000">Más de Q.10,000</option>
                  <option value="sin-definir">Sin definir aún</option>
                </select>
              </div>
            </div>

            <div class="form-field">
              <label>Tipo de Apoyo que Ofrece</label>
              <div class="checkbox-grid">
                <label v-for="tipo in tiposApoyo" :key="tipo.value" class="checkbox-card"
                  :class="{ checked: form.tipoApoyo.includes(tipo.value) }">
                  <input type="checkbox" :value="tipo.value" v-model="form.tipoApoyo" />
                  <ion-icon :icon="tipo.icon"></ion-icon>
                  <span>{{ tipo.label }}</span>
                </label>
              </div>
            </div>

            <div v-if="form.tipoApoyo.includes('monetario')" class="form-field"
              :class="{ focused: focusedField === 'montoMonetario' }">
              <label>Monto Estimado (USD)</label>
              <div class="input-wrap">
                <ion-icon :icon="logoUsd" class="field-icon"></ion-icon>
                <input type="number" v-model="form.montoMonetario" placeholder="0.00" min="0" step="0.01"
                  @focus="focusedField = 'montoMonetario'" @blur="focusedField = null" />
              </div>
            </div>

            <div class="form-field" :class="{ focused: focusedField === 'requerimientos' }">
              <label>Requerimientos del Patrocinio</label>
              <div class="input-wrap textarea-wrap">
                <textarea v-model="form.requerimientos"
                  placeholder="Describe qué esperas del deportista o evento patrocinado" rows="3"
                  @focus="focusedField = 'requerimientos'" @blur="focusedField = null"></textarea>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 4: Contacto + Facturación -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 3" class="form-step">
            <div class="step-title">
              <ion-icon :icon="personOutline"></ion-icon>
              <span>Contacto y Facturación</span>
            </div>

            <div class="form-grid two-col">
              <div class="form-field" :class="{ focused: focusedField === 'nombreContacto' }">
                <label>Nombre del Contacto <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="personOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.nombreContacto" placeholder="Nombre completo" required
                    @focus="focusedField = 'nombreContacto'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'emailContacto' }">
                <label>Correo Electrónico <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="mailOutline" class="field-icon"></ion-icon>
                  <input type="email" v-model="form.emailContacto" placeholder="tu@email.com" required
                    @focus="focusedField = 'emailContacto'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'telefonoContacto' }">
                <label>Teléfono de Contacto <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="callOutline" class="field-icon"></ion-icon>
                  <input type="tel" v-model="form.telefonoContacto" placeholder="+502 0000 0000" required
                    @focus="focusedField = 'telefonoContacto'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field">
                <label>Nivel de Autonomía</label>
                <div class="input-wrap">
                  <ion-icon :icon="keyOutline" class="field-icon"></ion-icon>
                  <select v-model="form.nivelAutonomia">
                    <option value="">Selecciona</option>
                    <option value="tomador-decisiones">Tomador de decisiones</option>
                    <option value="influenciador">Influenciador</option>
                    <option value="consultor">Consultor/Asesor</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="form-field" :class="{ focused: focusedField === 'nit' }">
              <label>NIT / Identificación Fiscal</label>
              <div class="input-wrap">
                <ion-icon :icon="documentTextOutline" class="field-icon"></ion-icon>
                <input type="text" v-model="form.nit" placeholder="NIT o identificación fiscal"
                  @focus="focusedField = 'nit'" @blur="focusedField = null" />
              </div>
            </div>

            <div class="form-field" :class="{ focused: focusedField === 'infoFacturacion' }">
              <label>Información de Facturación</label>
              <div class="input-wrap textarea-wrap">
                <textarea v-model="form.infoFacturacion" placeholder="Dirección fiscal, razón social, etc." rows="2"
                  @focus="focusedField = 'infoFacturacion'" @blur="focusedField = null"></textarea>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 5: Confirmación -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 4" class="form-step confirm-step">
            <div class="step-title">
              <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
              <span>Revisa tu información</span>
            </div>

            <div class="summary-card">
              <div class="summary-avatar">
                <img v-if="previewUrl" :src="previewUrl" alt="Logo" />
                <ion-icon v-else :icon="businessOutline"></ion-icon>
              </div>
              <div class="summary-name">{{ form.nombreEmpresa || 'Sin nombre' }}</div>
              <div class="summary-alias" v-if="form.industria">
                <ion-icon :icon="layersOutline"></ion-icon>
                {{ form.industria }}
              </div>

              <div class="summary-grid">
                <div class="summary-item">
                  <ion-icon :icon="personOutline"></ion-icon>
                  <div>
                    <span class="label">Contacto</span>
                    <span class="value">{{ form.nombreContacto || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="mailOutline"></ion-icon>
                  <div>
                    <span class="label">Email</span>
                    <span class="value">{{ form.emailContacto || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="callOutline"></ion-icon>
                  <div>
                    <span class="label">Teléfono</span>
                    <span class="value">{{ form.telefonoContacto || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="globeOutline"></ion-icon>
                  <div>
                    <span class="label">Sitio Web</span>
                    <span class="value">{{ form.sitioWeb || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item wide">
                  <ion-icon :icon="cashOutline"></ion-icon>
                  <div>
                    <span class="label">Presupuesto</span>
                    <span class="value">{{ presupuestoLabel }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="terms-check">
              <label class="checkbox-wrap">
                <input type="checkbox" v-model="form.autorizacionLogos" required />
                <span class="checkmark"></span>
                <span class="checkbox-text">
                  Autorizo el uso de mi marca y logos en materiales promocionales de Allevo Sports.
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

          <button v-else type="submit" class="btn-primary submit-btn"
            :disabled="!form.autorizacionLogos || isSubmitting">
            <span v-if="!isSubmitting">
              <ion-icon :icon="sendOutline"></ion-icon>
              Enviar Solicitud
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
  businessOutline,
  closeOutline,
  storefrontOutline,
  layersOutline,
  globeOutline,
  shareSocialOutline,
  imageOutline,
  closeCircleOutline,
  flagOutline,
  trendingUpOutline,
  peopleOutline,
  cashOutline,
  walletOutline,
  logoUsd,
  shirtOutline,
  barbellOutline,
  bulbOutline,
  constructOutline,
  personOutline,
  mailOutline,
  callOutline,
  keyOutline,
  documentTextOutline,
  shieldCheckmarkOutline,
  arrowBackOutline,
  arrowForwardOutline,
  sendOutline,
  checkmarkOutline
} from 'ionicons/icons'
import { reactive, ref, computed } from 'vue'
import { useModal } from '../../composables/useModal'
import { useToast } from '../../composables/useToast'

const { success, error } = useToast()

const props = defineProps<{
  presentingElement?: HTMLElement
}>()

const { isOpen, closeModal, openModal } = useModal()

defineExpose({
  open: openModal
})

/* ─── Steps ─── */
const steps = ['Marca', 'Objetivos', 'Patrocinio', 'Contacto', 'Confirmar']
const currentStep = ref(0)
const progressPercent = computed(() => (currentStep.value / (steps.length - 1)) * 100)

function nextStep() {
  if (isStepValid.value && currentStep.value < steps.length - 1) currentStep.value++
}
function prevStep() {
  if (currentStep.value > 0) currentStep.value--
}

/* ─── Form ─── */
const focusedField = ref<string | null>(null)
const logotipoInput = ref<HTMLInputElement | null>(null)
const previewUrl = ref<string | null>(null)
const isSubmitting = ref(false)

const form = reactive({
  nombreEmpresa: '',
  industria: '',
  logotipo: null as File | null,
  sitioWeb: '',
  redesSociales: '',
  objetivoPrincipal: '',
  publicoObjetivo: '',
  valoresMarca: '',
  presupuesto: '',
  tipoApoyo: [] as string[],
  montoMonetario: null as number | null,
  requerimientos: '',
  nombreContacto: '',
  telefonoContacto: '',
  emailContacto: '',
  nivelAutonomia: '',
  nit: '',
  infoFacturacion: '',
  autorizacionLogos: false
})

const tiposApoyo = [
  { value: 'monetario', label: 'Monetario', icon: cashOutline },
  { value: 'implementos', label: 'Implementos', icon: barbellOutline },
  { value: 'accesorios', label: 'Accesorios', icon: shirtOutline },
  { value: 'suplementos', label: 'Suplementos', icon: constructOutline },
  { value: 'servicios', label: 'Servicios', icon: bulbOutline },
  { value: 'otro', label: 'Otro', icon: layersOutline }
]

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0:
      return !!form.nombreEmpresa && !!form.industria
    case 1:
      return !!form.objetivoPrincipal
    case 2:
      return true // tipoApoyo es opcional
    case 3:
      return !!form.nombreContacto && !!form.telefonoContacto && !!form.emailContacto
    default:
      return true
  }
})

const presupuestoLabel = computed(() => {
  const map: Record<string, string> = {
    'menos-500': 'Menos de Q.500 ',
    '500-1000': 'Q.500 - Q.1,000 ',
    '1000-5000': 'Q.1,000 - Q.5,000 ',
    '5000-10000': 'Q.5,000 - Q.10,000 ',
    'mas-10000': 'Más de Q.10,000 ',
    'sin-definir': 'Sin definir aún'
  }
  return map[form.presupuesto] || '-'
})

/* ─── Photo ─── */
function triggerFileInput() {
  logotipoInput.value?.click()
}

function handleLogotipoChange(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.logotipo = target.files[0]
    previewUrl.value = URL.createObjectURL(target.files[0])
  }
}

function removePhoto() {
  form.logotipo = null
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value)
    previewUrl.value = null
  }
  if (logotipoInput.value) logotipoInput.value.value = ''
}

/* ─── Submit ─── */
const API_BASE_URL = 'https://allevosports.thera.com.gt:81/api'

async function handleSubmit() {
  if (!form.autorizacionLogos) return
  isSubmitting.value = true

  try {
    const payload = {
      tipo: 'sponsor',
      nombre: form.nombreContacto,
      email: form.emailContacto,
      telefono: form.telefonoContacto || null,
      ciudad: null,
      departamento: null,
      municipio: null,
      datos: {
        nombre_empresa: form.nombreEmpresa,
        industria: form.industria,
        sitio_web: form.sitioWeb || null,
        redes_sociales: form.redesSociales || null,
        objetivo_principal: form.objetivoPrincipal,
        publico_objetivo: form.publicoObjetivo || null,
        valores_marca: form.valoresMarca || null,
        presupuesto: form.presupuesto || null,
        tipo_apoyo: form.tipoApoyo.length > 0 ? form.tipoApoyo : null,
        monto_monetario: form.montoMonetario || null,
        requerimientos: form.requerimientos || null,
        nombre_contacto: form.nombreContacto,
        telefono_contacto: form.telefonoContacto,
        email_contacto: form.emailContacto,
        nivel_autonomia: form.nivelAutonomia || null,
        nit: form.nit || null,
        info_facturacion: form.infoFacturacion || null,
        autorizacion_logos: form.autorizacionLogos,
        foto_url: null // TODO: Subir logo y enviar URL
      }
    }

    const response = await fetch(`${API_BASE_URL}/postulaciones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || `Error ${response.status}`)
    }

    success('¡Solicitud enviada!', 'Te contactaremos pronto.')
    closeModal()
    resetForm()
  } catch (err: any) {
    console.error('Error al enviar patrocinio:', err)
    error('Error al enviar', err.message || 'Ocurrió un error. Intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  currentStep.value = 0
  Object.assign(form, {
    nombreEmpresa: '',
    industria: '',
    logotipo: null,
    sitioWeb: '',
    redesSociales: '',
    objetivoPrincipal: '',
    publicoObjetivo: '',
    valoresMarca: '',
    presupuesto: '',
    tipoApoyo: [],
    montoMonetario: null,
    requerimientos: '',
    nombreContacto: '',
    telefonoContacto: '',
    emailContacto: '',
    nivelAutonomia: '',
    nit: '',
    infoFacturacion: '',
    autorizacionLogos: false
  })
  removePhoto()
}
</script>

<style scoped>
/* ─── Modal Shell ─── */
.sponsor-modal {
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

.textarea-wrap {
  align-items: flex-start;
  padding-top: 10px;
  padding-bottom: 10px;
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
.form-field select,
.form-field textarea {
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

.form-field textarea {
  resize: vertical;
  min-height: 60px;
  padding: 0;
}

.form-field input::placeholder,
.form-field textarea::placeholder {
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

/* ─── Checkbox Grid ─── */
.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.checkbox-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 8px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.checkbox-card input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.checkbox-card ion-icon {
  font-size: 1.4rem;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.checkbox-card span {
  font-size: 0.75rem;
  color: var(--color-text-muted);
  text-align: center;
}

.checkbox-card.checked {
  border-color: var(--color-primary);
  background: rgba(207, 46, 46, 0.1);
}

.checkbox-card.checked ion-icon {
  color: var(--color-primary);
}

.checkbox-card.checked span {
  color: var(--color-text);
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

  .checkbox-grid {
    grid-template-columns: repeat(2, 1fr);
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
