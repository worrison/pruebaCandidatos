<template>
    <div class="bg-white rounded-md p-3 shadow-sm">
        <p class="font-semibold">{{ props.candidate.name }}</p>
        <p class="text-sm text-gray-500">{{ props.candidate.addedBy }}</p>
        <p class="text-sm text-gray-500">{{ props.candidate.date }}</p>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    candidate: {
        type: Object,
        required: true,
        default: () => ({
            name: '',
            addedBy: '',
            date: '',
        }),
    },
});
</script>