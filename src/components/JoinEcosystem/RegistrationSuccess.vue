<template>
  <div class="success-overlay">
    <div class="success-content">
      <div class="success-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#00e090" stroke-width="2"/>
          <path d="M8 12l2.5 2.5L16 9" stroke="#00e090" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      
      <h2 class="success-title">¡BIENVENIDO AL ECOSISTEMA!</h2>
      <p class="success-message">Tu cuenta está en revisión. Mientras tanto, explora lo que puedes hacer:</p>
      
      <div class="success-actions">
        <div class="action-card" v-for="action in contextualActions" :key="action.title">
          <div class="action-icon" v-html="action.icon"></div>
          <h4>{{ action.title }}</h4>
          <p>{{ action.description }}</p>
          <a :href="action.link" class="action-btn">{{ action.cta }}</a>
        </div>
      </div>
      
      <div class="share-section">
        <p class="share-title">¿Conoces a alguien que debería unirse?</p>
        <button class="share-btn" @click="shareApp">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="18" cy="5" r="3"/>
            <circle cx="6" cy="12" r="3"/>
            <circle cx="18" cy="19" r="3"/>
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
          </svg>
          Invitar a un amigo <span class="points-badge">+50 pts</span>
        </button>
      </div>
      
      <button class="close-btn" @click="$emit('close')">
        Ir al inicio
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  role: 'inversionista' | 'talento' | 'aliado'
}>()

defineEmits<{
  close: []
}>()

const contextualActions = computed(() => {
  const actions = {
    inversionista: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/></svg>',
        title: 'Explora Atletas',
        description: 'Descubre talentos deportivos para invertir',
        link: '/talentos',
        cta: 'Ver atletas'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
        title: 'Calculadora',
        description: 'Simula tu retorno de inversión',
        link: '/sistema',
        cta: 'Calcular rendimientos'
      }
    ],
    talento: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14,2 14,8 20,8"/></svg>',
        title: 'Guía de Tokenización',
        description: 'Aprende cómo funciona el proceso',
        link: '/sistema',
        cta: 'Ver guía'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        title: 'Explora el Ecosistema',
        description: 'Conoce otros atletas tokenizados',
        link: '/talentos',
        cta: 'Ver atletas'
      }
    ],
    aliado: [
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
        title: 'Explora Atletas',
        description: 'Encuentra atletas para patrocinio',
        link: '/talentos',
        cta: 'Ver atletas'
      },
      {
        icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01"/></svg>',
        title: 'Conoce el Sistema',
        description: 'Descubre oportunidades de inversión',
        link: '/sistema',
        cta: 'Ver sistema'
      }
    ]
  }
  return actions[props.role]
})

const shareApp = () => {
  const shareData = {
    title: 'Únete a Allevo Sports',
    text: 'Invierte en el talento deportivo de Guatemala y Latinoamérica',
    url: window.location.origin
  }
  
  if (navigator.share) {
    navigator.share(shareData)
  } else {
    navigator.clipboard.writeText(shareData.url)
    alert('¡Enlace copiado al portapapeles!')
  }
}
</script>

<style scoped>
.success-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
}

.success-content {
  max-width: 600px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.5s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.success-icon {
  margin-bottom: 24px;
  animation: bounce 0.6s ease 0.2s;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

.success-title {
  font-family: 'Rajdhani', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin: 0 0 12px;
}

.success-message {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 32px;
}

.success-actions {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 32px;
}

.action-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.action-card:hover {
  border-color: rgba(207, 46, 46, 0.3);
  transform: translateY(-4px);
}

.action-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(207, 46, 46, 0.1);
  border-radius: 12px;
  color: #CF2E2E;
}

.action-card h4 {
  font-family: 'Rajdhani', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
}

.action-card p {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  margin: 0 0 16px;
}



.share-section {
  margin-bottom: 24px;
}

.share-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 12px;
}

.share-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  background: rgba(0, 224, 144, 0.1);
  border: 1px solid rgba(0, 224, 144, 0.3);
  border-radius: 12px;
  color: #00e090;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.share-btn:hover {
  background: rgba(0, 224, 144, 0.2);
  transform: translateY(-2px);
}

.points-badge {
  background: #00e090;
  color: #000;
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.7rem;
  font-weight: 700;
}

.close-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 12px 24px;
  transition: color 0.3s ease;
}

.close-btn:hover {
  color: #fff;
}

@media (max-width: 480px) {
  .success-actions {
    grid-template-columns: 1fr;
  }
  
  .success-title {
    font-size: 1.5rem;
  }
}
</style>