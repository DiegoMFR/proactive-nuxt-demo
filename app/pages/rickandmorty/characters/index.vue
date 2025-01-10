<script setup lang="ts">
useHead({
  title: 'Rick and Morty',
})

const characterStore = useCharacterStore()
characterStore.fetchInitialCharacters()
const characterListRef = ref()
const { layout, updateLayout } = useLayout()

useInfiniteScroll(
  window,
  async () => {
    if (!characterStore.isLoading) {
      await characterStore.loadMore()
    }
  },
  {
    distance: 100,
    canLoadMore: () => !characterStore.isLastPage,
  },
)
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-6xl' }">
    <h1 class="text-6xl font-bold text-center m-20 font-serif">
      Rick and Morty
    </h1>
    <CharacterList ref="characterListRef" :layout @update:layout="updateLayout">
      <!-- Column template -->
      <template #columnItem>
        <CharacterListColumn :characters="characterStore.characters" class="mb-20">
          <template #default="{ character, index }">
            <RickandmortyRowItem :character="character" base-url="/rickandmorty/characters" :index />
          </template>
        </CharacterListColumn>
        <CharacterListSkeletonColumn v-if="characterStore.isLoading" class="my-4" />
      </template>

      <!-- Mosaic template -->
      <template #mosaicItem>
        <CharacterListMosaic :characters="characterStore.characters">
          <template #default="{ character, index }">
            <RickandmortyMosaicItem :character="character" base-url="/rickandmorty/characters" :index />
          </template>
        </CharacterListMosaic>
        <CharacterListSkeletonMosaic v-if="characterStore.isLoading" class="my-4" />
      </template>
    </CharacterList>
    <div v-if="characterStore.isLastPage" class="text-center p-20">
      <p>No more characters to load.</p>
    </div>
  </UContainer>
</template>
