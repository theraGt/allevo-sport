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
          <router-link to="/admin/dashboard/overview" class="nav-link"
            :class="{ active: $route.path.includes('overview') }">
            PANEL RWA
          </router-link>
          <router-link to="/admin/dashboard/atletas" class="nav-link"
            :class="{ active: $route.path.includes('atletas') }">
            TALENTOS
          </router-link>
          <router-link to="/admin/dashboard/sponsors" class="nav-link"
            :class="{ active: $route.path.includes('sponsors') }">
            SPONSORS
          </router-link>
          <router-link to="/admin/dashboard/inversionistas" class="nav-link"
            :class="{ active: $route.path.includes('inversionistas') }">
            INVERSIONISTAS
          </router-link>
          <router-link to="/admin/dashboard/proyectos" class="nav-link"
            :class="{ active: $route.path.includes('proyectos') }">
            PROYECTOS
          </router-link>
        </nav>

        <div class="header-right">
          <button class="menu-toggle" @click="toggleMenu" :class="{ active: isMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div class="network-badge desktop-only">
            <span class="live-dot"></span>
            <span>POLYGON</span>
          </div>
          <button class="btn-primary desktop-only">
            CONECTAR WALLET
          </button>
          <button class="btn-logout desktop-only" @click="logout">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16">
              <path d="M377.9 105.9L340.7 68.7c-7.5-7.5-19.7-7.5-27.2 0l-25.2 25.2c-7.5 7.5-7.5 19.7 0 27.2l47.1 47.1H224c-13.3 0-24 10.7-24 24v32c0 13.3 10.7 24 24 24h136.6l-47.1 47.1c-7.5 7.5-7.5 19.7 0 27.2l25.2 25.2c7.5 7.5 19.7 7.5 27.2 0l37.2-37.2c7.5-7.5 7.5-19.7 0-27.2zM224 352h-64c-13.3 0-24-10.7-24-24V128c0-13.3 10.7-24 24-24h64c13.3 0 24 10.7 24 24v200c0 13.3-10.7 24-24 24zM160 128c-13.3 0-24-10.7-24-24S146.7 80 160 80h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H160z"/>
            </svg>
            SALIR
          </button>
        </div>
      </div>
    </header>

    <div class="mobile-menu" :class="{ open: isMenuOpen }">
      <div class="mobile-menu-overlay" @click="closeMenu"></div>
      <div class="mobile-menu-panel">
        <div class="mobile-menu-header">
          <h3>MENU</h3>
          <button class="close-btn" @click="closeMenu">✕</button>
        </div>
        <nav class="mobile-nav">
          <router-link to="/admin/dashboard/overview" class="mobile-nav-link" @click="closeMenu">PANEL RWA</router-link>
          <router-link to="/admin/dashboard/atletas" class="mobile-nav-link" @click="closeMenu">TALENTOS</router-link>
          <router-link to="/admin/dashboard/sponsors" class="mobile-nav-link" @click="closeMenu">SPONSORS</router-link>
          <router-link to="/admin/dashboard/inversionistas" class="mobile-nav-link" @click="closeMenu">INVERSIONISTAS</router-link>
          <router-link to="/admin/dashboard/proyectos" class="mobile-nav-link" @click="closeMenu">PROYECTOS</router-link>
        </nav>
        <div class="mobile-menu-actions">
          <button class="btn-primary" @click="closeMenu">CONECTAR WALLET</button>
          <button class="btn-logout" @click="handleLogout">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" width="16" height="16">
              <path d="M377.9 105.9L340.7 68.7c-7.5-7.5-19.7-7.5-27.2 0l-25.2 25.2c-7.5 7.5-7.5 19.7 0 27.2l47.1 47.1H224c-13.3 0-24 10.7-24 24v32c0 13.3 10.7 24 24 24h136.6l-47.1 47.1c-7.5 7.5-7.5 19.7 0 27.2l25.2 25.2c7.5 7.5 19.7 7.5 27.2 0l37.2-37.2c7.5-7.5 7.5-19.7 0-27.2zM224 352h-64c-13.3 0-24-10.7-24-24V128c0-13.3 10.7-24 24-24h64c13.3 0 24 10.7 24 24v200c0 13.3-10.7 24-24 24zM160 128c-13.3 0-24-10.7-24-24S146.7 80 160 80h64c13.3 0 24 10.7 24 24s-10.7 24-24 24H160z"/>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { tickerData } from '../../../data/adminDashboard'

const router = useRouter()
const tickerItems = [...tickerData, ...tickerData]
const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false
}

const logout = () => {
  router.push('/admin/login')
}

const handleLogout = () => {
  closeMenu()
  router.push('/admin/login')
}
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

.dashboard-layout > .ticker-wrap {
  flex-shrink: 0;
}

.dashboard-layout > .dashboard-header {
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
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
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

.ticker-sym { color: #555; }
.ticker-val { color: #ccc; }
.ticker-chg.up { color: #00e090; }
.ticker-chg.down { color: var(--color-primary); }
.ticker-chg.neutral { color: #888; }

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

@media (max-width: 1024px) {
  .header-nav {
    display: none;
  }

  .menu-toggle {
    display: flex;
  }

  .desktop-only {
    display: none;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 16px;
  }

  .logo-text {
    display: none;
  }

  .dashboard-main {
    padding: 16px;
  }

  .page-header {
    margin-bottom: 24px;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }

  .sep {
    width: 32px;
    height: 2px;
    background: var(--color-primary);
  }

  .section-label {
    font-size: 11px;
    letter-spacing: 0.2em;
    color: var(--color-primary);
    font-family: var(--font-heading);
    font-weight: 700;
  }

  .page-title {
    font-family: var(--font-heading);
    font-weight: 900;
    font-size: clamp(28px, 4vw, 44px);
    letter-spacing: 0.04em;
    line-height: 1;
    margin-bottom: 6px;
  }

  .title-sub {
    font-size: 0.55em;
    color: #2a2a2a;
    margin-left: 12px;
  }
}
</style>