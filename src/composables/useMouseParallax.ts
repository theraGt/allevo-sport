import { ref, computed, onMounted, onUnmounted } from 'vue'

/**
 * useMouseParallax
 * @param factor - Intensidad del movimiento (por defecto 20)
 * @param smoothTime - Tiempo de transición en segundos (por defecto 0.2)
 */
export function useMouseParallax(factor = 20, smoothTime = 0.2) {
  const mouseX = ref(0)
  const mouseY = ref(0)
  const isTouch = ref(false)

  const handleMouseMove = (e: MouseEvent) => {
    if (isTouch.value) return
    
    // Normalizar posición de -1 a 1
    const x = (e.clientX / window.innerWidth - 0.5) * 2
    const y = (e.clientY / window.innerHeight - 0.5) * 2
    
    mouseX.value = x * factor
    mouseY.value = y * factor
  }

  const handleTouch = () => {
    isTouch.value = true
  }

  onMounted(() => {
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchstart', handleTouch, { once: true })
  })

  onUnmounted(() => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('touchstart', handleTouch)
  })

  const parallaxStyle = computed(() => {
    if (isTouch.value) return {}
    
    return {
      transform: `translate3d(${mouseX.value}px, ${mouseY.value}px, 0)`,
      transition: `transform ${smoothTime}s ease-out`,
      willChange: 'transform'
    }
  })

  return {
    mouseX,
    mouseY,
    parallaxStyle,
    isTouch
  }
}
