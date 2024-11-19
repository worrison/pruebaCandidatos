<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">Lista de Candidatos</h2>
      <ul>
        <li v-for="candidate in candidates" :key="candidate.id" class="p-4 border-b">
          {{ candidate.name }}
        </li>
      </ul>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  interface Candidate {
    id: string;
    name: string;
  }
  
  const candidates = ref<Candidate[]>([]);
  
  onMounted(() => {
    // Simula la carga de datos
    candidates.value = [
      { id: '1', name: 'Juan Andrés Ortega Montes' },
      { id: '2', name: 'Ana Pérez García' },
    ];
  });
  </script>
  