<template>
  <div class="bg-white rounded-lg shadow p-4 cursor-pointer relative mb-2" draggable="true" @dragstart="onDragStart"
    @dragend="onDragEnd">
    <!-- Menú desplegable (tres puntos) -->
    <div class="absolute top-2 right-2">
      <button class="p-1 rounded-full hover:bg-gray-200" @click.stop="toggleMenu">
        <EllipsisVerticalIcon class="h-5 w-5 text-gray-500" />
      </button>
      <div v-if="menuOpen" class="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-32 z-50">
        <ul>
          <li v-for="option in options" :key="option.label" class="p-2 hover:bg-gray-100 cursor-pointer"
            @click="handleOptionClick(option)">
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>
    <EditCandidateModal v-if="showModal" :idCandidate=" props.candidate.id" :onClose="closeModal" />
    <!-- Contenido de la Tarjeta -->
    <div>
      <h3 class="font-semibold text-gray-900 truncate">{{ candidate.name }}</h3>
      <p class="text-sm text-gray-500">{{ candidate.addedBy }}</p>
      <p class="text-xs text-gray-400 flex items-center space-x-1">
        <ClockIcon class="h-5 w-5 text-gray-600 stroke-[1.5]" />
        <span>{{ candidate.date }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EditCandidateModal from "./EditCandidateModal.vue";

const showModal = ref(false);
// Estado del menú desplegable
const menuOpen = ref(false);
// Props
const props = defineProps({
  candidate: {
    type: Object,
    required: true,
  },
});
const closeModal = () => {
  showModal.value = false;
};
const openModal = () => {
  showModal.value = true;
};


// Opciones del menú
const options = [
  { label: "Editar" },
];
// Toggle del menú de la card
function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}
// click a opcion del menu de la card
function handleOptionClick(option: { label: string }) {
  console.log("Opción seleccionada:", option.label);
  menuOpen.value = false;
  openModal();
}

// Drag and Drop
function onDragStart(event: DragEvent) {
  event.dataTransfer?.setData("text/plain", JSON.stringify(props.candidate));
}

function onDragEnd() {
  console.log("Drag terminado");
}
</script>