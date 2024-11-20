<template>
  <div class="grid grid-cols-4 gap-4">
    <CandidateCard v-for="candidate in filteredCandidates" :key="candidate.id" :candidate="candidate" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CandidateCard from '../cards/CandidateCard.vue';
import { useCandidateStore } from '../../stores/candidates';

const props = defineProps({
  searchTerm: String, // Término de búsqueda recibido de la vista principal
});

const candidateStore = useCandidateStore();
// Filtrar dinámicamente los candidatos
const filteredCandidates = computed(() => {
  console.log("props que llegan", props, "---",props.searchTerm);
  const term = props?.searchTerm?.toLowerCase().trim();
  if (!term) return candidateStore.$state.candidates; // Devuelve todos si no hay búsqueda

  return candidateStore.$state.candidates.filter((candidate) =>
    `${candidate.firstName} ${candidate.lastName}`.toLowerCase().includes(term)
  );
});
</script>