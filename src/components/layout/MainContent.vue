<template>
  <div class="p-6 bg-gray-100 h-screen flex flex-col w-full">
    <div class="bg-white rounded-lg shadow-md flex-grow flex flex-col p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// import { UseGetCandidate } from "../../application/useCases/useCandidate/UseCaseUpdateCandidate";
// import { HttpCandidateRepository } from "../../infrastructure/repositories/HttpCandidateRepository";
// import { backFetch } from "../../config/adapters/backFetch.adapter";

// const candidateRepository = new HttpCandidateRepository(backFetch);
// const getCandidateUseCases = new UseGetCandidate(candidateRepository);


// const loadCandidates = async () => {
//   try {
//     const response = await getCandidateUseCases.execute();
//     console.log("Candidato añadido:", response);
//   } catch (error) {
//     console.error("Error al añadir candidato:", error);
//   }
// };
onMounted(async () => {
  // await loadCandidates();
});
</script>
