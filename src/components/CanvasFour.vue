<template>
    <canvas ref="canvasFour"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 
 const canvasFour = ref<HTMLCanvasElement | null>(null);
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

    if (canvasFour.value) {
        const canvasRect = canvasFour.value.getBoundingClientRect();
        const scaleX = canvasFour.value.width / canvasRect.width;
        const scaleY = canvasFour.value.height / canvasRect.height;
        const canvasX = (offsetX - canvasRect.left) * scaleX;
        const canvasY = (offsetY - canvasRect.top) * scaleY;
        mouse.value.x = canvasX;
        mouse.value.y = canvasY;
    }

    for (let i = 0; i < 10; i++) {
        particleArray.value.push(new Particle());
    }
 };

 class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;

    constructor(){
        this.x = mouse.value.x;
        this.y = mouse.value.y;
        this.size = Math.random() * 30 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue.value + ', 100%, 50%)';
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
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);

        //stroke
            context.strokeStyle = 'hsl(' + hue.value + ', 100%, 50%)'; 
            context.lineWidth = 2;
            context.strokeRect(this.x, this.y, this.size, this.size);  
        }
    };
 }

 const handleParticle = () => {
    if (context && canvasFour.value) {
        context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        context.fillRect(0, 0, canvasFour.value.width, canvasFour.value.height);
    }
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
    handleParticle();
    hue.value += 2;
    requestAnimationFrame(animate);
 }

 onMounted(() => {
    window.addEventListener('mousedown', handleInputEvent);
    window.addEventListener('mousemove', handleInputEvent);
    window.addEventListener('touchstart', handleInputEvent);
    window.addEventListener('touchmove', handleInputEvent);
     if (canvasFour.value) {
        canvasFour.value.width = window.innerWidth * 0.9;
        canvasFour.value.height = window.innerHeight * 0.5;
        context = canvasFour.value?.getContext('2d');
    }

 });

 window.addEventListener('resize', function(){
    if (canvasFour.value) {
        canvasFour.value.width = window.innerWidth * 0.9;
        canvasFour.value.height = window.innerHeight * 0.5;
    }
 })

 animate();
 </script>

<style scoped>
    canvas {
        border: 2px solid #3baea0;
    }
</style>