<template>
  <section class="trust-signals">
    <div class="signals-container">
      <div class="signals-grid">
        <div class="signal-item" v-reveal="'fade-up'" :style="{ '--delay': '0.1s' }">
          <div class="signal-icon">
            <ion-icon :icon="shieldCheckmarkOutline"></ion-icon>
          </div>
          <h4>DATOS ENCRIPTADOS</h4>
          <p>Tu información está segura con encriptación de nivel bancario</p>
        </div>

        <div class="signal-item" v-reveal="'fade-up'" :style="{ '--delay': '0.2s' }">
          <div class="signal-icon">
            <ion-icon :icon="timeOutline"></ion-icon>
          </div>
          <h4>APROBACIÓN EN 24H</h4>
          <p>Proceso de verificación rápido y eficiente</p>
        </div>

        <div class="signal-item" v-reveal="'fade-up'" :style="{ '--delay': '0.3s' }">
          <div class="signal-icon">
            <ion-icon :icon="peopleOutline"></ion-icon>
          </div>
          <h4>+500 USUARIOS ACTIVOS</h4>
          <p>Comunidad creciente de atletas e inversionistas</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { shieldCheckmarkOutline, timeOutline, peopleOutline } from 'ionicons/icons'
</script>

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
  padding: 32px 24px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform, box-shadow;
}

.signal-item::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.12), transparent 60%);
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.signal-item:hover {
  transform: translateY(-8px);
  border-color: rgba(239, 68, 68, 0.35);
  box-shadow: 0 20px 50px rgba(239, 68, 68, 0.12), 0 0 0 1px rgba(239, 68, 68, 0.15);
}

.signal-item:hover::before {
  opacity: 1;
}

.signal-item h4,
.signal-item p,
.signal-icon {
  position: relative;
  z-index: 1;
}

.signal-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  color: #EF4444;
  font-size: 24px;
  transition: all 0.4s ease;
}

.signal-item:hover .signal-icon {
  transform: scale(1.1);
  background: rgba(239, 68, 68, 0.2);
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.25);
}

.signal-item h4 {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.signal-item p {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: #9CA3AF;
  margin: 0;
  line-height: 1.5;
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
