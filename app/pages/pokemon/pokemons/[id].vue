<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const id = (route.params as { id: string }).id
const characterStore = useCharacterStore()

const character = computed(() => characterStore.characters.find(c => c.id === Number.parseInt(id)))
if (!character.value) {
  await characterStore.fetchCharacterById(Number(id))
}

useHead({
  title: () => character.value?.name || 'Character not found',
})
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-4xl' }">
    <section v-if="character">
      <h1 class="text-6xl font-bold text-center m-20 font-serif">
        {{ character.name }}
      </h1>
      <div class="flex items-center space-x-4 p-4 bg-white/25 dark:bg-black/25 rounded-2xl shadow">
        <img :src="character.image" :alt="character.name" class="object-cover min-h-32 float-left rounded-md">
        <div class="text-lg p-10">
          <p><span class="text-black/50 dark:text-white/50 inline-block w-24">Status:</span> {{ character.status }}</p>
          <p><span class="text-black/50 dark:text-white/50 inline-block w-24">Species:</span> {{ character.species }}</p>
          <p><span class="text-black/50 dark:text-white/50 inline-block w-24">Gender:</span> {{ character.gender }}</p>
          <p><span class="text-black/50 dark:text-white/50 inline-block w-24">Origin:</span> {{ character.origin.name }}</p>
          <p><span class="text-black/50 dark:text-white/50 inline-block w-24">Location:</span> {{ character.location.name }}</p>
        </div>
      </div>

      <h2 class="text-2xl mt-8">
        Episodes
      </h2>
      <ul class="w-full grid grid-cols-8 gap-2 py-8">
        <li v-for="(episode, index) in character.episode" :key="index">
          <UButton :to="`/rickandmorty/episodes/${episode.split('/').pop()}`" class="w-full" color="black">
            Episode {{ episode.split('/').pop() }}
          </UButton>
        </li>
      </ul>
    </section>
    <div v-else>
      <p>Character not found.</p>
    </div>
  </UContainer>
</template>
