<template>
    <aside class="ml-10 min-w-[256px] bg-white shadow-md border-r border-gray-200 flex flex-col">
        <!-- Logo -->
        <div class="p-4 text-center">
            <slot name="logo">
                <div class="text-gray-400">Slot logo</div>
            </slot>
        </div>

        <!-- Administrador -->
        <div class="flex flex-col p-4">
            <div class="group">
                <!-- Botón Administrador -->
                <button
                    class="flex items-center justify-between w-full px-4 py-2 text-gray-600 bg-white rounded-md group-hover:bg-gray-100"
                    @click="toggleAdmin">
                    <span class="text-sm font-semibold">Administrador</span>
                    <ChevronDownIcon :class="{ 'rotate-180': isAdminOpen }" class="h-4 w-4 transform" />
                </button>

                <!-- Contenido del Administrador -->
                <div v-if="isAdminOpen" class="pl-4 mt-2 space-y-2">
                    <!-- Talento -->
                    <div class="group bg-gray-50 rounded-md shadow-sm overflow-hidden">
                        <button
                            class="flex items-center justify-between w-full px-4 py-2 text-secondary bg-white rounded-md group-hover:bg-secondary-50"
                            @click="toggleMenu">
                            <span class="flex items-center space-x-2">
                                <StarIcon class="h-5 w-5 text-indigo-500" />
                                <span class="text-sm text-secondary font-normal">Talento</span>
                            </span>
                            <ChevronDownIcon class="h-4 w-4 transform" :class="{ 'rotate-180': isOpen }" />
                        </button>

                        <!-- Submenú -->
                        <div v-if="isOpen" class="pl-7 py-2 bg-white">
                            <a href="#"
                                class="block text-secondary font-semibold pl-4 border-l-2 border-indigo-500 h-10 flex items-center hover:text-secondary">
                                Reclutamiento
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Controlar la apertura del submenú Administrador
const isAdminOpen = ref(true);
// Controlar la apertura del submenú Talento
const isOpen = ref(true);

const toggleAdmin = () => {
    isAdminOpen.value = !isAdminOpen.value;
    isOpen.value = false;
}
const toggleMenu = () => {
    isOpen.value = !isOpen.value;
};
</script>