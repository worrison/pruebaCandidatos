<template>
   <div class="grid grid-cols-4 h-full">
    <div class="flex space-x-4 h-full min-w-max">
      <ColumnCard v-for="column in columns" :key="column.id" :title="column.title" :color="column.color"
        :candidates="column.candidates" :columnId="column.id" @candidateDropped="handleCandidateDropped">
        <template #icon>
          <component :is="column.icon" :class="['h-6 w-6', column.color]" />
        </template>
      </ColumnCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColumnCard from '../cards/ColumnCard.vue';
import { ref } from 'vue';

const columns = ref([
  {
    id: 'new',
    title: 'New',
    color: '#22C55E',
    icon: "InboxIcon",
    candidates: [
      { id: '1', name: 'Juan Andrés Ortega Montes', addedBy: 'Añadido por ATS', date: 'Hoy' },
    ],
  },
  {
    id: 'interview',
    title: 'Interview',
    color: '#14B8A6',
    icon: "UserIcon",
    candidates: [],
  },
  {
    id: 'hired',
    title: 'Hired',
    color: '#3B82F6',
    icon: "SparklesIcon",
    candidates: [],
  },
  {
    id: 'ban',
    title: 'Restricted',
    color: '#ED6F6F',
    icon: "NoSymbolIcon",
    candidates: [],
  },
  {
    id: 'ban',
    title: 'Restricted',
    color: '#ED6F6F',
    icon: "NoSymbolIcon",
    candidates: [],
  },
]);

const handleCandidateDropped = ({ candidate, targetColumnId }: { candidate: { id: string; name: string; addedBy: string; date: string }, targetColumnId: string }) => {
  columns.value.forEach((column) => {
    column.candidates = column.candidates.filter((c) => c.id !== candidate.id);
  });

  const targetColumn = columns.value.find((column) => column.id === targetColumnId);
  if (targetColumn) {
    targetColumn.candidates.push(candidate);
  }
};
</script>