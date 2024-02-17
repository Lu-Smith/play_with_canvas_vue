<script setup lang="ts">
import { ref } from 'vue';
import CanvasTop from './components/CanvasTop.vue';
import Footer from './components/Footer.vue';
import MainCanvas from './components/MainCanvas.vue';

const selectedCanvas = ref(1);

const chooseCanvas = (canvasNumber: number) => {
  selectedCanvas.value = canvasNumber;
  
}

</script>

<template>
  <div class="headerContainer">
    <CanvasTop />
  </div>
  <h1>Play with <span>Canvas</span></h1>
  <button @click="chooseCanvas(1)">1</button>
  <button @click="chooseCanvas(2)">2</button>
  <button @click="chooseCanvas(3)">3</button>
  <button @click="chooseCanvas(4)">4</button>
  <div class="canvasContainer">
    <div>
      <MainCanvas  :selectedCanvas="selectedCanvas"/>
    </div>
  </div>
  <Footer />
  <div class="headerContainer">
    <CanvasTop />
  </div>
</template>

