<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const name = (route.params as { name: string }).name
const pokemonStore = usePokemonStore()

const character = computed(() => pokemonStore.pokemons.find(p => p.name === name))
if (!character.value) {
  await pokemonStore.fetchFullPokemons([{ name }])
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
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 place-items-center p-4 bg-white/25 dark:bg-black/25 rounded-2xl shadow">
        <img :src="character.sprites.other['official-artwork'].front_default" :alt="character.name" class="object-cover min-h-32 float-left">
        <div class="text-lg p-10 w-full">
          <p><span class="inline-label">Species:</span> {{ character.species.name }}</p>
          <p><span class="inline-label">Height:</span> {{ character.height }}</p>
          <p><span class="inline-label">Weight:</span> {{ character.weight }}</p>
          <p><span class="inline-label">Base Experience:</span> {{ character.base_experience }}</p>
          <p><span class="inline-label flex">Abilities:</span> {{ character.abilities.map(ability => ability.ability.name).join(', ') }}</p>
          <p><span class="inline-label">Types:</span> {{ character.types.map(type => type.type.name).join(', ') }}</p>
          <p><span class="inline-label">Forms:</span> {{ character.forms.map(form => form.name).join(', ') }}</p>
        </div>
      </div>

      <h2 class="text-2xl mt-8">
        Stats
      </h2>
      <ul class="grid grid-cols-2 gap-4 py-4">
        <li v-for="(stat, index) in character.stats" :key="index" class="bg-white/25 dark:bg-black/25 p-4 rounded-lg shadow">
          <p class="text-lg">
            <span class="inline-label">{{ stat.stat.name }}:</span> {{ stat.base_stat }}
          </p>
        </li>
      </ul>

      <h2 class="text-2xl mt-8">
        Moves
      </h2>
      <ul class="grid grid-cols-3 md:grid-cols-4 gap-4 py-4">
        <li v-for="(move, index) in character.moves" :key="index" class="bg-white/25 dark:bg-black/25 p-4 rounded-lg shadow">
          <p class="text-lg">
            {{ move.move.name }}
          </p>
        </li>
      </ul>
    </section>
    <div v-else>
      <p>Character not found.</p>
    </div>
  </UContainer>
</template>

<style scoped>
.inline-label {
  @apply text-black/50 dark:text-white/50 inline-block w-1/2;
}
</style>
