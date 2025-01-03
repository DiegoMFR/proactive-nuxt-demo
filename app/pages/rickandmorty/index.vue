<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const { data, refresh, error, status, clear } = await useRickAndMortyData<{ results: Character[] }>('character')
const characters = ref<Character[]>(data.value?.results ?? [])
const page = ref(1)
const isLoading = ref(false)

async function loadMore() {
  if (isLoading.value)
    return
  isLoading.value = true
  page.value++
  const newData = await useRickAndMortyData<{ results: Character[] }>(`character?page=${page.value}`)
  if (newData.data.value?.results) {
    characters.value.push(...newData.data.value.results)
  }
  isLoading.value = false
}

function handleScroll() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 500 && !isLoading.value) {
    loadMore()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-4xl' }">
    <h1>
      Rick and Morty
    </h1>
    <CharacterList :characters="characters" />
    <div v-if="isLoading" class="text-center">
      <UIcon name="i-svg-spinners:3-dots-scale" />
    </div>
  </UContainer>
</template>
