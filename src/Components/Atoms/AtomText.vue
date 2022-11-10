<template>
  <p>{{ content }}</p>
</template>

<script lang="ts" setup>
defineProps<{
  content: string;
}>();
</script>

<style lang="scss" scoped></style>
