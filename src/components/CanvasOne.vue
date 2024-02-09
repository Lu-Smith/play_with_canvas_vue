<template>
   <h2>{{ msg }}</h2>
   <h2>one</h2>
   <canvas ref="canvasOne"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{ msg: string }>();

const canvasOne = ref<HTMLCanvasElement | null>(null);

const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
            case "ArrowUp":
            if (event.repeat) {
                return;
            }
            break;
    }
};

const handleMouseEvent = (event: MouseEvent) => {
    if (event) {
    }
};

const updateGame = () => {
    const context = canvasOne.value?.getContext('2d');

    if (context && canvasOne.value) {
            // Clear the canvas
            context.clearRect(0, 0, canvasOne.value.width, canvasOne.value.height);

            // Draw ground
            context.fillStyle = '#000';
            context.fillRect(10, 10, 40, 40);
    }
}

onMounted(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('mousedown', handleMouseEvent);
    updateGame();
});

</script>