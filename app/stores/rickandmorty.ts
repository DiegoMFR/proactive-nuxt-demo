export const useCharacterStore = defineStore('rickandmorty', () => {
  const characters = ref<RickAndMorty.Character[]>([])
  const page = ref(1)
  const isLoading = ref(false)
  const isLastPage = ref(false)

  const loadMore = async () => {
    if (isLoading.value || isLastPage.value)
      return
    isLoading.value = true
    page.value++
    try {
      const data = await $rickAndMorty<{ results: RickAndMorty.Character[], info: { pages: number } }>(`character?page=${page.value}`, { headers: { method: 'GET' } })
      if (data.results) {
        characters.value.push(...data.results)
      }
      isLastPage.value = page.value >= (data.info.pages ?? 0)
    }
    catch (error) {
      console.error('Failed to load more characters:', error)
    }
    finally {
      isLoading.value = false
    }
  }

  const fetchInitialCharacters = async () => {
    const { data } = await useRickAndMortyData<{ results: RickAndMorty.Character[] }>('character', { headers: { method: 'GET' } })
    characters.value = data.value?.results ?? []
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
    fetchInitialCharacters,
    fetchCharacterById,
  }
})
