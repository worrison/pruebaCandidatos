<template>
    <aside class="w-64 bg-gray-50 border-r border-gray-200 h-screen flex flex-col">
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
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform"
                        :class="{ 'rotate-180': isAdminOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <!-- Contenido del Administrador -->
                <div v-if="isAdminOpen" class="pl-4 mt-2 space-y-2">
                    <!-- Talento -->
                    <div class="group bg-gray-50 rounded-md shadow-sm overflow-hidden">
                        <button
                            class="flex items-center justify-between w-full px-4 py-2 text-secondary bg-white rounded-md group-hover:bg-secondary-50"
                            @click="toggleMenu">
                            <span class="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="h-5 w-5 text-secondary">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                                </svg>

                                <span class="text-sm text-secondary font-normal">Talento</span>
                            </span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 transform"
                                :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M19 9l-7 7-7-7" />
                            </svg>
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
const isAdminOpen = ref(false);
function toggleAdmin() {
    isAdminOpen.value = !isAdminOpen.value;
    isOpen.value = false;
}

// Controlar la apertura del submenú Talento
const isOpen = ref(false);
function toggleMenu() {
    isOpen.value = !isOpen.value;
}
</script>