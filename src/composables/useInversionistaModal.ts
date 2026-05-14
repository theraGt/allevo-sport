import { ref, computed } from 'vue'
import { atletas as atletasData } from '../data/atletas'

const isOpen = ref(false)
const preselectedSlug = ref<string | null>(null)

export function useInversionistaModal() {
  const openInversionistaModal = (slug?: string) => {
    isOpen.value = true
    if (slug) {
      const exists = atletasData.find(a => a.slug === slug)
      if (exists) {
        preselectedSlug.value = slug
      }
    }
  }

  const closeInversionistaModal = () => {
    isOpen.value = false
    preselectedSlug.value = null
  }

  return {
    isOpen: computed(() => isOpen.value),
    preselectedSlug: computed(() => preselectedSlug.value),
    openInversionistaModal,
    closeInversionistaModal
  }
}