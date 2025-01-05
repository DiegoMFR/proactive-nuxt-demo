<script setup lang="ts">
import { appName } from '~/constants'

useHead({
  titleTemplate: titleChunk => titleChunk ? `${titleChunk} - ${appName}` : appName,
  bodyAttrs: {
    class: 'bg-[length:400%_400%] animate-[gradient_15s_ease_infinite] bg-gradient-to-br from-yellow-400/75 via-purple-500/75 to-pink-500/75 dark:from-yellow-800/75 dark:via-purple-900/75 dark:to-pink-900/75 text-stone-800 dark:text-stone-50',
  },
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
#__nuxt {
  min-height: 100dvh;
  margin: 0;
  padding: 0;
}

html,
body {
  min-height: 100dvh;
}
</style>
