<template>
  <div class="dashboard-layout">
    <div class="ticker-wrap">
      <div class="ticker-inner">
        <div v-for="(item, index) in tickerItems" :key="index" class="ticker-item">
          <span class="ticker-sym">{{ item.sym }}</span>
          <span class="ticker-val">{{ item.val }}</span>
          <span v-if="item.chg" class="ticker-chg" :class="item.dir">{{ item.chg }}</span>
        </div>
      </div>
    </div>

    <header class="dashboard-header">
      <div class="header-container">
        <div class="header-logo">
          <div class="logo-icon">
            <span>AS</span>
          </div>
          <div class="logo-text">
            <h1>ALLEVO <span class="text-red">SPORTS</span></h1>
            <span class="logo-subtitle">REAL WORLD ASSET TOKENIZATION</span>
          </div>
        </div>

        <nav class="header-nav">
          <button class="nav-scroll-btn nav-scroll-left" @click="scrollNav('left')" :class="{ visible: canScrollLeft }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
            </svg>
          </button>
          <div class="nav-scroll-wrapper" ref="navWrapper">
            <div class="nav-scroll-content">
              <router-link
                v-for="item in filteredNavItems"
                :key="item.key"
                :to="item.route"
                class="nav-link"
                :class="{ active: $route.path.includes(item.route.replace('/admin/dashboard/', '').replace('/admin/', '')) }"
              >
                {{ item.label }}
              </router-link>
            </div>
            <div class="nav-scroll-fade-left" :class="{ visible: canScrollLeft }"></div>
            <div class="nav-scroll-fade-right" :class="{ visible: canScrollRight }"></div>
          </div>
          <button class="nav-scroll-btn nav-scroll-right" @click="scrollNav('right')"
            :class="{ visible: canScrollRight }">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z" />
            </svg>
          </button>
        </nav>

        <div class="header-right">
          <button class="menu-toggle" @click="toggleMenu" :class="{ active: isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div class="profile-wrapper desktop-only" ref="profileWrapper">
            <div class="profile-trigger" @click.stop="toggleProfile">
              <div class="profile-avatar">{{ userInitials }}</div>
              <div class="profile-info">
                <span class="profile-name">{{ userData.nombre || 'Usuario' }}</span>
                <span class="profile-role">{{ userData.rol || 'Admin' }}</span>
              </div>
              <svg class="profile-chevron" :class="{ open: isProfileOpen }" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
              </svg>
            </div>
            <div class="profile-dropdown" :class="{ open: isProfileOpen }">
              <router-link to="/admin/dashboard/perfil" class="dropdown-item" @click="closeProfile">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Ver perfil
              </router-link>
              <button class="dropdown-item">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path
                    d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z" />
                </svg>
                Conectar wallet
              </button>
              <div class="dropdown-divider"></div>
              <button class="dropdown-item danger" @click="logout">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                  <path
                    d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
                </svg>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="mobile-menu" :class="{ open: isMenuOpen }">
      <div class="mobile-menu-overlay" @click="closeMenu"></div>
      <div class="mobile-menu-panel">
        <div class="mobile-user-header">
          <div class="mobile-user-avatar">{{ userInitials }}</div>
          <div class="mobile-user-info">
            <span class="mobile-user-name">{{ userData.nombre || 'Usuario' }}</span>
            <span class="mobile-user-role">{{ userData.rol || 'Admin' }}</span>
          </div>
        </div>
        <div class="mobile-menu-header">
          <h3>MENU</h3>
          <button class="close-btn" @click="closeMenu">✕</button>
        </div>
        <nav class="mobile-nav">
          <router-link
            v-for="item in filteredNavItems"
            :key="item.key"
            :to="item.route"
            class="mobile-nav-link"
            @click="closeMenu"
          >
            {{ item.label }}
          </router-link>
          <router-link to="/admin/dashboard/perfil" class="mobile-nav-link" @click="closeMenu">MI PERFIL</router-link>
        </nav>
        <div class="mobile-menu-actions">
          <button class="btn-primary" @click="closeMenu">CONECTAR WALLET</button>
          <button class="btn-logout" @click="handleLogout">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16">
              <path
                d="M377.9 105.9L340.7 68.7c-7.5-7.5-19.7-7.5-27.2 0l-25.2 25.2c-7.5 7.5-7.5 19.7 0 27.2l47.1 47.1H224c-13.3 0-24 10.7-24 24v32c0 13.3 10.7 24 24 24h136.6l-47.1 47.1c-7.5 7.5-7.5 19.7 0 27.2l25.2 25.2c7.5 7.5 19.7 7.5 27.2 0l37.2-37.2c7.5-7.5 7.5-19.7 0-27.2zM224 352h-64c-13.3 0-24-10.7-24-24V128c0-13.3 10.7-24 24-24h64c13.3 0 24 10.7 24 24v200c0 13.3-10.7 24-24 24zM160 128c-13.3 0-24-10.7-24-24S146.7 80 160 80h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H160z" />
            </svg>
            SALIR
          </button>
        </div>
      </div>
    </div>

    <div class="dashboard-main">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { tickerData } from '../../../data/adminDashboard'
import { useAuth, refreshUser } from '../../../composables/useAuth'

const router = useRouter()
const { canView, userRole, logout: authLogout } = useAuth()
const tickerItems = [...tickerData, ...tickerData]
const isMenuOpen = ref(false)
const isProfileOpen = ref(false)
const navWrapper = ref<HTMLElement | null>(null)
const profileWrapper = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(false)

interface UserData {
  nombre?: string
  email?: string
  rol?: string
}

const userData = ref<UserData>({})

const userInitials = computed(() => {
  const name = userData.value.nombre || userData.value.email || 'U'
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const loadUser = () => {
  try {
    const raw = localStorage.getItem('user')
    if (raw) {
      userData.value = JSON.parse(raw)
    }
  } catch {
    userData.value = {}
  }
}

interface NavItem {
  label: string
  route: string
  key: string
}

const allNavItems: NavItem[] = [
  { label: 'PANEL RWA', route: '/admin/dashboard/overview', key: 'panel-rwa' },
  { label: 'SPONSORS', route: '/admin/dashboard/sponsors', key: 'sponsors' },
  { label: 'INVERSIONISTAS', route: '/admin/dashboard/inversionistas', key: 'inversionistas' },
  { label: 'PROYECTOS', route: '/admin/dashboard/proyectos', key: 'proyectos' },
  { label: 'TALENTOS', route: '/admin/dashboard/atletas', key: 'talentos' },
  { label: 'TALENTOS PANEL', route: '/admin/talentos/panel', key: 'talentos-panel' },
  { label: 'NOTICIAS', route: '/admin/dashboard/noticias', key: 'noticias' },
  { label: 'POSTULACIONES', route: '/admin/dashboard/postulaciones', key: 'postulaciones' }
]

const filteredNavItems = computed(() => {
  return allNavItems
    .filter(item => canView(item.key))
    .map(item => {
      if (item.key === 'talentos' && userRole.value === 'talento') {
        return { ...item, route: '/admin/dashboard/perfil' }
      }
      return item
    })
})

const toggleProfile = () => {
  isProfileOpen.value = !isProfileOpen.value
}

const closeProfile = () => {
  isProfileOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
  if (profileWrapper.value && !profileWrapper.value.contains(e.target as Node)) {
    isProfileOpen.value = false
  }
}

const checkNavScroll = () => {
  if (!navWrapper.value) return
  const { scrollLeft, scrollWidth, clientWidth } = navWrapper.value
  canScrollLeft.value = scrollLeft > 0
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 1
}

const scrollNav = (direction: 'left' | 'right') => {
  if (!navWrapper.value) return
  const scrollAmount = 200
  navWrapper.value.scrollBy({
    left: direction === 'left' ? -scrollAmount : scrollAmount,
    behavior: 'smooth'
  })
}

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const logout = () => {
  authLogout()
  router.push('/admin/login')
}

const handleLogout = () => {
  closeMenu()
  authLogout()
  router.push('/admin/login')
}

onMounted(() => {
  loadUser()
  refreshUser()
  checkNavScroll()
  window.addEventListener('resize', checkNavScroll)
  document.addEventListener('click', handleClickOutside)
  if (navWrapper.value) {
    navWrapper.value.addEventListener('scroll', checkNavScroll)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkNavScroll)
  document.removeEventListener('click', handleClickOutside)
  if (navWrapper.value) {
    navWrapper.value.removeEventListener('scroll', checkNavScroll)
  }
})
</script>

<style scoped>
.dashboard-layout {
  position: absolute;
  inset: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-color: var(--color-bg);
  overflow: hidden;
}

.dashboard-layout>.ticker-wrap {
  flex-shrink: 0;
}

.dashboard-layout>.dashboard-header {
  flex-shrink: 0;
}

.dashboard-main::-webkit-scrollbar {
  width: 8px;
}

.dashboard-main::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.03);
}

.dashboard-main::-webkit-scrollbar-thumb {
  background: rgba(207, 46, 46, 0.4);
  border-radius: 4px;
}

.dashboard-main::-webkit-scrollbar-thumb:hover {
  background: rgba(207, 46, 46, 0.6);
}

.dashboard-layout::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.45;
}

.dashboard-layout::after {
  content: '';
  position: absolute;
  top: -200px;
  left: 50%;
  transform: translateX(-50%);
  width: 900px;
  height: 600px;
  z-index: 0;
  pointer-events: none;
  background: radial-gradient(ellipse, rgba(207, 46, 46, 0.06) 0%, transparent 70%);
}

.ticker-wrap {
  position: relative;
  z-index: 10;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}

.ticker-inner {
  display: flex;
  gap: 0;
  animation: ticker 30s linear infinite;
  white-space: nowrap;
}

.ticker-inner:hover {
  animation-play-state: paused;
}

@keyframes ticker {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.ticker-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 10px 32px;
  font-family: 'DM Mono', monospace;
  font-size: 11px;
  border-right: 1px solid rgba(255, 255, 255, 0.07);
  flex-shrink: 0;
}

.ticker-sym {
  color: #555;
}

.ticker-val {
  color: #ccc;
}

.ticker-chg.up {
  color: #00e090;
}

.ticker-chg.down {
  color: var(--color-primary);
}

.ticker-chg.neutral {
  color: #888;
}

.dashboard-header {
  position: relative;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
}

.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  gap: 16px;
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.logo-icon {
  width: 36px;
  height: 36px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}

.logo-icon span {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 14px;
  letter-spacing: -0.02em;
}

.logo-text h1 {
  font-family: var(--font-heading);
  font-weight: 900;
  font-size: 18px;
  letter-spacing: 0.25em;
  line-height: 1;
}

.logo-subtitle {
  font-size: 9px;
  letter-spacing: 0.18em;
  color: #555;
  font-family: var(--font-heading);
  font-weight: 600;
}

.text-red {
  color: var(--color-primary);
}

.header-nav {
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
}

.nav-scroll-wrapper {
  flex: 1;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.nav-scroll-wrapper::-webkit-scrollbar {
  display: none;
}

.nav-scroll-content {
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
}

.nav-scroll-fade-left,
.nav-scroll-fade-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 32px;
  pointer-events: none;
  transition: opacity 0.25s;
  opacity: 0;
}

.nav-scroll-fade-left.visible,
.nav-scroll-fade-right.visible {
  opacity: 1;
}

.nav-scroll-btn {
  display: none;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
  transition: all 0.25s;
  flex-shrink: 0;
}

.nav-scroll-btn svg {
  width: 18px;
  height: 18px;
}

.nav-scroll-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: var(--color-primary);
}

.nav-scroll-btn.visible {
  display: flex;
}

.nav-link {
  font-family: var(--font-heading);
  font-weight: 600;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 20px 16px;
  color: #888;
  text-decoration: none;
  transition: all 0.25s;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link.active {
  color: #fff;
  border-bottom-color: var(--color-primary);
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.network-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 2px;
  background: rgba(255, 255, 255, 0.02);
  font-size: 12px;
  font-family: 'DM Mono', monospace;
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00e090;
  display: inline-block;
  animation: pulse-red 2s infinite;
  box-shadow: 0 0 6px #00e090;
}

@keyframes pulse-red {

  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(0, 224, 144, 0.35);
  }

  50% {
    box-shadow: 0 0 0 8px transparent;
  }
}

.btn-primary {
  background: var(--color-primary);
  color: #fff;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 10px 22px;
  transition: all 0.25s;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}

.btn-primary:hover {
  box-shadow: 0 0 24px rgba(207, 46, 46, 0.35);
}

.btn-logout {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 10px 22px;
  transition: all 0.25s;
  clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%);
}

.btn-logout:hover {
  background: rgba(207, 46, 46, 0.15);
  border-color: var(--color-primary);
  color: #fff;
  box-shadow: 0 0 24px rgba(207, 46, 46, 0.35);
}

.dashboard-main {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 32px;
  box-sizing: border-box;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
}

.menu-toggle span {
  display: block;
  width: 20px;
  height: 2px;
  background: #fff;
  transition: all 0.3s;
}

.menu-toggle.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.menu-toggle.active span:nth-child(2) {
  opacity: 0;
}

.menu-toggle.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  z-index: 1000;
}

.mobile-menu.open {
  display: block;
}

.mobile-menu-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
}

.mobile-menu-panel {
  position: absolute;
  top: 0;
  right: 0;
  width: 280px;
  max-width: 85%;
  height: 100%;
  background: var(--color-bg);
  border-left: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
}

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid var(--color-border);
}

.mobile-menu-header h3 {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: #fff;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px 8px;
}

.mobile-nav {
  flex: 1;
  padding: 16px 0;
  overflow-y: auto;
}

.mobile-nav-link {
  display: block;
  padding: 14px 20px;
  color: var(--color-text);
  text-decoration: none;
  font-family: var(--font-heading);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  border-left: 3px solid transparent;
  transition: all 0.25s;
}

.mobile-nav-link:hover {
  background: rgba(255, 255, 255, 0.05);
}

.mobile-nav-link.router-link-active {
  background: rgba(207, 46, 46, 0.1);
  border-left-color: var(--color-primary);
  color: var(--color-primary);
}

.mobile-menu-actions {
  padding: 20px;
  border-top: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.desktop-only {
  display: flex;
}

@media (max-width: 900px) {
  .desktop-only {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .header-nav {
    display: none;
  }
}

@media (max-width: 600px) {
  .logo-text {
    display: none;
  }
}

/* ===== Profile Avatar & Dropdown ===== */
.profile-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.profile-trigger {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px 6px 6px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s;
  border: 1px solid transparent;
  user-select: none;
}

.profile-trigger:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
}

.profile-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #8b1e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 0 0 2px rgba(207, 46, 46, 0.25);
}

.profile-info {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.profile-name {
  font-family: var(--font-heading);
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  letter-spacing: 0.3px;
}

.profile-role {
  font-family: var(--font-body);
  font-size: 11px;
  color: #888;
  text-transform: capitalize;
}

.profile-chevron {
  color: #888;
  transition: transform 0.25s;
  margin-left: 2px;
}

.profile-chevron.open {
  transform: rotate(180deg);
  color: var(--color-primary);
}

.profile-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  min-width: 200px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 8px 0;
  opacity: 0;
  transform: translateY(-8px);
  pointer-events: none;
  transition: all 0.25s ease;
  z-index: 200;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.6);
}

.profile-dropdown.open {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  padding: 10px 16px;
  background: transparent;
  border: none;
  color: #ccc;
  font-family: var(--font-body);
  font-size: 13px;
  cursor: pointer;
  text-decoration: none;
  text-align: left;
  transition: all 0.2s;
}

.dropdown-item:hover {
  background: rgba(207, 46, 46, 0.12);
  color: #fff;
}

.dropdown-item svg {
  flex-shrink: 0;
  color: var(--color-primary);
}

.dropdown-item.danger:hover {
  background: rgba(207, 46, 46, 0.2);
  color: #ff6b6b;
}

.dropdown-item.danger:hover svg {
  color: #ff6b6b;
}

.dropdown-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 6px 12px;
}

/* ===== Mobile User Header ===== */
.mobile-user-header {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  background: rgba(0, 0, 0, 0.3);
}

.mobile-user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--color-primary) 0%, #8b1e1e 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  flex-shrink: 0;
  box-shadow: 0 0 0 3px rgba(207, 46, 46, 0.2);
}

.mobile-user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mobile-user-name {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.mobile-user-role {
  font-family: var(--font-body);
  font-size: 12px;
  color: var(--color-primary);
  text-transform: capitalize;
}
</style>