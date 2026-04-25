<template>
  <header class="navbar" :class="{ scrolled: isScrolled }" v-reveal="'fade-in'">
    <!-- Scroll progress indicator -->
    <div class="scroll-progress" :style="{ width: scrollProgress + '%' }"></div>

    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <a href="/" @click.prevent="navigateTo('/')">
          <img src="/assets/images/logo-alevo.webp" alt="Allevo Sports" />
        </a>
      </div>

      <!-- Desktop Navigation -->
      <nav class="navbar-links desktop-only">
        <router-link to="/" class="nav-link" :class="{ active: isActive('/') }">
          Inicio
        </router-link>

        <div class="nav-dropdown" ref="dropdownRef">
          <button class="nav-link dropdown-trigger" @click="toggleDropdown" :class="{ active: isTalentosActive }">
            <span>Talentos</span>
            <ion-icon :icon="chevronDownOutline" class="arrow" :class="{ rotate: isDropdownOpen }"></ion-icon>
          </button>
          <transition name="dropdown">
            <div class="dropdown-menu" v-show="isDropdownOpen">
              <div class="dropdown-arrow-icon"></div>
              <router-link v-for="item in talentosItems" :key="item.path" :to="item.path" class="dropdown-item"
                @click="closeDropdown">
                <ion-icon :icon="item.icon" class="dropdown-item-icon"></ion-icon>
                <span>{{ item.label }}</span>
              </router-link>
            </div>
          </transition>
        </div>

        <router-link v-for="link in navLinks" :key="link.path" :to="link.path" class="nav-link"
          :class="{ active: isActive(link.path) }">
          {{ link.label }}
        </router-link>
      </nav>

      <!-- Desktop CTAs -->
      <div class="navbar-cta desktop-only">
        <button class="btn-outline-cta" @click="openAtletasModal">
          <ion-icon :icon="personAddOutline" class="cta-icon"></ion-icon>
          Ser un Talento
        </button>
        <button class="btn-primary" @click="goToLogin">
          <ion-icon :icon="logInOutline" class="cta-icon"></ion-icon>
          Iniciar Sesión
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button class="menu-btn mobile-only" @click="openMenu" aria-label="Abrir menú">
        <ion-icon :icon="menuOutline" class="menu-icon"></ion-icon>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  menuController,
  IonIcon
} from '@ionic/vue'
import {
  chevronDownOutline,
  menuOutline,
  peopleOutline,
  personAddOutline,
  logInOutline,
  bodyOutline,
  barbellOutline,
  fitnessOutline,
  shieldOutline,
  flameOutline,
  flashOutline
} from 'ionicons/icons'
import { useAtletasModal } from '../../composables/useAtletasModal'

const router = useRouter()
const route = useRoute()
const { openAtletasModal } = useAtletasModal()

// ─── Reactive State ───────────────────────────────────────────
const isScrolled = ref(false)
const scrollProgress = ref(0)
const isDropdownOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

// ─── Navigation Data ──────────────────────────────────────────
const navLinks = [
  { path: '/noticias', label: 'Noticias' },
  { path: '/sistema', label: 'Sistema' },
  { path: '/marcas', label: 'Marcas' },
  { path: '/se-parte', label: 'Sé parte' },
  { path: '/contacto', label: 'Contacto' }
]

const talentosItems = [
  { path: '/talentos', label: 'Todos los talentos', icon: peopleOutline },
  { path: '/talentos?filter=Kickboxing', label: 'KickBoxing', icon: flameOutline },
  { path: '/talentos?filter=Fisicoculturismo', label: 'Fisicoculturismo', icon: barbellOutline },
  { path: '/talentos?filter=Muay+Thai', label: 'Muay Thai', icon: bodyOutline },
  { path: '/talentos?filter=Karate', label: 'Karate', icon: shieldOutline },
  { path: '/talentos?filter=Calistenia', label: 'Calistenia', icon: fitnessOutline },
  { path: '/talentos?filter=Boxeo', label: 'Boxeo', icon: flashOutline }
]

// ─── Active Route Detection ───────────────────────────────────
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path.startsWith(path.replace(/\?.*$/, ''))
}

const isTalentosActive = computed(() => {
  return route.path === '/talentos' || route.path.startsWith('/talentos')
})

const navigateTo = (path: string) => {
  router.push(path)
}

// ─── Scroll Handling ──────────────────────────────────────────
const handleScroll = () => {
  const scrollY = window.scrollY
  isScrolled.value = scrollY > 60

  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = docHeight > 0 ? (scrollY / docHeight) * 100 : 0
}

// ─── Dropdown Logic ───────────────────────────────────────────
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const closeDropdown = () => {
  isDropdownOpen.value = false
}

// Click outside to close dropdown
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isDropdownOpen.value = false
  }
}

// ─── Mobile Menu Logic ────────────────────────────────────────
const openMenu = () => {
  menuController.open('main-menu')
}

const goToLogin = () => {
  router.push('/admin/login')
}

// ─── Lifecycle ────────────────────────────────────────────────
onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* ─── Navbar Base ───────────────────────────────────────────── */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  transition: background-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease;
  padding: 0;
}

.navbar.scrolled {
  background-color: rgba(9, 16, 34, 0.95);
  backdrop-filter: blur(12px) saturate(1.2);
  -webkit-backdrop-filter: blur(12px) saturate(1.2);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

/* ─── Scroll Progress Bar ───────────────────────────────────── */
.scroll-progress {
  position: absolute;
  top: 0;
  left: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary, #EF4444), #ff6b6b);
  width: 0%;
  transition: width 0.1s linear;
  z-index: 1001;
}

/* ─── Navbar Container ──────────────────────────────────────── */
.navbar-container {
  max-width: var(--container-max, 1280px);
  margin: 0 auto;
  padding: 0 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ─── Logo ──────────────────────────────────────────────────── */
.navbar-logo a {
  display: block;
}

.navbar-logo img {
  height: 120px;
  width: auto;
  transition: transform 0.25s ease, filter 0.25s ease;
  filter: brightness(1.05);
}

.navbar-logo a:hover img {
  transform: scale(1.05);
  filter: brightness(1.15);
}

/* ─── Desktop Links ─────────────────────────────────────────── */
.navbar-links {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.82rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.85);
  text-transform: uppercase;
  letter-spacing: 0.6px;
  transition: color 0.25s ease;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px 14px;
  position: relative;
  text-decoration: none;
  border-radius: 6px;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 4px;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-primary, #EF4444), #ff6b6b);
  border-radius: 2px;
  transition: width 0.3s ease, left 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.nav-link:hover::after {
  width: 60%;
  left: 50%;
}

.nav-link.active {
  color: var(--color-primary, #EF4444);
  background: rgba(239, 68, 68, 0.08);
}

.nav-link.active::after {
  width: 60%;
  left: 50%;
}

/* ─── Dropdown ──────────────────────────────────────────────── */
.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 5px;
}

.arrow {
  font-size: 0.75rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.arrow.rotate {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  background: rgba(16, 20, 30, 0.98);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  min-width: 220px;
  padding: 8px 0;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.03);
  z-index: 1001;
}

.dropdown-arrow-icon {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 12px;
  background: rgba(16, 20, 30, 0.98);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  transform: translateX(-50%) rotate(45deg);
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 20px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  transition: all 0.2s ease;
  text-decoration: none;
  position: relative;
  z-index: 2;
}

.dropdown-item-icon {
  font-size: 1.1rem;
  color: var(--color-primary, #EF4444);
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

.dropdown-item:hover {
  background: rgba(239, 68, 68, 0.12);
  color: #fff;
  padding-left: 24px;
}

.dropdown-item:hover .dropdown-item-icon {
  opacity: 1;
}

/* Dropdown transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-8px);
}

/* ─── Desktop CTAs ──────────────────────────────────────────── */
.navbar-cta {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #fff;
  background: var(--color-primary, #EF4444);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
}

.btn-primary:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
}

.btn-outline-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 9px 18px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: rgba(255, 255, 255, 0.9);
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-decoration: none;
  transform: translateX(20px);
  animation: slideInRight 0.4s ease forwards;
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.btn-outline-cta:hover {
  border-color: var(--color-primary, #EF4444);
  color: var(--color-primary, #EF4444);
  background: rgba(239, 68, 68, 0.08);
}

.cta-icon {
  font-size: 1rem;
}

/* ─── Mobile Menu Toggle ────────────────────────────────────── */
.menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s ease;
}

.menu-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.2);
}

.menu-btn:active {
  transform: scale(0.95);
}

.menu-icon {
  font-size: 1.4rem;
}

/* ─── Visibility Helpers ────────────────────────────────────── */
.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

/* ─── Responsive Breakpoints ────────────────────────────────── */
@media (max-width: 1024px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: flex !important;
  }

  .navbar-container {
    padding: 0 16px;
  }
}
</style>
