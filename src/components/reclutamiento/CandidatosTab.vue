<template>
  <div class="grid grid-cols-4 gap-4">
    <CandidateCard v-for="candidate in candidates" :key="candidate.id" :candidate="candidate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CandidateCard from '../cards/CandidateCard.vue';

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