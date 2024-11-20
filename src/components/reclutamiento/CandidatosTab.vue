<template>
  <div class="grid grid-cols-4 gap-4">
    <CandidateCard v-for="candidate in candidates" :key="candidate.id" :candidate="candidate" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import CandidateCard from '../cards/CandidateCard.vue';
import { useCandidateStore } from '../../stores/candidates';

const candidateStore = useCandidateStore();
const candidates = computed(() => candidateStore.$state.candidates);
</script>