<template>
  <div class="form-wrapper">
    <div class="social-login" v-if="!showForm">
      <div class="form-header">
        <span class="role-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          ALIADO
        </span>
        <h3 class="form-title">ÚNETE COMO ALIADO</h3>
        <p class="form-subtitle">Empresas, gimnasio
        y marcas que apoyan el talento deportivo</p>
        
        <button class="social-btn google" @click="loginWithGoogle">
          <svg width="20" height="20" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continuar con Google
        </button>
        
        <button class="social-btn apple" @click="loginWithApple">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
          Continuar con Apple
        </button>
        
        <div class="divider"><span>o continúa con email</span></div>
        <button class="email-toggle-btn" @click="showForm = true">
          <span>Registrarse con correo electrónico</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
    
    <form v-else @submit.prevent="handleSubmit" class="register-form">
      <div class="form-header">
        <button type="button" class="back-toggle-btn" @click="showForm = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        </button>
        <span class="role-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          ALIADO
        </span>
        <h3 class="form-title">CREAR CUENTA</h3>
        <p class="form-subtitle">Registra tu empresa o marca</p>
      </div>
      
      <div class="form-group">
        <label>Nombre de la Empresa</label>
        <input type="text" v-model="form.nombreEmpresa" placeholder="Nombre de tu empresa o marca" required />
      </div>
      
      <div class="form-group">
        <label>Tipo de Empresa</label>
        <select v-model="form.tipoEmpresa" required>
          <option value="">Selecciona el tipo</option>
          <option value="gimnasio">Gimnasio / Academia</option>
          <option value="marca">Marca Comercial</option>
          <option value="patrocinador">Patrocinador</option>
          <option value="proveedor">Proveedor de Servicios</option>
          <option value="otro">Otro</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Industria / Sector</label>
        <input type="text" v-model="form.industria" placeholder="Ej: Alimentos, Tecnología, Deportes" required />
      </div>
      
      <div class="form-group">
        <label>Correo Electrónico</label>
        <input type="email" v-model="form.email" placeholder="tu@email.com" autocomplete="email" required />
      </div>
      
      <div class="form-group">
        <label>Teléfono</label>
        <input type="tel" v-model="form.telefono" placeholder="+502 0000 0000" autocomplete="tel" required />
      </div>
      
      <div class="form-group">
        <label>Sitio Web</label>
        <input type="url" v-model="form.sitioWeb" placeholder="https://tuempresa.com" />
      </div>
      
      <div class="form-group checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" v-model="form.aceptoTerminos" required />
          <span class="checkmark"></span>
          <span class="checkbox-text">Acepto los <a href="/terminos">Términos</a> y <a href="/privacidad">Política de Privacidad</a></span>
        </label>
      </div>
      
      <button type="submit" class="submit-btn">
        <span>CREAR CUENTA</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
      </button>
    </form>
    
    <Transition name="fade">
      <RegistrationSuccess v-if="registrationSuccess" role="aliado" @close="registrationSuccess = false" />
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import RegistrationSuccess from './RegistrationSuccess.vue'

const showForm = ref(false)
const registrationSuccess = ref(false)

const form = reactive({
  nombreEmpresa: '',
  tipoEmpresa: '',
  industria: '',
  email: '',
  telefono: '',
  sitioWeb: '',
  aceptoTerminos: false
})

const loginWithGoogle = () => { registrationSuccess.value = true }
const loginWithApple = () => { registrationSuccess.value = true }
const handleSubmit = () => { registrationSuccess.value = true }
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

.social-btn.google { background: #fff; color: #333; }
.social-btn.google:hover { background: #f5f5f5; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(255, 255, 255, 0.15); }
.social-btn.apple { background: #000; color: #fff; }
.social-btn.apple:hover { background: #1a1a1a; transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3); }

.divider { display: flex; align-items: center; margin: 8px 0; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: rgba(255, 255, 255, 0.1); }
.divider span { padding: 0 16px; font-family: 'Space Grotesk', sans-serif; font-size: 0.7rem; color: rgba(255, 255, 255, 0.4); text-transform: uppercase; letter-spacing: 0.1em; }

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

.email-toggle-btn:hover { color: #ff6b6b; }
.email-toggle-btn svg { transition: transform 0.3s ease; }
.email-toggle-btn:hover svg { transform: translateX(4px); }

.register-form { display: flex; flex-direction: column; gap: 18px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group label { font-family: 'Space Grotesk', sans-serif; font-size: 0.72rem; font-weight: 600; color: rgba(255, 255, 255, 0.6); text-transform: uppercase; letter-spacing: 0.1em; }
.form-group input, .form-group select { background: rgba(0, 0, 0, 0.5); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 15px 18px; color: #fff; font-family: 'Space Grotesk', sans-serif; font-size: 0.95rem; transition: all 0.3s ease; }
.form-group input:focus, .form-group select:focus { outline: none; border-color: #CF2E2E; box-shadow: 0 0 0 4px rgba(207, 46, 46, 0.15), 0 0 20px rgba(207, 46, 46, 0.08); background: rgba(0, 0, 0, 0.6); }
.form-group input::placeholder { color: rgba(255, 255, 255, 0.2); }
.form-group select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; padding-right: 48px; }
.form-group select option { background: #1a1a1a; }

.checkbox-group { margin: 6px 0; }
.checkbox-label { display: flex; align-items: flex-start; gap: 12px; cursor: pointer; font-family: 'Space Grotesk', sans-serif; font-size: 0.78rem; color: rgba(255, 255, 255, 0.6); line-height: 1.5; }
.checkbox-label input[type="checkbox"] { display: none; }
.checkmark { width: 20px; height: 20px; flex-shrink: 0; border: 2px solid rgba(255, 255, 255, 0.3); border-radius: 6px; position: relative; transition: all 0.3s ease; margin-top: 2px; }
.checkbox-label input[type="checkbox"]:checked + .checkmark { background: #CF2E2E; border-color: #CF2E2E; }
.checkbox-label input[type="checkbox"]:checked + .checkmark::after { content: ''; position: absolute; left: 6px; top: 2px; width: 5px; height: 10px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg); }
.checkbox-text a { color: #CF2E2E; text-decoration: none; }
.checkbox-text a:hover { text-decoration: underline; }

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: linear-gradient(135deg, #CF2E2E 0%, #8b1e1e 100%);
  color: #fff;
  border: none;
  padding: 16px 32px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  border-radius: 14px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 30px rgba(207, 46, 46, 0.35);
  clip-path: polygon(16px 0%, 100% 0%, calc(100% - 16px) 100%, 0% 100%);
  margin-top: 8px;
}

.submit-btn:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(207, 46, 46, 0.5); filter: brightness(1.1); }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 480px) {
  .form-wrapper { padding: 24px 20px; }
}
</style>