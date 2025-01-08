<script setup lang="ts">
interface Props {
  characters: Array<any>
}
defineProps<Props>()
</script>

<template>
  <ul v-if="characters" class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <li v-for="(character, index) in characters" :key="character.id">
      <slot :character :index />
    </li>
  </ul>
</template>
