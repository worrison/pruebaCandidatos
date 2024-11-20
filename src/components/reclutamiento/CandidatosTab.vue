<template>
  <div class="grid grid-cols-4 gap-4">
    <CandidateCard v-for="candidate in candidates" :key="candidate.id" :candidate="candidate" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import CandidateCard from '../cards/CandidateCard.vue';
import { useCandidateStore } from '../../stores/candidates';


const candidates = ref<any[]>([]);

onMounted(() => {
  // Simula la carga de datos
  const candidateStore = useCandidateStore();
  // candidates.value = candidateStore.getCandidates;
  candidates.value = candidateStore.$state.candidates;
  console.log("candidates en candidates tab", candidates.value);
});
</script>