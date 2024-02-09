<script setup lang="ts">
import CanvasOne from './components/CanvasOne.vue';
import CanvasTwo from './components/CanvasTwo.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <h1>Play with Canvas</h1>
  <div class="canvasContainer">
    <CanvasOne msg="Vite + Vue" />
    <CanvasTwo msg="Vite + Vue" />
  </div>
  <Footer />
</template>

<style scoped>
</style>
