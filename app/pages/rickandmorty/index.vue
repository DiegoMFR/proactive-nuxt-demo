<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

useHead({
  title: 'Rick and Morty',
})

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
  <UContainer :ui="{ constrained: 'max-w-6xl' }">
    <h1 class="text-6xl font-bold text-center m-20 font-serif">
      Rick and Morty
    </h1>
    <!-- The list -->
    <CharacterList :characters="characterStore.characters" />

    <!-- Loading sign -->
    <div v-if="characterStore.isLoading" class="text-center">
      <UIcon name="i-svg-spinners:3-dots-scale" />
    </div>

    <!-- End of the list message -->
    <div v-if="characterStore.isLastPage" class="text-center p-20">
      <p>No more characters to load.</p>
    </div>
  </UContainer>
</template>
