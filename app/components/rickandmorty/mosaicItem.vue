<script setup lang="ts">
interface Props {
  character: Character
  index: number
}

defineProps<Props>()
</script>

<template>
  <UCard :ui="{ body: { padding: 'sm:p-0 p-0' }, background: 'bg-white/25 dark:bg-black/25', ring: 'ring-0', divide: 'divide-none' }">
    <template #header>
      <p class="truncate" :title="character.name">
        {{ character.name }}
      </p>
    </template>
    <img :src="character.image" :alt="character.name" :loading="index > 8 ? 'lazy' : 'eager'" class="w-full min-h-32">
    <template #footer>
      <div class="text-sm">
        <p><span class="text-black/50 dark:text-white/50">Status:</span> {{ character.status }}</p>
        <p><span class="text-black/50 dark:text-white/50">Species:</span> {{ character.species }}</p>
      </div>
      <div class="text-right mt-4">
        <UButton :to="`/rickandmorty/characters/${character.id}`" color="black">
          Details
        </UButton>
      </div>
    </template>
  </UCard>
</template>
