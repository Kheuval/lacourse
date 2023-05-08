<template>
  <FontAwesomeIcon :icon="icon" />
</template>

<script lang="ts" setup>
defineProps<{
  icon: string;
}>();
</script>
