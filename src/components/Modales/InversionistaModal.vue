<template>
  <IonModal :is-open="isOpen" @didDismiss="closeModal" :breakpoints="[0, 0.5, 0.9]" :initial-breakpoint="0.9"
    class="inversionista-modal">
    <div class="modal-content">
      <!-- Header -->
      <div class="modal-header">
        <div class="header-brand">
          <div class="brand-icon">
            <ion-icon :icon="trendingUpOutline"></ion-icon>
          </div>
          <div class="header-text">
            <h2>Inversionista Allevo</h2>
            <p>Únete como inversionista del ecosistema deportivo</p>
          </div>
        </div>
        <button class="close-btn" @click="closeModal" aria-label="Cerrar">
          <ion-icon :icon="closeOutline"></ion-icon>
        </button>
      </div>

      <!-- Atleta pre-seleccionado banner -->
      <div v-if="atletaPreseleccionado" class="atleta-banner">
        <img :src="atletaPreseleccionado.imagen" :alt="atletaPreseleccionado.nombre" />
        <div class="atleta-banner-info">
          <span class="atleta-banner-label">Invirtiendo en</span>
          <span class="atleta-banner-name">{{ atletaPreseleccionado.nombre }}</span>
          <span class="atleta-banner-disciplina">{{ atletaPreseleccionado.disciplina }}</span>
        </div>
        <button class="atleta-banner-clear" @click="clearAtletaPreseleccionado" type="button">
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
              <div class="form-field wide" :class="{ focused: focusedField === 'nombreCompleto' }">
                <label>Nombre Completo <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="personOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.nombreCompleto" placeholder="Tu nombre completo" required
                    @focus="focusedField = 'nombreCompleto'" @blur="focusedField = null" />
                </div>
                <span v-if="nombreError" class="field-error">{{ nombreError }}</span>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'email' }">
                <label>Correo Electrónico <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="mailOutline" class="field-icon"></ion-icon>
                  <input type="email" v-model="form.email" placeholder="tu@email.com" required
                    @focus="focusedField = 'email'" @blur="focusedField = null" />
                </div>
                <span v-if="emailError" class="field-error">{{ emailError }}</span>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'telefono' }">
                <label>Teléfono <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="callOutline" class="field-icon"></ion-icon>
                  <input type="tel" v-model="form.telefono" placeholder="+502 0000 0000" required
                    @focus="focusedField = 'telefono'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field">
                <label>Tipo de Identificación <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="idCardOutline" class="field-icon"></ion-icon>
                  <select v-model="form.tipoIdentificacion" required>
                    <option value="" disabled>Selecciona</option>
                    <option value="DPI">DPI</option>
                    <option value="Pasaporte">Pasaporte</option>
                    <option value="DNI">DNI</option>
                  </select>
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'numeroIdentificacion' }">
                <label>Número de Identificación <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="documentTextOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.numeroIdentificacion" :placeholder="idPlaceholder" required
                    :maxlength="form.tipoIdentificacion === 'DPI' ? 13 : undefined"
                    @focus="focusedField = 'numeroIdentificacion'" @blur="focusedField = null" />
                </div>
                <span v-if="idError" class="field-error">{{ idError }}</span>
              </div>

              <div class="form-field">
                <label>Capital Disponible <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="cashOutline" class="field-icon"></ion-icon>
                  <select v-model="form.capitalDisponible" required>
                    <option value="" disabled>Selecciona un rango</option>
                    <option value="Q10K-Q50K">Q10,000 - Q50,000</option>
                    <option value="Q50K-Q250K">Q50,000 - Q250,000</option>
                    <option value="Q250K-Q1M">Q250,000 - Q1,000,000</option>
                    <option value="+Q1M">+ Q1,000,000</option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label>Moneda Preferida</label>
                <div class="input-wrap">
                  <ion-icon :icon="logoUsd" class="field-icon"></ion-icon>
                  <select v-model="form.monedaPreferida">
                    <option value="GTQ">GTQ (Quetzal)</option>
                    <option value="USD">USD (Dólar)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 2: Perfil de Inversión -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 1" class="form-step">
            <div class="step-title">
              <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
              <span>Perfil de Inversión</span>
            </div>

            <div class="form-grid two-col">
              <div class="form-field">
                <label>Riesgo Permitido <span class="required">*</span></label>
                <div class="risk-options">
                  <label v-for="r in riesgos" :key="r.value" class="risk-card"
                    :class="{ checked: form.riesgoPermitido === r.value }">
                    <input type="radio" :value="r.value" v-model="form.riesgoPermitido" required />
                    <ion-icon :icon="r.icon"></ion-icon>
                    <span class="risk-label">{{ r.label }}</span>
                    <span class="risk-desc">{{ r.desc }}</span>
                  </label>
                </div>
              </div>

              <div class="form-field">
                <label>Plazo Preferido <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="timeOutline" class="field-icon"></ion-icon>
                  <select v-model="form.plazoPreferido" required>
                    <option value="" disabled>Selecciona plazo</option>
                    <option value="6-meses">6 meses</option>
                    <option value="1-anio">1 año</option>
                    <option value="2-anios">2 años</option>
                    <option value="3-mas">3+ años</option>
                  </select>
                </div>
              </div>

              <div class="form-field wide">
                <label>¿En qué talento te gustaría invertir?</label>
                <div class="talentos-grid">
                  <div v-for="atleta in atletas" :key="atleta.slug" class="talento-option"
                    :class="{ selected: talentosSeleccionados.includes(atleta.slug) }"
                    @click="toggleTalento(atleta.slug)">
                    <img :src="atleta.imagen" :alt="atleta.nombre" :style="{ objectPosition: atleta.posicion || 'top' }" />
                    <div class="talento-info">
                      <span class="talento-nombre">{{ atleta.nombre }}</span>
                      <span class="talento-disciplina">{{ atleta.disciplina }}</span>
                    </div>
                    <div class="talento-check">
                      <ion-icon :icon="checkmarkOutline"></ion-icon>
                    </div>
                  </div>
                </div>
              </div>

              <div class="form-field" :class="{ focused: focusedField === 'profesion' }">
                <label>Profesión / Ocupación <span class="required">*</span></label>
                <div class="input-wrap">
                  <ion-icon :icon="briefcaseOutline" class="field-icon"></ion-icon>
                  <input type="text" v-model="form.profesion" placeholder="Ej: Ingeniero, Empresario, Médico" required
                    @focus="focusedField = 'profesion'" @blur="focusedField = null" />
                </div>
              </div>

              <div class="form-field wide" :class="{ focused: focusedField === 'direccion' }">
                <label>Dirección Completa <span class="required">*</span></label>
                <div class="input-wrap textarea-wrap">
                  <textarea v-model="form.direccion" placeholder="Dirección completa para verificación de domicilio"
                    rows="3" required @focus="focusedField = 'direccion'" @blur="focusedField = null"></textarea>
                </div>
              </div>
            </div>
          </div>
        </transition>

        <!-- Step 3: Datos Bancarios -->
        <transition name="slide-fade" mode="out-in">
          <div v-if="currentStep === 2" class="form-step">
            <div class="step-title">
              <ion-icon :icon="cardOutline"></ion-icon>
              <span>Datos Bancarios</span>
            </div>

            <div class="form-grid two-col">
              <div class="form-field">
                <label>Banco</label>
                <div class="input-wrap">
                  <ion-icon :icon="businessOutline" class="field-icon"></ion-icon>
                  <select v-model="form.bancoNombre">
                    <option value="">Selecciona banco</option>
                    <option value="Industrial">Banco Industrial</option>
                    <option value="GyT">Banco G&amp;T Continental</option>
                    <option value="Banrural">Banrural</option>
                    <option value="Agromercantil">BAM</option>
                    <option value="Promerica">Promerica</option>
                    <option value="Ficohsa">Ficohsa</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>
              </div>

              <div class="form-field">
                <label>Tipo de Cuenta</label>
                <div class="input-wrap">
                  <ion-icon :icon="walletOutline" class="field-icon"></ion-icon>
                  <select v-model="form.tipoCuenta">
                    <option value="">Selecciona</option>
                    <option value="Monetaria">Monetaria</option>
                    <option value="Ahorro">Ahorro</option>
                  </select>
                </div>
              </div>

              <div class="form-field wide" :class="{ focused: focusedField === 'numeroCuenta' }">
                <label>Número de Cuenta</label>
                <div class="input-wrap">
                  <ion-icon :icon="cardOutline" class="field-icon"></ion-icon>
                  <input :type="showCuenta ? 'text' : 'password'" v-model="form.numeroCuenta"
                    placeholder="Número de cuenta bancaria" @focus="focusedField = 'numeroCuenta'"
                    @blur="focusedField = null" />
                  <button type="button" class="toggle-visibility" @click="showCuenta = !showCuenta">
                    <ion-icon :icon="showCuenta ? eyeOffOutline : eyeOutline"></ion-icon>
                  </button>
                </div>
              </div>
            </div>

            <div class="bank-notice">
              <ion-icon :icon="lockClosedOutline"></ion-icon>
              <span>Esta información es opcional y se utilizará únicamente para transferencias futuras. Tus datos están
                protegidos.</span>
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
                <ion-icon :icon="trendingUpOutline"></ion-icon>
              </div>
              <div class="summary-name">{{ form.nombreCompleto || 'Sin nombre' }}</div>
              <div class="summary-alias" v-if="form.profesion">
                <ion-icon :icon="briefcaseOutline"></ion-icon>
                {{ form.profesion }}
              </div>

              <div class="summary-grid">
                <div class="summary-item">
                  <ion-icon :icon="mailOutline"></ion-icon>
                  <div>
                    <span class="label">Email</span>
                    <span class="value">{{ form.email || '-' }}</span>
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
                  <ion-icon :icon="idCardOutline"></ion-icon>
                  <div>
                    <span class="label">ID</span>
                    <span class="value">{{ form.tipoIdentificacion }} {{ form.numeroIdentificacion || '-' }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="cashOutline"></ion-icon>
                  <div>
                    <span class="label">Capital</span>
                    <span class="value">{{ capitalLabel }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
                  <div>
                    <span class="label">Riesgo</span>
                    <span class="value">{{ riesgoLabel }}</span>
                  </div>
                </div>
                <div class="summary-item">
                  <ion-icon :icon="timeOutline"></ion-icon>
                  <div>
                    <span class="label">Plazo</span>
                    <span class="value">{{ plazoLabel }}</span>
                  </div>
                </div>
                <div class="summary-item wide">
                  <ion-icon :icon="locationOutline"></ion-icon>
                  <div>
                    <span class="label">Dirección</span>
                    <span class="value">{{ form.direccion || '-' }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="terms-check">
              <label class="checkbox-wrap">
                <input type="checkbox" v-model="form.aceptaTerminos" required />
                <span class="checkmark"></span>
                <span class="checkbox-text">
                  Confirmo que la información proporcionada es verídica y autorizo a Allevo Sports a verificar mis datos
                  para fines de KYC/AML.
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
  trendingUpOutline,
  closeOutline,
  personOutline,
  mailOutline,
  callOutline,
  idCardOutline,
  documentTextOutline,
  cashOutline,
  logoUsd,
  shieldCheckmarkOutline,
  timeOutline,
  briefcaseOutline,
  cardOutline,
  businessOutline,
  walletOutline,
  lockClosedOutline,
  locationOutline,
  arrowBackOutline,
  arrowForwardOutline,
  sendOutline,
  checkmarkOutline,
  eyeOutline,
  eyeOffOutline,
  alertCircleOutline,
  checkmarkCircleOutline,
  shieldHalfOutline
} from 'ionicons/icons'
import { reactive, ref, computed } from 'vue'
import { useInversionistaModal } from '../../composables/useInversionistaModal'
import { atletas } from '../../data/atletas'
import { useToast } from '../../composables/useToast'

const props = defineProps<{
  presentingElement?: HTMLElement
}>()

const { isOpen, preselectedSlug, openInversionistaModal, closeInversionistaModal } = useInversionistaModal()
const { success, error } = useToast()

const openModal = (slug?: string) => {
  if (slug) {
    if (!talentosSeleccionados.value.includes(slug)) {
      talentosSeleccionados.value.push(slug)
    }
  }
  openInversionistaModal(slug)
}

const closeModal = () => {
  closeInversionistaModal()
  currentStep.value = 0
}

const clearAtletaPreseleccionado = () => {
  preselectedSlug.value = null
}

const atletaPreseleccionado = computed(() => {
  if (!preselectedSlug.value) return null
  return atletas.find(a => a.slug === preselectedSlug.value) || null
})

defineExpose({
  open: openModal
})

/* ─── Steps ─── */
const steps = ['Identidad', 'Inversión', 'Bancario', 'Confirmar']
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
const showCuenta = ref(false)
const isSubmitting = ref(false)

const form = reactive({
  nombreCompleto: '',
  email: '',
  telefono: '',
  tipoIdentificacion: '',
  numeroIdentificacion: '',
  capitalDisponible: '',
  monedaPreferida: 'GTQ',
  riesgoPermitido: '',
  plazoPreferido: '',
  profesion: '',
  direccion: '',
  bancoNombre: '',
  tipoCuenta: '',
  numeroCuenta: '',
  aceptaTerminos: false
})

const talentosSeleccionados = ref<string[]>([])

const riesgos = [
  { value: 'Conservador', label: 'Conservador', desc: 'Mínima volatilidad', icon: shieldCheckmarkOutline },
  { value: 'Moderado', label: 'Moderado', desc: 'Balance riesgo/rendimiento', icon: shieldHalfOutline },
  { value: 'Agresivo', label: 'Agresivo', desc: 'Alto rendimiento, alto riesgo', icon: alertCircleOutline }
]

const toggleTalento = (slug: string) => {
  const index = talentosSeleccionados.value.indexOf(slug)
  if (index === -1) {
    talentosSeleccionados.value.push(slug)
  } else {
    talentosSeleccionados.value.splice(index, 1)
  }
}

/* ─── Validation ─── */
const nombreError = computed(() => {
  if (!form.nombreCompleto) return ''
  const words = form.nombreCompleto.trim().split(/\s+/).filter(w => w.length > 0)
  return words.length < 3 ? 'Debe contener al menos 3 palabras (nombre y apellidos)' : ''
})

const emailError = computed(() => {
  if (!form.email) return ''
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return !regex.test(form.email) ? 'Ingresa un correo electrónico válido' : ''
})

const idError = computed(() => {
  if (!form.numeroIdentificacion || form.tipoIdentificacion !== 'DPI') return ''
  return form.numeroIdentificacion.length !== 13 ? 'El DPI debe tener exactamente 13 dígitos' : ''
})

const idPlaceholder = computed(() => {
  if (form.tipoIdentificacion === 'DPI') return '13 dígitos'
  if (form.tipoIdentificacion === 'Pasaporte') return 'Número de pasaporte'
  return 'Número de identificación'
})

const isStepValid = computed(() => {
  switch (currentStep.value) {
    case 0:
      return !!form.nombreCompleto &&
        form.nombreCompleto.trim().split(/\s+/).filter(w => w.length > 0).length >= 3 &&
        !!form.email &&
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) &&
        !!form.telefono &&
        !!form.tipoIdentificacion &&
        !!form.numeroIdentificacion &&
        (form.tipoIdentificacion !== 'DPI' || form.numeroIdentificacion.length === 13) &&
        !!form.capitalDisponible
    case 1:
      return !!form.riesgoPermitido && !!form.plazoPreferido && !!form.profesion && !!form.direccion
    case 2:
      return true // Todo opcional
    default:
      return true
  }
})

const capitalLabel = computed(() => {
  const map: Record<string, string> = {
    'Q10K-Q50K': 'Q10,000 - Q50,000',
    'Q50K-Q250K': 'Q50,000 - Q250,000',
    'Q250K-Q1M': 'Q250,000 - Q1,000,000',
    '+Q1M': '+ Q1,000,000'
  }
  return map[form.capitalDisponible] || '-'
})

const riesgoLabel = computed(() => form.riesgoPermitido || '-')
const plazoLabel = computed(() => {
  const map: Record<string, string> = {
    '1-anio': '1 año',
    '2-anios': '2 años',
    '3-mas': '3 años',
    '5-mas': '5+ años'
  }
  return map[form.plazoPreferido] || '-'
})

/* ─── Submit ─── */
const API_BASE_URL = 'https://allevosports.thera.com.gt:81/api'

async function handleSubmit() {
  if (!form.aceptaTerminos) return
  isSubmitting.value = true

  try {
    const payload = {
      tipo: 'inversionista',
      nombre: form.nombreCompleto,
      email: form.email,
      telefono: form.telefono || null,
      ciudad: null,
      departamento: null,
      municipio: null,
      datos: {
        nombre_completo: form.nombreCompleto,
        telefono: form.telefono,
        tipo_identificacion: form.tipoIdentificacion,
        numero_identificacion: form.numeroIdentificacion,
        capital_disponible: form.capitalDisponible,
        moneda_preferida: form.monedaPreferida,
        riesgo_permitido: form.riesgoPermitido,
        plazo_preferido: form.plazoPreferido,
        profesion: form.profesion,
        direccion: form.direccion,
        banco_nombre: form.bancoNombre || null,
        tipo_cuenta: form.tipoCuenta || null,
        numero_cuenta: form.numeroCuenta || null,
        talentos_invertir: talentosSeleccionados.value
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
    console.error('Error al enviar inversionista:', err)
    error('Error al enviar', err.message || 'Ocurrió un error. Intenta de nuevo.')
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  currentStep.value = 0
  Object.assign(form, {
    nombreCompleto: '',
    email: '',
    telefono: '',
    tipoIdentificacion: '',
    numeroIdentificacion: '',
    capitalDisponible: '',
    monedaPreferida: 'GTQ',
    riesgoPermitido: '',
    plazoPreferido: '',
    profesion: '',
    direccion: '',
    bancoNombre: '',
    tipoCuenta: '',
    numeroCuenta: '',
    aceptaTerminos: false
  })
}
</script>

<style scoped>
/* ─── Modal Shell ─── */
.inversionista-modal {
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

/* ─── Atleta Pre-seleccionado Banner ─── */
.atleta-banner {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 12px 16px;
  margin-bottom: 20px;
  background: rgba(207, 46, 46, 0.1);
  border: 1px solid rgba(207, 46, 46, 0.25);
  border-radius: var(--border-radius);
  position: relative;
}

.atleta-banner img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-primary);
  flex-shrink: 0;
}

.atleta-banner-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.atleta-banner-label {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.atleta-banner-name {
  font-family: var(--font-heading);
  font-size: 0.95rem;
  color: var(--color-text);
  font-weight: 600;
}

.atleta-banner-disciplina {
  font-size: 0.75rem;
  color: var(--color-primary);
}

.atleta-banner-clear {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.atleta-banner-clear:hover {
  background: rgba(207, 46, 46, 0.2);
  border-color: var(--color-primary);
  color: var(--color-primary);
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

.form-field.wide {
  grid-column: 1 / -1;
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

.field-error {
  font-size: 0.75rem;
  color: #ff6b6b;
  margin-top: 2px;
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

/* ─── Risk Cards ─── */
.risk-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.risk-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px 8px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-align: center;
}

.risk-card input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.risk-card ion-icon {
  font-size: 1.6rem;
  color: var(--color-text-muted);
  transition: color 0.2s ease;
}

.risk-card .risk-label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-text);
}

.risk-card .risk-desc {
  font-size: 0.65rem;
  color: var(--color-text-muted);
  line-height: 1.3;
}

.risk-card.checked {
  border-color: var(--color-primary);
  background: rgba(207, 46, 46, 0.1);
}

.risk-card.checked ion-icon {
  color: var(--color-primary);
}

/* ─── Talentos Grid ─── */
.talentos-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 8px;
}

.talento-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.talento-option img {
  width: 100%;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
  filter: grayscale(60%);
  transition: all 0.2s ease;
}

.talento-option .talento-info {
  text-align: center;
}

.talento-option .talento-nombre {
  display: block;
  font-family: var(--font-heading);
  font-size: 0.75rem;
  color: var(--color-text);
  margin-bottom: 2px;
}

.talento-option .talento-disciplina {
  display: block;
  font-size: 0.65rem;
  color: var(--color-text-muted);
}

.talento-option .talento-check {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease;
}

.talento-option .talento-check ion-icon {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.talento-option.selected {
  border-color: var(--color-primary);
  background: rgba(207, 46, 46, 0.1);
}

.talento-option.selected img {
  filter: grayscale(0%);
}

.talento-option.selected .talento-check {
  opacity: 1;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.talento-option.selected .talento-check ion-icon {
  color: #fff;
}

/* ─── Bank Notice ─── */
.bank-notice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 16px;
  padding: 12px 14px;
  background: rgba(0, 224, 144, 0.06);
  border: 1px solid rgba(0, 224, 144, 0.15);
  border-radius: var(--border-radius);
}

.bank-notice ion-icon {
  font-size: 1.1rem;
  color: #00e090;
  margin-top: 2px;
  flex-shrink: 0;
}

.bank-notice span {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.4;
}

/* ─── Toggle Visibility ─── */
.toggle-visibility {
  background: none;
  border: none;
  color: var(--color-text-muted);
  cursor: pointer;
  font-size: 1.1rem;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
}

.toggle-visibility:hover {
  color: var(--color-primary);
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

  .risk-options {
    grid-template-columns: 1fr;
  }

  .talentos-grid {
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
