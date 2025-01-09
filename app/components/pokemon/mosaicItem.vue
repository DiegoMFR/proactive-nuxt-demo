<script setup lang="ts">
interface Props {
  character: Pokemon
  index: number
}

defineProps<Props>()
</script>

<template>
  <UCard :ui="{ body: { padding: 'sm:p-0 p-0' }, background: 'bg-white/25 dark:bg-black/25', ring: 'ring-0', divide: 'divide-none' }">
    <template #header>
      <p class="capitalize truncate" :title="character.name">
        {{ character.name }}
      </p>
    </template>
    <img :src="character.sprites.other['official-artwork'].front_default" :alt="character.name" :loading="index > 8 ? 'lazy' : 'eager'" class="w-full min-h-32">
    <template #footer>
      <div class="text-sm">
        <p><span class="text-black/50 dark:text-white/50">Species:</span> {{ character.species.name }}</p>
        <p><span class="text-black/50 dark:text-white/50">Height:</span> {{ character.height }}</p>
      </div>
      <div class="text-right mt-4">
        <UButton :to="`/pokemon/pokemons/${character.name}`" color="black">
          Details
        </UButton>
      </div>
    </template>
  </UCard>
</template>
