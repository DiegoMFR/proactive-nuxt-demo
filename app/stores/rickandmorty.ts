import { hydrateOnIdle } from 'vue'

export const useCharacterStore = defineStore('rickandmorty', () => {
  const characters = ref<RickAndMorty.Character[]>([])
  const page = ref<number>(1)
  const isLoading = ref<boolean>(false)
  const isLastPage = ref<boolean>(false)

  interface RickAndMortyData {
    info: {
      count: number
      pages: number
      next: string
      prev: string
    }
    results: RickAndMorty.Character[]
  }

  const loadMore = async () => {
    isLoading.value = true
    page.value++
    const data = await $rickAndMorty<RickAndMortyData>(`character?page=${page.value}`, { headers: { method: 'GET' } })
    if (data.results) {
      characters.value.push(...data.results)
    }
    isLastPage.value = page.value >= (data.info.pages ?? 0)
    isLoading.value = false
  }

  const fetchInitialPages = async (pages: number) => {
    if (characters.value.length)
      // this should run only when there are no characters in the store
      return
    isLoading.value = true
    const requests = []
    for (let i = 1; i <= pages; i++) {
      requests.push($rickAndMorty<RickAndMortyData>(`character?page=${i}`, { headers: { method: 'GET' } }))
    }
    const results = await Promise.all(requests)
    results.forEach((result) => {
      if (result.results) {
        characters.value.push(...result.results)
      }
    })
    page.value = pages
    isLoading.value = false
    const lastResult = results.pop()
    isLastPage.value = page.value >= (lastResult?.info.pages ?? 1)
  }

  const fetchCharacterById = async (id: number) => {
    const { data } = await useRickAndMortyData<RickAndMorty.Character>(`character/${id}`)
    const existingCharacter = characters.value.find(c => c.id === id)

    if (data.value) {
      if (existingCharacter) {
        Object.assign(existingCharacter, data.value)
      }
      else {
        characters.value.push(data.value)
      }
    }
    else {
      console.error(`Character with id ${id} not found`)
    }
  }

  return {
    characters,
    page,
    isLoading,
    isLastPage,
    loadMore,
    fetchInitialPages,
    fetchCharacterById,
  }
})
