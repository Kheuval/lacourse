<template>
  <component :is="tag">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
defineProps<{
  tag: string;
}>();
</script>
