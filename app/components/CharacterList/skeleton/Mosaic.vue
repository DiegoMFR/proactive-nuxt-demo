<script setup lang="ts">
interface Props {
  itemsCount?: number
}

const { itemsCount = 4 } = defineProps<Props>()

const config = { background: 'bg-white/25 dark:bg-black/25' }
</script>

<template>
  <ul class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <li v-for="n in itemsCount" :key="n">
      <UCard :ui="{ body: { padding: 'sm:p-0 p-0' }, background: 'bg-white/25 dark:bg-black/25', ring: 'ring-0', divide: 'divide-none' }">
        <template #header>
          <USkeleton class="h-4 w-[140px]" :ui="config" />
        </template>
        <USkeleton class="h-[168px] max-w-full w-[260px] lg:h-[260px]" :ui="config" />
        <template #footer>
          <div class="space-y-2">
            <USkeleton class="h-3 w-[150px]" :ui="config" />
            <USkeleton class="h-3 w-[100px]" :ui="config" />
            <div class="flex flex-col items-end pt-4">
              <USkeleton class="h-8 w-[65px]" :ui="config" />
            </div>
          </div>
        </template>
      </UCard>
    </li>
  </ul>
</template>
