<template>
  <div
    :class="[
    'rounded-lg shadow p-4 cursor-pointer relative mb-2',
    backgroundClass
  ]"
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
        <EllipsisVerticalIcon class="h-5 w-5 text-gray-500" />
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
    <EditCandidateModal
      v-if="showModal"
      :idCandidate="props.candidate.id"
      :onClose="closeModal"
    />
    <!-- Contenido de la Tarjeta -->
    <div>
      <h2 class="font-semibold text-gray-900 truncate text-lg">
        {{ props.candidate.firstName }}
        {{
        props.candidate.lastName }}
      </h2>
      <p class="text-sm text-gray-500">
        Añadido por
        {{ props.candidate.creatorEmployee ? props.candidate.creatorEmployee
        : 'Victor' }}
      </p>
      <p class="text-xs text-gray-400 flex items-center space-x-1">
        <ClockIcon class="h-5 w-5 text-gray-600 stroke-[1.5]" />
        <span>{{ formatDate(props.candidate.createdAt) }}</span>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import EditCandidateModal from "../reclutamiento/EditCandidateModal.vue";

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
// Color de fondo de la tarjeta
const backgroundClass = props.candidate?.status?.color;
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
const  toggleMenu = ()=> {
  menuOpen.value = !menuOpen.value;
}
// click a opcion del menu de la card
const handleOptionClick = (option: { label: string }) =>{
  console.log("Opción seleccionada:", option.label);
  menuOpen.value = false;
  openModal();
}

// Drag and Drop
const onDragStart = (event: DragEvent) => {
  // Guarda el ID del candidato en dataTransfer
  event.dataTransfer?.setData('text/plain', JSON.stringify({ id: props.candidate.id,firstName:props.candidate.firstName,lastName:props.candidate.lastName }));
}

const  onDragEnd = ()=> {
  console.log("Drag terminado");
}

//formatep de fecha si es el dia actual devolvemos hoy sino devolvemos la fecha
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();

  const isToday =
    date.getUTCFullYear() === today.getUTCFullYear() &&
    date.getUTCMonth() === today.getUTCMonth() &&
    date.getUTCDate() === today.getUTCDate();

  if (isToday) {
    return 'Hoy';
  }

  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  return `${day}/${month}`;
};
</script>
