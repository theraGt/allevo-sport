<template>
  <div class="form-wrapper">
    <form @submit.prevent="handleSubmit" class="register-form">
      <div class="form-header">
        <span class="role-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          INVERSIONISTA
        </span>
        <h3 class="form-title">CREAR CUENTA</h3>
        <p class="form-subtitle">Crea tu cuenta y comienza a invertir en talentos deportivos</p>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="investor-nombres">Nombres</label>
          <input 
            id="investor-nombres"
            type="text" 
            v-model="form.nombres" 
            placeholder="Tus nombres"
            autocomplete="given-name"
            required 
          />
        </div>
        
        <div class="form-group">
          <label for="investor-apellidos">Apellidos</label>
          <input 
            id="investor-apellidos"
            type="text" 
            v-model="form.apellidos" 
            placeholder="Tus apellidos"
            autocomplete="family-name"
            required 
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="investor-email">Correo Electrónico</label>
        <input 
          id="investor-email"
          type="email" 
          v-model="form.email" 
          placeholder="tu@email.com"
          autocomplete="email"
          required 
        />
      </div>
      
      <div class="form-group">
        <label for="investor-phone">Teléfono</label>
        <input 
          id="investor-phone"
          type="tel" 
          v-model="form.telefono" 
          placeholder="+502 0000 0000"
          autocomplete="tel"
        />
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="investor-pais">País</label>
          <select id="investor-pais" v-model="form.pais">
            <option value="Guatemala">Guatemala</option>
            <option value="México">México</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Honduras">Honduras</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Panamá">Panamá</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
        
        <div class="form-group">
          <label for="investor-ciudad">Ciudad</label>
          <input 
            id="investor-ciudad"
            type="text" 
            v-model="form.ciudad" 
            placeholder="Tu ciudad"
            autocomplete="address-level2"
          />
        </div>
      </div>
      
      <div class="form-row">
        <div class="form-group">
          <label for="investor-fecha">Fecha de Nacimiento</label>
          <input 
            id="investor-fecha"
            type="date" 
            v-model="form.fechaNacimiento"
          />
        </div>
        
        <div class="form-group">
          <label for="investor-genero">Género</label>
          <select id="investor-genero" v-model="form.genero">
            <option value="">Seleccionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Otro">Otro</option>
          </select>
        </div>
      </div>
      
      <div class="form-group">
        <label for="investor-password">Contraseña</label>
        <div class="password-input">
          <input 
            id="investor-password"
            :type="showPassword ? 'text' : 'password'" 
            v-model="form.password" 
            placeholder="Crea una contraseña"
            autocomplete="new-password"
            required 
          />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            <svg v-if="!showPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </button>
        </div>

        <div v-if="form.password" class="password-requirements">
          <p class="requirements-title">La contraseña debe incluir:</p>
          <ul class="requirements-list">
            <li :class="{ met: hasMinLength }">
              <svg v-if="hasMinLength" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#44ff44" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
              Al menos 8 caracteres
            </li>
            <li :class="{ met: hasUppercase }">
              <svg v-if="hasUppercase" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#44ff44" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
              Una letra mayúscula
            </li>
            <li :class="{ met: hasLowercase }">
              <svg v-if="hasLowercase" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#44ff44" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
              Una letra minúscula
            </li>
            <li :class="{ met: hasNumber }">
              <svg v-if="hasNumber" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#44ff44" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
              <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>
              Un número
            </li>
          </ul>
        </div>

        <div v-if="form.password" class="password-strength-meter">
          <div class="strength-bar">
            <div class="strength-fill" :class="passwordStrength"></div>
          </div>
          <span class="strength-label" :class="passwordStrength">
            <template v-if="passwordStrength === 'debil'">Contraseña débil</template>
            <template v-else-if="passwordStrength === 'media'">Contraseña media</template>
            <template v-else-if="passwordStrength === 'fuerte'">Contraseña fuerte</template>
            <template v-else>Contraseña muy fuerte</template>
          </span>
        </div>
      </div>
      
      <div class="form-group">
        <label for="investor-confirm-password">Confirmar Contraseña</label>
        <div class="password-input">
          <input 
            id="investor-confirm-password"
            :type="showConfirmPassword ? 'text' : 'password'" 
            v-model="form.confirmPassword" 
            placeholder="Repite tu contraseña"
            autocomplete="new-password"
            required 
          />
          <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
            <svg v-if="!showConfirmPassword" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
            </svg>
            <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>
            </svg>
          </button>
        </div>
        <span v-if="form.confirmPassword && form.password !== form.confirmPassword" class="field-error">
          Las contraseñas no coinciden
        </span>
      </div>
      
      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.aceptoTerminos" required />
          <span class="checkmark"></span>
          <span class="checkbox-text">Acepto los <a href="/terminos" target="_blank">Términos y Condiciones</a> y <a href="/privacidad" target="_blank">Política de Privacidad</a></span>
        </label>
      </div>
      
      <button type="submit" class="btn-primary" :disabled="isLoading || !isFormValid">
        <span v-if="!isLoading">CREAR CUENTA</span>
        <span v-else class="loader"></span>
      </button>
      
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </form>
    
    <Transition name="fade">
      <RegistrationSuccess 
        v-if="registrationSuccess" 
        role="inversionista"
        :email="form.email"
        @close="handleSuccessClose"
      />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import RegistrationSuccess from './RegistrationSuccess.vue'
import { useRegistroModal } from '../../composables/useRegistroModal'

const showPassword = ref(false)
const showConfirmPassword = ref(false)
const registrationSuccess = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const { closeRegistroModal } = useRegistroModal()

const API_BASE_URL = 'http://localhost:3005/api'

const form = reactive({
  nombres: '',
  apellidos: '',
  email: '',
  telefono: '',
  pais: 'Guatemala',
  ciudad: '',
  fechaNacimiento: '',
  genero: '',
  password: '',
  confirmPassword: '',
  aceptoTerminos: false
})

const handleSuccessClose = () => {
  registrationSuccess.value = false
  closeRegistroModal()
  // Reset form
  form.nombres = ''
  form.apellidos = ''
  form.email = ''
  form.telefono = ''
  form.ciudad = ''
  form.fechaNacimiento = ''
  form.genero = ''
  form.password = ''
  form.confirmPassword = ''
  form.aceptoTerminos = false
}

const hasMinLength = computed(() => form.password.length >= 8)
const hasUppercase = computed(() => /[A-Z]/.test(form.password))
const hasLowercase = computed(() => /[a-z]/.test(form.password))
const hasNumber = computed(() => /\d/.test(form.password))

const isPasswordValid = computed(() => {
  return hasMinLength.value && hasUppercase.value && hasLowercase.value && hasNumber.value
})

const passwordStrength = computed(() => {
  let strength = 0
  if (hasMinLength.value) strength++
  if (hasUppercase.value) strength++
  if (hasLowercase.value) strength++
  if (hasNumber.value) strength++
  
  if (strength <= 1) return 'debil'
  if (strength <= 2) return 'media'
  if (strength <= 3) return 'fuerte'
  return 'muy_fuerte'
})

const isFormValid = computed(() => {
  return (
    form.nombres.trim() !== '' &&
    form.apellidos.trim() !== '' &&
    form.email.trim() !== '' &&
    form.password.trim() !== '' &&
    form.confirmPassword.trim() !== '' &&
    isPasswordValid.value &&
    form.password === form.confirmPassword &&
    form.aceptoTerminos
  )
})

const handleSubmit = async () => {
  if (!isFormValid.value) {
    errorMessage.value = 'Por favor completa todos los campos requeridos y asegúrate de que las contraseñas coincidan'
    return
  }

  if (!form.aceptoTerminos) {
    errorMessage.value = 'Debes aceptar los términos y condiciones'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    const payload = {
      nombres: form.nombres,
      apellidos: form.apellidos,
      email: form.email,
      password: form.password,
      telefono: form.telefono || null,
      pais: form.pais || 'Guatemala',
      ciudad: form.ciudad || null,
      fecha_nacimiento: form.fechaNacimiento || null,
      genero: form.genero || null,
      tipo_usuario: 'inversionista'
    }

    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar usuario')
    }

    console.log('Usuario registrado exitosamente:', data)
    registrationSuccess.value = true
    
  } catch (err: any) {
    console.error('Error al registrar:', err)
    errorMessage.value = err.message || 'Error al crear la cuenta. Intenta de nuevo.'
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.form-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 36px;
  overflow: hidden;
  transition: all 0.4s ease;
}

.form-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #CF2E2E 30%, #ff6b6b 70%, transparent);
}

.form-wrapper:hover {
  border-color: rgba(207, 46, 46, 0.2);
  box-shadow: 0 0 60px rgba(207, 46, 46, 0.08);
}

.form-header {
  text-align: center;
  margin-bottom: 28px;
  position: relative;
}

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(207, 46, 46, 0.1);
  border: 1px solid rgba(207, 46, 46, 0.25);
  border-radius: 50px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.65rem;
  font-weight: 600;
  color: #CF2E2E;
  letter-spacing: 0.12em;
  margin-bottom: 16px;
}

.back-toggle-btn {
  position: absolute;
  left: 0;
  top: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.3s ease;
}

.back-toggle-btn:hover {
  background: rgba(207, 46, 46, 0.1);
  border-color: rgba(207, 46, 46, 0.3);
  color: #CF2E2E;
}

.form-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 8px;
}

.form-subtitle {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.social-login {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 15px 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-btn.google {
  background: #fff;
  color: #333;
}

.social-btn.google:hover {
  background: #f5f5f5;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15);
}

.social-btn.apple {
  background: #000;
  color: #fff;
}

.social-btn.apple:hover {
  background: #1a1a1a;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.divider {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.divider span {
  padding: 0 16px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.email-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  border: none;
  color: #CF2E2E;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  padding: 12px;
  transition: all 0.3s ease;
}

.email-toggle-btn:hover {
  color: #ff6b6b;
}

.email-toggle-btn svg {
  transition: transform 0.3s ease;
}

.email-toggle-btn:hover svg {
  transform: translateX(4px);
}

.register-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

@media (max-width: 480px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group input[type="password"],
.form-group input[type="date"],
.form-group select {
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 15px 18px;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  width: 100%;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(255,255,255,0.4)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}

.form-group select option {
  background: #151515;
  color: #fff;
}

.form-group select:focus {
  outline: none;
  border-color: #CF2E2E;
  box-shadow: 0 0 0 4px rgba(207, 46, 46, 0.15), 0 0 20px rgba(207, 46, 46, 0.08);
}

.form-group input:focus {
  outline: none;
  border-color: #CF2E2E;
  box-shadow: 0 0 0 4px rgba(207, 46, 46, 0.15), 0 0 20px rgba(207, 46, 46, 0.08);
  background: rgba(0, 0, 0, 0.6);
}

.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.password-input {
  position: relative;
}

.password-input input {
  width: 100%;
  padding-right: 50px;
}

.toggle-password {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
}

.toggle-password:hover {
  color: #CF2E2E;
}

.checkbox-group {
  margin: 6px 0;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

.checkbox-label input[type="checkbox"] {
  display: none;
}

.checkmark {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  position: relative;
  transition: all 0.3s ease;
  margin-top: 2px;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark {
  background: #CF2E2E;
  border-color: #CF2E2E;
}

.checkbox-label input[type="checkbox"]:checked + .checkmark::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-text a {
  color: #CF2E2E;
  text-decoration: none;
}

.checkbox-text a:hover {
  text-decoration: underline;
}

.field-error {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.78rem;
  color: #ff6b6b;
  margin-top: 4px;
}

.password-requirements {
  padding: 14px 16px;
  margin-top: 10px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}

.requirements-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.requirements-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.requirements-list li {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.78rem;
  color: rgba(255, 255, 255, 0.4);
  transition: color 0.25s ease;
}

.requirements-list li svg {
  flex-shrink: 0;
}

.requirements-list li.met {
  color: #44ff44;
}

.password-strength-meter {
  margin-top: 12px;
}

.strength-bar {
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.strength-fill {
  height: 100%;
  transition: all 0.3s ease;
}

.strength-fill.debil { width: 25%; background: #ff4444; }
.strength-fill.media { width: 50%; background: #ffaa44; }
.strength-fill.fuerte { width: 75%; background: #44ff44; }
.strength-fill.muy_fuerte { width: 100%; background: #00e090; }

.strength-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  display: block;
  margin-top: 6px;
}

.strength-label.debil { color: #ff4444; }
.strength-label.media { color: #ffaa44; }
.strength-label.fuerte { color: #44ff44; }
.strength-label.muy_fuerte { color: #00e090; }

.error-message {
  text-align: center;
  padding: 12px 16px;
  background: rgba(255, 68, 68, 0.1);
  border: 1px solid rgba(255, 68, 68, 0.3);
  border-radius: 12px;
  color: #ff6b6b;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
}

.loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .form-wrapper {
    padding: 24px 20px;
  }
  
  .form-title {
    font-size: 1.3rem;
  }
  
  .social-btn {
    padding: 14px 20px;
  }
}
</style>