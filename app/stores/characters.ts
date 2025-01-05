import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('characters', {
  state: () => ({
    characters: [] as Character[],
    page: 1,
    isLoading: false,
    isLastPage: false,
  }),
  actions: {
    async loadMore() {
      if (this.isLoading || this.isLastPage)
        return
      this.isLoading = true
      this.page++
      const newData = await useRickAndMortyData<{ results: Character[], info: { pages: number } }>(`character?page=${this.page}`)
      if (newData.data.value?.results) {
        this.characters.push(...newData.data.value.results)
      }
      this.isLastPage = this.page >= (newData.data.value?.info.pages ?? 0)
      this.isLoading = false
    },
    async fetchInitialCharacters() {
      const { data } = await useRickAndMortyData<{ results: Character[] }>('character')
      this.characters = data.value?.results ?? []
    },
  },
})
