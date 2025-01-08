import { defineStore } from 'pinia'

export const useCharacterStore = defineStore('rickandmorty', {
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
      const data = await $rickAndMorty<{ results: Character[], info: { pages: number } }>(`character?page=${this.page}`)
      if (data.results) {
        this.characters.push(...data.results)
      }
      this.isLastPage = this.page >= (data.info.pages ?? 0)
      this.isLoading = false
    },
    async fetchInitialCharacters() {
      const { data } = await useRickAndMortyData<{ results: Character[] }>('character')
      this.characters = data.value?.results ?? []
    },
    async fetchCharacterById(id: number) {
      const { data } = await useRickAndMortyData<Character>(`character/${id}`)
      const existingCharacter = this.characters.find(c => c.id === id)

      if (data.value) {
        if (existingCharacter) {
          Object.assign(existingCharacter, data.value)
        }
        else {
          this.characters.push(data.value)
        }
      }
      else {
        console.error(`Character with id ${id} not found`)
      }
    },
  },
})
