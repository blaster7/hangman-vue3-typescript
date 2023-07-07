<script setup lang="ts">
interface Props {
  word: string
  correctLetter: string[]
}
defineProps<Props>()
</script>

<template>
  <div class="word">
    <span v-for="(letter, index) in word" class="letter" :key="index">
      {{ correctLetter.includes(letter) ? letter : '' }}
    </span>
  </div>
</template>
