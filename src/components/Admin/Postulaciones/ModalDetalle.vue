<template>
  <IonModal
    :is-open="isOpen"
    @didDismiss="$emit('cerrar')"
    class="crm-modal"
    :breakpoints="[0, 0.5, 0.9]"
    :initial-breakpoint="0.9"
  >
    <div class="modal-content" v-if="postulacion">
      <div class="modal-header">
        <div class="header-brand">
          <div class="brand-icon" :class="postulacion.tipo">
            <ion-icon :icon="avatarIcon(postulacion.tipo)"></ion-icon>
          </div>
          <div>
            <h2>{{ postulacion.nombre }}</h2>
            <span class="header-badge" :class="postulacion.tipo">{{ labelTipo(postulacion.tipo) }}</span>
            <span class="header-badge estado" :style="{ background: colorEstado(postulacion.estado) }">{{ labelEstado(postulacion.estado) }}</span>
          </div>
        </div>
        <button class="close-btn" @click="$emit('cerrar')">
          <ion-icon :icon="closeOutline"></ion-icon>
        </button>
      </div>

      <!-- Tabs -->
      <div class="crm-tabs">
        <button
          v-for="tab in tabsModal"
          :key="tab.id"
          :class="{ active: tabActivo === tab.id }"
          @click="tabActivo = tab.id"
        >
          <ion-icon :icon="tab.icon"></ion-icon>
          {{ tab.label }}
        </button>
      </div>

      <!-- Tab: Resumen -->
      <div v-if="tabActivo === 'resumen'" class="tab-content">
        <div class="info-grid">
          <div class="info-section">
            <h4>Datos de contacto</h4>
            <div class="info-row"><span>Email:</span> {{ postulacion.email }}</div>
            <div class="info-row"><span>Teléfono:</span> {{ postulacion.telefono || '-' }}</div>
            <div class="info-row"><span>Ciudad:</span> {{ postulacion.ciudad || '-' }}</div>
            <div class="info-row"><span>Departamento:</span> {{ postulacion.departamento || '-' }}</div>
            <div class="info-row"><span>Fecha:</span> {{ formatFecha(postulacion.created_at) }}</div>
          </div>

          <!-- Atleta -->
          <div class="info-section" v-if="postulacion.tipo === 'atleta'">
            <h4>Perfil deportivo</h4>
            <div class="info-row"><span>Deporte:</span> {{ datoExtra(postulacion, 'deporte') || '-' }}</div>
            <div class="info-row"><span>Especialidad:</span> {{ datoExtra(postulacion, 'especialidad') || '-' }}</div>
            <div class="info-row"><span>Alias:</span> {{ datoExtra(postulacion, 'alias_deportivo') || '-' }}</div>
            <div class="info-row"><span>DPI:</span> {{ datoExtra(postulacion, 'dpi') || '-' }}</div>
            <div class="info-row"><span>Nacimiento:</span> {{ datoExtra(postulacion, 'fecha_nacimiento') || '-' }}</div>
          </div>

          <!-- Sponsor -->
          <div class="info-section" v-if="postulacion.tipo === 'sponsor'">
            <h4>Perfil comercial</h4>
            <div class="info-row"><span>Empresa:</span> {{ datoExtra(postulacion, 'nombre_empresa') || '-' }}</div>
            <div class="info-row"><span>Industria:</span> {{ datoExtra(postulacion, 'industria') || '-' }}</div>
            <div class="info-row"><span>NIT:</span> {{ datoExtra(postulacion, 'nit') || '-' }}</div>
            <div class="info-row"><span>Web:</span> {{ datoExtra(postulacion, 'sitio_web') || '-' }}</div>
            <div class="info-row"><span>Presupuesto:</span> {{ datoExtra(postulacion, 'presupuesto') || '-' }}</div>
            <div class="info-row"><span>Tipo apoyo:</span> {{ formatoArray(datoExtra(postulacion, 'tipo_apoyo')) || '-' }}</div>
          </div>

          <!-- Inversionista -->
          <div class="info-section" v-if="postulacion.tipo === 'inversionista'">
            <h4>Perfil financiero</h4>
            <div class="info-row"><span>Capital:</span> {{ datoExtra(postulacion, 'capital_disponible') || '-' }}</div>
            <div class="info-row"><span>Riesgo:</span> {{ datoExtra(postulacion, 'riesgo_permitido') || '-' }}</div>
            <div class="info-row"><span>Plazo:</span> {{ datoExtra(postulacion, 'plazo_preferido') || '-' }}</div>
            <div class="info-row"><span>Moneda:</span> {{ datoExtra(postulacion, 'moneda_preferida') || '-' }}</div>
            <div class="info-row"><span>Profesión:</span> {{ datoExtra(postulacion, 'profesion') || '-' }}</div>
            <div class="info-row"><span>Banco:</span> {{ datoExtra(postulacion, 'banco_nombre') || '-' }}</div>
          </div>
        </div>
      </div>

      <!-- Tab: Datos JSON -->
      <div v-if="tabActivo === 'datos'" class="tab-content">
        <div class="json-tree">
          <pre>{{ JSON.stringify(postulacion.datos, null, 2) }}</pre>
        </div>
      </div>

      <!-- Tab: Notas Admin -->
      <div v-if="tabActivo === 'notas'" class="tab-content">
        <div class="notas-section">
          <textarea
            v-model="notaNueva"
            placeholder="Agregar nota interna..."
            rows="3"
          ></textarea>
          <button class="btn-primary" @click="guardarNota" :disabled="!notaNueva.trim()">
            Guardar Nota
          </button>
        </div>
        <div class="notas-lista" v-if="postulacion.notas_admin">
          <div class="nota-item">
            <div class="nota-fecha">{{ formatFecha(postulacion.updated_at) }}</div>
            <div class="nota-texto">{{ postulacion.notas_admin }}</div>
          </div>
        </div>
      </div>

      <!-- Tab: Acciones -->
      <div v-if="tabActivo === 'acciones'" class="tab-content">
        <div class="acciones-grid">
          <button
            v-for="est in estadosDisponibles"
            :key="est"
            class="btn-estado"
            :style="{ background: colorEstado(est) }"
            :disabled="est === postulacion.estado"
            @click="$emit('cambiarEstado', postulacion.id, est)"
          >
            {{ labelEstado(est) }}
          </button>
        </div>
      </div>
    </div>
  </IonModal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { IonModal, IonIcon } from '@ionic/vue'
import { closeOutline, personOutline, documentTextOutline, chatbubbleOutline, flagOutline } from 'ionicons/icons'
import {
  Postulacion, labelTipo, labelEstado, colorEstado, avatarIcon,
  datoExtra, formatFecha, formatoArray, estadosDisponibles
} from './postulacionesUtils'

const props = defineProps<{
  isOpen: boolean
  postulacion: Postulacion | null
}>()

const emit = defineEmits<{
  (e: 'cerrar'): void
  (e: 'cambiarEstado', id: number, estado: string): void
  (e: 'guardarNota', nota: string): void
}>()

const tabsModal = [
  { id: 'resumen', label: 'Resumen', icon: personOutline },
  { id: 'datos', label: 'Datos JSON', icon: documentTextOutline },
  { id: 'notas', label: 'Notas Admin', icon: chatbubbleOutline },
  { id: 'acciones', label: 'Acciones', icon: flagOutline }
]

const tabActivo = ref('resumen')
const notaNueva = ref('')

// Reset tab y nota cuando se abre el modal
watch(() => props.isOpen, (open) => {
  if (open) {
    tabActivo.value = 'resumen'
    notaNueva.value = ''
  }
})

const guardarNota = () => {
  if (!notaNueva.value.trim()) return
  emit('guardarNota', notaNueva.value.trim())
  notaNueva.value = ''
}
</script>

<style scoped>
.crm-modal {
  --border-radius: 16px 16px 0 0;
  --background: transparent;
}

.modal-content {
  padding: 28px 24px 40px;
  background: linear-gradient(180deg, #111111 0%, #0a0a0a 100%);
  height: 100%;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
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
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  flex-shrink: 0;
}

.brand-icon.atleta { background: rgba(239, 68, 68, 0.15); color: #EF4444; }
.brand-icon.sponsor { background: rgba(59, 130, 246, 0.15); color: #3B82F6; }
.brand-icon.inversionista { background: rgba(16, 185, 129, 0.15); color: #10B981; }

.header-badge {
  display: inline-block;
  padding: 3px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-right: 6px;
}

.header-badge.atleta { background: rgba(239, 68, 68, 0.15); color: #EF4444; }
.header-badge.sponsor { background: rgba(59, 130, 246, 0.15); color: #3B82F6; }
.header-badge.inversionista { background: rgba(16, 185, 129, 0.15); color: #10B981; }
.header-badge.estado { color: #fff; }

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

/* Tabs */
.crm-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding-bottom: 8px;
}

.crm-tabs button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  background: transparent;
  border: none;
  border-radius: var(--border-radius);
  color: var(--color-text-muted);
  font-family: var(--font-heading);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.crm-tabs button.active {
  background: rgba(207, 46, 46, 0.12);
  color: var(--color-primary);
}

.crm-tabs button:hover:not(.active) {
  color: var(--color-text);
  background: rgba(255, 255, 255, 0.03);
}

/* Tab Content */
.tab-content {
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.info-section {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 16px;
}

.info-section h4 {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 12px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  font-size: 0.85rem;
}

.info-row:last-child {
  border-bottom: none;
}

.info-row span:first-child {
  color: var(--color-text-muted);
}

.info-row span:last-child {
  color: var(--color-text);
  text-align: right;
  word-break: break-word;
}

.json-tree pre {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 16px;
  color: var(--color-text);
  font-size: 0.8rem;
  overflow-x: auto;
}

.notas-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.notas-section textarea {
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 12px;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  resize: vertical;
  min-height: 80px;
  outline: none;
}

.notas-section textarea:focus {
  border-color: var(--color-primary);
}

.btn-primary {
  padding: 12px 20px;
  border-radius: var(--border-radius);
  background: var(--color-primary);
  border: none;
  color: #fff;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s ease;
  align-self: flex-start;
}

.btn-primary:hover:not(:disabled) {
  opacity: 0.9;
}

.btn-primary:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.notas-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.nota-item {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 12px;
}

.nota-fecha {
  font-size: 0.7rem;
  color: var(--color-text-muted);
  margin-bottom: 4px;
}

.nota-texto {
  font-size: 0.85rem;
  color: var(--color-text);
  line-height: 1.4;
}

.acciones-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.btn-estado {
  padding: 14px;
  border-radius: var(--border-radius);
  border: none;
  color: #fff;
  font-family: var(--font-heading);
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  opacity: 0.9;
  transition: all 0.2s ease;
}

.btn-estado:hover:not(:disabled) {
  opacity: 1;
  transform: translateY(-2px);
}

.btn-estado:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

@media (max-width: 1024px) {
  .info-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .modal-content {
    padding: 20px 16px 32px;
  }
  .modal-header {
    margin-bottom: 16px;
  }
  .header-brand {
    flex-direction: row;
    align-items: center;
    gap: 10px;
  }
  .brand-icon {
    width: 40px;
    height: 40px;
    font-size: 1.2rem;
  }
  .header-brand h2 {
    font-size: 1rem;
    margin: 0 0 4px;
  }
  .header-badge {
    font-size: 0.6rem;
    padding: 2px 8px;
    margin-bottom: 2px;
    display: inline-block;
  }
  .crm-tabs {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 12px;
    gap: 6px;
  }
  .crm-tabs::-webkit-scrollbar {
    display: none;
  }
  .crm-tabs button {
    white-space: nowrap;
    flex-shrink: 0;
    font-size: 0.7rem;
    padding: 8px 12px;
    min-height: 40px;
  }
  .info-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .info-section {
    padding: 12px;
    border-radius: 10px;
  }
  .info-section h4 {
    font-size: 0.75rem;
    margin-bottom: 10px;
  }
  .info-row {
    font-size: 0.8rem;
    padding: 8px 0;
    flex-direction: column;
    gap: 2px;
    align-items: flex-start;
  }
  .info-row span:last-child {
    text-align: left;
    font-weight: 500;
  }
  .json-tree pre {
    padding: 12px;
    font-size: 0.75rem;
  }
  .notas-section textarea {
    padding: 10px;
    min-height: 70px;
  }
  .btn-primary {
    width: 100%;
    padding: 12px;
    text-align: center;
  }
  .acciones-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .btn-estado {
    padding: 14px;
    font-size: 0.85rem;
    min-height: 48px;
  }
  .close-btn {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }
}

@media (max-width: 480px) {
  .modal-content {
    padding: 16px 12px 28px;
  }
  .header-brand {
    gap: 8px;
  }
  .brand-icon {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }
  .header-brand h2 {
    font-size: 0.9rem;
  }
  .crm-tabs button {
    padding: 8px 10px;
    font-size: 0.65rem;
    gap: 4px;
  }
  .crm-tabs button ion-icon {
    font-size: 0.85rem;
  }
  .info-row {
    font-size: 0.75rem;
  }
  .btn-estado {
    font-size: 0.8rem;
    padding: 12px;
  }
}
</style>
