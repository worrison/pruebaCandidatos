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

      <!-- Contenido dinámico -->
      <div class="flex-grow">
        <VacantesTab v-if="activeTab === 'vacantes'" />
        <CandidatosTab v-if="activeTab === 'candidatos'" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import VacantesTab from '../../components/reclutamiento/VacantesTab.vue';
import CandidatosTab from '../../components/reclutamiento/CandidatosTab.vue';
import { ref } from 'vue';

const activeTab = ref('vacantes');
</script>
