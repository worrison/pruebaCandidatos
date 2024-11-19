<template>
    <div>
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
  
      <div class="flex space-x-4 flex-grow overflow-auto">
        <ColumnCard
          v-for="column in columns"
          :key="column.id"
          :title="column.title"
          :color="column.color"
          :candidates="column.candidates"
          :columnId="column.id"
          @candidateDropped="handleCandidateDropped"
        >
          <template #icon>
            <component :is="column.icon" :class="['h-6 w-6', column.color]" />
          </template>
        </ColumnCard>
      </div>
  
      <!-- Modal -->
      <AddCandidateModal v-if="showModal" :onClose="closeModal" :onCandidateAdded="handleCandidateAdded" />
    </div>
  </template>
  
  <script setup lang="ts">
  import ColumnCard from '../cards/ColumnCard.vue';
  import AddCandidateModal from '../cards/AddCandidateModal.vue';
  import { ref } from 'vue';
  
  const columns = ref([
    {
      id: 'new',
      title: 'New',
      color: '#22C55E',
      icon: "InboxIcon",
      candidates: [
        { id: '1', name: 'Juan Andrés Ortega Montes', addedBy: 'Añadido por ATS', date: 'Hoy' },
      ],
    },
    {
      id: 'interview',
      title: 'Interview',
      color: '#14B8A6',
      icon: "UserIcon",
      candidates: [],
    },
    {
      id: 'hired',
      title: 'Hired',
      color: '#3B82F6',
      icon: "SparklesIcon",
      candidates: [],
    },
     {
    id: 'ban',
    title: 'Restricted',
    color: '#ED6F6F',
    icon: "NoSymbolIcon",
    candidates: [],
  },
  ]);
  
  const showModal = ref(false);
  
  const openModal = () => (showModal.value = true);
  const closeModal = () => (showModal.value = false);
  
  const handleCandidateDropped = ({ candidate, targetColumnId }: { candidate: { id: string; name: string; addedBy: string; date: string }, targetColumnId: string }) => {
    columns.value.forEach((column) => {
      column.candidates = column.candidates.filter((c) => c.id !== candidate.id);
    });
  
    const targetColumn = columns.value.find((column) => column.id === targetColumnId);
    if (targetColumn) {
      targetColumn.candidates.push(candidate);
    }
  };
  
  const handleCandidateAdded = (candidate: { id: string; firstName: string; lastName: string }) => {
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
  