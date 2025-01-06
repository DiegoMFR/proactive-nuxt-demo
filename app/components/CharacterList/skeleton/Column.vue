<script setup lang="ts">
interface Props {
  itemsCount?: number
}

const { itemsCount = 4 } = defineProps<Props>()

const config = { background: 'bg-white/25 dark:bg-black/25' }
</script>

<template>
  <ul class="space-y-4 min-w-[min(68rem,100vw-4rem)]">
    <li v-for="n in itemsCount" :key="n">
      <div class="flex items-center space-x-4 p-4 bg-white/25 dark:bg-black/25 rounded-lg">
        <USkeleton class="w-12 h-12" :ui="{ ...config, rounded: 'rounded-full' }" />
        <USkeleton class="h-4 w-[140px]" :ui="config" />
        <div class="text-sm grow flex space-x-1">
          <USkeleton class="h-3 w-[50px]" :ui="config" />
          <USkeleton class="h-3 w-[40px]" :ui="config" />
        </div>
        <USkeleton class="h-8 w-[65px]" :ui="config" />
      </div>
    </li>
  </ul>
</template>
