  <script setup lang="ts">
  import { ref, computed } from 'vue'

  const eventos = ref([
    { id: 1, nombre: 'Eclipse Solar Total', fecha: '2025-08-12', descripcion: 'Un eclipse solar total visible en partes de América del Norte.', url: 'https://example.com/eclipse-solar-total' },
    { id: 2, nombre: 'Lluvia de Meteoros Perseidas', fecha: '2025-08-13', descripcion: 'Una lluvia de meteoros anual visible en el hemisferio norte.', url: 'https://example.com/lluvia-meteoros-perseidas' },
  ])

  const total = computed(() => eventos.value.length)
  </script>

  <template>
    <div class="p-6">
      <h2 class="text-xl font-semibold mb-3">Total eventos: {{ total }}</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <li v-for="e in eventos" :key="e.id" class="mb-2">
          <EventCard :event="e"/>
        </li>
      </ul>
    </div>
  </template>
