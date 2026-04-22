<template>
  <footer class="footer" id="contacto" v-reveal="'fade-up'">
    <div class="footer-container">
      <div class="footer-main">
        <!-- Izquierda: Logo y Newsletter -->
        <div class="footer-brand">
          <div class="logo">
            <a href="/">
              <img src="/assets/images/logo-alevo.webp" alt="Allevo Sports" />
            </a>
          </div>
          <p class="tagline">Potenciando el éxito deportivo</p>

          <div class="newsletter-wrapper">
            <form @submit.prevent="subscribeNewsletter" class="newsletter-form">
              <input type="email" v-model="email" placeholder="Tu correo electrónico" required
                class="newsletter-input" />
              <button type="submit" class="newsletter-btn">SUSCRIBIR</button>
            </form>
          </div>
        </div>

        <!-- Centro: Links -->
        <div class="footer-links">
          <h4 class="section-title">LINKS</h4>
          <ul>
            <li><a href="#">Trabaja con nosotros</a></li>
            <li><a href="#">Derechos</a></li>
            <li><a href="#">Manejo de cookies</a></li>
            <li><a href="#">Mapa del sitio</a></li>
            <li><a href="#">Legal</a></li>
          </ul>
        </div>

        <!-- Centro: Popular -->
        <div class="footer-popular">
          <h4 class="section-title">POPULAR</h4>
          <ul>
            <li><a href="#inicio">Inicio</a></li>
            <li><a href="#talentos">Talento</a></li>
            <li><a href="#eventos">Ligas</a></li>
            <li><a href="#noticias">Noticias</a></li>
            <li><a href="#alianzas">Marcas</a></li>
          </ul>
        </div>

        <!-- Derecha: Contacto -->
        <div class="footer-contact">
          <h4 class="section-title">CONTACTO</h4>
          <ul>
            <br>
            <li>
              <a href="https://wa.me/50223159708?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20de%20Allevo%20Sports"
                target="_blank" rel="noopener noreferrer" class="contact-link phone-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path
                    d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z">
                  </path>
                </svg>
                <span class="phone">+502 2315-9708</span>
              </a>
            </li>
            <br>
            <li>
              <a href="https://www.google.com/maps/search/11+calle+6-44+zona+10+edificio+Airali+oficinas+902+y+903+Guatemala"
                target="_blank" rel="noopener noreferrer" class="contact-link">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div class="contact-text">
                  <span class="company">Allevo Corp S.A.</span>
                  <span class="location">Guatemala, Centroamérica</span>
                  <span class="address">11 calle 6-44 zona 10, edificio Airali oficinas 902 y 903</span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} Allevo Sports. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const email = ref('')
const currentYear = computed(() => new Date().getFullYear())

const subscribeNewsletter = () => {
  console.log('Newsletter subscription:', email.value)
  email.value = ''
  alert('¡Gracias por suscribirte!')
}
</script>

<style scoped>
.footer {
  background-color: #0D1117;
  padding: 60px 0 20px;
  width: 100%;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr;
  gap: 50px;
  margin-bottom: 40px;
}

/* Brand Section */
.footer-brand {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.logo img {
  height: 180px;
  width: auto;
  position: relative;
  top: -70px;
}

.tagline {
  color: #ffffff;
  font-size: 0.9rem;
  opacity: 0.8;
  margin: 0 0 0px 0;
  margin-top: -100px;
}

.newsletter-wrapper {
  width: 100%;
  max-width: 320px;
}

.newsletter-form {
  display: flex;
  position: relative;
}

.newsletter-input {
  width: 100%;
  padding: 14px 16px;
  border: none;
  border-radius: 8px 0 0 8px;
  font-size: 0.85rem;
  background-color: #ffffff;
  color: #0D1117;
  outline: none;
}

.newsletter-input::placeholder {
  color: #666;
  text-align: center;
}

.newsletter-btn {
  padding: 14px 20px;
  background-color: #EE2B24;
  border: none;
  border-radius: 0 8px 8px 0;
  color: #ffffff;
  font-family: 'Oswald', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  white-space: nowrap;
}

.newsletter-btn:hover {
  background-color: #ff3b35;
  transform: scale(1.02);
}

/* Links & Popular */
.footer-links,
.footer-popular,
.footer-contact {
  display: flex;
  flex-direction: column;
}

.section-title {
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0 0 20px 0;
}

.footer-links ul,
.footer-popular ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-links a,
.footer-popular a {
  color: #ffffff;
  font-size: 0.9rem;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.footer-links a:hover,
.footer-popular a:hover {
  opacity: 1;
  color: #EE2B24;
}

/* Contact */
.footer-contact ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-contact li {
  display: flex;
  align-items: flex-start;
}

.contact-link {
  display: flex;
  gap: 12px;
  text-decoration: none;
  color: #ffffff;
  transition: opacity 0.3s ease;
}

.contact-link:hover {
  opacity: 0.8;
}

.phone-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.phone-link svg {
  flex-shrink: 0;
  margin-top: 0;
  color: #EE2B24;
}

.contact-link svg {
  flex-shrink: 0;
  margin-top: 2px;
  color: #EE2B24;
}

.contact-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.contact-text .company {
  font-weight: 600;
  font-size: 0.9rem;
}

.contact-text .location {
  font-size: 0.85rem;
  opacity: 0.8;
}

.contact-text .address {
  font-size: 0.8rem;
  opacity: 0.7;
}

.phone {
  font-size: 0.9rem;
  display: block;
  text-align: center;
}

/* Footer Bottom */
.footer-bottom {
  padding-top: 25px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.footer-bottom p {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.8rem;
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .footer-main {
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;
  }

  .footer-brand {
    grid-column: span 2;
    align-items: center;
    text-align: center;
  }

  .newsletter-wrapper {
    max-width: 100%;
  }

  .newsletter-form {
    max-width: 400px;
  }

  .logo img {
    position: relative;
    top: 0;
    height: 220px;
  }

  .tagline {
    margin-top: 0px;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer-container {
    padding: 0 20px;
  }

  .footer-main {
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    margin-bottom: 25px;
  }

  .footer-brand {
    grid-column: span 2;
    margin-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo img {
    height: 220px;
  }

  .tagline {
    font-size: 0.8rem;
    margin-bottom: 15px;
  }

  .newsletter-wrapper {
    width: 100%;
    max-width: 300px;
  }

  .newsletter-form {
    flex-direction: column;
    max-width: 100%;
  }

  .newsletter-input {
    border-radius: 8px;
    padding: 12px 14px;
    font-size: 0.8rem;
    text-align: center;
  }

  .newsletter-btn {
    border-radius: 8px;
    width: 100%;
    padding: 12px 16px;
    font-size: 0.8rem;
  }

  .section-title {
    font-size: 0.9rem;
    margin-bottom: 12px;
    text-align: center;
  }

  .footer-links,
  .footer-popular,
  .footer-contact {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-links ul,
  .footer-popular ul {
    gap: 8px;
    align-items: center;
  }

  .footer-links a,
  .footer-popular a {
    font-size: 0.8rem;
    text-align: center;
  }

  .contact-link {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 6px;
  }

  .contact-link svg {
    margin-top: 0;
  }

  .contact-text {
    align-items: center;
    text-align: center;
  }

  .contact-text .company {
    font-size: 0.85rem;
  }

  .contact-text .location,
  .contact-text .address {
    font-size: 0.75rem;
  }

  .phone {
    font-size: 0.85rem;
    display: block;
    text-align: center;
  }

  .footer-bottom p {
    font-size: 0.7rem;
    padding: 0 10px;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 30px 0 15px;
  }

  .footer-container {
    padding: 0 15px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .footer-brand {
    grid-column: span 1;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .logo img {
    height: 220px;
  }

  .tagline {
    font-size: 0.75rem;
  }

  .section-title {
    font-size: 0.85rem;
    margin-bottom: 10px;
    text-align: center;
  }

  .footer-links,
  .footer-popular,
  .footer-contact {
    padding: 0px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-links ul,
  .footer-popular ul {
    gap: 6px;
    align-items: center;
  }

  .footer-links a,
  .footer-popular a {
    font-size: 0.75rem;
    text-align: center;
  }

  .contact-link {
    gap: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .contact-text {
    align-items: center;
    text-align: center;
  }

  .contact-text .company {
    font-size: 0.8rem;
  }

  .contact-text .location,
  .contact-text .address {
    font-size: 0.7rem;
  }

  .phone {
    font-size: 0.8rem;
    display: block;
    text-align: center;
    margin-left: 100px;
  }

  .footer-bottom {
    padding-top: 15px;
  }

  .footer-bottom p {
    font-size: 0.65rem;
  }
}
</style>