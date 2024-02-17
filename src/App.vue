<script setup lang="ts">
import CanvasOne from './components/CanvasOne.vue';
import CanvasTop from './components/CanvasTop.vue';
import CanvasTwo from './components/CanvasTwo.vue';
import CanvasThree from './components/CanvasThree.vue';
import CanvasFour from './components/CanvasFour.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="headerContainer">
    <CanvasTop />
  </div>
  <h1>Play with <span>Canvas</span></h1>
  <button @click="chooseCanvas">1</button>
  <button @click="chooseCanvas">2</button>
  <button @click="chooseCanvas">3</button>
  <button @click="chooseCanvas">4</button>
  <div class="canvasContainer">
    <CanvasOne />
    <CanvasTwo />
    <CanvasThree />
    <CanvasFour />
  </div>
  <Footer />
  <div class="headerContainer">
    <CanvasTop />
  </div>
</template>

