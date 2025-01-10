import { useStorage } from '@vueuse/core'

export function useLayout() {
  const route = useRoute()
  const router = useRouter()

  const layout = ref<LayoutType>(validateLayoutType(route.query.layout) ? route.query.layout as LayoutType : 'list')
  const savedLayout = useStorage('myAwesomeList:layout', 'list')

  function updateLayout(newLayout: string) {
    if (validateLayoutType(newLayout)) {
      router.replace({ query: { ...route.query, layout: newLayout } })
      savedLayout.value = newLayout
    }
  }

  onMounted(() => {
    if (validateLayoutType(savedLayout.value)) {
      layout.value = savedLayout.value
    }
  })

  watch(layout, (newLayout) => {
    savedLayout.value = newLayout
  })

  return {
    layout,
    savedLayout,
    validateLayoutType,
    updateLayout,
  }
}
