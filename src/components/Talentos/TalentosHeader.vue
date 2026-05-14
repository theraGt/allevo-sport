<template>
  <header class="section-header">
    <span class="subtitle">Nuestros Atletas</span>
    <h2>Talento de Alto Rendimiento</h2>
    <div class="accent-line"></div>
  </header>
</template>

<style scoped>
.section-header {
  text-align: center;
  margin-bottom: 50px;
}

.subtitle {
  display: block;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 3px;
  color: #e63946;
  margin-bottom: 10px;
}

.section-header h2 {
  font-family: 'Montserrat', sans-serif;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0 0 20px;
}

.accent-line {
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, #e63946, #ff6b6b);
  margin: 0 auto;
  border-radius: 2px;
}

@media (max-width: 768px) {
  .section-header {
    margin-bottom: 30px;
  }
  .section-header h2 {
    font-size: 1.6rem;
  }
  .subtitle {
    font-size: 0.75rem;
    letter-spacing: 2px;
  }
}

@media (max-width: 480px) {
  .section-header h2 {
    font-size: 1.3rem;
  }
  .subtitle {
    font-size: 0.7rem;
  }
  .accent-line {
    width: 40px;
    height: 3px;
  }
}
</style>
