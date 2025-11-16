import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Events from './Events.vue'
import EventCard from './EventCard.vue'

describe('Events.vue', () => {
  it('displays a list of EventCard components', () => {
    const wrapper = mount(Events, {
      global: {
        components: {
          EventCard
        }
      }
    })

    // Check that EventCard components are rendered
    const eventCards = wrapper.findAllComponents(EventCard)
    expect(eventCards).toHaveLength(2)

    // Verify first event card has correct props
    expect(eventCards[0].props('event')).toEqual({
      id: 1,
      nombre: 'Eclipse Solar Total',
      fecha: '2025-08-12',
      descripcion: 'Un eclipse solar total visible en partes de América del Norte.',
      url: 'https://example.com/eclipse-solar-total'
    })

    // Verify second event card has correct props
    expect(eventCards[1].props('event')).toEqual({
      id: 2,
      nombre: 'Lluvia de Meteoros Perseidas',
      fecha: '2025-08-13',
      descripcion: 'Una lluvia de meteoros anual visible en el hemisferio norte.',
      url: 'https://example.com/lluvia-meteoros-perseidas'
    })
  })

  it('computes the total number of events correctly', () => {
    const wrapper = mount(Events, {
      global: {
        components: {
          EventCard
        }
      }
    })

    // Check that the total count is displayed
    expect(wrapper.text()).toContain('Total eventos: 2')

    // Verify the computed value is correct
    expect(wrapper.vm.total).toBe(2)
  })
})
