<script setup lang="ts">
interface Props {
  character: Pokemon
  index: number
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-center space-x-4 p-4 bg-white/25 dark:bg-black/25 rounded-lg">
    <img :src="character.sprites.other['official-artwork'].front_default" :alt="character.name" :loading="index > 8 ? 'lazy' : 'eager'" class="rounded-full w-12 h-12">
    <p class="capitalize" :title="character.name">
      {{ character.name }}
    </p>
    <div class="text-sm grow">
      <UBadge color="black" variant="subtle" class="ring-black dark:ring-white m-1">
        Species: {{ character.species.name }}
      </UBadge>
      <UBadge color="black" variant="subtle" class="ring-black dark:ring-white m-1">
        Height: {{ character.height }}
      </UBadge>
    </div>
    <UButton :to="`/pokemon/pokemons/${character.id}`" color="black">
      Details
    </UButton>
  </div>
</template>
