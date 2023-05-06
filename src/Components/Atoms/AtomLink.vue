<template>
  <div>
    <RouterLink :to="to" @click="$emit('click')">
      <slot></slot>
    </RouterLink>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  to: string;
}>();

defineEmits(["click"]);
</script>
