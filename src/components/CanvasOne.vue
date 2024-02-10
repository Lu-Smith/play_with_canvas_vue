<template>
    <h2>{{ msg }}</h2>
    <canvas ref="canvasOne"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';

 defineProps<{msg: string}>()
 
 const canvasOne = ref<HTMLCanvasElement | null>(null);

 const particlesArray = ref([]);

 const mouse = ref({ x: undefined, y: undefined })
 
 const handleKeyDown = (event: KeyboardEvent) => {
     switch (event.key) {
         case "ArrowUp": 
             updateGame();
             break;
     }
 };
 
 const handleMouseEvent = (event: MouseEvent) => {
     if (event) {
         updateGame();
     }
 };
 
 const updateGame = () => {
     const context = canvasOne.value?.getContext('2d');

 
     if (context && canvasOne.value) {
         // Clear the canvas
         context.clearRect(0, 0, canvasOne.value.width, canvasOne.value.height);
 
         // Draw ground
         context.fillStyle = '#fff';
         context.beginPath();
         context.arc(130, 100, 50, 0, Math.PI * 2);
         context.fill();
     }
 }
 
 onMounted(() => {
     window.addEventListener('keydown', handleKeyDown);
     window.addEventListener('mousedown', handleMouseEvent);
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