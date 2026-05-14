<template>
  <div class="cuerpo-evento">
    <div v-if="noticia" class="cuerpo-content">
      <div v-if="noticia.portada_url" class="preview-portada">
        <img :src="noticia.portada_url" :alt="noticia.titulo" />
      </div>
      
      <h3 class="preview-title">{{ noticia.titulo }}</h3>
      
      <p class="preview-extracto">{{ noticia.extracto }}</p>
      
      <a 
        v-if="noticia.link_original" 
        :href="noticia.link_original" 
        target="_blank" 
        class="preview-link"
      >
        Ver fuente original ↗
      </a>
      
      <div class="preview-body">
        <div 
          v-for="bloque in noticia.cuerpo" 
          :key="bloque.id" 
          :class="'preview-' + bloque.tipo"
        >
          <h4 v-if="bloque.tipo === 'subtitulo'">{{ bloque.contenido }}</h4>
          <p v-else-if="bloque.tipo === 'parrafo'">{{ bloque.contenido }}</p>
          <img v-else-if="bloque.tipo === 'imagen'" :src="bloque.contenido" alt="" />
          <blockquote v-else-if="bloque.tipo === 'cita'">{{ bloque.contenido }}</blockquote>
        </div>
      </div>
    </div>
    
    <div v-else class="cuerpo-empty">
      <p>No hay contenido disponible</p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NoticiaCuerpo {
  id: string
  noticia_id: string
  tipo: 'subtitulo' | 'parrafo' | 'imagen' | 'cita'
  contenido: string
  orden: number
}

interface Noticia {
  id: string
  titulo: string
  extracto: string
  portada_url: string
  link_original: string
  cuerpo: NoticiaCuerpo[]
}

defineProps<{
  noticia: Noticia | null
}>()
</script>

<style scoped>
.cuerpo-evento {
  --c-bg: #0b0b0b;
  --c-surface: #151515;
  --c-surface2: #1a1a1a;
  --c-border: rgba(255, 255, 255, 0.08);
  --c-red: #CF2E2E;
  --c-text: #ffffff;
  --c-muted: rgba(255, 255, 255, 0.6);
  --f-head: 'Oswald', system-ui, sans-serif;
  --f-body: 'Inter', system-ui, sans-serif;
  --r: 16px;
  
  background: var(--c-bg);
  color: var(--c-text);
  padding: 0;
  height: 100vh;
  overflow-y: auto;
}

.cuerpo-content {
  padding: 24px;
}

.preview-portada {
  margin: 0 -24px 20px;
  overflow: hidden;
}

.preview-portada img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.preview-title {
  font-family: var(--f-head);
  font-size: 1.5rem;
  font-weight: 900;
  line-height: 1.2;
  text-transform: uppercase;
  margin: 0 0 16px;
  color: var(--c-text);
}

.preview-extracto {
  font-family: var(--f-body);
  font-size: 1rem;
  color: var(--c-muted);
  line-height: 1.6;
  margin: 0 0 16px;
}

.preview-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--c-red);
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-family: var(--f-body);
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 24px;
  transition: all 0.2s ease;
}

.preview-link:hover {
  background: #b32424;
  transform: translateY(-1px);
}

.preview-body {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.preview-body h4 {
  font-family: var(--f-head);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--c-red);
  margin: 0 0 8px;
  text-transform: uppercase;
}

.preview-body p {
  font-family: var(--f-body);
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.7;
  margin: 0;
}

.preview-body img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: var(--r);
}

.preview-body blockquote {
  font-family: var(--f-body);
  font-size: 1rem;
  font-style: italic;
  color: var(--c-muted);
  border-left: 4px solid var(--c-red);
  padding-left: 16px;
  margin: 16px 0;
  background: var(--c-surface);
  padding: 16px;
  border-radius: 0 8px 8px 0;
}

.cuerpo-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  color: var(--c-muted);
  font-family: var(--f-body);
}

@media (max-width: 768px) {
  .cuerpo-content {
    padding: 16px;
  }

  .preview-portada {
    margin: 0 -16px 20px;
  }

  .preview-title {
    font-size: 1.2rem;
  }

  .preview-portada img {
    height: 100%;
    object-fit: cover;
  }
}
</style>