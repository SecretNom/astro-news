<script setup lang="ts">
import { computed } from 'vue'

interface LaunchEvent {
  id: string;
  name: string;
  net: string;
  window_start: string;
  window_end: string;
  probability: number;
  status: {
    name: string;
    abbrev: string;
  };
  mission: {
    name: string;
    description: string;
    type: string;
  } | null;
  pad: {
    location: {
      name: string;
    };
  };
  image: string | null;
  webcast_live: boolean;
}

export interface Event {
  id: string;
  nombre: string;
  fecha: string;
  descripcion: string;
  ubicacion: string;
  imagen: string | null;
  estado: string;
  tipo: string;
  url?: string;
}

const { data, pending, error } = await useFetch<{ results: LaunchEvent[] }>(
  'https://ll.thespacedevs.com/2.2.0/launch/upcoming/?limit=20',
  {
    server: false,
  }
);

const eventos = computed((): Event[] => {
  if (!data.value?.results) return [];

  return data.value.results.map((item: LaunchEvent) => ({
    id: item.id,
    nombre: item.name,
    fecha: item.net,
    descripcion: item.mission?.description || 'Sin descripción disponible',
    ubicacion: item.pad.location.name,
    imagen: item.image,
    estado: item.status.name,
    tipo: item.mission?.type || 'Desconocido'
  }));
});

const total = computed(() => eventos.value.length);
</script>

<template>
  <div class="p-6">
    <div v-if="pending" class="text-center py-8">
      <p class="text-lg">Cargando eventos astronómicos...</p>
    </div>

    <div v-else-if="error" class="text-center py-8 text-red-500">
      <p>Error al cargar eventos: {{ error.message }}</p>
    </div>

    <div v-else>
      <h2 class="text-xl font-semibold mb-3">Total eventos: {{ total }}</h2>
      <ul class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        <li v-for="e in eventos" :key="e.id" class="mb-2">
          <EventCard :event="e" />
        </li>
      </ul>
    </div>
  </div>
</template>