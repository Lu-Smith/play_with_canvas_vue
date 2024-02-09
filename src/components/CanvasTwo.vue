<template>
    <h2>{{ msg }}</h2>
    <h2>two</h2>
</template>

<script lang="ts" setup>
 defineProps<{msg: string}>()
</script>