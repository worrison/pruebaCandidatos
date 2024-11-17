<script setup lang="ts">
import MainContent from './components/layout/MainContent.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
</script>
<template>
  <div class="h-screen flex bg-gray-100">
    <div class="flex flex-col flex-grow">
      <DefaultLayout>
        <MainContent />
      </DefaultLayout>
    </div>
  </div>
</template>
