import { ref, computed, onMounted, onUnmounted } from 'vue'

export function useScrollEffects() {
  const scrollY = ref(0)
  const maxScroll = ref(0)
  const contentHeight = ref(0)
  const windowHeight = ref(0)

  const handleScroll = (event: CustomEvent) => {
    const scrollElement = event.detail.scrollEl
    if (scrollElement) {
      scrollY.value = scrollElement.scrollTop
      maxScroll.value = Math.max(0, scrollElement.scrollHeight - scrollElement.clientHeight)
    }
  }

  const updateDimensions = () => {
    if (typeof window !== 'undefined') {
      windowHeight.value = window.innerHeight
    }
  }

  onMounted(() => {
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateDimensions)
  })

  const navBlurred = computed(() => {
    return scrollY.value > 50
  })

  const readingProgress = computed(() => {
    if (maxScroll.value <= 0) return 0
    return Math.min(1, scrollY.value / maxScroll.value)
  })

  const heroScale = computed(() => {
    const baseScale = 1
    const maxScale = 1.15
    const scrollFactor = Math.min(scrollY.value / 500, 1)
    return baseScale + (maxScale - baseScale) * scrollFactor
  })

  const heroOpacity = computed(() => {
    return Math.max(0, 1 - scrollY.value / 600)
  })

  return {
    scrollY,
    maxScroll,
    contentHeight,
    windowHeight,
    handleScroll,
    navBlurred,
    readingProgress,
    heroScale,
    heroOpacity
  }
}