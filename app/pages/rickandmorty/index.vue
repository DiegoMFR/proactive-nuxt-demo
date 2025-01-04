<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

const characterStore = useCharacterStore()
characterStore.fetchInitialCharacters()

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

function handleScroll() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && !characterStore.isLoading) {
    characterStore.loadMore()
  }
}
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-5xl' }">
    <h1>
      Rick and Morty
    </h1>
    <CharacterList :characters="characterStore.characters" />
    <div v-if="characterStore.isLoading" class="text-center">
      <UIcon name="i-svg-spinners:3-dots-scale" />
    </div>
  </UContainer>
</template>
