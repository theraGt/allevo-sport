import { ref, watch, onUnmounted } from 'vue'

export function useCountUp(
  targetValue: number,
  duration = 2000,
  options = { startImmediately: true, decimals: 0 }
) {
  const currentValue = ref(0)
  let animationFrame: number | null = null
  let startTime: number | null = null

  const easeOutQuad = (t: number): number => {
    return 1 - (1 - t) * (1 - t)
  }

  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp
    const elapsed = timestamp - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easedProgress = easeOutQuad(progress)

    currentValue.value = parseFloat((easedProgress * targetValue).toFixed(options.decimals))

    if (progress < 1) {
      animationFrame = requestAnimationFrame(animate)
    }
  }

  const start = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    startTime = null
    currentValue.value = 0
    animationFrame = requestAnimationFrame(animate)
  }

  const reset = () => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
    startTime = null
    currentValue.value = 0
  }

  if (options.startImmediately) {
    start()
  }

  watch(
    () => targetValue,
    () => {
      start()
    }
  )

  onUnmounted(() => {
    if (animationFrame) {
      cancelAnimationFrame(animationFrame)
    }
  })

  return {
    currentValue,
    start,
    reset
  }
}