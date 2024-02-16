<template>
    <canvas ref="canvasThree"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted } from 'vue';
 
 const canvasThree = ref<HTMLCanvasElement | null>(null);
 let context: CanvasRenderingContext2D | null = null;
 const particleArray = ref<Particle[]>([]);
 const mouse = ref({ x: 150, y: 150 });


 const handleMouseEvent = (event: MouseEvent) => {
    if (event) {
        const canvasRect = canvasThree.value?.getBoundingClientRect();
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

    constructor(){
        this.x = mouse.value.x;
        this.y = mouse.value.y;
        this.size = Math.random() * 12 + 1;
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
            const numberOfPoints = 5;
            const innerRadius = this.size / 2;
            const outerRadius = this.size;
            let rotation = Math.PI / 2 * 3;
            const angleIncrement = Math.PI / numberOfPoints;
            
            context.beginPath();
            context.moveTo(this.x + Math.cos(rotation) * outerRadius, this.y + Math.sin(rotation) * outerRadius);

            for (let i = 0; i < numberOfPoints; i++) {
                rotation += angleIncrement;
                context.lineTo(this.x + Math.cos(rotation) * outerRadius, this.y + Math.sin(rotation) * outerRadius);
                rotation += angleIncrement;
                context.lineTo(this.x + Math.cos(rotation) * innerRadius, this.y + Math.sin(rotation) * innerRadius);
            }
            
            context.closePath();
            context.lineWidth = 2;
            context.strokeStyle = '#fff';
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
            console.log(particleArray.value.length);
            i--;
        }
    }
 }

 const animate = () => {
    if (context && canvasThree.value) {
        context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        context.fillRect(0, 0, canvasThree.value.width, canvasThree.value.height);
    }
    handleParticle();
    requestAnimationFrame(animate);
 }

 animate();

 onMounted(() => {
    window.addEventListener('mousedown', handleMouseEvent);
    window.addEventListener('mousemove', handleMouseEvent);
     if (canvasThree.value) {
        canvasThree.value.width = window.innerWidth * 0.9;
        canvasThree.value.height = window.innerHeight * 0.5;
        context = canvasThree.value?.getContext('2d');
    }

 });

 window.addEventListener('resize', function(){
    if (canvasThree.value) {
        canvasThree.value.width = window.innerWidth * 0.9;
        canvasThree.value.height = window.innerHeight * 0.5;
    }
 })
 
 </script>

<style scoped>
  canvas {
    width: 90%;
    height: 50%;
    background-color: black;
  }
</style>