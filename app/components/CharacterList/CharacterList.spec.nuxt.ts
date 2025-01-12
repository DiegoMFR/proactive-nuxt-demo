import { mountSuspended } from '@nuxt/test-utils/runtime'
import { beforeEach, describe, expect, it } from 'vitest'
import CharacterList from './CharacterList.vue'

// At component level, we need to use a unit test approach, to observe the component behavior in isolation (but without testing implementation details)
// therefore we use vue test utils
async function factory({ props, slots }: { props: any, slots: any }) {
  return mountSuspended(CharacterList, {
    props,
    slots,
  })
}

describe('characterList', () => {
  let wrapper: any

  beforeEach(async () => {
    wrapper = await factory({ slots: {
      columnItem: '<div class="column-item">Column Item</div>',
      mosaicItem: '<div class="mosaic-item">Mosaic Item</div>',
    }, props: { layout: 'list' } })
  })

  it('renders correctly with list layout', () => {
    expect(wrapper.find('.column-item').isVisible()).toBe(true)
    expect(wrapper.find('.mosaic-item').isVisible()).toBe(false)
  })

  it('renders correctly with grid layout', async () => {
    await wrapper.setProps({ layout: 'grid' })
    expect(wrapper.find('.column-item').isVisible()).toBe(false)
    expect(wrapper.find('.mosaic-item').isVisible()).toBe(true)
  })
})
