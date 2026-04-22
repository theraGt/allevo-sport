<template>
  <section class="talent-showcase" id="talentos">
    <header class="section-header">
      <span class="subtitle">Nuestros Atletas</span>
      <h2>Talento de Alto Rendimiento</h2>
      <div class="accent-line"></div>
    </header>

    <div class="filter-container">
      <button 
        v-for="filter in filters" 
        :key="filter"
        :class="['filter-btn', { active: activeFilter === filter }]"
        @click="activeFilter = filter"
      >
        {{ filter }}
      </button>
    </div>

    <div class="talent-grid">
      <article 
        v-for="talent in filteredTalents" 
        :key="talent.id"
        class="talent-card"
        ref="talentCards"
      >
        <div class="image-wrapper">
          <img :src="talent.image" :alt="talent.name">
          <div class="overlay">
            <a href="#" class="view-profile">Ver Perfil</a>
          </div>
          <button v-if="talent.highlight" class="play-btn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
        <div class="talent-info">
          <h3>{{ talent.name }}</h3>
          <p class="category">{{ talent.position }} • {{ talent.category }}</p>
          <div class="skills-icons">
            <span v-for="skill in talent.skills" :key="skill" class="skill-badge" :title="skill">
              {{ skill }}
            </span>
          </div>
          <div class="stats-mini">
            <span><strong>PJ:</strong> {{ talent.games }}</span>
            <span><strong>G:</strong> {{ talent.goals }}</span>
          </div>
        </div>
      </article>
    </div>

    <div class="cta-block">
      <h3>¿Quieres formar parte de Allevo Sports?</h3>
      <p>Únete a nuestra agencia y alcanza tu máximo potencial</p>
      <a href="#contacto" class="cta-button">Contáctanos</a>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue'

const activeFilter = ref('Todos')
const filters = ref(['Todos', 'Muay Thai', 'Fisicoculturismo', 'Kickboxing', 'Karate', 'Coaching'])

const setFilter = (filter: string) => {
  activeFilter.value = filter
}

interface Talent {
  id: number
  name: string
  position: string
  category: string
  games: number
  goals: number
  image: string
  sport: string
  highlight: boolean
  skills: string[]
}

const talents = ref<Talent[]>([
  {
    id: 1,
    name: 'Nathan Fino',
    position: 'Atleta',
    category: 'Profesional',
    games: 24,
    goals: 8,
    image: '/assets/images/atletas/nathan-fino.webp',
    sport: 'Muay Thai',
    highlight: true,
    skills: ['Velocidad', 'Técnica']
  },
  {
    id: 2,
    name: 'Camilo Pinzón',
    position: 'Atleta',
    category: 'Profesional',
    games: 30,
    goals: 15,
    image: '/assets/images/atletas/camilo-pinzon.webp',
    sport: 'Fisicoculturismo',
    highlight: true,
    skills: ['Fuerza', 'Precisión']
  },
  {
    id: 3,
    name: 'Katherine Portt',
    position: 'Atleta',
    category: 'Profesional',
    games: 28,
    goals: 12,
    image: '/assets/images/atletas/katherine-portt.webp',
    sport: 'Kickboxing',
    highlight: true,
    skills: ['Asistencia', 'Velocidad']
  },
  {
    id: 4,
    name: 'Mario Quino',
    position: 'Atleta',
    category: 'Profesional',
    games: 32,
    goals: 18,
    image: '/assets/images/atletas/mario-quino.webp',
    sport: 'Kickboxing',
    highlight: false,
    skills: ['Rebote', 'Fuerza']
  },
  {
    id: 5,
    name: 'Carlos López',
    position: 'Coach',
    category: 'Profesional',
    games: 0,
    goals: 0,
    image: '/assets/images/atletas/carlos-lopez.webp',
    sport: 'Coaching',
    highlight: false,
    skills: ['Experiencia', 'Liderazgo']
  },
  {
    id: 6,
    name: 'Olivia Serrano',
    position: 'Atleta',
    category: 'Profesional',
    games: 20,
    goals: 10,
    image: '/assets/images/atletas/olivia-serrano.webp',
    sport: 'Karate',
    highlight: true,
    skills: ['Técnica', 'Disciplina']
  }
])

const filteredTalents = computed(() => {
  if (activeFilter.value === 'Todos') {
    return talents.value
  }
  const filter = activeFilter.value.trim()
  return talents.value.filter(t => t.sport.trim() === filter)
})

const talentCards = ref<HTMLElement[]>([])
let observer: IntersectionObserver | null = null

const setupIntersectionObserver = () => {
  const options = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }
  
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer?.unobserve(entry.target)
      }
    })
  }, options)

  nextTick(() => {
    const cards = talentCards.value
    if (cards) {
      cards.forEach(card => {
        observer?.observe(card)
      })
    }
  })
}

onMounted(() => {
  setupIntersectionObserver()
})

onBeforeUnmount(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

.talent-showcase {
  padding: 80px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.subtitle {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #e63946;
  margin-bottom: 10px;
}

.section-header h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px;
}

.accent-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #e63946, #ff6b6b);
  margin: 0 auto;
  border-radius: 2px;
}

.filter-container {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 12px 28px;
  border: 2px solid #e63946;
  background: transparent;
  color: #1a1a1a;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-btn:hover {
  background: rgba(230, 57, 70, 0.1);
}

.filter-btn.active {
  background: #e63946;
  color: white;
}

.talent-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.talent-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(30px);
}

.talent-card.visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.talent-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.image-wrapper {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.talent-card:hover .image-wrapper img {
  transform: scale(1.05);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding-bottom: 20px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.talent-card:hover .overlay {
  opacity: 1;
}

.view-profile {
  padding: 10px 24px;
  background: white;
  color: #1a1a1a;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 0.85rem;
  border-radius: 25px;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.talent-card:hover .view-profile {
  transform: translateY(0);
}

.play-btn {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-btn svg {
  width: 20px;
  height: 20px;
  color: #e63946;
  margin-left: 3px;
}

.play-btn:hover {
  background: #e63946;
  transform: translate(-50%, -50%) scale(1.1);
}

.play-btn:hover svg {
  color: white;
}

.talent-info {
  padding: 20px;
  text-align: left;
}

.talent-info h3 {
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #1a1a1a;
}

.category {
  color: #666;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  margin: 5px 0 12px;
}

.skills-icons {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.skill-badge {
  padding: 4px 10px;
  background: rgba(230, 57, 70, 0.1);
  color: #e63946;
  font-family: 'Inter', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 12px;
}

.stats-mini {
  display: flex;
  gap: 20px;
  padding-top: 12px;
  border-top: 1px solid #eee;
}

.stats-mini span {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #555;
}

.stats-mini strong {
  color: #1a1a1a;
}

.cta-block {
  text-align: center;
  padding: 50px 30px;
  background: linear-gradient(135deg, #1a1a1a 0%, #333 100%);
  border-radius: 16px;
  color: white;
}

.cta-block h3 {
  font-family: 'Montserrat', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0 0 10px;
}

.cta-block p {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0 0 25px;
}

.cta-button {
  display: inline-block;
  padding: 14px 36px;
  background: #e63946;
  color: white;
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 30px;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #ff6b6b;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(230, 57, 70, 0.3);
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: 2rem;
  }

  .filter-container {
    gap: 10px;
  }

  .filter-btn {
    padding: 10px 20px;
    font-size: 0.85rem;
  }

  .talent-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
  }

  .cta-block h3 {
    font-size: 1.4rem;
  }
}
</style>
