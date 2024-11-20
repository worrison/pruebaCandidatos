<template>
  <div class="grid grid-cols-4 h-full scroll-m-8 hover:scroll-m-0">
    <div class="flex space-x-4 h-full min-w-max  ">
      <ColumnCard v-for="column in columns" :key="column.id" :title="column.title" :color="column.color"
        :candidates="column.candidates" :columnId="column.id" @candidateDropped="handleCandidateDropped">
        <template #icon>
          <component :is="column.icon" :class="['h-6 w-6', column.color]" />
        </template>
      </ColumnCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColumnCard from '../cards/ColumnCard.vue';
import { computed, onMounted } from 'vue';
import { useCandidateStore } from '../../stores/candidates';
import { useVacancyStore } from '../../stores/vacancies';
import { Candidate } from '../../domain/entities/Candidate';
import { UseCaseUpdateCandidate } from "../../application/useCases/useCandidate/UseCaseUpdateCandidate";
import { HttpCandidateRepository } from "../../infrastructure/repositories/HttpCandidateRepository";
import { backFetch } from "../../config/adapters/backFetch.adapter";
import { UseGetAllCandidate } from '../../application/useCases/useCandidate/UseCaseGetAllCandidate';


const candidateRepository = new HttpCandidateRepository(backFetch);
const getAllCandidates = new UseGetAllCandidate(candidateRepository);
const useCaseEditCandidate = new UseCaseUpdateCandidate(candidateRepository);


//recuperamos los datos de los candidatos del store
const candidateStore = useCandidateStore();
let candidates = computed(() => candidateStore.$state.candidates);

//recuperamos los datos de las vacantes del store
const vacancyStore = useVacancyStore();
let statesVacancy = computed(() => vacancyStore.$state.vacanciesStates);


const columns = computed(() =>
  statesVacancy.value
    .map((state: { id: string; name: string; color: string; icon: string; order: number }) => {
      // Hardcodear iconos y colores basados en el 'state.name'
      //inicialmente lo intente sacar desde la api con el color de los candidates
      //pero no fui capaz de implementar el color que traia la api con tailwind. tailwind no me lo interpretaba
      const iconsMap: Record<string, string> = {
        New: "InboxIcon",
        Accepted: "CheckIcon",
        Interview: "UserIcon",
        Selected: "StarIcon",
        Discarded: "NoSymbolIcon",
      };

      const colorsMap: Record<string, string> = {
        New: "#22C55E", // Verde
        Accepted: "#3B82F6", // Azul
        Interview: "#F59E0B", // Amarillo
        Selected: "#9333EA", // Púrpura
        Discarded: "#EF4444", // Rojo
      };

      // Filtrar los candidatos que coinciden con el estado actual
      const filteredCandidates = candidates.value.filter(
        (candidate) => candidate.status.id == state.id
      );

      // Mapear los candidatos a la estructura deseada
      const candidatesMapped = filteredCandidates.map((candidate) => ({
        id: candidate.id,
        firstName: candidate.firstName,
        lastName: candidate.lastName,
        creatorEmployee: candidate.addedBy,
        createdAt: new Date(candidate.createdAt).toLocaleDateString("es-ES", {
          weekday: "short",
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      }));

      return {
        id: state.id,
        title: state.name,
        color: colorsMap[state.name] || "#000000", // negro por defecto
        icon: iconsMap[state.name] || "DefaultIcon", // Icono hardcodeado
        candidates: candidatesMapped,
        order: state.order,
      };
    })
    .sort((a, b) => a.order - b.order) // Ordenar por el campo 'order'
);
console.log("que enviamos a las columns", columns.value);

onMounted(() => {
  console.log("columns", columns.value);
  // candidates.value = candidateStore.$state.candidates;
  // statesVacancy.value = vacancyStore.$state.vacanciesStates;
});

const handleCandidateDropped =  ({ candidate, targetColumnId }: { candidate: { id: string; firstName: string; lastName: string }, targetColumnId: string }) => {
  console.log("entra aqui?",candidate);
  console.log("columnID",targetColumnId);

  updateCandidate(candidate,targetColumnId );
};
const updateCandidate = async (candidate: { id: string; firstName: string; lastName: string; }, targetColumnId: string) => {
  // Add your logic to update the candidate here
  console.log("que llega aqui de candidate?",candidate);
  let candidatoProcesado = {
        id:candidate.id,
        firstName:candidate.firstName,
        lastName:candidate.lastName,
        statusId:targetColumnId,
        vacancyId: '53ba9e95-2e7c-46a1-83ad-41af90f0cf85'
    }
    
  try {
    console.log("candidatoProcesado",candidatoProcesado);
        const response = await useCaseEditCandidate.execute(candidatoProcesado as Candidate);
        console.log("Candidato editado:", response);
        const candidates = await getAllCandidates.execute();
        const candidateStore = useCandidateStore();
        candidateStore.addCandidates(candidates.data);
        // Cerrar el modal
        close();
    } catch (error) {
        console.error("Error al editar candidato:", error);
    }
  console.log("Updating candidate...");
};





</script>