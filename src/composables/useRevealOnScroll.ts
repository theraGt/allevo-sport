import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useRevealOnScroll(options = { threshold: 0.15, rootMargin: '0px' }) {
  const elementRef = ref<Element | null>(null)
  const isRevealed = ref(false)
  const hasRevealed = ref(false)
  let observer: IntersectionObserver | null = null

  const reveal = (ref: Ref<Element | null>) => {
    elementRef.value = ref.value
    
    if (!elementRef.value || typeof IntersectionObserver === 'undefined') {
      isRevealed.value = true
      return
    }

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isRevealed.value = true
            hasRevealed.value = true
            if (observer && elementRef.value) {
              observer.unobserve(elementRef.value)
            }
          }
        })
      },
      {
        threshold: options.threshold,
        rootMargin: options.rootMargin
      }
    )

    observer.observe(elementRef.value)
  }

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return {
    isRevealed,
    hasRevealed,
    reveal
  }
}