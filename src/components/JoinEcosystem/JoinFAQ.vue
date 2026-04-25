<template>
  <section class="join-faq">
    <div class="faq-container">
      <h3 class="faq-title" v-reveal="'fade-up'">
        <span class="title-icon">?</span>
        PREGUNTAS FRECUENTES
      </h3>

      <ion-accordion-group class="faq-accordion" v-reveal="'fade-up'">
        <ion-accordion v-for="faq in faqs" :key="faq.id" :value="faq.id">
          <ion-item slot="header" class="faq-header">
            <ion-label>{{ faq.question }}</ion-label>
            <ion-icon :icon="chevronDownOutline" slot="end" class="chevron-icon"></ion-icon>
          </ion-item>
          <div class="faq-content" slot="content">
            <p v-html="faq.answer"></p>
          </div>
        </ion-accordion>
      </ion-accordion-group>
    </div>
  </section>
</template>

<script setup lang="ts">
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonIcon } from '@ionic/vue'
import { chevronDownOutline } from 'ionicons/icons'

const faqs = [
  {
    id: '1',
    question: '¿Cuánto tarda la aprobación?',
    answer: 'El proceso de verificación toma máximo <strong style="color:#EF4444">24 horas hábiles</strong> una vez enviada toda la documentación requerida.'
  },
  {
    id: '2',
    question: '¿Cuáles son los costos de registro?',
    answer: 'El registro es completamente <strong style="color:#EF4444">gratis</strong> para todos los usuarios.<br><br><strong style="color:#EF4444">Atletas:</strong> Comisión 0% por tokenización<br><strong style="color:#EF4444">Inversionistas:</strong> Comisiones aplican solo sobre rendimientos obtenidos'
  },
  {
    id: '3',
    question: '¿Qué documentos necesito?',
    answer: '<strong style="color:#EF4444">Atletas:</strong> DPI válido, foto de perfil, información del deporte practicado.<br><br><strong style="color:#EF4444">Inversionistas:</strong> DPI o pasaporte válido, comprobante de domicilio.<br><br><strong style="color:#EF4444">Aliados:</strong> Licencia de operación, NIT, documentos de la empresa.'
  },
  {
    id: '4',
    question: '¿Es seguro invertir en atletas?',
    answer: 'Sí, todos los contratos están desplegados en <strong style="color:#EF4444">blockchain de Polygon</strong> y son auditados. Esto garantiza transparencia total en los movimientos y rendimientos de tu inversión.'
  },
  {
    id: '5',
    question: '¿Cómo puedo contactar soporte?',
    answer: 'Puedes escribirnos a <strong style="color:#EF4444">soporte@alevosport.com</strong> o directamente en WhatsApp: <strong style="color:#EF4444">+502 1234 5678</strong>.<br><br>Nuestro equipo está disponible de lunes a viernes de 8am a 6pm.'
  }
]
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
  font-family: 'Oswald', sans-serif;
  font-size: 1.4rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 32px;
}

.title-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  color: #EF4444;
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.faq-accordion {
  background: transparent;
}

ion-accordion {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  margin-bottom: 8px;
  --background: transparent;
  --border-color: transparent;
}

ion-accordion.accordion-expanded {
  border: 1px solid rgba(239, 68, 68, 0.3);
}

ion-item {
  --background: transparent;
  --padding-start: 20px;
  --padding-end: 20px;
  --inner-padding-end: 20px;
  --color: #fff;
  --border-color: transparent;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
}

ion-item::part(native) {
  background: transparent;
}

.chevron-icon {
  color: #9CA3AF;
  transition: transform 0.3s ease;
}

ion-accordion.accordion-expanded .chevron-icon {
  transform: rotate(180deg);
}

.faq-content {
  padding: 0 20px 20px;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #E5E7EB;
  line-height: 1.7;
}

.faq-content p {
  margin: 0;
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

  .faq-content {
    padding: 0 16px 16px;
    font-size: 0.82rem;
  }
}
</style>
