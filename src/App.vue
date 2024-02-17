<script setup lang="ts">
import { ref } from 'vue';
import CanvasOne from './components/CanvasOne.vue';
import CanvasTop from './components/CanvasTop.vue';
import CanvasTwo from './components/CanvasTwo.vue';
import CanvasThree from './components/CanvasThree.vue';
import CanvasFour from './components/CanvasFour.vue';
import Footer from './components/Footer.vue';

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
    <div v-if="selectedCanvas === 1">
      <CanvasOne />
    </div>
    <div v-if="selectedCanvas === 2">
      <CanvasTwo />
    </div>
    <div v-if="selectedCanvas === 3">
      <CanvasThree />
    </div>
    <div v-if="selectedCanvas === 4">
      <CanvasFour />
    </div>
  </div>
  <Footer />
  <div class="headerContainer">
    <CanvasTop />
  </div>
</template>

