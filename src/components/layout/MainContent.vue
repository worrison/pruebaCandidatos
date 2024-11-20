<template>
  <div class="p-6 bg-gray-100 h-screen flex flex-col w-full">
    <div class="bg-white rounded-lg shadow-md flex-grow flex flex-col p-6">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
onMounted(async () => {
});
</script>
