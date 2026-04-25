<template>
  <section class="ecosystem-hero">
    <div class="hero-bg">
      <div class="hero-gradient"></div>
      <div class="hero-particles"></div>
      <div class="hero-glow hero-glow-1"></div>
      <div class="hero-glow hero-glow-2"></div>
    </div>
    
    <div class="hero-content">
      <div class="hero-badge" v-reveal="'fade-in'">
        <span class="live-dot"></span>
        ÚNETE AL ECOSISTEMA
      </div>
      
      <h1 class="hero-title" v-reveal="'slide-up'">
        TRANSFORMA TU
        <span class="highlight">FUTURO</span>
        DEPORTIVO
      </h1>
      
      <p class="hero-subtitle" v-reveal="'slide-up'" :style="{ '--delay': '0.1s' }">
        Sé parte de la revolución de los activos digitales deportivos en Guatemala y Latinoamérica
      </p>
      
      <div class="hero-stats" v-reveal="'slide-up'" :style="{ '--delay': '0.2s' }">
        <div class="stat-item">
          <span class="stat-value" ref="statAtletas">500+</span>
          <span class="stat-label">Atletas Tokenizados</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value" ref="statInversionistas">2,000+</span>
          <span class="stat-label">Inversionistas Activos</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <span class="stat-value" ref="statPromedio">Q12K</span>
          <span class="stat-label">Promedio Mensual</span>
        </div>
      </div>
      
      <div class="hero-testimonials" v-reveal="'slide-up'" :style="{ '--delay': '0.3s' }">
        <div class="testimonial-card" v-for="(testimonial, index) in testimonials" :key="testimonial.id" :style="{ '--delay': (0.4 + index * 0.1) + 's' }">
          <div class="testimonial-avatar">
            <img :src="testimonial.avatar" :alt="testimonial.name" />
          </div>
          <div class="testimonial-content">
            <p class="testimonial-quote">"{{ testimonial.quote }}"</p>
            <div class="testimonial-author">
              <strong>{{ testimonial.name }}</strong>
              <span>{{ testimonial.role }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div class="hero-badges" v-reveal="'slide-up'" :style="{ '--delay': '0.5s' }">
        <div class="benefit-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Sin costo de registro
        </div>
        <div class="benefit-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22,4 12,14.01 9,11.01"/>
          </svg>
          Comisión 0% para talentos
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const testimonials = [
  {
    id: 1,
    name: 'Carlos Mendoza',
    role: 'Inversionista',
    quote: 'Gané Q12,000 mensuales invirtiendo en atletas emergentes. La transparencia blockchain me da confianza total.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos'
  },
  {
    id: 2,
    name: 'Ana López',
    role: 'Atleta - Kickboxing',
    quote: 'Mi carrera despegó gracias a la tokenización. Ahora tengo sponsors que nunca imaginé posibles.',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana'
  },
  {
    id: 3,
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
  background: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(207, 46, 46, 0.18), transparent),
    radial-gradient(ellipse 60% 40% at 80% 60%, rgba(207, 46, 46, 0.1), transparent),
    radial-gradient(ellipse 50% 30% at 20% 80%, rgba(207, 46, 46, 0.05), transparent),
    linear-gradient(180deg, #0b0b0b 0%, #151515 100%);
}

.hero-particles {
  position: absolute;
  inset: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(207, 46, 46, 0.12) 0%, transparent 1%),
    radial-gradient(circle at 80% 70%, rgba(207, 46, 46, 0.08) 0%, transparent 1%),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.02) 0%, transparent 1%);
  background-size: 100px 100px, 150px 150px, 200px 200px;
  animation: particleFloat 20s linear infinite;
}

@keyframes particleFloat {
  0% { transform: translateY(0); }
  100% { transform: translateY(-100px); }
}

.hero-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.3;
  animation: glowPulse 8s ease-in-out infinite;
}

.hero-glow-1 {
  width: 600px;
  height: 600px;
  background: #CF2E2E;
  top: -200px;
  left: -100px;
}

.hero-glow-2 {
  width: 400px;
  height: 400px;
  background: #8b1e1e;
  bottom: -100px;
  right: -50px;
  animation-delay: 4s;
}

@keyframes glowPulse {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(1.1); }
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 900px;
  text-align: center;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(207, 46, 46, 0.12);
  border: 1px solid rgba(207, 46, 46, 0.35);
  border-radius: 50px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.72rem;
  font-weight: 600;
  color: #CF2E2E;
  letter-spacing: 0.15em;
  margin-bottom: 28px;
  animation: fade-in 0.6s ease forwards;
}

.live-dot {
  width: 8px;
  height: 8px;
  background: #CF2E2E;
  border-radius: 50%;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

.hero-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.1;
  margin-bottom: 24px;
  text-transform: uppercase;
  animation: slide-up 0.6s ease forwards;
}

.hero-title .highlight {
  color: #CF2E2E;
  display: block;
  text-shadow: 0 0 40px rgba(207, 46, 46, 0.5);
}

@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-subtitle {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1.15rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 520px;
  margin: 0 auto 48px;
  line-height: 1.6;
  animation: slide-up 0.6s ease forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  margin-bottom: 56px;
  flex-wrap: wrap;
  animation: slide-up 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  text-shadow: 0 0 30px rgba(207, 46, 46, 0.3);
}

.stat-label {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.72rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-top: 8px;
}

.stat-divider {
  width: 1px;
  height: 50px;
  background: linear-gradient(180deg, transparent, rgba(207, 46, 46, 0.3), transparent);
}

.hero-testimonials {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 20px;
  margin-bottom: 48px;
}

.testimonial-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 22px;
  display: flex;
  gap: 14px;
  text-align: left;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: slide-up 0.6s ease forwards;
  animation-delay: var(--delay, 0.4s);
  opacity: 0;
  overflow: hidden;
  position: relative;
}

.testimonial-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  opacity: 0;
  background: radial-gradient(circle at 50% 0%, rgba(207, 46, 46, 0.1), transparent 60%);
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.testimonial-card:hover {
  border-color: rgba(207, 46, 46, 0.3);
  transform: translateY(-6px);
  box-shadow: 0 20px 40px rgba(207, 46, 46, 0.12);
}

.testimonial-card:hover::before {
  opacity: 1;
}

.testimonial-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  border: 2px solid rgba(207, 46, 46, 0.3);
}

.testimonial-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.testimonial-content {
  flex: 1;
  min-width: 0;
}

.testimonial-quote {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.82rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.5;
  margin: 0 0 10px;
}

.testimonial-author {
  display: flex;
  flex-direction: column;
}

.testimonial-author strong {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.82rem;
  color: #fff;
}

.testimonial-author span {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  color: #CF2E2E;
}

.hero-badges {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
  animation: slide-up 0.6s ease forwards;
  animation-delay: 0.5s;
  opacity: 0;
}

.benefit-badge {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 24px;
  background: rgba(0, 224, 144, 0.08);
  border: 1px solid rgba(0, 224, 144, 0.25);
  border-radius: 12px;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.82rem;
  font-weight: 500;
  color: #00e090;
  transition: all 0.3s ease;
}

.benefit-badge:hover {
  background: rgba(0, 224, 144, 0.15);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 224, 144, 0.2);
}

.benefit-badge svg {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .ecosystem-hero {
    padding: 110px 20px 60px;
    min-height: auto;
  }
  
  .hero-stats {
    gap: 20px;
  }
  
  .stat-divider {
    display: none;
  }
  
  .stat-value {
    font-size: 2.2rem;
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