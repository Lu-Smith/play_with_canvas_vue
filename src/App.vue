<script setup lang="ts">
import CanvasOne from './components/CanvasOne.vue';
import CanvasTop from './components/CanvasTop.vue';
import CanvasTwo from './components/CanvasTwo.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="headerContainer">
    <CanvasTop />
  </div>
  <h1>Play with Canvas</h1>
  <div class="canvasContainer">
    <CanvasOne msg="Dots" />
    <CanvasTwo msg="Stars" />
  </div>
  <Footer />
</template>

<style scoped>
</style>
