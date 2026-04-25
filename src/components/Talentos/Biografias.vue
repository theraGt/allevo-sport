<template>
  <section class="biografia-page" v-if="talento">
    <!-- A. Hero Section -->
    <div class="hero-section">
      <div class="hero-image">
        <img :src="talento.fotografiaAccion || talento.fotografiaPerfil" :alt="talento.nombreCompleto" />
        <div class="hero-overlay"></div>
      </div>
      <div class="hero-content">
        <span class="deporte-badge">{{ talento.deporte }}</span>
        <h1 class="nombreAtleta">{{ talento.nombreCompleto }}</h1>
        <p class="alias-deportivo" v-if="talento.aliasDeportivo">{{ talento.aliasDeportivo }}</p>
        <a href="#inversion" class="btn-primary hero-cta" @click.prevent="scrollToInversion">
          Invierte en Mi Carrera
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
          </svg>
        </a>
      </div>
    </div>

    <!-- B. Quick Stats -->
    <div class="quick-stats">
      <div class="container">
        <div class="stats-grid">
          <div class="stat-card">
            <span class="stat-value">{{ talento.edad }}</span>
            <span class="stat-label">Años</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ talento.especialidad }}</span>
            <span class="stat-label">Especialidad</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ calcularExperiencia() }}</span>
            <span class="stat-label">Experiencia</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">{{ talento.rankingActual || 'N/A' }}</span>
            <span class="stat-label">Ranking</span>
          </div>
          <div class="stat-card" v-if="talento.rangoCinturon && talento.rangoCinturon !== 'N/A'">
            <span class="stat-value">{{ talento.rangoCinturon }}</span>
            <span class="stat-label">Rango</span>
          </div>
        </div>
      </div>
    </div>

    <!-- C. Biografía Editorial -->
    <div class="biografia-section">
      <div class="container">
        <div class="bio-content">
          <blockquote class="cita-destacada">
            <svg class="quote-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11 7H7a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H6v2h1a4 4 0 0 0 4-4V7zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7z"/>
            </svg>
            <p>{{ talento.biografia.cita }}</p>
          </blockquote>

          <div class="bio-grid">
            <div class="bio-block">
              <h3>El Origen</h3>
              <p>{{ talento.biografia.origen }}</p>
            </div>
            <div class="bio-block">
              <h3>El Enfoque</h3>
              <p>{{ talento.biografia.enfoque }}</p>
            </div>
            <div class="bio-block">
              <h3>La Visión</h3>
              <p>{{ talento.biografia.vision }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- D. Timeline (Logros) -->
    <div class="palmares-section">
      <div class="container">
        <h2 class="section-title">Logros</h2>
        <div class="timeline">
          <TransitionGroup name="timeline">
            <div 
              v-for="(logro, index) in logrosMostrados" 
              :key="index"
              class="timeline-item"
              :class="{ destacado: logro.destacado }"
            >
              <div class="timeline-marker">
                <svg v-if="logro.destacado" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <div class="timeline-content">
                <span class="timeline-year">{{ logro.anio }}</span>
                <h4 class="timeline-torneo">{{ logro.torneo }}</h4>
                <span class="timeline-posicion" :class="'posicion-' + logro.posicion.toLowerCase()">
                  {{ logro.posicion }}
                </span>
                <span class="timeline-categoria">{{ logro.categoria }}</span>
              </div>
            </div>
          </TransitionGroup>
        </div>
        <div class="timeline-toggle" v-if="talento.logros.length > logrosPorDefecto">
          <button class="btn-primary timeline-btn" @click="toggleLogros">
            {{ mostrandoTodos ? 'Ver menos logros' : 'Ver más logros' }}
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" :style="{ transform: mostrandoTodos ? 'rotate(180deg)' : '' }">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- E. Galería Multimedia -->
    <div class="galeria-section" v-if="talento.galeria && talento.galeria.length">
      <div class="container">
        <h2 class="section-title">Galería</h2>
        <div class="galeria-grid">
          <div 
            v-for="(item, index) in talento.galeria" 
            :key="index"
            class="galeria-item"
            :class="{ 'es-video': item.tipo === 'video' }"
          >
            <img v-if="item.tipo === 'imagen'" :src="item.url" :alt="talento.nombreCompleto" />
            <div v-else class="video-container">
              <video :src="item.url" controls :poster="item.thumbnail"></video>
            </div>
            <div class="galeria-overlay" v-if="item.tipo === 'video'">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- F. Módulo de Inversión -->
    <div class="inversion-section" id="inversion">
      <div class="container">
        <div class="inversion-card">
          <div class="inversion-header">
            <h2>Invierte en {{ talento.nombreCompleto }}</h2>
            <p>Sé parte de su trayectoria hacia la excelencia</p>
            <div class="inversion-avatar">
              <img :src="talento.fotografiaPerfil" :alt="talento.nombreCompleto" />
            </div>
          </div>
          <div class="inversion-content">
            <div class="impacto-grid">
              <div class="impacto-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <h4>Viajes Internacionales</h4>
                <p>Participación en competencias alrededor del mundo</p>
              </div>
              <div class="impacto-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/>
                </svg>
                <h4>Equipo Profesional</h4>
                <p>Equipamiento de alta gama para entrenamiento</p>
              </div>
              <div class="impacto-item">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
                </svg>
                <h4>Suplementación</h4>
                <p>Nutrición deportiva para máximo rendimiento</p>
              </div>
            </div>
            <div class="inversion-cta">
              <span class="nivel-riesgo" :class="'riesgo-' + talento.nivelRiesgo">
                Nivel de Riesgo: {{ getNivelRiesgoLabel(talento.nivelRiesgo) }}
              </span>
              <a href="#contacto" class="btn-primary">
                Invierte en Mi Carrera
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Redes Sociales Flotantes -->
    <div class="social-floating">
      <a v-if="talento.redesSociales.instagram" :href="talento.redesSociales.instagram" target="_blank" class="social-btn instagram">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
      <a v-if="talento.redesSociales.tiktok" :href="talento.redesSociales.tiktok" target="_blank" class="social-btn tiktok">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      </a>
    </div>
  </section>

  <section class="biografia-page not-found" v-else>
    <div class="container">
      <h2>Atleta no encontrado</h2>
      <p>Lo sentimos, el perfil que buscas no existe.</p>
      <a href="/talentos" class="btn-primary">Ver Todos los Atletas</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

interface Logro {
  anio: number
  torneo: string
  posicion: string
  categoria: string
  destacado: boolean
}

interface GaleriaItem {
  tipo: 'imagen' | 'video'
  url: string
  thumbnail?: string
}

interface Biografia {
  cita: string
  origen: string
  enfoque: string
  vision: string
}

interface RedesSociales {
  instagram: string
  tiktok: string
  facebook: string
}

interface Ubicacion {
  ciudad: string
  departamento: string
}

interface TalentProfile {
  id: string
  nombreCompleto: string
  aliasDeportivo: string
  fotografiaPerfil: string
  fotografiaAccion: string
  deporte: string
  especialidad: string
  fechaNacimiento: string
  edad: number
  telefono: string
  email: string
  ubicacion: Ubicacion
  rankingActual: string
  rangoCinturon: string
  mejorMarcaPersonal: string
  clubFederacion: string
  liga?: string
  fechaInicio: number
  redesSociales: RedesSociales
  nivelRiesgo: 'bajo' | 'medio' | 'alto'
  biografia: Biografia
  logros: Logro[]
  galeria: GaleriaItem[]
}

const props = defineProps<{
  slug: string
}>()

const talentosData: Record<string, TalentProfile> = {
  'olivia-serrano': {
    id: 'olivia-serrano',
    nombreCompleto: 'Olivia Serrano',
    aliasDeportivo: 'Miss Oliv',
    fotografiaPerfil: '/assets/images/atletas/olivia-serrano.webp',
    fotografiaAccion: '/assets/images/atletas/olivia-serrano.webp',
    deporte: 'Karate',
    especialidad: 'Formas Creativas y Formas con Armas',
    fechaNacimiento: '2005-01-01',
    edad: 20,
    telefono: '',
    email: '',
    ubicacion: { ciudad: 'Bogotá', departamento: 'Cundinamarca' },
    rankingActual: 'Top 5 Nacional',
    rangoCinturon: 'Cinta Negra',
    mejorMarcaPersonal: 'Múltiple Campeona ISKA y Caciques Battle Tournament',
    clubFederacion: 'Allevo Sports',
    fechaInicio: 2010,
    redesSociales: {
      instagram: 'https://www.instagram.com/olivv_.ss',
      tiktok: 'https://www.tiktok.com/@missoliv9',
      facebook: ''
    },
    nivelRiesgo: 'bajo',
    biografia: {
      cita: 'La disciplina y el esfuerzo constante son la clave del éxito.',
      origen: 'Mi nombre es Olivia Serrano y soy atleta de artes marciales, especializada en formas creativas y formas con armas. Inicié mi camino en el karate desde los 5 años, disciplina que se ha convertido en la base de mi desarrollo personal y deportivo. Me caracterizo por ser una atleta disciplinada, perseverante y comprometida con la mejora continua, formada en las artes marciales bajo valores como el respeto, la constancia y la determinación.',
      enfoque: 'Me distingue la capacidad de fusionar técnica con rapidez, fuerza, precisión y creatividad, destacando en formas creativas y con armas a nivel competitivo. Mi experiencia como instructora me brinda una visión más completa que me impulsa a exigirme aún más.',
      vision: 'Mi objetivo es seguir creciendo como atleta, proyectarme a nivel nacional e internacional y competir en torneos de alto nivel, consolidándome como un referente en las artes marciales y demostrando que la disciplina y el esfuerzo constante son la clave del éxito.'
    },
    logros: [
      { anio: 2025, torneo: 'Caciques Battle Tournament', posicion: '1er Lugar', categoria: 'Forma Creativa', destacado: true },
      { anio: 2025, torneo: 'Battle of Tigers', posicion: '1er Lugar', categoria: 'Forma Creativa', destacado: true },
      { anio: 2024, torneo: 'Caciques Battle Tournament', posicion: '1er Lugar', categoria: 'Forma Creativa', destacado: true },
      { anio: 2024, torneo: 'Circuito ISKA', posicion: '1er Lugar', categoria: 'Forma Creativa', destacado: true },
      { anio: 2023, torneo: 'Circuito ISKA', posicion: '1er Lugar', categoria: 'Forma Creativa', destacado: true },
      { anio: 2020, torneo: 'Bushido Dojo Reyes', posicion: '2do Lugar', categoria: 'Forma Tradicional', destacado: false },
      { anio: 2019, torneo: 'Bushido Dojo Reyes', posicion: '2do Lugar', categoria: 'Forma Tradicional', destacado: false },
      { anio: 2018, torneo: 'Bushido Dojo Reyes', posicion: '2do Lugar', categoria: 'Forma Sincronizada', destacado: false },
      { anio: 2018, torneo: 'Bushido Dojo Reyes', posicion: '1er Lugar', categoria: 'Forma Tradicional', destacado: false },
      { anio: 2011, torneo: 'Copa Quetzal', posicion: '2do Lugar', categoria: 'Combate a Puntos', destacado: false }
    ],
    galeria: []
  },
  'nathan-fino': {
    id: 'nathan-fino',
    nombreCompleto: 'Nathan Fabian Fino Herrera',
    aliasDeportivo: 'Gypsy Nate',
    fotografiaPerfil: '/assets/images/atletas/nathan-fino.webp',
    fotografiaAccion: '/assets/images/atletas/nathan-fino.webp',
    deporte: 'Muay Thai',
    especialidad: 'Peleador profesional de Muay Thai y K1',
    fechaNacimiento: '2004-01-01',
    edad: 21,
    telefono: '',
    email: '',
    ubicacion: { ciudad: 'Bogotá', departamento: 'Cundinamarca' },
    rankingActual: 'Campeón Mundial ISKA',
    rangoCinturon: '3er Kup (Verde)',
    mejorMarcaPersonal: '12 - 2 - 1 | Campeón Mundial ISKA',
    clubFederacion: 'Allevo Sports',
    liga: 'Fairtex',
    fechaInicio: 2015,
    redesSociales: {
      instagram: 'https://www.instagram.com/gypsy.nate/',
      tiktok: 'https://www.tiktok.com/@gypsy.nate',
      facebook: ''
    },
    nivelRiesgo: 'bajo',
    biografia: {
      cita: 'Soy peleador profesional de Muay Thai y K1. Soy campeón mundial de Muay Thai en ISKA e invicto desde 2022.',
      origen: 'Nathan Fabian Fino Herrera, de 21 años, es un peleador profesional de Muay Thai y K1 con una trayectoria impressive en el mundo de las artes marciales mixtas.',
      enfoque: 'Se especializa en Muay Thai y K1, habiendo realizado campamentos de entrenamiento en Hungría y otros países. Su estilo combina técnica depurada con potencia en sus golpeos.',
      vision: 'Como campeón mundial de Muay Thai en ISKA e invicto desde 2022, busca continuar su ascenso en el ranking internacional y representar a Colombia en los escenarios más prestigiosos del kickboxing mundial.'
    },
    logros: [
      { anio: 2024, torneo: 'Campeón Mundial ISKA', posicion: '1er Lugar', categoria: 'Muay Thai', destacado: true },
      { anio: 2023, torneo: 'Circuito Nacional de Muay Thai', posicion: '2do Lugar', categoria: 'Peso Welter', destacado: false },
      { anio: 2022, torneo: 'Invicto desde 2022', posicion: 'Campeón', categoria: 'Muay Thai', destacado: true }
    ],
    galeria: []
  },
  'camilo-pinzon': {
    id: 'camilo-pinzon',
    nombreCompleto: 'Camilo Pinzón',
    aliasDeportivo: 'Camilo Fitness',
    fotografiaPerfil: '/assets/images/atletas/camilo-pinzon.webp',
    fotografiaAccion: '/assets/images/atletas/camilo-pinzon.webp',
    deporte: 'Fisicoculturismo',
    especialidad: 'Classic Physique (Físico Clásico)',
    fechaNacimiento: '2004-01-11',
    edad: 22,
    telefono: '',
    email: '',
    ubicacion: { ciudad: 'Bucaramanga', departamento: 'Guatemala' },
    rankingActual: 'Campeón Nacional',
    rangoCinturon: 'N/A',
    mejorMarcaPersonal: 'Campeón Nacional | Señor Guatemala',
    clubFederacion: 'Allevo Sports',
    fechaInicio: 2018,
    liga: 'Juegos Deportivos Juveniles | Señor Guatemala',
    redesSociales: {
      instagram: 'https://www.instagram.com/camilofitness.11/',
      tiktok: 'https://www.tiktok.com/@camilofitness.11?lang=es-419',
      facebook: ''
    },
    nivelRiesgo: 'bajo',
    biografia: {
      cita: 'Somos arquitectos de nuestra propia realidad. No existe sueño, meta o proyecto que no puedas lograr si das tu 100 %, y este año daré mi 1000 % en todos los proyectos que se vienen.',
      origen: 'Mi nombre es Camilo Pinzón. Nací el 11/01/2004 en Bucaramanga, Colombia. Desde muy pequeño me ha gustado mucho el deporte y la actividad física, especialmente el fútbol, el baloncesto y el voleibol. Con el tiempo, desarrollé un gran amor por el fitness y el entrenamiento físico en todas sus ramas.',
      enfoque: 'Competo en fisicoculturismo en la categoría de Classic Physique (Físico Clásico). Me gusta subir videos y compartir el proceso de mis competencias; mi intención es transmitir buenos valores y dar a entender que debemos creernos capaces de todo lo que imaginamos.',
      vision: 'Mi objetivo es seguir compitiendo a nivel internacional, motivar a otros a transformar sus vidas a través del deporte y demostrar que con dedicación y esfuerzo cualquier meta es alcanzable.'
    },
    logros: [
      { anio: 2024, torneo: 'Señor Guatemala', posicion: '1er Lugar', categoria: 'Físico Clásico 1.68', destacado: true },
      { anio: 2024, torneo: 'Juegos Nacionales', posicion: '1er Lugar', categoria: 'Físico Clásico 1.71', destacado: true },
      { anio: 2024, torneo: 'Señor Antigua', posicion: '1er Lugar', categoria: 'Ciudad Vieja', destacado: true },
      { anio: 2024, torneo: 'Regional', posicion: '3er Lugar', categoria: 'Antigua Guatemala', destacado: false }
    ],
    galeria: []
  },
  'katherine-portt': {
    id: 'katherine-portt',
    nombreCompleto: 'Katherine Portt',
    aliasDeportivo: 'La Barbie',
    fotografiaPerfil: '/assets/images/atletas/katherine-portt.webp',
    fotografiaAccion: '/assets/images/atletas/katherine-portt.webp',
    deporte: 'Kickboxing',
    especialidad: 'Kickboxing',
    fechaNacimiento: '2004-01-01',
    edad: 21,
    telefono: '',
    email: '',
    ubicacion: { ciudad: 'Bogotá', departamento: 'Cundinamarca' },
    rankingActual: 'Campeona Nacional WKC',
    rangoCinturon: '2do Kup (Azul)',
    mejorMarcaPersonal: 'Medalla de Plata Panamericanos WKC | Campeona Nacional WKC 2019-2021',
    clubFederacion: 'Allevo Sports',
    fechaInicio: 2014,
    liga: 'UCC',
    redesSociales: {
      instagram: 'https://www.instagram.com/katherineportt/',
      tiktok: 'https://www.tiktok.com/@katherineportt_?lang=es',
      facebook: ''
    },
    nivelRiesgo: 'bajo',
    biografia: {
      cita: 'La fuerza no viene del cuerpo, viene del corazón.',
      origen: 'Katherine Portt, "La Barbie", es una competidora activa a alto rendimiento desde hace 11 años. Ha representado a Colombia en múltiples competencias internacionales.',
      enfoque: 'Se especializa en kickboxing con un estilo agresivo de patadas potentes y combos rápidos que desorientan a sus rivales.',
      vision: 'Buscar seguir representando a Colombia en eventos internacionales y convertirse en una atleta profesional de élite.'
    },
    logros: [
      { anio: 2019, torneo: 'Panamericanos WKC', posicion: 'Medalla de Plata', categoria: 'Kickboxing', destacado: true },
      { anio: 2021, torneo: 'Campeona Nacional WKC', posicion: '1er Lugar', categoria: 'Kickboxing', destacado: true },
      { anio: 2020, torneo: 'Campeona Nacional WKC', posicion: '1er Lugar', categoria: 'Kickboxing', destacado: true },
      { anio: 2019, torneo: 'Campeona Nacional WKC', posicion: '1er Lugar', categoria: 'Kickboxing', destacado: true },
      { anio: 2020, torneo: 'Campeona Intercolegios WKC', posicion: '1er Lugar', categoria: 'Kickboxing', destacado: true },
      { anio: 2019, torneo: 'Campeona Intercolegios WKC', posicion: '1er Lugar', categoria: 'Kickboxing', destacado: false },
      { anio: 2018, torneo: 'Campeona Intercolegios WKC', posicion: '1er Lugar', categoria: 'Kickboxing', destacado: false }
    ],
    galeria: []
  },
  'mario-quino': {
    id: 'mario-quino',
    nombreCompleto: 'Mario Quino',
    aliasDeportivo: 'The Skark',
    fotografiaPerfil: '/assets/images/atletas/mario-quino.webp',
    fotografiaAccion: '/assets/images/atletas/mario-quino.webp',
    deporte: 'Kickboxing',
    especialidad: 'Golpes y Clinch',
    fechaNacimiento: '1992-11-25',
    edad: 35,
    telefono: '',
    email: '',
    ubicacion: { ciudad: 'Bogotá', departamento: 'Cundinamarca' },
    rankingActual: 'Top 3 Nacional',
    rangoCinturon: '1er Dan (Negro)',
    mejorMarcaPersonal: '7 - 0 - 3',
    clubFederacion: 'Allevo Sports',
    fechaInicio: 2010,
    liga: 'K1',
    redesSociales: {
      instagram: 'https://www.instagram.com/the_shark_quino/',
      tiktok: 'https://www.tiktok.com/@the_skark_quino',
      facebook: ''
    },
    nivelRiesgo: 'bajo',
    biografia: {
      cita: 'Soy alguien que vive con Dios y para Dios. Estoy muy lejos de donde empecé, agradecido por cada paso avanzado, pero también consciente de que aún queda mucho camino por recorrrer.',
      origen: 'Mario Quino es alguien que ha experimentado cambios físicos y mentales que han transformado por completo su manera de ver la vida. Valora profundamente la puntualidad y la disciplina.',
      enfoque: 'Su estilo combina un excellent trabajo de pies con golpes devastadores y un clinch efectivo. Se caracteriza por su orden y constancia.',
      vision: 'Seguir adelante con fe, humildad y determinación, confiando plenamente en que Dios guía cada etapa del proceso. Continuar siendo un referente del kickboxing en Colombia y formar nuevos talentos.'
    },
    logros: [
      { anio: 2024, torneo: 'Circuito Nacional', posicion: '1er Lugar', categoria: 'Peso Semipesado', destacado: true },
      { anio: 2023, torneo: 'Copa Colombia', posicion: '1er Lugar', categoria: 'Peso Semipesado', destacado: true }
    ],
    galeria: []
  },
  'carlos-lopez': {
    id: 'carlos-lopez',
    nombreCompleto: 'Carlos Alberto López',
    aliasDeportivo: 'Profesor López',
    fotografiaPerfil: '/assets/images/atletas/carlos-lopez.webp',
    fotografiaAccion: '/assets/images/atletas/carlos-lopez.webp',
    deporte: 'Boxeo',
    especialidad: 'Coaching de Boxeo',
    fechaNacimiento: '1965-01-01',
    edad: 60,
    telefono: '',
    email: '',
    ubicacion: { ciudad: 'Guatemala', departamento: 'Guatemala' },
    rankingActual: 'Director Técnico Federación Nacional de Boxeo',
    rangoCinturon: 'N/A',
    mejorMarcaPersonal: '3 veces Campeón Nacional Categoría Mosca',
    clubFederacion: 'Allevo Sports | Federación de Boxeo',
    fechaInicio: 1985,
    redesSociales: {
      instagram: '',
      tiktok: '',
      facebook: ''
    },
    nivelRiesgo: 'bajo',
    biografia: {
      cita: 'El mejor investimento es en ti mismo.',
      origen: 'Profesor Carlos López inició su carrera en el boxeo a los 20 años, logrando ser campeón nacional categoría Mosca en tres ocasiones. Más adelante se consolidó como entrenador, ocupando cargos importantes como la Dirección de la Federación de Boxeo y formando parte del desarrollo del boxeo femenino en Guatemala.',
      enfoque: 'A lo largo de su trayectoria ha trabajado con atletas de alto rendimiento, medallistas y procesos de formación a nivel nacional e internacional. También ha participado en la esquina del campeón Lester Martínez y en K1 Combat Challenge. Actualmente continúa capacitándose en nuevas tecnologías de entrenamiento.',
      vision: 'Continuar formantdo nuevos campeones y contribuyendo al desarrollo del boxeo a nivel nacional e internacional.'
    },
    logros: [
      { anio: 2024, torneo: 'Campeonato Mundial Masculino Tashkent', posicion: 'Entrenador', categoria: 'Mundial', destacado: true },
      { anio: 2016, torneo: 'Serie Mundial Boxeo Masculino Argelia', posicion: 'Entrenador', categoria: 'Internacional', destacado: true },
      { anio: 2016, torneo: 'Campeonato Mundial Femenino Taped China', posicion: 'Entrenador', categoria: 'Mundial', destacado: true },
      { anio: 2015, torneo: 'Campeonato Mundial Femenino Bern China', posicion: 'Entrenador', categoria: 'Mundial', destacado: true },
      { anio: 2014, torneo: 'Campeonato Mundial Jeju Korea del Sur', posicion: 'Entrenador', categoria: 'Mundial', destacado: true },
      { anio: 2014, torneo: 'Campeonato Mundial Juvenil Masculino Sofia Bulgaria', posicion: 'Entrenador', categoria: 'Mundial', destacado: true },
      { anio: 2013, torneo: 'Campeonato Mundial Femenino Turquía', posicion: 'Entrenador', categoria: 'Mundial', destacado: true },
      { anio: 1996, torneo: 'Torneo Pre-Olímpico Atlanta 1996 Halifax', posicion: 'Entrenador', categoria: 'Pre-Olímpico', destacado: true },
      { anio: 1995, torneo: 'IV Campeonato Centroamericano San José Costa Rica', posicion: '1er Lugar por equipos', categoria: 'Centroamericano', destacado: true },
      { anio: 1994, torneo: 'V Juegos Centroamericanos El Salvador', posicion: 'Campeón por equipos', categoria: 'Centroamericano', destacado: true },
      { anio: 1988, torneo: 'Juegos Panamericanos', posicion: 'Entrenador', categoria: 'Panamericano', destacado: true },
      { anio: 1987, torneo: 'III Festival Olímpico Mexicano Querétaro', posicion: '3er Lugar por equipos', categoria: 'Internacional', destacado: true },
      { anio: 1987, torneo: 'Campeonato Centroamericano y del Caribe San José Costa Rica', posicion: 'Entrenador', categoria: 'Centroamericano', destacado: true },
      { anio: 1985, torneo: 'III Juegos Centroamericanos por la Paz', posicion: '1er Lugar por equipos', categoria: 'Centroamericano', destacado: true },
      { anio: 1984, torneo: 'Juegos Olímpicos Ángeles', posicion: 'Entrenador de Carlos Motta', categoria: 'Olímpico', destacado: true },
      { anio: 1982, torneo: 'XIV Juegos Centroamericanos y del Caribe Habana Cuba', posicion: 'Medalla de Bronce', categoria: 'Centroamericano', destacado: true },
      { anio: 1982, torneo: 'Gira por México', posicion: 'Equipo invicto', categoria: 'Internacional', destacado: true },
      { anio: 1984, torneo: 'Guantes de Oro', posicion: 'Entrenador Selección A y B', categoria: 'Nacional', destacado: false },
      { anio: 1985, torneo: 'Guantes de Oro', posicion: 'Entrenador Selección A y B', categoria: 'Nacional', destacado: false },
      { anio: 1986, torneo: 'Guantes de Oro', posicion: 'Entrenador Selección A y B', categoria: 'Nacional', destacado: false },
      { anio: 1987, torneo: 'Guantes de Oro', posicion: 'Entrenador Selección A y B', categoria: 'Nacional', destacado: false },
      { anio: 1988, torneo: 'Guantes de Oro', posicion: 'Entrenador Selección A y B', categoria: 'Nacional', destacado: false },
      { anio: 1989, torneo: 'Guantes de Oro', posicion: 'Entrenador Selección A y B', categoria: 'Nacional', destacado: false },
      { anio: 1973, torneo: 'Campeonato Nacional', posicion: 'Nominado Más Técnico', categoria: 'Nacional', destacado: false },
      { anio: 1982, torneo: 'Campeón Nacional Categoría Mosca', posicion: '1er Lugar', categoria: 'Nacional', destacado: true },
      { anio: 1983, torneo: 'Campeón Nacional Categoría Mosca', posicion: '1er Lugar', categoria: 'Nacional', destacado: true },
      { anio: 1984, torneo: 'Campeón Nacional Categoría Mosca', posicion: '1er Lugar', categoria: 'Nacional', destacado: true }
    ],
    galeria: []
  },
  'daniel-lopez': {
    id: 'daniel-lopez',
    nombreCompleto: 'Daniel López',
    aliasDeportivo: 'Dani López',
    fotografiaPerfil: '/assets/images/atletas/daniel-lopez.webp',
    fotografiaAccion: '/assets/images/atletas/daniel-lopez.webp',
    deporte: 'Calistenia',
    especialidad: 'Endurance/Resistencia',
    fechaNacimiento: '2004-01-01',
    edad: 21,
    telefono: '',
    email: '',
    ubicacion: { ciudad: 'Bogotá', departamento: 'Cundinamarca' },
    rankingActual: 'Subcampéon Centroamericano',
    rangoCinturon: 'N/A',
    mejorMarcaPersonal: '1,001 Muscle Up en 9 horas 39 minutos',
    clubFederacion: 'Allevo Sports',
    fechaInicio: 2016,
    liga: 'StreetWorkout',
    redesSociales: {
      instagram: 'https://www.instagram.com/dani.lopez_c',
      tiktok: 'https://www.tiktok.com/@danielp8754',
      facebook: ''
    },
    nivelRiesgo: 'bajo',
    biografia: {
      cita: 'Mi enfoque está en inspirar a otros a entrenar con disciplina, ciencia y constancia.',
      origen: 'Soy un atleta de calistenia de la rama de Endurance/Resistencia. Comencé entrenando en casa y en parques públicos pero con los años fui especializándome en el rendimiento deportivo.',
      enfoque: 'Hoy en día entreno a personas que desean aprender y compito a nivel nacional e internacional. Me especializo en resistencia y endurance.',
      vision: 'Continuar inspirando a otros a entrenar con disciplina, ciencia y constancia. Consolidarme como referente en la calistenia de resistencia a nivel internacional.'
    },
    logros: [
      { anio: 2025, torneo: 'WSWCF Calisthenics Regional Games', posicion: 'Subcampéon Centroamericano', categoria: 'Calisthenics', destacado: true },
      { anio: 2025, torneo: 'Torneo Nacional de Calistenia', posicion: 'Subcampéon Nacional', categoria: 'Calistenia', destacado: true },
      { anio: 2025, torneo: 'Reto Jaguar Endurance Online', posicion: 'Ganador', categoria: 'Endurance', destacado: true },
      { anio: 2025, torneo: 'Calisthenics Battle', posicion: 'Ganador', categoria: 'Batalla', destacado: true },
      { anio: 2024, torneo: 'WSWCF Calisthenics Regional Games', posicion: 'Top 20', categoria: 'Centroamericano', destacado: true },
      { anio: 2023, torneo: 'Campeonato Nacional de Fuerza y Resistencia', posicion: '3er Lugar', categoria: 'Resistencia', destacado: false },
      { anio: 2023, torneo: 'BPM Games', posicion: '2do Lugar', categoria: 'General', destacado: false },
      { anio: 2023, torneo: 'Festival de la Juventud', posicion: '2do Lugar', categoria: 'Max Reps', destacado: false }
    ],
    galeria: []
  }
}

const talento = computed(() => talentosData[props.slug])

const logrosPorDefecto = 5
const logrosVisibles = ref(logrosPorDefecto)

const logrosMostrados = computed(() => {
  if (!talento.value) return []
  return talento.value.logros.slice(0, logrosVisibles.value)
})

const mostrandoTodos = computed(() => {
  if (!talento.value) return false
  return logrosVisibles.value >= talento.value.logros.length
})

const toggleLogros = () => {
  if (!talento.value) return
  logrosVisibles.value = mostrandoTodos.value
    ? logrosPorDefecto
    : talento.value.logros.length
}

const scrollToInversion = () => {
  const el = document.getElementById('inversion')
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const calcularExperiencia = () => {
  if (!talento.value) return 'N/A'
  const anioInicio = talento.value.fechaInicio
  const anioActual = new Date().getFullYear()
  const experiencia = anioActual - anioInicio
  return `Desde los ${talento.value.edad - experiencia} años`
}

const getNivelRiesgoLabel = (nivel: string) => {
  const labels: Record<string, string> = {
    bajo: 'Bajo',
    medio: 'Medio',
    alto: 'Alto'
  }
  return labels[nivel] || 'N/A'
}
</script>

<style scoped>
.biografia-page {
  min-height: 100vh;
  background-color: #0b0b0b;
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  color: #ffffff;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  text-transform: uppercase;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;
  letter-spacing: 0.05em;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--color-primary, #CF2E2E), rgba(207, 46, 46, 0.5));
  border-radius: 2px;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}

.hero-image {
  position: absolute;
  inset: 0;
}

.hero-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.6) 40%,
    rgba(0, 0, 0, 0.3) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.deporte-badge {
  display: inline-block;
  padding: 8px 20px;
  background: linear-gradient(90deg, var(--color-primary, #CF2E2E), rgba(207, 46, 46, 0.7));
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.nombreAtleta {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
  text-transform: uppercase;
  line-height: 1;
  margin: 0 0 10px;
  letter-spacing: 0.02em;
}

.alias-deportivo {
  font-size: 1.5rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 20px;
}

.cinturon {
  margin-top: 20px;
}

.hero-cta {
  margin-top: 20px;
  font-size: 1rem;
  padding: 16px 32px;
}

.hero-cta svg {
  transition: transform 0.3s ease;
}

.hero-cta:hover svg {
  transform: translateX(4px);
}

@media (prefers-reduced-motion: reduce) {
  .hero-cta svg,
  .hero-cta:hover svg {
    transform: none;
    transition: none;
  }
}

/* Quick Stats */
.quick-stats {
  background: linear-gradient(180deg, #0b0b0b 0%, #151515 100%);
  padding: 40px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 20px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 25px 20px;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
}

.stat-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(207, 46, 46, 0.12), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.stat-card:hover {
  background: rgba(207, 46, 46, 0.1);
  border-color: rgba(207, 46, 46, 0.35);
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(207, 46, 46, 0.2);
}

.stat-card:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .stat-card:hover {
    transform: none;
  }
}

.stat-value {
  display: block;
  font-family: 'Oswald', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary, #CF2E2E);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.timeline-toggle {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.timeline-btn svg {
  transition: transform 0.3s ease;
}

/* Vue TransitionGroup */
.timeline-enter-active,
.timeline-leave-active {
  transition: all 0.4s ease;
}

.timeline-enter-from,
.timeline-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.timeline-move {
  transition: transform 0.4s ease;
}

@media (prefers-reduced-motion: reduce) {
  .timeline-enter-active,
  .timeline-leave-active,
  .timeline-move {
    transition: none;
  }
  .timeline-enter-from,
  .timeline-leave-to {
    opacity: 1;
    transform: none;
  }
}

/* Biografía Section */
.biografia-section {
  padding: 80px 0;
  background: #0b0b0b;
}

.bio-content {
  max-width: 900px;
  margin: 0 auto;
}

.cita-destacada {
  position: relative;
  background: linear-gradient(135deg, rgba(207, 46, 46, 0.08), rgba(207, 46, 46, 0.03));
  border-left: 4px solid var(--color-primary, #CF2E2E);
  padding: 30px 40px;
  margin-bottom: 50px;
  border-radius: 0 12px 12px 0;
}

.quote-icon {
  position: absolute;
  top: -15px;
  left: 20px;
  width: 40px;
  height: 40px;
  color: var(--color-primary, #CF2E2E);
  opacity: 0.5;
}

.cita-destacada p {
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 500;
  font-style: italic;
  color: #ffffff;
  margin: 0;
  line-height: 1.6;
}

.bio-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.bio-block h3 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--color-primary, #CF2E2E);
  text-transform: uppercase;
  margin-bottom: 15px;
  letter-spacing: 1px;
}

.bio-block p {
  font-size: 0.95rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
}

/* Palmares Section */
.palmares-section {
  padding: 80px 0;
  background: #151515;
}

.timeline {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, var(--color-primary, #CF2E2E), rgba(207, 46, 46, 0.2));
}

.timeline-item {
  position: relative;
  padding-left: 60px;
  padding-bottom: 30px;
}

.timeline-item:last-child {
  padding-bottom: 0;
}

.timeline-marker {
  position: absolute;
  left: 8px;
  top: 0;
  width: 26px;
  height: 26px;
  background: #151515;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.timeline-marker svg {
  width: 14px;
  height: 14px;
  color: #FFD700;
  display: none;
}

.timeline-item.destacado .timeline-marker {
  border-color: var(--color-primary, #CF2E2E);
  background: var(--color-primary, #CF2E2E);
}

.timeline-item.destacado .timeline-marker svg {
  display: block;
  color: #ffffff;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
  position: relative;
}

.timeline-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(207, 46, 46, 0.08), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.timeline-item.destacado .timeline-content {
  background: linear-gradient(135deg, rgba(207, 46, 46, 0.12), rgba(207, 46, 46, 0.04));
  border-color: rgba(207, 46, 46, 0.25);
}

.timeline-content:hover {
  transform: translateX(10px);
  border-color: rgba(207, 46, 46, 0.35);
  box-shadow: 0 15px 35px rgba(207, 46, 46, 0.15);
}

.timeline-content:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .timeline-content:hover {
    transform: none;
  }
}

.timeline-year {
  display: inline-block;
  background: var(--color-primary, #CF2E2E);
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 10px;
}

.timeline-torneo {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 8px;
  letter-spacing: 0.02em;
}

.timeline-posicion {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-right: 10px;
}

.timeline-posicion.posicion-1er-lugar,
.timeline-posicion.posicion-1 {
  background: #FFD700;
  color: #000;
}

.timeline-posicion.posicion-2do-lugar,
.timeline-posicion.posicion-2 {
  background: #C0C0C0;
  color: #000;
}

.timeline-posicion.posicion-3er-lugar,
.timeline-posicion.posicion-3 {
  background: #CD7F32;
  color: #000;
}

.timeline-categoria {
  display: block;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 5px;
}

/* Galería Section */
.galeria-section {
  padding: 80px 0;
  background: #0b0b0b;
}

.galeria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.galeria-item {
  position: relative;
  aspect-ratio: 4 / 3;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
}

.galeria-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.galeria-item:hover img {
  transform: scale(1.1);
}

@media (prefers-reduced-motion: reduce) {
  .galeria-item:hover img {
    transform: none;
  }
}

.galeria-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.galeria-item:hover .galeria-overlay {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .galeria-item .galeria-overlay {
    opacity: 1;
  }
}

.galeria-overlay svg {
  width: 60px;
  height: 60px;
  color: #ffffff;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Inversión Section */
.inversion-section {
  padding: 80px 0;
  background: linear-gradient(180deg, #151515 0%, #0b0b0b 100%);
}

.inversion-card {
  background: linear-gradient(135deg, rgba(207, 46, 46, 0.08), rgba(21, 21, 21, 1));
  border: 1px solid rgba(207, 46, 46, 0.2);
  border-radius: 20px;
  padding: 50px;
}

.inversion-header {
  text-align: center;
  margin-bottom: 40px;
}

.inversion-header h2 {
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  margin: 0 0 10px;
  letter-spacing: 0.03em;
}

.inversion-header p {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.inversion-avatar {
  width: 120px;
  height: 120px;
  margin: 20px auto 0;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--color-primary, #CF2E2E);
  box-shadow: 0 0 20px rgba(207, 46, 46, 0.35);
}

.inversion-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.impacto-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.impacto-item {
  text-align: center;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
}

.impacto-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(207, 46, 46, 0.1), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.impacto-item:hover {
  background: rgba(207, 46, 46, 0.08);
  transform: translateY(-5px);
  border-color: rgba(207, 46, 46, 0.35);
  box-shadow: 0 15px 35px rgba(207, 46, 46, 0.2);
}

.impacto-item:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .impacto-item:hover {
    transform: none;
  }
}

.impacto-item svg {
  width: 50px;
  height: 50px;
  color: var(--color-primary, #CF2E2E);
  margin-bottom: 20px;
}

.impacto-item h4 {
  font-family: 'Oswald', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 10px;
  letter-spacing: 0.02em;
}

.impacto-item p {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
  line-height: 1.5;
}

.inversion-cta {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.nivel-riesgo {
  padding: 8px 20px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.nivel-riesgo.riesgo-bajo {
  background: rgba(76, 175, 80, 0.2);
  color: #4CAF50;
}

.nivel-riesgo.riesgo-medio {
  background: rgba(255, 193, 7, 0.2);
  color: #FFC107;
}

.nivel-riesgo.riesgo-alto {
  background: rgba(244, 67, 54, 0.2);
  color: #F44336;
}

/* Social Floating */
.social-floating {
  position: fixed;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.social-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.social-btn svg {
  width: 24px;
  height: 24px;
}

.social-btn.instagram {
  background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
  color: white;
}

.social-btn.tiktok {
  background: #000000;
  color: white;
}

.social-btn:hover {
  transform: scale(1.1);
}

@media (prefers-reduced-motion: reduce) {
  .social-btn:hover {
    transform: none;
  }
}

/* Not Found */
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
}

.not-found h2 {
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  margin-bottom: 10px;
  letter-spacing: 0.03em;
}

.not-found p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 30px;
}

/* Responsive */
@media (max-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .bio-grid {
    grid-template-columns: 1fr;
  }

  .impacto-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: 500px;
  }

  .nombreAtleta {
    font-size: 2.5rem;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .hero-cta {
    font-size: 0.9rem;
    padding: 14px 24px;
  }

  .stat-card {
    padding: 20px 15px;
  }

  .stat-value {
    font-size: 1.2rem;
  }

  .cita-destacada p {
    font-size: 1.1rem;
  }

  .inversion-card {
    padding: 30px 20px;
  }

  .social-floating {
    right: 10px;
  }

  .social-btn {
    width: 44px;
    height: 44px;
  }
}

@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .timeline::before {
    left: 10px;
  }

  .timeline-item {
    padding-left: 40px;
  }

  .timeline-marker {
    left: -2px;
  }
}
</style>
