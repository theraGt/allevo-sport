export interface Talent {
  id: number
  name: string
  aliasDeportivo: string
  slug: string
  position: string
  category: string
  games: number
  goals: number
  image: string
  sport: string
  highlight: boolean
  skills: string[]
  instagram?: string
  tiktok?: string
}

export const filters = ['Todos', 'Muay Thai', 'Fisicoculturismo', 'Kickboxing', 'Karate', 'Calistenia', 'Coaching']

export const talents: Talent[] = [
  {
    id: 1,
    name: 'Nathan Fino',
    aliasDeportivo: 'Gypsy Nate',
    slug: 'nathan-fino',
    position: 'Atleta',
    category: 'Profesional',
    games: 24,
    goals: 8,
    image: '/assets/images/atletas/nathan-fino.webp',
    sport: 'Muay Thai',
    highlight: true,
    skills: ['Velocidad', 'Técnica'],
    instagram: 'https://www.instagram.com/gypsy.nate/',
    tiktok: 'https://www.tiktok.com/@gypsy.nate'
  },
  {
    id: 2,
    name: 'Camilo Pinzón',
    aliasDeportivo: 'Camilo Fitness',
    slug: 'camilo-pinzon',
    position: 'Atleta',
    category: 'Profesional',
    games: 30,
    goals: 15,
    image: '/assets/images/atletas/camilo-pinzon.webp',
    sport: 'Fisicoculturismo',
    highlight: true,
    skills: ['Fuerza', 'Precisión'],
    instagram: 'https://www.instagram.com/camilofitness.11/',
    tiktok: 'https://www.tiktok.com/@camilofitness.11?lang=es-419'
  },
  {
    id: 3,
    name: 'Katherine Portt',
    aliasDeportivo: 'La Barbie',
    slug: 'katherine-portt',
    position: 'Atleta',
    category: 'Profesional',
    games: 28,
    goals: 12,
    image: '/assets/images/atletas/katherine-portt.webp',
    sport: 'Kickboxing',
    highlight: true,
    skills: ['Asistencia', 'Velocidad'],
    instagram: 'https://www.instagram.com/katherineportt/',
    tiktok: 'https://www.tiktok.com/@katherineportt_?lang=es'
  },
  {
    id: 4,
    name: 'Mario Quino',
    aliasDeportivo: 'The Skark',
    slug: 'mario-quino',
    position: 'Atleta',
    category: 'Profesional',
    games: 32,
    goals: 18,
    image: '/assets/images/atletas/mario-quino.webp',
    sport: 'Kickboxing',
    highlight: false,
    skills: ['Rebote', 'Fuerza'],
    instagram: 'https://www.instagram.com/the_shark_quino/',
    tiktok: 'https://www.tiktok.com/@the_skark_quino'
  },
  {
    id: 5,
    name: 'Carlos Alberto López',
    aliasDeportivo: 'Profesor López',
    slug: 'carlos-lopez',
    position: 'Coach',
    category: 'Profesional',
    games: 0,
    goals: 0,
    image: '/assets/images/atletas/carlos-lopez.webp',
    sport: 'Coaching',
    highlight: false,
    skills: ['Experiencia', 'Liderazgo'],
    instagram: '',
    tiktok: ''
  },
  {
    id: 6,
    name: 'Olivia Serrano',
    aliasDeportivo: 'Miss Oliv',
    slug: 'olivia-serrano',
    position: 'Atleta',
    category: 'Profesional',
    games: 20,
    goals: 10,
    image: '/assets/images/atletas/olivia-serrano.webp',
    sport: 'Karate',
    highlight: true,
    skills: ['Técnica', 'Disciplina'],
    instagram: 'https://www.instagram.com/olivv_.ss',
    tiktok: 'https://www.tiktok.com/@missoliv9'
  },
  {
    id: 7,
    name: 'Daniel López',
    aliasDeportivo: 'Dani López',
    slug: 'daniel-lopez',
    position: 'Atleta',
    category: 'Profesional',
    games: 18,
    goals: 6,
    image: '/assets/images/atletas/daniel-lopez.webp',
    sport: 'Calistenia',
    highlight: false,
    skills: ['Resistencia', 'Fuerza'],
    instagram: 'https://www.instagram.com/dani.lopez_c',
    tiktok: 'https://www.tiktok.com/@danielp8754'
  }
]
