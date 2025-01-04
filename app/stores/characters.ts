import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('characters', {
  state: () => ({
    characters: [] as Character[],
    page: 1,
    isLoading: false,
  }),
  actions: {
    async loadMore() {
      if (this.isLoading)
        return
      this.isLoading = true
      this.page++
      const newData = await useRickAndMortyData<{ results: Character[] }>(`character?page=${this.page}`)
      if (newData.data.value?.results) {
        this.characters.push(...newData.data.value.results)
      }
      this.isLoading = false
    },
    async fetchInitialCharacters() {
      const { data } = await useRickAndMortyData<{ results: Character[] }>('character')
      this.characters = data.value?.results ?? []
    },
  },
})
