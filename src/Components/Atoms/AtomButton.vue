<template>
  <button @click="$emit('click')">{{ content }}</button>
</template>

<script lang="ts" setup>
defineProps<{
  content: string;
}>();

defineEmits(["click"]);
</script>

<style lang="scss" scoped></style>
