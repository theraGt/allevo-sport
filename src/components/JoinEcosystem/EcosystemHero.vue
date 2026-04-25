<template>
  <section class="ecosystem-hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
    </div>

    <div class="hero-content">
      <div class="hero-badge" v-reveal="'fade-in'">
        <span class="pulse-dot"></span>
        ÚNETE AL ECOSISTEMA
      </div>

      <h1 class="hero-title" v-reveal="'fade-up'">
        TRANSFORMA TU <span class="highlight">FUTURO</span> DEPORTIVO
      </h1>

      <p class="hero-subtitle" v-reveal="'fade-up'">
        Sé parte de la revolución de los activos digitales deportivos en Guatemala y Latinoamérica
      </p>

      <div class="hero-stats" v-reveal="'fade-up'">
        <div class="stat-item">
          <div class="stat-number">500+</div>
          <div class="stat-label">ATLETAS TOKENIZADOS</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">2,000+</div>
          <div class="stat-label">INVERSIONISTAS ACTIVOS</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-number">Q12K</div>
          <div class="stat-label">PROMEDIO MENSUAL</div>
        </div>
      </div>

      <div class="hero-testimonials" v-reveal="'fade-up'">
        <div
          v-for="(t, i) in testimonials"
          :key="t.name"
          class="testimonial-card"
          :style="{ '--delay': (0.1 + i * 0.1) + 's' }"
        >
          <div class="testimonial-avatar">
            <img :src="t.avatar" :alt="t.name" loading="lazy" />
          </div>
          <p class="testimonial-quote">"{{ t.quote }}"</p>
          <div class="testimonial-author">{{ t.name }}</div>
          <div class="testimonial-role">{{ t.role }}</div>
        </div>
      </div>

      <div class="hero-badges" v-reveal="'fade-up'">
        <div class="benefit-badge">
          <ion-icon :icon="checkmarkCircleOutline" class="badge-icon"></ion-icon>
          Sin costo de registro
        </div>
        <div class="benefit-badge">
          <ion-icon :icon="checkmarkCircleOutline" class="badge-icon"></ion-icon>
          Comisión 0% para talentos
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { checkmarkCircleOutline } from 'ionicons/icons'

const testimonials = [
  {
    name: 'Carlos Mendoza',
    role: 'Inversionista',
    quote: 'Gané Q12,000 mensuales invirtiendo en atletas emergentes. La transparencia blockchain me da confianza total.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
  },
  {
    name: 'Ana López',
    role: 'Atleta - Kickboxing',
    quote: 'Mi carrera despegó gracias a la tokenización. Ahora tengo sponsors que nunca imaginé posibles.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
  },
  {
    name: 'Miguel Torres',
    role: 'Aliado - Gimnasio',
    quote: 'Colaborar con Allevo Sports triplicó la visibilidad de nuestro gimnasio y atrajo nuevos atletas.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel'
  }
]
</script>

<style scoped>
.ecosystem-hero {
  position: relative;
  padding: 140px 20px 80px;
  overflow: hidden;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-gradient {
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse at center, #1a0505 0%, #0a0a0a 70%);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid rgba(239, 68, 68, 0.3);
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 600;
  color: #EF4444;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 28px;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background: #EF4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.3); }
}

.hero-title {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  margin: 0 0 20px 0;
  text-transform: uppercase;
}

.hero-title .highlight {
  color: #EF4444;
}

.hero-subtitle {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  color: #9CA3AF;
  max-width: 500px;
  margin: 0 auto 48px;
  line-height: 1.6;
}

/* Stats Row */
.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  margin-bottom: 56px;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 32px;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-4px);
}

.stat-item:hover .stat-number {
  text-shadow: 0 0 20px rgba(239, 68, 68, 0.4);
}

.stat-number {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #9CA3AF;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 8px;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: rgba(255, 255, 255, 0.1);
}

/* Testimonials */
.hero-testimonials {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 48px;
}

.testimonial-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  overflow: hidden;
  transition: all 0.45s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  will-change: transform, box-shadow;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 0%, rgba(239, 68, 68, 0.12), transparent 60%);
  transition: opacity 0.4s ease;
  pointer-events: none;
  z-index: 0;
}

.testimonial-card:hover {
  transform: translateY(-8px);
  border-color: rgba(239, 68, 68, 0.35);
  box-shadow: 0 20px 50px rgba(239, 68, 68, 0.12), 0 0 0 1px rgba(239, 68, 68, 0.15);
}

.testimonial-card:hover::before {
  opacity: 1;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 16px;
  border: 2px solid rgba(239, 68, 68, 0.5);
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-quote {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: #E5E7EB;
  line-height: 1.6;
  margin: 0 0 16px 0;
}

.testimonial-author {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  color: #fff;
  font-size: 14px;
}

.testimonial-role {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  color: #EF4444;
  margin-top: 4px;
}

/* Bottom Badges */
.hero-badges {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.benefit-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid #10B981;
  border-radius: 20px;
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #10B981;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  cursor: default;
}

.benefit-badge:hover {
  background: rgba(16, 185, 129, 0.08);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.15);
}

.badge-icon {
  font-size: 16px;
  transition: transform 0.3s ease;
}

.benefit-badge:hover .badge-icon {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .ecosystem-hero {
    padding: 110px 20px 60px;
    min-height: auto;
  }

  .hero-stats {
    flex-direction: column;
    gap: 24px;
  }

  .stat-divider {
    display: none;
  }

  .stat-item {
    padding: 0;
  }

  .hero-testimonials {
    grid-template-columns: 1fr;
  }

  .hero-badges {
    flex-direction: column;
    align-items: center;
  }
}
</style>
