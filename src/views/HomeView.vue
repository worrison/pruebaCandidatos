<template>
  <div class="flex items-center border-b border-gray-200 pb-4 mb-4 ">
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
  <div class="flex-grow h-full  overflow-x-auto">
    <VacantesTab v-if="activeTab === 'vacantes'" />
    <CandidatosTab v-if="activeTab === 'candidatos'" />
  </div>
  <AddCandidateModal v-if="showModal" :onClose="closeModal" />
</template>

<script setup lang="ts">
import VacantesTab from '../components/reclutamiento/VacantesTab.vue';
import CandidatosTab from '../components/reclutamiento/CandidatosTab.vue';
import AddCandidateModal from '../components/cards/AddCandidateModal.vue';

import { onMounted, ref } from 'vue';

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
</script>

<style lang="css"></style>