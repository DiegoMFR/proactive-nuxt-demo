<script setup lang="ts">
interface Props {
  character: Character
  index: number
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center space-x-4 p-4 bg-white/25 dark:bg-black/25 rounded-lg">
    <img :src="character.image" :alt="character.name" :loading="index > 8 ? 'lazy' : 'eager'" class="rounded-full w-12 h-12">
    <p class="truncate" :title="character.name">
      {{ character.name }}
    </p>
    <div class="text-sm grow">
      <UBadge color="black" variant="subtle" class="ring-black dark:ring-white m-1">
        Status: {{ character.status }}
      </UBadge>
      <UBadge color="black" variant="subtle" class="ring-black dark:ring-white m-1">
        Species: {{ character.species }}
      </UBadge>
    </div>
    <UButton :to="`/rickandmorty/characters/${character.id}`" color="black">
      Details
    </UButton>
  </div>
</template>
