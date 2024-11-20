<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-bold mb-4">Editar Candidato</h2>

            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Nombre</label>
                    <input v-model="firstName" type="text" class="w-full border rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Apellido</label>
                    <input v-model="lastName" type="text" class="w-full border rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Estado de vacante</label>
                    <select v-model="statusId" class="w-full border rounded px-3 py-2" required>
                        <option v-for="vacancy in listStatusVacancies" :key="vacancy.id" :value="vacancy.id">
                            {{ vacancy.name }}
                        </option>
                    </select>
                </div>

                <div class="flex justify-end space-x-3">
                    <button @click="close" type="button" class="px-4 py-2 bg-gray-300 rounded">
                        Cancelar
                    </button>
                    <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded">
                        Guardar
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, computed } from "vue";
import { useVacancyStore } from '../../stores/vacancies';
import { useCandidateStore } from '../../stores/candidates';
import { Candidate } from '../../domain/entities/Candidate';
import { UseCaseUpdateCandidate } from "../../application/useCases/useCandidate/UseCaseUpdateCandidate";
import { HttpCandidateRepository } from "../../infrastructure/repositories/HttpCandidateRepository";
import { backFetch } from "../../config/adapters/backFetch.adapter";
import { UseGetAllCandidate } from '../../application/useCases/useCandidate/UseCaseGetAllCandidate';

//props
const props = defineProps({
    onClose: Function, // Se llamará para cerrar el modal
    idCandidate: String,
});

const candidateRepository = new HttpCandidateRepository(backFetch);
const getAllCandidates = new UseGetAllCandidate(candidateRepository);
const useCaseEditCandidate = new UseCaseUpdateCandidate(candidateRepository);
//recuperamos los datos de los candidatos del store
const candidateStore = useCandidateStore();
let listCandidates = ref<Candidate[]>([]);
computed(() => candidateStore.$state.candidates);
const candidate = ref<Candidate | null>(null);

interface Vacancy {
    id: string;
    name: string;
}
//recuperamos los datos de las vacantes del store
const vacancyStore = useVacancyStore();
let listStatusVacancies = ref<Vacancy[]>([]);
listStatusVacancies = computed(() => vacancyStore.$state.vacanciesStates);

// Campos reactivos para el formulario
const firstName = ref<string>("");
const lastName = ref<string>("");
const statusId = ref<string>("");
const vacancyId = ref<string>("");

// Función para manejar el envío del formulario
const submitForm = async () => {
    console.log('submitForm', candidate);
    let candidatoProcesado = {
        id: props.idCandidate,
        firstName: firstName.value,
        lastName: lastName.value,
        statusId: statusId.value,
        vacancyId: vacancyId.value
    }
    try {
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
};

// Función para cerrar el modal
const close = () => {
    if (props.onClose) {
        props.onClose();
    }
};
onMounted(() => {
    candidate.value = candidateStore.$state.candidates.find((c) => c.id === props.idCandidate)
    listStatusVacancies.value = vacancyStore.$state.vacanciesStates;
    listCandidates.value = candidateStore.$state.candidates
    if (candidate.value) {
        firstName.value = candidate.value.firstName || "";
        lastName.value = candidate.value.lastName || "";
        statusId.value = candidate.value.statusId || "";
        vacancyId.value = candidate.value.vacancyId || "";
    }
});
</script>