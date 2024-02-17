<template>
    <canvas ref="canvasTwo"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 
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

    for (let i = 0; i < 3; i++) {
        particleArray.value.push(new Particle());
    }
 };

 class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(){
        this.x = mouse.value.x;
        this.y = mouse.value.y;
        this.size = Math.random() * 16 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    };
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if ( this.size > 0.2) {
            this.size -= 0.1
        }
    };

    draw() {
        //Draw particles
        if (context) {
            context.fillStyle = '#79c2d0'; 
            context.strokeStyle = '#fff'; 
            context.lineWidth = 6;
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill(); 
            context.stroke();  

            context.strokeStyle = '#ffc93c'; 
            context.lineWidth = 4;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 8, 0, Math.PI * 2);
            context.stroke(); 

            context.strokeStyle = '#ffc93c'; 
            context.lineWidth = 2;
            context.beginPath();
            context.arc(this.x, this.y, this.size + 18, 0, Math.PI * 2);
            context.stroke();
        }
    };
 }

 const handleParticle = () => {
    for (let i = 0; i < particleArray.value.length; i++) {
        particleArray.value[i].update();
        particleArray.value[i].draw();
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
        canvasTwo.value.height = window.innerHeight * 0.8;
        context = canvasTwo.value?.getContext('2d');
    }

 });

 window.addEventListener('resize', function(){
    if (canvasTwo.value) {
        canvasTwo.value.width = window.innerWidth * 0.9;
        canvasTwo.value.height = window.innerHeight * 0.8;
    }
 })
 
 </script>

<style scoped>
    canvas {
        border: 2px solid #3baea0;
    }
</style>