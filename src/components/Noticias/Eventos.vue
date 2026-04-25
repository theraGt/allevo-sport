<template>
  <!-- Pull to Refresh -->
  <ion-refresher slot="fixed" @ion-refresh="handleRefresh($event)">
    <ion-refresher-content refreshing-spinner="circles" pulling-icon="none"></ion-refresher-content>
  </ion-refresher>

  <div class="noticias-wrapper">

    <!-- Header -->
      <header class="page-header">
        <div class="header-watermark" aria-hidden="true">NEWS &amp; EVENTS</div>
        <div class="header-content">
          <div class="header-eyebrow">
            <span class="live-dot"></span>
            <span class="badge-text">Feed en vivo</span>
          </div>
          <h1 class="page-title">
            NOTICIAS <span class="ampersand">&amp;</span> <span class="highlight">EVENTOS</span>
          </h1>
          <p class="page-subtitle">Todo lo que mueve el ecosistema Allevo Sports</p>
        </div>
      </header>

      <!-- Filter Tabs -->
      <div class="filter-wrapper">
        <div class="filter-scroll">
          <button
            v-for="f in FILTERS"
            :key="f.id"
            class="filter-pill"
            :class="{ active: activeFilter === f.id }"
            @click="activeFilter = f.id"
          >
            <span class="pill-icon" v-html="f.icon"></span>
            <span class="pill-label">{{ f.label }}</span>
          </button>
        </div>
        <div class="filter-fade"></div>
      </div>

      <!-- Featured Hero -->
      <transition name="fade" mode="out-in">
        <div
          v-if="featured"
          :key="featured.id"
          class="featured-section"
          @click="openPost(featured)"
        >
          <div class="featured-card">
            <div class="featured-img-wrap">
              <img
                :src="featured.image"
                :alt="featured.title"
                class="featured-img"
                loading="eager"
              />
              <div class="featured-overlay"></div>
              <div class="featured-vignette"></div>

              <span class="source-badge" :class="`source--${featured.source}`">
                <span v-html="sourceIcon(featured.source)"></span>
                {{ sourceLabel(featured.source) }}
              </span>

              <span v-if="featured.type === 'event'" class="event-badge">
                <span class="event-date-day">{{ featured.eventDate?.day }}</span>
                <span class="event-date-month">{{ featured.eventDate?.month }}</span>
              </span>
            </div>

            <div class="featured-body">
              <div class="featured-tags">
                <span class="category-tag">{{ categoryLabel(featured.type) }}</span>
              </div>
              <h2 class="featured-title">{{ featured.title }}</h2>
              <p class="featured-excerpt">{{ featured.excerpt }}</p>
              <div class="featured-meta">
                <span class="meta-date">{{ featured.date }}</span>
                <span class="read-more">
                  <span>Leer más</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Section Label -->
      <div class="section-label" v-if="restPosts.length">
        <span>MÁS CONTENIDO</span>
        <div class="label-line"></div>
      </div>

      <!-- Cards Grid -->
      <transition-group name="card-list" tag="div" class="cards-grid">
        <article
          v-for="(post, i) in restPosts"
          :key="post.id"
          class="news-card"
          :class="{
            'card--event': post.type === 'event',
            'card--academia': post.type === 'academia',
            'card--wide': i === 0 && restPosts.length >= 3
          }"
          :style="{ '--delay': `${i * 60}ms` }"
          @click="openPost(post)"
        >
          <div class="card-img-wrap">
            <img
              :src="post.image"
              :alt="post.title"
              class="card-img"
              loading="lazy"
            />
            <div class="card-img-overlay"></div>

            <span
              class="source-badge source-badge--sm"
              :class="`source--${post.source}`"
            >
              <span v-html="sourceIcon(post.source)"></span>
            </span>

            <span
              v-if="post.type === 'event'"
              class="event-badge event-badge--sm"
            >
              <span class="event-date-day">{{ post.eventDate?.day }}</span>
              <span class="event-date-month">{{ post.eventDate?.month }}</span>
            </span>
          </div>

          <div class="card-body">
            <div class="card-tags">
              <span
                class="category-tag category-tag--sm"
                :class="`type--${post.type}`"
              >
                {{ categoryLabel(post.type) }}
              </span>
            </div>
            <h3 class="card-title">{{ post.title }}</h3>
            <p class="card-excerpt">{{ post.excerpt }}</p>
            <div class="card-meta">
              <span class="meta-date">{{ post.date }}</span>
              <span class="card-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </span>
            </div>
          </div>
        </article>
      </transition-group>

      <!-- Empty State -->
      <div v-if="filteredPosts.length === 0" class="empty-state">
        <svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8" y1="2" x2="8" y2="6"/>
          <line x1="3" y1="10" x2="21" y2="10"/>
          <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01"/>
        </svg>
        <p class="empty-title">Sin contenido disponible</p>
        <p class="empty-desc">No hay publicaciones en esta categoría por el momento.</p>
      </div>

      <!-- Embed Modal -->
      <ion-modal
        :is-open="showModal"
        @didDismiss="closeModal"
        :breakpoints="[0, 0.95]"
        initial-breakpoint="0.95"
        class="embed-modal"
      >
        <div class="modal-content">
          <div class="modal-header">
            <span class="modal-source" :class="`source--${selectedPost?.source}`">
              <span v-html="sourceIcon(selectedPost?.source || 'allevo')"></span>
              {{ sourceLabel(selectedPost?.source || 'allevo') }}
            </span>
            <button class="close-btn" @click="closeModal" aria-label="Cerrar">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <div class="embed-container" v-if="selectedPost?.embedUrl">
            <iframe
              :src="selectedPost.embedUrl"
              frameborder="0"
              allowfullscreen
              allow="autoplay; encrypted-media"
            ></iframe>
          </div>
          <div v-else class="embed-fallback">
            <p>No se puede mostrar el contenido embebido.</p>
          </div>
        </div>
      </ion-modal>

  </div>

  <!-- Infinite Scroll -->
  <ion-infinite-scroll
    slot="fixed"
    @ionInfinite="onInfinite($event)"
    :disabled="!hasMore"
    threshold="120px"
  >
    <ion-infinite-scroll-content
      loading-spinner="circles"
      loading-text="Cargando más noticias..."
    ></ion-infinite-scroll-content>
  </ion-infinite-scroll>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { IonModal, IonRefresher, IonRefresherContent, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue'

type Source = 'instagram' | 'facebook' | 'tiktok' | 'allevo' | 'academia'
type PostType = 'blog' | 'event' | 'social' | 'academia'

interface EventDate { day: string; month: string }
interface Post {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  source: Source
  type: PostType
  url?: string
  embedUrl?: string
  eventDate?: EventDate
}

const FILTERS = [
  { id: 'all', label: 'Todo', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
  { id: 'allevo', label: 'Allevo', icon: '<svg viewBox="0 0 24 24" fill="var(--c-red)" width="14" height="14"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { id: 'instagram', label: 'Instagram', icon: '<svg viewBox="0 0 24 24" fill="var(--c-ig)" width="14" height="14"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>' },
  { id: 'facebook', label: 'Facebook', icon: '<svg viewBox="0 0 24 24" fill="var(--c-fb)" width="14" height="14"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
  { id: 'tiktok', label: 'TikTok', icon: '<svg viewBox="0 0 24 24" fill="var(--c-tt)" width="14" height="14"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>' },
  { id: 'academia', label: 'Academias', icon: '<svg viewBox="0 0 24 24" fill="var(--c-gold)" width="14" height="14"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
]

const activeFilter = ref<string>('all')
const isLoading = ref(false)
const selectedPost = ref<Post | null>(null)
const showModal = ref(false)
const page = ref(1)
const perPage = 6

const allPosts = ref<Post[]>([
  {
    id: 1,
    title: 'Katherine "La Barbie" Portt llegó para sostener el ritmo',
    excerpt: 'No todo el mundo aguanta 11 años de alto rendimiento. Katherine se mantuvo ahí, año tras año, competencia tras competencia.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/Katherine-La-Barbie-Portt-compress.webp',
    date: '29 ene 2026',
    source: 'allevo',
    type: 'blog',
    url: 'https://allevosport.com/katherine-la-barbie-portt-llego-para-sostener-el-ritmo/'
  },
  {
    id: 2,
    title: 'El Profesor Carlos López: una vida de boxeo formando talentos',
    excerpt: 'Con años de experiencia formando boxeadores, su nombre se asocia a lo esencial del deporte: técnica limpia y disciplina diaria.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/El-Profesor-Carlos-Lopez.webp',
    date: '29 ene 2026',
    source: 'allevo',
    type: 'blog',
    url: 'https://allevosport.com/el-profesor-carlos-lopez-una-vida-de-boxeo-al-servicio-del-talento-experiencia-caracter-y-escuela-en-allevo-sports/'
  },
  {
    id: 3,
    title: 'Camilo Pinzón impone con doble campeonato nacional',
    excerpt: 'Un fin de semana perfecto en la tarima: campeón en Físico Clásico 1.71 y 1.68, consolidando su dominio.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/Camilo-Noticia-e1775600637102.png',
    date: '29 ene 2026',
    source: 'allevo',
    type: 'blog',
  },
  {
    id: 4,
    title: 'Mario "The Shark" Quino en combate internacional — Teatro Delirio',
    excerpt: 'El 6 de marzo será una noche especial en el Teatro Delirio, con la cartelera impulsada por Allevo Sports y K-1CC Fight League.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/Noticia-Quino-e1775600503910.png',
    date: '6 mar 2026',
    source: 'allevo',
    type: 'event',
    eventDate: { day: '06', month: 'MAR' }
  },
  {
    id: 5,
    title: 'Nathan Fino en SMOKER\'S — Muay Thai, K1 y Box',
    excerpt: 'El talento local reunirá Muay Thai, K-1 y Box en el Gimnasio Internacional Cubano bajo la organización de Allevo Sports.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/NOticias-Smokers-e1775798137557.png',
    date: '7 feb 2026',
    source: 'allevo',
    type: 'event',
    eventDate: { day: '07', month: 'FEB' }
  },
  {
    id: 6,
    title: 'Entrena con los mejores — Academia GT Kickboxing',
    excerpt: 'Inscripciones abiertas para el nuevo ciclo de entrenamiento de kickboxing. Cupos limitados, nivel principiante y avanzado.',
    image: 'https://allevosport.com/wp-content/uploads/2026/03/Sports.webp',
    date: '15 abr 2026',
    source: 'academia',
    type: 'academia',
    eventDate: { day: '15', month: 'ABR' }
  },
  {
    id: 7,
    title: 'Post viral: Katherine en ronda de sparring 🥊',
    excerpt: 'El último post en Instagram de @allevsports superó los 12k likes en menos de 24 horas. El público responde.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/Port-perfil-scaled.jpg',
    date: '20 abr 2026',
    source: 'instagram',
    type: 'social',
    embedUrl: 'https://www.instagram.com/p/abc123/embed'
  },
  {
    id: 8,
    title: 'Detrás de cámaras: preparación para el torneo nacional',
    excerpt: 'Nuestro TikTok del día de preparación acumula más de 80k reproducciones. ¡La comunidad está encendida!',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/logo-color-allevo-sport.webp',
    date: '18 abr 2026',
    source: 'tiktok',
    type: 'social',
    embedUrl: 'https://www.tiktok.com/@allevosports/video/123'
  },
  {
    id: 9,
    title: 'Competencia Regional de Kickboxing - Inscripciones abiertas',
    excerpt: 'Únete a la competencia más importante de la región. Categorías amateur y profesional.',
    image: 'https://allevosport.com/wp-content/uploads/2026/03/Sports.webp',
    date: '22 abr 2026',
    source: 'allevo',
    type: 'event',
    eventDate: { day: '22', month: 'MAY' }
  },
  {
    id: 10,
    title: 'Nueva sede Allevo Sports Zone - Zona 10',
    excerpt: 'Ahora estamos en zona 10 con instalaciones de clase mundial para boxeo y kickboxing.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/logo-color-allevo-sport.webp',
    date: '15 abr 2026',
    source: 'allevo',
    type: 'blog',
  },
  {
    id: 11,
    title: 'Entrenamiento especial: Taller de defensa personal',
    excerpt: 'Taller intensivo de defensa personal para todas las edades. Impartido por expertos.',
    image: 'https://allevosport.com/wp-content/uploads/2026/03/Sports.webp',
    date: '10 may 2026',
    source: 'academia',
    type: 'academia',
    eventDate: { day: '10', month: 'MAY' }
  },
  {
    id: 12,
    title: 'Live: Entrevista con los campeones nacionales',
    excerpt: 'No te pierdas la transmisión en vivo de nuestra entrevista con los campeones.',
    image: 'https://allevosport.com/wp-content/uploads/2026/01/logo-color-allevo-sport.webp',
    date: '25 abr 2026',
    source: 'facebook',
    type: 'social',
    embedUrl: 'https://www.facebook.com/plugins/video.php?href=https://facebook.com/allevosports/videos/123'
  },
])

const filteredPosts = computed(() => {
  if (activeFilter.value === 'all') return allPosts.value
  return allPosts.value.filter(p => p.source === activeFilter.value)
})

const displayedPosts = computed(() => {
  return filteredPosts.value.slice(0, page.value * perPage)
})

const hasMore = computed(() => displayedPosts.value.length < filteredPosts.value.length)

const featured = computed(() => displayedPosts.value[0] ?? null)
const restPosts = computed(() => displayedPosts.value.slice(1))

function sourceLabel(s: Source) {
  const map: Record<Source, string> = {
    instagram: 'Instagram', facebook: 'Facebook',
    tiktok: 'TikTok', allevo: 'Allevo', academia: 'Academia'
  }
  return map[s]
}

function categoryLabel(t: PostType) {
  const map: Record<PostType, string> = {
    blog: 'Blog', event: 'Evento', social: 'Social', academia: 'Academia'
  }
  return map[t]
}

function sourceIcon(s: Source) {
  const f = FILTERS.find(f => f.id === s)
  return f?.icon || ''
}

function openPost(post: Post) {
  if (['instagram', 'facebook', 'tiktok'].includes(post.source) && post.embedUrl) {
    selectedPost.value = post
    showModal.value = true
  } else if (post.url) {
    window.open(post.url, '_blank')
  }
}

function closeModal() {
  showModal.value = false
  selectedPost.value = null
}

async function loadMore() {
  if (!hasMore.value || isLoading.value) return
  isLoading.value = true
  await new Promise(r => setTimeout(r, 500))
  page.value++
  isLoading.value = false
}

async function handleRefresh(event: CustomEvent) {
  page.value = 1
  await new Promise(r => setTimeout(r, 800))
  event.target.complete()
}

async function onInfinite(event: CustomEvent) {
  await loadMore()
  event.target.complete()
}

onMounted(() => {
  page.value = 1
})
</script>

<style scoped>
/* ──────────────────────────────────────────────────────────────
   NOTICIAS — ESTILO PROFESIONAL
   Tipografía alineada al proyecto: Oswald (headings), Inter (body)
   ────────────────────────────────────────────────────────────── */

.noticias-wrapper {
  --c-bg: #0b0b0b;
  --c-surface: #151515;
  --c-surface2: #1a1a1a;
  --c-border: rgba(255, 255, 255, 0.08);
  --c-red: #CF2E2E;
  --c-red-dim: rgba(207, 46, 46, 0.12);
  --c-red-glow: rgba(207, 46, 46, 0.25);
  --c-gold: #c9a84c;
  --c-ig: #e1306c;
  --c-fb: #1877f2;
  --c-tt: #69c9d0;
  --c-text: #ffffff;
  --c-muted: rgba(255, 255, 255, 0.5);
  --c-muted2: rgba(255, 255, 255, 0.35);
  --f-head: 'Oswald', system-ui, sans-serif;
  --f-body: 'Inter', system-ui, sans-serif;
  --r: 16px;
}

/* ── PULL TO REFRESH ─────────────────────────────────────────── */
ion-refresher {
  background: var(--c-bg);
}

ion-refresher-content {
  --refreshing-spinner-color: var(--c-red);
  --pulling-color: var(--c-muted);
}

/* ── PAGE HEADER ─────────────────────────────────────────────── */
.page-header {
  padding: 80px 24px 40px;
  position: relative;
  overflow: hidden;
  text-align: center;
}

.header-watermark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: var(--f-head);
  font-size: clamp(120px, 15vw, 200px);
  font-weight: 900;
  color: #1A0505;
  opacity: 0.2;
  white-space: nowrap;
  letter-spacing: 0.1em;
  pointer-events: none;
  user-select: none;
  line-height: 1;
  text-transform: uppercase;
  z-index: 0;
}

.header-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #EF4444;
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.3); opacity: 0.5; }
}

.badge-text {
  font-family: var(--f-body);
  font-size: 12px;
  font-weight: 600;
  color: #EF4444;
  text-transform: uppercase;
  letter-spacing: 3px;
}

.page-title {
  font-family: var(--f-head);
  font-size: clamp(32px, 5vw, 64px);
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;
  color: #FFFFFF;
  margin: 0;
}

.page-title .ampersand {
  color: #FFFFFF;
}

.page-title .highlight {
  color: #EF4444;
}

.page-subtitle {
  font-family: var(--f-body);
  font-size: clamp(14px, 2vw, 18px);
  color: #9CA3AF;
  margin: 16px 0 0;
  line-height: 1.5;
}

/* ── FILTER TABS ─────────────────────────────────────────────── */
.filter-wrapper {
  position: relative;
  padding: 0 24px 28px;
}

.filter-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  scrollbar-width: none;
  padding-bottom: 4px;
  scroll-snap-type: x mandatory;
}

.filter-scroll::-webkit-scrollbar {
  display: none;
}

.filter-fade {
  position: absolute;
  top: 0;
  right: 24px;
  width: 40px;
  height: calc(100% - 4px);
  background: linear-gradient(to left, var(--c-bg), transparent);
  pointer-events: none;
}

.filter-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 18px;
  border-radius: 100px;
  border: 1px solid var(--c-border);
  background: var(--c-surface);
  color: var(--c-muted);
  font-family: var(--f-body);
  font-size: 0.78rem;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  flex-shrink: 0;
  scroll-snap-align: start;
  position: relative;
  overflow: hidden;
}

.filter-pill::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, var(--c-red), #8b1e1e);
  opacity: 0;
  transition: opacity 0.25s ease;
  border-radius: inherit;
}

.filter-pill .pill-icon,
.filter-pill .pill-label {
  position: relative;
  z-index: 1;
}

.filter-pill .pill-icon {
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.filter-pill.active {
  border-color: transparent;
  color: #fff;
  box-shadow: 0 4px 14px rgba(207, 46, 46, 0.35);
}

.filter-pill.active::before {
  opacity: 1;
}

.filter-pill.active .pill-icon {
  opacity: 1;
}

.filter-pill:not(.active):hover {
  border-color: rgba(255, 255, 255, 0.18);
  color: var(--c-text);
  transform: translateY(-1px);
}

.filter-pill:not(.active):active {
  transform: scale(0.97);
}

/* ── FEATURED HERO ───────────────────────────────────────────── */
.featured-section {
  margin: 0 24px 32px;
  cursor: pointer;
  position: relative;
}

.featured-card {
  position: relative;
  background: var(--c-surface);
  border-radius: var(--r);
  overflow: hidden;
  border: 1px solid var(--c-border);
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.featured-card:hover {
  border-color: rgba(207, 46, 46, 0.25);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(207, 46, 46, 0.08);
  transform: translateY(-3px);
}

.featured-card:active {
  transform: translateY(-1px) scale(0.995);
}

.featured-img-wrap {
  position: relative;
  aspect-ratio: 21 / 9;
  overflow: hidden;
}

.featured-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}

.featured-card:hover .featured-img {
  transform: scale(1.04);
}

.featured-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(11, 11, 11, 0.3) 40%,
    rgba(11, 11, 11, 0.85) 85%,
    var(--c-bg) 100%
  );
}

.featured-vignette {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 80px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}

.featured-body {
  padding: 0 24px 24px;
  margin-top: -60px;
  position: relative;
  z-index: 2;
}

.featured-tags {
  margin-bottom: 10px;
}

.featured-title {
  font-family: var(--f-head);
  font-size: clamp(1.3rem, 3.5vw, 1.9rem);
  font-weight: 900;
  line-height: 1.05;
  color: var(--c-text);
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: -0.3px;
}

.featured-excerpt {
  font-family: var(--f-body);
  font-size: 0.88rem;
  color: var(--c-muted);
  line-height: 1.6;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  max-width: 600px;
}

.featured-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.meta-date {
  font-family: var(--f-body);
  font-size: 0.75rem;
  color: var(--c-muted2);
  font-weight: 500;
}

.read-more {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--f-head);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--c-red);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: gap 0.25s ease;
}

.read-more svg {
  transition: transform 0.25s ease;
}

.featured-card:hover .read-more {
  gap: 10px;
}

.featured-card:hover .read-more svg {
  transform: translateX(3px);
}

/* ── SOURCE BADGES ───────────────────────────────────────────── */
.source-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 6px 12px;
  border-radius: 100px;
  font-family: var(--f-body);
  font-size: 0.68rem;
  font-weight: 700;
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: 1px solid rgba(255, 255, 255, 0.08);
  z-index: 3;
}

.source-badge--sm {
  padding: 5px 8px;
  font-size: 0;
  top: 12px;
  left: 12px;
}

.source-badge--sm svg {
  width: 13px;
  height: 13px;
}

.source--allevo {
  background: rgba(207, 46, 46, 0.75);
  color: #fff;
}

.source--instagram {
  background: rgba(225, 48, 108, 0.75);
  color: #fff;
}

.source--facebook {
  background: rgba(24, 119, 242, 0.75);
  color: #fff;
}

.source--tiktok {
  background: rgba(0, 0, 0, 0.65);
  color: var(--c-tt);
  border-color: rgba(105, 201, 208, 0.3);
}

.source--academia {
  background: rgba(201, 168, 76, 0.75);
  color: #000;
}

/* ── EVENT BADGE ─────────────────────────────────────────────── */
.event-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--c-red);
  color: #fff;
  border-radius: 10px;
  padding: 8px 12px;
  line-height: 1;
  min-width: 52px;
  box-shadow: 0 4px 16px rgba(207, 46, 46, 0.4);
  z-index: 3;
}

.event-badge--sm {
  top: 12px;
  right: 12px;
  padding: 6px 10px;
  border-radius: 8px;
  min-width: 42px;
}

.event-date-day {
  font-family: var(--f-head);
  font-size: 1.5rem;
  font-weight: 900;
}

.event-badge--sm .event-date-day {
  font-size: 1.15rem;
}

.event-date-month {
  font-family: var(--f-head);
  font-size: 0.6rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  opacity: 0.9;
}

/* ── CATEGORY TAG ────────────────────────────────────────────── */
.category-tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  background: var(--c-red-dim);
  color: var(--c-red);
  font-family: var(--f-head);
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.category-tag--sm {
  font-size: 0.6rem;
  padding: 3px 8px;
  border-radius: 4px;
}

.type--event {
  background: rgba(207, 46, 46, 0.12);
  color: var(--c-red);
}

.type--social {
  background: rgba(105, 201, 208, 0.12);
  color: var(--c-tt);
}

.type--academia {
  background: rgba(201, 168, 76, 0.12);
  color: var(--c-gold);
}

.type--blog {
  background: rgba(255, 255, 255, 0.06);
  color: var(--c-muted);
}

/* ── SECTION LABEL ───────────────────────────────────────────── */
.section-label {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 0 24px 20px;
  font-family: var(--f-head);
  font-size: 0.72rem;
  font-weight: 700;
  color: var(--c-muted2);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.label-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(to right, var(--c-border), transparent);
}

/* ── CARDS GRID ──────────────────────────────────────────────── */
.cards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 0 24px;
}

/* First card spans full width for visual hierarchy */
.cards-grid .news-card:first-child {
  grid-column: 1 / -1;
}

.news-card {
  background: var(--c-surface);
  border-radius: var(--r);
  overflow: hidden;
  cursor: pointer;
  border: 1px solid var(--c-border);
  transition: all 0.35s cubic-bezier(0.19, 1, 0.22, 1);
  animation: cardIn 0.5s ease both;
  animation-delay: var(--delay);
  display: flex;
  flex-direction: column;
}

.news-card:hover {
  transform: translateY(-5px);
  border-color: rgba(207, 46, 46, 0.2);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(207, 46, 46, 0.06);
}

.news-card:active {
  transform: translateY(-2px) scale(0.992);
}

.card--event {
  border-color: rgba(207, 46, 46, 0.18);
}

.card--academia {
  border-color: rgba(201, 168, 76, 0.15);
}

/* full-width card: horizontal layout */
.card--wide {
  display: grid;
  grid-template-columns: 320px 1fr;
  flex-direction: row;
}

.card--wide .card-img-wrap {
  height: auto;
  aspect-ratio: 16 / 10;
}

.card--wide .card-img {
  height: 100%;
}

/* regular card: vertical */
.card-img-wrap {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  flex-shrink: 0;
}

.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}

.card-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(11, 11, 11, 0.5) 0%, transparent 50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.news-card:hover .card-img {
  transform: scale(1.06);
}

.news-card:hover .card-img-overlay {
  opacity: 1;
}

.card-body {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
}

.card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.card-title {
  font-family: var(--f-head);
  font-size: 0.95rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--c-text);
  text-transform: uppercase;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  letter-spacing: -0.2px;
}

.card--wide .card-title {
  font-size: 1.1rem;
  -webkit-line-clamp: 2;
}

.card-excerpt {
  font-family: var(--f-body);
  font-size: 0.78rem;
  color: var(--c-muted);
  line-height: 1.55;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card--wide .card-excerpt {
  font-size: 0.82rem;
}

.card-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 8px;
}

.card-arrow {
  display: flex;
  align-items: center;
  color: var(--c-red);
  transition: transform 0.25s ease;
}

.news-card:hover .card-arrow {
  transform: translateX(4px);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ── TRANSITIONS ─────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.card-list-enter-active {
  transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
}

.card-list-leave-active {
  transition: all 0.25s ease;
  position: absolute;
}

.card-list-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.card-list-leave-to {
  opacity: 0;
  transform: scale(0.96);
}

/* ── EMPTY STATE ─────────────────────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 80px 24px;
  gap: 12px;
  text-align: center;
}

.empty-icon {
  width: 48px;
  height: 48px;
  color: var(--c-muted2);
  stroke-width: 1.2;
  margin-bottom: 8px;
}

.empty-title {
  font-family: var(--f-head);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-text);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

.empty-desc {
  font-family: var(--f-body);
  font-size: 0.85rem;
  color: var(--c-muted);
  margin: 0;
}

/* ── EMBED MODAL ─────────────────────────────────────────────── */
.embed-modal {
  --background: var(--c-bg);
  --border-radius: 20px 20px 0 0;
}

.embed-modal .modal-content {
  height: 92vh;
  display: flex;
  flex-direction: column;
  background: var(--c-bg);
}

.embed-modal .modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 24px;
  border-bottom: 1px solid var(--c-border);
  flex-shrink: 0;
}

.embed-modal .modal-source {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 100px;
  font-family: var(--f-body);
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.embed-modal .modal-source svg {
  width: 14px;
  height: 14px;
}

.embed-modal .close-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s ease;
  color: var(--c-text);
}

.embed-modal .close-btn svg {
  width: 16px;
  height: 16px;
}

.embed-modal .close-btn:hover {
  background: var(--c-surface2);
  border-color: rgba(255, 255, 255, 0.2);
}

.embed-modal .close-btn:active {
  transform: scale(0.93);
}

.embed-modal .embed-container {
  flex: 1;
  padding: 0;
  overflow: hidden;
}

.embed-modal .embed-container iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.embed-fallback {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--f-body);
  font-size: 0.9rem;
  color: var(--c-muted);
}

ion-infinite-scroll {
  --color: var(--c-red);
}

/* ═══════════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════════ */

@media (max-width: 1024px) {
  .cards-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  .card--wide {
    grid-template-columns: 260px 1fr;
  }

  .featured-img-wrap {
    aspect-ratio: 16 / 9;
  }
}

@media (max-width: 768px) {
  .page-header {
    padding: 60px 20px 32px;
  }

  .header-watermark {
    font-size: 90px;
  }

  .filter-wrapper {
    padding: 0 20px 24px;
  }

  .featured-section {
    margin: 0 20px 28px;
  }

  .featured-img-wrap {
    aspect-ratio: 16 / 10;
  }

  .featured-body {
    padding: 0 18px 20px;
    margin-top: -50px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    padding: 0 20px;
  }

  .cards-grid .news-card:first-child {
    grid-column: auto;
  }

  .card--wide {
    grid-template-columns: 1fr;
  }

  .card--wide .card-img-wrap {
    aspect-ratio: 16 / 9;
  }

  .card-img-wrap {
    aspect-ratio: 16 / 9;
  }

  .section-label {
    padding: 0 20px 16px;
  }

  .page-spacer {
    height: 36px;
  }
}

@media (max-width: 480px) {
  .page-header {
    padding: 48px 16px 24px;
  }

  .header-watermark {
    font-size: 60px;
  }

  .header-eyebrow {
    margin-bottom: 16px;
  }

  .badge-text {
    font-size: 11px;
    letter-spacing: 2px;
  }

  .page-title {
    font-size: 28px;
  }

  .filter-wrapper {
    padding: 0 16px 20px;
  }

  .filter-pill {
    padding: 8px 14px;
    font-size: 0.72rem;
  }

  .featured-section {
    margin: 0 16px 24px;
  }

  .featured-body {
    padding: 0 16px 18px;
    margin-top: -40px;
  }

  .featured-excerpt {
    font-size: 0.82rem;
  }

  .cards-grid {
    padding: 0 16px;
    gap: 14px;
  }

  .card-body {
    padding: 14px;
  }

  .card-title {
    font-size: 0.9rem;
  }

  .section-label {
    padding: 0 16px 14px;
    font-size: 0.65rem;
  }

}

/* ── Reduced Motion ──────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .live-dot,
  .spinner,
  .news-card,
  .featured-card,
  .filter-pill,
  .card-img,
  .featured-img,
  .card-arrow,
  .read-more svg {
    animation: none !important;
    transition: none !important;
  }

  .news-card:hover,
  .featured-card:hover {
    transform: none;
  }
}
</style>
