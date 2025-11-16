
<script setup lang="ts">
interface NewsArticle {
  id: number;
  title: string;
  url: string;
  image_url: string;
}

interface NewsResponse {
  results: NewsArticle[];
}

const { data: noticias, pending, error } = await useFetch<NewsResponse>('https://api.spaceflightnewsapi.net/v4/articles')
</script>

<template>
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
</template>
