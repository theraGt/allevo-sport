<template>
  <section class="sistema-sponsors section" id="sistema">
    <div class="container">
      <h2 class="section-title text-center" v-reveal="'fade-up'">Sponsors Un sistema<br><span class="text-primary">que
          potencia victorias</span></h2>

      <div class="content-wrapper">
        <div class="timeline">
          <div class="timeline-step" v-for="(step, index) in pasos" :key="index" v-reveal="'fade-left'"
            :class="'delay-' + ((index % 5) + 1)">
            <div class="step-number">{{ index + 1 }}</div>
            <div class="step-content">
              <h3>{{ step.titulo }}</h3>
              <p>{{ step.descripcion }}</p>
            </div>
          </div>
        </div>

        <div class="video-container" v-reveal="'fade-right'">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/nWVvt7fzVGw?si=34ocGUNQy1qFYYrt&autoplay=1&mute=1"
            title="YouTube video player" frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>

      <div class="sistema-cta delay-3" v-reveal="'fade-up'">
        <button class="btn-primary" @click="() => openModal()">
          Postúlate
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useModal } from '../../composables/useModal'

const { openModal } = useModal()

const pasos = [
  {
    titulo: 'Postula tu perfil',
    descripcion: 'Crea tu perfil profesional con tus logros y estadísticas'
  },
  {
    titulo: 'Genera tu plan de trabajo',
    descripcion: 'Define tus metas y crea un roadmap personalizado'
  },
  {
    titulo: 'Construye tu sistema financiero',
    descripcion: 'Accede a herramientas de gestión económica para atletas'
  },
  {
    titulo: 'Mejora tu talento',
    descripcion: 'Recibe entrenamiento y recursos para optimizar tu rendimiento'
  },
  {
    titulo: '¡Gana en grande!',
    descripcion: 'Alcanza el éxito profesional y monetiza tu carrera'
  }
]
</script>

<style scoped>
.sistema-sponsors {
  background-color: var(--color-bg);
  padding: 50px 0;
}

.section-title {
  font-size: clamp(2rem, 6vw, 4rem);
  margin-bottom: 50px;
}

.content-wrapper {
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
}

.timeline {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 600px;
}

.video-container {
  flex: 0 0 auto;
  width: 560px;
  max-width: 100%;
}

.video-container iframe {
  width: 100%;
  height: 315px;
  border-radius: var(--border-radius-lg);
}

.timeline-step {
  display: flex;
  align-items: flex-start;
  gap: 25px;
  padding: 20px;
  background-color: var(--color-surface);
  border-radius: var(--border-radius-lg);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);
  position: relative;
}

.timeline-step::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(207, 46, 46, 0.12), transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
  border-radius: inherit;
}

.timeline-step:hover {
  border-color: rgba(207, 46, 46, 0.35);
  transform: translateX(10px);
  background: linear-gradient(135deg, var(--color-surface) 0%, rgba(207, 46, 46, 0.08) 100%);
  box-shadow: 0 15px 35px rgba(207, 46, 46, 0.2);
}

.timeline-step:hover::before {
  opacity: 1;
}

.timeline-step:hover .step-number {
  transform: scale(1.15);
  box-shadow: 0 6px 16px rgba(207, 46, 46, 0.5);
}

.timeline-step:hover .step-content h3 {
  color: var(--color-primary);
}

.timeline-step:hover .step-content p {
  color: rgba(255, 255, 255, 0.9);
}

.step-number {
  width: 45px;
  height: 45px;
  background-color: var(--color-primary);
  color: var(--color-text);
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius);
  flex-shrink: 0;
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.step-content {
  flex: 1;
}

.step-content h3 {
  font-size: 1.1rem;
  margin-bottom: 8px;
  color: var(--color-text);
}

.step-content p {
  color: var(--color-text-muted);
  font-size: 0.9rem;
  margin: 0;
  line-height: 1.5;
}

.sistema-cta {
  text-align: center;
}

.sistema-cta .btn-primary {
  padding: 14px 40px;
  font-size: 1rem;
}

.sistema-cta .btn-primary svg {
  width: 16px;
  height: 16px;
  margin-left: 10px;
}

@media (max-width: 1024px) {
  .content-wrapper {
    flex-direction: column;
    align-items: center;
  }

  .timeline {
    width: 100%;
    max-width: 100%;
  }

  .video-container {
    width: 100%;
    max-width: 560px;
  }

  .video-container iframe {
    height: 315px;
  }
}

@media (max-width: 576px) {
  .timeline-step {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .step-number {
    margin: 0 auto;
  }

  .step-content h3 {
    font-size: 1rem;
  }

  .step-content p {
    font-size: 0.85rem;
  }

  .video-container iframe {
    height: 200px;
  }
}
</style>