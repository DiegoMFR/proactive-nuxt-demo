import { ref } from 'vue'
import { extractOffset } from './utils'

interface PokemonData {
  count: number
  results: Pokemon.PokemonListItem[]
  next: string
  previous: string
}

export const usePokemonStore = defineStore('pokemon', () => {
  const pokemonList = ref<Pokemon.PokemonListItem[]>([])
  const pokemons = ref<Pokemon.Pokemon[]>([])
  const page = ref(1)
  const isLoading = ref(false)
  const isLastPage = ref(false)

  const fetchFullPokemons = async (list: Pokemon.PokemonListItem[]) => {
    isLoading.value = true
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
    isLoading.value = false
  }

  const fetchInitialPages = async (pages: number = 0) => {
    if (pokemonList.value.length)
      // this should run only when there are no pokemons in the store
      return
    isLoading.value = true
    const requests = []
    for (let i = 0; i <= pages; i++) {
      requests.push($pokemon<PokemonData>(`pokemon?limit=20&offset=${i * 20}`))
    }
    const results = await Promise.all(requests)
    results.forEach((result) => {
      if (result.results) {
        pokemonList.value.push(...result.results)
      }
    })
    page.value = pages
    isLoading.value = false
    const lastResult = results.pop()
    isLastPage.value = lastResult?.count !== undefined ? page.value >= Math.ceil(lastResult.count / 20) : false
  }

  const loadMore = async () => {
    if (isLoading.value || isLastPage.value)
      return
    isLoading.value = true
    page.value++
    const data = await $pokemon<PokemonData>(`pokemon?limit=20&offset=${page.value * 20}`)
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
    fetchInitialPages,
  }
})
