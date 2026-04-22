<template>
  <div class="fab-container">
    <button class="fab-button group" @click="onClick">
      <span class="absolute inset-0 border-2 border-[#CC0000] animate-ping opacity-75 group-hover:hidden"></span>

      <span class="icon-wrapper">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </span>

      <span class="text-wrapper">
        INVERTIR
        <svg xmlns="http://www.w3.org/2000/svg" class="arrow-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  onClick?: () => void;
}>()
</script>

<style scoped>
.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

.fab-button {
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #000000;
  border: 2px solid #CC0000;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.fab-button:hover {
  width: 140px;
  border-radius: 32px;
  background-color: #CC0000;
}

.fab-button:hover .icon-wrapper {
  display: none;
}

.fab-button:hover .text-wrapper {
  opacity: 1;
  transform: translateX(0);
  text-align: center;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.icon {
  width: 28px;
  height: 28px;
  color: #ffffff;
}

.text-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  opacity: 0;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 0.85rem;
  letter-spacing: 0.15em;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.fab-button:hover .text-wrapper {
  opacity: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.arrow-icon {
  width: 16px;
  height: 16px;
  color: #ffffff;
}

.absolute {
  position: absolute;
}

.inset-0 {
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
}

.border-2 {
  border-width: 2px;
}

.border-\[\#CC0000\] {
  border-color: #CC0000;
}

.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
  border-radius: 50%;
}

.opacity-75 {
  opacity: 0.6;
}

.group-hover\:hidden:hover .absolute {
  display: none;
}

@keyframes ping {

  75%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.active\:scale-95:active {
  transform: scale(0.95);
}

/* Responsive */
@media (max-width: 768px) {
  .fab-container {
    bottom: 1.5rem;
    right: 1.5rem;
  }

  .fab-button {
    width: 56px;
    height: 56px;
  }

  .fab-button:hover {
    width: 120px;
    border-radius: 28px;
  }

  .icon {
    width: 24px;
    height: 24px;
  }

  .text-wrapper {
    font-size: 0.8rem;
  }
}
</style>