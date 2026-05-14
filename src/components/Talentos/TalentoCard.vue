<template>
  <RouterLink :to="'/talento/' + talent.slug" class="talento-card">
    <div class="card-img">
      <img :src="talent.image" :alt="talent.name">
      <div class="card-overlay"></div>
      <div class="card-name">{{ talent.aliasDeportivo }}</div>
    </div>
    <div class="card-info">
      <h3>{{ talent.name }}</h3>
      <span class="disciplina">{{ talent.sport }}</span>
      <div class="social-links" v-if="talent.instagram || talent.tiktok">
        <a v-if="talent.instagram" :href="talent.instagram" target="_blank" rel="noopener noreferrer"
          class="social-icon instagram" @click.stop>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>
        <a v-if="talent.tiktok" :href="talent.tiktok" target="_blank" rel="noopener noreferrer"
          class="social-icon tiktok" @click.stop>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
          </svg>
        </a>
      </div>
      <button class="btn-invertir" @click.prevent.stop="$emit('invertir')">
        <ion-icon :icon="trendingUpOutline"></ion-icon>
        Invertir
      </button>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { IonIcon } from '@ionic/vue'
import { trendingUpOutline } from 'ionicons/icons'
import type { Talent } from './talentosData'

defineProps<{
  talent: Talent
}>()

defineEmits<{
  (e: 'invertir'): void
}>()
</script>

<style scoped>
.talento-card {
  display: block;
  position: relative;
  background-color: var(--color-bg);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
  text-decoration: none;
  color: inherit;
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
  font-family: 'Space Grotesk', 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.85);
  letter-spacing: 0.02em;
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

.btn-invertir {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  margin-top: 12px;
  padding: 9px 18px;
  background: var(--color-primary, #EF4444);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-invertir:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

.btn-invertir:active {
  transform: translateY(0) scale(0.98);
}

@media (max-width: 768px) {
  .card-overlay {
    opacity: 1;
    background: linear-gradient(to top, rgba(204, 0, 0, 0.6) 0%, transparent 50%);
  }
  .card-name {
    opacity: 1;
    transform: translateY(0);
  }
  .talento-card:hover {
    transform: translateY(-5px);
  }
}

@media (max-width: 576px) {
  .card-img {
    height: 250px;
  }
  .card-info {
    padding: 16px;
  }
  .card-info h3 {
    font-size: 1rem;
  }
  .disciplina {
    font-size: 0.75rem;
  }
  .btn-invertir {
    padding: 10px 14px;
    font-size: 0.75rem;
    min-height: 40px;
  }
}
</style>
