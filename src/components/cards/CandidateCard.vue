<template>
    <div
      class="bg-white rounded-lg shadow p-4 cursor-pointer relative"
      draggable="true"
      @dragstart="onDragStart"
      @dragend="onDragEnd"
    >
      <!-- Menú desplegable (tres puntos) -->
      <div class="absolute top-2 right-2">
        <button
          class="p-1 rounded-full hover:bg-gray-200"
          @click.stop="toggleMenu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="h-5 w-5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 13.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM12 20.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            />
          </svg>
        </button>
        <div
          v-if="menuOpen"
          class="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-32 z-50"
        >
          <ul>
            <li
              v-for="option in options"
              :key="option.label"
              class="p-2 hover:bg-gray-100 cursor-pointer"
              @click="handleOptionClick(option)"
            >
              {{ option.label }}
            </li>
          </ul>
        </div>
      </div>
  
      <!-- Contenido de la Tarjeta -->
      <div>
        <h3 class="font-semibold text-gray-900 truncate">{{ candidate.name }}</h3>
        <p class="text-sm text-gray-500">{{ candidate.addedBy }}</p>
        <p class="text-xs text-gray-400">{{ candidate.date }}</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  // Props
  const props = defineProps({
    candidate: {
      type: Object,
      required: true,
    },
  });
  
  // Estado del menú desplegable
  const menuOpen = ref(false);
  
  // Opciones del menú
  const options = [
    { label: "Editar" },
    { label: "Eliminar" },
    { label: "Ver Detalles" },
  ];
  
  // Toggle del menú
  function toggleMenu() {
    menuOpen.value = !menuOpen.value;
  }
  
  // Manejo de clics en el menú
  function handleOptionClick(option: { label: string }) {
    console.log("Opción seleccionada:", option.label);
    menuOpen.value = false;
  }
  
  // Drag and Drop
  function onDragStart(event: DragEvent) {
    event.dataTransfer?.setData("text/plain", JSON.stringify(props.candidate));
  }
  
  function onDragEnd() {
    console.log("Drag terminado");
  }
  </script>
  