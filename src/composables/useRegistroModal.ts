import { ref, computed } from 'vue'

const isOpen = ref(false)

export function useRegistroModal() {
  const openRegistroModal = () => {
    isOpen.value = true
  }

  const closeRegistroModal = () => {
    isOpen.value = false
  }

  return {
    isOpen: computed(() => isOpen.value),
    openRegistroModal,
    closeRegistroModal
  }
}