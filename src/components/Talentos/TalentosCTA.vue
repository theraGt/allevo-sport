<template>
  <div class="cta-banner">
    <div class="banner-content">
      <div class="banner-text">
        <span class="text-white">QUIERO DESARROLLAR</span>
        <span class="text-black">MI TALENTO</span>
        <p>Explora nuestras oportunidades, conecta con mentores y compañeros; comienza hoy mismo tu camino hacia la
          excelencia.</p>
      </div>
      <button class="btn-primary" @click="openAtletasModal">
        Ser un Atleta Allevo
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
          <path
            d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAtletasModal } from '../../composables/useAtletasModal'

const { openAtletasModal } = useAtletasModal()
</script>

<style scoped>
.cta-banner {
  position: relative;
  z-index: 2;
  background-color: #EE2B24;
  padding: 23px 20px;
  border-radius: 12px;
  margin-top: 40px;
}

.cta-banner::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.cta-banner:hover::before {
  left: 100%;
}

.banner-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
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

.banner-text p {
  color: rgba(255, 255, 255, 0.9);
  margin-top: 10px;
  font-size: 0.95rem;
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
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-primary:hover {
  background: #dc2626;
  transform: translateY(-2px);
}

.btn-primary svg {
  width: 14px;
  height: 14px;
}

@media (max-width: 768px) {
  .banner-content {
    flex-direction: column;
    align-items: flex-start;
  }

  .cta-banner {
    padding: 20px 16px;
  }

  .banner-text .text-white,
  .banner-text .text-black {
    font-size: 1.5rem;
  }

  .banner-text p {
    font-size: 0.85rem;
  }

  .btn-primary {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {

  .banner-text .text-white,
  .banner-text .text-black {
    font-size: 1.2rem;
  }
}
</style>