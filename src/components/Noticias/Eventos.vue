<template>
    <ion-page class="noticias-page">
        <ion-content :fullscreen="true" class="noticias-content">

            <!-- Pull to Refresh -->
            <ion-refresher slot="fixed" @ion-refresh="handleRefresh($event)">
                <ion-refresher-content refreshing-spinner="circles" pulling-icon="none"></ion-refresher-content>
            </ion-refresher>

            <!-- Header -->
            <header class="page-header">
                <div class="header-eyebrow">
                    <span class="live-dot"></span>
                    <span>Feed en vivo</span>
                </div>
                <h1 class="page-title">NOTICIAS <br /><em>&amp; EVENTOS</em></h1>
                <p class="page-subtitle">Todo lo que mueve el ecosistema Allevo Sports</p>
            </header>

            <!-- Filter Tabs -->
            <div class="filter-wrapper">
                <div class="filter-scroll">
                    <button v-for="f in FILTERS" :key="f.id" class="filter-pill"
                        :class="{ active: activeFilter === f.id }" @click="activeFilter = f.id">
                        <span class="pill-icon" v-html="f.icon"></span>
                        {{ f.label }}
                    </button>
                </div>
            </div>

            <!-- Featured Hero -->
            <transition name="fade" mode="out-in">
                <div v-if="featured" :key="featured.id" class="featured-section" @click="openPost(featured)">
                    <div class="featured-img-wrap">
                        <img :src="featured.image" :alt="featured.title" class="featured-img" />
                        <div class="featured-overlay"></div>
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
                        <span class="category-tag">{{ categoryLabel(featured.type) }}</span>
                        <h2 class="featured-title">{{ featured.title }}</h2>
                        <p class="featured-excerpt">{{ featured.excerpt }}</p>
                        <div class="featured-meta">
                            <span class="meta-date">{{ featured.date }}</span>
                            <span class="read-more">Leer más →</span>
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
                <article v-for="(post, i) in restPosts" :key="post.id" class="news-card"
                    :class="{ 'card--event': post.type === 'event', 'card--wide': i === 0 }"
                    :style="{ '--delay': `${i * 60}ms` }" @click="openPost(post)">
                    <div class="card-img-wrap">
                        <img :src="post.image" :alt="post.title" class="card-img" />
                        <span class="source-badge source-badge--sm" :class="`source--${post.source}`">
                            <span v-html="sourceIcon(post.source)"></span>
                        </span>
                        <span v-if="post.type === 'event'" class="event-badge event-badge--sm">
                            <span class="event-date-day">{{ post.eventDate?.day }}</span>
                            <span class="event-date-month">{{ post.eventDate?.month }}</span>
                        </span>
                    </div>
                    <div class="card-body">
                        <span class="category-tag category-tag--sm" :class="`type--${post.type}`">
                            {{ categoryLabel(post.type) }}
                        </span>
                        <h3 class="card-title">{{ post.title }}</h3>
                        <p class="card-excerpt">{{ post.excerpt }}</p>
                        <div class="card-meta">
                            <span class="meta-date">{{ post.date }}</span>
                            <span class="card-arrow">→</span>
                        </div>
                    </div>
                </article>
            </transition-group>

            <!-- Empty State -->
            <div v-if="filteredPosts.length === 0" class="empty-state">
                <span class="empty-icon">📭</span>
                <p>No hay contenido en esta categoría aún.</p>
            </div>

            <!-- Load More -->
            <div class="load-more-row" v-if="hasMore">
                <button class="load-more-btn" :class="{ loading: isLoading }" @click="loadMore" :disabled="isLoading">
                    <span v-if="!isLoading">Cargar más</span>
                    <span v-else class="spinner"></span>
                </button>
            </div>

            <div class="page-spacer"></div>

            <!-- Embed Modal -->
            <ion-modal :is-open="showModal" @didDismiss="closeModal" :breakpoints="[0, 0.95]" initial-breakpoint="0.95"
                class="embed-modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="modal-source" :class="`source--${selectedPost?.source}`">
                            <span v-html="sourceIcon(selectedPost?.source || 'allevo')"></span>
                            {{ sourceLabel(selectedPost?.source || 'allevo') }}
                        </span>
                        <button class="close-btn" @click="closeModal">
                            <svg viewBox="0 0 320 512" fill="currentColor">
                                <path d="277.1 238.6L155.7 377.2c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L183.2 156.8 99.8 73.4c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 24.7-9.3 34.3.4L220.3 112.5c4.2 4.2 6.2 10.1 5.4 15.7-.7 5.6-3.7 10.7-8.3 14.2l-73.5 73.5c-4.2 4.2-6.2 10.1-5.4 15.7.7 5.6 3.7 10.7 8.3 14.2l121.3 121.3c9.5 9.5 24.7 9.3 34.3-.4l22.2-22.2c9.4-9.4 9.4-24.6-.2-34.1z"/>
                            </svg>
                        </button>
                    </div>
                    <div class="embed-container" v-if="selectedPost?.embedUrl">
                        <iframe :src="selectedPost.embedUrl" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
                    </div>
                </div>
            </ion-modal>

        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { IonPage, IonContent, IonModal, IonRefresher, IonRefresherContent, IonThumbnail } from '@ionic/vue'

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
    { id: 'all', label: 'Todo', icon: '<svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>' },
    { id: 'allevo', label: 'Allevo', icon: '<svg viewBox="0 0 24 24" fill="var(--c-red)" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
    { id: 'instagram', label: 'Instagram', icon: '<svg viewBox="0 0 24 24" fill="var(--c-ig)" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>' },
    { id: 'facebook', label: 'Facebook', icon: '<svg viewBox="0 0 24 24" fill="var(--c-fb)" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>' },
    { id: 'tiktok', label: 'TikTok', icon: '<svg viewBox="0 0 24 24" fill="var(--c-tt)" width="16" height="16"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/></svg>' },
    { id: 'academia', label: 'Academias', icon: '<svg viewBox="0 0 24 24" fill="var(--c-gold)" width="16" height="16"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>' },
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
        excerpt: 'Un fin de semana perfecto en la tarima: campeão en Físico Clásico 1.71 y 1.68, consolidando su dominio.',
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
        excerpt: 'Ahora Estamos enzona 10 con instalaciones de clase mundial para boxeo y kickboxing.',
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

onMounted(() => {
    page.value = 1
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,400;0,600;0,700;0,900;1,700&family=Barlow:wght@400;500;600&display=swap');

/* ── BASE ────────────────────────────────────────────────────── */
:root {
    --c-bg: #080808;
    --c-surface: #111111;
    --c-surface2: #1a1a1a;
    --c-border: rgba(255, 255, 255, 0.08);
    --c-red: #e63946;
    --c-red-dim: rgba(230, 57, 70, 0.15);
    --c-gold: #c9a84c;
    --c-ig: #e1306c;
    --c-fb: #1877f2;
    --c-tt: #69c9d0;
    --c-text: #ffffff;
    --c-muted: rgba(255, 255, 255, 0.5);
    --f-head: 'Barlow Condensed', sans-serif;
    --f-body: 'Barlow', sans-serif;
    --r: 10px;
}

.noticias-page,
.noticias-content {
    --background: var(--c-bg);
    --color: var(--c-text);
}

/* ── PULL TO REFRESH ─────────────────────────────────────────────── */
ion-refresher {
    background: var(--c-bg);
}

ion-refresher-content {
    --refreshing-spinner-color: var(--c-red);
    --pulling-color: var(--c-muted);
    --成功-color: var(--c-text);
}

:ion-refresher .refresher-reflect {
    background: transparent;
}

/* ── PAGE HEADER ─────────────────────────────────────────────── */
.page-header {
    padding: 48px 20px 32px;
    position: relative;
}

.page-header::before {
    content: 'NEWS';
    position: absolute;
    top: 20px;
    right: -10px;
    font-family: var(--f-head);
    font-size: 7rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.03);
    letter-spacing: -4px;
    pointer-events: none;
    user-select: none;
}

.header-eyebrow {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: var(--f-body);
    font-size: 0.7rem;
    font-weight: 600;
    color: var(--c-red);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 10px;
}

.live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--c-red);
    animation: pulse-dot 1.4s ease-in-out infinite;
}

@keyframes pulse-dot {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.4;
        transform: scale(0.7);
    }
}

.page-title {
    font-family: var(--f-head);
    font-size: clamp(2.8rem, 10vw, 4.5rem);
    font-weight: 900;
    line-height: 0.9;
    text-transform: uppercase;
    letter-spacing: -1px;
    color: var(--c-text);
    margin: 0 0 12px;
}

.page-title em {
    font-style: normal;
    color: var(--c-red);
    -webkit-text-stroke: 1px var(--c-red);
}

.page-subtitle {
    font-family: var(--f-body);
    font-size: 0.85rem;
    color: var(--c-muted);
    margin: 0;
}

/* ── FILTER TABS ─────────────────────────────────────────────── */
.filter-wrapper {
    padding: 0 20px 20px;
}

.filter-scroll {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    scrollbar-width: none;
    padding-bottom: 4px;
}

.filter-scroll::-webkit-scrollbar {
    display: none;
}

.filter-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border-radius: 100px;
    border: 1px solid var(--c-border);
    background: var(--c-surface);
    color: var(--c-muted);
    font-family: var(--f-body);
    font-size: 0.78rem;
    font-weight: 600;
    white-space: nowrap;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
    flex-shrink: 0;
}

.filter-pill .pill-icon {
    display: flex;
    align-items: center;
    font-size: 0.9rem;
}

.filter-pill.active {
    background: var(--c-red);
    border-color: var(--c-red);
    color: #fff;
}

.filter-pill:not(.active):active {
    background: var(--c-surface2);
}

/* ── FEATURED ────────────────────────────────────────────────── */
.featured-section {
    margin: 0 0 24px;
    cursor: pointer;
    position: relative;
}

.featured-img-wrap {
    position: relative;
    height: 260px;
    overflow: hidden;
}

.featured-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center top;
    transition: transform 0.5s ease;
}

.featured-section:active .featured-img {
    transform: scale(1.03);
}

.featured-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom,
            transparent 30%,
            rgba(8, 8, 8, 0.6) 70%,
            var(--c-bg) 100%);
}

.featured-body {
    padding: 0 20px 20px;
    margin-top: -24px;
    position: relative;
    z-index: 1;
}

.featured-title {
    font-family: var(--f-head);
    font-size: clamp(1.4rem, 5vw, 1.9rem);
    font-weight: 900;
    line-height: 1.05;
    color: var(--c-text);
    margin: 8px 0 10px;
    text-transform: uppercase;
}

.featured-excerpt {
    font-family: var(--f-body);
    font-size: 0.82rem;
    color: var(--c-muted);
    line-height: 1.6;
    margin: 0 0 12px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.featured-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.meta-date {
    font-family: var(--f-body);
    font-size: 0.72rem;
    color: var(--c-muted);
    font-weight: 500;
}

.read-more {
    font-family: var(--f-head);
    font-size: 0.85rem;
    font-weight: 700;
    color: var(--c-red);
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

/* ── SOURCE BADGES ───────────────────────────────────────────── */
.source-badge {
    position: absolute;
    top: 14px;
    left: 14px;
    display: flex;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    border-radius: 100px;
    font-family: var(--f-body);
    font-size: 0.7rem;
    font-weight: 700;
    backdrop-filter: blur(8px);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.source-badge--sm {
    padding: 4px 8px;
    font-size: 0;
    top: 10px;
    left: 10px;
}

.source-badge--sm svg {
    width: 12px;
    height: 12px;
}

.source--allevo {
    background: rgba(230, 57, 70, 0.85);
    color: #fff;
}

.source--instagram {
    background: rgba(225, 48, 108, 0.85);
    color: #fff;
}

.source--facebook {
    background: rgba(24, 119, 242, 0.85);
    color: #fff;
}

.source--tiktok {
    background: rgba(0, 0, 0, 0.8);
    color: var(--c-tt);
    border: 1px solid var(--c-tt);
}

.source--academia {
    background: rgba(201, 168, 76, 0.85);
    color: #000;
}

/* ── EVENT BADGE ─────────────────────────────────────────────── */
.event-badge {
    position: absolute;
    top: 14px;
    right: 14px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--c-red);
    color: #fff;
    border-radius: 8px;
    padding: 6px 10px;
    line-height: 1;
    min-width: 48px;
}

.event-badge--sm {
    top: 10px;
    right: 10px;
    padding: 4px 8px;
    border-radius: 6px;
    min-width: 36px;
}

.event-date-day {
    font-family: var(--f-head);
    font-size: 1.4rem;
    font-weight: 900;
}

.event-badge--sm .event-date-day {
    font-size: 1rem;
}

.event-date-month {
    font-family: var(--f-head);
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.85;
}

/* ── CATEGORY TAG ────────────────────────────────────────────── */
.category-tag {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 4px;
    background: var(--c-red-dim);
    color: var(--c-red);
    font-family: var(--f-head);
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

.category-tag--sm {
    font-size: 0.65rem;
    padding: 2px 8px;
}

.type--event {
    background: rgba(230, 57, 70, 0.15);
    color: var(--c-red);
}

.type--social {
    background: rgba(105, 201, 208, 0.15);
    color: var(--c-tt);
}

.type--academia {
    background: rgba(201, 168, 76, 0.15);
    color: var(--c-gold);
}

.type--blog {
    background: rgba(255, 255, 255, 0.08);
    color: var(--c-muted);
}

/* ── SECTION LABEL ───────────────────────────────────────────── */
.section-label {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0 20px 16px;
    font-family: var(--f-head);
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--c-muted);
    letter-spacing: 0.15em;
    text-transform: uppercase;
}

.label-line {
    flex: 1;
    height: 1px;
    background: var(--c-border);
}

/* ── CARDS GRID ──────────────────────────────────────────────── */
.cards-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    padding: 0 20px;
}

/* first card spans full width */
.cards-grid .news-card:first-child {
    grid-column: 1 / -1;
}

.news-card {
    background: var(--c-surface);
    border-radius: var(--r);
    overflow: hidden;
    cursor: pointer;
    border: 1px solid var(--c-border);
    transition: transform 0.2s ease, border-color 0.2s ease;
    animation: cardIn 0.4s ease both;
    animation-delay: var(--delay);
}

@keyframes cardIn {
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.news-card:active {
    transform: scale(0.98);
    border-color: var(--c-red);
}

.card--event {
    border-color: rgba(230, 57, 70, 0.25);
}

/* full-width card: horizontal layout */
.card--wide {
    display: flex;
    flex-direction: row;
}

.card--wide .card-img-wrap {
    width: 140px;
    flex-shrink: 0;
    height: auto;
}

.card--wide .card-img {
    height: 100%;
}

/* regular card: vertical */
.card-img-wrap {
    position: relative;
    height: 130px;
    overflow: hidden;
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
}

.news-card:active .card-img {
    transform: scale(1.05);
}

.card-body {
    padding: 12px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
}

.card-title {
    font-family: var(--f-head);
    font-size: 0.95rem;
    font-weight: 700;
    line-height: 1.15;
    color: var(--c-text);
    text-transform: uppercase;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.card--wide .card-title {
    font-size: 1rem;
    -webkit-line-clamp: 2;
}

.card-excerpt {
    font-family: var(--f-body);
    font-size: 0.75rem;
    color: var(--c-muted);
    line-height: 1.5;
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
    padding-top: 6px;
}

.card-arrow {
    font-family: var(--f-head);
    font-size: 0.9rem;
    color: var(--c-red);
    font-weight: 700;
}

/* ── TRANSITIONS ─────────────────────────────────────────────── */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.card-list-enter-active {
    transition: all 0.35s ease;
}

.card-list-leave-active {
    transition: all 0.2s ease;
    position: absolute;
}

.card-list-enter-from {
    opacity: 0;
    transform: translateY(12px);
}

.card-list-leave-to {
    opacity: 0;
    transform: scale(0.95);
}

/* ── EMPTY STATE ─────────────────────────────────────────────── */
.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 60px 20px;
    gap: 12px;
    color: var(--c-muted);
    font-family: var(--f-body);
    font-size: 0.9rem;
}

.empty-icon {
    font-size: 2.5rem;
}

/* ── LOAD MORE ───────────────────────────────────────────────── */
.load-more-row {
    display: flex;
    justify-content: center;
    padding: 28px 20px 0;
}

.load-more-btn {
    padding: 12px 36px;
    border: 1px solid var(--c-border);
    border-radius: 100px;
    background: transparent;
    color: var(--c-muted);
    font-family: var(--f-head);
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s ease;
    outline: none;
    min-width: 140px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.load-more-btn:active:not(:disabled) {
    background: var(--c-red);
    border-color: var(--c-red);
    color: #fff;
}

.load-more-btn.loading {
    border-color: var(--c-red);
    color: var(--c-red);
}

.spinner {
    width: 18px;
    height: 18px;
    border: 2px solid transparent;
    border-top-color: var(--c-red);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

/* ── EMBED MODAL ─────────────────────────────────────────────────── */
.embed-modal {
    --background: var(--c-bg);
    --border-radius: 16px 16px 0 0;
}

.embed-modal .modal-content {
    height: 90vh;
    display: flex;
    flex-direction: column;
    background: var(--c-bg);
}

.embed-modal .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 1px solid var(--c-border);
    flex-shrink: 0;
}

.embed-modal .modal-source {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 12px;
    border-radius: 100px;
    font-family: var(--f-body);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.embed-modal .modal-source svg {
    width: 14px;
    height: 14px;
}

.embed-modal .close-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--c-surface);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: background 0.2s ease;
}

.embed-modal .close-btn svg {
    width: 16px;
    height: 16px;
    color: var(--c-text);
}

.embed-modal .close-btn:active {
    background: var(--c-surface2);
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

.page-spacer {
    height: 40px;
}
</style>