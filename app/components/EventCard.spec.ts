import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import EventCard from './EventCard.vue'

describe('EventCard.vue', () => {
  it('renders event details correctly', () => {
    const mockEvent = {
      id: 1,
      nombre: 'Eclipse Solar Total',
      fecha: '2025-08-12',
      descripcion: 'Un eclipse solar total visible en partes de América del Norte.',
      url: 'https://example.com/eclipse-solar-total'
    }

    const wrapper = mount(EventCard, {
      props: {
        event: mockEvent
      }
    })

    // Verify event name is rendered
    expect(wrapper.text()).toContain('Eclipse Solar Total')

    // Verify event date is rendered
    expect(wrapper.text()).toContain('2025-08-12')

    // Verify event description is rendered
    expect(wrapper.text()).toContain('Un eclipse solar total visible en partes de América del Norte.')

    // Verify link has correct href
    const link = wrapper.find('a')
    expect(link.attributes('href')).toBe('https://example.com/eclipse-solar-total')
    expect(link.attributes('target')).toBe('_blank')

    // Verify "Más información" text is present
    expect(wrapper.text()).toContain('Más información')
  })
})
