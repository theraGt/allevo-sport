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
            'card--academia': post.type === 'academia'
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
        class="embed-modal fullscreen-modal"
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
          <CuerpoEventos :noticia="noticiaParaCuerpo" />
        </div>
      </ion-modal>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { IonModal, IonRefresher, IonRefresherContent } from '@ionic/vue'
import CuerpoEventos from './CuerpoEventos.vue'

const API_BASE = 'https://allevosports.thera.com.gt:81/api'

type Source = 'instagram' | 'facebook' | 'tiktok' | 'allevo' | 'academia' | 'web' | 'manual'
type PostType = 'blog' | 'event' | 'social' | 'academia' | 'Talento' | 'Proyecto'

interface EventDate { day: string; month: string }
interface NoticiaCuerpo {
  id: string
  noticia_id: string
  tipo: 'subtitulo' | 'parrafo' | 'imagen' | 'cita'
  contenido: string
  orden: number
}
interface Post {
  id: string
  title: string
  excerpt: string
  image: string
  date: string
  source: Source
  type: PostType
  url?: string
  embedUrl?: string
  eventDate?: EventDate
  categoria: string
  cuerpo?: NoticiaCuerpo[]
}

const FILTERS = [
  { id: 'Talento', label: 'Talento', icon: '<svg viewBox="0 0 24 24" fill="var(--c-red)" width="14" height="14"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
  { id: 'Proyecto', label: 'Proyecto', icon: '<svg viewBox="0 0 24 24" fill="var(--c-gold)" width="14" height="14"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
]

const activeFilter = ref<string>('Talento')
const isLoading = ref(false)
const selectedPost = ref<Post | null>(null)
const showModal = ref(false)
const allPosts = ref<Post[]>([])
const loading = ref(false)
const error = ref('')

function mapCategoriaToType(categoria: string): PostType {
  const map: Record<string, PostType> = {
    'Talento': 'blog',
    'Proyecto': 'blog',
    'blog': 'blog',
    'evento': 'event',
    'event': 'event',
    'academia': 'academia',
    'social': 'social'
  }
  return map[categoria] || 'blog'
}

function mapRedSocialToSource(red_social: string): Source {
  const map: Record<string, Source> = {
    'instagram': 'instagram',
    'tiktok': 'tiktok',
    'youtube': 'facebook',
    'web': 'allevo',
    'manual': 'allevo'
  }
  return map[red_social] || 'allevo'
}

function formatDate(dateStr: string): string {
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })
  } catch {
    return dateStr
  }
}

async function fetchNoticias() {
  loading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE}/noticias/publicadas`)
    if (!res.ok) throw new Error('Error al cargar noticias')
    const data = await res.json()
    allPosts.value = data.map((n: any) => ({
      id: n.id,
      title: n.titulo,
      excerpt: n.extracto,
      image: n.portada_url || '/assets/images/placeholder-news.webp',
      date: formatDate(n.created_at),
      source: mapRedSocialToSource(n.red_social),
      type: mapCategoriaToType(n.categoria),
      url: n.link_original || '',
      categoria: n.categoria,
      embedUrl: '',
      cuerpo: n.cuerpo || []
    }))
    allPosts.value.sort((a, b) => {
      const catOrder: Record<string, number> = { 'Talento': 0, 'Proyecto': 1, 'blog': 2, 'evento': 3, 'academia': 4, 'social': 5 }
      const catA = catOrder[a.categoria] ?? 99
      const catB = catOrder[b.categoria] ?? 99
      if (catA !== catB) return catA - catB
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  } catch (e: any) {
    console.error('Error fetching noticias:', e)
    error.value = e.message
  } finally {
    loading.value = false
  }
}

const filteredPosts = computed(() => {
  return allPosts.value.filter(p => p.categoria === activeFilter.value)
})

const featured = computed(() => filteredPosts.value[0] ?? null)
const restPosts = computed(() => filteredPosts.value.slice(1))

const noticiaParaCuerpo = computed(() => {
  if (!selectedPost.value) return null
  return {
    id: selectedPost.value.id,
    titulo: selectedPost.value.title,
    extracto: selectedPost.value.excerpt,
    portada_url: selectedPost.value.image,
    link_original: selectedPost.value.url || '',
    cuerpo: selectedPost.value.cuerpo || []
  }
})

function sourceLabel(s: Source) {
  const map: Record<Source, string> = {
    instagram: 'Instagram', facebook: 'Facebook',
    tiktok: 'TikTok', allevo: 'Allevo', academia: 'Academia', web: 'Web', manual: 'Manual'
  }
  return map[s] || s
}

function categoryLabel(t: PostType) {
  const map: Record<PostType, string> = {
    blog: 'Blog', event: 'Evento', social: 'Social', academia: 'Academia', Talento: 'Talento', Proyecto: 'Proyecto'
  }
  return map[t] || t
}

function sourceIcon(s: Source) {
  const f = FILTERS.find(f => f.id === s)
  return f?.icon || ''
}

function openPost(post: Post) {
  selectedPost.value = post
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedPost.value = null
}

async function handleRefresh(event: CustomEvent) {
  await fetchNoticias()
  event.target.complete()
}

onMounted(() => {
  fetchNoticias()
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
  position: relative;
}

.featured-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--r);
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

.featured-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--r);
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
  position: relative;
}

.news-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--r);
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

.news-card::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--r);
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

.news-card:hover::before,
.featured-card:hover::before {
  opacity: 1;
}

@keyframes led-paseo {
  0% {
    background-position: 0% 50%;
    box-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000, inset 0 0 5px rgba(255, 0, 0, 0.3);
    opacity: 0;
  }
  50% {
    box-shadow: 0 0 15px #FF0000, 0 0 25px #FF0000, inset 0 0 10px rgba(255, 0, 0, 0.5);
    opacity: 1;
  }
  100% {
    background-position: 200% 50%;
    box-shadow: 0 0 5px #FF0000, 0 0 10px #FF0000, inset 0 0 5px rgba(255, 0, 0, 0.3);
    opacity: 0;
  }
}

@keyframes draw-border {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
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
  --border-radius: 0;
}

.embed-modal.fullscreen-modal {
  --height: 100%;
  --width: 80%;
  z-index: 9999;
}

.embed-modal .modal-content {
  height: 100vh;
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

.modal-link {
  padding: 12px 24px;
  border-bottom: 1px solid var(--c-border);
}

.modal-link-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  background: var(--c-red);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-family: var(--f-body);
  font-size: 0.9rem;
  font-weight: 600;
  transition: all 0.2s ease;
}

.modal-link-btn:hover {
  background: #b32424;
  transform: translateY(-1px);
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
