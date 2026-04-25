<template>
  <ion-page>
    <AppNavbar />
    <ion-content :scroll-events="true" class="contacto-page">
      <div class="page-bg">
        <div class="bg-gradient"></div>
        <div class="bg-particles"></div>
      </div>
      
      <div class="contacto-container">
        <header class="contacto-header" v-reveal="'slide-up'">
          <span class="header-badge">
            <span class="live-dot"></span>
            CONTÁCTANOS
          </span>
          <h1>¿TIENES PREGUNTAS?</h1>
          <p>Estamos aquí para ayudarte en tu journey deportivo</p>
          <div class="accent-line"></div>
        </header>

        <div class="contacto-grid">
          <div class="contacto-info">
            <div class="info-card card-hover-effect" v-reveal="'slide-up'" :style="{ '--delay': '0.1s' }">
              <div class="card-glow"></div>
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <h3>WhatsApp</h3>
              <p>+502 1234 5678</p>
              <a href="https://wa.me/50212345678" target="_blank" class="contact-link">
                Enviar mensaje
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>

            <div class="info-card card-hover-effect" v-reveal="'slide-up'" :style="{ '--delay': '0.2s' }">
              <div class="card-glow"></div>
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <h3>Email</h3>
              <p>soporte@alevosport.com</p>
              <a href="mailto:soporte@alevosport.com" class="contact-link">
                Enviar correo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </a>
            </div>

            <div class="info-card card-hover-effect" v-reveal="'slide-up'" :style="{ '--delay': '0.3s' }">
              <div class="card-glow"></div>
              <div class="info-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <h3>Ubicación</h3>
              <p>Guatemala, Guatemala</p>
              <span class="contact-link">
                Citas presenciales
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M7 17L17 7M17 7H7M17 7V17"/>
                </svg>
              </span>
            </div>

            <div class="social-section" v-reveal="'slide-up'" :style="{ '--delay': '0.4s' }">
              <h4>Síguenos</h4>
              <div class="social-icons">
                <a href="https://instagram.com/alevosport" target="_blank" class="social-icon social-hover-effect">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://facebook.com/alevosport" target="_blank" class="social-icon social-hover-effect">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com/@alevosport" target="_blank" class="social-icon social-hover-effect">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="contacto-form-wrapper" v-reveal="'slide-up'" :style="{ '--delay': '0.5s' }">
            <form @submit.prevent="handleSubmit" class="contacto-form">
              <h3>
                <span class="title-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                </span>
                ENVÍANOS UN MENSAJE
              </h3>
              
              <div class="form-group">
                <label for="contacto-nombre">Nombre</label>
                <input 
                  id="contacto-nombre"
                  type="text" 
                  v-model="form.nombre" 
                  placeholder="Tu nombre completo" 
                  autocomplete="name"
                  required 
                />
              </div>
              
              <div class="form-group">
                <label for="contacto-email">Email</label>
                <input 
                  id="contacto-email"
                  type="email" 
                  v-model="form.email" 
                  placeholder="tu@email.com" 
                  autocomplete="email"
                  required 
                />
              </div>
              
              <div class="form-group">
                <label for="contacto-telefono">Teléfono</label>
                <input 
                  id="contacto-telefono"
                  type="tel" 
                  v-model="form.telefono" 
                  placeholder="+502 0000 0000" 
                  autocomplete="tel"
                />
              </div>
              
              <div class="form-group">
                <label for="contacto-asunto">Asunto</label>
                <select id="contacto-asunto" v-model="form.asunto" required>
                  <option value="">Selecciona un asunto</option>
                  <option value="inversion">Quiero invertir</option>
                  <option value="talento">Soy atleta</option>
                  <option value="patrocinio">Patrocinio</option>
                  <option value="soporte">Soporte técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="contacto-mensaje">Mensaje</label>
                <textarea 
                  id="contacto-mensaje"
                  v-model="form.mensaje" 
                  placeholder="¿En qué podemos ayudarte?" 
                  rows="5" 
                  required
                ></textarea>
              </div>
              
              <button type="submit" class="submit-btn">
                <span>ENVIAR MENSAJE</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
      <AppFooter />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  asunto: '',
  mensaje: ''
})

const handleSubmit = () => {
  console.log('Contacto form:', form)
  alert('¡Gracias por contactarnos! Te responderemos en breve.')
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  form.asunto = ''
  form.mensaje = ''
}
</script>

<style scoped>
.contacto-page {
  --background: transparent;
  position: relative;
}

.page-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
}

.bg-gradient {
  position: absolute;
  inset: 0;
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(207, 46, 46, 0.12), transparent),
    radial-gradient(ellipse 60% 40% at 90% 30%, rgba(207, 46, 46, 0.06), transparent),
    linear-gradient(180deg, #0b0b0b 0%, #0f0f0f 100%);
}

.bg-particles {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 15% 25%, rgba(207, 46, 46, 0.08) 0%, transparent 1%),
    radial-gradient(circle at 85% 65%, rgba(207, 46, 46, 0.06) 0%, transparent 1%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.015) 0%, transparent 1%);
  background-size: 120px 120px, 180px 180px, 200px 200px;
  animation: particle-float 25s linear infinite;
}

.contacto-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}

.contacto-header {
  text-align: center;
  margin-bottom: 60px;
  animation: slide-up 0.6s ease forwards;
}

.header-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 20px;
  background: rgba(207, 46, 46, 0.1);
  border: 1px solid rgba(207, 46, 46, 0.3);
  border-radius: 50px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  color: #CF2E2E;
  letter-spacing: 0.15em;
  margin-bottom: 20px;
}

.live-dot {
  width: 6px;
  height: 6px;
  background: #CF2E2E;
  border-radius: 50%;
  animation: subtle-pulse 2s ease-in-out infinite;
}

.contacto-header h1 {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(2.5rem, 6vw, 3.5rem);
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 16px;
}

.contacto-header p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 24px;
}

.accent-line {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, #CF2E2E, #ff6b6b);
  margin: 0 auto;
  border-radius: 2px;
}

.contacto-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
}

.contacto-info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-card {
  position: relative;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: slide-up 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
  opacity: 0;
}

.info-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 0%, rgba(207, 46, 46, 0.15), transparent 60%);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.card-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 0%, rgba(207, 46, 46, 0.12), transparent 60%);
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.info-card:hover {
  transform: translateY(-6px);
  border-color: rgba(207, 46, 46, 0.35);
  box-shadow: 0 20px 40px rgba(207, 46, 46, 0.15);
}

.info-card:hover::before,
.info-card:hover .card-glow {
  opacity: 1;
}

.info-icon {
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(207, 46, 46, 0.15), rgba(207, 46, 46, 0.05));
  border-radius: 14px;
  color: #CF2E2E;
  margin-bottom: 18px;
  transition: all 0.3s ease;
}

.info-card:hover .info-icon {
  transform: scale(1.08);
  background: linear-gradient(135deg, rgba(207, 46, 46, 0.25), rgba(207, 46, 46, 0.1));
  box-shadow: 0 8px 20px rgba(207, 46, 46, 0.25);
}

.info-card h3 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.info-card p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 14px;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.85rem;
  color: #CF2E2E;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.contact-link svg {
  transition: transform 0.3s ease;
}

.contact-link:hover {
  color: #ff6b6b;
}

.contact-link:hover svg {
  transform: translate(3px, -3px);
}

.social-section {
  padding: 24px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 16px;
  animation: slide-up 0.6s ease forwards;
  animation-delay: 0.4s;
  opacity: 0;
}

.social-section h4 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  margin: 0 0 18px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.social-icons {
  display: flex;
  gap: 14px;
}

.social-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  color: #fff;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.social-hover-effect:hover {
  background: #CF2E2E;
  border-color: #CF2E2E;
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 12px 24px rgba(207, 46, 46, 0.35);
}

.contacto-form-wrapper {
  position: relative;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px;
  overflow: hidden;
  animation: slide-up 0.6s ease forwards;
  animation-delay: 0.5s;
  opacity: 0;
  transition: all 0.4s ease;
}

.contacto-form-wrapper::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #CF2E2E 30%, #ff6b6b 70%, transparent);
}

.contacto-form-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 0%, rgba(207, 46, 46, 0.08), transparent 50%);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.contacto-form-wrapper:hover {
  border-color: rgba(207, 46, 46, 0.2);
  box-shadow: 0 0 60px rgba(207, 46, 46, 0.1);
}

.contacto-form-wrapper:hover::after {
  opacity: 1;
}

.contacto-form h3 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 28px;
}

.title-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(207, 46, 46, 0.1);
  border-radius: 10px;
  color: #CF2E2E;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 10px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 14px;
  padding: 16px 20px;
  color: #fff;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #CF2E2E;
  box-shadow: 0 0 0 4px rgba(207, 46, 46, 0.15), 0 0 20px rgba(207, 46, 46, 0.1);
  background: rgba(0, 0, 0, 0.6);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: rgba(255, 255, 255, 0.2);
}

.form-group select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='rgba(255,255,255,0.4)' viewBox='0 0 16 16'%3E%3Cpath d='M8 11L3 6h10l-5 5z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 48px;
}

.form-group select option {
  background: #1a1a1a;
  color: #fff;
}

.form-group textarea {
  resize: vertical;
  min-height: 130px;
}

.submit-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  background: linear-gradient(135deg, #CF2E2E 0%, #8b1e1e 100%);
  color: #fff;
  border: none;
  padding: 18px 32px;
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

.submit-btn:hover {
  transform: translateY(-4px) scale(1.02);
  box-shadow: 0 16px 40px rgba(207, 46, 46, 0.5);
  filter: brightness(1.1);
}

.submit-btn:active {
  transform: translateY(-2px) scale(0.99);
}

.submit-btn svg {
  transition: transform 0.3s ease;
}

.submit-btn:hover svg {
  transform: translate(4px, -4px);
}

@media (max-width: 900px) {
  .contacto-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  
  .contacto-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
}

@media (max-width: 480px) {
  .contacto-container {
    padding: 100px 16px 60px;
  }
  
  .contacto-form-wrapper {
    padding: 28px 20px;
  }
  
  .contacto-header {
    margin-bottom: 40px;
  }
  
  .info-card {
    padding: 20px;
  }
  
  .social-section {
    padding: 20px;
  }
}
</style>