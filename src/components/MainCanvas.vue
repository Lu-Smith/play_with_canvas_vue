<template>
    <canvas ref="canvas"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted, Ref } from 'vue';
 import { ParticleOne } from '../assets/ParticleOne';
 import { ParticleTwo } from '../assets/ParticleTwo';
 import { ParticleThree } from '../assets/ParticleThree';
 import { ParticleFour } from '../assets/ParticleFour';

const props = defineProps<{ selectedCanvas: number }>();
 console.log(props.selectedCanvas);
 type Particle = ParticleOne | ParticleTwo | ParticleThree | ParticleFour;
    let particleArray: Ref<Particle[]>;
 let hue: Ref<number>;

 if (props.selectedCanvas === 1) {
    particleArray = ref<ParticleOne[]>([]);
 } else if (props.selectedCanvas === 2) {
    particleArray = ref<ParticleTwo[]>([]);
 } else if (props.selectedCanvas === 3) {
    particleArray = ref<ParticleThree[]>([]);
 } else if (props.selectedCanvas === 4) {
    particleArray = ref<ParticleFour[]>([]);
 } 
 
 const canvas = ref<HTMLCanvasElement | null>(null);
 let context: CanvasRenderingContext2D | null = null;


 const mouse = ref({ x: 150, y: 150 });
 if (props.selectedCanvas === 1 || props.selectedCanvas === 4) {
    hue = ref(0);
 }  

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

    if (props.selectedCanvas === 1) {
        for (let i = 0; i < 10; i++) {
            particleArray.value.push(new ParticleOne(mouse.value.x, mouse.value.y, hue.value));
        }
    } else if (props.selectedCanvas === 2) {
        particleArray.value.push(new ParticleTwo(mouse.value.x, mouse.value.y));
    } else if (props.selectedCanvas === 3) {
        for (let i = 0; i < 5; i++) {
            particleArray.value.push(new ParticleThree(mouse.value.x, mouse.value.y));
        }
    } else if (props.selectedCanvas === 4) {
        for (let i = 0; i < 10; i++) {
            particleArray.value.push(new ParticleFour(mouse.value.x, mouse.value.y, hue.value));
        }
    } 
    
 };

 const handleParticle = () => {
    if (props.selectedCanvas === 1 ) {
        for (let i = 0; i < particleArray.value.length; i++) {
        particleArray.value[i].update();
        particleArray.value[i].draw(context, hue.value);

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
                i--;
            }
        } 
    } else {
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
 }

 const animate = () => {
    handleParticle();
    if (props.selectedCanvas === 1 || props.selectedCanvas === 4) {
        hue.value += 2;
    }
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