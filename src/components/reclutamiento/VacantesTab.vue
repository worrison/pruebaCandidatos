<template>
  <div class="grid grid-cols-4 h-full scroll-m-8 hover:scroll-m-0">
    <div class="flex space-x-4 h-full min-w-max ">
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

//recuperamos los datos de los candidatos del store
const candidateStore = useCandidateStore();
let candidates = computed(() => candidateStore.$state.candidates);

//recuperamos los datos de las vacantes del store
const vacancyStore = useVacancyStore();
let statesVacancy = computed(() => vacancyStore.$state.vacanciesStates);

// Computed para generar las columnas
// const columns = computed(() =>
// statesVacancy.value.map((state: { id: string; name: string; color: string; icon: string; order:number }) => {
//   console.log("state", state);
//     // Filtrar los candidatos que coinciden con el estado actual
//     const filteredCandidates = candidates.value.filter(
//       (candidate) => candidate.status.id == state.id
//     );

//     // Obtener el color e icono del primer candidato que coincide (si existe)
//     const color = filteredCandidates[0]?.status?.color || "#000000";
//     const icon = filteredCandidates[0]?.status?.icon || "DefaultIcon";

//     // Mapear los candidatos a la estructura deseada
//     const candidatesMapped = filteredCandidates.map((candidate) => ({
//       id: candidate.id,
//       firstName: candidate.firstName,
//       lastName: candidate.lastName,
//       creatorEmployee: candidate.addedBy,
//       createdAt: new Date(candidate.createdAt).toLocaleDateString("es-ES", {
//         weekday: "short",
//         year: "numeric",
//         month: "short",
//         day: "numeric",
//       }),
//     }));

//     return {
//       id: state.id,
//       title: state.name,
//       color: color,
//       icon: icon + "Icon",
//       candidates: candidatesMapped,
//       order: state.order,
//     };
//   }).sort((a, b) => a.order - b.order)
// );
const columns = computed(() =>
  statesVacancy.value
    .map((state: { id: string; name: string; color: string; icon: string; order: number }) => {
      console.log("state", state);

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

const handleCandidateDropped = ({ candidate, targetColumnId }: { candidate: { id: string; name: string; addedBy: string; date: string }, targetColumnId: string }) => {
  columns.value.forEach((column) => {
    column.candidates = column.candidates.filter((c) => c.id !== candidate.id);
  });

  const targetColumn = columns.value.find((column) => column.id === targetColumnId);
  if (targetColumn) {
    targetColumn.candidates.push({
      id: candidate.id,
      firstName: candidate.name.split(' ')[0],
      lastName: candidate.name.split(' ')[1] || '',
      creatorEmployee: candidate.addedBy,
      createdAt: new Date(candidate.date).toLocaleDateString("es-ES", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
  }
};
</script>