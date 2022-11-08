<template>
  <button @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(["click"]);
</script>

<style lang="scss" scoped></style>
