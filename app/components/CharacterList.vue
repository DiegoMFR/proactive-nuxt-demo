<script setup lang="ts">
defineProps({
  characters: {
    type: Array as PropType<Character[]>,
  },
})
</script>

<template>
  <div>
    <ul v-if="characters" class="grid grid-cols-4 gap-4">
      <li v-for="character in characters" :key="character.id">
        <UCard :ui="{ body: { padding: 'sm:p-0 p-0' } }">
          <template #header>
            {{ character.name }}
          </template>
          <img :src="character.image" :alt="character.name" loading="lazy" class="w-full object-cover">
          <template #footer>
            <div class="truncate ellipsis">
              <p>Status: {{ character.status }}</p>
              <p>Species: {{ character.species }}</p>
              <p>Gender: {{ character.gender }}</p>
              <p>Origin: {{ character.origin.name }}</p>
              <p>Location: {{ character.location.name }}</p>
            </div>
          </template>
        </UCard>
      </li>
    </ul>
  </div>
</template>
