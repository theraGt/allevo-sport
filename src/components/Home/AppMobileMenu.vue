<template>
  <IonMenu side="end" menu-id="main-menu" content-id="main-content" ref="menuRef" class="mobile-menu-panel"
    @ionWillOpen="onMenuWillOpen" @ionDidClose="onMenuDidClose">
    <IonHeader class="mobile-menu-header">
      <IonToolbar>
        <div class="mobile-menu-brand">
          <img src="/assets/images/logo-alevo.webp" alt="Allevo Sports" class="mobile-menu-logo" />
          <span class="mobile-menu-title">Menú</span>
        </div>
        <button class="mobile-menu-close" @click="closeMenu" slot="end" aria-label="Cerrar menú">
          <ion-icon :icon="closeOutline" class="close-icon"></ion-icon>
        </button>
      </IonToolbar>
    </IonHeader>
    <IonContent class="mobile-menu-content">
      <div class="mobile-menu" :class="{ 'menu-open': menuAnimating }">
        <!-- Main Navigation Links -->
        <div class="mobile-nav-section">
          <template v-for="(link, index) in mobileLinks" :key="link.path">
            <router-link :to="link.path" class="mobile-link"
              :class="{ active: isActive(link.path), 'has-submenu': link.children }"
              @click="link.children ? toggleTalentos() : closeMenu()" :style="{ animationDelay: (index * 40) + 'ms' }">
              <div class="mobile-link-main">
                <ion-icon :icon="link.icon" class="mobile-link-icon"></ion-icon>
                <span>{{ link.label }}</span>
              </div>
              <ion-icon v-if="link.children" :icon="chevronDownOutline" class="mobile-link-arrow"
                :class="{ rotate: showTalentos }"></ion-icon>
            </router-link>

            <!-- Talentos Submenu (Now properly placed after the parent link) -->
            <transition name="submenu" v-if="link.children">
              <div class="mobile-submenu" v-show="showTalentos">
                <router-link v-for="(item, idx) in talentosItems" :key="item.path" :to="item.path" class="sub-link"
                  @click="closeMenu" :style="{ animationDelay: (idx * 30) + 'ms' }">
                  <ion-icon :icon="item.icon" class="sub-link-icon"></ion-icon>
                  {{ item.label }}
                </router-link>
              </div>
            </transition>
          </template>
        </div>

        <!-- CTA Buttons -->
        <div class="mobile-cta-section">
          <button class="btn-primary mobile-cta" @click="openModalFromMenu">
            <ion-icon :icon="personAddOutline" class="cta-icon"></ion-icon>
            Ser un Talento
          </button>
          <button class="btn-outline mobile-cta" @click="goToLoginFromMenu">
            <ion-icon :icon="logInOutline" class="cta-icon"></ion-icon>
            Iniciar Sesión
          </button>
        </div>

        <!-- Footer Info -->
        <div class="mobile-menu-footer">
          <p class="mobile-menu-footer-text">© 2026 Allevo Sports</p>
          <div class="mobile-menu-socials">
            <a href="#" class="social-dot" aria-label="Instagram"></a>
            <a href="#" class="social-dot" aria-label="Facebook"></a>
            <a href="#" class="social-dot" aria-label="YouTube"></a>
          </div>
        </div>
      </div>
    </IonContent>
  </IonMenu>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  menuController,
  IonIcon
} from '@ionic/vue'
import {
  chevronDownOutline,
  closeOutline,
  homeOutline,
  peopleOutline,
  newspaperOutline,
  settingsOutline,
  businessOutline,
  personAddOutline,
  logInOutline,
  mailOutline,
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
const showTalentos = ref(false)
const menuAnimating = ref(false)

// ─── Navigation Data ──────────────────────────────────────────
const mobileLinks = [
  { path: '/', label: 'Inicio', icon: homeOutline },
  { path: '#talentos', label: 'Talentos', icon: peopleOutline, children: true },
  { path: '/noticias', label: 'Noticias', icon: newspaperOutline },
  { path: '/sistema', label: 'Sistema', icon: settingsOutline },
  { path: '/marcas', label: 'Marcas', icon: businessOutline },
  { path: '/se-parte', label: 'Sé parte', icon: personAddOutline },
  { path: '/contacto', label: 'Contacto', icon: mailOutline }
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

// ─── Mobile Menu Logic ────────────────────────────────────────
const closeMenu = () => {
  menuController.close('main-menu')
}

const onMenuWillOpen = () => {
  menuAnimating.value = true
}

const onMenuDidClose = () => {
  menuAnimating.value = false
  showTalentos.value = false
}

const toggleTalentos = () => {
  showTalentos.value = !showTalentos.value
}

const openModalFromMenu = () => {
  closeMenu()
  setTimeout(() => openAtletasModal(), 300)
}

const goToLoginFromMenu = () => {
  closeMenu()
  setTimeout(() => router.push('/admin/login'), 300)
}
</script>

<style scoped>
/* ─── Mobile Menu Styling ───────────────────────────────────── */
.mobile-menu-header :deep(.ion-toolbar) {
  --background: rgba(10, 14, 24, 0.98);
  --border-color: rgba(255, 255, 255, 0.06);
  padding: 0 16px;
}

.mobile-menu-brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-menu-logo {
  height: 56px;
  width: auto;
}

.mobile-menu-title {
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.mobile-menu-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-menu-close:hover {
  background: rgba(239, 68, 68, 0.15);
  border-color: rgba(239, 68, 68, 0.3);
  color: var(--color-primary, #EF4444);
}

.close-icon {
  font-size: 1.2rem;
}

.mobile-menu-content :deep(.ion-content) {
  --background: var(--color-bg, #0A0A0A);
}

.mobile-menu {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-height: 100%;
  background: var(--color-bg, #0A0A0A);
}

.mobile-nav-section {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.mobile-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-size: 0.95rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.04);
  border-radius: 12px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateX(20px);
  animation: slideInRight 0.4s ease forwards;
}

@keyframes slideInRight {
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.menu-open .mobile-link {
  opacity: 1;
  transform: translateX(0);
}

.mobile-link-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.mobile-link-icon {
  font-size: 1.2rem;
  color: var(--color-primary, #EF4444);
  opacity: 0.85;
}

.mobile-link:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.mobile-link.active {
  background: rgba(239, 68, 68, 0.1);
  border-color: rgba(239, 68, 68, 0.25);
  color: var(--color-primary, #EF4444);
}

.mobile-link-arrow {
  font-size: 1rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  color: rgba(255, 255, 255, 0.5);
}

.mobile-link-arrow.rotate {
  transform: rotate(180deg);
}

/* Mobile Submenu */
.mobile-submenu {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 4px 0 4px 12px;
  overflow: hidden;
}

.sub-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 16px;
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.82rem;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  opacity: 0;
  transform: translateY(-6px);
  animation: fadeSlideDown 0.3s ease forwards;
}

@keyframes fadeSlideDown {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-cta-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.mobile-cta {
  width: 100%;
  justify-content: center;
  padding: 14px;
}

.mobile-menu-footer {
  margin-top: auto;
  padding: 32px 16px 16px;
  text-align: center;
}

.mobile-menu-footer-text {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.mobile-menu-socials {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.social-dot:hover {
  background: var(--color-primary, #EF4444);
  transform: scale(1.5);
  box-shadow: 0 0 10px var(--color-primary, #EF4444);
}

/* Transitions */
.submenu-enter-active,
.submenu-leave-active {
  transition: max-height 0.3s ease-out, opacity 0.2s ease;
  max-height: 400px;
}

.submenu-enter-from,
.submenu-leave-to {
  max-height: 0;
  opacity: 0;
}

/* ─── Global Buttons Reference (for styles that might be needed if scoped isn't enough) ─── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-primary, #EF4444);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-outline {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: transparent;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-family: var(--font-heading, 'Oswald', sans-serif);
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.25s ease;
}
</style>
