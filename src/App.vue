<script setup lang="ts">
import { UseGetAllCandidate } from "./application/useCases/useCandidate/UseCaseGetAllCandidate";
import { UseCaseGetStateVacantes } from "./application/useCases/useCaseVacante/UseCaseGetStateVacantes";
import { backFetch } from "./config/adapters/backFetch.adapter";
import { HttpCandidateRepository } from "./infrastructure/repositories/HttpCandidateRepository";
import { HttpVacanteRepository } from "./infrastructure/repositories/HttpVacanteRepository";
import { useVacancyStore } from './stores/vacancies';
import { useCandidateStore } from "./stores/candidates";
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

  //añadimos los estados posibles de la vacante en el store
  //de esta forma solo realizamos una petición al servidor ya que los estados de las vacantes no cambian  a menudo
  const vacancyStore = useVacancyStore();
  vacancyStore.addVacancy(vacancieStates.data);

  //hacemos lo mismo que con las vacantes
  const candidateStore = useCandidateStore();
  candidateStore.addCandidates(candidates.data);

  console.log("getAllCandidates", candidates);
  console.log("useCaseGetAllVacancieStates", vacancieStates);
});
</script>
<template>
  <DefaultLayout>
    <MainContent>
      <RouterView />
    </MainContent>
  </DefaultLayout>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>