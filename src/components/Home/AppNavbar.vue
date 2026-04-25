<template>
  <header class="navbar" :class="{ scrolled: isScrolled }" v-reveal="'fade-in'">
    <div class="navbar-container">
      <div class="navbar-logo">
        <a href="/">
          <img src="/assets/images/logo-alevo.webp" alt="Allevo Sports" />
        </a>
      </div>

      <nav class="navbar-links desktop-only">
        <a href="#inicio" class="nav-link nav-link-underline">Inicio</a>
        <div class="nav-dropdown">
          <button class="nav-link dropdown-trigger" @click="toggleTalentos">
            Talentos <span class="arrow dropdown-arrow" :class="{ rotate: isDropdownOpen }">▾</span>
          </button>
          <div class="dropdown-menu">
            <a href="/talentos" class="dropdown-item">Todos</a>
            <a href="/talentos?filter=Kickboxing" class="dropdown-item">KickBoxing</a>
            <a href="/talentos?filter=Fisicoculturismo" class="dropdown-item">Fisicoculturismo</a>
            <a href="/talentos?filter=Muay+Thai" class="dropdown-item">Muay Thai</a>
            <a href="/talentos?filter=Karate" class="dropdown-item">Karate</a>
            <a href="/talentos?filter=Calistenia" class="dropdown-item">Calistenia</a>
            <a href="/talentos?filter=Boxeo" class="dropdown-item">Boxeo</a>
          </div>
        </div>
        <a href="/noticias" class="nav-link nav-link-underline">Noticias</a>
        <a href="/sistema" class="nav-link nav-link-underline">Sistema</a>
        <a href="/marcas" class="nav-link nav-link-underline">Marcas</a>
        <a href="/contacto" class="nav-link nav-link-underline">Sé parte</a>
      </nav>

      <div class="navbar-cta desktop-only">
        <button class="btn-primary" @click="goToLogin">
          Iniciar Sesión
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
          </svg>
        </button>
      </div>

      <button class="menu-btn mobile-only" @click="openMenu">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
          <path
            d="M104 333H896C929 333 958 304 958 271S929 208 896 208H104C71 208 42 237 42 271S71 333 104 333ZM104 583H896C929 583 958 554 958 521S929 458 896 458H104C71 458 42 487 42 521S71 583 104 583ZM104 833H896C929 833 958 804 958 771S929 708 896 708H104C71 708 42 737 42 771S71 833 104 833Z" />
        </svg>
      </button>
    </div>
  </header>

  <IonMenu side="end" menu-id="main-menu" content-id="main-content" ref="menuRef" class="mobile-menu-panel">
    <IonHeader>
      <IonToolbar>
        <IonTitle>Menú</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <div class="mobile-menu">
        <a href="#inicio" class="mobile-link" @click="closeMenu">Inicio</a>
        <div class="mobile-section">
          <button class="mobile-link" @click="toggleTalentos">
            Talentos <span class="arrow">▾</span>
          </button>
          <div class="mobile-submenu" v-if="showTalentos">
            <a href="/talentos" class="sub-link" @click="closeMenu">Todos</a>
            <a href="/talentos?filter=Kickboxing" class="sub-link" @click="closeMenu">KickBoxing</a>
            <a href="/talentos?filter=Fisicoculturismo" class="sub-link" @click="closeMenu">Fisicoculturismo</a>
            <a href="/talentos?filter=Muay+Thai" class="sub-link" @click="closeMenu">Muay Thai</a>
            <a href="/talentos?filter=Karate" class="sub-link" @click="closeMenu">Karate</a>
            <a href="/talentos?filter=Calistenia" class="sub-link" @click="closeMenu">Calistenia</a>
            <a href="/talentos?filter=Boxeo" class="sub-link" @click="closeMenu">Boxeo</a>
          </div>
        </div>
        <a href="/noticias" class="mobile-link" @click="closeMenu">Noticias</a>
        <a href="/sistema" class="mobile-link" @click="closeMenu">Sistema</a>
        <a href="/marcas" class="mobile-link" @click="closeMenu">Marcas</a>
        <a href="/contacto" class="mobile-link" @click="closeMenu">Sé parte</a>
        <button class="btn-primary mobile-cta" @click="openModalFromMenu">
          Ser un Talento
        </button>
      </div>
    </IonContent>
  </IonMenu>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { IonMenu, IonHeader, IonToolbar, IonTitle, IonContent, menuController } from '@ionic/vue'
import { useModal } from '../../composables/useModal'
import { useAtletasModal } from '../../composables/useAtletasModal'

const router = useRouter()
const { openModal } = useModal()
const { openAtletasModal } = useAtletasModal()

const isScrolled = ref(false)
const showTalentos = ref(false)
const isDropdownOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 300
}

const openMenu = () => {
  (document.querySelector('ion-menu') as any)?.open()
}

const closeMenu = () => {
  (document.querySelector('ion-menu') as any)?.close()
}

const toggleTalentos = () => {
  showTalentos.value = !showTalentos.value
  isDropdownOpen.value = !isDropdownOpen.value
}

const openModalFromMenu = () => {
  closeMenu()
  openAtletasModal()
}

const goToLogin = () => {
  router.push('/admin/login')
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.3);
  transition: all var(--transition-normal);
  padding: 0;
}

.navbar.scrolled {
  background-color: rgba(9, 16, 34, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  max-width: var(--container-max);
  max-height: 100px;
  margin: 0 auto;
  padding: 15px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo a {
  display: block;
}

.navbar-logo img {
  height: 140px;
  width: auto;
  transition: transform var(--transition-fast);
}

.navbar-logo a:hover img {
  transform: scale(1.02);
}

.navbar-links {
  display: flex;
  align-items: center;
  gap: 30px;
}

.nav-link {
  font-family: var(--font-heading);
  font-size: 0.9rem;
  color: var(--color-text);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color var(--transition-fast);
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px 0;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--color-primary);
  transition: width var(--transition-fast);
}

.nav-link:hover {
  color: var(--color-primary);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-dropdown {
  position: relative;
}

.dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 6px;
}

.arrow {
  font-size: 0.7rem;
  transition: transform var(--transition-fast);
}

.nav-dropdown:hover .arrow {
  transform: rotate(180deg);
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  min-width: 180px;
  padding: 10px 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all var(--transition-fast);
}

.nav-dropdown:hover .dropdown-menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  display: block;
  padding: 10px 20px;
  color: var(--color-text);
  font-size: 0.85rem;
  text-transform: uppercase;
  transition: all var(--transition-fast);
}

.dropdown-item:hover {
  background-color: var(--color-primary);
  color: var(--color-text);
  padding-left: 25px;
}

.navbar-cta .btn-primary {
  padding: 10px 20px;
  font-size: 0.85rem;
}

.navbar-cta .btn-primary svg {
  width: 14px;
  height: 14px;
}

.menu-btn {
  background: none;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  padding: 5px;
}

.menu-btn svg {
  width: 28px;
  height: 28px;
}

.desktop-only {
  display: flex;
}

.mobile-only {
  display: none;
}

@media (max-width: 1024px) {
  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: block;
  }
}

.mobile-menu {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: var(--color-bg);
}

.mobile-link {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--color-text);
  text-transform: uppercase;
  padding: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  border-bottom: 1px solid var(--color-border);
  cursor: pointer;
}

.mobile-link:hover {
  color: var(--color-primary);
}

.mobile-submenu {
  padding-left: 20px;
}

.sub-link {
  display: block;
  padding: 10px 0;
  color: var(--color-text-muted);
  font-size: 0.9rem;
  border-bottom: 1px solid var(--color-border);
}

.sub-link:hover {
  color: var(--color-primary);
}

.mobile-cta {
  margin-top: 20px;
  text-align: center;
  width: 100%;
  justify-content: center;
}

:deep(.mobile-menu-panel) {
  --background: var(--color-bg);
}

:deep(.mobile-menu-panel .ion-toolbar) {
  --background: var(--color-surface);
  --color: var(--color-text);
}
</style>