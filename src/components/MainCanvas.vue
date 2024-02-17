<template>
    <canvas ref="canvas"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 import { Particle } from '../assets/ParticleFour';
 
 const canvas = ref<HTMLCanvasElement | null>(null);
 let context: CanvasRenderingContext2D | null = null;
 const particleArray = ref<Particle[]>([]);
 const mouse = ref({ x: 150, y: 150 });
 const hue = ref(0);

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

    if (canvas.value) {
        const canvasRect = canvas.value.getBoundingClientRect();
        const scaleX = canvas.value.width / canvasRect.width;
        const scaleY = canvas.value.height / canvasRect.height;
        const canvasX = (offsetX - canvasRect.left) * scaleX;
        const canvasY = (offsetY - canvasRect.top) * scaleY;
        mouse.value.x = canvasX;
        mouse.value.y = canvasY;
    }

    for (let i = 0; i < 10; i++) {
        particleArray.value.push(new Particle(mouse.value.x, mouse.value.y, hue.value));
    }
 };

 const handleParticle = () => {
    if (context && canvas.value) {
        context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        context.fillRect(0, 0, canvas.value.width, canvas.value.height);
    }
    for (let i = 0; i < particleArray.value.length; i++) {
        particleArray.value[i].update();
        particleArray.value[i].draw(context, hue.value);
        if (particleArray.value[i].size <= 0.3) {
            particleArray.value.splice(i, 1);
            i--;
        }
    }
 }

 const animate = () => {
    handleParticle();
    hue.value += 2;
    requestAnimationFrame(animate);
 }

 onMounted(() => {
    window.addEventListener('mousedown', handleInputEvent);
    window.addEventListener('mousemove', handleInputEvent);
    window.addEventListener('touchstart', handleInputEvent);
    window.addEventListener('touchmove', handleInputEvent);
     if (canvas.value) {
        canvas.value.width = window.innerWidth * 0.9;
        canvas.value.height = window.innerHeight * 0.7;
        context = canvas.value?.getContext('2d');
    }

 });

 window.addEventListener('resize', function(){
    if (canvas.value) {
        canvas.value.width = window.innerWidth * 0.9;
        canvas.value.height = window.innerHeight * 0.7;
    }
 })

 animate();
 </script>

<style scoped>
    canvas {
        border: 2px solid #3baea0;
    }
</style>