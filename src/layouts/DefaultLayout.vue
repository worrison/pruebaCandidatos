<script setup lang="ts">
import Sidebar from '../components/layout/Sidebar.vue';
import Header from '../components/layout/Header.vue';
</script>

<template>
    <div class="h-screen flex bg-gray-100 w-full overflow-x-auto">
        <Sidebar>
            <template #logo>
                <img src="../assets/logohr.svg" alt="Logo" class="h-12 mx-auto" />
            </template>
        </Sidebar>
        <div class="flex flex-col flex-grow">
            <Header />
            <slot />
        </div>
    </div>
</template>