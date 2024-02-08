<template>
    <h1>{{ msg }}</h1>
    <h2>two</h2>
</template>

<script lang="ts" setup>
 defineProps<{msg: string}>()
</script>