<template>
  <div class="flex-none w-[296px] bg-gray-50 rounded-lg p-4 shadow-md" @dragover.prevent @drop="onDrop">
    <div :style="{ backgroundColor: props.color }" class="h-1 rounded-t-md mb-4"></div>
    <h2 class="font-semibold mb-4 flex items-center" :style="{ color }">
      <slot name="icon" class="pr-2"></slot>
      <span class="ml-2 text-lg">{{ title }} </span>
    </h2>
    <CandidateCard v-for="candidate in candidates" :key="candidate.id" :candidate="candidate" />
  </div>
</template>

<script setup lang="ts">
import CandidateCard from './CandidateCard.vue';

// Props
const props = defineProps({
  title: String,
  color: String,
  candidates: Array<any>,
  columnId: String,
});

const emit = defineEmits(['candidateDropped']);

function onDrop(event: DragEvent) {
  const data = event.dataTransfer?.getData('text/plain');
  if (data) {
    const candidate = JSON.parse(data);
    emit('candidateDropped', { candidate, targetColumnId: props.columnId });
  }
}
</script>
