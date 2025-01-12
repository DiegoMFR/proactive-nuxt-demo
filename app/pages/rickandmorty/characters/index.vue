<script setup lang="ts">
useHead({
  title: 'Rick and Morty',
})

const route = useRoute()
const router = useRouter()

const characterStore = useCharacterStore()
const { layout, updateLayout } = useLayout()
const page = ref(Number(route.query.page) || 1)
await characterStore.fetchInitialPages(page.value)

useInfiniteScroll(
  window,
  async () => {
    await characterStore.loadMore()
  },
  {
    distance: 100,
    canLoadMore: () => !characterStore.isLastPage && !characterStore.isLoading,
  },
)

watch(() => characterStore.page, (newPage) => {
  if (newPage) {
    router.replace({ query: { ...route.query, page: newPage } })
    page.value = newPage
  }
})
</script>

<template>
  <UContainer :ui="{ constrained: 'max-w-6xl' }">
    <h1 class="text-6xl font-bold text-center m-20 font-serif">
      Rick and Morty
    </h1>
    <CharacterList :layout @update:layout="updateLayout">
      <!-- Column template -->
      <template #columnItem>
        <CharacterListColumn :characters="characterStore.characters">
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
