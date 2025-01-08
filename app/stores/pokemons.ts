import { defineStore } from 'pinia'
import { extractOffset } from './utils'

export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    pokemonsList: [] as PokemonListItem[],
    pokemons: [] as Pokemon[],
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
      const data = await $pokemon<{ results: PokemonListItem[], next: string, previous: string, count: number }>(`pokemon?limit=20&offset=${this.page * 20}`)
      if (data.results) {
        this.pokemonsList.push(...data.results)
        const offset = extractOffset(data.next) ?? 0
        this.isLastPage = offset + 20 >= data.count
        await this.fetchFullPokemons(data.results)
      }

      this.isLoading = false
    },
    async fetchInitialpokemons() {
      const { data } = await usePokemonData<{ results: PokemonListItem[] }>('pokemon')
      this.pokemonsList = data.value?.results ?? []
      await this.fetchFullPokemons(this.pokemonsList)
    },
    async fetchPokemonByName(name: string) {
      const data = await $pokemon<Pokemon>(`pokemon/${name}`)
      const existingCharacter = this.pokemons.find(p => p.name === name)

      if (data) {
        if (existingCharacter) {
          Object.assign(existingCharacter, data)
        }
        else {
          this.pokemons.push(data)
        }
      }
      else {
        console.error(`Character with name ${name} not found`)
      }
    },
    async fetchFullPokemons(list: PokemonListItem[]) {
      const pokemonPromises = list.map(item => this.fetchPokemonByName(item.name))
      await Promise.all(pokemonPromises)
    },
  },
})
