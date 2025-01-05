<script setup lang="ts">
defineProps({
  characters: {
    type: Array as PropType<Character[]>,
  },
})

const mosaicComp = resolveComponent('CharacterListMosaic')
const columnComp = resolveComponent('CharacterListColumn')
const selected = ref(0)
</script>

<template>
  <div class="flex flex-col items-end space-y-2">
    <UTabs v-model="selected" :items="[{ label: 'List' }, { label: 'Grid' }]" class="w-40 mr-0" :ui="{ list: { background: 'bg-white/25 dark:bg-black/25', marker: { background: 'bg-white/25 dark:bg-black/25' } } }" />
    <component :is=" selected === 0 ? columnComp : mosaicComp" :characters="characters" />
  </div>
</template>
