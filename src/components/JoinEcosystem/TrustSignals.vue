<template>
  <section class="trust-signals">
    <div class="signals-container">
      <div class="signals-grid">
        <div class="signal-item" v-reveal="'slide-up'" :style="{ '--delay': '0.1s' }">
          <div class="signal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            </svg>
          </div>
          <h4>Datos Encriptados</h4>
          <p>Tu información está segura con encriptación de nivel bancario</p>
        </div>
        
        <div class="signal-item" v-reveal="'slide-up'" :style="{ '--delay': '0.2s' }">
          <div class="signal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12,6 12,12 16,14"/>
            </svg>
          </div>
          <h4>Aprobación en 24h</h4>
          <p>Proceso de verificación rápido y eficiente</p>
        </div>
        
        <div class="signal-item" v-reveal="'slide-up'" :style="{ '--delay': '0.3s' }">
          <div class="signal-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h4>+500 Usuarios Activos</h4>
          <p>Comunidad creciente de atletas e inversionistas</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.trust-signals {
  position: relative;
  z-index: 1;
  padding: 40px 20px;
}

.signals-container {
  max-width: 900px;
  margin: 0 auto;
}

.signals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.signal-item {
  position: relative;
  text-align: center;
  padding: 32px 20px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: slide-up 0.6s ease forwards;
  animation-delay: var(--delay, 0s);
  opacity: 0;
}

.signal-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 0%, rgba(207, 46, 46, 0.1), transparent 60%);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.signal-item:hover {
  transform: translateY(-8px);
  border-color: rgba(207, 46, 46, 0.25);
  box-shadow: 0 20px 40px rgba(207, 46, 46, 0.12);
}

.signal-item:hover::before {
  opacity: 1;
}

.signal-icon {
  width: 56px;
  height: 56px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(207, 46, 46, 0.15), rgba(207, 46, 46, 0.05));
  border-radius: 16px;
  color: #CF2E2E;
  transition: all 0.4s ease;
}

.signal-item:hover .signal-icon {
  transform: scale(1.1);
  background: linear-gradient(135deg, rgba(207, 46, 46, 0.25), rgba(207, 46, 46, 0.1));
  box-shadow: 0 8px 24px rgba(207, 46, 46, 0.25);
}

.signal-item h4 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.signal-item p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
  line-height: 1.5;
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .signals-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .signal-item {
    padding: 28px 20px;
  }
}
</style>