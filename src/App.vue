<script setup lang="ts">
import { UseGetAllCandidate } from "./application/useCases/useCandidate/UseCaseGetAllCandidate";
import { UseCaseGetStateVacantes } from "./application/useCases/useCaseVacante/UseCaseGetStateVacantes";
import { backFetch } from "./config/adapters/backFetch.adapter";
import { HttpCandidateRepository } from "./infrastructure/repositories/HttpCandidateRepository";
import { HttpVacanteRepository } from "./infrastructure/repositories/HttpVacanteRepository";
import MainContent from './components/layout/MainContent.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
import { onMounted } from "vue";

onMounted(async () => {
  const vacanteRepository = new HttpVacanteRepository(backFetch);
  const candidateRepository = new HttpCandidateRepository(backFetch);
  const getAllCandidates = new UseGetAllCandidate(candidateRepository);
  const useCaseGetAllVacancieStates = new UseCaseGetStateVacantes(vacanteRepository);

  const candidates = await getAllCandidates.execute();
  const vacancieStates = await useCaseGetAllVacancieStates.execute();

  console.log("getAllCandidates", candidates);
  console.log("useCaseGetAllVacancieStates", vacancieStates);
});
</script>
<template>
      <DefaultLayout>
        <MainContent>
          <RouterView/>
        </MainContent>
      </DefaultLayout>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>