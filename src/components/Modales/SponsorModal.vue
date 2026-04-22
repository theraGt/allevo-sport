<template>
  <IonModal :is-open="isOpen" @didDismiss="closeModal" :breakpoints="[0, 0.5, 0.9]" :initial-breakpoint="0.9"
    class="sponsor-modal">
    <div class="modal-content">
      <div class="modal-header">
        <h2>CONVIÉRTETE EN UNA MARCA PATROCINADORA</h2>
        <button class="close-btn" @click="() => closeModal()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="currentColor">
            <path
              d="M277.1 238.6L155.7 377.2c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L183.2 156.8 99.8 73.4c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 24.7-9.3 34.3.4L220.3 112.5c4.2 4.2 6.2 10.1 5.4 15.7-.7 5.6-3.7 10.7-8.3 14.2l-73.5 73.5c-4.2 4.2-6.2 10.1-5.4 15.7.7 5.6 3.7 10.7 8.3 14.2l121.3 121.3c9.5 9.5 24.7 9.3 34.3-.4l22.2-22.2c9.4-9.4 9.4-24.6-.2-34.1z" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="sponsor-form">
        <div class="form-section">
          <h3 class="section-title">Identidad de Marca (Lo Básico)</h3>
          
          <div class="form-group">
            <label>Nombre de la Empresa o Marca</label>
            <input type="text" v-model="form.nombreEmpresa" placeholder="Nombre de tu empresa o marca" required />
          </div>

          <div class="form-group">
            <label>Industria / Sector</label>
            <input type="text" v-model="form.industria" placeholder="Ej: Alimentos, Tecnología, Deportes" required />
          </div>

          <div class="form-group">
            <label>Logotipo de Alta Resolución</label>
            <input type="file" :ref="el => logotipoInput = el" @change="handleLogotipoChange" accept="image/*" class="file-input" />
          </div>

          <div class="form-group">
            <label>Sitio Web</label>
            <input type="url" v-model="form.sitioWeb" placeholder="https://tuempresa.com" />
          </div>

          <div class="form-group">
            <label>Redes Sociales</label>
            <input type="text" v-model="form.redesSociales" placeholder="Instagram, Facebook, LinkedIn, etc." />
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Objetivos de Patrocinio</h3>
          
          <div class="form-group">
            <label>Objetivo Principal</label>
            <select v-model="form.objetivoPrincipal" required>
              <option value="">Selecciona un objetivo</option>
              <option value="exposicion">Exposición de marca</option>
              <option value="ventas">Ventas directas</option>
              <option value="imagen">Imagen y reputación</option>
              <option value="compromiso">Compromiso social</option>
              <option value="otro">Otro</option>
            </select>
          </div>

          <div class="form-group">
            <label>Público Objetivo (Target)</label>
            <input type="text" v-model="form.publicoObjetivo" placeholder="Ej: Jóvenes de 18-35 años, atletas, familias" />
          </div>

          <div class="form-group">
            <label>Valores de Marca</label>
            <textarea v-model="form.valoresMarca" placeholder="¿Qué valores quieres que estén alineados con el deportista?" rows="2"></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Patrocinio</h3>
          
          <div class="form-group">
            <label>Presupuesto Estimado para Patrocinios</label>
            <select v-model="form.presupuesto">
              <option value="">Selecciona un rango</option>
              <option value="menos-500">Menos de $500 USD</option>
              <option value="500-1000">$500 - $1,000 USD</option>
              <option value="1000-5000">$1,000 - $5,000 USD</option>
              <option value="5000-10000">$5,000 - $10,000 USD</option>
              <option value="mas-10000">Más de $10,000 USD</option>
              <option value="sin-definir">Sin definir aún</option>
            </select>
          </div>

          <div class="form-group">
            <label>Tipo de Apoyo que Ofrece</label>
            <div class="checkbox-group">
              <label class="checkbox-label">
                <input type="checkbox" value="monetario" v-model="form.tipoApoyo" />
                <span>Monetario</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="implementos" v-model="form.tipoApoyo" />
                <span>Implementos</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="accesorios" v-model="form.tipoApoyo" />
                <span>Accesorios</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="suplementos" v-model="form.tipoApoyo" />
                <span>Suplementos</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="servicios" v-model="form.tipoApoyo" />
                <span>Servicios</span>
              </label>
              <label class="checkbox-label">
                <input type="checkbox" value="otro" v-model="form.tipoApoyo" />
                <span>Otro</span>
              </label>
            </div>
          </div>

          <div class="form-group" v-if="form.tipoApoyo.includes('monetario')">
            <label>Monto Estimado (USD)</label>
            <input type="number" v-model="form.montoMonetario" placeholder="$0.00 USD" />
          </div>

          <div class="form-group">
            <label>Requerimientos del Patrocinio</label>
            <textarea v-model="form.requerimientos" placeholder="Describe qué esperas del deportista o evento patrocinado" rows="3"></textarea>
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Datos de Contacto</h3>
          
          <div class="form-group">
            <label>Nombre del Contacto</label>
            <input type="text" v-model="form.nombreContacto" placeholder="Nombre completo" required />
          </div>

          <div class="form-group">
            <label>Teléfono de Contacto</label>
            <input type="tel" v-model="form.telefonoContacto" placeholder="+502 0000 0000" required />
          </div>

          <div class="form-group">
            <label>Correo Electrónico</label>
            <input type="email" v-model="form.emailContacto" placeholder="tu@email.com" required />
          </div>

          <div class="form-group">
            <label>Nivel de Autonomía</label>
            <select v-model="form.nivelAutonomia">
              <option value="">Selecciona</option>
              <option value="tomador-decisiones">Tomador de decisiones</option>
              <option value="influenciador">Influenciador</option>
              <option value="consultor">Consultor/Asesor</option>
            </select>
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Información de Facturación</h3>
          
          <div class="form-group">
            <label>Facturación/NIT</label>
            <input type="text" v-model="form.nit" placeholder="NIT o identificación fiscal" />
          </div>

          <div class="form-group">
            <label>Información de Facturación</label>
            <textarea v-model="form.infoFacturacion" placeholder="Dirección fiscal, razón social, etc." rows="2"></textarea>
          </div>
        </div>

        <div class="form-section">
          <div class="form-group">
            <label class="checkbox-label agreement-checkbox">
              <input type="checkbox" v-model="form.autorizacionLogos" required />
              <span>Autorizo el uso de mi marca y logos en materiales promocionales de Allevo Sports</span>
            </label>
          </div>
        </div>

        <button type="submit" class="btn-primary submit-btn">
          Enviar Solicitud
        </button>
      </form>
    </div>
  </IonModal>
</template>

<script setup lang="ts">
import { IonModal } from '@ionic/vue'
import { reactive, ref, defineExpose } from 'vue'
import { useModal } from '../../composables/useModal'

defineProps<{
  presentingElement?: HTMLElement
}>()

const { isOpen, closeModal, openModal } = useModal()

defineExpose({
  open: openModal
})

const logotipoInput = ref<HTMLInputElement | null>(null)

const handleLogotipoChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    form.logotipo = target.files[0]
  }
}

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

const handleSubmit = () => {
  console.log('Form submitted:', form)
  alert('¡Gracias por tu interés en patrocinar! Te contactaremos pronto.')
  closeModal()
}
</script>

<style scoped>
.sponsor-modal {
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
  margin-bottom: 20px;
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

.sponsor-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-section {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--color-border);
}

.form-section:last-of-type {
  border-bottom: none;
}

.section-title {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--color-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0 0 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-group label {
  font-family: var(--font-heading);
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-group input,
.form-group select,
.form-group textarea {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  padding: 12px 15px;
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.9rem;
  transition: border-color var(--transition-fast);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--color-primary);
}

.form-group textarea {
  resize: vertical;
  min-height: 60px;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  color: var(--color-text);
  font-size: 0.85rem;
  text-transform: none;
}

.checkbox-label input[type="checkbox"] {
  width: 18px;
  height: 18px;
  accent-color: var(--color-primary);
  cursor: pointer;
}

.agreement-checkbox {
  font-size: 0.85rem;
  line-height: 1.4;
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
  .checkbox-group {
    grid-template-columns: 1fr;
  }
}
</style>
