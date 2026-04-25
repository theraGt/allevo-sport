<template>
  <ion-page>
    <AppNavbar />
    <ion-content :scroll-events="true" class="privacidad-page" id="main-content">
      <div class="privacidad-container">
        <header class="privacidad-header">
          <h1>POLÍTICA DE PRIVACIDAD</h1>
          <p>Última actualización: Abril 2026</p>
        </header>

        <div class="privacidad-content">
          <section class="privacidad-section">
            <h2>1. RECOPILACIÓN DE INFORMACIÓN</h2>
            <p>Recopilamos información que nos proporcionas directamente:</p>
            <ul>
              <li>Información de registro (nombre, email, teléfono)</li>
              <li>Documentos de identificación (DPI, NIT)</li>
              <li>Información deportiva (disciplina, logros, estadísticas)</li>
              <li>Datos de navegación y cookies</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>2. USO DE TU INFORMACIÓN</h2>
            <p>Utilizamos tu información para:</p>
            <ul>
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Verificar tu identidad</li>
              <li>Procesar transacciones de inversión</li>
              <li>Comunicarte actualizaciones y ofertas</li>
              <li>Cumplir con obligaciones legales</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>3. PROTECCIÓN DE DATOS</h2>
            <p>Implementamos medidas de seguridad:</p>
            <ul>
              <li>Encriptación SSL/TLS de datos en tránsito</li>
              <li>Almacenamiento encriptado de datos sensibles</li>
              <li>Contratos inteligentes auditados en blockchain</li>
              <li>Acceso restringido a información personal</li>
              <li>Copias de seguridad periódicas</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>4. BLOCKCHAIN Y TRANSPARENCIA</h2>
            <p>Nuestra plataforma utiliza tecnología blockchain:</p>
            <ul>
              <li>Las transacciones de inversión son públicas y verificables</li>
              <li>Los contratos inteligentes son auditados y transparentes</li>
              <li>Tu dirección wallet y transacciones son pseudónimas</li>
              <li>No almacenamos claves privadas</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>5. COMPARTIR INFORMACIÓN</h2>
            <p>No vendemos tu información personal. Compartimos datos solo con:</p>
            <ul>
              <li>Proveedores de servicios necesarios para operar la plataforma</li>
              <li>Autoridades legales cuando sea requerido</li>
              <li>Atletas e inversionistas (solo información pública del perfil)</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>6. TUS DERECHOS</h2>
            <p>Tienes derecho a:</p>
            <ul>
              <li>Acceder a tu información personal</li>
              <li>Corregir datos inaccurateos</li>
              <li>Solicitar eliminación de tu cuenta</li>
              <li>Exportar tus datos</li>
              <li>Opt-out de comunicaciones de marketing</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>7. RETENCIÓN DE DATOS</h2>
            <p>Conservamos tu información:</p>
            <ul>
              <li>Mientras tu cuenta esté activa</li>
              <li>Según sea necesario para cumplir obligaciones legales</li>
              <li>Datos de transacciones durante 5 años mínimo</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>8. COOKIES Y TECNOLOGÍAS</h2>
            <p>Utilizamos cookies y tecnologías similares para:</p>
            <ul>
              <li>Mantener tu sesión iniciada</li>
              <li>Recordar tus preferencias</li>
              <li>Analizar tráfico y mejorar servicios</li>
              <li>Personalizar contenido y publicidad</li>
            </ul>
          </section>

          <section class="privacidad-section">
            <h2>9. MENORES DE EDAD</h2>
            <p>Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos intencionalmente información de menores.</p>
          </section>

          <section class="privacidad-section">
            <h2>10. CAMBIOS A ESTA POLÍTICA</h2>
            <p>Podemos actualizar esta política periódicamente. Notificaremos cambios significativos mediante email o notificación en la plataforma.</p>
          </section>

          <section class="privacidad-section">
            <h2>11. CONTACTO</h2>
            <p>Para ejercer tus derechos o preguntas sobre esta política:</p>
            <p><strong>Email:</strong> privacidad@alevosport.com</p>
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
.privacidad-page {
  --background: #0b0b0b;
}

.privacidad-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 120px 20px 80px;
}

.privacidad-header {
  text-align: center;
  margin-bottom: 60px;
}

.privacidad-header h1 {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 12px;
}

.privacidad-header p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0;
}

.privacidad-content {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 40px;
}

.privacidad-section {
  margin-bottom: 32px;
}

.privacidad-section:last-child {
  margin-bottom: 0;
}

.privacidad-section h2 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #CF2E2E;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 16px;
}

.privacidad-section p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.7;
  margin: 0 0 12px;
}

.privacidad-section ul {
  margin: 0;
  padding-left: 20px;
}

.privacidad-section li {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 8px;
}

@media (max-width: 480px) {
  .privacidad-container {
    padding: 100px 16px 60px;
  }
  
  .privacidad-content {
    padding: 24px 20px;
  }
}
</style>