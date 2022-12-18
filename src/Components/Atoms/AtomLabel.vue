<template>
  <label
    :for="id"
    class="absolute text-md text-secondary -translate-y-4 scale-75 top-1 bg-white px-2 peer-focus:text-primary left-2 rounded-md"
  >
    {{ placeholder }}
  </label>
</template>

<script lang="ts" setup>
defineProps<{
  id: string;
  placeholder: string;
}>();
</script>

<style lang="scss" scoped></style>
