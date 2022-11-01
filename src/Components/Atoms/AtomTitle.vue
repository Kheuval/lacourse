<template>
  <component :is="tag">{{ content }}</component>
</template>

<script lang="ts" setup>
defineProps<{
  tag: string;
  content: string;
}>();
</script>

<style lang="scss" scoped></style>
