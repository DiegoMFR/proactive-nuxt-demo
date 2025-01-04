<script setup lang="ts">
defineProps({
  characters: {
    type: Array as PropType<Character[]>,
  },
})
</script>

<template>
  <div>
    <ul v-if="characters" class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <li v-for="character in characters" :key="character.id">
        <UCard :ui="{ body: { padding: 'sm:p-0 p-0' } }">
          <template #header>
            <p class="truncate" :title="character.name">
              {{ character.name }}
            </p>
          </template>
          <img :src="character.image" :alt="character.name" loading="lazy" class="w-full min-h-32">
          <template #footer>
            <div class="text-sm">
              <p>Status: {{ character.status }}</p>
              <p>Species: {{ character.species }}</p>
            </div>
            <div class="text-right">
              <UButton :to="`/rickandmorty/${character.id}`" class="mt-4">
                Details
              </UButton>
            </div>
          </template>
        </UCard>
      </li>
    </ul>
  </div>
</template>
