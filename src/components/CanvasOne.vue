<template>
   <h2>{{ msg }}</h2>
   <h2>one</h2>
</template>

<script setup lang="ts">
defineProps<{ msg: string }>()
</script>