<template>
  <RouterLink :to="to" @click="$emit('click')">
    <slot></slot>
  </RouterLink>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
}>();

defineEmits(["click"]);
</script>

<style lang="scss" scoped></style>
