<template>
    <h2>{{ msg }}</h2>
    <canvas ref="canvasOne"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';

 defineProps<{msg: string}>()
 
 const canvasOne = ref<HTMLCanvasElement | null>(null);

 const x = ref(0);
 const y = ref(0);

 const mouse = ref({ x, y });


 
 const updateGame = () => {
    const context = canvasOne.value?.getContext('2d');
     if (context && canvasOne.value) {
        // Clear the canvas
        context.clearRect(0, 0, canvasOne.value.width, canvasOne.value.height);

         // Draw ground
         context.fillStyle = '#fff';
         context.beginPath();
         context.arc(mouse.value.x, mouse.value.y, 30, 0, Math.PI * 2);
         context.fill();
     }
 }
 
 const handleMouseEvent = (event: MouseEvent) => {
     if (event) {
        const canvasRect = canvasOne.value?.getBoundingClientRect();
        if (canvasRect) {
            const offsetX = event.clientX - canvasRect.left;
            const offsetY = event.clientY - canvasRect.top;
            mouse.value.x = offsetX;
            mouse.value.y = offsetY;
        }
        updateGame();
     }
 };

 const handleMouseMovement = (event: MouseEvent) => {
     if (event) {
        const canvasRect = canvasOne.value?.getBoundingClientRect();
        if (canvasRect) {
            const offsetX = event.clientX - canvasRect.left;
            const offsetY = event.clientY - canvasRect.top;
            mouse.value.x = offsetX;
            mouse.value.y = offsetY;
        }
        updateGame();
     }
 };
 
 onMounted(() => {
     window.addEventListener('mousedown', handleMouseEvent);
     window.addEventListener('mousemove', handleMouseMovement);
     if (canvasOne.value) {
        canvasOne.value.width = window.innerWidth * 0.9;
        canvasOne.value.height = window.innerHeight * 0.5;
    }
 });

 window.addEventListener('resize', function(){
    if (canvasOne.value) {
        canvasOne.value.width = window.innerWidth * 0.9;
        canvasOne.value.height = window.innerHeight * 0.5;
    }
 })
 
 </script>