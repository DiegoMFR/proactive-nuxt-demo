import { ref } from 'vue'
import { extractOffset } from './utils'

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon.PokemonListItem[]>([])
  const pokemons = ref<Pokemon.Pokemon[]>([])
  const page = ref(1)
  const isLoading = ref(false)
  const isLastPage = ref(false)

  const fetchFullPokemons = async (list: Pokemon.PokemonListItem[]) => {
    const pokemonPromises = list.map(item => $pokemon<Pokemon.Pokemon>(`pokemon/${item.name}`))
    const data = await Promise.allSettled(pokemonPromises)

    const validData = data
      .filter((result): result is PromiseFulfilledResult<Pokemon.Pokemon> => result.status === 'fulfilled')
      .map(result => result.value)

    if (validData.length === 0) {
      console.error(`No characters where found`)
    }
    else if (validData.length < data.length) {
      console.warn(`Some characters where not found`)
    }
    else {
      pokemons.value.push(...validData)
    }
  }

  const fetchInitialPokemons = async () => {
    const { data } = await usePokemonData<{ results: Pokemon.PokemonListItem[], next: string, previous: string, count: number }>('pokemon?limit=20')
    if (data.value?.results) {
      const offset = extractOffset(data.value.next) ?? 0
      isLastPage.value = offset + 20 >= data.value.count
      pokemonList.value = data.value.results
    }
    page.value++
  }

  const loadMore = async () => {
    if (isLoading.value || isLastPage.value)
      return
    isLoading.value = true
    page.value++
    const data = await $pokemon<{ results: Pokemon.PokemonListItem[], next: string, previous: string, count: number }>(`pokemon?limit=20&offset=${page.value * 20}`)
    if (data.results) {
      const offset = extractOffset(data.next) ?? 0
      isLastPage.value = offset + 20 >= data.count
      await fetchFullPokemons(data.results)
    }
    isLoading.value = false
  }

  return {
    pokemonList,
    pokemons,
    page,
    isLoading,
    isLastPage,
    loadMore,
    fetchFullPokemons,
    fetchInitialPokemons,
  }
})
