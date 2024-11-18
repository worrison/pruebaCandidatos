<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white w-96 p-6 rounded-lg shadow-lg">
            <h2 class="text-lg font-bold mb-4">Añadir Nuevo Candidato</h2>

            <form @submit.prevent="submitForm">
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Nombre</label>
                    <input v-model="candidate.firstName" type="text" class="w-full border rounded px-3 py-2" required />
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1">Apellido</label>
                    <input v-model="candidate.lastName" type="text" class="w-full border rounded px-3 py-2" required />
                </div>

                <div class="flex justify-end space-x-3">
                    <button @click="close" type="button" class="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                    <button type="submit" class="px-4 py-2 bg-indigo-500 text-white rounded">Guardar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue';

const emits = defineEmits(['close', 'submit']);

const candidate = ref({
    firstName: '',
    lastName: '',
    vacancyId: '53ba9e95-2e7c-46a1-83ad-41af90f0cf85',
    statusId: 'bfb06383-a6a1-4bf3-a272-123401352028',
});

function close() {
    emits('close');
}

function submitForm() {
    emits('submit', candidate.value);
}
</script>