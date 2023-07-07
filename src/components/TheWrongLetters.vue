<script setup lang="ts">
interface Props {
  wrongLetter: string[]
}

defineProps<Props>()
</script>

<template>
  <div v-if="wrongLetter.length" class="wrong-letters-container">
    <div class="wrong-letters">
      <p>Ошибки</p>
      <span v-for="(letter, index) in wrongLetter" :key="index">
        {{ index === wrongLetter.length - 1 ? letter : `${letter}, ` }}
      </span>
    </div>
  </div>
</template>
