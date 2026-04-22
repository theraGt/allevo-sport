export const vReveal = {
  mounted(el: HTMLElement, binding: any) {
    // Definir la clase base para revelado
    el.classList.add('reveal-on-scroll');
    
    // Si se pasa un valor (ej: v-reveal="'fade-up'"), añadirlo como clase de animación
    if (binding.value) {
      el.classList.add(binding.value);
    } else {
      // Valor por defecto si no se especifica
      el.classList.add('fade-up');
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting || entry.intersectionRatio > 0) {
            el.classList.add('revealed');
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '0px 0px 0px 0px'
      }
    );

    observer.observe(el);
    
    // Guardar referencia del observer para limpieza
    (el as any)._revealObserver = observer;
  },
  unmounted(el: HTMLElement) {
    if ((el as any)._revealObserver) {
      (el as any)._revealObserver.disconnect();
    }
  }
};
