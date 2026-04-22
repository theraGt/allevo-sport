import { ref, computed } from 'vue'

const isOpen = ref(false)
const triggerRef = ref<string | null>(null)

export function useModal() {
  const openModal = (trigger?: string) => {
    isOpen.value = true
    triggerRef.value = trigger || null
  }

  const closeModal = () => {
    isOpen.value = false
    triggerRef.value = null
  }

  const toggleModal = (trigger?: string) => {
    if (isOpen.value) {
      closeModal()
    } else {
      openModal(trigger)
    }
  }

  return {
    isOpen: computed(() => isOpen.value),
    trigger: computed(() => triggerRef.value),
    openModal,
    closeModal,
    toggleModal
  }
}