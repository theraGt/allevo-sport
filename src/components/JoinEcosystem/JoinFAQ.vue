<template>
  <section class="join-faq">
    <div class="faq-container">
      <h3 class="faq-title" v-reveal="'slide-up'">
        <span class="title-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/>
          </svg>
        </span>
        PREGUNTAS FRECUENTES
      </h3>
      
      <ion-accordion-group class="faq-accordion">
        <ion-accordion value="first">
          <ion-item slot="header">
            <ion-label>¿Cuánto tarda la aprobación?</ion-label>
          </ion-item>
          <div class="accordion-content" slot="content">
            <p>El proceso de verificación generalmente toma entre <strong>12-24 horas hábiles</strong>. Una vez aprobada tu cuenta, recibirás una notificación por correo electrónico con los siguientes pasos.</p>
          </div>
        </ion-accordion>
        
        <ion-accordion value="second">
          <ion-item slot="header">
            <ion-label>¿Cuáles son los costos de registro?</ion-label>
          </ion-item>
          <div class="accordion-content" slot="content">
            <p>El registro es completamente <strong>gratis</strong> para todos los usuarios.</p>
            <ul>
              <li><strong>Atletas:</strong> Comisión 0% por tokenización</li>
              <li><strong>Inversionistas:</strong> Comisiones aplican solo sobre rendimientos obtenidos</li>
            </ul>
          </div>
        </ion-accordion>
        
        <ion-accordion value="third">
          <ion-item slot="header">
            <ion-label>¿Qué documentos necesito?</ion-label>
          </ion-item>
          <div class="accordion-content" slot="content">
            <p><strong>Atletas:</strong> DPI válido, foto de perfil, información del deporte practicado.</p>
            <p><strong>Inversionistas:</strong> DPI o pasaporte válido, comprobante de domicilio.</p>
            <p><strong>Aliados:</strong> Licencia de operación, NIT, documentos de la empresa.</p>
          </div>
        </ion-accordion>
        
        <ion-accordion value="fourth">
          <ion-item slot="header">
            <ion-label>¿Es seguro invertir en atletas?</ion-label>
          </ion-item>
          <div class="accordion-content" slot="content">
            <p>Sí, todos los contratos están desplegados en <strong>blockchain de Polygon</strong> y son auditados. Esto garantiza transparencia total en los movimientos y rendimientos de tu inversión.</p>
          </div>
        </ion-accordion>
        
        <ion-accordion value="fifth">
          <ion-item slot="header">
            <ion-label>¿Cómo puedo contactar soporte?</ion-label>
          </ion-item>
          <div class="accordion-content" slot="content">
            <p>Puedes escribirnos a <strong>soporte@alevosport.com</strong> o directamente en WhatsApp: <strong>+502 1234 5678</strong>.</p>
            <p>Nuestro equipo está disponible de lunes a viernes de 8am a 6pm.</p>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel } from '@ionic/vue'
</script>

<style scoped>
.join-faq {
  position: relative;
  z-index: 1;
  padding: 40px 20px 80px;
}

.faq-container {
  max-width: 700px;
  margin: 0 auto;
}

.faq-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 32px;
  animation: slide-up 0.6s ease forwards;
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

.faq-accordion {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  overflow: hidden;
}

ion-accordion-group {
  --background: transparent;
}

ion-accordion {
  --background: transparent;
  --border-color: rgba(255, 255, 255, 0.06);
}

ion-item {
  --background: transparent;
  --padding-start: 20px;
  --padding-end: 20px;
  --inner-padding-end: 20px;
  --color: #fff;
  --color-hover: #CF2E2E;
  --background-hover: rgba(255, 255, 255, 0.02);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

ion-item::part(native) {
  background: transparent;
}

ion-item:hover {
  --background-hover: rgba(207, 46, 46, 0.05);
}

.accordion-content {
  --background: transparent;
  padding: 8px 20px 20px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.88rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.7;
}

.accordion-content p {
  margin: 0 0 12px;
}

.accordion-content p:last-child {
  margin-bottom: 0;
}

.accordion-content ul {
  margin: 8px 0 0;
  padding-left: 20px;
}

.accordion-content li {
  margin-bottom: 6px;
}

.accordion-content strong {
  color: #CF2E2E;
}

@media (max-width: 480px) {
  .join-faq {
    padding: 30px 16px 60px;
  }
  
  .faq-title {
    font-size: 1.2rem;
    flex-direction: column;
    gap: 8px;
  }
  
  ion-item {
    --padding-start: 16px;
    --padding-end: 16px;
    font-size: 0.88rem;
  }
  
  .accordion-content {
    padding: 8px 16px 16px;
    font-size: 0.82rem;
  }
}
</style>