<template>
  <ion-page>
    <AppNavbar />
    <ion-content :scroll-events="true" class="terminos-page">
      <div class="terminos-container">
        <header class="terminos-header">
          <h1>TÉRMINOS Y CONDICIONES</h1>
          <p>Última actualización: Abril 2026</p>
        </header>

        <div class="terminos-content">
          <section class="terminos-section">
            <h2>1. ACEPTACIÓN DE TÉRMINOS</h2>
            <p>Al acceder y utilizar Allevo Sports, aceptas vincularte por estos términos y condiciones. Si no estás de acuerdo con alguna parte, no debes usar nuestros servicios.</p>
          </section>

          <section class="terminos-section">
            <h2>2. DESCRIPCIÓN DEL SERVICIO</h2>
            <p>Allevo Sports es una plataforma de tokenización de activos deportivos que permite:</p>
            <ul>
              <li>A los atletas monetizar su carrera deportiva mediante tokens digitales</li>
              <li>A los inversionistas obtener rendimientos mensuales proyectados del 1-3%</li>
              <li>A aliados (empresas, gimnasios) participar en el ecosistema deportivo</li>
            </ul>
          </section>

          <section class="terminos-section">
            <h2>3. REGISTRO Y CUENTAS</h2>
            <p>Para utilizar nuestra plataforma, debes:</p>
            <ul>
              <li>Proporcionar información veraz y completa</li>
              <li>Mantener la confidencialidad de tu cuenta</li>
              <li>Ser mayor de 18 años o tener autorización legal</li>
              <li>Aceptar la verificación de identidad requerida</li>
            </ul>
          </section>

          <section class="terminos-section">
            <h2>4. INVERSIONES Y RENDIMIENTOS</h2>
            <p><strong>Información importante:</strong> Los rendimientos proyectados (1-3% mensual) son estimaciones basadas en el rendimiento histórico de atletas tokenizados. No garantizamos resultados específicos. Las inversiones en talentos deportivos conllevan riesgos inherentes.</p>
          </section>

          <section class="terminos-section">
            <h2>5. TOKENIZACIÓN DE ATLETAS</h2>
            <p>Los atletas que tokenizan su carrera aceptan:</p>
            <ul>
              <li>Proporcionar información veraz sobre su trayectoria</li>
              <li>Mantener su participación activa en competencias</li>
              <li>Compartir actualizaciones regulares con inversores</li>
              <li>Cumplir con los términos del contrato de tokenización</li>
            </ul>
          </section>

          <section class="terminos-section">
            <h2>6. COMISIONES Y PAGOS</h2>
            <ul>
              <li><strong>Registro:</strong> Gratis para todos los usuarios</li>
              <li><strong>Atletas:</strong> Comisión 0% por tokenización</li>
              <li><strong>Inversionistas:</strong> Comisiones aplicables solo sobre rendimientos obtenidos</li>
            </ul>
          </section>

          <section class="terminos-section">
            <h2>7. SEGURIDAD Y PRIVACIDAD</h2>
            <p>Protegemos tus datos mediante:</p>
            <ul>
              <li>Encriptación de nivel bancario</li>
              <li>Contratos inteligentes auditados en Polygon</li>
              <li>Almacenamiento seguro de datos personales</li>
            </ul>
            <p>Para más información, consulta nuestra <a href="/privacidad">Política de Privacidad</a>.</p>
          </section>

          <section class="terminos-section">
            <h2>8. LIMITACIÓN DE RESPONSABILIDAD</h2>
            <p>Allevo Sports no se hace responsable de:</p>
            <ul>
              <li>Pérdidas financieras por inversiones</li>
              <li>Resultados deportivos de atletas</li>
              <li>Interrupciones del servicio por causas externas</li>
            </ul>
          </section>

          <section class="terminos-section">
            <h2>9. MODIFICACIONES</h2>
            <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor al publicarlos en esta página.</p>
          </section>

          <section class="terminos-section">
            <h2>10. CONTACTO</h2>
            <p>Para preguntas sobre estos términos, contáctanos en:</p>
            <p><strong>Email:</strong> legal@alevosport.com</p>
            <p><strong>WhatsApp:</strong> +502 1234 5678</p>
          </section>
        </div>
      </div>
      <AppFooter />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
</script>

<style scoped>
.terminos-page {
  --background: #0b0b0b;
}

.terminos-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}

.terminos-header {
  text-align: center;
  margin-bottom: 60px;
}

.terminos-header h1 {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 12px;
}

.terminos-header p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.terminos-content {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 40px;
}

.terminos-section {
  margin-bottom: 32px;
}

.terminos-section:last-child {
  margin-bottom: 0;
}

.terminos-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #CF2E2E;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 16px;
}

.terminos-section p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin: 0 0 12px;
}

.terminos-section ul {
  margin: 0;
  padding-left: 20px;
}

.terminos-section li {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 8px;
}

.terminos-section a {
  color: #CF2E2E;
  text-decoration: none;
}

.terminos-section a:hover {
  text-decoration: underline;
}

.terminos-section strong {
  color: #fff;
}

@media (max-width: 480px) {
  .terminos-container {
    padding: 100px 16px 60px;
  }
  
  .terminos-content {
    padding: 24px 20px;
  }
}
</style>