<template>
  <button class="text-xl" @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
defineEmits(["click"]);
</script>
