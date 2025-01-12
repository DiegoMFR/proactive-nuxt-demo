<script setup lang="ts">
interface Props {
  layout: LayoutType
}

const props = defineProps<Props>()
const emit = defineEmits(['update:layout'])
const tabsItems = [{ label: 'List' }, { label: 'Grid' }]

const selected = computed({
  get() {
    const tabIndex = tabsItems.findIndex(item => item.label.toLowerCase() === props.layout)
    return tabIndex > -1 ? tabIndex : 0
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
      :ui="{ list: { background: 'bg-white/25 dark:bg-black/25', marker: { background: 'bg-white/25 dark:bg-black/25' }, width: 'w-60', base: 'absolute right-0 -top-11' } }"
    >
      <template #item="{ item }">
        <ClientOnly>
          <!-- Will render in client -->
          <div v-if="item.label === 'List'">
            <slot name="columnItem" />
          </div>
          <div v-else>
            <slot name="mosaicItem" />
          </div>
          <template #fallback>
            <!-- Will render in server -->
            <CharacterListSkeletonColumn v-if="item.label === 'List'" :items-count="20" />
            <CharacterListSkeletonMosaic v-else :items-count="20" />
          </template>
        </ClientOnly>
      </template>
    </UTabs>
  </div>
</template>
