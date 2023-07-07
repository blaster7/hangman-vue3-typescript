import { ref } from 'vue'
import TheNotification from '../components/TheNotification.vue'

export const useNotification = () => {
  const notification = ref<InstanceType<typeof TheNotification> | null>(null)

  const showNotification = () => {
    notification.value?.open()
    setTimeout(() => notification.value?.close(), 2000)
  }

  return {
    notification,
    showNotification
  }
}
