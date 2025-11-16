<script setup lang="ts">
interface Event {
    id: number;
    nombre: string;
    fecha: string;
    descripcion: string;
    url: string;
}

defineProps<{
    event: Event
}>();
</script>

<template>

    <div class="flex flex-col gap-4 rounded-lg bg-[#232f48]/50 p-6 border border-white/10">
        <div class="flex items-center gap-4">
            <span class="material-symbols-outlined text-primary text-2xl">nights_stay</span>
            <h3 class="text-white text-lg font-bold leading-tight font-display">
                {{ event.nombre }}
            </h3>
        </div>
        <p class="text-white/70 text-sm font-medium leading-normal font-display">
            {{ event.fecha }}
        </p>
        <p class="text-white/60 text-sm font-normal leading-normal font-display">
            {{ event.descripcion }}
        </p>
        <a :href="event.url" target="_blank" class="text-primary text-sm font-bold leading-normal mt-2 font-display flex items-center gap-2">
            Más información
            <span class="material-symbols-outlined">arrow_forward</span>
        </a>
        <div class="mt-6">
            <slot></slot>
        </div>
    </div>
</template>