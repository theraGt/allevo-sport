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
        </nav>

        <div class="header-right">
          <div class="network-badge">
            <span class="live-dot"></span>
            <span>POLYGON</span>
          </div>
          <button class="btn-primary">
            CONECTAR WALLET
          </button>
        </div>
      </div>
    </header>

    <div class="dashboard-main">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { tickerData } from '../../../data/adminDashboard'

const tickerItems = [...tickerData, ...tickerData]
</script>

<style scoped>
.dashboard-layout {
  min-height: 100vh;
  background-color: var(--color-bg);
  position: relative;
}

.dashboard-layout::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.45;
}

.dashboard-layout::after {
  content: '';
  position: fixed;
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
  position: sticky;
  top: 0;
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
  font-size: 13px;
  letter-spacing: 0.15em;
  padding: 20px 16px;
  color: #555;
  text-decoration: none;
  transition: all 0.25s;
  border-bottom: 2px solid transparent;
}

.nav-link:hover {
  color: #ccc;
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

.dashboard-main {
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 32px;
}

@media (max-width: 1024px) {
  .header-nav {
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