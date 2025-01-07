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
    <div v-if="character">
      <h1>{{ character.name }}</h1>
      <img :src="character.image" :alt="character.name" class="object-cover min-h-32">
      <p>Status: {{ character.status }}</p>
      <p>Species: {{ character.species }}</p>
      <p>Gender: {{ character.gender }}</p>
      <p>Origin: {{ character.origin.name }}</p>
      <p>Location: {{ character.location.name }}</p>
    </div>
    <div v-else>
      <p>Character not found.</p>
    </div>
  </UContainer>
</template>
