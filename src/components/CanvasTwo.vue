<template>
    <canvas ref="canvasTwo"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 import { Particle } from '../assets/ParticleTwo';
 
 const canvasTwo = ref<HTMLCanvasElement | null>(null);
 let context: CanvasRenderingContext2D | null = null;
 const particleArray = ref<Particle[]>([]);
 const mouse = ref({ x: 150, y: 150 });


 const handleInputEvent = (event: MouseEvent | TouchEvent) => {
    let offsetX, offsetY;
    if ('touches' in event) {
        const touch = event.touches[0];
        offsetX = touch.clientX;
        offsetY = touch.clientY;
    } else {
        offsetX = (event as MouseEvent).clientX;
        offsetY = (event as MouseEvent).clientY;
    }

    if (canvasTwo.value) {
        const canvasRect = canvasTwo.value.getBoundingClientRect();
        const scaleX = canvasTwo.value.width / canvasRect.width;
        const scaleY = canvasTwo.value.height / canvasRect.height;
        const canvasX = (offsetX - canvasRect.left) * scaleX;
        const canvasY = (offsetY - canvasRect.top) * scaleY;
        mouse.value.x = canvasX;
        mouse.value.y = canvasY;
    }
        particleArray.value.push(new Particle(mouse.value.x, mouse.value.y));
    
 };

 const handleParticle = () => {
    for (let i = 0; i < particleArray.value.length; i++) {
        particleArray.value[i].update();
        particleArray.value[i].draw(context);
        if (particleArray.value[i].size <= 0.3) {
            particleArray.value.splice(i, 1);
            i--;
        }
    }
 }

 const animate = () => {
    if (context && canvasTwo.value) {
        // Clear the canvas
        context.clearRect(0, 0, canvasTwo.value.width, canvasTwo.value.height);
    }
    handleParticle();
    requestAnimationFrame(animate);
 }

 animate();

 onMounted(() => {
    window.addEventListener('mousedown', handleInputEvent);
    window.addEventListener('mousemove', handleInputEvent);
    window.addEventListener('touchstart', handleInputEvent);
    window.addEventListener('touchmove', handleInputEvent);
     if (canvasTwo.value) {
        canvasTwo.value.width = window.innerWidth * 0.9;
        canvasTwo.value.height = window.innerHeight * 0.7;
        context = canvasTwo.value?.getContext('2d');
    }

 });

 window.addEventListener('resize', function(){
    if (canvasTwo.value) {
        canvasTwo.value.width = window.innerWidth * 0.9;
        canvasTwo.value.height = window.innerHeight * 0.7;
    }
 })
 
 </script>

<style scoped>
    canvas {
        border: 2px solid #3baea0;
    }
</style>