<script setup lang="ts">
import MainContent from './components/layout/MainContent.vue';
import DefaultLayout from './layouts/DefaultLayout.vue';
</script>
<template>
      <DefaultLayout>
        <MainContent>
          <RouterView/>
        </MainContent>
      </DefaultLayout>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
  width: 100%;
}
</style>