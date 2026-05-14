import { ref } from 'vue'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  type: ToastType
  title: string
  message?: string
  duration: number
}

const toasts = ref<Toast[]>([])
let nextId = 0

export function useToast() {
  const showToast = (title: string, type: ToastType = 'info', message?: string, duration = 4000) => {
    const id = nextId++
    toasts.value.push({ id, type, title, message, duration })

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, duration)
    }

    return id
  }

  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) {
      toasts.value.splice(index, 1)
    }
  }

  const success = (title: string, message?: string, duration = 4000) => showToast(title, 'success', message, duration)
  const error = (title: string, message?: string, duration = 4000) => showToast(title, 'error', message, duration)
  const info = (title: string, message?: string, duration = 4000) => showToast(title, 'info', message, duration)

  return { toasts, showToast, removeToast, success, error, info }
}