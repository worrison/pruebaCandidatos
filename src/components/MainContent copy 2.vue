<template>
  <div class="p-6 bg-gray-100 h-screen flex flex-col">
    <!-- Contenedor principal -->
    <div class="bg-white rounded-lg shadow-md flex-grow flex flex-col p-6">
      <!-- Barra Superior (Tabs + Buscar + Botón) -->
      <div class="flex items-center justify-between border-b border-gray-200 pb-4">
        <!-- Tabs -->
        <div class="flex space-x-6">
          <button
            @click="activeTab = 'vacantes'"
            :class="['pb-2 text-sm font-semibold', activeTab === 'vacantes' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500']"
          >
            Vacantes
          </button>
          <button
            @click="activeTab = 'candidatos'"
            :class="['pb-2 text-sm font-semibold', activeTab === 'candidatos' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500']"
          >
            Candidatos
          </button>
        </div>

        <!-- Buscar + Botón -->
        <div class="flex items-center space-x-4">
          <!-- Buscar -->
          <div class="relative">
            <span class="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Buscar"
              class="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
            />
          </div>

          <!-- Botón Añadir -->
          <button class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600">
            Añadir candidato
          </button>
        </div>
      </div>

      <!-- Contenido de las Columnas -->
      <div class="flex space-x-4 mt-6 flex-grow">
        <!-- Columna New -->
        <div class="flex-1 bg-gray-50 rounded-lg p-4 shadow-md">
          <h2 class="text-green-600 font-semibold mb-4 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>New</span>
          </h2>
          <div class="bg-white rounded-md p-3 shadow-sm mb-4">
            <p class="font-semibold">Juan Andrés Ortega Montes</p>
            <p class="text-sm text-gray-500">Añadido por ATS</p>
            <p class="text-sm text-gray-500">Hoy</p>
          </div>
        </div>

        <!-- Columna Interview -->
        <div class="flex-1 bg-gray-50 rounded-lg p-4 shadow-md">
          <h2 class="text-blue-600 font-semibold mb-4 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 10l4.5 4.5m0 0L21 13m-1.5 1.5L10.5 6m0 0L7.5 3"
              />
            </svg>
            <span>Interview</span>
          </h2>
          <div class="bg-white rounded-md p-3 shadow-sm">
            <p class="font-semibold">Juan Andrés Ortega Montes</p>
            <p class="text-sm text-gray-500">Añadido por ATS</p>
            <p class="text-sm text-gray-500">Hoy</p>
          </div>
        </div>

        <!-- Columna Hired -->
        <div class="flex-1 bg-gray-50 rounded-lg p-4 shadow-md">
          <h2 class="text-purple-600 font-semibold mb-4 flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v8m4-4H8"
              />
            </svg>
            <span>Hired</span>
          </h2>
          <div class="bg-white rounded-md p-3 shadow-sm mb-4">
            <p class="font-semibold">Juan Andrés Ortega Montes</p>
            <p class="text-sm text-gray-500">Añadido por ATS</p>
            <p class="text-sm text-gray-500">Hoy</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Controlar el tab activo
const activeTab = ref('vacantes');
</script>
