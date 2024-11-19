<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-bold mb-4">Editar Candidato</h2>

            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Nombre</label>
                    <input v-model="candidate.firstName" type="text" class="w-full border rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Apellido</label>
                    <input v-model="candidate.lastName" type="text" class="w-full border rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Estado de vacante</label>
                    <select v-model="candidate.vacancyId" class="w-full border rounded px-3 py-2" required>
                        <option v-for="vacancy in listStatusVacancies.data" :key="vacancy.id" :value="vacancy.id">
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
import { ref, defineProps, onMounted } from "vue";
// import { UseAddCandidate } from "../../application/useCases/useCandidate/UseAddCandidate";
// import { HttpCandidateRepository } from "../../infrastructure/repositories/HttpCandidateRepository";
// import { backFetch } from "../../config/adapters/backFetch.adapter";

// const candidateRepository = new HttpCandidateRepository(backFetch);
// const addCandidateUseCases = new UseAddCandidate(candidateRepository);
interface Vacancy {
    id: string;
    name: string;
    order: number;
    companyId: string;
    createdAt: string;
    updatedAt: string;
    vacancyId: string;
}

interface VacanciesResponse {
    data: Vacancy[];
    meta: {
        currentPage: number;
        lastPage: number;
        total: number;
        perPage: number;
    };
}

const listStatusVacancies = ref<VacanciesResponse>({
    data: [],
    meta: {
        currentPage: 1,
        lastPage: 1,
        total: 0,
        perPage: 20
    }
});
listStatusVacancies.value ={
    "data": [
        {
            "id": "bfb06383-a6a1-4bf3-a272-123401352028",
            "name": "New",
            "order": 1,
            "companyId": "7ae449bc-620c-4851-9d56-d25ff4094e34",
            "createdAt": "2024-11-14T15:25:21+00:00",
            "updatedAt": "2024-11-14T15:25:21+00:00",
            "vacancyId": "53ba9e95-2e7c-46a1-83ad-41af90f0cf85"
        },
        {
            "id": "b89fe7c0-e9a1-47e5-bdc6-3498e412af1d",
            "name": "Accepted",
            "order": 2,
            "companyId": "7ae449bc-620c-4851-9d56-d25ff4094e34",
            "createdAt": "2024-11-14T15:25:21+00:00",
            "updatedAt": "2024-11-14T15:25:21+00:00",
            "vacancyId": "53ba9e95-2e7c-46a1-83ad-41af90f0cf85"
        },
        {
            "id": "6f936f53-0b9c-48d6-bfa6-52ee30f3eb1d",
            "name": "Interview",
            "order": 3,
            "companyId": "7ae449bc-620c-4851-9d56-d25ff4094e34",
            "createdAt": "2024-11-14T15:25:21+00:00",
            "updatedAt": "2024-11-14T15:25:21+00:00",
            "vacancyId": "53ba9e95-2e7c-46a1-83ad-41af90f0cf85"
        },
        {
            "id": "419aa104-3e84-41d9-bc78-19ac8d473bde",
            "name": "Selected",
            "order": 4,
            "companyId": "7ae449bc-620c-4851-9d56-d25ff4094e34",
            "createdAt": "2024-11-14T15:25:21+00:00",
            "updatedAt": "2024-11-14T15:25:21+00:00",
            "vacancyId": "53ba9e95-2e7c-46a1-83ad-41af90f0cf85"
        },
        {
            "id": "e61417ff-03ac-464b-a9cf-df2bff04d15a",
            "name": "Discarded",
            "order": 5,
            "companyId": "7ae449bc-620c-4851-9d56-d25ff4094e34",
            "createdAt": "2024-11-14T15:25:21+00:00",
            "updatedAt": "2024-11-14T15:25:21+00:00",
            "vacancyId": "53ba9e95-2e7c-46a1-83ad-41af90f0cf85"
        }
    ],
    "meta": {
        "currentPage": 1,
        "lastPage": 1,
        "total": 5,
        "perPage": 20
    }
}
const props = defineProps({
    onClose: Function, // Se llamará para cerrar el modal
    idCandidate: String,
});

const candidate = ref({
    firstName: "",
    lastName: "",
    vacancyId: "53ba9e95-2e7c-46a1-83ad-41af90f0cf85",
    statusId: "bfb06383-a6a1-4bf3-a272-123401352028",
});

// Función para cerrar el modal
const close = () => {
    if (props.onClose) {
        props.onClose();
    }
};

// Función para manejar el envío del formulario
const submitForm = async () => {
    try {
        //tenemos que llamar a editar candidato
        //const response = await addCandidateUseCases.execute(candidate.value);
       // console.log("Candidato añadido:", response);
       console.log("Candidato a editar:", candidate.value);
        // Cerrar el modal
        close();
    } catch (error) {
        console.error("Error al añadir candidato:", error);
    }
};

onMounted(() => {
    console.log(props.idCandidate);
});
</script>