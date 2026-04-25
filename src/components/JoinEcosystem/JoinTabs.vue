<template>
  <section class="join-tabs-section">
    <div class="tabs-container">
      <div class="view-toggle">
        <button 
          class="toggle-btn" 
          :class="{ active: activeRole === 'inversionista' }"
          @click="$emit('update:active-role', 'inversionista')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <line x1="12" y1="1" x2="12" y2="23"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          <span>QUIERO INVERTIR</span>
        </button>
        <button 
          class="toggle-btn" 
          :class="{ active: activeRole === 'talento' }"
          @click="$emit('update:active-role', 'talento')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span>SOY ATLETA</span>
        </button>
        <button 
          class="toggle-btn" 
          :class="{ active: activeRole === 'aliado' }"
          @click="$emit('update:active-role', 'aliado')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>SOY ALIADO</span>
        </button>
        <div class="toggle-indicator" :class="activeRole"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  activeRole: 'inversionista' | 'talento' | 'aliado'
}>()

defineEmits<{
  'update:active-role': [value: 'inversionista' | 'talento' | 'aliado']
}>()
</script>

<style scoped>
.join-tabs-section {
  position: relative;
  z-index: 2;
  padding: 0 20px 40px;
}

.tabs-container {
  display: flex;
  justify-content: center;
  max-width: 600px;
  margin: 0 auto;
}

.view-toggle {
  display: flex;
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 60px;
  padding: 4px;
  width: 100%;
  overflow: hidden;
}

.toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 16px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  flex: 1;
}

.toggle-btn.active {
  color: #fff;
}

.toggle-btn:focus-visible {
  outline: 2px solid #CF2E2E;
  outline-offset: 2px;
  border-radius: 50px;
}

.toggle-btn:hover:not(.active) {
  color: rgba(255, 255, 255, 0.8);
}

.toggle-btn svg {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.toggle-btn.active svg {
  transform: scale(1.1);
}

.toggle-indicator {
  position: absolute;
  top: 4px;
  left: 4px;
  height: calc(100% - 8px);
  width: calc(33.33% - 4px);
  background: linear-gradient(135deg, #CF2E2E 0%, #8b1e1e 100%);
  border-radius: 50px;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1;
  box-shadow: 0 4px 16px rgba(207, 46, 46, 0.4);
}

.toggle-indicator.talento {
  transform: translateX(100%);
}

.toggle-indicator.aliado {
  transform: translateX(200%);
}

@media (max-width: 768px) {
  .view-toggle {
    flex-direction: column;
    border-radius: 20px;
  }
  
  .toggle-btn {
    padding: 14px 20px;
    font-size: 0.75rem;
  }
  
  .toggle-indicator {
    top: auto;
    left: 4px;
    right: 4px;
    width: auto;
    height: calc(33.33% - 4px);
  }
  
  .toggle-indicator.talento {
    transform: translateY(100%);
  }
  
  .toggle-indicator.aliado {
    transform: translateY(200%);
  }
}

@media (max-width: 480px) {
  .toggle-btn span {
    display: none;
  }
  
  .toggle-btn {
    padding: 14px;
  }
  
  .toggle-btn::after {
    content: attr(data-icon);
    font-size: 18px;
  }
}
</style>