<template>
  <header class="bg-white/25 dark:bg-black/25 py-8">
    <UContainer class="flex" :ui="{ constrained: 'max-w-5xl' }">
      <nav>
        <ul class="flex gap-2">
          <li>
            <ApplicationHeaderLink to="/" label="Home" />
          </li>
          <li>
            <ApplicationHeaderLink to="/rickandmorty/characters" label="Rick and Morty" />
          </li>
          <li>
            <ApplicationHeaderLink to="/pokemon/pokemons" label="Pokémon" />
          </li>
          <li>
            <ApplicationHeaderLink to="/assignment" label="Read the assignment instructions" />
          </li>
        </ul>
      </nav>
      <div class="ml-auto">
        <UButton to="https://github.com/spend-cloud-tom/front-end-boilerplate" icon="mdi:github" color="blue" label="GitHub repository" variant="outline" />
      </div>
    </UContainer>
  </header>
</template>
