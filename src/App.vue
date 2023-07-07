<script lang="ts" setup>
import TheHeader from './components/TheHeader.vue'
import TheFigure from './components/TheFigure.vue'
import TheWrongLetters from './components/TheWrongLetters.vue'
import TheWord from './components/TheWord.vue'
import ThePopup from './components/ThePopup.vue'
import TheNotification from './components/TheNotification.vue'
import { ref, watch } from 'vue'
import { useRandomWord } from './composables/useRandomWord'
import { useLetters } from './composables/useLetters'
import { useNotification } from './composables/useNotification'

const { word, getRandomWord } = useRandomWord()
const { letters, correctLetter, wrongLetters, isLose, isWin, addLetter, resetLetters } =
  useLetters(word)
const { notification, showNotification } = useNotification()
const popup = ref<InstanceType<typeof ThePopup> | null>(null)
const restart = async () => {
  await getRandomWord()
  letters.value = []
  resetLetters()
  popup.value?.close()
}

watch(wrongLetters, () => {
  if (isLose.value) {
    popup.value?.open('lose')
  }
})

watch(correctLetter, () => {
  if (isWin.value) {
    popup.value?.open('win')
  }
})

window.addEventListener('keydown', ({ key }) => {
  if (isLose.value || isWin.value) {
    return
  }

  if (letters.value.includes(key)) {
    showNotification()
    return
  }

  addLetter(key)
})
</script>

<template>
  <TheHeader />
  <div class="game-container">
    <TheFigure :wrong-letter-count="wrongLetters.length" />
    <TheWrongLetters :wrong-letter="wrongLetters" />
    <TheWord :word="word" :correct-letter="correctLetter" />
  </div>
  <ThePopup ref="popup" :word="word" @restart="restart" />
  <TheNotification ref="notification" />
</template>
