<template>
  <section class="sponsor-cta section" id="sponsor-cta">
    <h2 class="background-text" ref="backgroundText">SPONSOR</h2>

    <div class="red-banner">
      <div class="banner-content">
        <div class="banner-text">
          <span class="text-white">CONVIÉRTETE EN UNA</span>
          <span class="text-black">MARCA PATROCINADORA</span>
        </div>

        <button class="banner-btn" @click="openModal">
          QUIERO PATROCINAR
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
            <path
              d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useModal } from '../../composables/useModal'

const { openModal } = useModal()

const backgroundText = ref<HTMLElement | null>(null)

const handleScroll = () => {
  if (backgroundText.value) {
    const scrollY = window.scrollY
    const speed = 0.15
    backgroundText.value.style.transform = `translate(-50%, calc(-50% + ${scrollY * speed}px))`
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.sponsor-cta {
  position: relative;
  background-color: var(--color-surface);
  overflow: hidden;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background-text {
  position: absolute;
  top: 23%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Oswald', sans-serif;
  font-size: clamp(4rem, 20vw, 14rem);
  font-weight: 800;
  color: #F9B7C5;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
  line-height: 1;
  animation: pulse 5s ease-in-out infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }

  50% {
    opacity: 1.85;
    transform: translate(-50%, -50%) scale(1.02);
  }
}

.red-banner {
  position: absolute;
  bottom: 10%;
  left: 10%;
  right: 10%;
  background-color: #EE2B24;
  z-index: 2;
  padding: 33px 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.red-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg,
      transparent,
      rgba(255, 255, 255, 0.3),
      transparent);
  transition: left 0.5s ease;
  z-index: -1;
}

.red-banner:hover {
  transform: scale(1.01);
  box-shadow: 0 10px 30px rgba(238, 43, 36, 0.4);
}

.red-banner:hover::before {
  left: 100%;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  gap: 30px;
}

.banner-text {
  display: flex;
  flex-direction: column;
}

.banner-text .text-white {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 1.2;
}

.banner-text .text-black {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #000000;
  text-transform: uppercase;
  line-height: 1.2;
}

.banner-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  background-color: #0D1117;
  border: none;
  padding: 16px 32px;
  font-family: 'Oswald', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50px;
  white-space: nowrap;
}

.banner-btn:hover {
  background-color: #EE2B24;
  transform: translateX(5px);
}

.banner-btn svg {
  width: 18px;
  height: 18px;
  transition: transform 0.9s ease;
}

.banner-btn:hover svg {
  transform: translateX(5px);
}

@media (max-width: 768px) {
  .sponsor-cta {
    min-height: 280px;
  }

  .background-text {
    font-size: clamp(3rem, 25vw, 8rem);
  }

  .banner-content {
    flex-direction: column;
    text-align: center;
    gap: 25px;
  }

  .banner-text {
    align-items: center;
  }

  .banner-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>