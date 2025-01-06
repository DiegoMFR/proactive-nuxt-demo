<script setup lang="ts">
interface Props {
  characters: Character[]
  isLoading: boolean
  layout: 'list' | 'grid'
}

const props = defineProps<Props>()
const emit = defineEmits(['update:layout'])
const tabsItems = [{ label: 'List' }, { label: 'Grid' }]

const selected = computed({
  get() {
    return tabsItems.findIndex(item => item.label.toLowerCase() === props.layout)
  },
  set(value) {
    if (tabsItems[value]) {
      emit('update:layout', tabsItems[value].label.toLowerCase())
    }
  },
})
</script>

<template>
  <div class="flex flex-col items-end space-y-2">
    <UTabs
      v-model="selected"
      :items="tabsItems"
      class="w-40 mr-0"
      :ui="{ list: { background: 'bg-white/25 dark:bg-black/25', marker: { background: 'bg-white/25 dark:bg-black/25' } } }"
    />
    <ClientOnly>
      <!-- Will render in client -->
      <div v-if="selected === 0">
        <CharacterListColumn :characters="characters" />
        <CharacterListSkeletonColumn v-if="isLoading" />
      </div>
      <div v-else>
        <CharacterListMosaic :characters="characters" />
        <CharacterListSkeletonMosaic v-if="isLoading" />
      </div>
      <template #fallback>
        <!-- Will render in server -->
        <CharacterListSkeletonColumn v-if="selected === 0" :items-count="10" />
        <CharacterListSkeletonMosaic v-else :items-count="10" />
      </template>
    </ClientOnly>
  </div>
</template>
