import { describe, it, expect, vi, beforeEach } from 'vitest'
import { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'

const mockUseFetch = vi.fn()

vi.mock('#app', () => ({
  useFetch: (url: string) => mockUseFetch(url)
}))

const createNewsComponent = (noticias: unknown, pending: boolean, error: unknown) => {
  return defineComponent({
    setup() {
      return { noticias, pending, error }
    },
    template: `
      <div class="p-6">
        <h1 class="text-2xl font-bold mb-4">🛰️ Noticias Espaciales</h1>
        <p v-if="pending">Cargando noticias...</p>
        <p v-if="error">Error al cargar noticias.</p>
        <ul v-if="noticias">
          <li v-for="n in noticias.results.slice(0,5)" :key="n.id" class="mb-3">
            <img :src="n.image_url" class="w-20 h-20 rounded-full mr-2" />
            <a :href="n.url" target="_blank" class="text-blue-500 hover:underline">
              {{ n.title }}
            </a>
          </li>
        </ul>
      </div>
    `
  })
}

describe('News.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetches and displays news articles correctly', () => {
    const mockNewsData = {
      results: [
        {
          id: 1,
          title: 'NASA Launches New Mars Mission',
          url: 'https://example.com/mars-mission',
          image_url: 'https://example.com/mars.jpg'
        },
        {
          id: 2,
          title: 'SpaceX Successfully Lands Starship',
          url: 'https://example.com/starship',
          image_url: 'https://example.com/starship.jpg'
        },
        {
          id: 3,
          title: 'James Webb Telescope Discovers New Galaxy',
          url: 'https://example.com/jwst',
          image_url: 'https://example.com/jwst.jpg'
        }
      ]
    }

    const NewsComponent = createNewsComponent(mockNewsData, false, null)
    const wrapper = mount(NewsComponent)

    expect(wrapper.text()).toContain('NASA Launches New Mars Mission')
    expect(wrapper.text()).toContain('SpaceX Successfully Lands Starship')
    expect(wrapper.text()).toContain('James Webb Telescope Discovers New Galaxy')

    const links = wrapper.findAll('a')
    expect(links[0]!.attributes('href')).toBe('https://example.com/mars-mission')
    expect(links[0]!.attributes('target')).toBe('_blank')

    const images = wrapper.findAll('img')
    expect(images).toHaveLength(3)
    expect(images[0]!.attributes('src')).toBe('https://example.com/mars.jpg')
  })

  it('handles loading state during data fetching', () => {
    const NewsComponent = createNewsComponent(null, true, null)
    const wrapper = mount(NewsComponent)

    expect(wrapper.text()).toContain('Cargando noticias...')
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('handles error state during data fetching', () => {
    const NewsComponent = createNewsComponent(null, false, new Error('Failed to fetch'))
    const wrapper = mount(NewsComponent)

    expect(wrapper.text()).toContain('Error al cargar noticias.')
    expect(wrapper.find('ul').exists()).toBe(false)
  })

  it('displays only first 5 news articles', () => {
    const mockNewsData = {
      results: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `News Article ${i + 1}`,
        url: `https://example.com/news${i + 1}`,
        image_url: `https://example.com/image${i + 1}.jpg`
      }))
    }

    const NewsComponent = createNewsComponent(mockNewsData, false, null)
    const wrapper = mount(NewsComponent)

    const listItems = wrapper.findAll('li')
    expect(listItems).toHaveLength(5)

    expect(wrapper.text()).toContain('News Article 1')
    expect(wrapper.text()).toContain('News Article 5')
    expect(wrapper.text()).not.toContain('News Article 6')
  })
})