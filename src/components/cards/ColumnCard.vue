<template>
    <div class="flex-1 bg-gray-50 rounded-lg p-4 shadow-md">
      <!-- Línea superior -->
      <div :style="{ backgroundColor: color }" class="h-1 rounded-t-md mb-4"></div>
  
      <!-- Título de la columna -->
      <h2 :class="`font-semibold mb-4 flex items-center text-${color}`">
        <!-- Renderizar Icono Dinámico -->
        <div class="h-5 w-5 flex items-center justify-center text-center mr-2" v-html="icons[icon]"></div>
        <span class="text-gray-800">{{ title }}</span>
      </h2>
  
      <!-- Tarjetas de candidatos -->
      <div v-for="candidate in candidates" :key="candidate.id" class="mb-4">
        <CandidateCard :candidate="candidate" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import CandidateCard from './CandidateCard.vue';
  import { PropType } from 'vue';
  
  // Mapeo de iconos
  const icons: { [key: string]: string } = {
    Check: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
    User: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 11c1.5 0 3-.5 3-1.5S13.5 8 12 8s-3 .5-3 1.5 1.5 1.5 3 1.5zM12 14.5c-1.5 0-4 1.5-4 3v1h8v-1c0-1.5-2.5-3-4-3z" /></svg>`,
    Star: `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.048 2.927c.3-.921 1.603-.921 1.902 0l2.5 7.726h8.15c.968 0 1.371 1.24.588 1.81l-6.6 4.837 2.5 7.726c.3.921-.755 1.69-1.588 1.21L12 18.773l-6.5 4.437c-.833.48-1.888-.289-1.588-1.21l2.5-7.726-6.6-4.837c-.783-.57-.38-1.81.588-1.81h8.15l2.5-7.726z" /></svg>`,
  };
  
  // Props
  defineProps({
    title: String,
    color: String,
    icon: {
      type: String,
      default: 'Check',
    },
    candidates: {
      type: Array as PropType<Array<{ id: string; name: string; addedBy: string; date: string }>>,
      required: true,
    },
  });
  </script>
