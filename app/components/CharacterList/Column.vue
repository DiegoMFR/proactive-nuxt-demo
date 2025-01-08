<script setup lang="ts">
interface Props {
  characters: Array<any>
}
defineProps<Props>()
</script>

<template>
  <div>
    <ul v-if="characters" class="space-y-4 min-w-[min(68rem,100vw-4rem)]">
      <li v-for="(character, index) in characters" :key="index">
        <slot :character :index />
      </li>
    </ul>
  </div>
</template>
