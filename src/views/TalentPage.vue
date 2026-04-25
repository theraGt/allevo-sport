<template>
  <ion-page>
    <AppNavbar />

    <ion-content :scroll-events="true" id="main-content">
      <section class="talentos-page">
        <div class="poster-layout">
          <h2 class="background-text">TALENTS</h2>
          
          <header class="section-header">
            <span class="subtitle">Nuestros Atletas</span>
            <h2 class="title-overlay">
              <span class="title">DETRÁS DE</span>
              <span class="title-red">NUESTRO ÉXITO</span>
            </h2>
            <div class="accent-line"></div>
          </header>

          <div class="filter-container">
            <button 
              v-for="filter in filters" 
              :key="filter"
              :class="['btn-primary', 'filter-btn', { active: activeFilter === filter }]" 
              @click="setFilter(filter)"
            >
              {{ filter }}
            </button>
          </div>

          <div class="talentos-grid">
            <div 
              v-for="(talento, index) in filteredTalentos" 
              :key="'card-' + index" 
              class="talento-card"
            >
              <div class="card-img">
                <img :src="talento.imagen" :alt="talento.nombre" />
                <div class="card-overlay"></div>
                <div class="card-name">{{ talento.nombre }}</div>
              </div>
              <div class="card-info">
                <h3>{{ talento.nombre }}</h3>
                <span class="disciplina">{{ talento.disciplina }}</span>
                <a :href="'/talento/' + talento.slug" class="btn-primary">VER MÁS</a>
                <div class="social-links" v-if="talento.instagram || talento.tiktok">
                  <a 
                    v-if="talento.instagram" 
                    :href="talento.instagram" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="social-icon instagram"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    v-if="talento.tiktok" 
                    :href="talento.tiktok" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    class="social-icon tiktok"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div class="cta-banner">
            <div class="banner-content">
              <div class="banner-text">
                <span class="text-white">QUIERO DESARROLLAR</span>
                <span class="text-black">MI TALENTO</span>
                <p>Explora nuestras oportunidades, conecta con mentores y compañeros; comienza hoy mismo tu camino hacia la excelencia.</p>
              </div>
              <a href="#contacto" class="btn-primary">
                Contáctanos
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                  <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <AppFooter />
    </ion-content>

    <FloatingInvestButton @click="openAtletasModal" />
    <AtletasModal ref="atletasModalRef" />
    <SponsorModal />
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage } from '@ionic/vue'
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppNavbar from '@/components/Home/AppNavbar.vue'
import AppFooter from '@/components/Home/AppFooter.vue'
import FloatingInvestButton from '@/components/Home/FloatingInvestButton.vue'
import AtletasModal from '@/components/Modales/AtletasModal.vue'
import SponsorModal from '@/components/Modales/SponsorModal.vue'
import { useModal } from '@/composables/useModal'

const route = useRoute()
const router = useRouter()
const { openModal } = useModal()
const atletasModalRef = ref<InstanceType<typeof AtletasModal> | null>(null)

const openAtletasModal = () => {
  atletasModalRef.value?.open()
}
const filters = ['Todos', 'Muay Thai', 'Fisicoculturismo', 'Kickboxing', 'Karate', 'Calistenia', 'Boxeo']
const activeFilter = ref((route.query.filter as string) || 'Todos')

watch(() => route.query.filter, (newFilter) => {
  if (newFilter) {
    activeFilter.value = newFilter as string
  } else {
    activeFilter.value = 'Todos'
  }
})

const setFilter = (filter: string) => {
  activeFilter.value = filter
  if (filter === 'Todos') {
    router.push('/talentos')
  } else {
    router.push({ path: '/talentos', query: { filter } })
  }
}

const talentos = [
  {
    nombre: 'Nathan Fino',
    disciplina: 'Muay Thai',
    imagen: '/assets/images/atletas/nathan-fino.webp',
    slug: 'nathan-fino',
    instagram: 'https://www.instagram.com/gypsy.nate/',
    tiktok: 'https://www.tiktok.com/@gypsy.nate'
  },
  {
    nombre: 'Camilo Pinzón',
    disciplina: 'Fisicoculturismo',
    imagen: '/assets/images/atletas/camilo-pinzon.webp',
    slug: 'camilo-pinzon',
    instagram: 'https://www.instagram.com/camilofitness.11/',
    tiktok: 'https://www.tiktok.com/@camilofitness.11?lang=es-419'
  },
  {
    nombre: 'Katherine Portt',
    disciplina: 'Kickboxing',
    imagen: '/assets/images/atletas/katherine-portt.webp',
    slug: 'katherine-portt',
    instagram: 'https://www.instagram.com/katherineportt/',
    tiktok: 'https://www.tiktok.com/@katherineportt_?lang=es'
  },
  {
    nombre: 'Mario Quino',
    disciplina: 'Kickboxing',
    imagen: '/assets/images/atletas/mario-quino.webp',
    slug: 'mario-quino',
    instagram: 'https://www.instagram.com/the_shark_quino/',
    tiktok: 'https://www.tiktok.com/@the_skark_quino'
  },
  {
    nombre: 'Carlos Alberto López',
    disciplina: 'Boxeo',
    imagen: '/assets/images/atletas/carlos-lopez.webp',
    slug: 'carlos-lopez',
    instagram: '',
    tiktok: ''
  },
  {
    nombre: 'Olivia Serrano',
    disciplina: 'Karate',
    imagen: '/assets/images/atletas/olivia-serrano.webp',
    slug: 'olivia-serrano',
    instagram: 'https://www.instagram.com/olivv_.ss',
    tiktok: 'https://www.tiktok.com/@missoliv9'
  },
  {
    nombre: 'Daniel López',
    disciplina: 'Calistenia',
    imagen: '/assets/images/atletas/daniel-lopez.webp',
    slug: 'daniel-lopez',
    instagram: 'https://www.instagram.com/dani.lopez_c',
    tiktok: 'https://www.tiktok.com/@danielp8754'
  }
]

const filteredTalentos = computed(() => {
  if (activeFilter.value === 'Todos') {
    return talentos
  }
  return talentos.filter(t => t.disciplina.toLowerCase() === activeFilter.value.toLowerCase())
})
</script>

<style scoped>
ion-content {
  --background: var(--color-bg);
}

.talentos-page {
  background-color: var(--color-surface);
  padding: 60px 0;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.poster-layout {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.background-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Oswald', sans-serif;
  font-size: clamp(4rem, 20vw, 14rem);
  font-weight: 800;
  color: #F9B7C5;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
  line-height: 1;
}

.section-header {
  position: relative;
  z-index: 2;
  text-align: center;
  margin-bottom: 40px;
}

.subtitle {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #EE2B24;
  margin-bottom: 10px;
}

.title-overlay {
  position: relative;
  z-index: 2;
  text-align: center;
  font-family: 'Oswald', sans-serif;
  font-size: clamp(2rem, 6vw, 4rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  margin-bottom: 20px;
}

.title {
  display: block;
}

.title-red {
  display: block;
  color: #CC0000;
}

.accent-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #EE2B24, #ff6b6b);
  margin: 0 auto;
  border-radius: 2px;
}

.filter-container {
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.filter-btn {
  clip-path: polygon(10px 0%, 100% 0%, calc(100% - 10px) 100%, 0% 100%);
  padding: 12px 28px;
  background: transparent;
  box-shadow: none;
  filter: none;
}

.filter-btn:hover {
  filter: brightness(1.1);
  box-shadow: 0 4px 12px rgba(207, 46, 46, 0.2);
}

.filter-btn.active {
  background: linear-gradient(135deg, #CF2E2E 0%, #8b1e1e 100%);
  box-shadow: 0 8px 24px rgba(207, 46, 46, 0.35);
}

.filter-btn.active:hover {
  filter: brightness(1.15);
}

.talentos-grid {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.talento-card {
  position: relative;
  background-color: var(--color-bg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.talento-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-lg);
  padding: 2px;
  background: linear-gradient(90deg, #FF0000 0%, #FF0000 25%, #FF4444 50%, #FF0000 75%, #FF0000 100%);
  background-size: 200% 100%;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: led-paseo 2s linear infinite;
  pointer-events: none;
  z-index: 10;
  opacity: 0;
}

.talento-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius-lg);
  padding: 2px;
  background: linear-gradient(90deg, transparent 0%, transparent 45%, #FF0000 45%, #FF0000 55%, transparent 55%, transparent 100%);
  background-size: 200% 100%;
  background-position: 100% 0;
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  animation: draw-border 3s linear infinite;
  pointer-events: none;
  z-index: 10;
}

@keyframes led-paseo {
  0% { background-position: 0% 50%; box-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000, inset 0 0 5px rgba(255, 0, 0, 0.3); opacity: 0; }
  50% { box-shadow: 0 0 15px #FF0000, 0 0 25px #FF0000, inset 0 0 10px rgba(255, 0, 0, 0.5); opacity: 1; }
  100% { background-position: 200% 50%; box-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000, inset 0 0 5px rgba(255, 0, 0, 0.3); opacity: 0; }
}

@keyframes draw-border {
  0% { background-position: 100% 0; }
  100% { background-position: -100% 0; }
}

.talento-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(204, 0, 0, 0.3);
  border-color: #CC0000;
}

.card-img {
  position: relative;
  height: 220px;
  overflow: hidden;
}

.card-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.talento-card:hover .card-img img {
  transform: scale(1.1);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(204, 0, 0, 0.85) 0%, rgba(204, 0, 0, 0) 60%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.talento-card:hover .card-overlay {
  opacity: 1;
}

.card-name {
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
}

.talento-card:hover .card-name {
  opacity: 1;
  transform: translateY(0);
}

.card-info {
  padding: 20px;
  text-align: center;
}

.card-info h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 5px;
  text-transform: uppercase;
}

.disciplina {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;
}



.social-links {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: transparent;
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-icon svg {
  width: 16px;
  height: 16px;
}

.social-icon.instagram:hover {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  border-color: transparent;
  color: white;
  transform: scale(1.1);
}

.social-icon.tiktok:hover {
  background-color: #000000;
  border-color: transparent;
  color: white;
  transform: scale(1.1);
}

.cta-banner {
  position: relative;
  z-index: 2;
  background-color: #EE2B24;
  padding: 23px 20px;
  border-radius: 12px;
}

.cta-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.cta-banner:hover::before {
  left: 100%;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner-text {
  display: flex;
  flex-direction: column;
}

.banner-text .text-white {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 1.2;
}

.banner-text .text-black {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  line-height: 1.2;
}

.banner-text p {
  color: rgba(255, 255, 255, 0.9);
  margin-top: 10px;
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .talentos-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .poster-layout {
    min-height: 300px;
  }

  .background-text {
    font-size: clamp(2rem, 20vw, 5rem);
  }

  .filter-container {
    gap: 10px;
  }

  .filter-btn {
    padding: 10px 20px;
    font-size: 0.85rem;
  }

  .talentos-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 25px;
  }

  .banner-text {
    align-items: center;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 576px) {
  .talentos-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .card-img {
    height: 250px;
  }
}
</style>