import { onMounted, ref } from 'vue'
import { getRandomName } from '@/api/geRandomName'

export const useRandomWord = () => {
  const word = ref('')
  const getRandomWord = async () => {
    try {
      word.value = await getRandomName()
    } catch (error) {
      console.error(error)
      word.value = ''
    }
  }

  onMounted(() => getRandomWord())

  return {
    word,
    getRandomWord
  }
}
