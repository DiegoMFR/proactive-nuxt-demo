<script setup lang="ts">
useHead({
  title: 'Pokemon',
})

const pokemonStore = usePokemonStore()
const { layout, updateLayout } = useLayout()
await pokemonStore.fetchInitialPokemons()
await pokemonStore.fetchFullPokemons(pokemonStore.pokemonList)

useInfiniteScroll(
  window,
  async () => {
    if (!pokemonStore.isLoading) {
      await pokemonStore.loadMore()
    }
  },
  {
    distance: 500,
    canLoadMore: () => !pokemonStore.isLastPage,
  },
)
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-6xl' }">
    <h1 class="text-6xl font-bold text-center m-20 font-serif">
      Pokémon
    </h1>
    <CharacterList :layout :is-loading="pokemonStore.isLoading" class="mb-20" @update:layout="updateLayout">
      <!-- Column template -->
      <template #columnItem>
        <CharacterListColumn :characters="pokemonStore.pokemons">
          <template #default="{ character, index }">
            <PokemonRowItem :character="character" :index />
          </template>
        </CharacterListColumn>
        <CharacterListSkeletonColumn v-if="pokemonStore.isLoading" class="mt-4 mb-20" />
      </template>

      <!-- Mosaic template -->
      <template #mosaicItem>
        <CharacterListMosaic :characters="pokemonStore.pokemons">
          <template #default="{ character, index }">
            <PokemonMosaicItem :character="character" :index />
          </template>
        </CharacterListMosaic>
        <CharacterListSkeletonMosaic v-if="pokemonStore.isLoading" class="mt-4 mb-20" />
      </template>
    </CharacterList>
    <div v-if="pokemonStore.isLastPage" class="text-center p-20">
      <p>No more Pokemons to load.</p>
    </div>
  </UContainer>
</template>
