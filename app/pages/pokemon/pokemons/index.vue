<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

useHead({
  title: 'Pokemon',
})

const route = useRoute()
const router = useRouter()
const layout = ref<'list' | 'grid'>((route.query.layout === 'grid' || route.query.layout === 'list') ? route.query.layout : 'list')

const pokemonStore = usePokemonStore()
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
    distance: 10,
    canLoadMore: () => !pokemonStore.isLastPage,
  },
)

watch(() => route.query.layout, (newLayout) => {
  layout.value = (newLayout === 'grid' || newLayout === 'list') ? newLayout : 'list'
})

function updateLayout(newLayout: string) {
  router.replace({ query: { ...route.query, layout: newLayout } })
}
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
