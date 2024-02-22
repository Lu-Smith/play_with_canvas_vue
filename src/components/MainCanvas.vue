<template>
    <canvas ref="canvas"></canvas>
 </template>
 
 <script setup lang="ts">
 import { ref, onMounted, Ref, watch } from 'vue';
 import { ParticleOne } from '../assets/ParticleOne';
 import { ParticleTwo } from '../assets/ParticleTwo';
 import { ParticleThree } from '../assets/ParticleThree';
 import { ParticleFour } from '../assets/ParticleFour';
 import { ParticleFive } from '../assets/ParticleFive';
 import { ParticleSix } from '../assets/ParticleSix';

 const props = defineProps<{ selectedCanvas: number }>();
 type Particle = ParticleOne | ParticleTwo | ParticleThree | ParticleFour | ParticleFive | ParticleSix;
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
 } else if (props.selectedCanvas === 5) {
    particleArray = ref<ParticleSix[] | ParticleTwo[]>([]);
 } else if (props.selectedCanvas === 6) {
    particleArray = ref<ParticleFive[] | ParticleThree[] >([]);
 } 
 
 const canvas = ref<HTMLCanvasElement | null>(null);
 let context: CanvasRenderingContext2D | null = null;


 const mouse = ref({ x: 150, y: 150 });
 if (props.selectedCanvas === 1 || props.selectedCanvas === 4 || props.selectedCanvas === 6) {
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
        for (let i = 0; i < 8; i++) {
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
    } else if (props.selectedCanvas === 5) {
        for (let i = 0; i < 2; i++) {
        particleArray.value.push(new ParticleTwo(mouse.value.x, mouse.value.y));
        }
        for (let i = 0; i < 9; i++) {
            particleArray.value.push(new ParticleSix(mouse.value.x, mouse.value.y, hue.value));
        }
    } else if (props.selectedCanvas === 6) {
        for (let i = 0; i < 7; i++) {
            particleArray.value.push(new ParticleThree(mouse.value.x, mouse.value.y));
        }
        for (let i = 0; i < 3; i++) {
            particleArray.value.push(new ParticleFive(mouse.value.x, mouse.value.y));
        }
    }
    
 };

 const handleParticle = () => {
    if (context && canvas.value) {
        context.fillStyle = 'rgba(0, 0, 0, 0.2)';
        context.fillRect(0, 0, canvas.value.width, canvas.value.height)

        if (props.selectedCanvas === 1 ) {
            for (let i = 0; i < particleArray.value.length; i++) {
            particleArray.value[i].update();
            particleArray.value[i].draw(context, hue.value);

                for (let j = i; j < particleArray.value.length; j++ ) {
                    const dx = particleArray.value[i].x - particleArray.value[j].x;
                    const dy = particleArray.value[i].y - particleArray.value[j].y;
                    const distance  = Math.sqrt(dx * dx + dy * dy);
                    if (distance < 80 && context && distance > 20) {
                        context.beginPath();
                        if ('color' in particleArray.value[i]) {
                            context.strokeStyle = (particleArray.value[i] as ParticleOne).color;
                        }
                        context.lineWidth = particleArray.value[i].size/15;
                        context.moveTo(particleArray.value[i].x, particleArray.value[i].y);
                        context.lineTo(particleArray.value[j].x, particleArray.value[j].y);
                        context.stroke();
                    }
                }
                if (particleArray.value[i].size <= 1.5 ) {
                    particleArray.value.splice(i, 1);
                    i--;
                }
            } 
        } else {
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
 }

 const animate = () => {
    handleParticle();
    if (props.selectedCanvas === 1 || props.selectedCanvas === 4 || props.selectedCanvas === 6) {
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

 watch(() => props.selectedCanvas, (newValue) => {
    // Reset particleArray and hue if necessary
    particleArray.value = [];

    if (newValue === 1 || newValue === 4 || newValue === 6) {
        hue.value = 0;
    }
});

 </script>

<style scoped>
    canvas {
        border: 2px solid #3baea0;
    }
</style>