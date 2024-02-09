<template>
   <h2>{{ msg }}</h2>
   <h2>one</h2>
   <canvas ref="canvasOne"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{ msg: string }>();

const canvasOne = ref<HTMLCanvasElement | null>(null);

const handleKeyDown = () => {

};

const handleMouseEvent = () => {

};

onMounted(() => {
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('mousedown', handleMouseEvent);
});

</script>