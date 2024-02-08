<script setup lang="ts">
import CanvasOne from './components/CanvasOne.vue';
import CanvasTwo from './components/CanvasTwo.vue';
</script>

<template>
  <div>
    Hello World
  </div>
  <CanvasOne msg="Vite + Vue" />
  <CanvasTwo msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
