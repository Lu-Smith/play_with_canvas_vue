<template>
   <h1>{{ msg }}</h1>
   <h2>one</h2>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>