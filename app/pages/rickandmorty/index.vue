<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

useHead({
  title: 'Rick and Morty',
})

const route = useRoute()
const router = useRouter()
const layout = ref<'list' | 'grid'>((route.query.layout === 'grid' || route.query.layout === 'list') ? route.query.layout : 'list')

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

watch(() => route.query.layout, (newLayout) => {
  layout.value = (newLayout === 'grid' || newLayout === 'list') ? newLayout : 'list'
})

function updateLayout(newLayout: string) {
  router.replace({ query: { ...route.query, layout: newLayout } })
}
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-6xl' }">
    <h1 class="text-6xl font-bold text-center m-20 font-serif">
      Rick and Morty
    </h1>
    <CharacterList :characters="characterStore.characters" :is-loading="characterStore.isLoading" :layout @update:layout="updateLayout" />
    <div v-if="characterStore.isLastPage" class="text-center p-20">
      <p>No more characters to load.</p>
    </div>
  </UContainer>
</template>
