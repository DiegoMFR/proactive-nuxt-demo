import { registerEndpoint, renderSuspended } from '@nuxt/test-utils/runtime'
import { screen } from '@testing-library/vue'
import { describe, expect, it } from 'vitest'
import App from '../../app.vue'

registerEndpoint('/api/__api_party/rickAndMorty', () => ({
  info: {
    count: 826,
    pages: 42,
    next: 'https://rickandmortyapi.com/api/character?page=2',
    prev: null,
  },
  results: [
    {
      id: 1,
      name: 'Rick Sanchez',
      status: 'Alive',
      species: 'Human',
      type: '',
      gender: 'Male',
      origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
      },
      location: {
        name: 'Citadel of Ricks',
        url: 'https://rickandmortyapi.com/api/location/3',
      },
      image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
      episode: [
        'https://rickandmortyapi.com/api/episode/1',
      ],
      url: 'https://rickandmortyapi.com/api/character/1',
      created: '2017-11-04T18:48:46.250Z',
    },
  ],
}))

// At page level, we can use a UI testing approach, in this way we can focus on user ineractions and happy flows.
// Therefore we use vue testing library

describe('app', () => {
  it('renders the app correctly', async () => {
    await renderSuspended(App, { route: '/rickandmorty/characters' })
    // Shows the header
    screen.getByRole('heading', { name: /Rick and Morty/i })

    // Shows the character in the list
    const rowItems = screen.getAllByAltText('Rick Sanchez')
    expect(rowItems).toHaveLength(2)

    // Shows the details button
    screen.getByRole('link', { name: 'Details' })
  })
})
