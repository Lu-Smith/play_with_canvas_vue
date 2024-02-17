<script setup lang="ts">
import { ref } from 'vue';
import CanvasOne from './components/CanvasOne.vue';
import CanvasTop from './components/CanvasTop.vue';
import CanvasTwo from './components/CanvasTwo.vue';
import CanvasThree from './components/CanvasThree.vue';
import CanvasFour from './components/CanvasFour.vue';
import Footer from './components/Footer.vue';

const canvasChoice1 = ref(true);
const canvasChoice2 = ref(false);
const canvasChoice3 = ref(false);
const canvasChoice4 = ref(false);

const chooseCanvas1 = () => {
  canvasChoice1.value = true;
  canvasChoice2.value = false;
  canvasChoice3.value = false;
  canvasChoice4.value = false;
}

const chooseCanvas2 = () => {
  canvasChoice1.value = false;
  canvasChoice2.value = true;
  canvasChoice3.value = false;
  canvasChoice4.value = false;
}

const chooseCanvas3 = () => {
  canvasChoice1.value = false;
  canvasChoice2.value = false;
  canvasChoice3.value = true;
  canvasChoice4.value = false;
}

const chooseCanvas4 = () => {
  canvasChoice1.value = false;
  canvasChoice2.value = false;
  canvasChoice3.value = false;
  canvasChoice4.value = true;
}

</script>

<template>
  <div class="headerContainer">
    <CanvasTop />
  </div>
  <h1>Play with <span>Canvas</span></h1>
  <button @click="chooseCanvas1">1</button>
  <button @click="chooseCanvas2">2</button>
  <button @click="chooseCanvas3">3</button>
  <button @click="chooseCanvas4">4</button>
  <div class="canvasContainer">
    <div v-if="canvasChoice1">
      <CanvasOne />
    </div>
    <div v-if="canvasChoice2">
      <CanvasTwo />
    </div>
    <div v-if="canvasChoice3">
      <CanvasThree />
    </div>
    <div v-if="canvasChoice4">
      <CanvasFour />
    </div>
  </div>
  <Footer />
  <div class="headerContainer">
    <CanvasTop />
  </div>
</template>

