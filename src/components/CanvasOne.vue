<template>
    <h2>{{ msg }}</h2>
    <canvas ref="canvasOne"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';

 defineProps<{msg: string}>()
 
 const canvasOne = ref<HTMLCanvasElement | null>(null);
 let context: CanvasRenderingContext2D | null = null;
 const particleArray = ref<Particle[]>([]);
 const mouse = ref({ x: 0, y: 0 });


 const handleMouseEvent = (event: MouseEvent) => {
    if (event) {
        const canvasRect = canvasOne.value?.getBoundingClientRect();
        if (canvasRect) {
            const offsetX = event.clientX - canvasRect.left;
            const offsetY = event.clientY - canvasRect.top;
            mouse.value.x = offsetX;
            mouse.value.y = offsetY;
        }
        init();
    }
 };

 class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;

    constructor(){
        // this.x = mouse.value.x;
        // this.y = mouse.value.y;
        if (canvasOne.value) {
            this.x = Math.random() * canvasOne.value?.width;
            this.y = Math.random() * canvasOne.value?.height;
        } else {
            this.x = mouse.value.x;
            this.y = mouse.value.y;
        }

        console.log(this.x);

        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    };
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    draw() {
        //Draw particles
        if (context) {
            context.fillStyle = '#fff';
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();     
        }
    };
 }

 function init() {
    for ( let i = 0; i < 100; i++) {
        particleArray.value.push(new Particle());
    }
 }

 const handleParticle = () => {
    for (let i = 0; i < particleArray.value.length; i++) {
        particleArray.value[i].update();
        particleArray.value[i].draw();
    }
 }

 const animate = () => {
    if (context && canvasOne.value) {
        // Clear the canvas
        context.clearRect(0, 0, canvasOne.value.width, canvasOne.value.height);
    }
    handleParticle();
    requestAnimationFrame(animate);
 }

 animate();

 onMounted(() => {
    window.addEventListener('mousedown', handleMouseEvent);
    window.addEventListener('mousemove', handleMouseEvent);
     if (canvasOne.value) {
        canvasOne.value.width = window.innerWidth * 0.9;
        canvasOne.value.height = window.innerHeight * 0.5;
        context = canvasOne.value?.getContext('2d');
    }

 });

 window.addEventListener('resize', function(){
    if (canvasOne.value) {
        canvasOne.value.width = window.innerWidth * 0.9;
        canvasOne.value.height = window.innerHeight * 0.5;
    }
 })
 
 </script>