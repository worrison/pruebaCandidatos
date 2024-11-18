<template>
  <div class="p-6 bg-gray-100 h-screen flex flex-col">
    <div class="bg-white rounded-lg shadow-md flex-grow flex flex-col p-6">
      <!-- Tabs -->
      <div class="flex items-center border-b border-gray-200 pb-4 mb-4">
        <div class="flex space-x-6">
          <button @click="activeTab = 'vacantes'"
            :class="['pb-2 text-2xl font-semibold', activeTab === 'vacantes' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500']">
            Vacantes
          </button>
          <button @click="activeTab = 'candidatos'"
            :class="['pb-2 text-2xl font-semibold', activeTab === 'candidatos' ? 'text-indigo-500 border-b-2 border-indigo-500' : 'text-gray-500']">
            Candidatos
          </button>
        </div>
      </div>

      <!-- Barra de búsqueda y botón -->
      <div class="flex items-center justify-between mb-6">
        <div class="relative">
          <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <MagnifyingGlassIcon class="h-5 w-5 text-gray-500" />
          </span>
          <input type="text" placeholder="Buscar"
            class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200" />
        </div>
        <button @click="openModal" class="px-4 py-2 bg-indigo-500 text-white rounded-md shadow hover:bg-indigo-600">
          Añadir candidato
        </button>
      </div>

      <!-- Contenido dinámico -->
      <div class="flex space-x-4 flex-grow overflow-auto">
        <ColumnCard v-for="column in columns" :key="column.id" :title="column.title" :color="column.color"
          :candidates="column.candidates" :columnId="column.id" @candidateDropped="handleCandidateDropped">
          <template #icon>
            <component :is="column.icon" />
          </template>
        </ColumnCard>
      </div>
    </div>

    <!-- Modal -->
    <AddCandidateModal v-if="showModal" :onClose="closeModal" :onCandidateAdded="handleCandidateAdded" />
  </div>
</template>

<script setup lang="ts">
import ColumnCard from '../cards/ColumnCard.vue';
import AddCandidateModal from '../cards/AddCandidateModal.vue';
import { ref } from 'vue';
import { BeakerIcon } from '@heroicons/vue/24/solid';

// Tabs
const activeTab = ref('vacantes');

// Modal state
const showModal = ref(false);

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

// Datos de las columnas
const columns = ref([
  {
    id: 'new',
    title: 'New',
    color: 'green',
    candidates: [
      { id: '1', name: 'Juan Andrés Ortega Montes', addedBy: 'Añadido por ATS', date: 'Hoy' },
      { id: '2', name: 'Juan Andrés Ortega Montes', addedBy: 'Añadido por ATS', date: 'Hoy' },
    ],
    icon:""
  },
  {
    id: 'new',
    title: 'New',
    color: 'green',
    candidates: [
    ],
  },
  // Más columnas aquí...
]);

// Manejar la adición de un candidato
interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
}
// Manejo del evento candidateDropped
function handleCandidateDropped({ candidate, targetColumnId }: { candidate: { id: string, name: string, addedBy: string, date: string }, targetColumnId: string }) {
  // Remover candidato de su columna actual
  columns.value.forEach((column) => {
    column.candidates = column.candidates.filter((c) => c.id !== candidate.id);
  });

  // Añadir candidato a la columna destino
  const targetColumn = columns.value.find((column) => column.id === targetColumnId);
  if (targetColumn) {
    targetColumn.candidates.push(candidate);
  }
}
const handleCandidateAdded = (candidate: Candidate) => {
  const targetColumn = columns.value.find((column) => column.id === 'new');
  if (targetColumn) {
    targetColumn.candidates.push({
      id: candidate.id,
      name: `${candidate.firstName} ${candidate.lastName}`,
      addedBy: 'Añadido por ATS',
      date: 'Hoy',
    });
  }
  closeModal();
};
</script>
