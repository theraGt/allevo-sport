import { ref, computed } from 'vue'

const isOpen = ref(false)

export function useAtletasModal() {
  const openAtletasModal = () => {
    isOpen.value = true
  }

  const closeAtletasModal = () => {
    isOpen.value = false
  }

  return {
    isOpen: computed(() => isOpen.value),
    openAtletasModal,
    closeAtletasModal
  }
}