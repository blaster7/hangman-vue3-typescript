<script lang="ts" setup>
import { ref } from 'vue'
import type { GameStatus } from '../types/GameStatus'

const gameStatus = ref<GameStatus | null>(null)

interface Props {
  word: string
}

defineProps<Props>()

const isVisible = ref(false)
const open = (status: GameStatus) => {
  gameStatus.value = status
  isVisible.value = true
}
const close = () => {
  isVisible.value = false
}

defineExpose({
  open,
  close
})

const emit = defineEmits<{ (e: 'restart'): void }>()
</script>

<template>
  <div v-show="isVisible" class="popup-container">
    <div class="popup">
      <h2 v-if="gameStatus === 'win'">Поздравляю, вы победили! 😃</h2>
      <template v-if="gameStatus === 'lose'">
        <h2>Вы проиграли. 😕</h2>
        <h3>
          ...имя: <span class="popup-name">{{ word }}</span>
        </h3>
      </template>
      <button @click="emit('restart')">Сыграть еще раз</button>
    </div>
  </div>
</template>
