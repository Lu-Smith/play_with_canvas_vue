<template>
    <canvas ref="canvasOne"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 
 const canvasOne = ref<HTMLCanvasElement | null>(null);
 let context: CanvasRenderingContext2D | null = null;
 const particleArray = ref<Particle[]>([]);
 const mouse = ref({ x: 150, y: 150 });
 const hue = ref(0);


 const handleMouseEvent = (event: MouseEvent) => {
    if (event) {
        const canvasRect = canvasOne.value?.getBoundingClientRect();
        if (canvasRect) {
            const offsetX = event.clientX - canvasRect.left;
            const offsetY = event.clientY - canvasRect.top;
            mouse.value.x = offsetX;
            mouse.value.y = offsetY;
        }
        for ( let i = 0; i < 10; i++) {
            particleArray.value.push( new Particle());
        }
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
        this.size = Math.random() * 12 + 1;
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
            context.beginPath();
            context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            context.fill();     
        }
    };
 }

 const handleParticle = () => {
    for (let i = 0; i < particleArray.value.length; i++) {
        particleArray.value[i].update();
        particleArray.value[i].draw();

        for (let j = i; j < particleArray.value.length; j++ ) {
            const dx = particleArray.value[i].x - particleArray.value[j].x;
            const dy = particleArray.value[i].y - particleArray.value[j].y;
            const distance  = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100 && context) {
                context.beginPath();
                context.strokeStyle = particleArray.value[i].color;
                context.lineWidth = particleArray.value[i].size/15;
                context.moveTo(particleArray.value[i].x, particleArray.value[i].y);
                context.lineTo(particleArray.value[j].x, particleArray.value[j].y);
                context.stroke();
            }
        }

        if (particleArray.value[i].size <= 0.3) {
            particleArray.value.splice(i, 1);
            console.log(particleArray.value.length);
            i--;
        }
    }
 }

 const animate = () => {
    if (context && canvasOne.value) {
    context.clearRect(0, 0, canvasOne.value.width, canvasOne.value.height);
    }
    handleParticle();
    hue.value += 0.5;
    requestAnimationFrame(animate);
 }

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

 animate();
 </script>

<style scoped>
  canvas {
    width: 90%;
    height: 50%;
    background-color: black;
  }
</style>